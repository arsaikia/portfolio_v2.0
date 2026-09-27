# Timeline / Experience Section — Design Reference

Reference material for the Experience section redesign. The interactive
comparison of every option explored lives in [`mockups.html`](./mockups.html)
— open it directly in a browser (no build step, no server required).

---

## 1. The problem we were solving

The original `src/components/Timeline.tsx` rendered all four experience
entries inside a fixed-height scroll container:

```tsx
<div className="h-[380px] md:h-[480px] overflow-y-auto scrollbar-none">
```

That produced four distinct problems:

| # | Problem | Impact |
|---|---------|--------|
| 1 | Only ~1 of 4 entries visible at a time | 75% of the strongest content was effectively invisible |
| 2 | Scrollbar hidden via `scrollbar-none` | No affordance signalling that more content exists |
| 3 | Nested scroll region | Scroll got trapped; the page did not continue after the inner scroll was exhausted |
| 4 | Fixed pixel heights | Content overflowed unpredictably at different zoom / font sizes |

Nested scroll containers on a marketing page are now widely treated as an
anti-pattern — they fight the user's primary scroll gesture and hide content
from both humans and crawlers.

---

## 2. Options explored

Three directions were prototyped end-to-end in `mockups.html`.

### Variant A — Sticky company rail ✅ **chosen**

A two-column layout. The left column is `position: sticky` and cross-fades
between companies as you scroll; the right column holds all four cards in
normal page flow.

- **Why it won:** keeps the "one company at a time" focus of the original
  design while putting every card in the document flow. The oversized year
  and company identity stay pinned in peripheral vision, which gives the
  section a strong visual anchor without stealing the scroll.
- **Trade-off:** needs a real desktop viewport to shine; collapses to a plain
  stacked list on mobile.

### Variant B — Center spine with metric count-ups

A classic vertical spine with a gradient progress fill that tracks scroll
position, and achievement metrics that count up when they enter the viewport.

- **Why not:** the spine is visually familiar to the point of being generic,
  and a full-width zig-zag wastes horizontal space on desktop.
- **What we kept:** the animated progress fill and the rAF metric count-ups
  were both ported into Variant A.

### Variant C — Master–detail

A compact list of companies on the left; clicking one cross-fades a full
detail panel on the right.

- **Why not:** it hides content behind an interaction. Recruiters skim; an
  extra click per role costs more than it saves. It also reintroduces the
  original "content you can't see" problem in a new shape.

### Also considered (not prototyped)

| Option | Reason rejected |
|--------|-----------------|
| Horizontal filmstrip | Horizontal scroll is awkward on desktop and hurts a11y |
| Stacked card deck | Physical-stack metaphor hides content and is hard to make accessible |
| Accordion rows | Everything collapsed by default reads as an empty section |
| Zig-zag center rail | Poor line lengths, and mobile flattens it to a plain list anyway |

---

## 3. What shipped

### Structure

```
┌──────────────────┬────────────────────────────────┐
│  sticky top-28   │  <ol> all four cards in flow   │
│                  │                                │
│  ▸ logo          │  ┌──────────────────────────┐  │
│  ▸ 2021 (big)    │  │ Senior FSE @Adobe        │  │
│  ▸ company/role  │  │ description              │  │
│  ▸ period/loc    │  │ Key Impact (count-ups)   │  │
│                  │  │ ▸ What I did (disclosure)│  │
│  ▸ progress rail │  │ Technologies             │  │
│    ● 2021        │  └──────────────────────────┘  │
│    ○ 2020        │  ┌──────────────────────────┐  │
│    ○ 2017        │  │ ...                      │  │
│    ○ 2016        │  └──────────────────────────┘  │
└──────────────────┴────────────────────────────────┘
```

Mobile (`< 768px`) drops the rail entirely and gives each card its own
header (logo + year + company).

### Motion spec

Animations were an explicit requirement ("keep animations and transitions
smooth"), so the component follows a deliberate motion budget:

| Concern | Decision |
|---------|----------|
| Animatable properties | `transform` and `opacity` only — never `height`, `top`, or `width` |
| Entrance easing | `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) — fast start, long soft settle |
| State-change easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Card reveal | `IntersectionObserver` at `threshold: 0.15`, staggered with per-index `transition-delay` (90ms steps, capped at index 3) |
| Rail cross-fade | All company panels are absolutely stacked and cross-fade over 520ms, so there is never an empty frame between transitions |
| Active detection | `IntersectionObserver` with `rootMargin: '-45% 0px -45% 0px'` — a thin band through the viewport middle |
| Progress fill | `requestAnimationFrame`-throttled passive scroll listener driving `scaleY()`, interpolated rather than stepped |
| Metric count-ups | `requestAnimationFrame` with cubic ease-out over 900ms, run once per metric |
| Disclosure | `grid-template-rows: 0fr → 1fr` — animates without measuring height in JS |
| `will-change` | Applied only while an element is still animating, then released |
| Reduced motion | `prefers-reduced-motion: reduce` short-circuits every transition, sets final values immediately, and disables the pulsing "Current" badge |

### Accessibility

- Cards are a semantic `<ol>` / `<li>`; each card is an `<article>` labelled
  by its own `<h3>`.
- Periods use `<time>`.
- The disclosure button wires up `aria-expanded` + `aria-controls`.
- Rail dots are real `<button>`s with `aria-current` and an sr-only
  "Jump to {company}" label.
- Decorative logos use `alt=""` + `aria-hidden`; decorative icons are
  `aria-hidden`.
- Removed the stale `tabIndex={0}` scroll region and the sr-only instruction
  paragraph in `About.tsx` — both described behaviour that no longer exists.
- Visible focus rings on every interactive element.

### Bug fixed along the way

`getAccentColor()` built Tailwind class names at runtime:

```tsx
// before — Tailwind cannot statically extract these, so they never existed
const colors = { red: `text-red-${opacity} dark:text-red-400` }
```

Tailwind's scanner only matches complete, literal class strings in source, so
`text-red-500` was never generated and the accent colour silently fell back to
inherited text colour. Replaced with a static `accentStyles` lookup containing
fully-spelled class names.

---

## 4. Files

| File | Role |
|------|------|
| `src/components/Timeline.tsx` | The component |
| `src/components/About.tsx` | Parent wrapper / section shell |
| `src/data/experience.ts` | Content source — keep serialisable |
| `docs/design/timeline-redesign/mockups.html` | Interactive comparison of all three variants |

### Conventions to preserve

- `experience.ts` stores **icon name strings**, not component references. The
  component resolves them through `iconMap`. This keeps the data file free of
  React imports and safe to serialise.
- Logos resolve through `logoMap` keyed on company name, not an inline
  ternary chain.
- Accent colours resolve through `accentStyles` with complete class strings.
  Never interpolate Tailwind class names.

---

## 5. If you revisit this

- `responsibilities[]` is now surfaced via the disclosure. If an entry grows
  past ~6 bullets, consider truncating rather than making the card taller.
- The rail panel uses a fixed `h-[268px]` to prevent layout shift during the
  cross-fade. If you add a field to the rail, bump that height.
- Adding a 5th experience entry works without code changes, but the stagger
  delay caps at index 3 by design — later cards reveal immediately so the
  section never feels sluggish.
