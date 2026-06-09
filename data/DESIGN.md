---
name: Midnight Forest
colors:
  surface: '#0b141c'
  surface-dim: '#0b141c'
  surface-bright: '#313a43'
  surface-container-lowest: '#060f17'
  surface-container-low: '#131d24'
  surface-container: '#172129'
  surface-container-high: '#212b33'
  surface-container-highest: '#2c363e'
  on-surface: '#dae4ef'
  on-surface-variant: '#c2cab0'
  inverse-surface: '#dae4ef'
  inverse-on-surface: '#28313a'
  outline: '#8c947c'
  outline-variant: '#424936'
  surface-tint: '#98da27'
  primary: '#ccff80'
  on-primary: '#213600'
  primary-container: '#a3e635'
  on-primary-container: '#416400'
  inverse-primary: '#446900'
  secondary: '#bdc7dc'
  on-secondary: '#273141'
  secondary-container: '#3d4759'
  on-secondary-container: '#abb5cb'
  tertiary: '#dbf5e2'
  on-tertiary: '#203529'
  tertiary-container: '#bfd8c6'
  on-tertiary-container: '#495f51'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b2f746'
  primary-fixed-dim: '#98da27'
  on-primary-fixed: '#121f00'
  on-primary-fixed-variant: '#334f00'
  secondary-fixed: '#d9e3f9'
  secondary-fixed-dim: '#bdc7dc'
  on-secondary-fixed: '#121c2c'
  on-secondary-fixed-variant: '#3d4759'
  tertiary-fixed: '#d0e9d6'
  tertiary-fixed-dim: '#b4ccbb'
  on-tertiary-fixed: '#0a2014'
  on-tertiary-fixed-variant: '#364c3e'
  background: '#0b141c'
  on-background: '#dae4ef'
  surface-variant: '#2c363e'
typography:
  display-lg:
    fontFamily: Anybody
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  stats-xl:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '900'
    lineHeight: 40px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
This design system embodies a "High Energy Sports Tech" aesthetic. It is designed for performance tracking, athletic data visualization, and modern fitness platforms. The brand personality is intense, focused, and premium. 

The style utilizes a **Modern-Corporate** framework infused with **High-Contrast** accents. It rejects the sterility of pure black and white in favor of a deep, atmospheric "Midnight Forest" base. The visual language relies on sharp execution, technical precision, and a high-octane color pop to drive user action and highlight critical performance metrics. The emotional response should be one of "readiness" and "biological optimization."

## Colors
The palette follows a strict 60-30-10 distribution to maintain visual hierarchy in a dark environment:
- **Primary (10%): Electric Lime (#A3E635).** Used exclusively for primary Call-to-Actions, progress indicators, and critical data peaks. It provides the "high energy" spark against the dark backdrop.
- **Secondary/Container (30%): Slate Charcoal (#2D3748).** Used for cards, navigation bars, and input fields. This provides a subtle lift from the background.
- **Surface/Background (60%): Deep Forest (#1A2F23).** The foundational layer. It provides a rich, organic depth that feels more sophisticated than pure black.
- **Accents & Text:** Use off-whites (Slate 50/100) for readability. Pure white is avoided to reduce eye strain and maintain the atmospheric mood.

## Typography
The typography strategy blends aggressive display faces with technical precision:
- **Display & Headlines:** *Anybody* provides a variable, high-energy feel. Its bold and extra-bold weights are used for motivation and key headers.
- **Body:** *Hanken Grotesk* offers a clean, contemporary grotesque look that ensures high readability for training logs and descriptions.
- **Data & Labels:** *JetBrains Mono* is used for all technical data points, timestamps, and metrics (BPM, Pace, Watts) to evoke a "tech-heavy" performance instrument feel. 
- **Styling:** Use Italics for "Stats-XL" roles to imply speed and forward motion.

## Layout & Spacing
The layout uses a **Fluid Grid** system with a technical, rhythmic spacing scale based on an 8px root.
- **Desktop:** 12-column grid, 24px gutters, 48px side margins.
- **Tablet:** 8-column grid, 24px gutters, 32px side margins.
- **Mobile:** 4-column grid, 16px gutters, 20px side margins.

Content should be grouped in "Slate Charcoal" containers with generous internal padding (24px) to ensure the data feels breathable yet contained. Use the "XL" spacing for section breaks to maintain a premium, sparse feel.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Subtle Inner Glows** rather than traditional drop shadows.
- **Level 0 (Background):** Deep Forest (#1A2F23).
- **Level 1 (Containers):** Slate Charcoal (#2D3748).
- **Level 2 (Hover/Active):** A lighter tint of Slate Charcoal or a subtle 1px stroke of Electric Lime.
- **Interaction Depth:** Instead of shadows, use a "Inner Glow" effect on active buttons using the Electric Lime color at 10-20% opacity to simulate a powered-on LED. 
- **Glassmorphism:** Use sparingly for floating navigation or overlays (e.g., 80% opacity Slate Charcoal with a 20px background blur) to maintain the tech-edge look.

## Shapes
The design system utilizes **Soft (0.25rem)** roundedness to maintain a precise, engineered feel. 
- Standard components (Inputs, Cards, Small Buttons) use 4px (0.25rem) corners.
- Large CTAs and "Hero" cards can scale up to 8px (0.5rem) to feel slightly more approachable, but avoid pill shapes entirely to keep the "tech/rugged" aesthetic intact. 
- Strict geometric alignment is required; icons should be contained in square boxes with minimal rounding.

## Components
- **Buttons:** Primary buttons are solid Electric Lime with black-forest text. Secondary buttons are outlined in Slate 400 with Slate 100 text.
- **Chips:** Small, rectangular labels with Slate Charcoal backgrounds and JetBrains Mono text. Use Electric Lime for "Active" or "Live" status chips.
- **Input Fields:** Darker Slate Charcoal background with a 1px border. On focus, the border transitions to Electric Lime.
- **Cards:** Minimalist containers with no shadows. Use a 1px subtle stroke (#3E4E63) to define edges against the Deep Forest background.
- **Data Visualizations:** Line charts and bars must use Electric Lime for primary data. Secondary data should use muted grays or deep greens.
- **Progress Bars:** Thin, high-contrast tracks. The progress fill should "glow" using a slight outer blur of the Electric Lime color.