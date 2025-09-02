# CSS Architecture Documentation

## 🎯 Overview
Modern, scalable CSS architecture using modular design principles with proper layer management and semantic naming conventions.

## 📁 File Structure
```
src/styles/
├── globals.css      # Entry point - imports only
├── variables.css    # CSS custom properties + responsive breakpoints
├── base.css         # Reset styles + base element defaults
├── typography.css   # Typography system + responsive scaling
├── theme.css        # Theme system (dark/light) + utilities
├── utilities.css    # Layout utilities + container + accessibility
├── z-index.css      # Semantic z-index layering system
├── layout.css       # Grid system + responsive utilities
└── animations.css   # Reusable animations + transitions
```

## 🗂️ Layer Architecture
Following CSS Cascade Layers for predictable styling:

```css
@layer base        # Element defaults, resets
@layer components  # Component-specific styles
@layer utilities   # Utility classes, overrides
```

## 🎨 Design System

### Color System
- **Light theme**: oklch color space for better perceptual uniformity
- **Dark theme**: Automatic switching with `prefers-color-scheme`
- **Theme classes**: `.theme-dark`, `.theme-light` for manual control

### Spacing System
```css
--gutter-h: 1rem → 8rem    # Responsive horizontal gutters
--block-spacing: 2rem → 5rem  # Vertical spacing between sections
--column: calc((100vw - (var(--gutter-h) * 2)) / 12)  # 12-column grid
```

### Typography Scale
Mobile-first responsive typography with optimal reading sizes:
- **Mobile**: h1 (1.75rem), p (0.875rem)
- **Tablet**: h1 (2.25rem), p (1rem)  
- **Desktop**: h1 (3rem), p (1.125rem)

## 🔧 Z-Index System

### Semantic Layers (-30 to +50)
```css
/* Background layers */
.z-background-far   (-30)  # Videos, deep backgrounds
.z-background-mid   (-20)  # Grid patterns, textures  
.z-background-near  (-10)  # Overlays, scanlines

/* Content layers */
.z-content          (+10)  # Main content, text, images
.z-interactive      (+20)  # Buttons, links, hover states

/* Overlay layers */
.z-overlay          (+30)  # Dropdowns, tooltips
.z-modal            (+40)  # Modals, dialogs
.z-toast            (+50)  # Notifications, alerts
```

## 🏗️ Container System

### Responsive Container
```css
.container-gutter {
  width: 100%;
  max-width: 1440px;        # Maximum content width
  margin-inline: auto;      # Center horizontally
  padding-inline: var(--gutter-h);  # Responsive side padding
}
```

### Responsive Breakpoints
```css
640px   # Small tablets
768px   # Tablets
1024px  # Small desktops
1600px  # Large desktops
1920px  # Ultra-wide screens
```

## 🎭 Theme System

### Usage Examples
```css
/* Transparent themes (for background effects) */
.theme-dark         # Dark text, transparent background
.theme-light        # Light text, transparent background

/* Solid themes (with backgrounds) */
.theme-dark-solid   # Dark theme with background
.theme-light-solid  # Light theme with background

/* Smooth transitions */
.theme-transition   # Color/background transitions
```

## 🧩 Component Integration

### Background Components
Each component has its own styles file:
```
src/components/BackgroundGrid/styles.css
src/components/BackgroundGradient/styles.css  
src/components/BackgroundScanline/styles.css
```

### Z-Index Usage
```tsx
<BackgroundGradient />          {/* z-background-far (-30) */}
<BackgroundGrid zLevel="mid" /> {/* z-background-mid (-20) */}
<BackgroundScanline />          {/* z-background-near (-10) */}
<main className="z-content">    {/* z-content (+10) */}
  <button className="z-interactive">CTA</button> {/* z-interactive (+20) */}
</main>
```

## 🚀 Performance Features

- **CSS Layers**: Predictable cascade, better maintainability
- **Modern Properties**: `oklch()`, `margin-inline`, `padding-block`
- **Font Smoothing**: `-webkit-font-smoothing: antialiased`
- **Smooth Scrolling**: `scroll-behavior: smooth`
- **Semantic Z-Index**: No magic numbers, clear hierarchy

## 📋 Best Practices

### 1. Import Order (Critical)
```css
@import "tailwindcss";
@import "./variables.css";    # Must come first
@import "./base.css";         # Reset styles
@import "./typography.css";   # Typography system
@import "./theme.css";        # Theme system
@import "./utilities.css";    # Utility classes
@import "./z-index.css";      # Z-index system
@import "./layout.css";       # Layout utilities
@import "./animations.css";   # Animations
```

### 2. Naming Conventions
- **Semantic classes**: `.z-content`, `.theme-dark`
- **BEM for components**: `.background-grid__line`
- **Utility prefixes**: `.px-gutter`, `.my-block`

### 3. Responsive Design
- **Mobile-first**: All base styles for mobile
- **Progressive enhancement**: Add desktop styles with media queries
- **Container queries**: Use for component-level responsiveness

### 4. Accessibility
- **Focus visible**: Clear focus indicators
- **Screen reader**: `.sr-only` utility for hidden content
- **Color contrast**: WCAG compliant color combinations

## 🔍 Debugging Tips

### CSS Specificity Issues
1. Check layer order in `globals.css`
2. Verify `@layer` usage in individual files
3. Use browser dev tools Layer panel

### Z-Index Problems
1. Use semantic classes instead of numbers
2. Check component hierarchy in DOM
3. Verify background effects use negative z-index

### Theme Issues
1. Ensure theme classes are applied to correct elements
2. Check CSS custom property inheritance
3. Verify transparent backgrounds for effects
