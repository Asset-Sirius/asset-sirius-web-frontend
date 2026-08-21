---
name: Asset Sirius AI
colors:
  surface: '#11131d'
  surface-dim: '#11131d'
  surface-bright: '#373843'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b25'
  surface-container: '#1d1f29'
  surface-container-high: '#282934'
  surface-container-highest: '#33343f'
  on-surface: '#e2e1f0'
  on-surface-variant: '#c4c5da'
  inverse-surface: '#e2e1f0'
  inverse-on-surface: '#2e303a'
  outline: '#8e8fa3'
  outline-variant: '#434657'
  surface-tint: '#b9c3ff'
  primary: '#b9c3ff'
  on-primary: '#00228a'
  primary-container: '#0047ff'
  on-primary-container: '#d4d9ff'
  inverse-primary: '#0046fa'
  secondary: '#c4c6d0'
  on-secondary: '#2d3038'
  secondary-container: '#464951'
  on-secondary-container: '#b6b8c2'
  tertiary: '#c2c6d5'
  on-tertiary: '#2b303c'
  tertiary-container: '#5b606d'
  on-tertiary-container: '#d7dbea'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#001257'
  on-primary-fixed-variant: '#0033c0'
  secondary-fixed: '#e1e2ec'
  secondary-fixed-dim: '#c4c6d0'
  on-secondary-fixed: '#191b23'
  on-secondary-fixed-variant: '#44474f'
  tertiary-fixed: '#dee2f2'
  tertiary-fixed-dim: '#c2c6d5'
  on-tertiary-fixed: '#171c27'
  on-tertiary-fixed-variant: '#424753'
  background: '#11131d'
  on-background: '#e2e1f0'
  surface-variant: '#33343f'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The brand personality is authoritative, visionary, and hyper-intelligent. This design system is crafted for high-net-worth investors and asset managers, evoking a sense of deep-space precision and mathematical certainty.

The visual style is **Futuristic Modernism**, blending a high-contrast dark mode with elements of **Glassmorphism**. It utilizes expansive dark surfaces to represent the "void" of complex data, while vibrant blue accents represent the "Sirius" light—intelligence cutting through noise. The UI should feel like a premium financial cockpit: analytical, calm, and unmistakably advanced.

## Colors
The palette is dominated by "Deep Space" tones to provide a sophisticated backdrop for data visualization.

- **Primary:** A vibrant, electric blue (#0047FF) used for primary actions, data highlights, and the "AI heartbeat" elements.
- **Secondary/Neutral:** A series of near-black and deep navy tones (#0A0D14, #161B26) used for backgrounds and container surfaces to ensure maximum depth.
- **Accent:** Pure white (#FFFFFF) is reserved for high-contrast typography and critical icons to ensure legibility against the dark void.
- **Semantic:** Success states use a sharp mint-green to contrast against the blues, while errors use a muted coral to avoid breaking the professional aesthetic.

## Typography
The typography strategy focuses on clarity and a "technical" feel. 

- **Hanken Grotesk** is used for headlines to provide a sharp, contemporary corporate look. Its geometry is precise, echoing the AI-driven nature of the product.
- **Inter** handles the bulk of data and body text, chosen for its exceptional legibility in dark-themed interfaces and complex numerical layouts.
- **Geist** is employed for labels, metadata, and mono-spaced financial figures, lending a developer-grade precision to the UI.

## Layout & Spacing
This design system utilizes a **Fixed Grid** model for desktop to maintain a "command center" feel, transitioning to a fluid model for mobile.

- **Grid:** A 12-column grid with generous 24px gutters. 
- **Rhythm:** An 8px base unit drives all padding and margin decisions.
- **Density:** High information density is permitted for data dashboards, but marketing and retention pages should utilize "Atmospheric Spacing"—large vertical gaps (80px+) to allow the brand visuals to breathe and emphasize premium quality.
- **Mobile:** Elements reflow to a single column with 20px side margins, with certain data tables utilizing horizontal overflow with "fade-out" indicators.

## Elevation & Depth
Depth is created through **Luminous Layering** rather than traditional shadows.

1.  **Base Layer:** The deepest background (#0A0D14).
2.  **Surface Layer:** Elevated cards use a slightly lighter hex (#161B26) with a subtle 1px stroke (White @ 10% opacity) to define edges.
3.  **Glass Layer:** Critical overlays and navigation bars use a backdrop blur (20px) with a semi-transparent dark navy fill, creating a sense of "floating" over the data.
4.  **Glow:** Primary buttons and active indicators feature a soft blue outer glow (blur: 16px, opacity: 30%) to simulate a light source in the dark.

## Shapes
The shape language is "Soft-Tech." We avoid aggressive rounding (pill shapes) to maintain a professional, serious financial tone. 

- **Standard Radius:** 4px (Soft) for buttons and inputs to keep them looking "engineered."
- **Large Containers:** 8px for cards and modular sections.
- **Interactive Elements:** Active states should be indicated by sharp, high-contrast border-bottoms or subtle geometric icons (like the four-pointed star from the reference image).

## Components
- **Buttons:** Primary buttons are solid Electric Blue with white text. Secondary buttons are "Ghost" style—transparent with a 1px white or blue border.
- **Inputs:** Dark backgrounds (#0A0D14) with a 1px stroke. On focus, the stroke turns Electric Blue with a subtle glow.
- **Cards:** Use "Glassmorphism" for data cards—heavy blur, dark tint, and a very thin highlight on the top edge to simulate light hitting a glass pane.
- **Charts:** Use thin, high-contrast lines. Area charts should use a vertical gradient from Electric Blue to transparent.
- **Chips/Badges:** Small, rectangular with 2px radius. Use Geist Mono for the text inside badges to emphasize the technical/AI nature of the data.
- **AI Indicators:** Use a subtle, pulsating four-pointed star icon (as seen in the "i" of Sirius) to denote features powered by the AI engine.