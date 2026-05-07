# Design System Inspired by Liquor Store

## 1. Visual Theme & Atmosphere

The Liquor Store design system embodies refined sophistication with a heritage-focused aesthetic. It combines dark, luxurious backgrounds with warm amber and terracotta accents, evoking a premium spirits retailer with classical elegance. The visual identity balances minimalism with opulence—featuring generous whitespace, serif typography, and curated imagery of premium bottles and botanical elements. This creates an aspirational yet approachable e-commerce experience that communicates quality, heritage (often tracing back to foundational years like 1905), and craftsmanship. The system prioritizes emotional connection and visual storytelling over aggressive commercialism.

**Key Characteristics**
- Dark navy and near-black backgrounds with ivory and off-white foregrounds
- Warm terracotta and burnt sienna accents for CTAs and brand warmth
- Serif typeface (Spectral) conveying timelessness and tradition
- High-contrast, readable text on both light and dark surfaces
- Generous spacing and breathing room emphasizing luxury and clarity
- Soft shadow and elevation for subtle depth without clutter
- Imagery-first approach with integrated product and lifestyle photography

## 2. Color Palette & Roles

### Primary
- **Dark Charcoal** (`#212529`): Primary text color, dominates neutral layouts, conveys authority and sophistication
- **Near Black** (`#000000`): Maximum contrast text, high-priority headings, foundational UI elements
- **Off-White** (`#FFFFFF`): Primary background, text on dark surfaces, infinite whitespace in layouts

### Accent Colors
- **Burnt Sienna** (`#A23F25`): Brand warmth, secondary headers, creates visual rhythm
- **Terracotta** (`#AB4227`): Call-to-action warmth, complements primary accent, approachable friendliness
- **Deep Clay** (`#B7472A`): Error states, danger alerts, urgent messaging

### Interactive
- **Burnt Sienna Button** (`#AB4227`): Primary CTA background, solid state, padding `8px 24px`, radius `3px`, weight `500`
- **Bright Blue** (`#007BFF`): Secondary interactive states, hyperlinks in dark contexts
- **Cyan** (`#17A2B8`): Information states, supplementary actions

### Neutral Scale
- **Medium Gray** (`#808080`): Tertiary text, disabled states, subtle emphasis
- **Light Gray** (`#CCCCCC`): Borders, dividers, faint emphasis
- **Almost White** (`#FEFEFE`): Subtle contrast backgrounds, alternative surfaces
- **Warm Off-White** (`#F5F4F0`): Cream backgrounds, vintage aesthetic support

### Surface & Borders
- **Charcoal Surface** (`#343A40`): Secondary backgrounds, card containers
- **Light Surface** (`#F8F9FA`): Minimal contrast backgrounds, form fields

### Semantic / Status
- **Error Red** (`#DC3545`): Critical error states, destructive actions
- **Success Green** (`#28A745`): Positive completion, validation states
- **Warning Yellow** (`#FFC107`): Caution messages, secondary alerts

## 3. Typography Rules

