# Design

<!-- impeccable:design-schema 1 -->

## Direction

**Departures — global trade board.** Alpha Strategy Group's core proof point is reach across four markets (US, Spain, Brazil, Latin America) from one Miami hub. The system dramatizes that directly: a quiet hub-and-spoke route map animates behind every page header, and the homepage/about stats flip in like an airport split-flap board. Everything else — type, color, structure — stays restrained and premium; the motif is a signature moment, not a costume.

Replaces the previous dark-navy/multi-color-gradient "generic SaaS" look. Product content, copy, routes, EmailJS integration, and approved stats (4+ markets, 100+ clients, 5 pillars) were preserved exactly; only the visual world and page structure changed.

## Palette — Committed strategy

One accent carries ~15–20% of the surface; everything else is ink/charcoal neutrals tinted from the same hue family.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#12161C` | Base page background |
| `--bg-elevated` | `#161B22` | Alternating section background |
| `--surface` | `#1B2029` | Cards, panels, inputs |
| `--surface-hover` | `#222836` | Hover state on surfaces |
| `--line` | `#2A3140` | Hairline borders/dividers |
| `--line-soft` | `rgba(245,241,232,0.07)` | Faint dividers on mobile menus |
| `--ink` | `#F5F1E8` | Primary text (warm off-white, not pure white) |
| `--ink-dim` | `#A7AEBD` | Secondary text — 8.15:1 on `--bg` |
| `--ink-faint` | `#868FA3` | Tertiary/meta text — 5.59:1 on `--bg` |
| `--accent` | `#E8A33D` | Amber — CTAs, flip-stat numerals, route hub, active states |
| `--accent-ink` | `#1C1304` | Text on `--accent` — 8.51:1 |
| `--accent-dim` / `--accent-line` | amber at 14%/30% alpha | Accent-tinted fills/borders |
| `--whatsapp` | `#25D366` | WhatsApp channel only (functional brand color, not decorative) |

Dark ground chosen for the use scene: a B2B decision-maker evaluating a consulting firm at a desk, often at night or in a dim office — the hub/route motif reads as a dashboard/ops-room register, consistent with "international consulting firm."

## Type

- **Display** — Space Grotesk (600–700), `-0.02em` tracking. Headlines, section titles, stat numerals.
- **Body** — Plus Jakarta Sans (400–700). All running copy.
- **Mono** (`.tabular` utility) — Space Mono, `font-variant-numeric: tabular-nums`. Reserved strictly for data: stat figures, service codes (`01 / STR`), language-switcher codes, footer "MIA · USA" — never used as a generic "technical" costume.

Both self-hosted via `next/font/google` (no runtime Google Fonts stylesheet fetch).

## Signature components

- **`AnimatedHeroBg`** (`components/AnimatedHeroBg.tsx`) — canvas hub-and-spoke route map (Miami hub + Madrid/São Paulo/Bogotá spokes), quiet curved lines, a single traveling flight-dot cycling routes. Respects `prefers-reduced-motion`. Reused as the one consistent header treatment across all four pages — not scattered per-section.
- **`FlipStat`** (`components/FlipStat.tsx`) — split-flap numeral reveal (2 scrambled steps → settle) for every stat on the homepage and about page, replacing the old plain count-up.
- **Services manifest** — services are presented as a departures-board row list (sequence code + icon + title/desc/tags + action), not a grid of identical icon cards. Used on both the homepage teaser and the dedicated `/services` page for a consistent system.

## Motion

- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` (`--ease-out`) for all enter/reveal motion — no default `ease-in-out`.
- Durations: UI feedback 150–220ms; section reveals ~500–600ms; nothing UI-adjacent exceeds 300ms.
- Press feedback: `whileTap={{ scale: 0.97 }}` on every interactive control.
- Scroll reveals: single fade/slide + opacity per section (no scale(0), no blur-stacking), triggered once via `useInView`.
- Hero headline keeps its one authored per-word kinetic entrance; no other section repeats it.

## Structure rules enforced

- No gradient text anywhere (emphasis via weight/color only).
- No generic same-size icon+heading+text card grids as page structure (services route lists instead).
- No eyebrow/kicker labels above headings.
- Card radii 12–16px; pills (100px) reserved for buttons/badges/small controls.
- Shadows carry offset + blur, never flat/zero-offset.
- Custom scrollbar, selection, and focus-ring themed from the palette (`app/globals.css`).

## Known gaps / follow-ups

- No brand mark exists beyond the typographic "A" monogram used in the nav/footer — a real logo was out of scope for this pass (confirmed with the user: no additional evidence/assets to add).
- EmailJS credentials remain hardcoded client-side in `contact/page.tsx`, unchanged from the prior implementation — flagged, not addressed, since it was out of scope for a visual redesign.
