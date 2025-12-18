# SkyShield Project - Coding Standards

## Project Overview
SkyShield is a static website for mobile drone security services. The site consists of HTML pages, CSS styling, and vanilla JavaScript.

**Live Site:** https://skyshield.us

## AUTHORITATIVE PRICING (use everywhere)
- **$7,500 base** per team
- **2-3 drones on rotation** per team
- **8 hours** included
- **+$750/hour** after 8 hours
- Scaling by **teams + hours** (NOT trucks)

## NON-NEGOTIABLE LANGUAGE RULES
- ❌ NO "autonomous" → ✅ "operator-led", "manual operations + AI efficiency"
- ❌ NO "BVLOS" marketing claims → ✅ "Part 107 compliant" or "future capability"
- ❌ NO "intercept" → ✅ "handoff to security lead"
- ❌ NO "Scutum Caeli" → ✅ "SkyShield"
- ✅ Keep "<30s eyes-on" and "≤120s handoff"

## File Structure
```
kavin-main/
├── index.html              # Main homepage
├── styles.css              # Global stylesheet
├── script.js               # Global JavaScript
├── info/                   # Sub-pages
│   ├── technology.html
│   ├── live-demo.html
│   ├── our-fleet.html
│   ├── pilot-application.html
│   └── dashboard.html
└── agents/                 # Multi-agent coordination (don't modify unless instructed)
```

## HTML Standards
- Use semantic HTML5 elements (`<section>`, `<nav>`, `<header>`, `<footer>`)
- Include proper meta tags for SEO and caching
- Maintain consistent class naming with existing patterns
- All pages should link to the shared `styles.css` and `script.js`
- Use Font Awesome icons (already included via CDN)
- Use Inter font family (already included via Google Fonts)

## CSS Standards
- Follow existing class naming conventions (kebab-case)
- Use CSS custom properties for colors when adding new styles
- Maintain the existing color scheme:
  - Primary gradient: `#667eea` to `#764ba2`
  - Background: Dark theme with gradients
- Keep responsive design patterns consistent
- Mobile-first approach with breakpoints

## JavaScript Standards
- Vanilla JavaScript only (no frameworks)
- Use `const` and `let`, avoid `var`
- Follow existing function naming patterns (camelCase)
- Add event listeners properly (avoid inline onclick when possible)
- Keep functions focused and single-purpose

## Branding
- Company name: "Sky Shield" or "SkyShield"
- Tagline: "Vigilantia Ante Vallum" (Vigilance Before the Wall)
- Logo: `skyshield-logo-clean.png`
- Location: Austin, TX
- Founder: Kavin Lingham

## Color Scheme (NEW)
- **Primary**: `#1A2744` (dark navy blue) - buttons, headers, accents, nav highlights
- **Background**: `#FFFFFF` (white) - page backgrounds, cards, negative space
- **Accent**: `#D4A84B` (gold/amber) - highlights, metrics, badges (optional)
- **Light Gray**: `#F8F9FA` - alternating section backgrounds
- **Footer**: `#1A2744` background with white text

**OLD (deprecated)**: Purple gradient `#667eea` → `#764ba2`

## Testing
- Test all pages in browser before marking complete
- Verify responsive behavior at mobile/tablet/desktop widths
- Check all links and navigation work correctly
- Ensure forms submit properly (or show appropriate feedback)

## Git/Deployment
- Site deploys via Vercel
- Use the existing push scripts when needed
- Don't commit the `agents/` directory to production

