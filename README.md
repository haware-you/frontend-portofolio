# OBLIQUE — Editorial Web Design

A concept landing page for **OBLIQUE**, a fictional independent design studio. The studio, its projects and its numbers are invented; this is a design and front-end craft piece, not a real client.

Designed and built by **Abdullah Shidqi Hawari**.

## What's inside

- **Editorial type system:** Anton, Six Caps and Playfair Display on a vermilion / cream / ink palette
- **Preloader and intro:** counter, curtain reveal, character-by-character title animation
- **Smooth scrolling:** GSAP ScrollSmoother with parallax
- **Pinned horizontal "Works" section:** scroll-driven, with per-panel parallax and title reveals
- **WebGL image distortion:** Three.js shader with hover ripple, scroll-velocity bend and chromatic shift
- **Details:** custom cursor, film grain, chapter counter rail, full-screen menu
- **Responsive and accessible:** top-bar layout on mobile; respects `prefers-reduced-motion`; WebGL falls back to plain images

## Stack

Plain HTML, CSS and JavaScript, with no build step.

- [GSAP 3.13](https://gsap.com/) (ScrollTrigger, ScrollSmoother, SplitText)
- [Three.js r147](https://threejs.org/)

## Run locally

Any static server works:

```bash
npx serve .
```

## Credits

Photography from [Unsplash](https://unsplash.com/), used under the Unsplash License.
