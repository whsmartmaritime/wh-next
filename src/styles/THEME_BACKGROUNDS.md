# Theme Background System

## 📋 Overview

Comprehensive theme background system based on sample site patterns with solid backgrounds, transparent overlays, and gradient options.

## 🎨 Available Theme Classes

### Solid Backgrounds
```css
.theme-dark      /* Black background (var(--color-base-1000)) */
.theme-light     /* White background (var(--color-base-0)) */
```

### Transparent Overlays
```css
.theme-dark-transparent   /* Dark text, transparent background */
.theme-light-transparent  /* Light text, transparent background */
```

### Gradient Backgrounds
```css
.theme-dark.bg-gradient-up    /* Dark → transparent (top to bottom) */
.theme-dark.bg-gradient-down  /* Transparent → dark (top to bottom) */
.theme-light.bg-gradient-up   /* Light → transparent (top to bottom) */
.theme-light.bg-gradient-down /* Transparent → light (top to bottom) */
```

## 🎯 Usage Examples

### Section with Solid Background
```tsx
<section className="theme-dark container-gutter py-block">
  <BackgroundGrid />
  {/* Content with white text on black background */}
</section>
```

### Section with Video/Gradient Background
```tsx
<section className="relative theme-dark-transparent container-gutter">
  <BackgroundGradient /> {/* Video background */}
  <BackgroundGrid fadeTop={true} />
  {/* Content with white text on transparent overlay */}
</section>
```

### Section with Gradient Fade
```tsx
<section className="theme-dark bg-gradient-down py-block">
  {/* Content that fades from transparent to dark */}
</section>
```

## 🔧 CSS Variables

### Base Colors
```css
--color-base-0: rgb(255, 255, 255);    /* Light theme background */
--color-base-1000: rgb(0, 0, 0);       /* Dark theme background */
--color-base-900: rgb(20, 20, 20);     /* Alternative dark */
--color-base-950: rgb(8, 8, 10);       /* Even darker option */
```

### Dynamic Properties
```css
--foreground: 255 255 255;  /* Text color (RGB values) */
--background: 0 0 0;        /* Background color (RGB values) */
```

## 📱 Current Implementation

### Hero Section
- Uses `theme-dark-transparent` 
- Relies on `BackgroundGradient` for video background
- Text appears over video with fade effect

### WhyWheelhouse Section  
- Uses `theme-dark` 
- Solid black background
- White text and borders

### Benefits
- ✅ **Consistent with sample**: Matches BlockWrapper theme patterns
- ✅ **Flexible**: Solid, transparent, and gradient options
- ✅ **Semantic**: Clear class names indicating purpose
- ✅ **CSS Variable driven**: Easy to customize colors
- ✅ **Gradient support**: Fade effects for smooth transitions

## 🎨 Color Scheme Integration

Automatically integrates with existing CSS color system:
- Uses `var(--theme-border-color)` for borders
- Responsive border colors (light/dark variants)
- Compatible with existing elevation and accent colors
