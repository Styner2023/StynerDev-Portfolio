# D’Hardest Beatz — Music producer & Musician

Official one-page site for **D’Hardest Beatz**, music producer and sound engineer
from Bo City, Sierra Leone, now based in the USA — founder of **Just Entertainment
Business** and creator of the **Afrosoco** sound.

## Structure

    index.html          the entire site (single page)
    assets/css/         main.css + vendor stylesheets
    assets/js/          jQuery, GSAP, Swiper, Magnific Popup, site scripts
    assets/images/      logo, icons, and web-sized photography
    assets/sass/        SCSS sources for main.css

Sections, all reachable from the nav by anchor:

| Anchor      | Section                                          |
| ----------- | ------------------------------------------------ |
| `#home`     | Hero + image slider                              |
| `#about`    | Biography                                        |
| `#services` | Studio services                                  |
| `#work`     | Releases — 9 singles with streaming links        |
| `#team`     | Just Entertainment Business — artists            |
| `#contact`  | Footer, contact details, social links            |

## Running locally

No build step — it is static HTML.

    python3 -m http.server 8000

Then open <http://127.0.0.1:8000>.

To rebuild `assets/css/main.css` from the SCSS sources:

    sass assets/sass/main.scss assets/css/main.css

## Notes

- Photography in the repo is already cropped to the exact frame each slot uses.
  The full-resolution originals are kept outside the repo (see `.gitignore`).
- The video section embeds YouTube through `youtube-nocookie.com`, so no
  tracking cookies are set unless a visitor presses play.
- There is no analytics, no tag manager and no third-party CDN — every asset is
  served from this origin.
- The six client testimonials are **placeholder text**. See the warning comment
  above that section in `index.html`; replace them with real, permitted quotes
  before treating the site as final.

## Copyright

Copyright © 2026 Just Entertainment Business by D’HARDEST BEATZ.
All rights reserved.

This website and its contents are the property of Just Entertainment Business by
D’HARDEST BEATZ. Unauthorized copying, distribution, or use is strictly
prohibited.

Website developed by **StynerDev** — <https://www.stynerdev.com/>
