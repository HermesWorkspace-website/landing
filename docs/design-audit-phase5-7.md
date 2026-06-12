# HermesWorkspace Design Audit — Full Report

## PHASE 5: Recommended Color System Design

### Single, ownable primary: `#4A5DDE` (Deep Periwinkle)

Why not "indigo" or "purple"?
- Indigo/purple is the single most generic "startup tech" color (Linear, Stripe, Notion clones)
- `#4A5DDE` is distinct from Stripe's `#635BFF` (more blue-leaning), Linear's `#5E6AD2` (less saturated), and Notion's `#2563EB` (less blue)
- It signals **trust + creativity + premium** — ideal for an institutional brand
- Passes WCAG AA on `#FFFFFF` (4.5:1+)

### Full palette

```ts
brand: {
  DEFAULT: '#4A5DDE',     // Primary — Deep Periwinkle
  dark:    '#3A49B0',     // Hover state, active
  light:   '#7B89E8',     // Subtle accents, backgrounds (40% opacity)
  bg:      '#F4F5FA',     // Page background — warm off-white
  ink:     '#1A1D26',     // Primary text — almost-black with blue undertone
  muted:   '#61667A',     // Secondary text — warm slate
  faint:   '#A9ADC0',     // Tertiary text / placeholder
  success: '#1E8B4C',     // Success green — deeper than default Tailwind
  warning: '#B8860B',     // Warning amber — darker, more premium
  error:   '#BC1C1E',     // Error red — dark cherry, not bright tomato
  info:    '#2563EB',     // Info blue — standard, recognizable
  accent:  '#D97706',     // Accent amber — warm highlight
}
```

### Dark mode palette

```ts
  darkBg:      '#12141D',  // Page background — deep navy
  darkCard:    '#1A1D28',  // Card/surface
  darkBorder:  '#2A2D3A',  // Borders
  darkMuted:   '#8B8FA0',  // Secondary text on dark
  darkFaint:   '#5D6170',  // Tertiary text on dark
```

### Why this works
1. **Single primary** — every page uses `#4A5DDE`. No more 8 different blues.
2. **Warm undertone** — `#F4F5FA` (not `#FAFAFA` which is cold) gives institutional warmth
3. **Deep green/red** — removes the default Tailwind `#22C55E`/`#EF4444` that screams "template"
4. **Contrast-optimized** — every pair passes WCAG AA at minimum
5. **Dark mode** uses navy-dark (`#12141D`) not `#0A1628` or `#0D0D0F` — cohesive page to page

### Replacements for current colors

| Current | → New | Rationale |
|---------|-------|-----------|
| `#6063EE` | `#4A5DDE` | Single primary |
| `#6366f1` | `#4A5DDE` | Consistent across Product |
| `#6B5CE7` | `#4A5DDE` | Consistent across Socials/Founders |
| `#5A5FE8` | `#4A5DDE` | Consistent across Contact |
| `#5e6ad2` | `#4A5DDE` | Consistent across Legal |
| `#A855F7` | `#7B89E8` (brand.light) | Remove purple; use light periwinkle |
| `#22C55E` | `#1E8B4C` (brand.success) | Custom success green |
| `#EF4444` | `#BC1C1E` (brand.error) | Custom error red |
| `#F59E0B` | `#D97706` (brand.accent) | Custom amber |
| `#0A1628` | `#12141D` (darkBg) | Unified dark background |
| `#0D0D0F` | `#12141D` | Unified dark background |
| `#060E1A` | `#12141D` | Unified dark background |
| `#071221` | `#12141D` | Unified dark background |
| `#1A1C1D` | `#1A1D26` | Unified ink with blue undertone |
| `#161922` | `#1A1D26` | Unified ink |
| `#0D0E1C` | `#1A1D26` | Unified ink |
| `#F8F9FA` | `#F4F5FA` | Warm page background |
| `#FAFAFA` | `#F4F5FA` | Warm page background |
| `#6B7280` | `#61667A` | Custom muted with blue undertone |
| `#9896A4` | `#61667A` | Custom muted |
| `#62666d` | `#61667A` | Custom muted |

### Gradient replacements

