#!/usr/bin/env python3
"""Local dev server with clean URL support (matches Vercel's cleanUrls config)."""

import http.server
import os

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split('?')[0].split('#')[0]
        if path != '/' and '.' not in os.path.basename(path):
            html_path = path.rstrip('/') + '.html'
            file_path = self.translate_path(html_path)
            if os.path.isfile(file_path):
                self.path = html_path
        super().do_GET()

if __name__ == '__main__':
    port = 8000
    server = http.server.HTTPServer(('', port), CleanURLHandler)
    print(f'Serving at http://localhost:{port}')
    server.serve_forever()
