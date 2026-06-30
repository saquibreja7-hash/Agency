# Jamsaq Agency Website — Animations & Interactions Documentation

This document catalogs **all animations, transitions, parallax effects, and interactive motion** used across the site.

The animation system is a deliberate mix of libraries to achieve premium, performant, and on-brand motion while respecting the light, refined Slacc-inspired design language (soft surfaces, generous whitespace, aubergine accents).

## Core Animation Stack

| Library / Tool          | Role                                      | Usage Level      |
|-------------------------|-------------------------------------------|------------------|
| **Lenis**               | Global smooth scrolling                   | Site-wide        |
| **GSAP + ScrollTrigger**| Scroll-driven parallax, entrances, count-ups | Major sections   |
| **framer-motion**       | Component entrances, tab transitions, modals, hover effects | UI components    |
| **CSS Transitions**     | Micro hover states, button lifts, card interactions | All interactive elements |

---

## 1. Global Smooth Scrolling (Lenis)

**File:** `src/App.tsx`

**Implementation:**
- Lenis instance created in `useEffect` on mount.
- Config:
  - `duration: 1.2`
  - Custom easing (fast-out, slow-in)
  - `smoothWheel: true`, adjusted multipliers for wheel/touch.
- Synced with GSAP:
  ```ts
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  ```
- Custom `scrollTo(id)` helper that uses Lenis for internal navigation (nav, CTAs, "Scroll to explore").
- Lenis is paused when project modals are open (`lenisRef.current?.stop()`) and resumed on close.

**Effect:**
- Buttery, momentum-based scrolling that makes all parallax feel high-end and intentional.

---

## 2. Scroll-Based Parallax & Entrance Animations (GSAP + ScrollTrigger)

All parallax uses `scrub` values so movement is directly tied to scroll position.

### 2.1 Hero
- **Hero text parallax**: `.hero-text` moves down (`y: 38`) and fades slightly (`opacity: 0.94`) with `scrub: 0.65`.
- **Floating mockups** (the three device previews below the headline):
  - Different speeds for depth:
    - Website mock: `-45px`
    - Phone mock: `-85px` (strongest)
    - Platform mock: `-25px`
  - Scrub values vary slightly (0.9 → 1.4) for layered feel.
- **"Scroll to explore" button**: Continuous gentle bounce animation + rotating star icon (framer-motion).

### 2.2 Stats Section
- **Number count-up**: Triggered once when section enters view (`start: 'top 78%'`).
  - Values: 127, 68, 4.9 (handles decimals).
  - Duration: 1.65–1.8s, `ease: 'power2.out'`.
- **Card parallax**: The three stat cards move at different vertical speeds (`y: -10` or `-18`) with `scrub: 1.2`.

### 2.3 Work Section
- **Staggered entrance**: All `.work-card`s fade + slide up (`y: 52`, `opacity: 0`, `stagger: 0.09`).
- **Individual parallax**: Cards move at alternating speeds (`-22px` / `+18px`) with `scrub: 1.1`.

### 2.4 Engagements / Pricing Section
- **Staggered entrance** on the three pricing cards.
- **Parallax**: Cards drift upward (`y: -14`) with `scrub: 0.8` as you scroll.

### 2.5 Process Section
- **Staggered entrance** on the four process cards.
- **Parallax**: Subtle alternating vertical movement (`-16px` / `+8px`) with `scrub: 1`.

### 2.6 General Reveal Elements
- Any element with `data-reveal` attribute gets a one-time entrance:
  - `y: 28`, `opacity: 0`, `filter: blur(10px)`
  - Duration 0.75s, `ease: 'power3.out'`
  - Triggered at `start: 'top 82%'`

---

## 3. framer-motion Component Animations

### 3.1 Text Reveal System (`textReveal` variant)
Defined once and reused for hero content:
```ts
const textReveal = {
  hidden: ({ offset = 20, blur = 10 }) => ({ opacity: 0, y: offset, filter: `blur(${blur}px)` }),
  visible: ({ delay, duration = 0.7 }) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration, delay, ease: 'easeOut' } }),
};
```
Used on:
- Eyebrow, headline spans, description, CTA group in hero.
- Custom `offset`, `blur`, and `delay` per element for staggered, polished entry.

