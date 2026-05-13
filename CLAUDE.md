# Villa Maria Steakhouse — Website Rebuild

## Project Goal

Rebuild **restaurantvillamaria.nl** as a fast, modern, mobile-first site that converts walk-by traffic near Leidseplein into bookings. The current site (Wix) is slow, has tiny stock images, hides the menu behind clicks, and reads generic. We're replacing it with a site that feels like the restaurant: warm, confident, Argentinian, meat-first.

**Success criteria:**
- Lighthouse mobile score ≥ 90 across all categories
- Time-to-book ≤ 2 taps from any page
- Menu visible without leaving the homepage
- Loads in under 1.5s on 4G

---

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack). Note: Next 16 renames `middleware` → `proxy` — the file is `src/proxy.ts`, not `src/middleware.ts`.
- **Language:** TypeScript, strict mode
- **Styling:** Tailwind CSS v4 only (CSS-first config via `@theme` in `src/styles/globals.css`) — no separate CSS files for app logic, no CSS-in-JS
- **Fonts:** `next/font` (Fraunces display + Inter body) — no external font links
- **Images:** `next/image` always — never raw `<img>` tags
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics + Plausible
- **i18n:** `next-intl` for EN/NL/ES switching (routes at `/en/*`, `/nl/*`, `/es/*`). Default locale is EN. Argentinian-flavored Spanish — "Carta" for menu, "Parrilla" referenced where it adds character.
- **Forms:** React Hook Form + Zod validation
- **Booking:** resmio embed widget

**Versions to use:** Latest stable. Currently on Next 16.2.6 + React 19.2.4 + Tailwind 4. Scaffolded via `npm create next-app@latest`.

---

## Folder Structure

```
/
├── CLAUDE.md                 ← this file
├── reference/                ← screenshots of old site + design refs
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── food/             ← real photography goes here
│   │   ├── interior/
│   │   └── atmosphere/       ← AI-generated textures/backgrounds OK here
│   └── menu.pdf
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx              (home)
│   │   │   ├── menu/page.tsx
│   │   │   ├── book/page.tsx
│   │   │   ├── restaurant/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/               ← buttons, inputs, primitives
│   │   ├── layout/           ← header, footer, nav
│   │   └── sections/         ← hero, menu-preview, social-proof, etc.
│   ├── lib/
│   ├── messages/             ← en.json, nl.json
│   └── styles/globals.css    ← Tailwind directives only
```

---

## Brand & Design System

### Voice
Warm, confident, not corporate. Short sentences. Speak to a hungry person, not a search engine. Argentinian where it matters; Dutch-direct everywhere else. Never use words like "culinary journey," "experience," or "passion."

### Color Palette (from logo)
```
--vm-red:       #8B1A1A   ← primary brand (logo background, brick red)
--vm-blue:      #1E3A8A   ← accent (logo "VILLA MARIA" cobalt)
--vm-black:     #0A0A0A   ← deep background, dark sections
--vm-white:     #FFFFFF   ← logo white, text on dark
--vm-cream:     #F5F0E8   ← warm paper background for light sections
--vm-smoke:     #4A4A4A   ← muted text
```

Use red as the dominant brand color (header accents, CTAs, dividers). Blue used sparingly — display headlines, link hovers, accent details. Black/cream as the page base depending on section. Logo always sits on its native red or on black; never on cream.

### Typography
- **Display:** A serif with character — try `Fraunces` or `DM Serif Display`. Used for H1, H2, dish names.
- **Body:** `Inter` or `Geist`. 16px base on mobile, 18px desktop.
- **Numerals:** Tabular for prices.

### Spacing & Layout
- Generous whitespace. Container max 1200px. Mobile padding 24px sides.
- Photos bleed edge-to-edge on mobile, contained on desktop.
- Dark sections (black) alternating with cream sections — never two same-tone sections in a row. Red as accent only, never as section background.

### Components Must Have
- Sticky header that shrinks on scroll
- Floating "Book a Table" CTA on mobile (bottom-right, vm-red)
- Language toggle (EN/NL) in header
- Footer with address, hours, phone, map link

---

## Content & Copy

