# Section Audit & Visual Mockups

## Proposed Color Palette

```
Light scheme (80-85% of pages):
  bg-white:    #FFFFFF  — main section backgrounds
  bg-alt:      #FCFCFD  — alternate section backgrounds  
  bg-warm:     #F7F8FB  — tertiary/break sections

Brand (10-15% of pages):
  brand:       #4A5DDE  — Deep Periwinkle (primary)
  brand-dark:  #3A49B0  — hover/active
  brand-light: #7B89E8  — subtle accents

Dark (CTAs only):
  bg-dark:     #12141D  — Deep Navy (solid, no gradient)
  bg-card:     #1A1D28  — card surfaces on dark
```

---

## Complete Section-by-Section Audit

### HOME PAGE

| # | Section | File | Current | Type | Proposed | Changes |
|---|---------|------|---------|------|----------|---------|
| 1 | **Hero** | homehero.tsx | `glass` bg-white/60, Three.js particles, grid pattern, brand glow shadows | WHITE | `bg-white`, no Three.js, no grid, clean cards with `shadow-sm` | Remove Three.js, remove grid, remove glass, remove brand glow |
| 2 | **Stats** | Stats.tsx | No bg, `border-y border-black/[0.05]` | WHITE | `bg-[#F7F8FB]`, no border | Add alt background, remove border |
| 3 | **Features** | Features.tsx | No bg (inherits white), multicolor icon badges (purple/brand/amber/rose/green/blue), bento cards with brand hover glow | WHITE | `bg-white`, single brand tint for icons, bento cards with `shadow-sm` hover | Remove multicolor icons, use brand-only, simplify card shadows |
| 4 | **Workflow** | WorkflowBento.tsx | `bg-[#F8F9FA]`, grid pattern overlay, brand hover glow | ALT | `bg-[#FCFCFD]`, no grid, no brand glow | Change bg, remove grid, remove glow |
| 5 | **Pricing** | Pricing.tsx | No bg, Three.js animated background (`ThreePricingBackground`), dark featured card, green checkmarks | WHITE | `bg-white`, no Three.js, featured card uses brand border instead of dark bg, brand checkmarks | Remove Three.js bg, simplify featured card, change icon colors |
| 6 | **FAQ** | FAQ.tsx | No bg, `gradient-text-brand`, brand hover on questions | WHITE | `bg-white`, solid text, no gradient, subtle hover | Remove gradient text, remove brand hover |
| 7 | **CTA** | CTA.tsx | Dark gradient `#1A1C1D→#22252A→#1d1f24`, 2 radial glows, grid overlay, magnetic buttons | DARK | `bg-[#12141D]` solid, clean buttons, no glows, no grid, no magnetic | Solid dark bg, remove all glows/grid/magnetic |

### PRODUCT PAGE

| # | Section | File | Current | Type | Proposed | Changes |
|---|---------|------|---------|------|----------|---------|
| 1 | **Hero** | producthero.tsx | `bg-[#eef0f8]`, Three.js particles, grid mesh `rgba(139,143,212,0.13)`, radial glow | ALT | `bg-white`, no Three.js, no grid, no glow | Remove all effects, clean hero |
| 2 | **InMotion** | InMotion.tsx | `bg-[#060E1A]`, dark video player overlay | DARK | `bg-white`, light video player, clean layout | Complete rethink — white section with bordered video |
| 3 | **CoreModules** | CoreModules.tsx | No bg, 5 colored module tags (green/blue/amber/purple/pink) | WHITE | `bg-white`, single brand color for all modules | Unify module colors to brand |
| 4 | **DesignedForClarity** | DesignedForClarity.tsx | `bg-[#060E1A]`, dark phone mockup, green checkmarks | DARK | `bg-white`, light phone mockup, brand checkmarks | Complete rethink — white section |
| 5 | **ProblemSolution** | ProblemSolution.tsx | `bg-white`, green success icons, red error icons | WHITE | `bg-white`, brand success icons, muted error icons | Change icon colors to brand |
| 6 | **Community** | Community.tsx | `bg-[#f8fafb]`, 4 colored role badges (indigo/green/amber/pink) | ALT | `bg-[#F7F8FB]`, single brand role badges | Unify colors, change bg |
| 7 | **Reliability** | Reliability.tsx | `bg-[#0A1628]`, green badge/green borders/green suffix/stats | DARK | `bg-[#FCFCFD]`, brand accents instead of green | Complete rethink — light section |
| 8 | **CTA** | CTA.tsx | `bg-white` outer, dark gradient inner card `#060E1A→#0A1628→#0f2d4a`, green glow/green button/grid | WHITE/DARK | `bg-white` outer, `bg-[#12141D]` inner card, clean buttons, no green | Remove gradient, remove green, remove grid |

