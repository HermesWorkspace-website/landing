# Founder Page — Layout QA Audit

**Date**: 2026-06-17  
**Scope**: `/founder` — desktop (`FoundersShowcase`) + mobile (`MobileFoundersShowcase`)  
**Method**: Static source analysis (all measurements from code, not screenshot)

---

## Critical Issues

### C1 — No navbar clearance on FounderHero

The fixed navbar is `h-[56px]` (mobile), `h-[60px]` (desktop), plus optional `h-[36px]` secondary bar on the founder page. Total desktop obstruction: **60–96px** depending on scroll state.

`FounderHero` has **zero top padding**. Compare:

```
Bloghero.tsx:    pt-14 sm:pt-16 lg:pt-20   (56–80px clearance)
FounderHero.tsx: py-14 lg:py-20            (no pt override → content starts behind navbar)
```

The hero's first 60–96px of content (dot-pattern background, chapter badge, headline) is hidden behind the fixed navbar until the user scrolls.

### C2 — Container inconsistency with rest of site

| Page | Container class | Max width | Padding |
|---|---|---|---|
| Founders page | `max-w-7xl` + manual `px-10` | **1280px** | 40px both sides |
| About page | `.container-page` | **1200px** | 24px / 40px / 48px responsive |
| Home page | `.container-page` | **1200px** | 24px / 40px / 48px responsive |

The founder page is **80px wider** than every other page on the site. At 1280px viewport, the founder page fills the screen edge-to-edge (1280px container + no padding from the viewport), while other pages have 48px gutters.

Impact: visual inconsistency when navigating between pages. The founder page content has less whitespace at edges than the About page.

---

## High Issues

### H1 — Vertical spacing between sections is inconsistent

```text
FounderHero bottom padding:    80px  (py-20 bottom half = 80px)
FounderFoundation top padding:  56px  (py-14 top half = 56px)
                             ─────────
Gap between Hero and Foundation: 136px dead zone
```

Conversely:

```text
FounderFoundation bottom padding: 56px (py-14 bottom half)
FoundersShowcase top padding:     64px (py-16 top half on lg: 80px)
                               ─────────
Gap between Foundation and first founder: 120–136px
```

This creates uneven breathing room: **136px between Hero→Foundation**, **120–136px between Foundation→first founder**, but the content within those sections has different density.

### H2 — Founder-quote `max-w-[500px]` too wide for editorial layout

In `FounderIdentity.tsx`, the quote is constrained to `max-w-[500px]` with no breakpoint adjustment. In a 2-column grid where the info column spans `1fr` in `grid-cols-[240px_1fr]`:

| Viewport | Content column | Quote max | Fill % |
|---|---|---|---|
| 1280px | ~960px | 500px | 52% |
| 1440px | ~1040px | 500px | 48% |
| 1920px | ~1040px (capped) | 500px | 48% |

On laptop screens, 52% fill is fine. On larger screens, the quote floats awkwardly in the left half of the column with 500px of empty space to its right.

### H3 — Section dividers `my-10` create inconsistent vertical rhythm

Between each founder sub-section, a full-width divider uses `my-10` (80px total vertical space):

```text
Identity → Biography:   40px above divider + 40px below = 80px gap
Biography → Principles: 80px gap (same)
Principles → Vision:    80px gap (same)
Vision → Signature:     48px gap (mt-12 only, no divider above signature)
```

The **Signature block has no divider above it** and only `mt-12` (48px), breaking the established 80px rhythm. This feels like an edge case — the signature section appears visually closer to Vision than the other sections are to each other.

### H4 — Founder divider `my-16 lg:my-20` is excessive between founders

Between Apurav and Lakshya, the divider has `my-16` (128px on mobile) / `lg:my-20` (160px on desktop).

