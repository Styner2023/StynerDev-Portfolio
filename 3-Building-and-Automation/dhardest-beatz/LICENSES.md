# Third-Party Licences & Costs

Every third-party component in this codebase, its licence, and its list price.
Prices in USD, verified August 2026.

Copyright (c) 2026 Just Entertainment Business by D'HARDEST BEATZ. All rights reserved.
Website developed by StynerDev — https://www.stynerdev.com/

---

## Summary

| | |
|---|---|
| **Retail value of the stack, year one** | **$412** |
| **Actual recurring cost** | **$213 / year** |

---

## What costs money

| Component | Licence | Cost |
|---|---|---|
| Envato Elements subscription (template source) | Subscription | $198/yr ($16.50/mo annual; $33/mo monthly) |
| Domain — dhardestbeatz.com | Annual registration | ~$15/yr |
| Vercel hosting | Hobby (free tier) | $0 — Pro is $20/mo if ever needed |

**Total recurring: $213/year.**

### Envato Elements — action required

Elements licences attach to a **registered project**, not to an account. The template must be
registered to this site in the Elements dashboard **while the subscription is active**. Once
registered, the licence is permanent and survives cancelling the subscription. Any stock
photography sourced from Elements needs the same registration.

Standalone alternative: the *Agenci* template sells on ThemeForest for **$12 one-time**
(regular licence) — cheaper than the subscription if Elements isn't used for other work.

---

## What it would have cost

| Component | Was | Now |
|---|---|---|
| GSAP Club — Business tier (required for paid client work) | $199/yr | **$0** |
| GSAP Club — Premium tier (same plugins, solo developer) | $149/yr | **$0** |
| GSAP Club — Plus tier (entry) | $99/yr | **$0** |

This site uses **ScrollSmoother** and **SplitText** — the smooth scrolling and the split-letter
headline reveals. Both were Club GreenSock paid-only plugins until **April 2025**, when Webflow
(which acquired GreenSock in October 2024) released the entire library free for commercial use.

**Resolved:** the bundled GSAP files were originally **version 3.11.4 (2022)** and carried the old
restrictive header — *"only authorized for use ... with an active Club GreenSock membership"* — which
predated the licence change and misrepresented this project's licensing. All five files were upgraded
to **3.13.0** from the public npm package and now carry the current GSAP standard (no-charge) licence.
No membership text remains anywhere in the codebase.

---

## Free forever

All MIT unless noted. MIT permits commercial use, modification, and distribution; the only
obligation is retaining the copyright headers — which is why those headers remain in the
vendor files and must not be stripped.

| Component | Version | Licence | Cost |
|---|---|---|---|
| GSAP (+ ScrollSmoother, ScrollTrigger, SplitText, ScrollToPlugin) | 3.13.0 | GSAP standard (free since Apr 2025) | $0 |
| Bootstrap | 5.3.3 | MIT | $0 |
| jQuery | 3.7.1 | MIT (OpenJS Foundation) | $0 |
| Swiper | 6.5.0 | MIT | $0 |
| three.js | 2023 | MIT | $0 |
| AOS | — | MIT | $0 |
| Magnific Popup | — | MIT | $0 |
| Odometer | 0.4.6 | MIT (HubSpot) | $0 |
| Waypoints | 4.0.0 | MIT (Caleb Troughton) | $0 |
| jQuery Knob | 1.2.10 | MIT (Anthony Terrien) | $0 |
| Phosphor Icons | 2.1.1 | MIT | $0 |

### Fonts

Both typefaces are by **Rajesh Rajput**, released free for personal and commercial use
(pay-what-you-want). Verified against the metadata embedded in the font files.

| Font | Files | Licence | Cost |
|---|---|---|---|
| Thunder | `Thunder-{Bold,SemiBold,Medium,}LC.ttf` | Free / PWYW | $0 |
| Mango Grotesque | `mango-grotesque.ttf` | Free / PWYW | $0 |

> Note: a different, unrelated **Thunder** by Pangram Pangram is a paid commercial typeface.
> This project does **not** use it. Don't substitute font files without re-checking the foundry.

---

## Not referenced by the site

Present in `assets/js/` but not loaded by `index.html` — safe to delete:
`chroma.min.js` (BSD), `counterup.min.js` (MIT).

---

## Privacy

No analytics, tag managers, tracking pixels, or third-party CDN requests. All assets are
served from this origin. The video embed uses `youtube-nocookie.com`. No page script sets
cookies. No template-vendor credits or outbound links remain in the codebase.

---

## Sources

- GSAP 3.13 release and free licence — https://gsap.com/blog/3-13/
- GSAP pricing — https://gsap.com/pricing/
- Envato Elements pricing — https://elements.envato.com/pricing
- ThemeForest regular licence terms — https://themeforest.net/licenses/terms/regular
- Thunder typeface — https://www.behance.net/gallery/124582465/THUNDER-Free-Typeface-Variable-36-Styles
