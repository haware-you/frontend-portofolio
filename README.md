# HAWAREE | UI Designer & Front-end Developer

Portfolio of **Abdullah Shidqi Hawari** (Hawaree): websites designed and built by hand.

## What's inside

- **Editorial type system:** Anton, Six Caps and Playfair Display on a vermilion / cream / ink palette
- **Preloader and intro:** counter, curtain reveal, character-by-character title animation
- **Smooth scrolling:** GSAP ScrollSmoother with parallax
- **Pinned horizontal "Works" section:** live client sites in a browser frame. Hovering (or keyboard focus) pans a full-page screenshot from top to bottom; clicking opens the real site. On touch devices the preview plays when the panel reaches the middle of the screen.
- **WebGL image distortion:** Three.js shader with hover ripple, scroll-velocity bend and chromatic shift
- **Services as a process:** four steps (Talk, Design, Build, Launch), each with a short description
- **FAQ:** native `<details>` accordion, no extra JavaScript beyond a scroll refresh when an answer opens
- **WhatsApp CTA:** opens a chat pre-filled with a short question template (business name, type, what the site is for, logo and photos, deadline, budget)
- **Details:** custom cursor, film grain, chapter counter rail, full-screen menu
- **Responsive and accessible:** top-bar layout on mobile; keyboard focus scrolls the horizontal section to the focused project; respects `prefers-reduced-motion`; WebGL falls back to plain images

## Adding a project

1. Capture a full-page screenshot at 1440px wide and save it as `img/works/<name>-full.jpg`. This is the fallback for browsers without WebP.
2. Save a WebP copy next to it as `img/works/<name>-full.webp` (quality 75; for example `cwebp -q 75 in.jpg -o out.webp`, or Pillow with `quality=75, method=6`). This is the file most browsers load, and it is usually 30–50% smaller than the JPEG.
3. Copy one of the live-site `<article class="panel">` blocks in `index.html`, then update the link, the title, the caption and both image paths in the `<picture>` element.

## Link preview

`img/og.jpg` (1200×630) is the image shown when the link is shared in WhatsApp, social apps and chat apps. The `og:image` tag needs a full URL, so if the site moves to another domain, update `og:url`, `og:image`, `twitter:image` and `canonical` in `index.html`.

## Stack

Plain HTML, CSS and JavaScript, with no build step.

- [GSAP 3.13](https://gsap.com/) (ScrollTrigger, ScrollSmoother, SplitText)
- [Three.js r147](https://threejs.org/)

## Run locally

Any static server works:

```bash
npx serve .
```
