---
name: Roadstead Motors
description: Car dealership inventory platform — browse, search, and manage the lot.
colors:
  graphite-950: "#13151A"
  graphite-900: "#1B1E24"
  graphite-800: "#252932"
  graphite-700: "#333846"
  graphite-600: "#454C5C"
  cream: "#F3F0E9"
  amber-400: "#F0B65C"
  amber-500: "#E3A143"
  amber-600: "#C4832B"
  moss: "#6FA787"
  moss-light: "#1E2A24"
  rust: "#C4574A"
  rust-light: "#2C1E1C"
  chrome: "#5B7A99"
  chrome-light: "#1E262F"
  border: "rgba(243,240,233,0.10)"
  nav-bg: "rgba(27,30,36,0.92)"
  amber-rgb: "227, 161, 67"
  moss-rgb: "111, 167, 135"
  rust-rgb: "196, 87, 74"
  chrome-rgb: "91, 122, 153"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(40px, 5.5vw, 80px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "0.01em"
    textTransform: uppercase
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(28px, 3.5vw, 44px)"
    fontWeight: 600
    lineHeight: 1.05
    textTransform: uppercase
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: 20
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: 15
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: 11
    fontWeight: 600
    letterSpacing: "0.14em"
    textTransform: uppercase
rounded:
  sm: 4px
  md: 6px
  lg: 10px
  xl: 14px
  full: 50%
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 56px
  container: 1152px
components:
  button-primary:
    backgroundColor: "{colors.amber-500}"
    textColor: "{colors.graphite-950}"
    rounded: "{rounded.sm}"
    padding: "10px 24px"
    typography: "title"
    fontWeight: 600
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.cream}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    border: "1px solid {colors.border}"
    typography: "body"
    fontWeight: 500
  card-default:
    backgroundColor: "{colors.graphite-900}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
    border: "1px solid {colors.border}"
  input-default:
    backgroundColor: "{colors.graphite-800}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
    border: "1px solid {colors.border}"
    typography: "body"
    fontSize: 14
---

# Design System: Roadstead Motors

## 1. Overview

**Creative North Star: "The Showroom Floor"**

Roadstead's design language is the dealership floor after closing — halogen light on painted steel, a clipboard-and-spec-sheet clarity to how each vehicle is presented. The graphite backdrop is deliberately dark and slightly cool, like polished concrete under showroom lighting, never the near-black-with-a-single-neon-accent look that reads as generic dashboard chrome. Against it, a single amber accent does the work of halogen bulbs: it's what your eye is drawn to, and nothing else competes with it.

This is a system built for scanning inventory fast — a buyer or an admin should be able to read stock status, price, and category at a glance, the way you'd read a window sticker. Condensed, uppercase display type gives every heading and badge the feel of dealership signage; body copy stays quiet and legible underneath it. Every element answers one question: does this help someone assess a vehicle faster?

**Key Characteristics:**
- Showroom-dark: graphite is cool and deliberate, not a generic "AI dark mode" near-black
- Signage typography: condensed uppercase (Barlow Condensed) for headings, labels, and badges; a plain grotesk (Inter) for body and data
- Single-voice accent: amber is the only warm, saturated color — used sparingly, for action and price
- Status-coded, not decorative: moss (in stock), rust (sold out / destructive), chrome (informational / admin) each map to one meaning only
- Flat until touched: cards and buttons sit still at rest; borders do the separating, not shadows

## 2. Colors: The Showroom Palette

Dark neutrals carry almost the whole interface. Amber is spent deliberately — on price, on primary actions, on nothing else.

### Primary

