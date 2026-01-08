#!/usr/bin/env python3
"""
Development server with live reload for VOICE 2026 static mockup.
Watches for changes in HTML, CSS, JS, and image files and automatically refreshes the browser.
Automatically rebuilds templates when source files change.
"""

import os
import sys
import socket
import subprocess
from livereload import Server

def find_available_port(start_port=8000, max_attempts=10):
    """Find an available port starting from start_port."""
    for port in range(start_port, start_port + max_attempts):
        try:
            # Try to bind to the port
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.bind(('localhost', port))
            sock.close()
            return port
        except OSError:
            continue
    return None

def rebuild_templates():
    """Run the template build script."""
    print("\n🔨 Rebuilding templates...")
    result = subprocess.run(
        [sys.executable, 'static_mockup/build.py'],
        capture_output=True,
        text=True
    )
    if result.returncode != 0:
        print(f"❌ Build failed: {result.stderr}")
    else:
        print("✅ Templates rebuilt successfully")

# Change to the project root directory
project_root = os.path.dirname(os.path.abspath(__file__))
os.chdir(project_root)

# Get port from command line argument or find available port
if len(sys.argv) > 1:
    try:
        preferred_port = int(sys.argv[1])
    except ValueError:
        print(f"❌ Invalid port number: {sys.argv[1]}")
        sys.exit(1)
else:
    preferred_port = 8000

# Find an available port
port = find_available_port(preferred_port)

if port is None:
    print(f"❌ Could not find an available port between {preferred_port} and {preferred_port + 10}")
    print(f"💡 Try specifying a different port: python3 dev_server.py <port>")
    sys.exit(1)

if port != preferred_port:
    print(f"⚠️  Port {preferred_port} is already in use, using port {port} instead\n")

# Create server instance
server = Server()

# Define the directory to serve
static_dir = 'static_mockup'

# Watch template source files and rebuild on change
print("Setting up file watchers...")
server.watch(f'{static_dir}/src/**/*.html', rebuild_templates)

# Watch output files for browser refresh
server.watch(f'{static_dir}/*.html')
server.watch(f'{static_dir}/**/*.css')
server.watch(f'{static_dir}/**/*.js')
server.watch(f'{static_dir}/**/*.png')
server.watch(f'{static_dir}/**/*.jpg')
server.watch(f'{static_dir}/**/*.jpeg')
server.watch(f'{static_dir}/**/*.svg')

# Start the server
print("\n" + "="*60)
print("VOICE 2026 Development Server")
print("="*60)
print(f"\n🚀 Server starting...")
print(f"📁 Serving directory: {static_dir}/")
print(f"🌐 Local URL: http://localhost:{port}")
print(f"🔄 Live reload: ENABLED")
print(f"\n👀 Watching for changes in:")
print(f"   - Template sources (src/*.html, src/partials/*.html)")
print(f"   - CSS files (.css)")
print(f"   - JavaScript files (.js)")
print(f"   - Images (.png, .jpg, .jpeg, .svg)")
print(f"\n📝 Templates auto-rebuild when src/ files change")
print(f"\n💡 Press Ctrl+C to stop the server")
print("="*60 + "\n")

try:
    server.serve(
        root=static_dir,
        host='localhost',
        port=port,
        open_url_delay=1  # Automatically open browser after 1 second
    )
except KeyboardInterrupt:
    print("\n\n👋 Server stopped. Goodbye!")
    sys.exit(0)
except OSError as e:
    print(f"\n❌ Error starting server: {e}")
    print(f"💡 Port {port} might be in use. Try: python3 dev_server.py <different-port>")
    sys.exit(1)
