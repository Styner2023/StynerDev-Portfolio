#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = __dirname;
const TEMPLATE_PATH = path.join(ROOT, 'template.svg');
const CARDS_PATH = path.join(ROOT, 'cards.json');
const OUTPUT_DIR = path.resolve(ROOT, '..', '..', 'assets', 'images', 'og');

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;
const MAX_BYTES = 200 * 1024;
const TITLE_MAX_CHARS_PER_LINE = 32;
const TITLE_MAX_LINES = 2;

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

// Greedy word-wrap at space boundaries; throws if title can't fit in TITLE_MAX_LINES.
function wrapTitle(text, maxCharsPerLine = TITLE_MAX_CHARS_PER_LINE) {
  const words = text.trim().split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    if (!current) {
      current = word;
    } else if ((current + ' ' + word).length <= maxCharsPerLine) {
      current += ' ' + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length > TITLE_MAX_LINES) {
    throw new Error(
      `Title needs ${lines.length} lines at ${maxCharsPerLine}-char limit (max ${TITLE_MAX_LINES}): ${JSON.stringify(text)}`
    );
  }
  return lines;
}

async function generateCard(card, template) {
  const lines = wrapTitle(card.title);
  const line1 = escapeXml(lines[0] || '');
  const line2 = escapeXml(lines[1] || '');
  const eyebrow = escapeXml(card.eyebrow);

  const svg = template
    .replace('{{EYEBROW}}', eyebrow)
    .replace('{{TITLE_LINE_1}}', line1)
    .replace('{{TITLE_LINE_2}}', line2);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, card.output);

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  const stat = fs.statSync(outPath);

  if (meta.width !== TARGET_WIDTH || meta.height !== TARGET_HEIGHT) {
    fs.unlinkSync(outPath);
    throw new Error(
      `${card.output}: dimensions ${meta.width}x${meta.height} != ${TARGET_WIDTH}x${TARGET_HEIGHT}`
    );
  }
  if (meta.format !== 'jpeg') {
    fs.unlinkSync(outPath);
    throw new Error(`${card.output}: format ${meta.format} != jpeg`);
  }
  if (stat.size > MAX_BYTES) {
    fs.unlinkSync(outPath);
    throw new Error(
      `${card.output}: ${(stat.size / 1024).toFixed(1)}KB exceeds ${MAX_BYTES / 1024}KB cap`
    );
  }

  console.log(`✓ ${card.output} (${meta.width}×${meta.height}, ${(stat.size / 1024).toFixed(1)}KB)`);
}

async function main() {
  const args = process.argv.slice(2);
  const allFlag = args.includes('--all');
  const cardIdx = args.indexOf('--card');
  const targetSlug = cardIdx >= 0 ? args[cardIdx + 1] : null;

  if (!allFlag && !targetSlug) {
    console.error('Usage: node generate.js [--all | --card <slug>]');
    process.exit(1);
  }

  const cards = JSON.parse(fs.readFileSync(CARDS_PATH, 'utf8'));
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  const targets = allFlag ? cards : cards.filter(c => c.slug === targetSlug);
  if (!targets.length) {
    console.error(`No card matched slug ${JSON.stringify(targetSlug)}`);
    console.error(`Available slugs: ${cards.map(c => c.slug).join(', ')}`);
    process.exit(1);
  }

  for (const card of targets) {
    await generateCard(card, template);
  }
}

main().catch(err => {
  console.error('FAIL:', err.message);
  process.exit(1);
});