| Section | Vertical gap | Description |
|---|---|---|
| Identity → Bio | 80px | Within founder |
| Bio → Principles | 80px | Within founder |
| Principles → Vision | 80px | Within founder |
| Vision → Signature | 48px | Within founder |
| **Apurav → Lakshya** | **128–160px** | **Between founders** |

The gap between founders is **2–3×** the gap between sections within a founder. On ultrawide monitors, this spreads the two founders far apart visually, making the page feel disconnected.

### H5 — `max-w-[220px]` on quote in RightPanel old slider component

`components/founders/RightPanel.tsx` has `max-w-[220px]` on the quote. This component is **not used** by the current desktop `FoundersShowcase`, but it is still exported from `index.ts`. If any page unknowingly imports it, the quote will be cramped.

---

## Medium Issues

### M1 — No background transition between sections

| Section | Background | Transition |
|---|---|---|
| FounderHero | `#f0f0ff` + dot pattern | — |
| FounderFoundation | `#fafafe` | Hard edge (border-t, border-b) |
| FoundersShowcase | `#fafafe` | Hard edge (background continues) |

The hard transition from `#f0f0ff` (dot pattern) to `#fafafe` (plain) is abrupt. There is no gradient, overlay, or visual bridge. The `border-t`/`border-b` on `FounderFoundation` partially mitigates this, but the background color change remains jarring.

### M2 — Typography sizing analysis

| Element | Code value | 1280px | 1440px | 1920px | Mobile |
|---|---|---|---|---|---|
| Hero headline | `clamp(40px, 5.5vw, 68px)` | 70px | 68px | 68px | 40px |
| Hero subtitle | `14px` | 14px | 14px | 14px | 14px |
| Founder name | `clamp(48px, 6.5vw, 88px)` | 83px | 88px | 88px | 48px |
| Quote | `13px` | 13px | 13px | 13px | 13px |
| Biography body | `clamp(13px, 1.2vw, 14px)` | ~15px | 14px | 14px | 13px |
| Principles label | `9px` | 9px | 9px | 9px | 9px |
| Principles number | `clamp(34px, 4vw, 52px)` | 51px | 52px | 52px | 34px |
| Vision heading | `clamp(26px, 3.5vw, 42px)` | 45px | 42px | 42px | 26px |
| Signature SVG | `maxWidth: 160px` | 160px | 160px | 160px | 160px |

Observations:

- **Quote at 13px**: The italic quote body text is 13px on all viewports. Compared to the biography at 14px, the quote is smaller and harder to read, especially on larger monitors.
- **Principles label at 9px**: The "Principles" section label is 9px — very small. At 1920px, a 9px label aligned with a 52px number creates extreme size disparity.
- **Biography body `1.2vw` cap at 14px**: The 14px cap means on viewports > 1167px, the body text stops growing. On 1920px and 2560px monitors, 14px body text feels small.

### M3 — Photo scaling analysis

| Property | Desktop (FounderIdentity) | Mobile (MobileFoundersShowcase) |
|---|---|---|
| Container width | `200px` → `220px` → `240px` (responsive) | 100vw |
| Aspect ratio | `3/4` (portrait) | `4/3` (landscape) |
| Sizes | `(max-width: 768px) 200px, 240px` | `100vw` |
| Object-fit | `object-cover object-top` | `object-cover` (implied) |

| Viewport | Desktop photo width | Desktop photo height (at 3/4) | Viewport fill |
|---|---|---|---|
| 1280px | 240px | 320px | 18.8% of viewport height |
| 1440px | 240px | 320px | 21.3% of viewport height |
| 1920px | 240px | 320px | 29.6% of viewport height |

On 1920px monitors, the photo occupies only **320px** of a 1080px viewport — **29.6% height**. The remaining ~70% is whitespace and text. This makes the photo feel undersized on larger displays.

Note: The container width is capped at `240px` maximum (`lg:grid-cols-[240px_1fr]`). There is no `xl:` or `2xl:` breakpoint to scale it larger.

### M4 — No footer/section transition after last founder

