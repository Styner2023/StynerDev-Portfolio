# Content Sources — Francisco Herrera Site

This file documents the relationship between the **new** site we're building
and the **original** client site that serves as the source of truth for
real content (bio, blog posts, song notes, photos, EPK material, etc.).

## The two folders

| Folder | Role | Served on |
|---|---|---|
| `Projects/francisco-herrera-site` | **NEW site we're building** — modern Next.js 15 / Tailwind 4 / TypeScript design. This is the active dev directory. | `http://localhost:3000` |
| `Projects/franciscoherreramusic.com` | **Original client site** — local archive copy of the live site that runs at https://franciscoherreramusic.com. Read-only reference for migrating real content. | (not served — file system only) |

The original site is built on a different stack (Bandzoogle / static HTML
archive). It contains the real bio, real song lyrics, real blog posts,
real photos. We **copy content from it** into the new site's data files
(e.g. `lib/content/blog.ts`, `lib/content/home.ts`, `app/about/page.tsx`).

## Workflow when adding real content to the new site

1. **Find the source.** Look inside `Projects/franciscoherreramusic.com/`
   for the relevant page or asset. The main HTML index is at
   `franciscoherreramusic.com/franciscoherreramusic.com/index.html`.
2. **Extract verbatim.** Pull the complete content (paragraphs, comments,
   lyrics, dates, photo files) — never summarize. Preserve original
   language(s); the new site is bilingual EN/ES.
3. **If the local archive is incomplete** (the local copy only has the
   homepage shell for many pages), fetch the missing content from the
   live URL via WebFetch — and add a note in the data file's comment
   header citing where it came from + the capture date.
4. **Place in the new site.** Add to the appropriate data file under
   `lib/content/`, or build out the page under `app/<route>/page.tsx`.
   Keep the bilingual `Localized` shape (`{ en, es }`) for any text.
5. **Cite the source** in code comments — every migrated content block
   should reference the original URL or local file path so future
   sessions can re-verify or pull additional context.

## What's already migrated

- **Blog**: 21 posts pulled from `franciscoherreramusic.com/blog` into
  `lib/content/blog.ts`. Source noted at the top of that file.
- **About page**: long-form bio + Calexico narrative + EPK collaborator
  list — sourced from `/about-francisco` and `/epk`. Source noted in
  `app/about/page.tsx`.
- **Album metadata + song notes**: partially migrated into
  `lib/content/home.ts` (Honor Migrante, Fuerza de la Raíz, etc.).
- **Photos**: client-provided photos live under
  `public/images/photos/client-sent-images/` and are referenced from
  hero treatments on `/about`, `/booking`, `/contact`, `/donate`,
  `/epk`, `/videos`, `/pensamientos`, `/music`.

## What's still to migrate

- **Audio files** for songs referenced on the blog (Nuevo Sol, Dicen
  Qué, Amor Sin Papeles, etc.) — currently posts link out to the
  original site's audio player rather than hosting locally.
- **Press / show history** for the EPK page (currently the EPK route
  uses the StubPage shell).
- **Any songs / lyrics pages** beyond what's mentioned in blog posts.
- **The remaining blog comments** (we captured 25 of 764 on Song of
  Liberation; same pattern likely applies to longer-running posts).

## DO NOT touch the original site folder

`Projects/franciscoherreramusic.com/` is **read-only context**. We don't
edit it, don't write to it, and don't `git add` it. It's a snapshot
reference for migration only.
