import http.server
import socketserver

PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    ".js": "application/javascript"
})


with socketserver.TCPServer(("localhost", PORT), Handler) as httpd:
    print("serving at http://localhost:", PORT, sep="")
    httpd.serve_forever()