### 3.2 StoneReveal (Hero Background Elements)
Two instances (left + right stone illustrations).

**Features:**
- Entrance animation (opacity + horizontal slide).
- **Mouse-reactive radial mask** (spotlight effect):
  - Uses `useMotionValue`, `useSpring`, `useTransform`.
  - On mouse move: creates a `radial-gradient` mask that follows the cursor.
  - On hover: radius expands to 120px.
- Very subtle and premium.

### 3.3 Hero Bottom Preview (`AgencyDashboardPreview`)
- Enters with `y: 80 → 0`, `blur(8px) → 0`, `duration: 1`, `delay: 0.6`.

### 3.4 Service Tabs + Live Preview (WHAT WE MAKE section)
- Tab buttons use CSS transitions + state change.
- **Preview content** uses `AnimatePresence` + `motion.div`:
  ```ts
  initial={{ opacity: 0, y: 20, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -15, scale: 0.985 }}
  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
  ```
- This creates the smooth cross-fade + slight lift when switching between Websites / Mobile Apps / Web Platforms previews.

### 3.5 Project Modal
- `AnimatePresence` wrapper.
- Modal entrance: `opacity: 0 → 1`, `y: 20 → 0`, `scale: 0.985 → 1`, `duration: 0.18`.
- Exit: softer `y: 10`, `scale: 0.985`.

### 3.6 Scroll-to-Explore Button (Hero)
- Continuous vertical bounce (`y: [0, -4, 0]`, `duration: 2.5`, repeat infinite).
- Rotating star icon (`rotate: 360`, `duration: 4`, repeat infinite).

---

## 4. CSS Transitions & Micro-Interactions

Most interactive elements use consistent, fast transitions defined in `src/app/globals.css` and component classes.

### Common Patterns
- **Cards** (`.card-feature-cream`, `.card-pricing`, `.work-card`, etc.):
  - `transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s ease;`
  - On hover: `translateY(-3px to -8px)` + enhanced shadow.

- **Buttons**:
  - Primary: background shift on hover.
  - Secondary / outline: border and color shifts.

- **`.motion-card`** (used in some service contexts):
  - Custom shine effect via `::before` pseudo-element.
  - `transition: opacity 0.25s ease;`
  - Hover lifts the card and reveals a radial white gradient from top.

- **Links**:
  - `transition: color 0.15s ease;`
  - Subtle color change on hover.

- **Preview container** (the big white card holding the service mockups):
  - `transition-all duration-500` on the wrapper.

- **Form inputs**:
  - Focus: border color + subtle box-shadow transition.

- **Mobile menu & nav**:
  - Slide/fade transitions via framer + CSS.

---

## 5. Other Notable Motion

- **Tab switching** (service selectors): The active state changes instantly, but the content preview uses the framer exit/enter above.
- **Modal close behavior**: Small delay when clicking "Start a conversation" from inside a project modal to allow exit animation.
- **No Three.js / heavy WebGL** in the current main site (was experimented with and removed).

---

## Performance & Accessibility Notes

- **Lenis + GSAP ticker sync** ensures buttery performance even with many ScrollTriggers.
- Most scroll animations are `scrub`-based (tied to scroll position) rather than timed, which feels more natural and performant.
- `once: true` used for one-shot entrances (stats count-up).
- `prefers-reduced-motion` is respected indirectly via GSAP (can be extended).
- Animations are mostly decorative and do not block content or interactions.

---

## Files Containing Animation Logic

- `src/App.tsx` — Primary source (Lenis setup, GSAP ScrollTriggers, all framer-motion usage)
- `src/app/globals.css` — CSS transitions, hover states, card lift effects
- `src/app/layout.tsx` — No animation logic

If you need the exact code snippets for any specific animation or want to adjust timing/easing, let me know!