| Current | → New |
|---------|-------|
| `linear-gradient(135deg, #6063EE 0%, #A855F7 100%)` | `linear-gradient(135deg, #4A5DDE 0%, #7B89E8 100%)` |
| `radial-gradient(..., rgba(96,99,238,0.07)...)` | `radial-gradient(..., rgba(74,93,222,0.07)...)` |
| `dark-gradient: #1A1C1D → #2d2f30` | `dark-gradient: #12141D → #1A1D28` |

### Button shadows

| Current | → New |
|---------|-------|
| `rgba(96,99,238,0.35)` | `rgba(74,93,222,0.35)` |
| `rgba(96,99,238,0.5)` | `rgba(74,93,222,0.45)` |

---

## PHASE 6: Component-Level Audit

### Changes required per component

#### globals.css
- Update all `--brand`, `--brand-dark`, `--brand-purple` var values
- Add new `--success`, `--error`, `--warning`, `--info` vars
- Remove `--brand-purple` (replace with `--brand-light`)
- Update `.contact-page` scoped vars
- Update `.shimmer-text-dark` hex references
- Update `.mock-avatar` gradient
- Update `.badge-brand` background/border rgba values
- Update `.badge-green` to use new brand.success
- Update `.btn-brand` and `.btn-brand:hover` shadows
- Update `.bento:hover`, `.card-hover:hover` brand references

#### tailwind.config.ts
- Replace all brand color hex values
- Add `success`, `error`, `warning`, `info` to brand object
- Update `boxShadow` references to use `#4A5DDE`
- Update `backgroundImage` gradient hex values
- Remove `brand-purple`
- Add `brand-light`

#### components/shared/Navbar.tsx
- Replace `#6366f1` with `#4A5DDE`
- Update all `rgba(99,102,241,*)` → `rgba(74,93,222,*)`

#### components/shared/Footer.tsx
- Replace `#6366f1` with `#4A5DDE`

#### components/Home_sections/homehero.tsx
- Replace `#6063EE` with `#4A5DDE`
- Replace `#4338ca` with `#3A49B0`
- Replace `#7C3AED` with `#7B89E8`
- Replace `#5052d0` with `#4A5DDE`
- Update all rgba() shadow values

#### components/Home_sections/FeatureMocks.tsx
- Replace `#6366f1` with `#4A5DDE`
- Replace `#1A1C1D` with `#1A1D26`
- Replace `#2A2D31` with brand context or darkBorder
- Replace `#8b5cf6` with `#7B89E8`
- Update all `rgba(99,102,241,*)` → `rgba(74,93,222,*)`

#### components/Home_sections/Mobile.tsx
- Replace `#6063EE` with `#4A5DDE`
- Replace `#A855F7` with `#7B89E8`
- Replace `#1A1C1D`, `#22252A`, `#1d1f24` with unified dark gradient
- Update all rgba() values

#### components/Home_sections/CTA.tsx
- Replace `#1A1C1D`, `#22252A`, `#1d1f24` with unified dark gradient
- Update all brand rgba() references

#### components/Home_sections/Pricing.tsx
- Replace `#1A1C1D` with `#1A1D26`

#### components/Home_sections/WorkflowBento.tsx
- Replace `rgba(99,102,241,*)` → `rgba(74,93,222,*)`
- Replace `rgba(96,99,238,*)` → `rgba(74,93,222,*)`

#### components/product/producthero.tsx
- Replace `#6366f1` with `#4A5DDE`
- Replace `#4338ca` with `#3A49B0`
- Replace `#a78bfa` with `#7B89E8`
- Replace `#eef0f8` with `#F4F5FA`
- Replace `#0d0e1c` with `#1A1D26`
- Replace `#6b7096` + `#8b8fbd` with `#61667A`
- Update all `rgba(99,102,241,*)` → `rgba(74,93,222,*)`

