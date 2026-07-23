# Design System: LuxeDrive Motors

> **Creative North Star:** *"Luxury Automotive Marketplace."*

LuxeDrive is inspired by premium automotive brands such as **Mercedes-Benz, BMW, Porsche, Audi, and Tesla**. The experience should feel like stepping into a luxury dealership—clean, spacious, elegant, and effortless.

The website is **image-first**, **minimal**, and **premium**, allowing vehicles to be the center of attention while typography and whitespace provide hierarchy.

---

# 1. Design Principles

## Photography First

Vehicle photography is the hero of the interface.

- Images should dominate every landing page.
- Cards should always showcase high-quality vehicle images.
- Images are the product—not decoration.

---

## Minimal Luxury

Luxury comes from simplicity.

Avoid visual clutter.

Instead, focus on:

- Generous whitespace
- Beautiful typography
- Consistent spacing
- Clean layouts
- Elegant imagery

---

## Soft Geometry

The UI should feel modern and approachable.

Use:

- Rounded cards
- Rounded buttons
- Soft shadows
- Comfortable spacing

Avoid sharp corners and overly aggressive styling.

---

## Calm Interface

The interface should never feel busy.

Every section should breathe.

Each component should have a clear purpose.

---

# 2. Color System

## Neutral Palette

| Token | Color |
|--------|--------|
| Background | `#FFFFFF` |
| Surface | `#FAFAFA` |
| Card | `#FFFFFF` |
| Primary Text | `#18181B` |
| Secondary Text | `#6B7280` |
| Muted Text | `#9CA3AF` |
| Border | `#E5E7EB` |
| Divider | `#F3F4F6` |

---

## Brand Colors

| Token | Color |
|--------|--------|
| Primary | `#111111` |
| Hover | `#27272A` |
| Active | `#000000` |
| White | `#FFFFFF` |

---

## Semantic Colors

| State | Color |
|--------|--------|
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Error | `#EF4444` |
| Information | `#3B82F6` |

---

## Color Rules

✅ Use grayscale throughout the interface.

✅ Use accent colors only when necessary.

✅ White space should create hierarchy instead of colorful backgrounds.

❌ Avoid gradients.

❌ Avoid colorful sections.

---

# 3. Typography

## Font Family

### Headings

**Manrope**

Fallback:

```
Inter, sans-serif
```

---

### Body

**Inter**

Fallback:

```
sans-serif
```

---

## Typography Scale

| Style | Size | Weight |
|--------|------|---------|
| Display | 64px | 700 |
| H1 | 48px | 700 |
| H2 | 36px | 700 |
| H3 | 28px | 600 |
| Card Title | 22px | 600 |
| Body Large | 18px | 400 |
| Body | 16px | 400 |
| Small | 14px | 400 |
| Caption | 12px | 500 |

---

# 4. Layout

## Container

```
1280px
```

Maximum width

```
1440px
```

---

## Spacing Scale

```
4
8
12
16
24
32
48
64
96
120
```

Use generous vertical spacing between sections.

---

# 5. Border Radius

| Token | Value |
|--------|-------|
| Small | 10px |
| Medium | 16px |
| Large | 24px |
| XL | 32px |
| Pill | 999px |

---

# 6. Shadows

### Card

```css
0 10px 30px rgba(0,0,0,.04)
```

---

### Hover

```css
0 18px 40px rgba(0,0,0,.08)
```

---

### Modal

```css
0 24px 60px rgba(0,0,0,.12)
```

Shadows should remain subtle.

---

# 7. Buttons

## Primary Button

Background

```
#111111
```

Text

```
White
```

Height

```
48px
```

Border Radius

```
999px
```

Hover

```
#27272A
```

---

## Secondary Button

Background

```
White
```

Border

```
1px solid #E5E7EB
```

Text

```
#18181B
```

Hover

```
#F5F5F5
```

---

## Danger Button

Background

```
#EF4444
```

Text

```
White
```

---

Transition

```
200ms ease
```

---

# 8. Navigation

- Transparent over hero section
- Turns white after scrolling
- Logo aligned left
- Navigation centered
- Authentication buttons aligned right
- Height: **80px**

---

# 9. Hero Section

The homepage hero should include:

