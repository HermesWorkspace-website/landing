# Founder Page — Mobile-Only Audit

**Date:** 15 June 2026
**Audited files:** `Mobile.tsx`, `Mobilefoundersshowcase.tsx`, `FounderClient.tsx` (page-level)
**Desktop assumption:** Editorial scroll layout (Apurav → Bio → Principles → Vision → Signature → Lakshya → ...)
**Mobile questions:** Does mobile follow the same pattern? Does it need its own approach?

---

## 1. Current Mobile Component Tree

```
Mobile.tsx (default export MobilePage)
├── MobileHero          ← full-screen brand landing
├── MobileFoundersShowcase   ← inline, slider-based
│   ├── Portrait card with overlay gradient
│   ├── Role badge
│   ├── Name (Bebas, 17vw each line)
│   ├── Title (accent bars)
│   ├── Summary bio (paragraph)
│   ├── "Read full biography →" button (accordion toggle)
│   ├── Accordion: fullBio (5 paragraphs, expandable)
│   ├── Focus pills (4 tags)
│   ├── Quote (blockquote, italic)
│   ├── Social icons
│   └── [state: activeIndex, direction, expanded]
│       ├── auto-rotation (6s timer)
│       ├── swipe detection (touchStart/touchEnd)
│       └── AnimatePresence slide transitions
├── MobileMission       ← 3 product feature cards
├── MobileFAQ           ← 4 accordion Q&A
└── MobileCTA           ← dark conversion card

Mobilefoundersshowcase.tsx (standalone, exported from index.ts)
├── Portrait full-width with overlay
├── Role, Name, Title over portrait
├── Focus areas + Socials (horizontal bar)
├── Quote
├── Key Highlights (numbered, 01/02/03/04)
├── Full biography (5 paragraphs, always visible)
├── Principles (4 items, numbered editorial)
├── Vision (heading + 4 paragraphs)
├── Signature block
└── Navigation (Prev/Next + dots)
    ├── swipe detection
    └── AnimatePresence slide transitions
```

**Important discovery:** There are TWO separate mobile founder showcase implementations:

| Component | File | Used where? | Basis |
|---|---|---|---|
| `MobileFoundersShowcase` (inline) | `Mobile.tsx:152` | Rendered by `MobilePage` at line 640 | Slider with auto-rotation, accordion bio |
| `MobileFoundersShowcase` (standalone) | `Mobilefoundershowcase.tsx` | Exported from `index.ts` but **not imported anywhere in the live page** | Slider with full biography, principles, vision, signature, prev/next |

The standalone `Mobilefoundershowcase.tsx` is never rendered — it is an orphan. It contains Principles and Vision content that the live mobile page (`Mobile.tsx`) does NOT show.

---

## 2. Current Mobile Reading Flow (Actual — What Users Experience)

```
FULL SCREEN: "Building The Future Of Institutional Communication"
             ↓ scroll ("Meet our Founders" button)
SLIDER VIEW 1: Apurav (portrait, name, accordion bio, pills, quote)
             ↓ 6 seconds OR swipe
SLIDER VIEW 2: Lakshya (portrait, name, accordion bio, pills, quote)
             ↓ scroll
MISSION: "Infrastructure For Modern Education" (3 feature cards)
             ↓ scroll
FAQ: "Questions? Answered." (4 accordion items)
             ↓ scroll
CTA: "Designed for modern educational operations." (dark card)
```

---

## 3. Current Mobile Hierarchy Problems

| Issue | Where | Why it matters |
|---|---|---|
| **Hero blocks the founder** | `MobileHero` is full-screen | User sees a brand headline before any founder content. They must recognize the page is `/founder` and still scroll past a marketing splash page. |
| **Only one founder visible at a time** | `MobileFoundersShowcase` renders only `FOUNDERS[activeIndex]` | User can only see one founder without swiping. No way to compare, no sense of "both founders." |
| **Auto-rotation steals control** | 6-second timer auto-advances | User reading Apurav's bio gets interrupted when it switches to Lakshya. The `expanded` state pauses rotation but the timer resumes on collapse. |
| **Biography hidden behind accordion** | "Read full biography →" button | User must tap to see the full bio. They see only the 1-paragraph `summaryBio` by default. The main narrative content is concealed. |
| **Principles + Vision not shown** | `Mobile.tsx` does not render Principles or Vision | These are the strongest editorial sections (per desktop audit), but mobile users never see them. They exist in `Mobilefoundersshowcase.tsx` but that component is unused. |
| **Mission is not founder content** | `MobileMission` renders 3 product feature cards | User came to `/founder` to learn about founders. Instead they get product features. This belongs on the homepage. |
| **FAQ is not founder content** | `MobileFAQ` has company Q&A | Generic questions like "Is it only for communication?" have nothing to do with founder storytelling. |
| **CTA ends on marketing** | `MobileCTA` is a dark conversion card | The page closes with "Partner with HermesWorkspace" instead of the founder's voice. No signature, no closing mark. |