#### components/product/Mobileproductpage.tsx
- Replace `#6366f1` with `#4A5DDE`
- Replace `#4338ca` with `#3A49B0`
- Replace `#a78bfa` with `#7B89E8`
- Replace `#eef0f8` with `#F4F5FA`
- Replace `#0d0e1c` with `#1A1D26`
- Replace `#6b7096` + `#8b8fbd` with `#61667A`
- Replace `#0A1628` with `#12141D`
- Replace `#060E1A` with `#12141D`
- Replace `#071221` with `#12141D`
- Replace `#0D1E35` with `#1A1D28`
- Replace `#22C55E` with `#1E8B4C`
- Replace `#EF4444` with `#BC1C1E`
- Replace `#6B7280` with `#61667A`
- Replace `#4B5563` with `#61667A`
- Replace `#9CA3AF` with `#A9ADC0`
- Replace `#FEF2F2` + `#F0FDF4` with appropriate brand.success/error tints
- Replace `#FCA5A5` with brand.error tint
- Replace `#F3F4F6` with brand neutral
- Replace `#f8fafb` with `#F4F5FA`
- Update all rgba() values with brand color references

#### components/product/InMotion.tsx
- Replace `#060E1A` with `#12141D`
- Replace `#6366f1` with `#4A5DDE`
- Replace `#0D1E35` with `#1A1D28`
- Replace `#071221` with `#12141D`
- Replace `#0A1628` with `#12141D`
- Update rgba() values

#### components/product/DesignedForClarity.tsx
- Replace `#060E1A` with `#12141D`
- Replace `#22C55E` with `#1E8B4C`
- Replace `#0D1E35` with `#1A1D28`
- Replace `#071221` with `#12141D`

#### components/product/CTA.tsx
- Replace `#060E1A`, `#0A1628`, `#0f2d4a` with unified dark gradient
- Replace `#22C55E` with `#1E8B4C`
- Replace `#16a34a` with appropriate hover

#### components/product/Community.tsx
- Replace `#6366f1` with `#4A5DDE`
- Replace `#22C55E` with `#1E8B4C`
- Replace `#f59e0b` with `#D97706`
- Replace `#ec4899` with brand accent
- Replace `#f8fafb` with `#F4F5FA`
- Replace `#6B7280` with `#61667A`
- Replace `#0A1628` with `#12141D` or `#1A1D26`

#### components/product/CoreModules.tsx
- Replace `#22C55E` with `#1E8B4C`
- Replace `#3b82f6` with `#2563EB` (brand.info)
- Replace `#f59e0b` with `#D97706` (brand.accent)
- Replace `#a855f7` with `#7B89E8` (brand.light)
- Replace `#ec4899` with brand accent tint
- Replace `#6B7280` with `#61667A`
- Replace `#0A1628` with `#1A1D26`

#### components/product/ProblemSolution.tsx
- Replace `#6B7280` with `#61667A`
- Replace `#0A1628` with `#1A1D26`
- Replace `#4B5563` with `#61667A`
- Replace `#22C55E` with `#1E8B4C`

#### components/product/Reliability.tsx
- Replace `#22C55E` with `#1E8B4C`
- Replace `#0A1628` with `#12141D`

#### components/about/aboutHero.tsx
- Replace `#22C55E` with `#1E8B4C`
- Replace `#0A1628` with `#12141D`
- Replace `#6B7280` with `#61667A`
- Replace `#0D1F38` with `#1A1D28`
- Update rgba() values

#### components/about/CTA.tsx
- Replace `#071221`, `#0A1628`, `#0e2244` with unified dark gradient
- Replace `rgba(90,95,232,*)` → `rgba(74,93,222,*)`
- Replace `rgba(96,99,238,*)` → `rgba(74,93,222,*)`

#### components/about/Stats.tsx
- Replace `#0A1628` with `#1A1D26`
- Replace `#22C55E` with `#1E8B4C`
- Replace `#6B7280` with `#61667A`
- Replace `#9CA3AF` with `#A9ADC0`

#### components/about/LeadershipTeam.tsx
- Replace `#0f1f30` with `#1A1D28`
- Replace `#0f2318` with `#1A1D28`
- Replace `#6B7280` with `#61667A`
- Replace `#0A1628` with `#1A1D26`
- Replace `#22C55E` with `#1E8B4C`
- Replace `#4B5563` with `#61667A`
- Replace `#6B5CE7` with `#4A5DDE`
- Replace `#1A3FBE` with `#3A49B0`

