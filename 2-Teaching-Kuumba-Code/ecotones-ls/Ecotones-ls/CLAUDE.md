# Ecotones LS — Project Rules for Claude

## Core Principle

> **Don't invent. Borrow.**

This site already has a complete, beautiful design system. Your job is **not** to add new visual ideas to it. Your job is to **find the right existing pattern** and reuse it.

Every time the AI invents — new `<style>` blocks, custom font sizes, custom colors, orphan grids — it produces output that looks bolted on, "loose," or inconsistent. Every time the AI borrows an existing section's exact skeleton and just swaps the photos and copy, the result feels native.

---

## Before Adding ANY New Section — 5-Step Checklist

When asked to add a new section to any page, follow these steps **in order**:

1. **Find the right existing pattern.** Open the page (or another page on the site) and locate a section whose layout matches the *shape* of what you need. Examples:
   - Project showcase with image + narrative + feature cards → mirror `.modern-one`
   - Project showcase with video / play button → mirror `.fluid-one`
   - Project showcase with stat callout → mirror `.discount-one`
   - Service grid (4 cards in 2×2) → mirror `.services-block_five` inside `.services-six`
   - Photo gallery → mirror `.gallery-block_one`
   - Section header (eyebrow + h2) → use `.sec-title centered`

2. **Copy the pattern's skeleton verbatim.** Open the source HTML and copy the entire structure: section wrapper class, decorative `<div>`s, image classes, content classes, button classes — everything. Don't simplify. Don't restructure.

3. **Respect the original column order.** Many patterns have CSS quirks like negative margins, absolute positioning, or background bleed effects that only work in their original column arrangement. If the original has `content LEFT / image RIGHT`, keep it that way — don't flip the columns. (See "Common Failure Modes" below.)

4. **Swap only the content.** Replace photos, headings, and body copy with the new content. Keep all classes, all decorative elements, all wrapper divs. The brand voice should match what's already on the site (see "Brand Voice" below).

5. **Use only existing assets** — `assets/images/portfolio/[folder]/` for project photos, `assets/images/icons/` for decorative icons, `assets/images/background/` for patterns. If the source pattern uses a specific decorative leaf/icon (`leaf-decor-2.png`, `icon-37.png`, `deco-monstera.png`, etc.), use the same asset.

---

## Hard Rules (Never Break These)

- ❌ **No new `<style>` blocks** in HTML files for layout/typography/color
- ❌ **No inline `style="font-size:..."` or `style="color:..."` overrides** that fight the existing typography system
- ❌ **No new CSS classes** added to `style.css`, `responsive.css`, or `global.css` for layout — only utility/responsive trims (e.g., mobile padding adjustments) belong in `responsive.css` at the bottom of the file with a comment explaining why
- ❌ **Don't remove existing decorative icons** that came with a borrowed pattern — they're part of why it looks good
- ❌ **Don't create gallery grids with `.gallery-block_one`** as a substitute for editorial layout — use it only for genuine photo galleries (e.g., on `gallery.html`)

✅ **Allowed inline styles:** small spacing tweaks (`margin-top`, `padding-left`), explicit dimensions on `<img>` via HTML `width`/`height` attributes, and decorative `style="background-image: url(...)"` for elements that already use that pattern (matches existing usage throughout the site).

### Section independence rule (added after Canticle Pond / Parkridge incident)

When two or more sections on the same or different pages share a base pattern class (e.g., both use `.fluid-one`, `.discount-one`, `.about-one`, or any reused asset), **EVERY** new section gets a **unique class hook** so per-section modifications never bleed into siblings.

**Required pattern:**
```html
<section class="<base-pattern> <unique-section-name>"> ... </section>
```

**Example:**
```html
<section class="fluid-one canticle-pond-section"> ... </section>
<section class="discount-one parkridge-section"> ... </section>
```

**Then in CSS, ALL section-specific tweaks MUST be scoped to the unique class:**
```css
/* ✅ Correct — only Parkridge */
.parkridge-section .row.clearfix { margin-top: -80px; }

/* ❌ Wrong — affects every .discount-one site-wide */
.discount-one .row.clearfix { margin-top: -80px; }
```

**Same rule for shared image / icon assets:**
- If two banners share `pattern-13.png` and you change one banner's leaves color, **copy the file first** (e.g. `pattern-13-green.png`) and update only that banner's reference. Never edit the original shared asset.
- Same for shared icons (`icon-14.png`, `icon-15.png`, etc.) — branch into `icon-14-volunteer.png` etc. before editing.

This rule was added after a recurring failure mode: editing a shared base class or shared asset, which silently changed sections elsewhere on the site that the user didn't expect to change.

---

## Pattern Reference Table

