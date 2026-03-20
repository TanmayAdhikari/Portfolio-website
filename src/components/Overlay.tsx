"use client";

import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type OverlayProps = {
  targetRef: RefObject<HTMLElement | null>;
  title: string;
  subtitle: string;
  mid: string;
  end: string;
};

export function Overlay({ targetRef, title, subtitle, mid, end }: OverlayProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  const midOpacity = useTransform(scrollYProgress, [0.24, 0.34, 0.46], [0, 1, 0]);
  const midY = useTransform(scrollYProgress, [0.24, 0.46], [30, -30]);

  const endOpacity = useTransform(scrollYProgress, [0.52, 0.62, 0.78], [0, 1, 0]);
  const endY = useTransform(scrollYProgress, [0.52, 0.78], [30, -30]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="mx-auto w-full max-w-5xl px-6 text-center"
        >
          <div className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {title}
          </div>
          <div className="mt-4 text-pretty text-base text-white/75 sm:text-lg">{subtitle}</div>
        </motion.div>

        <motion.div
          style={{ opacity: midOpacity, y: midY }}
          className="absolute left-0 top-0 flex h-screen w-full items-center px-6"
        >
          <div className="max-w-md rounded-2xl border border-white/15 bg-black/35 p-5 text-white/90 backdrop-blur">
            <div className="text-lg font-medium">{mid}</div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: endOpacity, y: endY }}
          className="absolute right-0 top-0 flex h-screen w-full items-center justify-end px-6"
        >
          <div className="max-w-md rounded-2xl border border-white/15 bg-black/35 p-5 text-white/90 backdrop-blur">
            <div className="text-lg font-medium">{end}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