### ABOUT PAGE

| # | Section | File | Current | Type | Proposed | Changes |
|---|---------|------|---------|------|----------|---------|
| 1 | **Hero** | aboutHero.tsx | `bg-white`, Three.js particles, green radial overlay, green badge/pulse | WHITE | `bg-white`, no Three.js, no green badge, brand accent instead | Remove Three.js, remove green |
| 2 | **OurStory** | OurStory.tsx | `bg-white`, green divider line | WHITE | `bg-white`, brand divider line | Change green to brand |
| 3 | **Philosophy** | Philosophy.tsx | `bg-white`, green hover text on cards | WHITE | `bg-white`, brand subtle hover | Change green to brand |
| 4 | **Ecosystem** | Ecosystem.tsx | `bg-[#0A1628]`, green badges, green labels | DARK | `bg-white`, brand accents | Complete rethink — white section |
| 5 | **Leadership** | LeadershipTeam.tsx | `bg-white`, green accents on badges/borders, per-member bg colors | WHITE | `bg-[#F7F8FB]`, brand accents, uniform card bg | Change bg, change greens to brand |
| 6 | **Stats** | Stats.tsx | `bg-white`, green suffix | WHITE | `bg-white`, brand suffix | Change green to brand |
| 7 | **FAQ** | FAQ.tsx | `bg-white`, no explicit bg | WHITE | `bg-white` | No change |
| 8 | **CTA** | CTA.tsx | Dark gradient `#071221→#0A1628→#0e2244`, `rgba(90,95,232,0.6)` glow, 2 rotating rings, shimmer-text-dark, grid | DARK | `bg-[#12141D]` solid, clean text, no rings, no glow, no grid, no shimmer | Radical simplification |

### BLOG PAGE

| # | Section | File | Current | Type | Proposed | Changes |
|---|---------|------|---------|------|----------|---------|
| 1 | **Hero** | Bloghero.tsx | `bg-white`, `border-b border-slate-100`, `radial-gradient(rgba(96,99,238,0.06))`, `text-indigo-600` | WHITE | `bg-white`, no gradient, `text-brand` for accent | Remove glow gradient, replace indigo-600 with brand |
| 2 | **FeaturedPost** | FeaturedPost.tsx | No bg (inherits `bg-brand-bg`), brand dot active indicator | WHITE | `bg-white`, brand dot, clean | Minimal changes |
| 3 | **CategoryBar** | N/A | Part of blogs.tsx flow | WHITE | `bg-white` | No change |
| 4 | **LatestPosts** | LatestPosts.tsx | No explicit bg | WHITE | `bg-white` | No change |
| 5 | **CTA** | CTA.tsx | Dark gradient `#1A1C1D→#22252A→#1d1f24`, 2 radial glows, grid overlay, `rgba(96,99,238,0.5)` button shadow, magnetic | DARK | `bg-[#12141D]` solid, clean button, no glows, no grid, no magnetic | Radical simplification |

### SOCIALS PAGE

