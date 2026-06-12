# HermesWorkspace Landing — React Doctor Session Summary

## Goal
Fix all 178 diagnostic warnings found by `npx react-doctor@latest --verbose` in the hermesworkspace-landing Next.js project.

## Current Status
**147 total issues** (down from 178) | **Score: 53/100** (was 51)

| Category | Before | After |
|----------|--------|-------|
| Security | 4 | 4 |
| Bugs | 38 | 30 |
| Performance | 18 | 14 |
| Accessibility | 24 | 16 |
| Maintainability | 94 | 83 |

## Completed Fixes

### Bugs
- **Missing effect dependencies** ×3: `homehero.tsx:707` (HERO_WORDS), `Mobile.tsx:186` (startTime), `contact.tsx:55` (ready→isMobile)
- **Array index used as key** ×8+: Fixed in `DashboardMock` (navItems), `LeadershipTeam`, `LegalDocPage`, `ProblemSolution`, `DesignedForClarity`, `Mobileproductpage`, `producthero`, `Inquiry`, `Home_sections/Mobile`
- **State initialized from mount effect** ×1: Removed `ready` state from `contact.tsx` (merged with `isMobile` via `useSyncExternalStore`)
- **Derived state** ×1: Removed `useEffect` + `active` state from `CategoryBar.tsx`

### Accessibility
- **Control missing label** ×5: Added `aria-label` to all form inputs/selects/textarea in `Inquiry.tsx` and `Mobilecontactpage.tsx`
- **Media missing captions** ×2: Added `aria-label` to `<video>` in `Mobileproductpage.tsx:260` and `InMotion.tsx:84`
- **Interaction on static element** ×5+: Added `onKeyUp`, `role="button"`, `tabIndex={0}` to FAQ click-handler divs across 6 files
- **Click handler missing keyboard handler** ×5+: Same FAQ files
- **Role used instead of HTML tag** ×0 (not yet addressed)

### Maintainability
- **Non-React pattern in component file** ×1: Removed `<a>` → replaced with `<Link>` in `Mobilepage.tsx` and `Mobile.tsx`
- **Missing button type** ×2: Added `type="button"` to `LegalHeader.tsx` buttons
- **Overlay missing keyboard** ×1: Added `onKeyUp` + `role="presentation"` in `LegalHeader.tsx`

### Performance
- **Chained effects** ×1: Merged `ready` + `isMobile` effects into single `useEffect` in `contact.tsx`

## Remaining High-Priority Issues to Fix

### Bugs (30 remaining)
- Array index as key ×7: `FeatureMocks.tsx:1332`, `homehero.tsx:493,524`, `LeadershipTeam.tsx:227`, `LegalDocPage.tsx:16,23,133`
- Missing effect dependencies ×3: `ArchiveClient.tsx:285`, `FeatureMocks.tsx:20`, `use-founder-slider.ts:60`
- State initialized from mount effect ×4: All in `useVisible` hooks
- Event logic handled in effect ×3: `Stats.tsx:36`, `Reliability.tsx:37`, `Mobileproductpage.tsx:106`
- preventDefault on form/link ×3: `AuthorHoverCard.tsx:164,172`, `LegalDocPage.tsx:92`

### Performance (14 remaining)
- State only used in handlers ×6
- Static value rebuilt every render ×9
- Large inline style objects ×7
- Transition duration too long ×3

### Accessibility (16 remaining)
- Role used instead of HTML tag ×7 (FAQ divs → `<button>`)
- Text too small ×4 (LoadingScreen, form labels)

### Maintainability (83 remaining)
- Pure function rebuilt every render ×9
- Large component ×5
- Unused files ×16, exports ×13, dependencies ×18

## Constraints
- Never silence/suppress rules — always fix root cause.
- Verify each fix against `react.doctor/docs/rules/react-doctor/<rule-name>`.
- Run `npx react-doctor@latest --verbose` after each batch to confirm.
- Unused file/export/dependency removals require user approval.

## Relevant Files
- `components/contactpage/contact.tsx` — merged ready/isMobile effects, removed useState
- `components/contactpage/Inquiry.tsx` — aria-labels added to 6 form controls
- `components/contactpage/Mobilecontactpage.tsx` — aria-labels added to 6 form controls
- `components/product/Mobileproductpage.tsx` — aria-label on video, stable keys
- `components/product/InMotion.tsx` — aria-label on video
- `components/Home_sections/homehero.tsx` — key fix, dep fix, DashboardMock
- `components/Home_sections/FAQ.tsx`, `components/about/FAQ.tsx`, `components/founders/FAQ.tsx`, `components/contactpage/FAQ.tsx` — keyboard handlers on FAQ
- `components/about/Mobileabout.tsx`, `components/contactpage/Mobilecontactpage.tsx` — keyboard handlers on FAQ
- `components/legal/LegalHeader.tsx` — type="button", overlay keyboard handler
- `components/legal/LegalDocPage.tsx` — stable keys
- `components/blogs/CategoryBar.tsx` — eliminated derived state
- `components/blogs/ArchiveClient.tsx:285` — missing dep (remaining)
- `components/Home_sections/FeatureMocks.tsx` — missing dep + array key + static values (remaining)
- `components/founders/use-founder-slider.ts:60` — missing dep (remaining)
