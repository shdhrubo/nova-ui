# Nova UI

<div align="center">

**Open-Source Cross-Framework UI Component Library & Design System**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Angular: 21](https://img.shields.io/badge/Angular-21.2-dd0031.svg?logo=angular)](https://angular.dev)
[![TypeScript: 6.0](https://img.shields.io/badge/TypeScript-6.0-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![CSS: Cascade Layers](https://img.shields.io/badge/CSS-Cascade%20Layers-1572b6.svg?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

</div>

---

Nova UI is a production-ready, accessible, and customizable UI component library designed to help developers build modern web applications faster. It decouples design tokens, CSS cascade layer styles, and component behavior from framework adapters.

## ✨ Core Highlights

- 🎨 **Design Token System** — Centralized design tokens for colors, typography, spacing, elevations, and radius.
- 📐 **CSS Cascade Layers (`@layer nova.*`)** — Zero specificity wars. Custom overrides always win without `!important`.
- 🌓 **Instant Dark Mode** — Native CSS custom property theming via `data-nova-theme="dark"` attribute or `.dark` class.
- ♿ **WCAG 2.1 AA Compliant** — Native ARIA roles, live regions, focus trapping, and keyboard navigation (`Tab`, `Esc`, `Arrow keys`, `Space/Enter`).
- ⚡ **0 kB JavaScript Styling Overhead** — Pure CSS styling layer; zero runtime CSS-in-JS performance penalty.
- 🅰️ **Angular 21 Standalone** — Built with modern Angular standalone components and signals for tree-shaking.
- 📋 **Reactive Forms Native** — Seamless `ControlValueAccessor` integration on all form inputs.

---

## 📦 Packages

| Package | Description | Status | Version |
| :--- | :--- | :---: | :---: |
| **`@nova-ui-library/tokens`** | Design tokens (JSON, TS tokens, CSS custom properties) | ✅ Published | `0.0.1` |
| **`@nova-ui-library/styles`** | CSS architecture (`@layer nova.reset, nova.tokens, nova.components, nova.utilities`) | ✅ Published | `0.0.1` |
| **`@nova-ui-library/core`** | Framework-agnostic contracts, types, and accessibility utilities | ✅ Published | `0.0.1` |
| **`@nova-ui-library/angular`** | 16 Angular standalone components | ✅ Published | `0.0.1` |
| **`@nova-ui-library/react`** | React component adapters | 📋 Planned | — |

---

## 🧩 16 Production Components

| Category | Component Selector | Key Features |
| :--- | :--- | :--- |
| **Foundations** | `nova-button` | 7 variants (`primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `warning`), 3 sizes, loading spinner, disabled |
| | `nova-input` | Label, hint, error text, `aria-invalid`, clear button, prefix/suffix icons |
| | `nova-badge` | Status pills (`primary`, `secondary`, `success`, `warning`, `danger`), dot indicators, removable tag |
| | `nova-alert` | 4 status tones (`info`, `success`, `warning`, `danger`), dismiss button, ARIA `role="alert"` |
| | `nova-card` | Composable card (`nova-card-header`, `nova-card-title`, `nova-card-content`, `nova-card-footer`), hover lift |
| **Form Controls** | `nova-textarea` | Reactive Forms CVA, auto-expand, character counter, min/max length validation |
| | `nova-select` | Single/multi-select, search filtering, keyboard navigation, clear action |
| | `nova-checkbox` | Checked, unchecked, and indeterminate states with smooth micro-animations |
| | `nova-radio-group` | Keyboard arrow navigation (`ArrowUp`/`ArrowDown`), vertical & horizontal layouts |
| | `nova-switch` | Accessible `role="switch"`, `aria-checked`, labels, custom sizes |
| **Overlays & Dialogs** | `nova-modal` | Accessible dialog, backdrop dismiss, Escape key dismiss, focus trapping, animations |
| | `nova-dropdown` | Trigger dropdown menu, action items, danger items, click-outside and Escape dismiss |
| | `nova-tooltip` | Directional tooltips (`top`, `bottom`, `left`, `right`), hover & focus triggers |
| | `nova-tabs` | Accessible `role="tablist"`, animated indicator, arrow navigation, disabled tabs |
| **Feedback & Shimmer** | `nova-spinner` | GPU-accelerated SVG circular spinner, 3 sizes (`sm`, `md`, `lg`), `role="status"` |
| | `nova-skeleton` | Shimmer wave & pulse animations, shapes (`text`, `circular`, `rectangular`) |

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install @nova-ui-library/angular @nova-ui-library/styles @nova-ui-library/tokens
```

### 2. Import Styles

Include Nova UI styles in your root `angular.json` or `styles.css`:

```css
/* Import in your global stylesheet */
@import '@nova-ui-library/styles';
```

### 3. Usage in Angular Component

```typescript
import { Component } from '@angular/core';
import { 
  NovaButtonComponent, 
  NovaBadgeComponent, 
  NovaInputComponent 
} from '@nova-ui-library/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NovaButtonComponent, NovaBadgeComponent, NovaInputComponent],
  template: `
    <div class="p-6 space-y-4">
      <nova-badge variant="success" size="sm">Active</nova-badge>
      
      <nova-input 
        label="Email Address" 
        placeholder="you@company.com" 
        hint="We will never share your email."
      />

      <nova-button variant="primary" size="md">
        Save Changes
      </nova-button>
    </div>
  `
})
export class AppComponent {}
```

---

## 🎨 Theming & Customization

Customize tokens globally via CSS variables:

```css
:root {
  --nova-primary: #6366f1;
  --nova-primary-hover: #4f46e5;
  --nova-radius-md: 0.5rem;
}

/* Dark mode theme variables are applied automatically with data-nova-theme */
[data-nova-theme="dark"] {
  --nova-background: #09090b;
  --nova-foreground: #fafafa;
}
```

---

## 🛠️ Monorepo Development

```bash
# Clone the repository
git clone https://github.com/shdhrubo/nova-ui.git
cd nova-ui

# Install dependencies
npm install

# Run the live interactive showcase app
npm start                # http://localhost:4200

# Run the documentation portal with hero workbench
npm run docs             # http://localhost:3000

# Build all packages
npm run build

# Verify packaging
npm run pack:all
```

---

## 🤝 Community & Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

- 🐛 [Report a Bug](https://github.com/shdhrubo/nova-ui/issues/new?template=bug_report.yml)
- 💡 [Request a Feature](https://github.com/shdhrubo/nova-ui/issues/new?template=feature_request.yml)
- 🧩 [Propose a Component](https://github.com/shdhrubo/nova-ui/issues/new?template=component_proposal.yml)
- 📜 [Code of Conduct](./CODE_OF_CONDUCT.md)
- 🔒 [Security Policy](./SECURITY.md)

---

## 📄 License

Nova UI is licensed under the [MIT License](./LICENSE).
