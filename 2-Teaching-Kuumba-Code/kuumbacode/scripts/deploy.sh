#!/usr/bin/env bash
#
# One-command deploy for Kuumba Code.
#
#   npm run deploy                     # commit everything, push, deploy
#   npm run deploy -- "your message"   # ...with your own commit message
#
# Why this exists: the Vercel project 'kuumba-code' has no Git integration, so
# pushing to GitHub does NOT deploy — production only updates when someone runs
# `vercel --prod`. That is two commands people forget, in an order that matters.
# This does both, in order, and stops at the first failure so the site is never
# left deployed from code that failed to push.
#
# If the Vercel GitHub App ever gets installed and `vercel git connect` succeeds,
# the deploy step here becomes redundant — a push would be enough.

set -euo pipefail

cd "$(dirname "$0")/.."

say() { printf '\n\033[1m%s\033[0m\n' "$1"; }
warn() { printf '\033[33m%s\033[0m\n' "$1"; }

# --- sanity ---------------------------------------------------------------
git rev-parse --git-dir >/dev/null 2>&1 || {
  warn "Not a git repository. Clone it first:"
  warn "  git clone https://github.com/stynerdev225/kuumbacode.git"
  exit 1
}

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  warn "On branch '$BRANCH', not 'main'."
  warn "Production deploys should come from main. Switch first, or deploy by hand."
  exit 1
fi

# --- 1. commit ------------------------------------------------------------
if [ -n "$(git status --porcelain)" ]; then
  say "Changes to commit:"
  git status --short

  MSG="${1:-Update site content — $(date '+%d %b %Y, %H:%M')}"
  git add -A
  git commit -q -m "$MSG"
  echo "Committed: $MSG"
else
  say "Nothing to commit — working tree is clean."
fi

# --- 2. push --------------------------------------------------------------
say "Pushing to GitHub…"
git push origin main

# --- 3. deploy ------------------------------------------------------------
# Vercel will not do this on its own for this project. See the note at the top.
say "Deploying to production…"
vercel --prod --yes

say "Done. Live at https://www.kuumbacode.com"