---

## 4. Mobile Component Audit

### Components in `Mobile.tsx`

| Component | Purpose | Still Needed? | Verdict |
|---|---|---|---|
| `MobileHero` | Full-screen brand intro with "Meet our Founders" CTA | No — redundant on `/founder` page | **Remove** |
| `MobileFoundersShowcase` (inline) | Slider showing one founder at a time with accordion bio | Partially — the slider behavior and accordion are wrong. The identity + bio content is needed. | **Rewrite** |
| `MobileMission` | 3 product feature cards | No — not founder content | **Remove** |
| `MobileFAQ` | 4 accordion Q&A | No — not founder content | **Remove** |
| `MobileCTA` | Dark conversion card | No — not founder content | **Remove** |

### Components NOT in `Mobile.tsx` but available

| Component | Exists in | Currently Used? | Should It Be? |
|---|---|---|---|
| `FounderPrinciples` | `FounderPrinciples.tsx` | Not on mobile (not imported) | **Yes** — strongest editorial content |
| `FounderVision` | `FounderVision.tsx` | Not on mobile (not imported) | **Yes** — strongest editorial content |
| `FounderSignature` | `FounderSignature.tsx` | Not on mobile (not in `Mobile.tsx`) | **Yes** — editorial closing mark |

### Orphaned Component

| File | Status |
|---|---|
| `Mobilefoundershowcase.tsx` | Exported from `index.ts` but **never imported** in the live page. Contains a more complete slider (with Principles, Vision, Signature) than what users actually see. This file's content is the right editorial direction, but the slider wrapper is wrong. |

---

## 5. Mobile Scroll Experience

### Current (with Hero + Mission + FAQ + CTA)

#### 360px width (usable height ~650px)

| Content | Position | Notes |
|---|---|---|
| MobileHero (full screen) | 0-650px (1 viewport) | Brand splash, no founder content |
| Apurav portrait + name | ~650-900px | ~250px visible |
| Apurav title + summary + pills + quote | ~900-1200px | ~300px |
| Swipe to Lakshya (same pattern) | ~1200-1800px | Same content, different person |
| MobileMission (3 feature cards) | ~1800-2600px | ~800px of product content |
| MobileFAQ (4 items) | ~2600-3200px | ~600px |
| MobileCTA (dark card) | ~3200-3600px | ~400px |

**Total scroll depth: ~5-6 viewports**
**Founder content only:** ~2 viewports (and only partially visible due to slider)
**Non-founder content:** ~3-4 viewports (Hero + Mission + FAQ + CTA)

#### 390px width (usable height ~700px, iPhone 14)

| Content | Position |
|---|---|
| MobileHero | 0-700px |
| Apurav identity + summary | ~700-950px |
| Apurav pills + quote + socials | ~950-1150px |
| Lakshya (after swipe, same depth) | ~1150-1600px |
| MobileMission | ~1600-2300px |
| MobileFAQ | ~2300-2800px |
| MobileCTA | ~2800-3100px |

**Total scroll depth: ~4-5 viewports**
**Note:** `summaryBio` (1 paragraph) is the only bio visible. Full bio requires tapping accordion. Principles and Vision are missing entirely.

#### 412px width (usable height ~750px, Galaxy Note)

Similar proportions but slightly shallower scroll depth due to wider content.

**Reading fatigue assessment:** High. The user must:
1. Scroll past a full-screen hero to reach any founder content
2. Swipe or wait 6 seconds to see the second founder
3. Tap "Read full biography" to see actual narrative content
4. Scroll through product features, FAQ, and a CTA to reach the page bottom

---

## 6. Content Comparison: What Mobile Shows vs. What Mobile Should Show

### What Mobile Currently Shows (per founder via slider)

| Content | Mobile.tsx | Visible by default? |
|---|---|---|
| Photo | Yes | Yes |
| Role | Yes | Yes |
| Name | Yes | Yes |
| Title | Yes | Yes |
| Summary bio (1 paragraph) | Yes | Yes |
| Full bio (5 paragraphs) | Yes | **No — hidden behind accordion** |
| Focus areas | Yes | Yes |
| Quote | Yes | Yes |
| Social links | Yes | Yes |
| Principles (4 items) | **No** | N/A |
| Vision (4 paragraphs) | **No** | N/A |
| Signature | **No** | N/A |

### What Desktop Editorial Layout Shows (per founder, scroll)

| Content | Desktop (new) | Mobile (current) |
|---|---|---|
| Photo, Name, Role, Title, Socials | Yes | Yes |
| Focus Areas | Yes | Yes |
| Quote | Yes | Yes |
| Full Biography (5 paragraphs) | Yes, always visible | Hidden behind accordion tap |
| Principles (4 items) | Yes | **Missing** |
| Vision (4 paragraphs) | Yes | **Missing** |
| Signature | Yes | **Missing** |

