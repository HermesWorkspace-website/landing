# Founder Page Audit v2

**Audited:** 15 June 2026
**Architecture assumption:** Long-form editorial profile with vertical scrolling
**Not:** Slider, carousel, slideshow, or previous/next navigation

---

## Deliverable 1: Complete Content Inventory

Every piece of content currently on the `/founder` page, for both desktop and mobile.

---

### Desktop Sections (rendered at `md:` and above)

Each section is listed in DOM order as rendered by `FoundersShowcase.tsx` + `FounderClient.tsx`.

| # | Section Name | Rendered By | Founder-specific? | Necessary? | Verdict |
|---|---|---|---|---|---|
| 1 | Ambient background blobs | FoundersShowcase.tsx:31-34 | No | Low | **Keep** — minimal, inoffensive atmosphere |
| 2 | "Meet the Founders" label + dot nav | FoundersShowcase.tsx:39-73 | Yes (label) / No (nav) | No | **Remove** — label is redundant (user is already on `/founder`), dots are carousel UI |
| 3 | Founder Photo | Founderidentity.tsx:43-58 | Yes | Yes | **Keep** |
| 4 | Founder Social Icons | Founderidentity.tsx:61-97 | Yes | Yes | **Keep** — below photo |
| 5 | Role badge | Founderidentity.tsx:104-111 | Yes | Yes | **Keep** |
| 6 | Founder Name (Bebas Neue, large) | Founderidentity.tsx:114-125 | Yes | Yes | **Keep** |
| 7 | Accent rule + Title | Founderidentity.tsx:128-139 | Yes | Yes | **Keep** |
| 8 | Focus Areas (inline dot-separated text) | Founderidentity.tsx:142-149 | Yes | Yes | **Keep** — consider reformatting |
| 9 | Gradient rule (identity → bio) | Founderidentity.tsx:152-157 | No | Low | **Keep** — serves as visual transition |
| 10 | Quote | Founderidentity.tsx:160-170 | Yes | Yes | **Keep** |
| 11 | Gradient rule (identity row → bio row) | FoundersShowcase.tsx:83-90 | No | Low | **Merge/reduce** — decorative spacer |
| 12 | FounderBiography (5 paragraphs `fullBio`) | Founderbiography.tsx | Yes | Yes | **Keep** |
| 13 | Vertical divider (bio → highlights) | FoundersShowcase.tsx:101-106 | No | Low | **Remove** — unnecessary in single-column layout |
| 14 | FounderHighlights ("Key Highlights" numbered list) | Founderhighlights.tsx | Yes | Yes | **Rewrite** — numbered list feels résumé-like; make editorial |
| 15 | Gradient rule (bio → principles) | FoundersShowcase.tsx:115-122 | No | Low | **Merge/reduce** |
| 16 | FounderPrinciples (numbered editorial list, 4 items) | FounderPrinciples.tsx | Yes | Yes | **Keep** — new, strong editorial content |
| 17 | Gradient rule (principles → vision) | FoundersShowcase.tsx:131-138 | No | Low | **Merge/reduce** |
| 18 | FounderVision (2-col grid: heading + prose) | FounderVision.tsx | Yes | Yes | **Keep** — new, strong editorial content |
| 19 | FounderSignature (SVG path) | FounderSignature.tsx | Yes | Yes | **Keep** — editorial closing mark |
| 20 | Name + Title under signature | FoundersShowcase.tsx:162-172 | Yes | Yes | **Keep** |
| 21 | Founder index ("01 / 02") | FoundersShowcase.tsx:176-183 | Yes | No | **Remove** — carousel artifact |
| 22 | FounderNavigation (Prev/Next buttons + dots) | Foundernavigation.tsx | No | **No** | **Remove** — carousel artifact |
| 23 | FAQ (6 accordion questions) | FAQ.tsx | No | **No** | **Remove** — belongs on /about or /faq |
| 24 | CTA ("Partner with HermesWorkspace" dark card) | CTA.tsx | No | **No** | **Remove** — marketing, belongs on /contact |

---

### Mobile Sections (rendered at `md:hidden`)

From `Mobile.tsx`.