The last founder section (Lakshya) ends with `FounderVision` + `Signature` block. There is no bottom padding on the last `article` element. The section container `FoundersShowcase` has `py-16 lg:py-20` which provides bottom padding, but the final visual element is the signature, followed by whitespace, then the page footer.

The footer starts with no visible transition — it's a hard edge from `#fafafe` to the footer's `#0D0D0F` (dark) background.

### M5 — ProgressBar still exported but unused on desktop

`ProgressBar.tsx` is exported from `components/founders/index.ts` and was originally part of the slider layout. It's still imported by the **About page** (`components/about/FounderShowcase.tsx`), but it is **not used by the current desktop founders page**. If a developer removes it thinking it's dead code, the About page breaks.

---

## Low Issues

### L1 — `founder.ts` (local) vs `types/founder.ts` duplicate

`components/founders/founder.ts` defines a `Founder` interface identical to `types/founder.ts` (with the addition of `principles?`, `vision?`, `signature?` fields). The twin file exists because:

- `components/founders/founders-data.ts` imports from `./founder`
- All components import from `@/types/founder`

If the two files diverge, components will compile but may fail at runtime.

### L2 — `RightPanel.tsx` slider component dead code

`components/founders/RightPanel.tsx` is a full slider-right-panel component with "MEET THE FOUNDERS" header, quote, socials, "Up Next", and prev/next navigation. It uses `h-full` and `justify-between` — both depend on viewport-height containment. It is not imported by any current page component but remains in the codebase.

### L3 — Mobile name scaling `11vw` is very large

Mobile founder name: `clamp(38px, 11vw, 54px)`. At 375px viewport (iPhone SE), `11vw` = 41px. At 768px (tablet), `11vw` = 84px. But the clamp cap is 54px. On any device > 491px wide, the name is clamped at 54px. On 768px tablets, this means the name is 54px in a 768px viewport — only 7% fill. The name appears undersized on tablets in landscape.

---

## Visual Density Assessment

### Vertical Rhythm Map (Desktop 1440×900)

```text
┌─────────────────────────────────────────┐
│ ↑ 96px hidden behind navbar             │  ← CRITICAL (C1)
├─────────────────────────────────────────┤
│ FounderHero                             │
│   py-20 → 160px total                   │
│   Content height: ~400px                │
│   Total block: 560px                    │
├─────────────────────────────────────────┤
│ ↑ 136px gap (hero bottom + found top)   │  ← HIGH (H1)
├─────────────────────────────────────────┤
│ FounderFoundation                       │
│   py-14 → 112px total                   │
│   Content height: ~260px                │
│   Total block: 372px                    │
├─────────────────────────────────────────┤
│ ↑ 120–136px gap (found bottom + showcase│
│   top padding)                          │
├─────────────────────────────────────────┤
│ Apurav section                          │
│   Identity: photo + name + quote        │
│   → my-10 (80px)                        │
│   Biography: 5 paragraphs               │
│   → my-10 (80px)                        │
│   Principles: 4 items                   │
│   → my-10 (80px)                        │
│   Vision: heading + 4 paragraphs        │
│   → mt-12 (48px)                        │
│   Signature                             │
│   Total content: ~1800px                │
├─────────────────────────────────────────┤
│ ↑ 160px divider (my-20)                 │  ← HIGH (H4)
├─────────────────────────────────────────┤
│ Lakshya section                         │
│   (same structure as Apurav)            │
│   Total content: ~1800px                │
├─────────────────────────────────────────┤
│ ↓ section bottom padding: 80px          │
│ ↓ footer                                │
└─────────────────────────────────────────┘

Total page height at 1440×900: ~4400px (~4.9 viewports)
```

### Viewport Audit