| # | Section | File | Current | Type | Proposed | Changes |
|---|---------|------|---------|------|----------|---------|
| 1 | **Hero** | socialhero.tsx | `bg-[#F9F8FF]`, Three.js particles, `#6B5CE7` brand purple, gradient blobs | ALT | `bg-white`, no Three.js, no blobs, brand `#4A5DDE` | Remove Three.js, remove blobs, change brand color |
| 2 | **Ecosystem** | EcosystemSection.tsx | `bg-white`, no decorations | WHITE | `bg-white` | No change |
| 3 | **Trust** | TrustSection.tsx | `bg-[#F9F8FF]`, Three.js icosahedron, `#6B5CE7` shadows | ALT | `bg-[#F7F8FB]`, no Three.js, no brand shadow | Remove Three.js, simplify |
| 4 | **InstitutionalPulse** | InstitutionalPulse.tsx | `bg-[#F9F8FF]`, dark featured card `bg-[#0D0D0F]`, SVG grid, `#6B5CE7` orb | ALT + DARK | `bg-[#FCFCFD]`, dark card `bg-[#12141D]`, no grid/orb | Simplify dark card, remove effects |
| 5 | **Stats** | StatsSection.tsx | `bg-[#0D0D0F]`, Three.js torus+particles, gradient vignette | DARK | `bg-[#12141D]` solid, no Three.js, no vignette | Simplify dark section |
| 6 | **CTA** | CtaSection.tsx | `bg-[#F9F8FF]`, SVG grid lines, `#6B5CE7/5` blur blob | ALT | `bg-[#F7F8FB]`, clean, no grid, no blob | Remove effects |

### FOUNDERS PAGE

| # | Section | File | Current | Type | Proposed | Changes |
|---|---------|------|---------|------|----------|---------|
| 1 | **Hero** | founderHero.tsx | `bg-white`, brand button shadow | WHITE | `bg-white`, clean button | Remove brand shadow effect |
| 2 | **Showcase** | FoundersShowcase.tsx | `bg-white` | WHITE | `bg-white` | No change |
| 3 | **Mission** | mission.tsx | `bg-[#FAFAFA]`, grid overlay, brand hover glow | ALT | `bg-[#FCFCFD]`, no grid, no glow | Simplify |
| 4 | **FAQ** | FAQ.tsx | No explicit bg | WHITE | `bg-white` | No change |
| 5 | **CTA** | CTA.tsx | Dark gradient `#181A1D→#20242B→#1A1D23`, 2 radial glows, grid, magnetic | DARK | `bg-[#12141D]` solid, clean buttons, no effects | Radical simplification |

### LEGAL PAGE

| # | Section | File | Current | Type | Proposed | Changes |
|---|---------|------|---------|------|----------|---------|
| 1 | **Header** | LegalHeader.tsx | `bg-[#f7f8f8]/92` with backdrop-blur | ALT | `bg-white` | Simplify |
| 2 | **Content** | LegalDocPage.tsx | `bg-[#f7f8f8]`, borders `#d0d6e0` | ALT | `bg-white` | Simplify |

### CONTACT PAGE

| # | Section | File | Current | Type | Proposed | Changes |
|---|---------|------|---------|------|----------|---------|
| 1 | **Hero** | contacthero.tsx | No bg (inherits white), Three.js particles, glow, grid | WHITE | `bg-white`, no Three.js, no effects | Clean hero |
| 2 | **Features** | Features.tsx | No bg (inherits white), per-card brand top bar | WHITE | `bg-white`, clean cards | No change besides brand color |
| 3 | **Inquiry** | Inquiry.tsx | `linear-gradient(180deg, #fff → rgba(90,95,232,0.02))`, brand radial blob | WHITE | `bg-white`, clean form | Remove gradient, remove blob |
| 4 | **Realtime** | Realtime.tsx | `var(--dark)`, 2 ambient blobs, grid, terminal-style | DARK | `bg-[#12141D]`, clean dark section | Remove blobs, remove grid, simplify |
| 5 | **CTA** | CTA.tsx | `var(--dark)`, 2 rotating rings, glow line, radial ambient | DARK | `bg-[#12141D]`, clean | Remove rings, remove glow, remove line |

---

## Visual Mockups