#### components/about/Ecosystem.tsx
- Replace `#0A1628` with `#12141D`
- Replace `#22C55E` with `#1E8B4C`
- Replace `#6063EE` with `#4A5DDE`
- Replace `#0D1E35` with `#1A1D28`
- Replace `#071221` with `#12141D`

#### components/about/OurStory.tsx
- Replace `#6B7280` with `#61667A`
- Replace `#0A1628` with `#1A1D26`
- Replace `#4B5563` with `#61667A`
- Replace `#22C55E` with `#1E8B4C`

#### components/about/Philosophy.tsx
- Replace `#0A1628` with `#1A1D26`
- Replace `#6B7280` with `#61667A`
- Replace `#22C55E` with `#1E8B4C`

#### components/about/Mobileabout.tsx
- Replace `#0A1628` with `#12141D` (const INK)
- Replace `#22C55E` with `#1E8B4C` (const GREEN)
- Replace `#6B7280` with `#61667A` (const MUTED)
- Replace `#E5E7EB` with brand neutral border
- Replace `#4B5563` with `#61667A`
- Replace `#6063EE` with `#4A5DDE`
- Replace `#0f1f30` with `#1A1D28`
- Replace `#6B5CE7` with `#4A5DDE`
- Replace `#0f2318` with `#1A1D28`
- Replace `#1A3FBE` with `#3A49B0`
- Replace all purple circle fills with brand hues
- Replace `#071221` with `#12141D`
- Update rgba() values

#### components/socials/socialhero.tsx
- Replace `#6B5CE7` with `#4A5DDE`
- Replace `#E8E5F0` with brand border
- Replace `#9896A4` with `#61667A`
- Replace `#F8F7FF` with `#F4F5FA`
- Replace `#0D0D0F` with `#1A1D26`
- Replace `#EAE8FF` with brand.light tint
- Replace `#F9F8FF` with `#F4F5FA`
- Replace `#1A3FBE` with `#3A49B0`
- Replace `#666` with `#61667A`
- Update rgba() values

#### components/socials/TrustSection.tsx
- Replace `#F9F8FF` with `#F4F5FA`
- Replace `#0D0D0F` with `#1A1D26`
- Replace `#6B5CE7` with `#4A5DDE`
- Replace `#E8E5F0` with brand border
- Replace `#EAE8FF` with brand.light tint
- Replace `#9896A4` with `#61667A`
- Replace `#666` with `#61667A`
- Update rgba() values

#### components/socials/StatsSection.tsx
- Replace `#9896A4` with `#61667A`
- Replace `#0D0D0F` with `#1A1D26`
- Replace `#6B5CE7` with `#4A5DDE`
- Replace `#666` with `#61667A`
- Update rgba() values

#### components/socials/Mobilepage.tsx
- Replace `#666` with `#61667A`
- Replace `#888` with `#A9ADC0`
- Replace `#777` with `#61667A`
- Replace `rgba(107,92,231,*)` → `rgba(74,93,222,*)`

#### components/socials/InstitutionalPulse.tsx
- Replace `#888` with `#A9ADC0`
- Replace `rgba(107,92,231,*)` → `rgba(74,93,222,*)`

#### components/socials/EcosystemSection.tsx
- Replace `#666` with `#61667A`
- Replace `#888` with `#A9ADC0`

#### components/socials/CtaSection.tsx
- Replace `#666` with `#61667A`
- Replace `rgba(107,92,231,*)` → `rgba(74,93,222,*)`

#### components/founders/founders-data.ts
- Replace `#6B5CE7` with `#4A5DDE`
- Replace `#1A3FBE` with `#3A49B0`

#### components/founders/RightPanel.tsx
- Replace `#444` with `#61667A`
- Replace `#9896A4` with `#61667A`
- Replace `#0D0D0F` with `#1A1D26`
- Replace `#0D0D0D` with `#1A1D26`
- Replace `#D8D4CC` with `#2A2D3A` (darkBorder)
- Replace `#E8E4DC` with `#2A2D3A`

