---
name: Vighnaharta Divine
colors:
  surface: '#fefccf'
  surface-dim: '#dedcb1'
  surface-bright: '#fefccf'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f6c9'
  surface-container: '#f2f0c4'
  surface-container-high: '#eceabe'
  surface-container-highest: '#e6e5b9'
  on-surface: '#1d1d03'
  on-surface-variant: '#554336'
  inverse-surface: '#323214'
  inverse-on-surface: '#f5f3c7'
  outline: '#887364'
  outline-variant: '#dbc2b0'
  surface-tint: '#8f4e00'
  primary: '#8f4e00'
  on-primary: '#ffffff'
  primary-container: '#ff9933'
  on-primary-container: '#693800'
  inverse-primary: '#ffb77a'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#b22b1d'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff9585'
  on-tertiary-container: '#8c0c05'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc2'
  primary-fixed-dim: '#ffb77a'
  on-primary-fixed: '#2e1500'
  on-primary-fixed-variant: '#6d3a00'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#8f0f07'
  background: '#fefccf'
  on-background: '#1d1d03'
  surface-variant: '#e6e5b9'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '900'
    lineHeight: 84px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 56px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-lg:
    fontFamily: Noto Serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Libre Franklin
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  section-gap: 120px
  container-padding: 64px
  gutter: 24px
  safe-area-mobile: 20px
---

## Brand & Style
The brand personality is majestic, devotional, and deeply rooted in Maharashtrian heritage. This design system seeks to evoke the awe-inspiring atmosphere of a *Darshan* at Lalbaug or Dagdusheth. The UI should feel like a digital sanctum—grand, warm, and spiritually uplifting.

The design style is **Temple-Inspired Elegance**. It departs from modern flat aesthetics in favor of a layered, tactile experience that mimics the intricate stone carvings, gold-plated altars, and silk drapery found in Ganpati Mandals. We utilize high-contrast decorative elements, subtle divine glows (resembling *Aarti* light), and traditional motifs to create a rich, immersive narrative.

## Colors
The palette is a tribute to the sacred elements of Ganesh Chaturthi. 
- **Deep Saffron (#FF9933):** Used for primary actions and highlights, representing the *Shendur* and energy of the deity.
- **Temple Gold (#D4AF37):** Used for borders, icons, and decorative accents to mimic gold leafing and brass artifacts.
- **Maroon (#800000):** Used for secondary elements and deep contrast, reflecting the color of *Pooja* clothes and traditional *kumkum*.
- **Warm Cream (#FFFDD0):** The primary canvas color, providing a softer, more organic feel than pure white, reminiscent of old temple walls or raw silk.
- **Dark Maroon/Charcoal:** Reserved for typography to ensure maximum legibility against the warm background.

## Typography
The typographic hierarchy blends the literary elegance of classic serif fonts with the functional clarity of modern sans-serifs. 

For **Marathi (Devanagari)** support, use **Noto Serif Devanagari** to ensure the script maintains its calligraphic beauty and vertical metrics alignment. 

- **Headlines:** Playfair Display is used for its high-contrast strokes, giving titles a sophisticated, editorial feel. 
- **Body Text:** Noto Serif provides a comfortable reading experience for longer descriptions of *Aartis*, history, and rituals.
- **Labels:** Libre Franklin is used sparingly for metadata and navigation to provide a clean, modern counterpoint to the decorative serifs.

## Layout & Spacing
This design system uses an **Immersive Fluid Layout**. Unlike standard boxed layouts, content flows edge-to-edge with generous vertical breathing room to create a sense of grandeur.

- **Vertical Rhythm:** A base unit of 8px is used. Section headers should have a minimum of 120px top/bottom padding to allow high-resolution imagery of the deity to breathe.
- **Grid:** A 12-column layout for desktop, transitioning to a single-column stack on mobile. Gutters are kept wide (24px) to maintain an airy, premium feel.
- **Adaptive Reflow:** On mobile, large display fonts scale down significantly, and decorative side-borders are hidden to prioritize content, while top/bottom ornate separators remain.

## Elevation & Depth
Depth is not communicated through generic drop shadows, but through **Tonal Layering and Divine Glows**.

- **Stacked Planes:** Use Cream and Ivory surfaces with very subtle inner-glows in Saffron to suggest light reflecting off a surface.
- **Atmospheric Depth:** Backgrounds should utilize subtle radial gradients (e.g., a warm light center behind the main deity image) to create a focal point.
- **Golden Outlines:** Instead of shadows, use 1px gold (#D4AF37) or thin maroon borders to define interactive cards.
- **Backdrop Blurs:** Use frosted glass effects on navigation overlays, but tint the blur with a warm Saffron or Cream color to maintain the "Temple" atmosphere.

## Shapes
The shape language is inspired by **Temple Architecture (Shikhara and Mandapa)**. 

While the general system uses `Soft (1)` roundedness for functional elements like inputs, the primary visual identifiers use custom shapes:
- **The Arch (Toran):** Top corners of cards or image containers should often use a "Temple Arch" or "Dome" radius.
- **Decorative Borders:** Use SVG-based repeating motifs (like lotus petals or Peepal leaves) as frame borders for hero sections.
- **Motifs:** Incorporate circular *Mandala* patterns as background watermarks or button hover states.

## Components
- **Buttons (Divine CTA):** Primary buttons use a Deep Saffron background with a Temple Gold 1px border. Hover states should trigger a subtle outer glow in Saffron. Use uppercase Label-Caps for text.
- **Cards (Darshan Cards):** Cards feature a subtle 1px Maroon border and a 4px Gold accent bar at the top. Use Noto Serif for titles within cards.
- **Separators:** Replace standard horizontal lines with a decorative SVG motif (e.g., a small Kalash in the center of a gold line).
- **Inputs:** Simple, elegant lines rather than boxes. Use Maroon for labels and Saffron for the focus state underline.
- **Chips (Offerings/Tags):** Rounded pills with a light Maroon tint and Maroon text, used for categories like "Live Darshan," "Donations," or "Utsav Timeline."
- **Navigation:** The sticky header should be semi-transparent Ivory with a thin Gold bottom border, ensuring it doesn't distract from the immersive imagery below.