| # | Section Name | Founder-specific? | Necessary? | Verdict |
|---|---|---|---|---|
| 25 | MobileHero ("Building The Future Of Institutional Communication") | No | **No** | **Remove** — full-screen brand intro, redundant on /founder page |
| 26 | MobileFoundersShowcase (photo, name, role, bio accordion, pills, quote, socials) | Yes | Yes | **Keep** but **restructure** for scroll-not-slider |
| 27 | MobileMission (3 feature cards: "Institutional Communication", etc.) | No | **No** | **Remove** — product content, belongs on homepage |
| 28 | MobileFAQ (4 accordion questions) | No | **No** | **Remove** |
| 29 | MobileCTA (dark conversion card) | No | **No** | **Remove** |

---

### Data (from `founders-data.ts`)

Both founders have:

| Field | Present? | Notes |
|---|---|---|
| `id` | Yes | Slider artifact — may not be needed |
| `founderId` | Yes | `"apurav"` / `"lakshya"` — useful for deep links |
| `firstName` / `lastName` | Yes | Strong |
| `role` | Yes | `"Co-Founder"` |
| `title` | Yes | `"Managing Director & CEO"` / `"Director & CTO"` |
| `summaryBio` | Yes | 1-sentence — used on About page, not founder page |
| `fullBio` | Yes | 5 paragraphs each — strong editorial content |
| `narrative` | Yes | 1-paragraph condensed — redundant with `fullBio` **Remove** `narrative` if `fullBio` is kept |
| `achievements` | Yes | 4 items each |
| `quote` | Yes | 1 sentence each — strong |
| `focusAreas` | Yes | 4 items each — `narrative` is used in the old compact layout; check if still needed |
| `accentColor` | Yes | Per-founder color identity |
| `photo` | Yes | ImageKit URLs |
| `socialLinks` | Yes | LinkedIn, Twitter, Instagram |
| `principles` | Yes | 4 principles each — new, strong editorial |
| `vision` | Yes | Heading + 4 paragraphs each — new, strong editorial |
| `signature` | No | Not yet populated in data — SVG paths needed |
| `avatarInitials` | Yes | `"AA"` / `"LK"` — useful as photo fallback |

**Weak content:**
- `narrative` field is redundant with `fullBio` — both contain similar biographical content
- `achievements` items are generic: "Founded HermesWorkspace", "Leads product vision" — these describe the role, not specific measurable achievements

**Missing content:**
- `signature.path` + `signature.viewBox` — not yet populated
- Place of origin / personal background detail (both founders are from Ranchi but this is only in the meta description, not the page body)

---

## Deliverable 3: Page Hierarchy Audit

### Current Hierarchy (Desktop, as rendered)

```
#section
  ├── ambient background
  └── .max-w-6xl container
      ├── "Meet the Founders" + dot nav          ← CAROUSEL UI
      ├── FounderIdentity
      │   ├── Photo + Socials
      │   └── Role, Name, Title, Focus Areas, Quote
      ├── gradient rule
      ├── .grid (2-column: bio | highlights)       ← TWO-COLUMN LAYOUT
      │   ├── FounderBiography (5 paragraphs)
      │   ├── vertical divider
      │   └── FounderHighlights (numbered list)
      ├── gradient rule
      ├── FounderPrinciples (numbered editorial)   ← STRONG
      ├── gradient rule
      ├── FounderVision (2-col: heading + prose)   ← STRONG
      ├── Signature + Name/Title + "01 / 02"       ← CAROUSEL ARTIFACT
      ├── FounderNavigation (Prev/Next + dots)     ← CAROUSEL UI
  FAQ section                                      ← NOT FOUNDER-SPECIFIC
  CTA section                                      ← NOT FOUNDER-SPECIFIC
```

**Problems with current hierarchy:**

1. **Two-column bio layout** — forces the user to choose between reading biography or scanning highlights. In an editorial profile, the reader's eye should flow linearly.
2. **Gradient rules between every section** — decorative noise. 4 identical rules in one scroll.
3. **Carousel artifacts** — "Meet the Founders" label, dot nav, "01/02" index, Prev/Next — all imply the user is inside a widget, not reading a story.
4. **FAQ + CTA** follow the signature, which breaks the editorial mood. The page ends with a marketing pitch instead of the founder's voice.

### Proposed Hierarchy