| Viewport | Above fold | Scrolls needed | Total height |
|---|---|---|---|
| 1280×720 | Hero only | ~6 screens | ~4400px |
| 1440×900 | Hero only | ~5 screens | ~4400px |
| 1920×1080 | Hero only | ~4 screens | ~4400px |
| 2560×1440 | Hero + top of Foundation | ~3 screens | ~4400px |
| Mobile 375×667 | Hero banner | ~7 screens | ~5000px |

On all desktop viewports, only the Hero is visible above the fold (minus the 96px hidden behind the navbar). The Foundation section starts at ~696px scroll position, which is right around the fold line on 720px-tall screens.

---

## Section-by-Section Framing

### FounderHero

| Aspect | Assessment |
|---|---|
| Centered? | Yes — two-column grid with ratio `1fr 320px` on lg, extended to `1fr 360px` on xl. The left content (headline + body) is left-aligned within its column, the right card is right-placed. The page feels balanced. |
| Too high/low? | Content starts ~96px below the top of the viewport (behind navbar). The "Chapter One" badge is partially clipped. On first paint, the primary visual is the dot-pattern background with an illegible badge. |
| Too wide/narrow? | Container is 1280px which on a 1440px viewport leaves 80px gutters on each side. The flat card on the right (320px) feels slightly small compared to the wide headline column. |
| Eye path | Dot pattern → "Chapter One — Behind the Platform" badge (clipped) → headline → right card. The dot pattern is the strongest visual but it's decorative. The actual hierarchy (badge → headline → card) is clear once visible. |
| Verdict | Feels like a magazine opener but the navbar clipping undermines the first impression. |

### FounderFoundation

| Aspect | Assessment |
|---|---|
| Centered? | Yes — 50/50 grid left-right on desktop. |
| Too high/low? | Positioned correctly — serves as the bridge between Hero and founder details. |
| Too wide/narrow? | Same 1280px container. The left column has the section label + headline, the right column has body + pull quote. The 50/50 split works well at all viewports. |
| Pull quote | The accent bar (`w-[2px] self-stretch`) is very narrow and easy to miss. The italic quote text at 13px is the same size as the body text — it doesn't visually separate as a standout quote. |
| Verdict | Solid but the pull quote lacks visual weight. 13px italic doesn't read as a "pull quote." |

### Apurav / Lakshya sections

| Aspect | Assessment |
|---|---|
| Composed of | Identity → Biography → Principles → Vision → Signature |
| Photo column | `200–240px` wide, `3/4` aspect → 266–320px tall. Fixed, doesn't scale with viewport. On 1920px, this feels small. |
| Name typography | `clamp(48px, 6.5vw, 88px)` — strong and editorial. At 1440px, 88px name with `leading-[0.88]` creates visual impact. |
| Quote | `max-w-[500px]` for body-text, 13px italic. Long quote length (70+ words) without layout variation. |
| Biography | 5 paragraphs, each starting with the founder's full name. The repetition of "Apurav Agarwal is..." / "Lakshya Kumar is..." at the start of each paragraph creates a stiff, resume-like rhythm. |
| Principles | Numbered list with oversized editorial numbers (`clamp(34px, 4vw, 52px)`). The number's `opacity: 0.14` makes it barely visible — especially on non-Retina displays. |
| Vision | Side-by-side layout on desktop (`md:flex-row`). Left column has label + heading + rule, right column has paragraphs. The heading (`clamp(26px, 3.5vw, 42px)`) is the smallest heading on the page — smaller than the Hero subtitle. |
| Signature | SVG signature at `maxWidth: 160px` with `strokeWidth: 1.4`. On high-DPI screens, 1.4px stroke renders at ~2.8 device pixels → clean. On standard DPI, 1.4px may appear faint. |

---

## Color Audit

### Accent color `#6063EE` (brand purple)

