# ecotones-ls

Static HTML site for Ecotones LS, planned for deployment on Vercel.

## Structure

- `Ecotones-ls/` — main site (HTML pages, CSS, JS, fonts, lighter images)
- `documentation/` — template documentation

## Heavy image folders (not in git)

The following folders are excluded via `.gitignore` because they contain
uncompressed PNGs too large for GitHub (some files >100 MB). They must be
hosted separately (CDN, S3, Vercel Blob, etc.) and the site updated to
reference the hosted URLs:

- `Ecotones-ls/assets/images/caladium-leaves/`
- `Ecotones-ls/assets/images/stock-plant-images/`
- `Ecotones-ls/assets/images/elements/`
- `Ecotones-ls/assets/images/illustrations-icons-images-plants/`
- `Ecotones-ls/assets/images/single-plant-pots/`
- `Ecotones-ls/assets/images/Canticle-Creek*/`
- `Ecotones-ls/assets/images/grass/`
- `Ecotones-ls/assets/images/founder-Robert-Symens-Bucher1/`
- `Ecotones-ls/assets/images/ecotones-ls-plants/`

## Local preview

```sh
cd Ecotones-ls && python3 serve.py
```
