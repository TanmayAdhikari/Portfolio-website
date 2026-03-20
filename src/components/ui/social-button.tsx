"use client";

import React, { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, Linkedin, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

function useClickOutside(ref: RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) handler();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}

function OnClickOutside({
  children,
  onClickOutside,
}: {
  children: ReactNode;
  onClickOutside: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, onClickOutside);
  return <div ref={wrapperRef}>{children}</div>;
}

type ShareTarget = "Mail" | "Whatsapp" | "LinkedIn";

const getCurrentUrl = () => {
  if (typeof window === "undefined") return "";
  return window.location.href;
};

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers/environments where clipboard API is not available
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "true");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

function getShareUrl(target: ShareTarget, url: string) {
  const encoded = encodeURIComponent(url);
  switch (target) {
    case "LinkedIn":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
    case "Whatsapp":
      // WhatsApp expects "text=" for most share flows
      return `https://api.whatsapp.com/send?text=${encoded}`;
    case "Mail":
      return `mailto:?subject=${encodeURIComponent("Check this out")}&body=${encoded}`;
    default:
      return url;
  }
}

const shareButtons: Array<{
  target: ShareTarget;
  label: ShareTarget;
  color: string;
  renderIcon: () => ReactNode;
}> = [
  {
    target: "Mail",
    label: "Mail",
    color: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10",
    renderIcon: () => <Mail className="h-5 w-5" />,
  },
  {
    target: "Whatsapp",
    label: "Whatsapp",
    color: "hover:text-[#E1306C] hover:bg-[#E1306C]/10",
    renderIcon: () => (
      <img
        src="/whatsapp.svg"
        alt="WhatsApp"
        className="h-5 w-5"
        draggable={false}
      />
    ),
  },
  {
    target: "LinkedIn",
    label: "LinkedIn",
    color: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
    renderIcon: () => <Linkedin className="h-5 w-5" />,
  },
];

export default function SocialButton({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (url: string) => {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async (target: ShareTarget) => {
    const url = getCurrentUrl();
    if (!url) return;

    await handleCopy(url);

    const shareUrl = getShareUrl(target, url);
    if (target === "Mail") {
      // mailto: should open in same tab for best UX
      window.location.href = shareUrl;
      return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <OnClickOutside onClickOutside={() => setIsExpanded(false)}>
      <div className={cn("flex items-center justify-center", className)}>
        <motion.div
          animate={{ width: isExpanded ? "auto" : "120px", height: "48px" }}
          className={cn(
            "relative flex items-center overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm cursor-pointer",
            "dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-md",
          )}
          initial={false}
          onClick={() => !isExpanded && setIsExpanded(true)}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <AnimatePresence mode="sync">
            {!isExpanded ? (
              <motion.div
                key="share-text"
                className="absolute inset-0 flex items-center justify-center gap-2"
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Share2 className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Share</span>
              </motion.div>
            ) : (
              <motion.div
                key="actions"
                className="flex items-center px-1"
                exit={{ opacity: 0, scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {shareButtons.map((btn) => {
                  return (
                    <button
                      key={btn.label}
                      type="button"
                      title={btn.label}
                      aria-label={btn.label}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                        "text-zinc-600 dark:text-zinc-400",
                        btn.color,
                      )}
                      onClick={async (e) => {
                        e.stopPropagation();
                        await handleShare(btn.target);
                      }}
                    >
                      {btn.renderIcon()}
                    </button>
                  );
                })}

                <div className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

                <button
                  type="button"
                  title="Copy Link"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                    "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    copied &&
                      "bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-500",
                  )}
                  onClick={async (e) => {
                    e.stopPropagation();
                    const url = getCurrentUrl();
                    if (!url) return;
                    await handleCopy(url);
                  }}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </OnClickOutside>
  );
}

