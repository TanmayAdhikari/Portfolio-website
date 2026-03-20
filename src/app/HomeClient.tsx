"use client";

import { useRef } from "react";
import { Overlay } from "@/components/Overlay";
import { Projects } from "@/components/Projects";
import { Boxes } from "@/components/ui/background-boxes";
import SocialButton from "@/components/ui/social-button";
import { profile } from "@/data/profile";

export default function HomeClient() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <div className="relative">
        <div
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{ height: "100vh" }}
        >
          <div className="absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <SocialButton className="absolute bottom-6 right-6 z-30 scale-[0.65] origin-bottom-right" />
          <Overlay
            targetRef={heroRef}
            title={`${profile.name}. ${profile.headline}.`}
            subtitle={profile.summary}
            mid="I build GenAI assistants, computer vision pipelines, and optimization engines for real-world operations."
            end="From prototypes to production: fast, measurable, and reliable systems."
          />
        </div>
      </div>

      <Projects />
    </div>
  );
}