```
Page: "Apurav Agarwal & Lakshya Kumar — Founders"
#apurav-agarwal
  ├── Section label: "Co-Founder & CEO"
  ├── Photo (left) + Name (right)
  ├── Title + Social links
  ├── Focus Areas (as inline text or subtle tags)
  ├── Quote
  ├── Biography (full prose, single column)
  ├── Principles (editorial numbered list)
  ├── Vision (editorial prose)
  ├── Signature
  └── Name / Title

  [full-width transition / divider]

#lakshya-kumar
  ├── Section label: "Co-Founder & CTO"
  ├── Photo (left) + Name (right)
  ├── Title + Social links
  ├── Focus Areas
  ├── Quote
  ├── Biography (full prose, single column)
  ├── Principles (editorial numbered list)
  ├── Vision (editorial prose)
  ├── Signature
  └── Name / Title

Footer (site-wide, not page-specific)
```

**Key changes:**
- **No slider state** — both founders render in DOM order. User scrolls from Apurav → Lakshya.
- **No dot nav, no Prev/Next, no "01/02"** — all carousel artifacts removed.
- **Single-column biography** — no split layout, no vertical divider, no competing columns.
- **Reduced gradient rules** — one per founder section transition, not between every subsection.
- **No FAQ, no CTA** — page ends with the founder's signature.
- **Deep-link anchor IDs** — `#apurav-agarwal` and `#lakshya-kumar` for direct linking.

---

## Deliverable 4: Scroll Experience Audit

### Desktop 1440px (usable height ~900px)

| Content | Position | Notes |
|---|---|---|
| Apurav photo + name | Viewport top | Hero-dominant |
| Title + Socials + Focus Areas + Quote | Above fold | ~350-400px used |
| Gradient rule | At fold or just below | |
| Biography (5 paragraphs) | ~200px below fold | ~700px of text |
| Principles (4 items) | ~2 scrolls down | |
| Vision (heading + 4 paragraphs) | ~3 scrolls down | |
| Signature | ~3.5 scrolls down | |
| Transition divider | ~3.5 scrolls | |
| Lakshya photo + name | ~4 scrolls down | Heavier scroll to reach |
| Lakshya content (bio + principles + vision + signature) | ~4-7 scrolls | |

**Estimated total scroll depth:** ~7-8 full viewports (both founders + decorative spacing)

### Desktop 1280px

Similar to 1440px. Photo at `clamp(200px, 18vw, 300px)` = ~230px wide. Identity block ~350px.
Total scroll depth: ~8-9 viewports.

### Laptop 1024px (usable height ~820px)

| Content | Position |
|---|---|
| Apurav photo + name | Above fold |
| Title + Socials | Above fold |
| Focus Areas + Quote | Fold line (partial) |
| Biography | Below fold |
| Principles | Requires ~2 scrolls |
| Vision | Requires ~3 scrolls |
| Signature | Requires ~3.5 scrolls |
| Lakshya start | Requires ~4-5 scrolls |

**Estimated scroll depth:** ~10-12 viewports — too long for the amount of content, primarily due to excessive vertical spacing (gradient rules, generous padding, two-column layout waste).

### Mobile 390px (usable height ~700px)

Current mobile page has:
- Hero (full screen — 1 viewport of brand content, not founder content)
- MobileFoundersShowcase (portrait + accordion bio + pills + quote)
- MobileMission (3 feature cards)
- MobileFAQ (4 questions)
- MobileCTA

**Estimated scroll depth:** ~6-8 viewports. Only ~2 of those are founder content.

---

## Deliverable 5: Founder Content Audit

### Apurav Agarwal — Content

| Piece | Length | Quality | Verdict |
|---|---|---|---|
| Photo | 1 image | Strong — professional portrait | Keep |
| `role` | 10 chars | "Co-Founder" — good | Keep |
| `firstName + lastName` | 14 chars | Strong brand name | Keep |
| `title` | 28 chars | "Managing Director & CEO" | Keep |
| `focusAreas` | 4 items, ~20-30 chars each | Good — describes domain expertise | Keep |
| `quote` | 1 sentence, ~100 chars | Strong — personal voice | Keep |
| `fullBio` | 5 paragraphs, ~150-200 words each | Strong — narrative, detailed, specific | **Keep** |
| `narrative` | 1 paragraph, ~100 words | Redundant with `fullBio` | **Remove** (duplicate) |
| `achievements` | 4 items, ~40-60 chars each | **Weak** — generic ("Leads product vision", "Drives platform direction"). These describe job duties, not accomplishments. | **Rewrite** — add specific, measurable achievements |
| `principles` | 4 items, title + 40-70 word body | **Strong** — first-person, specific, editorial | Keep |
| `vision` | heading + 4 paragraphs, ~400 words total | **Very strong** — personal, thought-leadership quality | Keep |