| Content type | Mirror this pattern | Where it lives |
|---|---|---|
| Project narrative + photo + feature cards | `.modern-one` | `index.html`, `about.html` |
| Project narrative + video play button | `.fluid-one` | `index.html`, `about.html` |
| Project narrative + photo + stat callout (`.discount-box`) | `.discount-one` | `index.html`, `services.html` |
| Service offerings grid (4 cards) | `.services-block_five` inside `.services-six` | `index.html` |
| Categorized service cards (4 small cards) | `.category-block_one` inside `.category-one` | `index.html`, `services.html` |
| Cinematic banner photo with caption overlay | `.services-five_feature` | `services.html` |
| Auto-rotating photo carousel | `.services-one_feature` carousel | `index.html` |
| Section header (eyebrow + h2 + body) | `.sec-title centered` (or `.sec-title light` on dark backgrounds) | every page |
| Photo gallery (3-col grid with hover lightbox) | `.gallery-block_one` | `gallery.html` |
| Founder/staff card | `.founder-card` (split sage/white panel) | `index.html` |

---

## Common Failure Modes (Things That Have Gone Wrong Before)

### 1. Wrong column order with `.modern-one`
`.modern-one_image` has `margin-right: -120px` baked into `style.css` line 743. This was designed to bleed off the **right** edge of the page. If you put the image on the **LEFT** column, that negative margin pushes the image **into the text column**, causing text-over-image collisions. **Always put image on RIGHT, content on LEFT** when using `.modern-one`.

### 2. Asymmetric column heights breaking `.fluid-one`
The `.fluid-one .right-box` row uses Bootstrap columns. If one column has way more content than the other, the section's overall height collapses or overflows in unexpected ways. When adding content to one column, **add equivalent content to the other** (e.g., a third feature block) to keep heights balanced.

### 3. Generic gallery grids feel orphan
A `.gallery-block_one` grid of 6 raw photos with no narrative, no decorative leaves, no patterned background, and no editorial layout will look like it was bolted on. For project showcases, use editorial patterns (`.modern-one`, `.fluid-one`, `.discount-one`) — not gallery grids.

### 4. Custom inline styling breaks brand cohesion
Adding inline `style="font-size:13px; letter-spacing:3px; text-transform:uppercase; color:var(--main-color); font-weight:700;"` for a custom eyebrow looks "designed" but creates an orphan element. Use the existing `.sec-title_title` (the standard pill eyebrow with green dots) instead.

---

## Brand Voice for Copy

When writing headings, body text, or feature-block content, match the existing site voice:

- **Slow attention over quick fixes.** "Worked at the pace of the land," "assessed first, planted in season," "returned to verify what took"
- **Native ecology.** "California-sourced sedges, willows, and bunchgrasses," "watershed-friendly design"
- **Long-term care.** "Holds water on the land long after the crews leave," "stewardship rooted in long-term care of California land"
- **Bilingual EN/ES.** "Bilingual crews who can talk to every neighbor," "EN/ES workshops for crews and landowners"
- **Quote-based, no surprises.** "Free site visit, honest tradeoffs, no surprise add-ons," "scoped right — no surprises"

Avoid: marketing buzzwords, exclamation marks, fake urgency, generic "we're the best" claims.

---

## Mobile Responsive Convention

The site has a unified mobile padding rhythm for major sections (added in `responsive.css` toward the bottom of the file):

| Width | Section padding (top / bottom) |
|---|---|
| Desktop | original (often 130/100, 100/80, etc.) |
| ≤767px | **60px / 50px** |
| ≤480px | **48px / 36px** |

When adding a new section, check whether its parent class (e.g., `.modern-one`, `.fluid-one`, `.discount-one`) has this trim already. If not, add it to `responsive.css` at the bottom following the existing comment style.

For new mobile-only fixes (hide on desktop, show on mobile, etc.), add a class hook to the HTML element (e.g., `class="canticle-pond_caption"`) and target it from `responsive.css` with a `@media` query — **do not** add `<style>` blocks inside HTML files.

---

## Brand Color Tokens (from `global.css`)

| Token | Hex | Use |
|---|---|---|
| `--main-color` | `#6B8E5A` (sage) | primary green, CTAs, eyebrow color |
| `--color-two` | `#2D4A22` (fern green) | headings, dark text, deepest accents |
| `--color-three` | `#2D4A22` | CTAs / button bg |
| `--white-color` | `#FFFFFF` | white |

When the section background is dark/green, use `.sec-title light` to flip the eyebrow + heading to white. Don't add custom color overrides.

---

## File Locations

- Pages: `/Users/stynerstiner/Downloads/ecotones-ls/Ecotones-ls/*.html`
- Styles: `assets/css/global.css`, `assets/css/style.css`, `assets/css/responsive.css`
- Project photos (web-optimized): `assets/images/portfolio/[broom-pulling | burning | canticle-creek | canticle-pond | parkridge-pond | training]/`
- Decorative leaves & icons: `assets/images/icons/`
- Background patterns: `assets/images/background/`
- Source assets uploaded by client (not for direct web use): `assets/ecotones-webdev/`

---

## TL;DR

When in doubt: **find an existing section that looks similar to what you need, copy its full structure, swap the photos and copy. Don't invent.**

If a request seems to require inventing something new, **stop and ask**: "Is there an existing section on the site I should mirror for this?" Show the user the candidate patterns and let them pick. Never guess.