### HOME PAGE — Proposed Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [White #FFFFFF] HERO                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Badge: "Integrated Platform for Schools"            │   │
│  │                                                      │   │
│  │  Everything your school needs.                       │   │
│  │  Nothing it doesn't.                                 │   │
│  │                                                      │   │
│  │  A single workspace for notices, classes, meetings,  │   │
│  │  and parent communication. No more WhatsApp chaos.   │   │
│  │                                                      │   │
│  │  ┌─────────────┐  ┌──────────────┐                  │   │
│  │  │ [brand btn] │  │ [outline btn]│                  │   │
│  │  │ See Product │  │  Contact Us  │                  │   │
│  │  └─────────────┘  └──────────────┘                  │   │
│  │                                                      │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │   │
│  │  │ Msgs │ │Video │ │Bell  │ │Users │ (feature       │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘  cards)       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Alt #F7F8FB] STATS                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  1 Platform     │  24/7 Connectivity  │  100%         │   │
│  │  Centralized    │  Institution        │  Admin        │   │
│  │  Communication  │  Always On          │  Visibility   │   │
│  │                 │                     │               │   │
│  │  0 WhatsApp     │                     │               │   │
│  │  Chaos          │                     │               │   │
│  │  Replaced       │                     │               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] FEATURES                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Section Eyebrow: "Features"                        │   │
│  │  Everything a school needs. Nothing it doesn't.      │   │
│  │                                                      │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────┐     │   │
│  │  │ Messages     │ │ Activity     │ │ Meetings │     │   │
│  │  │ [brand icon] │ │ [brand icon] │ │[brand ic]│     │   │
│  │  │ PTA, staff   │ │ Real-time    │ │Schedule  │     │   │
│  │  │ class chats  │ │ feed, track  │ │PTM,board │     │   │
│  │  ├──────────────┤ │ assignments  │ │reviews   │     │   │
│  │  │ Webinars     │ └──────────────┘ └──────────┘     │   │
│  │  │ [brand icon] │ ┌──────────────┐ ┌──────────┐     │   │
│  │  │ Guest lect   │ │ Members      │ │ Notice   │     │   │
│  │  │ orientation  │ │ [brand icon] │ │[brand ic]│     │   │
│  │  └──────────────┘ │ Role-based   │ │School    │     │   │
│  │                    │ bulk onboard │ │announce  │     │   │
│  │                    └──────────────┘ └──────────┘     │   │
│  │  ┌──────────────────────────────────────┐            │   │
│  │  │ Classes (HD Live, 150 participants)  │            │   │
│  │  │ [brand icon] Full-width bento card   │            │   │
│  │  └──────────────────────────────────────┘            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Alt #FCFCFD] WORKFLOW                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  01  Set up your institution    02  Centralize       │   │
│  │      Import in minutes              communication    │   │
│  │  03  Conduct live sessions     04  Monitor in        │   │
│  │      HD classes & meetings         real time         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] PRICING                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Basic         │  Premium (featured) │  Olympus      │   │
│  │  $pending      │  border-brand       │  $pending     │   │
│  │  8 features    │  Most Popular       │  8 features   │   │
│  │                │  8 features         │               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] FAQ                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Q: What is HermesWorkspace?                        │   │
│  │  Q: Who can use it?                                 │   │
│  │  Q: How does it improve communication?              │   │
│  │  Q: Can schools conduct online classes?             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Dark #12141D] CTA                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Ready to transform your school?                    │   │
│  │  HermesWorkspace helps schools centralize           │   │
│  │  communication, meetings, notices, and classes      │   │
│  │  in one structured platform.                        │   │
│  │                                                      │   │
│  │  ┌─────────────────┐   ┌──────────────────┐         │   │
│  │  │ Schedule Demo   │   │   Contact Us     │         │   │
│  │  └─────────────────┘   └──────────────────┘         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Section count**: 7 total — 5 White (71%), 2 Alt (29%), 1 Dark (14%)
**Area estimate**: ~65% White, ~20% Alt, ~15% Dark (CTA is visually large)

---