**Verdict:** Mobile shows significantly less founder content than desktop. The best editorial content (Principles, Vision, Signature) is completely absent from the mobile experience.

---

## 7. Mobile Architecture Decision

### Question: Should mobile follow the same scroll layout as desktop?

**Answer: Yes, but adapted for mobile constraints.**

Reasoning:

| Factor | Slider (current) | Scroll (proposed) |
|---|---|---|
| **Founder content visible** | One at a time, requires swipe | Both in sequence, natural scroll |
| **Principles + Vision** | Not shown | Shown in reading order |
| **Auto-rotation** | Interrupts reading | None — user controls pace |
| **Scroll fatigue** | High (Hero + Mission + FAQ padding) | Moderate (only founder content) |
| **Cognitive load** | User manages slider state + accordion + timer | User only scrolls |
| **Consistency with desktop** | Different architecture, different content | Same content, same order, mobile-optimized spacing |

### Recommended Mobile Flow

```
Page load: User sees Apurav's identity immediately (no hero splash)

Apurav Section
├── Photo + Name + Role + Title
├── Socials + Focus Areas
├── Quote
├── Biography (full, NOT accordion — always visible)
├── Principles (numbered editorial, shorter bodies on mobile)
├── Vision (heading + prose)
├── Signature + Name/Title

Divider (subtle rule or spaced transition)

Lakshya Section
├── Photo + Name + Role + Title
├── Socials + Focus Areas
├── Quote
├── Biography (full)
├── Principles
├── Vision
├── Signature + Name/Title

Site footer (no FAQ, no CTA, no Mission)
```

**Why NOT the accordion approach for mobile:**
- The accordion hides the biography behind a tap, meaning the user must actively choose to read. On desktop, the bio is always visible. Mobile should not get a degraded experience.
- 5 paragraphs of `fullBio` at 12px font = ~300-400px on mobile. That's about half a viewport. It fits naturally in a scroll layout without feeling overwhelming.
- Principles and Vision add content value that justifies the scroll depth.

**Why NOT separate mobile-only content:**
- The page purpose is the same on all devices: tell the founders' story. Mobile shouldn't get product features (Mission) or marketing (CTA) that desktop doesn't show.
- If a footer CTA is desired, it should be the site-wide footer, not a founder-page-specific one.

### Mobile Adaptations Needed

| Desktop Approach | Mobile Adaptation |
|---|---|
| Photo left + identity right (side by side) | Photo full-width, identity below (stacked) |
| `clamp(200px, 18vw, 300px)` photo width | Full-width photo, `max-height: 40vh` |
| `clamp(52px, 6.5vw, 96px)` name | `clamp(32px, 10vw, 48px)` name |
| 5-paragraph bio at 14px | 5-paragraph bio at 13px, reduced gaps |
| Principles: 4 items with full body | Principles: 4 items with condensed body (or same but scrollable) |
| Vision: 2-column layout | Vision: single-column, heading above prose |
| Focus Areas: dot-separated inline text | Focus Areas: inline text or compact tags |
| Navigation: none (scroll) | Navigation: none (scroll) |

---

## 8. Files to Remove

| File | Reason |
|---|---|
| `Mobile.tsx` | Entire file — contains Hero, slider, Mission, FAQ, CTA. The `MobileFoundersShowcase` inside it is slider-based and missing Principles/Vision/Signature. |
| `Mobilefoundershowcase.tsx` | Orphaned — exported from `index.ts` but never imported in the live page. The content (Principles, Vision, Signature) is correct but the slider wrapper is wrong. |

## 9. Files to Create

| File | Purpose |
|---|---|
| `MobileFounderPage.tsx` (or similar) | New mobile-only page component. Renders both founders in scroll layout with Identity → Bio → Principles → Vision → Signature. No slider state, no auto-rotation, no accordion. Reuses shared components from `components/founders/` where possible. |

## 10. Shared Components to Reuse (not rewrite)

These already exist in `components/founders/` and can be used directly in the mobile page:

| Component | Needs mobile-only changes? |
|---|---|
| `FounderPhoto` | No — already responsive. |
| `FounderSignature` | No — already responsive (max-width 160px). |
| `FounderPrinciples` | Yes — currently designed for desktop layout. Mobile may need adjusted sizing and spacing, but the component logic (render principles if they exist) is correct. |
| `FounderVision` | Yes — currently uses a 2-column grid. Mobile needs single-column. Either add responsive behavior to the component or create a mobile variant. |
| `founders-data.ts` | No changes needed. All data (principles, vision, achievements, etc.) is shared. Add `signature.path` when available. |

