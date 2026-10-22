# Hawaree design guide

The rules this portfolio follows. Read this before you change the look, the copy or the layout, and update it when a rule changes.

The site sells one thing: Abdullah Shidqi Hawari (Hawaree) designs and hand-codes websites for small businesses. Every section should help a shop owner or school decide to send a WhatsApp message.

## Palette

All colours live in the `:root` block of `styles.css`. Don't add colours anywhere else.

| Token | Hex | Used for |
|---|---|---|
| `--red` | `#e6380f` | Accent and big type only: preloader, hero title, LET'S TALK, FAQ giant word, cursor, focus outlines. Cream on this red is 3.7:1, so never put small text on it. |
| `--red-deep` | `#c52e0a` | Any red surface or red text that holds small text: Process section, red Works panels, menu overlay, WhatsApp buttons, Process hover text. Cream on it is 4.8:1 (passes WCAG AA). |
| `--cream` | `#f3eee6` | Light background (hero, contact), text on dark or red |
| `--cream-dim` | `#e9e2d6` | The WhatsApp message preview bubble in Contact |
| `--ink` | `#0d0c0b` | Dark background (stats, works, FAQ), body text on light |
| (literal) | `#faf7f1` | About background, a step lighter than cream |

Decisions already made:
- **Navy was tried and rejected.** It replaced `--ink` and made very little difference. The palette stays vermilion, cream and ink.
- **Screenshot filters are off.** Warm, mono and duotone filters on the project screenshots were tried. Clients need to see their own colours, and the duotone disappeared into the red panel.

## Type

| Token | Font | Role |
|---|---|---|
| `--font-display` | Anton | Headings, panel titles, buttons, small uppercase labels. FAQ questions use it in sentence case for easier scanning. |
| `--font-mega` | Six Caps | Giant words (PROCESS, FAQ), stats rows, step numbers |
| `--font-serif` | Playfair Display (400/500, roman and italic) | Body text, intros, captions, italics |

- Headings are uppercase. Body text is sentence case.
- Uppercase labels get letter-spacing (0.12em to 0.28em).
- Keep running text near 55 to 65 characters per line (`max-width: 34em` to `60ch`).
- Sizes use `clamp()` or `vw`, so type scales with the screen. Follow the existing clamps rather than adding new fixed sizes.

## Page order

| # | Section | Background | Notes |
|---|---|---|---|
| 01 | Hero | cream | Giant red HAWAREE, short intro |
| 02 | About | `#faf7f1` | Two columns: the customer's moment as the heading, who Hawaree is and what he does on the right. No photo. |
| 02 | Stats | ink | Three Six Caps rows; the middle one is outlined |
| 03 | Works | ink + per-panel colour | Horizontal pinned scroll, one panel per project |
| 04 | Process | red-deep | Four steps: Talk, Design, Build, Launch. Called Process, not Services, because it describes how a project runs. |
| 05 | FAQ | ink | Two columns: "Ask on WhatsApp" prompt left, native `<details>` accordion right |
| 06 | Contact | cream | Filled WhatsApp button, a preview of the pre-filled message, Instagram link, footer |

Neighbouring sections use different backgrounds, so each one reads as a new chapter. If you add a section, update the menu, the `data-chapter` numbers and the `/06` in the side rail.

## Works panels

- The last panel is an invitation, not a project: "Next: your site" with a WhatsApp button. No stock images.
- Panel colours cycle **red, cream, ink, red**. Two panels next to each other never share a colour.
- Each live project gets a browser frame with a **full-page screenshot**. It pans top to bottom on hover or keyboard focus, and on phones when the panel reaches the middle of the screen.
- **Frame width:** up to 1.3x the original, `max(min(50vw, 820px), min(65vw, (100vh - 380px) * 1.6, 1066px))`.
- **Frame height:** `fitSiteFrames()` in `script.js` stretches the frame down to **10px above the top of the title letters**. Keep that gap if you change the title size.
- **Screenshots:** capture at 1440px wide, resize to 1200px wide, aim for about 300 KB, and save as `img/works/<name>-full.jpg`.
- **Panel text:** title, a one-line caption (*what the business is, where.* what the site does), "Design + code · year", then "Visit site ↗".

## Copy voice

- **Lead with the client's problem, not with Hawaree.** Customers need to find the menu, prices and WhatsApp number on a phone. Say how the site solves that.
- **Write plainly.** Short sentences and active voice. Avoid filler like "worth noting".
- **English on the site. Indonesian in the WhatsApp message template,** because that's what clients type in.
- **Never invent proof.** No made-up client logos, "trusted by" grids, review stars, testimonials, or numbers like "1,000 companies".
- **No prices, durations or revision counts** unless Hawaree has confirmed them. The FAQ answers say "it depends" and promise a price before work starts.
- **Spine sentence:** a customer opens a phone, looks for one thing, and either messages you or leaves. Every section should serve that moment; if it doesn't, cut it or rewrite it.
- **Only claim services that are offered.** Don't claim "brand identity" work unless Hawaree actually does it. Facts on the page so far: clients in Jakarta and Depok, design and code by Hawaree.

## WhatsApp CTA

There are four WhatsApp links, all with the same URL. If you change the message, update all four:
1. the floating "Chat on WhatsApp" button (bottom right on every section; hidden while Contact is on screen)
2. the button on the last Works panel ("Next: your site")
3. "Ask on WhatsApp" in the FAQ
4. the main button in Contact, whose message preview next to it must match the text below

Each one opens `wa.me/6285314851480` with this message pre-filled:

```
Halo Hawaree, saya mau ngobrol soal website.

Nama usaha:
Jenis usaha:
Website untuk apa? (menu & order / profil usaha / sekolah / lainnya):
Sudah punya logo & foto? (sudah / belum):
Target selesai:
Kisaran budget (opsional):
```

If you change the questions, URL-encode the text again. Keep the line under the button that tells visitors what will open.

## Motion

- GSAP with ScrollTrigger, ScrollSmoother and SplitText; Three.js for the image distortion.
- Headings reveal letter by letter. Paragraphs and the About heading reveal line by line.
- Live-site screenshots keep only a hint of the distortion (`uDistort` 0.2), so they stay readable.
- Respect `prefers-reduced-motion`. Without WebGL, plain images are shown.

## Layout rules and known traps

These all broke at least once. Check them after any layout change.

1. **Split headings into words as well as letters** (`type: 'words,chars'`). With letters alone, Safari drew spaces one letter off ("3SITE SLIVE", "TOK OMATCHA").
2. **Grid columns use `minmax(0, …)`**, never a bare `1fr`. Otherwise a giant unbreakable word can stretch a column. Line-split text then freezes at that narrow width, and the About paragraph ended up one word per line in Safari.
3. **Line-split text freezes its line breaks** when it's split, after fonts load. Anything that changes a column's width after that leaves the lines wrong until reload.
4. **Anything that changes page height must call `ScrollTrigger.refresh()`.** Opening an FAQ answer does this; without it, the smooth scroll can't reach the footer.
5. **The WebGL canvas follows its frame with a `ResizeObserver`.** Keep that if frames are resized in code.
6. **On touch screens, wrap hover colours in `@media (hover: hover)`**, so a tapped item doesn't stay highlighted.

## Before you push a visual change

- Check 390, 860, 1366x768, 1440x900 and 1920x1080.
- No sideways scroll at any width.
- Look at the result in **Safari** as well as Chrome. Most of the bugs above showed up only in Safari.
- Open one FAQ answer and scroll to the footer.
- Tap "Chat on WhatsApp" on a real phone after deploying.