### PRODUCT PAGE — Proposed Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [White #FFFFFF] HERO                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Modern infrastructure for institutional             │   │
│  │  communication.                                      │   │
│  │                                                      │   │
│  │  A unified platform replacing disconnected tools     │   │
│  │  with structured communication, live classes,        │   │
│  │  notices, and institutional coordination.            │   │
│  │                                                      │   │
│  │  ┌──────────────┐  ┌──────────────┐                 │   │
│  │  │ Request Demo │  │ Watch Video  │                 │   │
│  │  └──────────────┘  └──────────────┘                 │   │
│  │                                                      │   │
│  │  [Phone mockup — white bg, clean UI, no dark]        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] IN MOTION                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  See HermesWorkspace in motion.                     │   │
│  │  [Video player — bordered, light background]         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] CORE MODULES                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Structured      │  Online Classes  │  Meetings &    │   │
│  │  Communication   │  [brand icon]    │  Webinars      │   │
│  │  [brand icon]    │                  │  [brand icon]  │   │
│  │                  │                  │                │   │
│  │  Notices &       │  Settings &      │  ptional 3rd   │   │
│  │  Announcements   │  Admin Panel     │  row           │   │
│  │  [brand icon]    │  [brand icon]    │                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] DESIGNED FOR CLARITY                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Text content           │  [Phone mockup — light]    │   │
│  │  ✔ Structured channels  │                           │   │
│  │  ✔ Centralized notices  │                           │   │
│  │  ✔ Integrated classes   │                           │   │
│  │  ✔ Web & mobile         │                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] PROBLEM / SOLUTION                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  The Problem              │  The Solution            │   │
│  │  ✗ WhatsApp chaos        │  ✔ Centralized channels  │   │
│  │  ✗ Notices buried        │  ✔ Official notices      │   │
│  │  ✗ Disconnected apps     │  ✔ Integrated platform   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Alt #F7F8FB] COMMUNITY — FOR EVERYONE                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Administrators  │  Teachers      │  Students        │   │
│  │  [brand outline] │  [brand outl.] │  [brand outl.]   │   │
│  │  Full control    │  Class coord   │  Access classes  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Alt #FCFCFD] RELIABILITY                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Reliable communication        │  1 Platform         │   │
│  │  for modern institutions.      │  3+ Roles           │   │
│  │                                 │  24/7 Access        │   │
│  │  Web & Mobile | Structured     │                     │   │
│  │  Communication | Integrated    │                     │   │
│  │  Online Classes                │                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Dark #12141D] CTA                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Modernize institutional operations with             │   │
│  │  HermesWorkspace.                                    │   │
│  │                                                      │   │
│  │  ┌─────────────────┐   ┌──────────────────┐         │   │
│  │  │ Request a Demo  │   │  See Pricing     │         │   │
│  │  └─────────────────┘   └──────────────────┘         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Section count**: 8 total — 6 White (75%), 2 Alt (25%), 1 Dark (13%)
**Area estimate**: ~60% White, ~25% Alt, ~15% Dark

---

### ABOUT PAGE — Proposed Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [White #FFFFFF] HERO                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Built for schools. Built for India.              │   │
│  │  (no particles, no green glow)                       │   │
│  │                                                      │   │
│  │  From Ranchi, Jharkhand — replacing WhatsApp         │   │
│  │  chaos with institutional infrastructure.            │   │
│  │                                                      │   │
│  │  [Simple decorative element — subtle brand shape]    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] OUR STORY                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  The Story                │ The gap we saw:          │   │
│  │                           │ Schools in India rely    │   │
│  │  Founded in Ranchi,       │ on WhatsApp groups for   │   │
│  │  HermesWorkspace began    │ critical communication.  │   │
│  │  when we saw schools      │ Notices get buried.      │   │
│  │  struggling with...       │ Meetings get missed.     │   │
│  │                           │ Parents stay uninformed. │   │
│  │  [brand accent line]      │                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] PHILOSOPHY                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Communication ┃ Coordination ┃ Clarity               │   │
│  │  Infrastructure ┃ Reliability ┃                       │   │
│  │  [5 cards, clean borders, brand accent on hover]      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] ECOSYSTEM (was dark)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  One platform. Every workflow.                      │   │
│  │  [Mockup screenshot — white bg, no dark]             │   │
│  │  Institutional-Grade Communication Infrastructure    │   │
│  │  Integrated Academic Coordination & Meetings         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Alt #F7F8FB] LEADERSHIP TEAM                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Apurav Agarwal      │ [Co-Founder 2]                │   │
│  │  Co-Founder & CEO    │ [Co-Founder Role]             │   │
│  │  [clean card]        │ [clean card]                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] STATS                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  8+ Core Modules  │  24+ Workflows  │  100% Education│   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] FAQ                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Q & A — same as home                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Dark #12141D] CTA                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Ready to Modernize Institutional                    │   │
│  │  Communication?                                      │   │
│  │                                                      │   │
│  │  Join forward-thinking schools across India.         │   │
│  │                                                      │   │
│  │  ┌─────────────────┐   ┌──────────────────┐         │   │
│  │  │ Schedule Consult│   │  View All Plans  │         │   │
│  │  └─────────────────┘   └──────────────────┘         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Section count**: 8 total — 6 White (75%), 1 Alt (13%), 1 Dark (13%)
**Area estimate**: ~70% White, ~15% Alt, ~15% Dark