### Lakshya Kumar — Content

| Piece | Length | Quality | Verdict |
|---|---|---|---|
| Photo | 1 image | Strong | Keep |
| `role` | 10 chars | "Co-Founder" | Keep |
| `firstName + lastName` | 14 chars | Strong | Keep |
| `title` | 16 chars | "Director & CTO" | Keep |
| `focusAreas` | 4 items | Good | Keep |
| `quote` | 1 sentence | Strong — engineering-focused, authentic | Keep |
| `fullBio` | 5 paragraphs | Strong — but slightly more technical than Apurav's | Keep |
| `narrative` | 1 paragraph | Redundant with `fullBio` | **Remove** |
| `achievements` | 4 items | **Weak** — same issue ("Architects core platform", "Ensures reliability"). Generic role descriptions. | **Rewrite** |
| `principles` | 4 items | **Strong** — specific engineering philosophy | Keep |
| `vision` | heading + 4 paragraphs | **Very strong** — technical depth, authentic voice | Keep |

### Duplicate Content

1. **`narrative` field** — exists on both founders but duplicates `fullBio[0]` (first paragraph). The narrative is a condensed version of the first bio paragraph. In the old compact layout it was used as a summary; in the editorial layout it serves no purpose.

2. **`achievements` overlap** — both founders have "Founded/Cofounded HermesWorkspace" as their first achievement. This is identical content. In an editorial profile that shows both founders, this would appear twice — once in Apurav's section and once in Lakshya's. Consider whether both need it or whether the first occurrence suffices.

### Weak Content

**Achievements** (both founders) — needs the most improvement. Current items describe job scope, not specific accomplishments. Examples of what's missing:
- Metrics (schools onboarded, team size, revenue milestones)
- Specific launches or releases
- Partnerships established
- Awards or recognition

### Strong Content

1. **`fullBio`** — well-written narrative paragraphs. Apurav's bio tells a founding story (observed problem → started company). Lakshya's describes technical leadership.
2. **`principles`** — strong editorial voice. Each principle has a clear title and a body paragraph that reads like a personal conviction.
3. **`vision`** — the strongest editorial content on the page. First-person, specific, authentic. Reads like a magazine interview.

---

## Deliverable 6: Evaluate New Sections

### Founder Principles

**Should it exist?** Yes. It is the strongest editorial addition. The principles read like personal convictions, not company values. They distinguish the page from a corporate "Our Team" page.

**Where should it live?** Between Biography and Vision. The reading order is:
1. Who they are (photo + name) → identity
2. What they did (biography) → story
3. What they believe (principles) → philosophy
4. Where they're going (vision) → future

**How many principles?** 4 is the right number. Fewer than 3 feels incomplete; more than 5 feels like a listicle.

**Desktop impact:** Adds ~400px of vertical space. Fits comfortably between bio (~700px) and vision (~400px).

**Mobile impact:** Principles will add significant scroll depth on mobile. Each principle is title + ~50 word body. Four principles = ~500px on mobile. Consider accordion or 2-column layout on mobile.

### Founder Vision

**Should it exist?** Yes. The vision content is the most authentic first-person writing on the page. It transforms the page from "founder biography" to "founder thinking."

**Where should it live?** After Principles, before Signature. Completes the narrative arc: story → philosophy → future.

**Desktop impact:** ~400px vertical space. The current 2-column layout (narrow label column + wider prose column) works well on desktop but may need adjustment.

**Mobile impact:** 4 paragraphs of dense text. On mobile, the 2-column layout should collapse to single-column. The heading should be above the prose, not beside it.

### Founder Signature

**Current placement:** After Vision, before Nav. In the proposed architecture, after Vision as the page-ending mark.

