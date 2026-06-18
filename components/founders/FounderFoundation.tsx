"use client";

const ACCENT = "#6063EE";

export function FounderFoundation() {
  return (
    <section
    id="why-they-started"
      className="border-b border-t"
      style={{ borderColor: "rgba(96,99,238,0.12)", background: "#fafafe" }}
    >
      <div className="mx-auto w-full max-w-7xl px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

        {/* Left */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[3px] mb-4" style={{ color: ACCENT }}>
            Why They Started
          </p>
          <h2
            className="font-black leading-[1.08] tracking-[-0.025em] text-[#0D0D0F] mb-6"
            style={{ fontSize: "clamp(24px, 3vw, 38px)" }}
          >
            Built from observing how{" "}
            <span style={{ color: ACCENT }}>institutions</span> actually operate.
          </h2>
        </div>

        {/* Right */}
        <div>
          <p className="text-[13px] leading-[1.9] mb-7" style={{ color: "#555" }}>
            Apurav and Lakshya grew up seeing how schools managed communication through
            fragmented systems — paper notices, disconnected tools, administrators spending
            more time coordinating than teaching. That gap between what schools needed and
            what existed is what brought them together.
          </p>
          <div className="flex gap-4">
            <div className="w-[2px] rounded-full shrink-0 self-stretch" style={{ background: ACCENT }} />
            <div>
              <blockquote className="text-[13px] italic leading-[1.78]" style={{ color: "#444" }}>
                &ldquo;The schools we saw were not broken. They were just using tools built for a different world.&rdquo;
              </blockquote>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[1.5px]" style={{ color: "#7A7A85" }}>
                — Apurav &amp; Lakshya
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