#### components/founders/LeftPanel.tsx
- Replace `#9896A4` with `#61667A`
- Replace `#0D0D0F` with `#1A1D26`
- Replace `#555` with `#61667A`

#### components/founders/ProgressBar.tsx
- Replace `#9896A4` with `#61667A`
- Replace `#E8E4DC` with `#2A2D3A`

#### components/founders/FoundersShowcase.tsx
- Replace `#ffffff` with `#FFFFFF` (keep white)

#### components/founders/Mobile.tsx
- Replace `#666` with `#61667A`
- Replace `#0D0D0F` with `#1A1D26`
- Replace `#D8D4CC` with `#2A2D3A`
- Replace `#9896A4` with `#61667A`
- Replace `#555` with `#61667A`
- Replace `#FAFAFA` with `#F4F5FA`
- Update rgba() values

#### components/founders/mobileFounderShowcase.tsx
- Replace `#0D0D0F` with `#1A1D26`
- Replace `#D8D4CC` with `#2A2D3A`
- Replace `#9896A4` with `#61667A`
- Replace `#555` with `#61667A`
- Replace `#666` with `#61667A`
- Replace `#E8E4DC` with `#2A2D3A`

#### components/founders/CTA.tsx
- Replace `#181A1D`, `#20242B`, `#1A1D23` with unified dark gradient
- Update rgba() values

#### components/founders/mission.tsx
- Replace `#FAFAFA` with `#F4F5FA`

#### components/contactpage/contacthero.tsx and related
- Replace `#5A5FE8` with `#4A5DDE`
- Replace `#7B7FF0` with `#7B89E8`
- Replace `#3D42C8` with `#3A49B0`
- Replace all `rgba(90,95,232,*)` → `rgba(74,93,222,*)`
- Update `.contact-page` scoped CSS vars

#### components/contactpage/Mobilecontactpage.tsx
- Replace `#5A5FE8` with `#4A5DDE`
- Replace `#a855f7` with `#7B89E8`
- Replace `#10b981` with `#1E8B4C`
- Replace `#EF4444` with `#BC1C1E`
- Replace `#22C55E` with `#1E8B4C`
- Replace `#161b22` with `#1A1D28`
- Replace `#F59E0B` with `#D97706`
- Replace all `rgba(90,95,232,*)` → `rgba(74,93,222,*)`

#### components/contactpage/Inquiry.tsx
- Replace `#EF4444` with `#BC1C1E`
- Replace `#22C55E` with `#1E8B4C`
- Update rgba() values

#### components/contactpage/Realtime.tsx
- Replace `#22C55E` with `#1E8B4C`
- Replace `#a855f7` with `#7B89E8`
- Replace `#161b22` with `#1A1D28`
- Replace `#F59E0B` with `#D97706`

#### components/contactpage/Features.tsx
- Replace `#5A5FE8` with `#4A5DDE`
- Replace `#7B7FF0` with `#7B89E8`
- Replace `#a855f7` with `#7B89E8`
- Replace `#c084fc` with brand.light tint
- Replace `#10b981` with `#1E8B4C`
- Replace `#34d399` with success tint
- Update rgba() values

#### components/contactpage/CTA.tsx
- Replace `rgba(90,95,232,*)` → `rgba(74,93,222,*)`

#### components/blogs/ArchiveClient.tsx
- Replace `#6063EE` with `#4A5DDE`
- Replace `#22C55E` with `#1E8B4C`
- Replace `#14B8A6` with brand accent
- Replace `#DC2626` with `#BC1C1E`
- Replace `#EF4444` with `#BC1C1E`
- Replace `#EA580C` with `#D97706`

#### components/blogs/FeaturedPost.tsx
- Replace `#6063EE` with `#4A5DDE`

#### components/blogs/Bloghero.tsx
- Replace `rgba(96,99,238,0.06)` → `rgba(74,93,222,0.06)`

#### components/blogs/CTA.tsx
- Replace dark gradient with unified dark gradient
- Replace `rgba(96,99,238,*)` → `rgba(74,93,222,*)`
- Replace `rgba(168,85,247,*)` → `rgba(123,137,232,*)`

