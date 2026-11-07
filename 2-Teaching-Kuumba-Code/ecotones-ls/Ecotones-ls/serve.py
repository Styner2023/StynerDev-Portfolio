#!/usr/bin/env python3
"""
Local dev server with caching DISABLED so plain refresh always shows latest changes.

Run from the Ecotones-ls/ directory:
    python3 serve.py            # default port 3000
    python3 serve.py 8080       # custom port

No more "empty caches and hard reload" dance.
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def translate_path(self, path):
        # Mirror Vercel's cleanUrls: /about -> about.html when the bare path has no file
        fs_path = super().translate_path(path)
        if os.path.isdir(fs_path) or os.path.isfile(fs_path):
            return fs_path
        root, ext = os.path.splitext(fs_path)
        if not ext and os.path.isfile(root + ".html"):
            return root + ".html"
        return fs_path


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
    addr = ("", port)
    print(f"Serving with no-cache headers at http://localhost:{port}/")
    print("Plain refresh (Cmd+R) will always show latest changes. Ctrl+C to stop.")
    ThreadingHTTPServer(addr, NoCacheHandler).serve_forever()