---

### BLOG PAGE — Proposed Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [White #FFFFFF] HERO                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Resources & insights for modern schools             │   │
│  │  (no gradient glow, no indigo-600, use brand text)   │   │
│  │                                                      │   │
│  │  Practical frameworks, communication strategies,     │   │
│  │  and technology insights for educational leaders.    │   │
│  │                                                      │   │
│  │  8+ Resources  │  5 Categories  │  Weekly Updates    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] CATEGORY BAR                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  All  │  Product  │  Engineering  │  Company  │ ...  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] FEATURED POST                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  [Large feature card with clean image]                │   │
│  │  Title of the featured article                       │   │
│  │  Category · Date · Read time                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [White #FFFFFF] LATEST POSTS                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Post 1  │  Post 2  │  Post 3                        │   │
│  │  [card]  │  [card]  │  [card]                        │   │
│  │          │          │                                │   │
│  │  Post 4  │  Post 5  │  Post 6                        │   │
│  │  [card]  │  [card]  │  [card]                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Dark #12141D] CTA                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Stay ahead with institutional insights.             │   │
│  │  Get practical strategies for modernizing            │   │
│  │  school communication and operations.                │   │
│  │                                                      │   │
│  │  ┌─────────────────┐                                 │   │
│  │  │ Subscribe Now   │                                 │   │
│  │  └─────────────────┘                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Section count**: 5 total — 4 White (80%), 1 Dark (20%)
**Area estimate**: ~80% White, ~20% Dark

---

## Summary Statistics

### Current vs Proposed breakdown (area %)

| Metric | Current | Proposed | Target |
|--------|---------|----------|--------|
| White sections | ~40% | **~70%** | 80-85% |
| Alt sections | ~25% | **~15%** | 10-15% |
| Dark sections | ~35% | **~15%** | 10-15% |
| Brand color usage | ~60% of sections | **~10% of sections** | 10-15% |
| Unique hex colors | 95+ | **~25** | <30 |
| Green (`#22C55E`) | 65+ occurrences | **0** | Eliminated |
| Purple (`#A855F7`) | 10+ occurrences | **0** | Eliminated |
| Gradients (per page) | 3-5 per page | **0-1 per page** | Minimal |
| Three.js canvases | 7 sections | **0** | Removed |
| Grid patterns | 10+ sections | **0** | Removed |
| Rotating rings | 2 sections | **0** | Removed |
| Magnetic buttons | 4 sections | **0** | Removed |

### Color replacement summary

| Current Color | Occurrences | → Replace With |
|--------------|-------------|----------------|
| `#22C55E` (green) | ~65 | `#4A5DDE` (brand) or `#1A1D26` (ink) |
| `#EF4444` (red) | ~20 | `#BC1C1E` (brand.error) |
| `#F59E0B` (amber) | ~10 | `#D97706` (brand.accent) |
| `#A855F7` (purple) | ~10 | `#7B89E8` (brand-light) |
| `#6366f1` (indigo) | ~25 | `#4A5DDE` (brand) |
| `#6B5CE7` (socials purple) | ~10 | `#4A5DDE` (brand) |
| `#5A5FE8` (contact purple) | ~4 | `#4A5DDE` (brand) |
| `#5e6ad2` (legal purple) | ~6 | `#4A5DDE` (brand) |
| `#0A1628` (dark ink) | ~35 | `#12141D` (darkBg) |
| `#0D0D0F` (dark ink) | ~10 | `#12141D` (darkBg) |
| `#060E1A` (dark bg) | ~6 | `#FFFFFF` or `#12141D` |
| `#071221` (dark bg) | ~10 | `#FFFFFF` or `#12141D` |
| `#1A1C1D` (ink) | ~5 | `#1A1D26` (ink) |
| `#161922` (legal ink) | ~15 | `#1A1D26` (ink) |
| `#6B7280` (muted) | ~30 | `#61667A` (brand.muted) |
| `#9896A4` (muted) | ~12 | `#61667A` (brand.muted) |
| `#F8F9FA` (bg) | ~8 | `#FCFCFD` or `#F7F8FB` |
| `#FAFAFA` (bg) | ~5 | `#FCFCFD` or `#F7F8FB` |
| `#F9F8FF` (socials bg) | ~6 | `#FFFFFF` or `#F7F8FB` |
| `#eef0f8` (product bg) | ~2 | `#FFFFFF` |
| `#f8fafb` (bg) | ~2 | `#F7F8FB` |
| `#f7f8f8` (legal bg) | ~8 | `#FFFFFF` |

### Dark sections retained (CTAs only — all pages)

All dark CTAs use: solid `#12141D`, no gradient, no glow, no grid, no magnetic, no rings.

| Page | Dark Section | Purpose |
|------|-------------|---------|
| Home | CTA (bottom) | "Ready to transform your school?" |
| Product | CTA (bottom) | "Modernize institutional operations" |
| About | CTA (bottom) | "Ready to Modernize Institutional Communication?" |
| Blog | CTA (bottom) | "Stay ahead with institutional insights" |
| Socials | CTA | (same pattern) |
| Founders | CTA | (same pattern) |
| Contact | Realtime section | Live demo terminal |
| Contact | CTA | (bottom) |

**Total dark sections: ~8 across all pages** — each is a single CTA card at the bottom of the page + 1 functional section (Realtime). This hits the ~10-15% target.

---

## Before/After — Concrete examples

### Home CTA section

**BEFORE:**
```
bg: linear-gradient(160deg, #1A1C1D 0%, #22252A 50%, #1d1f24 100%)
+ radial-gradient(ellipse, rgba(96,99,238,0.18)) → ambient glow
+ radial-gradient(ellipse, rgba(168,85,247,0.1)) → purple glow
+ grid overlay rgba(255,255,255,0.3)
+ box-shadow with rgba(0,0,0,0.25)
+ inset border rgba(255,255,255,0.05)
+ magnetic button effect
+ Button shadow: rgba(96,99,238,0.5)
```

**AFTER:**
```
bg: #12141D (solid)
+ border: 1px solid rgba(255,255,255,0.06) (subtle)
+ No glows, no grid, no magnetic, no purple
+ Button shadow: none (flat design)
```

### Product Reliability section

**BEFORE:**
```
bg: #0A1628 (dark)
+ green badge: border #22C55E/25, bg #22C55E/8
+ green text: #22C55E
+ green suffix: #22C55E
+ green stat borders: #22C55E/25
+ white text on dark
```

**AFTER:**
```
bg: #FCFCFD (alt-light)
+ brand badge: border #4A5DDE/20, bg #4A5DDE/8
+ brand text: #4A5DDE
+ brand suffix: #4A5DDE
+ dark text: #1A1D26
+ clean stats with brand accent
```

### About CTA section

**BEFORE:**
```
bg: linear-gradient(135deg, #071221, #0A1628, #0e2244)
+ rotating ring 1: 500px, border rgba(90,95,232,0.06)
+ rotating ring 2: 700px, border rgba(90,95,232,0.04)
+ brand glow: radial-gradient(rgba(96,99,238,0.14))
+ top border glow: linear-gradient(transparent, rgba(90,95,232,0.6), transparent)
+ shimmer-text-dark animation on "Institutional"
+ magnetic buttons
```

**AFTER:**
```
bg: #12141D (solid)
+ clean white text
+ brand accent on keyword (solid color, no animation)
+ flat buttons (one filled white, one outline white)
+ No rings, no glows, no shimmer, no magnetic
```
