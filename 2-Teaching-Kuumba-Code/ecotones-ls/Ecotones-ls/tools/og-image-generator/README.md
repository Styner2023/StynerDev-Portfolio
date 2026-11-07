# Ecotones LS — OG Image Generator

Generates 1200×630 OG/Twitter card JPGs from a single SVG template + per-card spec JSON.

## What it does

For each entry in `cards.json`, substitutes the eyebrow and title into `template.svg`, renders the SVG with [`sharp`](https://sharp.pixelplumbing.com/), re-encodes to JPG (quality 85, mozjpeg), and writes to `../../assets/images/og/og-<slug>.jpg`. Validates dimensions, format, and size on every output.

## Install

```bash
cd tools/og-image-generator
npm install
```

Requires Node ≥18. `sharp` ships prebuilt native binaries for macOS / Linux / Windows.

## Run

Generate all cards listed in `cards.json`:

```bash
npm run generate
```

Generate a single card by slug:

```bash
node generate.js --card home
```

Output appears in `assets/images/og/` at the project root.

## Add a new card

1. Open `cards.json`. Append an entry:

   ```json
   {
     "slug": "<short-slug>",
     "eyebrow": "UPPERCASE EYEBROW LABEL",
     "title": "Page-specific title — keep ≤ 50 chars per natural line",
     "output": "og-<slug>.jpg"
   }
   ```

2. Run `node generate.js --card <slug>`.

3. Update the new page's four meta tags + JSON-LD `image` field to point at `https://ecotonesls.com/assets/images/og/og-<slug>.jpg`.

## Template

`template.svg` is a hand-tuned 1200×630 layout:

- Solid `#2D4A22` (forest green) background with a subtle white→black diagonal gradient for depth.
- Top-left wordmark "Ecotones LS".
- Eyebrow above the title in pale sage `#DCE4D6`.
- Title (1–2 lines) in white at 60px.
- Bottom-right accent rule + `ecotonesls.com` in light green `#A4C285`.

System fonts only (`'Helvetica Neue', Arial, sans-serif`). No web fonts — `sharp` cannot reliably embed them.

## Title wrapping

`wrapTitle()` in [generate.js](generate.js) does greedy word-wrap at a 50-char limit. Titles wrap to a maximum of two lines; longer titles throw a build error rather than silently truncating. Adjust `TITLE_MAX_CHARS_PER_LINE` / `TITLE_MAX_LINES` in `generate.js` if the design ever changes.

## Validation

Each generated card is checked for:

- Exactly 1200×630 dimensions.
- Format `jpeg`.
- File size ≤ 200KB.

Any failure deletes the bad file and aborts with a non-zero exit code.

## Brand colors used

| Hex | Where |
|-----|-------|
| `#2D4A22` | Background (dark forest green) |
| `#FFFFFF` | Wordmark + title |
| `#DCE4D6` | Eyebrow (pale sage) |
| `#A4C285` | Accent rule + tagline (light leaf green) |
