---
name: Serene Skin Aesthetics
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#48464b'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#79767c'
  outline-variant: '#cac5cb'
  surface-tint: '#615c67'
  primary: '#615c67'
  on-primary: '#ffffff'
  primary-container: '#eae3f0'
  on-primary-container: '#69646f'
  inverse-primary: '#cac4d1'
  secondary: '#605e5c'
  on-secondary: '#ffffff'
  secondary-container: '#e6e2df'
  on-secondary-container: '#666462'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#e6e6e6'
  on-tertiary-container: '#656767'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e7e0ed'
  primary-fixed-dim: '#cac4d1'
  on-primary-fixed: '#1d1a23'
  on-primary-fixed-variant: '#49454f'
  secondary-fixed: '#e6e2df'
  secondary-fixed-dim: '#cac6c3'
  on-secondary-fixed: '#1c1b1a'
  on-secondary-fixed-variant: '#484644'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-nav:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  caption:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-page: 1.25rem
  gutter-grid: 0.75rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
---

## Brand & Style

The design system is centered on the intersection of medical professionalism and high-end wellness. It aims to evoke a sense of calm, trust, and cleanliness, catering to a premium audience seeking expert cosmetology services. 

The aesthetic style is **Modern Corporate with Soft Minimalism**. It utilizes heavy whitespace and a restricted, warm palette to create a "spa-like" digital environment. Visual hierarchy is achieved through scale and subtle tonal shifts rather than aggressive colors. The overall mood is "Radiant and Clinical," using soft-focus imagery and translucent glass layers to mirror the desired outcome of the treatments: glowing, healthy skin.

## Colors

This design system uses a low-contrast, sophisticated palette to maintain a premium feel. 

- **Primary (Lavender):** Used as a secondary container color for active categories or highlights.
- **Secondary (Beige):** The primary background color. It provides more warmth and luxury than a clinical pure white.
- **Surface (White):** Used for elevated cards and high-priority content to create a crisp "clean" look against the beige background.
- **Text:** Headlines use a deep charcoal/black for maximum legibility. Secondary text and captions use a neutral gray to maintain a soft visual balance.

## Typography

The design system utilizes **Manrope** for its balanced, modern, and professional characteristics. It bridges the gap between a clinical geometric sans and a warm humanist face.

Headlines are tight and bold to command attention on service names. Navigation labels are kept small (12-13px) to align with iOS native patterns while maintaining a high-fashion editorial look. Line heights are generous in body text to ensure readability and a "breathing" layout.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid** model optimized for mobile. It uses a standard 12-column grid system internally, but adheres to a strict 20px (1.25rem) side margin for all primary content.

- **Grid:** A 2-column grid is the standard for service listings to maximize visual intake of photography.
- **Service Cards:** Fixed at 84px height for list-view density.
- **Consultation Banners:** Full width with a fixed 170px height to act as a primary call to action.
- **Safe Areas:** Navigation and status bars respect standard iOS safe area insets, with backdrop blurs applied to headers and tab bars for depth.

## Elevation & Depth

Visual hierarchy is communicated through **Tonal Layering** and **Glassmorphism**. 

- **Level 0:** Light Beige (#FDF8F5) serves as the canvas.
- **Level 1:** Pure White cards or Lavender containers used for secondary groupings. 
- **Shadows:** Use extremely soft, high-diffusion shadows (Blur: 20px, Opacity: 4%, Color: #000) to create a sense of light "resting" on the surface rather than floating.
- **Blur:** Bottom navigation bars and top headers use a `backdrop-filter: blur(20px)` with a semi-transparent white tint to provide a premium iOS feel.

## Shapes

The design system embraces **Large, Organic Radii** to evoke a friendly and approachable personality.

- **Cards:** 22px corner radius for standard service and informational cards.
- **Banners/Nav:** 28px for primary hero elements and the bottom navigation container.
- **Buttons:** Fully pill-shaped (radius: 999px) for primary actions to distinguish them from informational containers.
- **Images:** All imagery must share the corner radius of its parent container for a cohesive, "nested" look.

## Components

### Buttons
Primary buttons are pill-shaped with a pure white background and dark text. Secondary buttons use a ghost style with a subtle lavender border.

### Service Cards
- **Horizontal:** 84px height, featuring a square thumbnail (radius 12px) on the left, followed by the title and a small "arrow" icon on the right.
- **Grid Cards:** 250px height. The top 65% of the card is reserved for high-quality imagery. The bottom 35% contains a lavender-tinted label area for the service title and price.

### Input Fields
Soft beige backgrounds that are slightly darker than the page background to create a "recessed" feel. Minimalist iconography.

### Tab Bar
A floating or edge-to-edge bar with a high-strength backdrop blur. Icons are thin-stroke (1.5px) with text labels in 12px Manrope.

### Consultation Banner
A high-impact 170px element using a lavender background with a cut-out or masked professional image on the right, providing a clear "Book Now" path.