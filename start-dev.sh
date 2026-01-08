#!/bin/bash
# Start the VOICE 2026 development server with live reload

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting VOICE 2026 Development Server...${NC}\n"

# Check if livereload is installed
if ! python3 -c "import livereload" 2>/dev/null; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    python3 -m pip install -r requirements.txt
    echo ""
fi

# Build templates first
echo -e "${BLUE}Building templates...${NC}"
python3 static_mockup/build.py
echo ""

# Start the dev server
python3 dev_server.py
