# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VOICE2026 is a website for VOICE.advantest.com, the Advantest Developer Conference focusing on semiconductor test hardware and software. The conference brings together industry professionals to discuss test solutions, methodologies, and best practices.

**Conference Details:**
- Date: May 18-20, 2026
- Location: Scottsdale, Arizona
- Audience: Semiconductor test professionals, engineers, and industry decision-makers

## Project Structure

```
VOICE2026/
├── static_mockup/          # Static HTML/CSS/JS design mockup
│   ├── src/                # Source templates (edit these!)
│   │   ├── partials/       # Reusable template partials
│   │   │   ├── header.html # Site header with navigation
│   │   │   ├── footer.html # Site footer
│   │   │   └── head.html   # HTML head (meta, CSS, fonts)
│   │   ├── index.html      # Homepage template
│   │   ├── sponsors.html   # Sponsors page template
│   │   ├── committee.html  # Committee page template
│   │   ├── program-*.html  # Program section templates
│   │   └── attend-*.html   # Attend section templates
│   ├── build.py            # Template build script
│   ├── *.html              # Built output files (auto-generated)
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   └── protection.css  # Password protection overlay styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript (dropdowns, countdown, accordion)
│   │   └── content-protection.js  # Password protection functionality
│   ├── images/
│   │   ├── sponsors/       # Sponsor logo images
│   │   └── [various]       # Logos, photos, venue images
│   └── media/
│       └── voice_2024-1080p.mp4  # Conference video (63MB)
├── dev_server.py           # Development server with live reload
├── start-dev.sh            # Convenience script to start dev server
├── requirements.txt        # Python dependencies
└── CLAUDE.md               # This file
```

## Templating System

The project uses a simple Python-based templating system with partials.

**Template Syntax:**
```html
{{> partial_name }}
```
This includes the content of `src/partials/partial_name.html`.

**Building Templates:**
```bash
cd static_mockup
python3 build.py
```

This processes all `.html` files in `src/` (except partials), replaces partial includes, and outputs to the root `static_mockup/` directory.

**Development Workflow:**
1. Edit templates in `src/` directory
2. Run `python3 build.py` to compile
3. View output in browser or use dev server

## Version Control (Jujutsu)

This project uses Jujutsu (jj) for version control.

**Common Commands:**
```bash
jj status          # Check working copy changes
jj log             # View commit history
jj describe -m ""  # Set commit message for current change
jj new             # Create new change on top of current
```

**Configuration:**
- Max file size set to 70MB to accommodate video file
- `.gitignore` excludes `.DS_Store`, `__pycache__/`, IDE files

## GitHub Pages Deployment

The static site is deployed to GitHub Pages.

**Live Site:** https://zachwilder.github.io/voice2026-static/
**Repository:** https://github.com/zachwilder/voice2026-static

**Deploy Process:**
```bash
# 1. Build templates
cd static_mockup
python3 build.py

# 2. Copy static files to deploy directory
cp -r *.html css js images /tmp/voice2026-static/

# 3. Commit and push
cd /tmp/voice2026-static
git add .
git commit -m "Update site"
git push
```

**Note:** The media/ folder (63MB video) is excluded from deployment to keep repo size reasonable.

## Development Server

A Python-based development server with live reload is available for rapid development.

**Starting the Development Server:**
```bash
# Option 1: Use the convenience script
./start-dev.sh

# Option 2: Run Python script directly
python3 dev_server.py

# Option 3: Specify a custom port
python3 dev_server.py 3000
```

**Features:**
- Serves at http://localhost:8000 (auto-detects next available port if busy)
- Automatically reloads browser on file changes
- Watches HTML, CSS, JS, and image files
- Automatically opens browser on start

**First Time Setup:**
```bash
python3 -m pip install -r requirements.txt
```

## Site Pages

**Homepage (index.html)**
- Hero section with conference logo and CTA buttons
- About VOICE section
- Why Attend section with benefits list
- Location section (Scottsdale, Arizona)
- Infographic section
- Spread the Word / Press Releases cards
- Sidebar with countdown, key dates, subscribe form
- Sponsor carousel (auto-scrolling)

**Program Pages:**
- `program-agenda.html` - Conference agenda with speakers and evening events
- `program-call-for-papers.html` - Submission info, tracks, dates, process guide
- `program-technical.html` - Technical program overview
- `program-kiosk.html` - Technology Kiosk Showcase
- `program-workshop.html` - Workshop Day information
- `program-awards.html` - Best Paper and other awards

**Attend Pages:**
- `attend-register.html` - Registration info and fees
- `attend-hotel.html` - Hotel reservations and venue info
- `attend-privacy.html` - Privacy notice (GDPR compliant)
- `attend-terms.html` - Terms of service

**Other Pages:**
- `sponsors.html` - Sponsor tiers, current sponsors, FAQ (accordion), Expo portal
- `committee.html` - Steering Committee and Technical Program Committee tables

## Design System

**Brand Colors (CSS Variables):**
- Primary: `--COLOR_BRAND_PRIMARY: #91003c` (Burgundy/Maroon)
- Secondary: `--COLOR_BRAND_SECONDARY: #c31f66` (Pink)
- Accent Blues: `#001c77`, `#005180`, `#005777`
- Purple Accent: `#651366`

**Typography:**
- Font Family: Roboto, 'Open Sans', sans-serif
- Google Fonts: Open Sans (weights: 400, 600, 700)

**Layout:**
- Container max-width: 1200px
- Responsive design with 90% width containers

## JavaScript Functionality

**main.js includes:**
- Dropdown menu toggle and close-on-outside-click
- Mobile navigation setup
- Countdown timer to conference date (May 18, 2026)
- Smooth scrolling for anchor links
- Newsletter subscription form handler
- FAQ accordion toggle functionality

**content-protection.js:**
- Password protection for preview access
- Content visibility control

## Pending Home Page Updates

The following items from the design spec are not yet implemented:

- [ ] Video banner at top with looping video behind main buttons
- [ ] Streaming sponsor logo banner at bottom (currently static carousel)
- [ ] Context-aware buttons (Sponsor active now-April, Call for Papers now-Nov 15, etc.)
- [ ] Video formatted into small clips, slow motion, dark, behind buttons
- [ ] Move Subscribe button more visible (near main buttons)
- [ ] Remove "Welcome to VOICE 2026" article section
- [ ] Downloads button (flyer) and Press Release button at bottom

**Design References:**
- https://www.mwcbarcelona.com/
- https://www.eumw.eu/general-information/

## WordPress Theme Conversion Notes

When converting to WordPress:

1. **Template Hierarchy:**
   - index.html → index.php, front-page.php
   - sponsors.html → page-sponsors.php
   - Header/footer extracted to header.php/footer.php

2. **Dynamic Content:**
   - Speakers: Custom Post Type with featured images
   - Sponsors: Custom Post Type with logo uploads
   - Key dates: Custom fields or options page

3. **Asset Management:**
   - CSS/JS enqueued via functions.php
   - Images uploaded to WordPress Media Library

## Contact Information

- General: corpcomms@advantest.com
- Marketing: mktgcomms@advantest.com
- Data Protection: DPO@advantest.com