| Location | Usage | Assessment |
|---|---|---|
| Hero headline "HermesWorkspace." | Inline span | **Good use** — emphasis on the brand name |
| Hero dot pattern background | `radial-gradient(circle, rgba(96,99,238,0.13) 1px, transparent 1px)` | **Good use** — subtle, doesn't compete |
| Foundation section label "Our Foundation" | Text color | **Good use** — clear accent for section labels |
| Foundation inline stat dots | `size-1 rounded-full` | **Good use** — minimal |
| Foundation pull quote bar | `w-[2px] shrink-0 self-stretch` | **Underused** — 2px bar is very thin, easy to miss |
| FounderIdentity role badge | Text color | **Good use** |
| FounderIdentity name accent (last names) | Inline span with accent color | **Good use** — "Apurav **Agarwal**", "Lakshya **Kumar**" |
| FounderIdentity title accent bar + text | `h-[2px] w-5` and text color | **Good use** |
| Principles numbers | `opacity: 0.14` accent | **Overused** — at 14% opacity, the numbers are nearly invisible. The accent is wasted. |
| Vision accent rule | `h-[2px] w-8 rounded-full` | **Good use** — subtle line |
| Hero flat card "Apurav" + "Lakshya" | Lakshya uses `#1A3FBE` (darker blue), not the brand accent | **Inconsistent** — Apurav gets the brand purple, Lakshya gets a completely different blue. This breaks the visual system. |
| **Total**: | 10 occurrences | 1 overused, 1 underused, 1 inconsistent |

---

## Framing Scores by Section

| Section | Score | Rationale |
|---|---|---|
| FounderHero | 6/10 | Strong opener undermined by navbar clipping. Dot pattern is unique but the right card feels disconnected from the editorial tone. |
| FounderFoundation | 7/10 | Well-paced bridge section. Clear label, good headline. Pull quote lacks punch. |
| Apurav | 7/10 | Editorial name scaling is strong. Biography is too long and repetitive. Principles numbers are nearly invisible. |
| Lakshya | 6/10 | Same issues as Apurav, plus the accent color inconsistency (different blue). |
| Mobile | 5/10 | `4/3` portrait crops differently from desktop `3/4`. Stagger animations are nice but the 9px labels are too small to read. |

---

## Final Scores

| Category | Score | Strengths | Weaknesses |
|---|---|---|---|
| Visual hierarchy | 6/10 | Strong name scaling. Clear section labels. | No navbar clearance. Quote 13px too small. Principles numbers invisible. |
| Typography | 7/10 | Bebas Neue editorial names. Good clamp scaling. | 9px labels too small. Quote not differentiated from body. Bio body capped at 14px. |
| Layout | 5/10 | Editorial scroll flow. Clear section structure. | Inconsistent container width (vs site). Uneven vertical rhythm. 160px between-founders gap. |
| Responsiveness | 4/10 | Some clamp values. Mobile/desktop split. | Photo doesn't scale past 240px. Container doesn't match site. No breakpoints past xl. |
| Founder storytelling | 7/10 | Deep bios. Principles + Vision give dimension. | Bio paragraphs all start with full name. Quote feels generic. Missing measurable accomplishments. |
| Editorial quality | 6/10 | Signature SVG animation is a nice detail. Magazine structure is there. | Pull quote too small. Principles numbers wasted. Divider rhythm inconsistent. |
| Information density | 5/10 | 5-paragraph bios are substantive. | 4 principles + 4 vision paragraphs per founder = information overload. Page is 4400px+ long. |
| Mobile experience | 5/10 | Stagger animations smooth. Touch targets adequate. | `4/3` photo vs `3/4` desktop = different crop. 9px text. No quick-jump nav in long scroll. |

### Overall: 5.6/10

The page has the bones of a strong editorial layout but is undermined by:

1. **Navbar clipping** (C1) — the most immediate UX defect
2. **Inconsistent spacing** (H1, H3, H4) — uneven rhythm throughout
3. **Container mismatch** (C2) — feels disconnected from the rest of the site
4. **Photo doesn't scale** (M3) — undersized on large monitors
5. **Typography plateaus** (M2) — body text, quote, and labels stop scaling too early