### Font Family
**Primary:** Spectral (serif) — `font-family: 'Spectral', serif;` with fallback stack `Georgia, 'Times New Roman', serif`
**Secondary:** FontAwesome for icons — `font-family: 'FontAwesome';` with fallback `sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|---|---|
| Display / Hero | Spectral | 80px | 700 | 88px | 0px | Main page hero titles, maximum impact |
| H2 / Section Header | Spectral | 18px | 500 | 27px | 0px | Section introductions, moderate emphasis |
| H3 / Subsection | Spectral | 22px | 300 | 33px | 0px | Content subsections, lighter weight |
| Body / Paragraph | Spectral | 16px | 200 | 28.8px | 0px | Main content, longest reads, airy feel |
| Button Text | Spectral | 15px | 500 | 22.5px | 0px | CTA labels, uppercase recommended |
| Link Text | Spectral | 12px | 200 | 21.6px | 0px | Navigation, footer links, secondary actions |
| Caption / Small | Spectral | 12.8px | 400 | 12.8px | 0px | Image captions, metadata, tertiary info |
| List Item | Spectral | 16px | 300 | 28.8px | 0px | Bulleted and numbered lists, body-aligned |
| Navigation Link | Spectral | 16px | 300 | 28.8px | 0px | Main nav items, header links |
| Icon / Span | FontAwesome | 12px | 400 | 12px | 0px | Icon fonts, decorative glyphs |

### Principles
- **Light weights (200–300) for body content** create an open, sophisticated reading experience; heavier weights (`500`–`700`) reserved for hierarchy and prominence
- **All headings use serif typography** to establish heritage and authority; serif conveys tradition and craftsmanship
- **Line height consistently generous** (1.5x–1.8x font size) supporting readability and luxury whitespace
- **No letter-spacing modifications** except where design explicitly requires tightening—default is zero for Spectral's natural rhythm
- **Body text always `16px` or larger** to support accessibility and screen legibility

## 4. Component Stylings

### Buttons

#### Primary CTA Button
- **Background:** `#AB4227` (Terracotta)
- **Text Color:** `#FFFFFF` (White)
- **Font:** Spectral, `15px`, weight `500`
- **Padding:** `8px 24px`
- **Border Radius:** `3px`
- **Border:** `1px solid #AB4227`
- **Line Height:** `22.5px`
- **Height:** `40.5px`
- **Hover State:** Background lightens to `#B7472A`, box-shadow `rgba(0, 0, 0, 0.2) 0px 2px 8px`
- **Active State:** Background darkens to `#8B3A20`, no shadow
- **Disabled State:** Background `#CCCCCC`, text `#808080`, cursor `not-allowed`

#### Secondary / Outlined Button
- **Background:** `rgba(0, 0, 0, 0)` (Transparent)
- **Text Color:** `#AB4227` (Terracotta)
- **Font:** Spectral, `16px`, weight `300`
- **Padding:** `0px 9px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Line Height:** `28.8px`
- **Height:** `36px`
- **Hover State:** Text color becomes `#8B3A20`, subtle underline `border-bottom: 1px solid #AB4227`
- **Active State:** Text color `#6B2F18`

#### Ghost / Minimal Button
- **Background:** `rgba(0, 0, 0, 0)` (Transparent)
- **Text Color:** `#808080` (Medium Gray)
- **Font:** Spectral, `16px`, weight `300`
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Line Height:** `28.8px`
- **Height:** `36px`
- **Hover State:** Text color `#212529`, slight scale `transform: scale(1.05)`
- **Active State:** Text color `#000000`

#### Footer / Collapsed Section Button
- **Background:** `rgba(0, 0, 0, 0)` (Transparent)
- **Text Color:** `#AB4227` (Terracotta)
- **Font:** Spectral, `13px`, weight `500`
- **Padding:** `20px`
- **Border Radius:** `0px 0px 3px 3px`
- **Border:** `0px none`
- **Line Height:** `23.4px`
- **Width:** `100%`
- **Hover State:** Background `rgba(171, 66, 39, 0.1)`, text remains `#AB4227`

### Cards & Containers

#### Product / Hero Card
- **Background:** `#FFFFFF` (White) or `#000000` (Dark overlay)
- **Padding:** `32px` (standard), `48px` (generous)
- **Border Radius:** `0px` (square) or `4px` (subtle)
- **Border:** `1px solid #CCCCCC` or none
- **Box Shadow:** `rgba(0, 0, 0, 0.41) 0px 10px 34px -20px` (subtle depth)
- **Text Color (light bg):** `#212529`
- **Text Color (dark bg):** `#FFFFFF`
- **Hover State:** Slight lift `transform: translateY(-2px)`, shadow deepens

#### Feature / Benefit Card
- **Background:** `#F5F4F0` (Warm off-white)
- **Padding:** `24px 32px`
- **Border Radius:** `4px`
- **Border:** none
- **Box Shadow:** none
- **Text Color:** `#212529`
- **Icon Color:** `#AB4227`
- **Hover State:** Background becomes `#FFFFFF`, light shadow `0px 4px 12px rgba(0, 0, 0, 0.08)`

#### Navigation / Header Container
- **Background:** Gradient from `#000000` (dark) to transparent, or solid `#FFFFFF`
- **Padding:** `16px 32px`
- **Height:** `73px` (standard)
- **Border:** `1px solid #CCCCCC` (on light backgrounds)
- **Box Shadow:** none (or subtle `0px 1px 3px rgba(0, 0, 0, 0.1)`)
- **Text Color:** `#212529` or `#FFFFFF` (context dependent)

