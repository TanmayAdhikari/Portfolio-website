"use client";

import { profile } from "@/data/profile";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs font-medium tracking-widest text-white/55">{eyebrow}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</div>
    </div>
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

export function Projects() {
  return (
    <section className="relative z-20 bg-[#05060a]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="PROJECTS" title="Selected work" />
        <div className="grid gap-5 md:grid-cols-2">
          {profile.projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-lg font-semibold text-white">{p.title}</div>
                <div className="h-9 w-9 shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 via-white/10 to-orange-500/20" />
              </div>
              <div className="mt-3 text-sm leading-6 text-white/70">{p.description}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
              {p.metrics.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {p.metrics.map((m) => (
                    <div
                      key={m}
                      className="rounded-2xl border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/70"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="EXPERIENCE" title="Building production AI" />
            <div className="space-y-4">
              {profile.experience.map((e) => (
                <div
                  key={`${e.company}-${e.title}`}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-white">
                      <span className="font-semibold">{e.title}</span>{" "}
                      <span className="text-white/65">· {e.company}</span>
                    </div>
                    <div className="text-xs text-white/55">
                      {e.start} — {e.end}
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                        <span className="leading-6">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="SKILLS" title="Toolbox" />
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="space-y-5">
                <div>
                  <div className="text-sm font-medium text-white">Programming</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills.programming.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Generative AI</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills.genAI.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Computer Vision</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills.computerVision.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">ML & Data</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills.machineLearning.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Optimization</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills.optimization.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Platforms</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills.tools.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="EDUCATION" title="Foundation" />
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                {profile.education.map((ed) => (
                  <div key={ed.school} className="text-white">
                    <div className="text-sm font-semibold">{ed.degree}</div>
                    <div className="mt-1 text-sm text-white/70">
                      {ed.school} · {ed.year} · {ed.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="CONTACT" title="Let’s talk" />
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <div className="text-sm text-white/75">
                  Reach out for collaborations, roles, or product work.
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-white/25 hover:bg-white/10"
                    href={`mailto:${profile.email}`}
                  >
                    Email
                  </a>
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-white/25 hover:bg-white/10"
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-white/25 hover:bg-white/10"
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                                    <a
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-white/25 hover:bg-white/10"
                    href="/resume.pdf"
                    download={`${profile.name}-Resume.pdf`}
                    aria-label="Download resume as PDF"
                  >
                    Download Resume
                  </a>
                </div>
                <div className="mt-6 text-xs text-white/50">
                  {profile.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-10 text-xs text-white/45">
          <div>
            © {new Date().getFullYear()} {profile.name}
          </div>
        </div>
      </div>
    </section>
  );
}

