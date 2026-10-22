# HAWAREE | Web Design & Front-end Development

Portfolio of **Abdullah Shidqi Hawari** (Hawaree): websites designed and built by hand.

## What's inside

- **Editorial type system:** Anton, Six Caps and Playfair Display on a vermilion / cream / ink palette
- **Preloader and intro:** counter, curtain reveal, character-by-character title animation
- **Smooth scrolling:** GSAP ScrollSmoother with parallax
- **Pinned horizontal "Works" section:** live client sites in a browser frame. Hovering (or keyboard focus) pans a full-page screenshot from top to bottom; clicking opens the real site. On touch devices the preview plays when the panel reaches the middle of the screen.
- **WebGL image distortion:** Three.js shader with hover ripple, scroll-velocity bend and chromatic shift
- **Details:** custom cursor, film grain, chapter counter rail, full-screen menu
- **Responsive and accessible:** top-bar layout on mobile; keyboard focus scrolls the horizontal section to the focused project; respects `prefers-reduced-motion`; WebGL falls back to plain images

## Adding a project

1. Capture a full-page screenshot at 1440px wide and save it as `img/works/<name>-full.jpg` (aim for under ~300 KB).
2. Copy one of the live-site `<article class="panel">` blocks in `index.html`, then update the link, the title, the caption and the image path.

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

Photography for the about and in-progress sections from [Unsplash](https://unsplash.com/), used under the Unsplash License.