**Best placement:** At the end of each founder's section, before the transition to the next founder. Acts as a "chapter close" in the editorial story.

**Desktop impact:** Minimal — ~80px for SVG + name block. Adds a premium editorial touch.

**Mobile impact:** Signature SVG at max 160px wide + name below. Fits naturally.

**Needed:** `signature.path` and `signature.viewBox` must be added to `founders-data.ts`. Without real signature data, the component renders nothing.

---

## Deliverable 7: Final Recommendation

### Proposed Final Page Structure

```
# Founders

## Apurav Agarwal
  ┌──────────────────────────────────────┐
  │  Co-Founder                          │  ← Role badge (7px, accent)
  │  APURAV AGARWAL                      │  ← Name (Bebas, large, ~52-96px)
  │  Managing Director & CEO             │  ← Title (accent rule + text)
  │                                      │
  │  ┌────────┐  [in] [X] [ig]          │  ← Photo left + socials below
  │  │ PHOTO  │                          │
  │  │        │  Strategy · Leadership    │  ← Focus areas (inline, muted)
  │  │        │  Deployment · Growth     │
  │  └────────┘                          │
  │                                      │
  │  "Educational institutions deserve   │  ← Quote (italic, personal voice)
  │   infrastructure built for clarity." │
  ├──────────────────────────────────────┤
  │                                      │
  │  Biography                           │  ← Full prose (5 paragraphs)
  │  (single column, full width)         │    13-14px, 1.85 leading
  │                                      │
  ├──────────────────────────────────────┤
  │                                      │
  │  Principles                          │  ← Editorial numbered list
  │  01  Clarity over complexity         │    4 items, each with body
  │  02  Systems before scale            │
  │  03  Reliability before features     │
  │  04  Institutions first, always      │
  │                                      │
  ├──────────────────────────────────────┤
  │                                      │
  │  Vision                              │  ← Prose block
  │  Looking Ahead                       │    heading + 4 paragraphs
  │  (personal, first-person)            │
  │                                      │
  │  ~~~~~~ [SIGNATURE] ~~~~~~           │  ← SVG signature (ink color)
  │  Apurav Agarwal                      │  ← Name + title
  │  Managing Director & CEO             │
  └──────────────────────────────────────┘

  ── [full-width transition / rule] ──

## Lakshya Kumar
  ┌──────────────────────────────────────┐
  │  Co-Founder                          │
  │  LAKSHYA KUMAR                       │
  │  Director & CTO                      │
  │                                      │
  │  ┌────────┐  [in] [X] [ig]          │
  │  │ PHOTO  │                          │
  │  │        │  Infrastructure · Systems│
  │  │        │  Engineering · Security  │
  │  └────────┘                          │
  │                                      │
  │  "The best infrastructure feels      │
  │   invisible..."                      │
  ├──────────────────────────────────────┤
  │                                      │
  │  Biography                           │
  │  (single column, full width)         │
  │                                      │
  ├──────────────────────────────────────┤
  │                                      │
  │  Principles                          │
  │  01  Invisible infrastructure        │
  │  02  Long-term over shortcut         │
  │  03  Resilience as a constraint      │
  │  04  Simplicity at the core          │
  │                                      │
  ├──────────────────────────────────────┤
  │                                      │
  │  Vision                              │
  │  On What We're Building              │
  │  (personal, first-person)            │
  │                                      │
  │  ~~~~~~ [SIGNATURE] ~~~~~~           │
  │  Lakshya Kumar                       │
  │  Director & CTO                      │
  └──────────────────────────────────────┘

Site-wide footer
```

### Why This Structure Is Better

| Aspect | Slider/Carousel (old) | Editorial Profile (proposed) |
|---|---|---|
| **Reading experience** | User must interact (click prev/next/dots) to see both founders | User scrolls naturally — passive consumption |
| **Cognitive load** | High — user must decide when to switch, remember which founder they saw | Low — linear narrative, no decisions |
| **Comparability** | Both founders are isolated — hard to compare or connect | Sequential — reader builds understanding of each founder in order |
| **SEO** | Single page with JavaScript-driven content swap | Full HTML content for both founders — crawlable, indexable |
| **Deep linking** | `?founder=apurav` query param | `#apurav-agarwal` anchor — cleaner, standard |
| **Accessibility** | Focus management required, live regions for content swap | Standard page — no special ARIA needed |
| **Editorial feel** | Carousel = showcase, like a product gallery | Vertical scroll = story, like a magazine feature |
| **Page purpose** | "Meet the Founders" — introduce quickly | "The Founders' Story" — understand deeply |