## 11. Components to Create or Adapt for Mobile

| Component | Action |
|---|---|
| `MobileFounderIdentity` | New or adapted — photo full-width, identity stacked below. Can reuse desktop `FounderIdentity` with responsive props or create a separate mobile version. |
| `MobileFounderBiography` | Adapted — same 5 paragraphs, reduced font size (13px vs 14px), tighter leading (1.75 vs 1.85). No accordion hiding. |

## 12. Final Verdict

### KEEP

| Item | Notes |
|---|---|
| Founder photo (full-width on mobile) | Core identity element |
| Name, Role, Title | Core identity |
| Social links | Credibility |
| Focus Areas | Domain expertise indicator |
| Quote | Personal voice |
| Full biography (5 paragraphs) | Always visible, no accordion |
| Principles (4 items) | Currently missing from mobile |
| Vision (heading + 4 paragraphs) | Currently missing from mobile |
| Signature | Editorial closing mark |

### REMOVE

| Item | Notes |
|---|---|
| `Mobile.tsx` | Entire file — architecture is slider-based |
| `Mobilefoundershowcase.tsx` | Orphan — never rendered in live page |
| MobileHero | Brand splash, not founder content |
| MobileMission | Product features, not founder content |
| MobileFAQ | Company Q&A, not founder content |
| MobileCTA | Marketing conversion, not founder content |
| Auto-rotation (6s timer) | Interrupts reading, no place in editorial scroll |
| Swipe navigation | No carousel = no swipe needed |
| Accordion bio ("Read full biography →") | Bio should be always visible |
| "01 / 02" index | Carousel artifact |
| Prev/Next + dot nav | Carousel artifact |
| Summary bio (shown as primary bio) | Redundant with `fullBio[0]` |

### REWRITE

| Item | What to change |
|---|---|
| Mobile page wrapper | New file that renders both founders in DOM order. No state management for active founder. |
| MobileFounderIdentity | Photo full-width (not side-by-side), identity stacked below. Smaller name scale. |
| MobileFounderBiography | Always visible (no accordion). 13px font, 1.75 leading. |
| MobileFounderPrinciples | Same 4 items, adjusted spacing for mobile. |
| MobileFounderVision | Single column (collapse the 2-col grid). Heading above prose. |
| `FounderClient.tsx` (page-level) | Remove `initialIndex` logic (no slider = no deep link index). Remove FAQ/CTA imports. Mobile section should render new `MobileFounderPage` without `initialIndex` prop. |

### Recommended Mobile Page Structure (Final)

```
MobileFounderPage (new file, scroll-based, no slider state)

#apurav-agarwal
  ┌──────────────────────────────┐
  │  [Photo — full width]        │  ← max-height 40vh, rounded
  │                              │
  │  CO-FOUNDER                  │  ← role badge, centered
  │  APURAV                      │  ← Bebas, ~10vw each
  │  AGARWAL                     │  ← accent color
  │  Managing Director & CEO     │  ← title, accent rule
  │                              │
  │  [in] [X] [ig]               │  ← socials, centered
  │  Strategy · Leadership ·     │  ← focus areas, muted
  │  Deployment · Growth         │
  │                              │
  │  "Quote..."                  │  ← blockquote, italic
  ├──────────────────────────────┤
  │                              │
  │  Biography                   │  ← 5 paragraphs, always visible
  │  (full prose, 13px)          │    13px, 1.75 leading
  │                              │
  ├──────────────────────────────┤
  │                              │
  │  Principles                  │  ← 4 items, numbered
  │  01 Clarity over complexity  │    editorial style
  │  02 Systems before scale     │    12px body
  │  03 Reliability...           │
  │  04 Institutions first       │
  │                              │
  ├──────────────────────────────┤
  │                              │
  │  Vision                      │  ← heading + prose
  │  Looking Ahead               │    single column
  │  (4 paragraphs, first-person)│    13px, 1.85 leading
  │                              │
  │  ~~~~ SIGNATURE ~~~~         │  ← SVG (max 160px)
  │  Apurav Agarwal              │  ← name
  │  Managing Director & CEO     │  ← title
  └──────────────────────────────┘

  [spaced transition]

#lakshya-kumar
  ┌──────────────────────────────┐
  │  [same structure]            │
  └──────────────────────────────┘

Site-wide footer
```

### Estimated Mobile Scroll Depth (Proposed)

| Viewport | Scroll depth | Founder content |
|---|---|---|
| 360px | ~6-7 viewports | 100% founder |
| 390px | ~5-6 viewports | 100% founder |
| 412px | ~5-6 viewports | 100% founder |

Each founder section occupies ~2.5-3 viewports (identity ~1, bio ~0.5, principles ~0.5, vision ~0.5, signature ~0.25). Two founders = ~5-6 viewports. No filler sections.
