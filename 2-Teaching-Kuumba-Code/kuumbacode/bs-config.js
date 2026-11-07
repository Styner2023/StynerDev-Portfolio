/**
 * Browser-sync config for Kuumba Code — clean URLs (no .html) in local dev.
 *
 * How it works (no edits to the HTML files required):
 *   1. A request for `/about` is internally resolved to `about.html`.
 *   2. A request for `/about.html` is 301-redirected to `/about`, so the
 *      existing nav links (which still point to `about.html`) canonicalize
 *      to clean URLs in the address bar.
 *   3. `/` and `/index.html` both serve index.html; `.html` -> clean everywhere.
 *
 * Run: npx browser-sync start --config bs-config.js
 */
const fs = require('fs');
const path = require('path');

const BASE_DIR = 'Template';
const baseAbs = path.join(__dirname, BASE_DIR);

function cleanUrls(req, res, next) {
  const [rawPath, rawQuery] = req.url.split('?');
  const query = rawQuery ? '?' + rawQuery : '';
  let urlPath;
  try {
    urlPath = decodeURIComponent(rawPath);
  } catch (e) {
    urlPath = rawPath;
  }

  // 1. Any *.html request -> redirect to its clean equivalent.
  if (urlPath.toLowerCase().endsWith('.html')) {
    let clean = urlPath.slice(0, -'.html'.length);
    // `/index` and `/sub/index` collapse to the directory root.
    if (clean === '/index') {
      clean = '/';
    } else if (clean.endsWith('/index')) {
      clean = clean.slice(0, -'index'.length);
    }
    res.writeHead(301, { Location: clean + query });
    res.end();
    return;
  }

  // 2. Extensionless request -> internally serve the matching .html file.
  if (!path.extname(urlPath)) {
    let candidate = urlPath.endsWith('/') ? urlPath + 'index' : urlPath;
    const filePath = path.join(baseAbs, candidate + '.html');
    // Guard against path traversal, then only rewrite if the file exists.
    if (filePath.startsWith(baseAbs) && fs.existsSync(filePath)) {
      req.url = candidate + '.html' + query;
    }
  }

  next();
}

module.exports = {
  server: { baseDir: BASE_DIR },
  startPath: '/',
  port: 3000,
  notify: false,
  open: false,
  middleware: [cleanUrls],
  files: [
    'Template/**/*.html',
    'Template/assets/css/*.css',
    'Template/assets/js/**/*.js',
  ],
};