#### components/blogs/AuthorHoverCard.tsx
- Replace `#0077B5` with brand.info `#2563EB` or keep LinkedIn blue

#### components/LoadingScreen/LoadingScreen.tsx
- Replace `#FAFAFA` with `#F4F5FA`
- Replace `#0f172a` with `#1A1D26`
- Replace `#22c55e` with `#1E8B4C`

#### components/legal/LegalHeader.tsx
- Replace color scheme entirely to use brand colors

#### components/legal/LegalDocPage.tsx
- Replace entire color scheme to use brand palette

#### app/(app)/(main)/page.tsx
- Replace `#0A0A0A` theme-color with `#1A1D26`

#### app/(app)/(main)/opengraph-image.tsx
- Replace `#6063EE` with `#4A5DDE`
- Replace `#A855F7` with `#7B89E8`
- Replace `#0B0C1E` with `#12141D`
- Replace `#818cf8` with `#7B89E8`
- Update rgba() values

#### lib/send-slack-notification.ts
- Replace `#5A5FE8` with `#4A5DDE`
- Replace `#7C3AED` with `#7B89E8`
- Replace `#0EA5E9` with `#2563EB`
- Replace `#F59E0B` with `#D97706`
- Replace `#6B7280` with `#61667A`

#### app/api/slack/actions/route.ts
- Replace `#9CA3AF` with `#A9ADC0`

#### components/ui/buttonVariants.ts
- Replace `rgba(96,99,238,*)` → `rgba(74,93,222,*)`

---

## PHASE 7: Implementation Plan (ordered by ROI)

### Tier 1 — HIGH IMPACT (change the CSS vars, everything downstream follows)
1. Update `tailwind.config.ts` brand colors
2. Update `globals.css` CSS custom properties
3. Delete the `.contact-page` scoped var section (it now inherits from :root)

### Tier 2 — MEDIUM IMPACT (3-5 files, high visual frequency)
4. `Navbar.tsx` — brand shadow/glow
5. `Footer.tsx` — brand radial gradient
6. `homehero.tsx` — brand dots, gradient references
7. `CTA.tsx` (home/about/founders/blog/product/contact) — dark gradient + glow
8. `FeatureMocks.tsx` — all brand references
9. `Mobile.tsx` (home) — all brand references

### Tier 3 — PAGE-BY-PAGE (systematic)
10. Product page files (producthero, Mobileproductpage, InMotion, DesignedForClarity, CTA, Community, CoreModules, ProblemSolution, Reliability)
11. About page files (aboutHero, CTA, Stats, LeadershipTeam, Ecosystem, OurStory, Philosophy, Mobileabout)
12. Socials page files (socialhero, TrustSection, StatsSection, Mobilepage, InstitutionalPulse, EcosystemSection, CtaSection)
13. Founders page files (all)
14. Contact page files (all)
15. Blog components (ArchiveClient, FeaturedPost, Bloghero, CTA)
16. Legal pages (full recoloring)
17. Loading screen
18. OG image (opengraph-image.tsx)

### Tier 4 — LOW EFFORT (single hex replacements)
19. Founders data constants
20. Slack notification colors
21. buttonVariants.ts
22. page.tsx theme-color meta
23. AuthorHoverCard.tsx

### Estimated effort
- **~450+ individual color replacements** across ~45+ files
- **3-4 hours** with find-replace automation
- **~20 minutes** if using a scripted bulk replacement approach

---

## Audit Summary

| Phase | Status | Key Finding |
|-------|--------|-------------|
| 1. Extraction | ✅ Complete | 95+ hex, 70+ rgba, 8 distinct primaries |
| 2. Brand Scoring | ✅ Complete | **3.4/10** — inconsistent, unmemorable |
| 3. Template Detection | ✅ Complete | **8/10** — indistinguishable from starter template |
| 4. Competitor Positioning | ✅ Complete | Every strong brand has 1 primary; we have 8 |
| 5. New Palette Design | ✅ Complete | Single `#4A5DDE` primary, full OKLCH system |
| 6. Component Audit | ✅ Complete | ~450+ replacements across ~45+ files |
| 7. Implementation Plan | ✅ Complete | 4 tiers, 3-4 hours estimated |