- **Amber** (#E3A143 / oklch(74% 0.13 70)): The single voice. Primary buttons, price display, active nav links, focus rings. Used on price because price is the one number every visitor scans for first. Kept off backgrounds, borders, and decorative fills — its rarity is what makes it read as "halogen light," not wallpaper.

### Secondary — status-coded, one meaning each

- **Moss** (#6FA787 / oklch(68% 0.06 155)): In-stock, success, confirmed purchase. Never reused for anything else, so a green badge is always unambiguously good news.
- **Rust** (#C4574A / oklch(58% 0.13 30)): Sold out, low stock warning, destructive actions (delete). The one color that means "pay attention here."
- **Chrome** (#5B7A99 / oklch(60% 0.06 240)): Structural/informational — admin badges, completed-order states, metadata callouts. The cool, quiet counterpoint that never competes with amber.

### Neutral

- **Graphite 950 → 600**: A five-step dark scale from page background (950) up through card surface (900), raised surface (800), borders/dividers (700), to secondary text (600). Each step is a deliberate value, not an opacity trick on one gray.
- **Cream** (#F3F0E9): Primary text on dark surfaces. Warm off-white, not pure white — keeps long specs sheets and descriptions easy on the eye.
- **Border** (rgba(243,240,233,0.10)): Faint, translucent separation between surfaces. Never a hard line.

### Named Rules

**The One-Bulb Rule.** Amber appears in exactly one role per screen at a time — action or price, never both competing for attention in the same glance. A page with an amber button and amber price nearby is fine; an amber badge, amber border, and amber button stacked together is not.

**The Status-Lock Rule.** Moss, rust, and chrome are locked to their single meaning (trust/success, alert/destructive, informational) across the entire app. Never borrow rust for a "featured" badge because it "looks good" — if it doesn't mean "stop and look," it isn't rust.

**The Concrete-Not-Void Rule.** Graphite 950 is a cool, deliberate dark — not pure black. Pure black backgrounds read as an empty void; this palette should read as a lit room at night.

## 3. Typography

**Display/Heading Font:** Barlow Condensed
**Body Font:** Inter
**Label Font:** Barlow Condensed (uppercase, tracked)

**Character:** Condensed uppercase type is the signage language of the app — it's how a dealership actually letters its price boards and category tags, so headings, plate-style badges, and buttons all borrow that voice. Inter carries everything that needs to be read at length or scanned as data: descriptions, form labels, table values. The two fonts don't blend into each other — the switch between them is itself a signal of "signage" vs. "detail."

### Hierarchy

- **Display** (600, clamp(40–80px), 0.98 line-height, uppercase): Page-level hero heading only ("Inventory"). One per page.
- **Headline** (600, clamp(28–44px), uppercase): Section headers, modal titles.
- **Title** (600, 20px, Inter): Vehicle names (make + model), card headings — deliberately in the body face, not condensed, since these are the specific facts a buyer is scanning for.
- **Body** (400, 15px, 1.65 line-height, Inter): Descriptions, form text, table values. Capped at ~70ch.
- **Label** (600, 11px, 0.14em tracking, uppercase, Barlow Condensed): Category badges, stock-status text, form field labels, button text — the "signage" register.

### Named Rules

**The Signage-vs-Spec Split.** Barlow Condensed is reserved for things that behave like signage (headings, badges, buttons, labels) — never for vehicle names, descriptions, or anything a user needs to read multiple words of quickly. Vehicle make/model stays in Inter Title weight so it's legible at a glance, not stylized.

**The Price Weight Rule.** Price is always the largest, most amber element on a vehicle card — larger than the make/model title. It is the one place font size itself carries semantic priority.

## 4. Elevation

Flat by default, on the theory that a lot full of identical-looking cards should be told apart by content (make, price, stock) rather than by depth effects. Depth is reserved for things that are actually floating above the page — modals, dropdowns.

### Shadow Vocabulary

- **Ambient Low** (0 4px 24px rgba(0,0,0,0.35)): Modal panels, dropdown menus. Soft and dark, tuned for a dark background (a light-mode shadow recipe looks washed out on graphite).
- **Border-Only** (no shadow, 1px border): The default state for every card. Hover lightens the border from graphite-700 to graphite-600 rather than adding a shadow — depth cues on a dark background read better as a lit edge than as a cast shadow.

### Named Rules

**The Border-Not-Glow Rule.** Interactive feedback on dark surfaces is a border/background shift, not a glow or shadow — shadows barely read against graphite-950 and end up looking like a rendering bug rather than a deliberate effect.

## 5. Components

### Buttons

- **Shape:** 4px radius (sm) — square enough to feel like a control panel, not a pill.
- **Primary (Amber):** graphite-950 text on amber-500 background, 10px/24px padding, Inter title weight. Hover: amber-400 (lighter, not darker — dark UIs read "brighter = active"). Disabled: graphite-700 background, graphite-600 text, `cursor: not-allowed`.
- **Ghost:** Transparent, 1px graphite-700 border, cream text. Hover: border and text both shift to amber-400.
- **Destructive:** Transparent, 1px rust/40 border, rust text. Hover: rust/10 background fill. Reserved for delete only — never for "cancel" or neutral dismissal.

**States:** 0.2s transition on border/background/color. Focus-visible: 2px amber-400 outline, 2px offset.

### Cards (Vehicle / Window Sticker)

- **Corner Style:** 6px radius (md) — enough to soften, not enough to feel playful.
- **Background:** graphite-900 on graphite-950 canvas.
- **Border:** 1px graphite-700, lightens to graphite-600 on hover. No shadow at any state.
- **Anatomy:** category plate-badge (top-left) + stock-status text (top-right, moss/amber/rust by quantity) → make+model title → amber price → action row (purchase button, then admin-only edit/restock/delete).
- **Padding:** 20px (sm+).

### Inputs / Fields

- **Style:** 1px graphite-700 border, graphite-800 background, 4px radius.
- **Focus:** Border shifts to amber-500. No glow ring — consistent with the border-not-glow rule.
- **Labels:** Always the Label typographic style (uppercase, tracked, graphite-600) positioned above the field, never as placeholder-only text.

### Navigation

- **Top Nav:** graphite-900 background, 1px graphite-700 bottom border, fixed. Wordmark in Display-adjacent condensed caps with amber "Roadstead" / muted "Motors" two-tone treatment. Admin badge (chrome-bordered) sits next to the user's name when applicable.

### Chips / Badges (Plate-Style)

- **Category badge:** graphite-800 background, 1px graphite-600 border, Label typography, graphite-600 text. Modeled on a spec-sheet category tag, not a colorful pill — category is inventory metadata, not a status.
- **Stock-status text:** No background/border, just colored text (moss / amber / rust) at small size — status is read, not badged, to avoid competing with the category plate for visual weight.

### Modals

- **Structure:** Fixed overlay, black/60 backdrop, graphite-900 panel, 1px graphite-700 border, 6px radius, 24px padding, max-width 28rem.
- **Title:** Headline typography in amber.
- **Close/Cancel:** Ghost button; primary action (Save) is the only amber element in the modal, matching the one-bulb rule.

### Toggle / Confirm Actions

- Destructive actions (delete) use a native `confirm()` step rather than a custom toggle component — for an admin tool this size, a plain confirmation is more trustworthy than a stylized one that could be misclicked.

## 6. Do's and Don'ts

### Do:
- **Do** treat amber as the single accent — one role (action or price) per screen at a time.
- **Do** keep moss/rust/chrome locked to their one meaning each: trust, alert, informational.
- **Do** use Barlow Condensed only for signage-register elements (headings, badges, buttons, labels) — never for vehicle names or long text.
- **Do** make price the visually dominant number on every vehicle card.
- **Do** keep cards flat with a border; use border-lightening, not shadow, as the hover cue on dark surfaces.
- **Do** cap body/description text at ~70ch and keep it in Inter at 15px/1.65.

### Don't:
- **Don't** use pure black (#000) for the background — graphite-950 is a deliberate cool dark, not a void.
- **Don't** apply amber to more than one element type at once (e.g. an amber badge next to an amber button next to amber-bordered card) — it dilutes the "halogen spotlight" effect.
- **Don't** add drop shadows tuned for light backgrounds — they read as visual noise on graphite; use the border-based hover cue instead.
- **Don't** turn the category badge into a colored pill — it's inventory metadata (spec-sheet register), not a status indicator; only stock-status text gets color.
- **Don't** use tiny uppercase eyebrow labels above every section as decoration — reserve Label typography for things that are actually metadata (stock count, category, form field names).
- **Don't** round cards or buttons past 10px — the showroom identity is squared-off and utilitarian, not soft.
- **Don't** introduce a fifth accent color for a one-off badge — extend the semantic meaning of an existing one, or reconsider whether that state needs color at all.