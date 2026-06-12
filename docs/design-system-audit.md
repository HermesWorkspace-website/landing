# HermesWorkspace Design System Audit

## Executive Summary

The HermesWorkspace landing page contains **genuinely premium design work** — the home page dashboard mockup system (homehero.tsx + FeatureMocks.tsx) is sophisticated, with realistic UI elements, careful micro-interactions, smooth transitions, and professional craft. The Three.js effects, animated counters, staggered entrance animations, and framer-motion choreography are well above template quality.

**The problem is not the quality of individual components. The problem is inconsistency and color proliferation.**

The site uses **8 different primary brand colors** across pages, **2 different green accent systems** (#22C55E and #10B981), **5 different dark backgrounds**, and **multiple conflicting purple hues**. This makes the site feel like 5 different brands stitched together, not one cohesive platform.

---

## Page-by-Page Scorecard

| Page | Visual Identity | Premium Feel | Enterprise Trust | Brand Consistency | Overall |
|------|:---:|:---:|:---:|:---:|:---:|
| Home | 8/10 | 8/10 | 6/10 | 7/10 | **7.3/10** |
| Product | 6/10 | 6/10 | 5/10 | 4/10 | **5.3/10** |
| About | 5/10 | 5/10 | 6/10 | 3/10 | **4.8/10** |
| Blog | 6/10 | 5/10 | 5/10 | 5/10 | **5.3/10** |
| Socials | 7/10 | 6/10 | 4/10 | 2/10 | **4.8/10** |
| Founders | 6/10 | 6/10 | 5/10 | 3/10 | **5.0/10** |
| Contact | 7/10 | 7/10 | 6/10 | 4/10 | **6.0/10** |
| Legal | 3/10 | 2/10 | 4/10 | 2/10 | **2.8/10** |

**Scores reflect current state, not potential.**

### Why Home scores highest
- Single cohesive dashboard mockup system throughout
- Brand color usage is mostly consistent (#6063EE)
- Three.js particles are tasteful, not distracting
- Typography hierarchy is clear
- CTA section is well-composed

### Why Product scores low on consistency
- Hero uses #eef0f8 background (different from any other page)
- Uses #6366f1 as its "brand" color (different from home's #6063EE)
- InMotion, DesignedForClarity, Reliability are all dark sections with different dark colors
- CoreModules uses 5 different accent colors in one section
- Green #22C55E dominates sections that should be using brand

### Why Socials scores low on consistency
- Uses #6B5CE7 as brand (completely different from #6063EE)
- Background uses #F9F8FF (lavender tint, different from any other page)
- The purple color family makes it feel like a separate product

---

## Color System Audit — Every Color Classified

### Primary Brand Colors Found

| Color | Where | Page(s) | Classification | Issue |
|-------|-------|---------|---------------|-------|
| `#6063EE` | tailwind brand.DEFAULT | Home, Blog, OG image | **KEEP** | Correct primary |
| `#6366f1` | Hardcoded in components | Product, Navbar | **REPLACE** → `#6063EE` | Unnecessary variant |
| `#6B5CE7` | Socials brand | Socials, Founders | **REPLACE** → `#6063EE` | Wrong brand color |
| `#5A5FE8` | Contact CSS override | Contact | **REPLACE** → `#6063EE` | Wrong brand color |
| `#5e6ad2` | Legal accent | Legal | **REPLACE** → `#6063EE` | Wrong brand color |
| `#7B7FF0` | Contact brand-light | Contact | **REFINE** → make brand-light official |
| `#5052d0` | Homehero gradient | Home | **REPLACE** → `#6063EE` gradient |
| `#7C3AED` | Homehero gradient | Home | **REPLACE** → `#6063EE` or brand-light |
| `#3D42C8` | Contact brand-dark | Contact | **REFINE** → make brand-dark official |
| `#4338ca` | Tailwind brand.700 | Product gradients | **REPLACE** → brand-dark |

### Green Accent Colors Found

| Color | Where | Sections | Classification | Issue |
|-------|-------|----------|---------------|-------|
| `#22C55E` | Everywhere | About, Product, Contact, Homehero | **REPLACE** | Default Tailwind green-500, template-like |
| `#10B981` | Pricing background, Contact checkmarks | Pricing, Contact | **REPLACE** → unified success color | 2nd green variant |
| `#16a34a` | Product CTA hover | Product | **REPLACE** → unified darker success | Hover variant |
| `#34d399` | Contact features gradient end | Contact | **REPLACE** → unified success | 3rd green variant |

### Purple Accent Colors Found

| Color | Where | Sections | Classification | Issue |
|-------|-------|----------|---------------|-------|
| `#A855F7` | tailwind brand.purple | Gradients, OG image, icons | **REFINE** | OK as secondary accent, but overused |
| `#a78bfa` | Product hero light purple | Product | **REPLACE** → brand-light | Unnecessary variant |
| `#8b5cf6` | FeatureMocks accent | FeatureMocks | **REPLACE** → brand-light | Unnecessary variant |
| `#c084fc` | Contact features purple | Contact | **REPLACE** → brand-light | Unnecessary variant |
| `#818cf8` | OG image gradient mid | OG image | **REPLACE** → brand-light | Unnecessary variant |
| `#7C3AED` | Homehero gradient | Home | **REPLACE** → brand or brand-light | Template violet |
| `#6D28D9` | grid-pattern brand gradient | tailwind config | **REPLACE** → brand → brand-purple gradient | Template violet |

### Dark Background Colors Found

| Color | Where | Sections | Classification | Issue |
|-------|-------|----------|---------------|-------|
| `#0A1628` | About sections, Product | Ecosystem, Reliability, etc | **REPLACE** → unified dark | Not used elsewhere |
| `#0D0D0F` | Socials dark | StatsSection, featured card | **REPLACE** → unified dark | Different from product |
| `#060E1A` | Product dark sections | InMotion, DesignedForClarity | **REPLACE** → unified dark | Different from about |
| `#071221` | About CTA, Product | CTA, phone notches | **REPLACE** → unified dark | 4th dark variant |
| `#080A14` | Contact dark | Realtime, CTA | **REPLACE** → unified dark | 5th dark variant |
| `#0A0B1E` | Contact ink | Contact page | **REPLACE** → unified dark-ink | 6th variant |
| `#1A1C1D` | Home CTA dark | Home CTA, Footer, Pricing | **REFINE** → unified dark-2 | Used in home, close to correct |
| `#22252A` | Home CTA gradient mid | Home CTA | **REFINE** → card on dark | OK as card surface |
| `#1d1f24` | Home CTA gradient end | Home CTA | **REFINE** → card on dark | OK as card surface |
| `#0F172A` | Loading screen, Homehero | Loading, hero cards | **REPLACE** → unified dark-ink | Slate-900 variant |
| `#161922` | Legal pages | Legal text | **REPLACE** → unified dark-ink | 7th variant |
| `#0d0e1c` | Product hero | Product hero text | **REPLACE** → unified dark-ink | 8th variant |

### Icon Accent Colors (Feature Sections)

| Color | Where | Usage | Classification | Issue |
|-------|-------|-------|---------------|-------|
| `#3b82f6` (blue-500) | CoreModules (Online Classes), Features (Notice), Homehero stats | Icon color | **REPLACE** → brand | Random blue in brand system |
| `#f59e0b` (amber-500) | CoreModules (Meetings), Features (Webinars), Homehero events | Icon/accent color | **REFINE** → keep as limited accent | OK as secondary accent only |
| `#ec4899` (pink-500) | CoreModules (Events), Features (Webinars) | Icon color | **REPLACE** → brand | Random pink |
| `#10b981` (emerald-500) | Features (Members) | Icon color | **REPLACE** → brand-success | Separate from green system |
| `#14B8A6` (teal-500) | Blog ArchiveClient | Category accent | **REPLACE** → brand or remove | Random teal |
| `#DC2626` (red-600) | Blog ArchiveClient | Category accent | **REPLACE** → brand-error | OK as error only |
| `#EA580C` (orange-600) | Blog ArchiveClient | Category accent | **REPLACE** → brand-accent | Unnecessary variant |

### Shadow/Glow Effects

| Effect | Where | Classification | Reasoning |
|--------|-------|---------------|-----------|
| `rgba(96,99,238,0.35)` btn shadow | Home CTA | **KEEP** | Signature brand glow |
| `rgba(96,99,238,0.5)` btn hover shadow | Home CTA | **KEEP** | Amplifies brand on hover |
| `rgba(96,99,238,0.12)` glass shadow | Homehero cards | **KEEP** | Subtle brand glow on UI mockups |
| `rgba(96,99,238,0.10)` dashboard shadow | Mobile stats | **KEEP** | Brand-coherent |
| `rgba(99,102,241,0.45)` nav active glow | Navbar | **REPLACE** → `rgba(96,99,238,0.35)` | Use correct brand color |
| `rgba(99,102,241,0.8)` mobile nav glow | Navbar mobile | **REPLACE** → `rgba(96,99,238,0.6)` | Use correct brand color |
| `rgba(107,92,231,0.4)` socials btn shadow | Socials CTA | **REPLACE** → `rgba(96,99,238,0.35)` | Use correct brand color |
| `rgba(107,92,231,0.12)` socials cards | Socials Trust | **REPLACE** → `rgba(96,99,238,0.1)` | Use correct brand color |
| `rgba(90,95,232,0.4)` contact btn shadow | Contact CTA | **REPLACE** → `rgba(96,99,238,0.35)` | Use correct brand color |
| `rgba(90,95,232,0.1)` contact cards | Contact hero | **REPLACE** → `rgba(96,99,238,0.08)` | Use correct brand color |
| `rgba(34,197,94,0.25)` green shadows | Product sections | **REPLACE** → brand color | Replace green with brand |
| `0 0 40px rgba(96,99,238,0.25)` brand glow | tailwind config | **KEEP** | Signature effect |
| `0 20px 60px rgba(96,99,238,0.18)` float shadow | tailwind config | **KEEP** | Premium feeling |

### Gradient Systems

| Gradient | Where | Classification | Reasoning |
|----------|-------|---------------|-----------|
| `linear-gradient(135deg, #6063EE 0%, #A855F7 100%)` | brand-gradient, mock-avatar | **REFINE** | Use `#6063EE → #7B89E8` instead of purple |
| `linear-gradient(160deg, #1A1C1D 0%, #22252A 50%, #1d1f24 100%)` | Home/Blog/Founders CTA dark | **KEEP** | Premium dark gradient |
| `linear-gradient(135deg, #060E1A, #0A1628, #0f2d4a)` | Product CTA dark | **REPLACE** → unified dark gradient | Different from home CTA |
| `linear-gradient(135deg, #071221, #0A1628, #0e2244)` | About CTA dark | **REPLACE** → unified dark gradient | Different from home CTA |
| `linear-gradient(160deg, #181A1D, #20242B, #1A1D23)` | Founders CTA dark | **REPLACE** → unified dark gradient | Different from home CTA |
| `linear-gradient(90deg, var(--ink) 0%, var(--brand) 30%, var(--brand-light) 50%, var(--brand) 70%, var(--ink) 100%)` | shimmer-text | **KEEP** | Premium shimmer effect |
| `linear-gradient(90deg, #fff, #a5a8ff, #c4c6ff, #a5a8ff, #fff)` | shimmer-text-dark | **REFINE** → use brand shimmer tokens | OK but refine colors |
| `linear-gradient(100deg, var(--brand-dark), var(--brand), var(--brand-purple))` | gradient-text-brand | **REFINE** → remove purple, use brand-dark → brand → brand-light | Template purple |
| `radial-gradient(ellipse 70% 60% at 50% 0%, rgba(34,197,94,0.04), transparent)` | About hero | **REPLACE** → brand color | Green glow |
| `radial-gradient(ellipse, rgba(90,95,232,0.18), transparent 70%)` | About CTA | **REPLACE** → brand color tokens | Wrong brand color |
| `radial-gradient(ellipse 800px 1400px at -10% 20%, rgba(96,99,238,0.07), transparent)` | hero-ambient (tailwind) | **KEEP** | Subtle brand ambient |
| `radial-gradient(ellipse 500px 1000px at 110% 50%, rgba(168,85,247,0.05), transparent)` | hero-ambient purple | **REFINE** → use brand-light instead of purple | Remove template purple |

### Background Patterns

| Pattern | Where | Classification | Reasoning |
|---------|-------|---------------|-----------|
| `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)` grid | WorkflowBento, hero | **KEEP** | Subtle grid on alt sections |
| `radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)` grid | Opengraph image | **KEEP** | OG image brand grid |
| `rgba(139,143,212,0.13)` grid | Product hero | **REPLACE** → brand color grid | Wrong color reference |
| `rgba(90,95,232,0.04)` grid | Contact Realtime | **REPLACE** → brand color grid | Wrong brand color |
| `rgba(120,120,120,0.18)` grid | Contact hero | **REPLACE** → brand color grid | Neutral gray, no brand |
| `rgba(0,0,0,0.06)` grid | Home hero | **KEEP** | Neutral, fine on white |
| `rgba(255,255,255,0.3)` grid | Home CTA dark | **KEEP** | Subtle on dark |

### Three.js/Canvas Systems

| System | Where | Classification | Reasoning |
|--------|-------|---------------|-----------|
| 120 particles `color: 0x6063ee`, grid `0xc7d2fe` | Home hero | **KEEP** | Refined, brand-correct |
| 800 particles `color: 0x6366f1`, mouse parallax | FeatureMocks (ParticleBackground) | **REFINE** → `0x6063ee` | Wrong brand hue |
| 180 dots `color: 0x6b5ce7`, grid `0x6b5ce7` | Socials hero | **REPLACE** → `0x6063ee` | Wrong brand color entirely |
| Icosahedron `color: 0x6b5ce7` | Socials TrustSection | **REPLACE** → `0x6063ee` | Wrong brand color |
| Torus `color: 0x6b5ce7` + 120 particles | Socials StatsSection | **REPLACE** → `0x6063ee` | Wrong brand color |
| 120 dots `color: 0x5a5fe8`, grid `0x0a1628` | Contact hero | **REPLACE** → `0x6063ee` | Wrong brand color |

---

## Section-by-Section Visual Audit

### HOME PAGE

| Section | Visual Identity | Premium Feel | Enterprise Trust | Issues |
|---------|:---:|:---:|:---:|--------|
| Hero | 9/10 | 9/10 | 7/10 | Calendar colors too diverse (5+ avatar colors), amber events icon, green pulse dot |
| Stats | 6/10 | 5/10 | 6/10 | Functional but simple; could use brand counter emphasis |
| Features | 8/10 | 8/10 | 6/10 | Multicolor icon backgrounds (purple/brand/amber/rose/green/blue — 6 colors) weaken brand |
| WorkflowBento | 6/10 | 6/10 | 7/10 | Good content but visually flat; bg #F8F9FA is cold |
| Pricing | 7/10 | 7/10 | 6/10 | Dark featured card works; emerald rings add nothing (remove) |
| FAQ | 5/10 | 5/10 | 6/10 | gradient-text-brand feels startupy; brand hover on questions is distracting |
| CTA | 8/10 | 8/10 | 8/10 | Best CTA; keep gradient, remove purple glow, refine brand |

**Home Score: 7.3/10**

**Fixes:**
1. Homehero avatar dots: 5 rainbow colors → all brand variants (brand, brand-light, brand-dark)
2. Homehero calendar: replace emoji with SVG, replace green pulse dot with brand color
3. Features: unify all 6 icon backgrounds to `bg-brand/[0.07] text-brand`
4. Pricing: remove ThreePricingBackground rings (emerald green doesn't belong)
5. FAQ: remove `gradient-text-brand`, remove brand hover on questions
6. CTA: keep dark gradient, remove purple radial glow
7. Stats: add brand accent to numbers instead of all being plain ink

---

### PRODUCT PAGE

| Section | Visual Identity | Premium Feel | Enterprise Trust | Issues |
|---------|:---:|:---:|:---:|--------|
| Hero | 7/10 | 7/10 | 5/10 | Three.js particles (wrong hue #6366f1), purple grid, bg #eef0f8 is cold |
| InMotion | 4/10 | 5/10 | 4/10 | Dark section #060E1A doesn't fit; video overlay, green badge |
| CoreModules | 5/10 | 5/10 | 5/10 | 5 random accent colors in one section — biggest offender |
| DesignedForClarity | 5/10 | 5/10 | 5/10 | Dark section #060E1A doesn't fit; green accent, phone dark bg |
| ProblemSolution | 6/10 | 5/10 | 6/10 | Green check, red x icons — use brand for check |
| Community | 5/10 | 5/10 | 5/10 | 4 role colors (indigo/green/amber/pink), bg #f8fafb cold |
| Reliability | 4/10 | 5/10 | 5/10 | Dark section #0A1628; green dominates entire section |
| CTA | 6/10 | 6/10 | 6/10 | Dark gradient ok; green glow, green button, green badge — remove all green |

**Product Score: 5.3/10**

**Fixes:**
1. Hero: bg → white, particles → #6063EE, grid → brand-light, remove purple references
2. InMotion: no dark section — warm alt background (#FCFCFD) or keep dark but unified (#12141D)
3. CoreModules: all icons → brand color (#4A5DDE) with brand-colored badge backgrounds
4. DesignedForClarity: no dark section — use white or alt; green → brand
5. ProblemSolution: green check → brand; red x → brand.error or muted
6. Community: all role badges → brand color outline style; bg → unified
7. Reliability: no dark section — use alt background; green → brand throughout
8. CTA: remove green glow, green button → brand button, green badge → brand badge

---

### ABOUT PAGE

| Section | Visual Identity | Premium Feel | Enterprise Trust | Issues |
|---------|:---:|:---:|:---:|--------|
| Hero | 6/10 | 6/10 | 6/10 | Green badge, green pulse, green radial gradient — green washes out brand |
| OurStory | 5/10 | 5/10 | 6/10 | Green accent line — use brand |
| Philosophy | 6/10 | 6/10 | 7/10 | Green hover text — use brand |
| Ecosystem | 5/10 | 6/10 | 5/10 | Dark section #0A1628; green bar, green checkbox, green labels |
| Leadership | 6/10 | 6/10 | 7/10 | Green badges, per-member bg colors are random #0f1f30 / #0f2318 |
| Stats | 6/10 | 5/10 | 6/10 | Green suffix — use brand |
| FAQ | 5/10 | 5/10 | 6/10 | Same as home FAQ issues |
| CTA | 5/10 | 6/10 | 6/10 | 2 rotating rings, brand glow, shimmer-text-dark, magnetic — too many effects |

**About Score: 4.8/10**

**Fixes:**
1. Hero: green badge/pulse/glow → brand throughout
2. OurStory: green divider → brand
3. Philosophy: green hover → brand
4. Ecosystem: dark → alt or white; green → brand
5. Leadership: green badges → brand; unified card backgrounds
6. Stats: green suffix → brand
7. CTA: remove rotating rings, keep gradient dark, remove brand glow, clean shimmer

---

### BLOG PAGE

| Section | Visual Identity | Premium Feel | Enterprise Trust | Issues |
|---------|:---:|:---:|:---:|--------|
| Hero | 6/10 | 5/10 | 5/10 | `text-indigo-600` (wrong brand), `rgba(96,99,238,0.06)` glow (wrong color) |
| FeaturedPost | 6/10 | 6/10 | 5/10 | Clean, uses brand correctly |
| LatestPosts | 6/10 | 5/10 | 5/10 | Clean |
| CTA | 5/10 | 6/10 | 5/10 | Same over-effected dark CTA pattern |

**Blog Score: 5.3/10**

**Fixes:**
1. Hero: `text-indigo-600` → `text-brand`; glow → brand
2. CTA: same as other CTAs — remove purple glow, clean up

---

### SOCIALS PAGE

| Section | Visual Identity | Premium Feel | Enterprise Trust | Issues |
|---------|:---:|:---:|:---:|--------|
| Hero | 7/10 | 7/10 | 4/10 | Wrong brand color (#6B5CE7), no connection to main brand |
| TrustSection | 6/10 | 6/10 | 4/10 | Wrong brand color, icosahedron wireframe nice but wrong color |
| StatsSection | 7/10 | 7/10 | 4/10 | Wrong brand color, dark #0D0D0F different from other pages |
| CTA | 6/10 | 6/10 | 4/10 | Wrong brand color, #F9F8FF bg doesn't connect |

**Socials Score: 4.8/10**

**Fixes:**
1. ALL: replace #6B5CE7 with #6063EE (brand)
2. ALL: replace #F9F8FF with white or #FCFCFD (no lavender tint)
3. Three.js systems: all change to 0x6063ee

---

## Proposed Unified Design System

### Color Tokens

```ts
// tailwind.config.ts
colors: {
  brand: {
    DEFAULT: "#6063EE",     // Primary — Deep Periwinkle Blue
    dark:    "#4648D4",     // Hover, active states
    light:   "#7B7FF0",    // Subtle accents, icon backgrounds (35% opacity)
    bg:      "#F8F9FA",    // Page background
    ink:     "#1A1C1D",    // Primary text (keep existing)
    muted:   "#6B7280",    // Secondary text (keep existing)
    faint:   "#9EA0A5",    // Tertiary text (keep existing)
    success: "#1E8B4C",    // Success states (replaces #22C55E)
    warning: "#D97706",    // Warning states (replaces #F59E0B)
    error:   "#BC1C1E",    // Error states (replaces #EF4444)
  },
},
```

### Dark Mode Tokens

```ts
  darkBg:   "#12141D",    // Page background on dark CTAs (unified)
  darkCard: "#1A1D28",    // Card surface on dark (unified)
  darkBorder: "#2A2D3A",  // Borders on dark (unified)
```

### Why these specific values

| Token | Rationale |
|-------|-----------|
| `#6063EE` | Already established as brand.DEFAULT. Keep — it's distinctive |
| `#4648D4` | Already brand-dark. Keep |
| `#7B7FF0` | Already brand-light (contact page). Promote to official token |
| `#1E8B4C` | Custom success green. NOT Tailwind green-500. Deeper, more premium |
| `#D97706` | Custom warning amber. NOT Tailwind amber-500. More muted, premium |
| `#BC1C1E` | Custom error red. NOT Tailwind red-500. Dark cherry, less aggressive |
| `#12141D` | Single dark background for ALL dark sections. Replaces 8 variants |
| `#1A1D28` | Single dark card surface. Replaces 5 variants |
| `#2A2D3A` | Single dark border. Replaces 4 variants |

### Elevation System

```
shadow-sm:     0 1px 3px rgba(0,0,0,0.04)           — cards
shadow-md:     0 4px 16px rgba(0,0,0,0.06)           — elevated cards
shadow-lg:     0 8px 32px rgba(0,0,0,0.08)           — modals, dropdowns
shadow-xl:     0 16px 48px rgba(0,0,0,0.1)           — hero mockups
shadow-glow:   0 4px 24px rgba(96,99,238,0.35)       — brand CTA buttons
shadow-glow-lg: 0 8px 36px rgba(96,99,238,0.45)      — brand CTA hover
shadow-float:  0 20px 60px rgba(96,99,238,0.18)      — floating card
shadow-dark:   0 32px 80px rgba(0,0,0,0.25)          — dark CTA cards
```

### Border System

```
border-subtle:   rgba(0,0,0,0.06)    — default card borders
border-default:  rgba(0,0,0,0.10)    — input borders
border-strong:   rgba(0,0,0,0.15)    — dividers, table borders
border-brand:    rgba(96,99,238,0.15) — brand accent borders
border-dark:     rgba(255,255,255,0.06) — borders on dark bg
border-dark-card: rgba(255,255,255,0.10) — card borders on dark
```

### Glass System

```
glass-light:  background rgba(255,255,255,0.6), backdrop-blur-xl, border white/70
glass-dark:   background rgba(16,19,31,0.7), backdrop-blur-xl, border rgba(255,255,255,0.08)
```

### CTA Card System (Dark)

All dark CTAs follow ONE pattern:

```
bg: #12141D (solid)
border: inset 0 0 0 1px rgba(255,255,255,0.05)
shadow: 0 32px 80px rgba(0,0,0,0.25)

Ambient glow (keep):
  radial-gradient(ellipse top center, rgba(96,99,238,0.12) 0%, transparent 70%)

Grid overlay (conditional — only if space feels empty):
  linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)
  + linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
  backgroundSize: 48px 48px
  opacity: 0.03

NOT included:
  ✗ Purple glow
  ✗ Rotating rings
  ✗ Shimmer text
  ✗ Magnetic buttons
  ✗ Multiple gradient stops
```

### Section Rhythm

```
Section padding: py-section (7rem)
Section gap between adjacent light sections: 0 (direct stack)
Section visual breaks: Alt background (#FCFCFD or #F7F8FB) every 3-4 sections
Max sections per page: 7-9

Section type sequence (ideal):
  WHITE → ALT → WHITE → WHITE → ALT → WHITE → DARK (CTA)
```

### Button System

```
Primary (brand):
  bg: brand.DEFAULT
  color: white
  shadow: glow-glow (0 4px 24px rgba(96,99,238,0.35))
  hover: bg brand.dark, y: -1px, shadow: glow-glow-lg
  border: none

Secondary (outline):
  bg: transparent (or white)
  color: brand.ink
  border: 1px solid rgba(0,0,0,0.1)
  hover: border brand/20, y: -1px

Dark CTA primary:
  bg: white
  color: brand.ink
  hover: bg white/90

Dark CTA secondary:
  bg: transparent
  color: white
  border: 1px solid rgba(255,255,255,0.2)
  hover: bg rgba(255,255,255,0.08)
```

---

## Component-by-Component Action Plan

### High Priority (Brand Identity)

| Component | Action | Effort |
|-----------|--------|--------|
| tailwind.config.ts brand colors | Update brand.DEFAULT, add brand.light, success, warning, error | 10 min |
| globals.css :root | Update CSS vars, remove brand-purple, add new tokens | 15 min |
| globals.css .contact-page | Delete entire override section (was breaking brand) | 5 min |
| socialhero.tsx | Replace all #6B5CE7 → #6063EE, Three.js 0x6b5ce7 → 0x6063ee | 20 min |
| producthero.tsx | Replace #6366f1 → #6063EE, Three.js → 0x6063ee, bg → white | 15 min |
| aboutHero.tsx | Replace all green (#22C55E) → brand | 15 min |
| Contact page CSS | Replace #5A5FE8 → #6063EE everywhere | 20 min |
| Navbar.tsx | Replace #6366f1 glow → #6063EE | 10 min |

### Medium Priority (Visual Consistency)

| Component | Action | Effort |
|-----------|--------|--------|
| CoreModules.tsx | All 5 icon colors → single brand color | 10 min |
| Community.tsx | All 4 role colors → single brand outline | 10 min |
| Features.tsx (Home) | All 6 icon backgrounds → brand tint | 10 min |
| homehero.tsx avatar dots | 5 rainbow colors → brand variants | 10 min |
| ThreePricingBackground.tsx | Remove emerald rings entirely | 5 min |
| Pricing.tsx | Remove import of ThreePricingBackground | 2 min |
| All CTAs | Standardize on #12141D solid bg, remove purple glow | 30 min |

### Low Priority (Refinement)

| Component | Action | Effort |
|-----------|--------|--------|
| LegalHeader.tsx | Replace #5e6ad2 → #6063EE | 10 min |
| LegalDocPage.tsx | Replace #5e6ad2 → #6063EE | 15 min |
| ArchiveClient.tsx (Blog) | Replace random category colors → brand tints | 10 min |
| Footer.tsx radial glow | Change #6366f1 glow to #6063EE | 5 min |
| LoadingScreen.tsx | Replace #22c55e → brand.success | 5 min |
| Slack notification colors | Replace #5A5FE8 → brand.DEFAULT | 5 min |
| buttonVariants.ts | Update shadow rgba values | 5 min |

---

## Visual Identity Principles

### What makes HermesWorkspace feel premium

1. **Dashboard mockup systems** (homehero, FeatureMocks) — genuinely well-executed, detailed, realistic. Keep and enhance.

2. **Three.js particle systems** — tasteful when using the correct brand color. They add depth without being distracting.

3. **Framer Motion choreography** — staggered entrances, spring physics, smooth transitions. Consistently good.

4. **Typography** — display font for headings, body font for text, clear size hierarchy. Keep.

5. **Glassmorphism** — used sparingly on floating cards and hero elements. Subtle and effective.

6. **Dark CTA cards** — the gradient dark card with brand glow is a signature element. Standardize it.

### What makes HermesWorkspace feel generic

1. **Green (#22C55E)** — default Tailwind green-500 appears 65+ times. It's the single biggest "template" signal.

2. **Multiple brand colors** — 8 different primary blues across pages. Makes the site feel like 5 different products.

3. **Rainbow accent colors** — CoreModules uses 5 colors, Features uses 6, homehero avatar uses 5. This is consumer/startup, not enterprise.

4. **Rotating rings** — found in About CTA and Pricing background. They're a template hallmark.

5. **Shimmer text** — used in About CTA hero word. Fine as a highlight, but overdone in combination with rings + glows.

6. **Magnetic buttons** — used in 4+ CTAs. Novel on first visit, distracting on repeat. Drops trust score.

7. **Purple gradients everywhere** — `#A855F7` or `#7C3AED` in hero backgrounds, OG image, buttons. Template indigo-purple combo.

### What makes HermesWorkspace NOT feel like enterprise education

1. **No consistent color language** — an educational administrator visiting multiple pages sees different brand colors. This hurts trust.

2. **Green as primary accent** — schools associate green with "success grades" but not with "infrastructure brand." Using green as a dominant accent weakens the platform positioning.

3. **Dark section inconsistency** — an About page visitor sees #0A1628, then a Product visitor sees #060E1A. Feels like unfinished design.

4. **No segmentation between content types** — stat numbers, feature icons, badges, tags, and CTAs all use similar visual weight. Enterprise products carefully differentiate these.

---

## Summary: What to KEEP vs REFINE vs REPLACE vs REMOVE

### KEEP (preserve exactly or with minimal color change)

- Three.js particle systems (all, just update brand color)
- Dashboard mockups (homehero.tsx, FeatureMocks.tsx)
- Framer Motion choreography
- Typography system
- Glassmorphism on floating cards
- Dark CTA gradient (Home CTA pattern)
- Brand glow shadows (#6063EE)
- Animated counters
- Staggered entrance animations
- Grid patterns on alt/dark sections
- Footer dark section
- Pricing cards
- Badge component styling
- Bento card layout
- Hero rotating word effect
- Gradient text (update colors, keep effect)

### REFINE (keep the effect, update the colors)

- Brand gradient: `#6063EE → #A855F7` → `#6063EE → #7B7FF0` (remove purple)
- Purple accent: replace with brand-light
- Shimmer text: replace purple references with brand-light
- Glass card shadows: ensure all use `rgba(96,99,238,*)`
- Icon accent colors in section features: unify to brand
- CTA dark sections: standardize all to one pattern
- Navbar active glow: use brand.DEFAULT

### REPLACE (change the color, keep the element)

- All green `#22C55E` → `#1E8B4C` (brand.success) or brand.DEFAULT
- All `#6366f1` → `#6063EE`
- All `#6B5CE7` → `#6063EE`
- All `#5A5FE8` → `#6063EE`
- All `#5e6ad2` → `#6063EE`
- All `#A855F7` → `#7B7FF0` (brand-light)
- All `#4338ca` → `#4648D4` (brand-dark)
- CoreModules icon colors → single brand color
- Community role colors → single brand outline
- Features icon colors → single brand tint
- About Ecosystem: dark → white or alt
- Product dark sections (InMotion, DesignedForClarity, Reliability): → white or alt
- Socials bg `#F9F8FF` → white or alt

### REMOVE (delete the element entirely)

- ThreePricingBackground.tsx (emerald rings add nothing)
- Rotating rings in About CTA
- Magnetic button effects
- Purple glow radial gradients in CTAs (replace with brand-only)
- `.contact-page` scoped CSS variable override (delete)
- Blog ArchiveClient random category colors
- Legal page standalone color system (use brand tokens)
- `brand-purple` from tailwind config
- `brand-gradient` with purple endpoint
- All `rgba(168,85,247,*)` effects
- GridHelper from contact hero Three.js (color #0a1628 is wrong)
- Homehero gradient `#5052d0 → #7C3AED` → replace with brand gradient

---

## Appendix: Exact Color Replacements (Find-and-Replace Ready)

### Global CSS Variable Changes

```css
/* globals.css :root changes */
--brand: #6063EE;                          /* KEEP */
--brand-dark: #4648D4;                     /* KEEP */
--brand-light: #7B7FF0;                    /* NEW — promote from contact page */
--brand-purple: #A855F7;                   /* REMOVE */
--brand-success: #1E8B4C;                  /* NEW */
--brand-warning: #D97706;                  /* NEW */
--brand-error: #BC1C1E;                    /* NEW */
--bg: #F8F9FA;                             /* KEEP */
--ink: #1A1C1D;                            /* KEEP */
--ink-muted: #45464C;                      /* KEEP */
--ink-faint: #9EA0A5;                      /* KEEP */
--border: rgba(0, 0, 0, 0.07);            /* KEEP */

/* Delete entire .contact-page scoped override section */
```

### Tailwind Config Changes

```ts
colors: {
  brand: {
    DEFAULT: "#6063EE",
    dark: "#4648D4",
    light: "#7B7FF0",
    bg: "#F8F9FA",
    ink: "#1A1C1D",
    muted: "#6B7280",
    success: "#1E8B4C",
    warning: "#D97706",
    error: "#BC1C1E",
  },
},
```

### Key Color Mappings

Every green `#22C55E` → ask: "Is this a success indicator or a brand accent?"
- Success indicator → `#1E8B4C`
- Brand accent → `#6063EE`

Every purple `#A855F7` → `#7B7FF0` (brand-light)

Every random accent (`#3b82f6`, `#ec4899`, `#10b981`, `#f59e0b` in feature icons) → `#6063EE`

Every `#6366f1` → `#6063EE`

Every `#6B5CE7` → `#6063EE`

Every `#5A5FE8` → `#6063EE`

Every `#5e6ad2` → `#6063EE`

Every `rgba(99,102,241,*)` → `rgba(96,99,238,*)`

Every `rgba(107,92,231,*)` → `rgba(96,99,238,*)`

Every `rgba(90,95,232,*)` → `rgba(96,99,238,*)`

Every `rgba(168,85,247,*)` → remove or replace with `rgba(123,127,240,*)` (brand-light)