- Full-width luxury vehicle image
- Vehicle title
- Vehicle price
- Call-to-action button
- Floating search card

Recommended height

```
720px
```

---

# 10. Search Card

The search panel floats above the hero image.

Contains:

- Vehicle Type
- Condition
- Brand
- Price Range
- Search Button

Style:

- White background
- Rounded corners
- Soft shadow

---

# 11. Vehicle Cards

Structure

```
Vehicle Image

↓

Vehicle Name

↓

Year • Fuel • Transmission

↓

Price

↓

Location

↓

Purchase Button
```

---

Card Specifications

Image Ratio

```
16:10
```

Border Radius

```
20px
```

Padding

```
20px
```

Hover Animation

- Lift slightly
- Image zoom
- Shadow increase

---

# 12. Category Cards

Each category card contains:

- Large image
- Category title
- CTA button

Hover:

- Image zoom
- Slight elevation

---

# 13. Brand Section

Display manufacturer logos in a clean grid.

Examples:

- BMW
- Audi
- Mercedes-Benz
- Porsche
- Volkswagen
- Tesla

Rules:

- Equal spacing
- No borders
- Subtle hover opacity

---

# 14. Forms

Use large comfortable inputs.

Specifications

Height

```
48px
```

Border Radius

```
16px
```

Border

```
1px solid #E5E7EB
```

Focused Border

```
#111111
```

Support

- Image Upload
- Drag & Drop
- Image Preview
- Validation Messages

---

# 15. Vehicle Management

Admin should be able to:

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- Restock Vehicle
- Upload Image
- Replace Image
- Remove Image

Changes should preview instantly.

---

# 16. Tables

Tables are used only in the Admin Dashboard.

Features:

- Rounded container
- Sticky header
- Minimal borders
- Row hover highlight
- Responsive scrolling

---

# 17. Icons

Library

```
Lucide React
```

Style

- Outline icons
- 20px default
- Consistent stroke width

---

# 18. Images

Images should be:

- High resolution
- Rounded corners
- Lazy loaded
- `object-cover`
- Optimized for performance

Every vehicle must have a featured image.

---

# 19. Motion

Use **Framer Motion**.

Allowed animations:

- Fade In
- Fade Up
- Scale
- Slide

Duration

```
0.3s
```

Easing

```
easeOut
```

Hover Effects

- Card Lift
- Image Zoom
- Button Scale

Avoid excessive animation.

---

# 20. Responsive Design

## Desktop

```
1440px+
```

## Laptop

```
1280px
```

## Tablet

```
768px
```

## Mobile

```
390px
```

Responsive Rules

- Navigation becomes drawer
- Cards stack vertically
- Hero search panel becomes full width
- Images remain dominant

---

# 21. Accessibility

- WCAG AA contrast
- Keyboard navigation
- Visible focus states
- Semantic HTML
- Alt text for all images

---

# 22. Core Components

- Navbar
- Hero
- Search Card
- Vehicle Card
- Category Card
- Brand Grid
- Featured Listings
- Why Choose Us
- Testimonials
- CTA Banner
- Footer
- Login Form
- Register Form
- Dashboard Layout
- Vehicle Table
- Vehicle Form
- Image Upload
- Delete Dialog
- Pagination
- Search Filters
- Toast Notifications
- Loading Skeleton
- Empty State
- 404 Page

---

# 23. Design Rules

## ✅ Do

- Prioritize photography.
- Use generous whitespace.
- Keep layouts clean.
- Maintain consistent spacing.
- Use rounded corners.
- Keep typography elegant.
- Use subtle shadows.
- Focus attention through layout instead of color.

---

## ❌ Don't

- Don't use gradients.
- Don't use glassmorphism.
- Don't use neon colors.
- Don't overcrowd sections.
- Don't overuse animations.
- Don't use tiny cards.
- Don't use dashboard widgets on the customer homepage.
- Don't introduce unnecessary accent colors.

---

# Final Design Statement

LuxeDrive should feel like browsing vehicles in a premium automotive marketplace rather than managing inventory in enterprise software.

Every page should communicate:

- Luxury
- Trust
- Simplicity
- Premium craftsmanship

through photography, typography, spacing, and restraint.