### Does the page feel like "A founder story" or "A founder showcase"?

**It feels like a founder story** when:

1. **Content is linear** — biography → principles → vision → signature reads as a complete narrative arc.
2. **No UI chrome** — no Prev/Next buttons, no dot indicators, no "01/02" labels. The page does not call attention to itself as a widget.
3. **First-person voice** — Principles and Vision sections are in the founder's voice, not written in third-person corporate speak.
4. **Signature closes the chapter** — an editorial mark that says "this section is complete, continue scrolling for the next."
5. **Both founders get equal space** — not competing for attention in a single viewport, but each owning their own scroll section.

**It would feel like a showcase** if we kept:
- Slider navigation
- Dot indicators
- "Meet the Founders" label (implies a gallery)
- Prev/Next with "Previous" / "Next" labels (implies paginated content)
- Auto-rotation or timed transitions

### Files to Remove

| File | Reason |
|---|---|
| `use-founder-slider.ts` | No slider means no active index, no goTo/goNext/goPrev |
| `Foundernavigation.tsx` | Prev/Next + dots are removed |
| `FAQ.tsx` | Not founder-specific |
| `CTA.tsx` | Not founder-specific |
| `ProgressBar.tsx` | Already unused |
| `RightPanel.tsx` | Already unused — previous architecture artifact |

### Files to Keep but Restructure

| File | Change |
|---|---|
| `FoundersShowcase.tsx` | Replace slider with static rendering of both founders. Remove all carousel UI. Remove dependencies on `useFounderSlider` and `FounderNavigation`. Add anchor IDs. |
| `Founderidentity.tsx` | Remove `AnimatePresence mode="wait"` — no slider means no exit animations. Keep entrance animations. Remove `custom` variants tied to array index. |
| `Founderbiography.tsx` | Remove `AnimatePresence mode="wait"`. Keep entrance animation. |
| `Founderhighlights.tsx` | **Rewrite** — replace numbered résumé list with editorial format. Remove `AnimatePresence`. |
| `FounderPrinciples.tsx` | Remove `AnimatePresence`. Keep entrance animation. |
| `FounderVision.tsx` | Remove `AnimatePresence`. Keep entrance animation. Evaluate single-column vs 2-col on mobile. |
| `FounderSignature.tsx` | Remove `AnimatePresence`. Keep entrance animation. |
| `founder-page.tsx` | Remove `searchParams` parsing. Remove deep link logic (use anchors instead). Remove FAQ + CTA imports. |
| `FounderClient.tsx` | Remove `initialIndex` logic. Remove FAQ + CTA dynamic imports. Remove `MobilePage` (mobile should match editorial structure). |
| `Mobile.tsx` | Rewrite to match editorial scroll layout. Remove Hero, Mission, FAQ, CTA. Render both founders sequentially. |
| `index.ts` | Remove `FounderNavigation` export. Add new components. |
| `founders-data.ts` | Add `signature` data for both founders. Remove `narrative` (duplicate). Strengthen `achievements`. |

### Files to Create

| File | Purpose |
|---|---|
| `FounderTransition.tsx` | Full-width visual separator between Apurav and Lakshya sections. Could be a subtle rule, a branded divider, or a number ("01 / 02"). |

### Final Metric: Content Density

| Metric | Current (with FAQ/CTA) | Proposed (editorial only) |
|---|---|---|
| Desktop scroll depth (1440px) | ~8 viewports | ~5-6 viewports |
| Desktop scroll depth (1024px) | ~12 viewports | ~7-8 viewports |
| Mobile scroll depth (390px) | ~8 viewports | ~6-7 viewports |
| Founder-specific vs generic | ~60% founder / 40% generic | ~100% founder |
| Carousel UI elements | 4 (dots, prev, next, index) | 0 |
| Editorial closing mark | 0 | 2 (one per founder) |
