"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

type ScrollyCanvasProps = {
  heightVh?: number;
  frameCount?: number;
  containerRef?: RefObject<HTMLDivElement | null>;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const scale = Math.max(cw / iw, ch / ih);
  const sw = cw / scale;
  const sh = ch / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

/** Draw a single programmatic "frame" for scroll sequence (dark teal, network lines, no images). */
function drawPlaceholderFrame(
  ctx: CanvasRenderingContext2D,
  frameIndex: number,
  totalFrames: number,
  cw: number,
  ch: number,
) {
  const t = totalFrames > 1 ? frameIndex / (totalFrames - 1) : 0;

  // Base gradient: dark navy → teal
  const g = ctx.createLinearGradient(0, 0, cw, ch);
  g.addColorStop(0, "#050a12");
  g.addColorStop(0.4, "#062235");
  g.addColorStop(0.7, "#0a2a3a");
  g.addColorStop(1, "#051a28");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, cw, ch);

  // Soft radial glow that moves with scroll
  const cx = cw * (0.3 + 0.4 * t);
  const cy = ch * (0.2 + 0.5 * t);
  const r = Math.max(cw, ch) * 0.8;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  glow.addColorStop(0, "rgba(46, 233, 198, 0.18)");
  glow.addColorStop(0.5, "rgba(46, 233, 198, 0.06)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, cw, ch);

  // Abstract network lines (phase shifts with frame)
  const phase = (frameIndex / totalFrames) * Math.PI * 2;
  ctx.strokeStyle = "rgba(46, 233, 198, 0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * cw;
    const y = ch * (0.5 + 0.35 * Math.sin(phase + (i / steps) * 4));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * cw;
    const y = ch * (0.55 + 0.3 * Math.sin(phase * 0.7 + (i / steps) * 3 + 1));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Nodes along the flow
  const nodeCount = 8;
  for (let i = 0; i < nodeCount; i++) {
    const nx = cw * (0.15 + (i / (nodeCount - 1)) * 0.7 + 0.05 * Math.sin(phase + i));
    const ny = ch * (0.4 + 0.35 * Math.sin(phase * 1.2 + i * 0.8));
    const radius = 2 + 2 * (0.5 + 0.5 * Math.sin(phase + i * 0.5));
    ctx.beginPath();
    ctx.arc(nx, ny, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(46, 233, 198, 0.4)";
    ctx.fill();
  }

  // Subtle top vignette
  const v = ctx.createLinearGradient(0, 0, 0, ch * 0.5);
  v.addColorStop(0, "rgba(5, 10, 18, 0.5)");
  v.addColorStop(1, "transparent");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, cw, ch * 0.5);
}

function defaultSrcForIndex(i: number) {
  const oneBased = i + 1;
  const pad4 = String(oneBased).padStart(4, "0");
  const candidates = [
    `/sequence/${oneBased}.webp`,
    `/sequence/${pad4}.webp`,
    `/sequence/frame_${pad4}.webp`,
  ];
  return candidates;
}

export function ScrollyCanvas({
  heightVh = 500,
  frameCount = 89,
  containerRef: externalContainerRef,
}: ScrollyCanvasProps) {
  const internalContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = externalContainerRef ?? internalContainerRef;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameIndexRef = useRef(0);
  const [readyCount, setReadyCount] = useState(0);

  const sources = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => defaultSrcForIndex(i));
  }, [frameCount]);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    imagesRef.current = Array.from({ length: frameCount }, () => null);
    let cancelled = false;

    const loadOne = async (i: number) => {
      const candidates = sources[i] ?? [];
      for (const src of candidates) {
        if (cancelled) return;
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = src;
        const ok = await new Promise<boolean>((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
        if (ok) {
          imagesRef.current[i] = img;
          if (!cancelled) setReadyCount((c) => c + 1);
          return;
        }
      }
    };

    (async () => {
      const concurrency = 10;
      let idx = 0;
      const runners = Array.from({ length: concurrency }, async () => {
        while (!cancelled) {
          const i = idx++;
          if (i >= frameCount) return;
          await loadOne(i);
        }
      });
      await Promise.all(runners);
    })();

    return () => {
      cancelled = true;
    };
  }, [frameCount, sources]);

  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const cw = Math.max(1, Math.floor(rect.width * dpr));
    const ch = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const img = imagesRef.current[frameIndex] ?? imagesRef.current.find(Boolean) ?? null;
    if (!img) {
      ctx.clearRect(0, 0, rect.width, rect.height);
      drawPlaceholderFrame(ctx, frameIndex, frameCount, rect.width, rect.height);
      return;
    }

    coverDraw(ctx, img, rect.width, rect.height);
    lastFrameIndexRef.current = frameIndex;
  };

  useEffect(() => {
    const onResize = () => renderFrame(lastFrameIndexRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    renderFrame(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyCount]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = clamp(Math.round(v * (frameCount - 1)), 0, frameCount - 1);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => renderFrame(idx));
  });

  return (
    <section ref={containerRef} style={{ height: `${heightVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          aria-label="Scroll-linked image sequence"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <div className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs text-white/80 backdrop-blur">
            {readyCount >= frameCount
              ? `Loaded ${frameCount} frames`
              : readyCount > 0
                ? `Loaded ${readyCount}/${frameCount} frames`
                : "Scroll to animate · Add frames to /public/sequence for custom"}
          </div>
        </div>
      </div>
    </section>
  );
}