### Real Info (from current site, verified)
- **Name:** Villa Maria Steakhouse
- **Address:** Lange Leidsedwarsstraat 45, 1017 NG Amsterdam
- **Phone:** +31 20 622 3759
- **Email:** info@restaurantvillamaria.nl
- **Hours:** Daily 12:00 – 23:00
- **Cuisine:** Argentinian grill, steaks, spare ribs, BBQ, fish, seafood, salads
- **Terrace:** Yes, seasonal
- **Group dining:** Yes, available
- **Instagram:** [@villa.maria.steakhouse](https://www.instagram.com/villa.maria.steakhouse/)
- **Awards (TripAdvisor):**
  - 2024 Travellers' Choice Award
  - 2022 Travellers' Choice
  - 2021 Travellers' Choice
  - 2015 Certificaat van Uitmuntendheid (Certificate of Excellence)
  - "Rated excellent by 821 travellers" on TripAdvisor

### Content Sources (owner-provided files)
All sit in `/content/` at the project root:
- `/content/logo/` — logo files (use these, do not pull from old site)
- `/content/menu/` — menu PDF and prices
- `/content/about_company` — about page copy
- `/content/awards/` — TripAdvisor award badges (2024, 2022, 2021, 2015)
- `/content/images/` (if provided) — any photos owner wants used

Read these files at build time or copy into `/public/` as appropriate. Never hardcode the about copy in a component — read from the file so it can be updated without a code change.

### Pages

**Home (the restaurant)** — the homepage IS the restaurant page. Sections:
1. Hero — full-bleed dark photo, headline, two CTAs (Book / See Menu)
2. Intro — 2-3 sentences: who we are, what we grill, where we are
3. Menu preview — 4-6 signature cuts with prices, link to full menu
4. The room — 2-3 interior shots + terrace
5. Group dining callout — "Group bookings available" with phone CTA
6. Awards strip — horizontal row of TripAdvisor badges (2024, 2022, 2021, 2015) with one-line summary: "Rated excellent by 821 travellers — Travellers' Choice winner 4 years running." Badges in a single row on desktop, 2x2 grid on mobile, on a cream background.
7. Social proof — 3 real recent reviews with source + date
8. Location — embedded map + walking time from Leidseplein
9. Footer CTA — Book now

**Menu** — Full menu, categorized, with prices. Downloadable PDF link. NL/EN toggle works here too.

**Book** — resmio booking widget embedded. Style the wrapper to match the site (cream background, generous padding, headline + 1-line reassurance copy above the widget, phone number as fallback below).

**About** — Use the content from `/content/about_company` (provided by owner). Lay it out clean and readable, not corporate.

**Contact** — Map, address, phone, email, opening hours, directions from Leidseplein/Centraal.

---



---

## Images

### Source
All images come from the existing Villa Maria website (`restaurantvillamaria.nl`). No AI generation, no new photography in v1. Pull the existing assets, clean them up, and use them properly.

### Step 1 — Harvest from the current site
Download every usable image from the current Wix site **except the logo** (use the owner-provided file in `/content/logo/` instead):
- Existing food photos (`Foto 22-10-2022...`, `Foto 14-10-2021...`)
- TripAdvisor certificate
- Any photos on Menu, Restaurant, About, Contact pages
- Any background/hero images currently in use

Skip the stock photo by "Loija Nguyen" on the homepage — it's not the actual restaurant.

Wix serves images via `static.wixstatic.com`. Right-click → save, or pull the originals by stripping the resize parameters from the URL (everything after `/v1/fill/...`).

Save all to `/public/images/source/` as the raw originals before processing.

### Step 2 — Process
- Re-export at proper sizes (hero: 2400px wide, content: 1200px wide, thumbs: 600px)
- Convert to WebP via Next.js automatically
- Compress losslessly
- Strip Wix's blur/quality artifacts where present
- Crop intentionally — the current site uses lots of awkward square crops on landscape food shots; recrop for the new layout

### Step 3 — Organize
```
/public/images/
  ├── logo/
  ├── hero/              ← largest, best food/interior shot for landing
  ├── food/              ← dish photos for menu preview
  ├── interior/          ← room, terrace, atmosphere
  └── awards/            ← TripAdvisor cert etc.
```

### Image rules in code
- All images via `next/image` with explicit width/height
- Use `priority` only on hero
- AVIF + WebP automatic via Next.js
- Alt text in both EN and NL
- Lazy-load everything below the fold
- If an existing image is too low-resolution to look good at hero size, use it smaller — don't upscale

### If something is unusable
Some current images may be too small or too generic (the stock photo by "Loija Nguyen" on the homepage is not Villa Maria's actual restaurant — drop it). For any gap, leave a clearly-labeled placeholder div in the code with a TODO comment so the owner knows what's needed later. Do not invent or generate replacements.

---

## SEO & Technical

- Schema.org `Restaurant` markup on every page (name, address, hours, priceRange, servesCuisine, telephone, acceptsReservations)
- `Menu` schema on /menu
- Open Graph image: real hero photo, 1200×630
- `sitemap.xml` and `robots.txt` auto-generated
- Canonical URLs with locale
- Submit to Google Search Console + Google Business Profile updated to match
- `hreflang` tags for EN/NL

---

## Working with Claude Code — Rules

1. **Build in vertical slices, not horizontal layers.** Finish the layout shell completely. Then home page completely. Then menu page completely. No half-built pages.
2. **One concern per session.** When done with a slice, start a new Claude Code session. Update this file with what's done.
3. **Never accept "looks fine."** Always review in browser, screenshot, give specific feedback.
4. **No invented dependencies.** If a package isn't in `package.json`, Claude must add it explicitly.
5. **No mock data in committed code.** Use real content from this file.
6. **Mobile-first always.** Build the 380px layout first, then scale up.
7. **Run `npm run build` before declaring anything done.** Type errors = not done.

---

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build (must pass before commit)
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## Build Order (update as you go)

- [x] Phase 0: Scaffold Next.js, Tailwind, i18n, deploy empty to Vercel
- [x] Phase 1: Layout shell — header (with language switch), footer, mobile nav, floating book CTA
- [ ] Phase 2: Home page (the restaurant) — all 9 sections above
- [ ] Phase 3: Menu page — full menu with categories
- [ ] Phase 4: Book page — booking system decision + integration
- [ ] Phase 5: About page
- [ ] Phase 6: Contact page
- [ ] Phase 7: SEO pass — schema, OG images, sitemap, hreflang
- [ ] Phase 8: Performance pass — Lighthouse ≥ 90 on mobile
- [ ] Phase 9: Domain switch + Google Search Console + analytics

---

## Decisions Made

- **Booking system:** resmio embed
- **Domain:** keep it short — shortlist candidates (e.g. `villamaria.nl`, `villamaria-amsterdam.nl`) and check availability before commit
- **Color palette:** locked, see brand section above (red/blue/black/white from logo)
- **Logo:** owner-provided file in `/content/logo/`
- **Menu source:** owner-provided PDF in `/content/menu/`
- **About copy:** owner-provided in `/content/about_company`
- **Instagram:** @villa.maria.steakhouse — embed latest posts or link prominently
- **Group dining:** offered — include a callout on Restaurant page
