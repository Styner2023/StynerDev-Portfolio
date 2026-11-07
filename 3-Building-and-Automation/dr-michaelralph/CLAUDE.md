# Dr. Michael Ralph — Project Notes

## Project Structure
- Site files live in `app/grafty/` (HTML, CSS, JS, images)
- This is a static HTML site — no build step, no framework

## Vercel Deployment
- **Project name:** `drmichaelralph`
- **Live URL:** https://drmichaelralph.vercel.app
- **Deploy command:** `vercel --prod --yes` (run from project root)
- Root `vercel.json` sets `outputDirectory: "app/grafty"` and `cleanUrls: true`
- There is also a `vercel.json` inside `app/grafty/` with `cleanUrls: true` (legacy, harmless)

### Why this matters
Previously, `.vercel/project.json` at the root was linked to a *different* Vercel project (`dr-michaelralph`) than the one serving the live domain (`drmichaelralph`). Running `vercel --prod` from the root deployed to the wrong project. The fix was:
1. Removed the wrong root `.vercel` config
2. Ran `vercel link --yes --project drmichaelralph` to link the root to the correct project
3. Added root `vercel.json` with `outputDirectory: "app/grafty"` so it serves the right files

## Local Dev Server
- Run `python3 app/grafty/serve.py` to start a local server on port 8000
- This supports clean URLs (e.g. `/research` instead of `/research.html`), matching Vercel's `cleanUrls` config
- Python's default `http.server` does NOT support clean URLs — always use `serve.py`

## Social Links
All social icons across all 5 pages point to:
- **X/Twitter:** https://x.com/topdogunderdog
- **LinkedIn:** https://www.linkedin.com/in/michael-ralph-1359a140/
- **Instagram:** https://www.instagram.com/topdogunderdog/

## Key Profile Details on Site
- Full title: **Cameron Schrier Professor and Chair** of Afro-American Studies at Howard University
- Directs the **Center for an Equitable Economy and Sustainable Society**
- **NYU School of Medicine** (faculty) and **Santa Fe Institute** (External Professor)
- 9+ fellowships: NSF, Mellon, Woodrow Wilson, W.E.B. Du Bois Center (Harvard), Charles Warren Center (Harvard), Wenner-Gren, SSRC, ACLS, Institute for Advanced Study (Princeton)
- **MITx Award 2018** for treasuryofwearysouls.com
- Featured in: NPR, MSNBC, C-SPAN, Dissent, Foreign Policy

## SECURITY WARNING — Compromised Domain
**DO NOT link to these compromised domains anywhere on this site:**
- **michaelralph.org** — His old Squarespace site, hijacked with Indonesian gambling spam ("momoslot", "slot777"). Multiple pages replaced with malicious content. "Built by INCEPTION" in the footer is just a self-referencing credit, not an actual agency.
- **treasuryofwearysouls.com** — His MITx Award-winning slave insurance ledger domain, also hijacked with gambling spam (Pin-Up betting). Reference the project by name ("Treasury of Weary Souls") but DO NOT link to or display the URL.

Always use safe external links instead: publisher sites (HarperCollins, UChicago Press), Amazon, YouTube, Google Scholar, Dissent Magazine, Foreign Policy, etc. Verify any external URL before adding it.
