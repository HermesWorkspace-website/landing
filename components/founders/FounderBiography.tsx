"use client";

import { useRef, useEffect } from "react";
import { Founder } from "@/types/founder";

interface FounderBiographyProps {
  founder: Founder;
}

/**
 * FounderBiography
 *
 * - IntersectionObserver → CSS stagger, zero TBT
 * - No layout-shifting wrappers
 * - Each paragraph fades in with slight Y offset, staggered
 */
export function FounderBiography({ founder }: FounderBiographyProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [founder.id]);

  return (
    <div ref={rootRef} className="fb-root flex flex-col gap-5">
      {founder.fullBio.map((paragraph, i) => (
        <p
          key={i}
          className="fb-para"
          style={{ "--i": i } as React.CSSProperties}
        >
          {paragraph}
        </p>
      ))}

      <style>{`
        .fb-para {
          font-size: clamp(13px, 1.2vw, 14px);
          line-height: 1.88;
          color: #555;
        }
        @media (prefers-reduced-motion: no-preference) {
          .fb-para {
            opacity: 0;
            transform: translateY(14px);
            transition:
              opacity 0.55s cubic-bezier(0.22,1,0.36,1),
              transform 0.55s cubic-bezier(0.22,1,0.36,1);
            transition-delay: calc(var(--i, 0) * 0.08s + 0.05s);
          }
          [data-visible="true"] .fb-para {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