### Inputs & Forms

#### Text Input / Textarea
- **Background:** `#FFFFFF` (White)
- **Text Color:** `#212529`
- **Padding:** `12px 16px`
- **Border:** `1px solid #CCCCCC`
- **Border Radius:** `4px`
- **Font:** Spectral, `16px`, weight `200`
- **Line Height:** `28.8px`
- **Focus State:** Border `1px solid #AB4227`, box-shadow `0px 0px 0px 3px rgba(171, 66, 39, 0.1)`
- **Error State:** Border `1px solid #B7472A`, background tint `rgba(183, 71, 42, 0.05)`
- **Placeholder Color:** `#808080` (Medium gray)

#### Select / Dropdown
- **Background:** `#FFFFFF`
- **Text Color:** `#212529`
- **Padding:** `12px 16px`
- **Border:** `1px solid #CCCCCC`
- **Border Radius:** `4px`
- **Font:** Spectral, `16px`, weight `200`
- **Focus State:** Border `1px solid #AB4227`
- **Open State:** Box shadow `rgba(0, 0, 0, 0.41) 0px 10px 34px -20px`

#### Checkbox / Radio
- **Size:** `18px × 18px`
- **Border:** `2px solid #CCCCCC`
- **Border Radius:** `0px` (checkbox) or `50%` (radio)
- **Checked Color:** `#AB4227`
- **Focus Outline:** `2px solid #AB4227` offset `2px`
- **Font (label):** Spectral, `16px`, weight `300`, color `#212529`

### Navigation

#### Primary Navigation Menu
- **Background:** `#FFFFFF` or `#000000` (hero dark overlay)
- **Text Color:** `#212529` (light bg) or `rgba(255, 255, 255, 0.7)` (dark bg)
- **Font:** Spectral, `16px`, weight `300`
- **Padding:** `0px` (inline), `16px 20px` (item)
- **Border Radius:** `0px`
- **Hover State:** Text color `#AB4227`, subtle underline or background `rgba(171, 66, 39, 0.1)`
- **Active State:** Text color `#AB4227`, underline or bottom border `2px solid #AB4227`

#### Footer Navigation / Links
- **Background:** `#000000` (dark footer) or `#F5F4F0` (light)
- **Text Color:** `rgba(255, 255, 255, 0.6)` (dark bg) or `#212529` (light bg)
- **Font:** Spectral, `12px`, weight `200`
- **Padding:** `0px`
- **Line Height:** `21.6px`
- **Hover State:** Color opacity increases to `rgba(255, 255, 255, 1)` or text becomes `#AB4227`

### Badges & Labels

#### Status Badge
- **Background:** `#AB4227` (Status color, varies by type)
- **Text Color:** `#FFFFFF`
- **Font:** Spectral, `12px`, weight `400`
- **Padding:** `4px 12px`
- **Border Radius:** `4px`
- **Display:** `inline-block`
- **Success Badge:** Background `#28A745`
- **Warning Badge:** Background `#FFC107`
- **Error Badge:** Background `#B7472A`

## 5. Layout Principles

### Spacing System
**Base Unit:** `8px`

**Scale:**
- `4px` — Micro spacing: icon-to-text gutters, tight component gaps
- `8px` — Extra-small: minor padding in compact components
- `16px` — Small: standard padding in buttons, form fields, list items
- `20px` — Small-medium: card padding, section margins
- `24px` — Medium: container padding, moderate separation
- `32px` — Medium-large: primary container padding, major section breaks
- `40px` — Large: section margins, significant vertical rhythm
- `48px` — Extra-large: prominent section padding, hero spacing
- `96px` — Double-large: between major sections or full-width containers
- `152px` — Extra-extra-large: dramatic vertical separation between distinct page regions

**Usage Context:**
- Headings to body text: `24px` (gutter)
- Body paragraph margins: `20px` bottom
- Card internal padding: `32px`
- Section padding (top/bottom): `48px` or `96px`
- Horizontal page padding: `32px` (mobile: `16px`)

### Grid & Container
- **Max Width:** `1440px` (full viewport width on web)
- **Column Strategy:** Flexible, responsive grid from `12-column` on desktop to `1-column` mobile
- **Container Padding:** `32px` horizontal on desktop, `16px` on tablet, `12px` on mobile
- **Section Pattern:** Full-width sections with `.container` inner max-width constraint
- **Hero Layout:** Full-bleed background image with centered text overlay, padding `96px` vertical

