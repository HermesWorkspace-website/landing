# HermesWorkspace Landing Page

**Every school. One platform.**

A production-grade Next.js 14 landing page for HermesWorkspace — India's unified school management and communication platform.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Components | shadcn/ui (Radix UI primitives + CVA) |
| Animations | Framer Motion v11 + GSAP 3 + CSS keyframes |
| 3D / WebGL | Three.js r166 (hero particle canvas) |
| Typography | Syne (display) + DM Sans (body) + JetBrains Mono |
| Icons | Lucide React |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open browser
open http://localhost:3000
```

---

## Project Structure

```
hermesworkspace/
├── app/
│   ├── globals.css          # Tailwind + all CSS variables & animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Page assembly
├── components/
│   ├── ui/
│   │   ├── button.tsx       # shadcn Button (CVA variants)
│   │   └── badge.tsx        # shadcn Badge
│   ├── sections/
│   │   ├── HeroCanvas.tsx   # Three.js particle + ring canvas
│   │   ├── Hero.tsx         # Hero with GSAP parallax + dashboard mockup
│   │   ├── Stats.tsx        # Animated counter stats
│   │   ├── Features.tsx     # Bento grid feature cards
│   │   ├── WorkflowBento.tsx # How it works with GSAP SVG line
│   │   ├── Pricing.tsx      # Pricing cards with toggle
│   │   ├── FAQ.tsx          # Accordion FAQ
│   │   └── CTA.tsx          # Dark CTA with glow
│   └── shared/
│       ├── Navbar.tsx       # Sticky nav with mobile drawer
│       └── Footer.tsx       # Footer with social links
├── lib/
│   └── utils.ts             # cn() helper
├── public/
│   └── logo.png             # HermesWorkspace logo
├── tailwind.config.ts       # Extended Tailwind config with brand tokens
├── tsconfig.json
└── package.json
```

---

## Sections

1. **Navbar** — sticky, blur-on-scroll, mobile drawer with Framer Motion
2. **Hero** — Three.js WebGL particles + GSAP parallax + floating cards + dashboard mockup
3. **Stats** — animated number counters on scroll
4. **Features** — responsive bento grid, framer stagger animations
5. **Workflow** — 4-step process with GSAP SVG line animation
6. **Pricing** — 3-tier cards with monthly/annual toggle
7. **FAQ** — accordion with AnimatePresence
8. **CTA** — dark glowing call-to-action
9. **Footer** — brand, links, social icons

---

## Customisation

- Colors: edit `--brand`, `--brand-dark`, `--brand-purple` in `globals.css`
- Typography: swap Syne/DM Sans in `globals.css` Google Fonts import
- Content: update copy directly in each section component
- Logo: replace `public/logo.png`

---

## Deploy

```bash
# Vercel (recommended)
npx vercel --prod

# Or build static export
npm run build
```

---

Built with ♥ by HermesWorkspace · Ranchi, Jharkhand, India
