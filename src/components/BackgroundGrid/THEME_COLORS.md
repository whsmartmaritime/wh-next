# Theme-Responsive BackgroundGrid Colors

## 📋 Overview

BackgroundGrid component now automatically adapts grid line colors based on the parent theme class, matching sample site behavior.

## 🎨 Grid Line Colors by Theme

### Light Themes
```css
.theme-light, .theme-light-transparent
├── --theme-border-color: var(--grid-line-light)
└── Grid lines: rgba(0, 0, 0, 0.125) /* Dark lines on light background */
```

### Dark Themes  
```css
.theme-dark, .theme-dark-transparent
├── --theme-border-color: var(--grid-line-dark)
└── Grid lines: rgba(255, 255, 255, 0.125) /* Light lines on dark background */
```

## 🔧 CSS Variables

### Base Grid Line Colors (Sample Compatible)
```css
--grid-line-light: rgba(0, 0, 0, 0.125);       /* Dark lines for light themes */
--grid-line-dark: rgba(255, 255, 255, 0.125);  /* Light lines for dark themes */
```

### Dynamic Theme Override
```css
/* Theme classes override --theme-border-color based on background */
.theme-dark { --theme-border-color: var(--grid-line-dark); }
.theme-light { --theme-border-color: var(--grid-line-light); }
```

## 📱 Usage Examples

### Dark Section with Light Grid Lines
```tsx
<section className="theme-dark container-gutter py-block">
  <BackgroundGrid /> {/* White/light grid lines */}
  <h2>Content with light grid overlay</h2>
</section>
```

### Light Section with Dark Grid Lines  
```tsx
<section className="theme-light container-gutter py-block">
  <BackgroundGrid /> {/* Dark/black grid lines */}
  <h2>Content with dark grid overlay</h2>
</section>
```

### Transparent Overlay (Hero Style)
```tsx
<section className="relative theme-dark-transparent">
  <BackgroundGradient /> {/* Video background */}
  <BackgroundGrid fadeTop={true} /> {/* Light grid lines with fade */}
  <h1>Hero content over video</h1>
</section>
```

## 🎯 Automatic Behavior

### Theme Detection
- **Automatic:** Grid colors change based on parent theme class
- **No props needed:** BackgroundGrid reads `--theme-border-color` CSS variable
- **Inheritance:** Child elements inherit correct grid colors

### Responsive Design
```tsx
// Grid lines adapt visibility + colors
<BackgroundGrid 
  fadeTop={true}    // Optional fade effect
  zLevel="mid"      // Z-index level
/>
```

## 🔍 Visual Results

### Hero Section (theme-dark-transparent)
- Background: Video + gradient overlay
- Grid lines: `rgba(255, 255, 255, 0.125)` (light/white)
- Effect: Subtle white grid over dark video

### WhyWheelhouse Section (theme-dark)  
- Background: Solid black (`var(--color-base-1000)`)
- Grid lines: `rgba(255, 255, 255, 0.125)` (light/white)
- Effect: White grid on black background

### Future Light Sections (theme-light)
- Background: Solid white (`var(--color-base-0)`)
- Grid lines: `rgba(0, 0, 0, 0.125)` (dark/black)
- Effect: Dark grid on white background

## ✅ Benefits

- **🎨 Theme Consistent:** Grid colors automatically match background
- **📱 Sample Compatible:** Uses exact same color values as sample site
- **🔧 CSS Variable Driven:** Easy to customize via theme system
- **⚡ Automatic:** No manual prop passing needed
- **🎯 Flexible:** Works with solid, transparent, and gradient backgrounds

## 🚀 Implementation Details

BackgroundGrid uses:
```tsx
className="w-px bg-[var(--theme-border-color)]"
```

Theme classes set:
```css
.theme-dark { --theme-border-color: var(--grid-line-dark); }
.theme-light { --theme-border-color: var(--grid-line-light); }
```

Result: **Perfect contrast** grid lines for any theme!