### Whitespace Philosophy
The system embraces generous whitespace as a design element, not wasted space. Every layout section receives substantial breathing room—minimum `24px` margins between distinct content blocks. Whitespace around text creates visual hierarchy and luxury perception. Images are surrounded by negative space to emphasize product presentation. Empty space is as important as content, reinforcing the premium, unhurried aesthetic.

### Border Radius Scale
- **`0px`** — Sharp corners; all primary buttons, text inputs, select elements, large containers (classical, traditional feel)
- **`3px`** — Subtle softness; secondary buttons, collapsed sections, refined modern edges
- **`4px`** — Light rounding; form inputs (focused state), cards with minimal depth
- **`50%`** — Circles; avatar images, icon buttons, circular badge indicators

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| None | Flat, no shadow | Navigation items, text links, flat cards on branded backgrounds |
| Subtle | `rgba(0, 0, 0, 0.08) 0px 1px 3px` | Hover state on secondary buttons, very light card lift |
| Standard | `rgba(0, 0, 0, 0.41) 0px 10px 34px -20px` | Dropdown menus, modal overlays, featured cards |
| Elevated | `rgba(0, 0, 0, 0.2) 0px 4px 12px` | Active modals, floating action buttons, prominent hero cards |
| Deep | `rgba(0, 0, 0, 0.3) 0px 8px 20px` | Maximally prominent overlays, full-screen modals |

**Shadow Philosophy:**
Shadows are used sparingly and purposefully to indicate clickability, layering, or prominence. The primary shadow value `rgba(0, 0, 0, 0.41) 0px 10px 34px -20px` creates a refined, diffuse depth suggesting elevation without harshness. Shadows rarely appear on static text or primary navigation—they reserve depth for interactive and elevated UI elements. Dark backgrounds naturally reduce visible shadows; light backgrounds show subtle shadows for dimensional clarity.

## 7. Do's and Don'ts

### Do
- **Do use Spectral serif font for all headings and copy** — it establishes heritage and sophistication essential to the brand
- **Do maintain minimum `16px` font size for body text** — supports legibility and premium feel
- **Do pair `#AB4227` (Terracotta) CTAs with ample whitespace** — allows the warmth to stand out
- **Do stack sections vertically with `48px` to `96px` margins** — creates natural reading rhythm
- **Do use full-bleed hero imagery with dark overlay** — product photography is a hero element
- **Do apply `border-radius: 3px` to all interactive buttons** — maintains refined, non-aggressive appearance
- **Do prioritize contrast ratios above `7:1` on white backgrounds** for WCAG AAA compliance
- **Do use icon and image-driven visual storytelling** — let photography do the work before copy
- **Do nest whitespace intentionally around typography** — space = luxury and clarity

### Don't
- **Don't use bright, neon colors or high-saturation accents** — violates premium positioning
- **Don't apply shadows to navigation or text-only elements** — reserves depth for interactive UI
- **Don't set font weights below `200` for any text smaller than `16px`** — creates readability issues
- **Don't mix serif and sans-serif typefaces arbitrarily** — use Spectral consistently, FontAwesome only for icons
- **Don't cram sections with padding less than `24px`** — breaks luxury whitespace principle
- **Don't use rounded corners above `4px` for form inputs** — maintains refined, tailored aesthetic
- **Don't apply more than two shadow levels in a single view** — creates visual noise and confusion
- **Don't exceed two accent colors in any single section** — dilutes brand cohesion
- **Don't use all-caps text except in specific brand logos or taglines** — defaults to sentence case for elegance
- **Don't omit focus states on interactive elements** — accessibility and keyboard navigation are non-negotiable

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|---|
| Mobile | `< 576px` | 1-column layout, `16px` padding, hero text `40px`, nav collapses to menu icon, cards stack vertically |
| Tablet | `576px – 991px` | 2-column layout, `24px` padding, hero text `60px`, nav items reduce font to `14px`, cards in 2×2 grid |
| Desktop | `992px – 1439px` | 3-column layout, `32px` padding, hero text `80px`, full nav display, cards in optimized grid |
| Large Desktop | `≥ 1440px` | Max-width container `1440px` centered, consistent spacing, full feature set |

### Touch Targets
- **Minimum size:** `44px × 44px` for all interactive elements (buttons, links, form controls)
- **Recommended size:** `48px × 48px` for mobile buttons
- **Spacing between targets:** Minimum `8px` (preferably `12px`) to prevent accidental clicks
- **Icon buttons:** `40px × 40px` minimum on mobile, `36px × 36px` on desktop
- **Form inputs:** Minimum height `44px` on mobile, `40px` on desktop with comfortable padding

### Collapsing Strategy
- **Hero Section:** Full-viewport height on desktop (`96px` top/bottom padding); collapses to `400px` on tablet, `300px` on mobile with increased text size reduction
- **Navigation:** Full horizontal menu on desktop; collapses to hamburger menu at `768px` breakpoint
- **Grid Layouts:** 3-column on desktop → 2-column at `992px` → 1-column at `576px`
- **Imagery:** Full-width product images on desktop; constrained to `80vw` on tablet, `100vw` on mobile
- **Padding:** `32px` horizontal on desktop → `24px` on tablet → `16px` on mobile
- **Typography:** Hero `80px` desktop → `60px` tablet → `40px` mobile; body remains `16px` minimum
- **Spacing Reduction:** All vertical margins reduce by `25%–50%` on mobile to accommodate limited real estate

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA Button:** Burnt Sienna (`#AB4227`)
- **Primary Button Hover:** Deeper Clay (`#B7472A`)
- **Primary Text / Headings:** Dark Charcoal (`#212529`)
- **Body Text:** Dark Charcoal (`#212529`) or Medium Gray (`#808080`)
- **Background (Light):** Off-White (`#FFFFFF`)
- **Background (Dark Hero):** Near Black (`#000000`)
- **Navigation Links (Dark BG):** White at `60%` opacity (`rgba(255, 255, 255, 0.6)`)
- **Links (Light BG):** Burnt Sienna (`#AB4227`)
- **Error / Danger:** Deep Clay (`#B7472A`)
- **Success:** Success Green (`#28A745`)
- **Accent Warmth:** Terracotta (`#A23F25`)
- **Borders / Dividers:** Light Gray (`#CCCCCC`)
- **Disabled / Placeholder:** Medium Gray (`#808080`)

### Iteration Guide
1. **All typography uses Spectral serif family** — fallback to Georgia. No sans-serif except FontAwesome icons. Weights: `200` (body), `300` (navigation), `400` (small/captions), `500` (buttons/H2), `700` (display/H1).
2. **Body text is always minimum `16px`** with `line-height: 28.8px` (1.8x). Headings scale up but never go below `200` weight.
3. **Primary CTA buttons are `#AB4227` background, `#FFFFFF` text, `15px` weight `500`, padding `8px 24px`, radius `3px`**, with hover state darkening to `#B7472A`.
4. **Spacing uses `8px` base unit:** `16px` (small), `24px` (medium), `32px` (card padding), `48px` (section padding), `96px` (major breaks). Never collapse below `16px` on mobile—use `12px` only for micro-interactions.
5. **All interactive elements have a defined hover state** with color shift or subtle shadow lift. Buttons darken, links underline or change color to Terracotta.
6. **Form inputs: `#FFFFFF` background, `#212529` text, `1px solid #CCCCCC` border, `border-radius: 4px`, focus state border `#AB4227` with light shadow**.
7. **Navigation is dark (`#000000`) hero overlay or light (`#FFFFFF`) standard header**. Links are `#AB4227` on light, `rgba(255, 255, 255, 0.7)` on dark, hover to full opacity or Terracotta.
8. **Cards and containers use subtle shadow `rgba(0, 0, 0, 0.41) 0px 10px 34px -20px`** on featured elements only. Flat cards on colored backgrounds. All card padding minimum `24px` (internal).
9. **Hero sections are full-bleed backgrounds (photography or dark overlay) with centered text**, padding `96px` vertical on desktop, `48px` on mobile. Text color: `#FFFFFF` on dark, `#212529` on light.
10. **Responsive breakpoints: mobile `< 576px` (1 column, `16px` padding), tablet `576–991px` (2 columns, `24px` padding), desktop `992px+` (3+ columns, `32px` padding)**. All text sizes and spacing reduce proportionally on mobile (hero `40px`, body stays `16px`).