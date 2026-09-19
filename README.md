# Nova UI

**Open-Source Cross-Framework UI Component Library**

Nova UI is a production-ready, accessible, and customizable UI component library designed to help developers build modern web applications faster.

## ✨ Features

- 🎨 **Design Token System** — Centralized, customizable design tokens
- 🌓 **Light & Dark Themes** — Built-in theme support with CSS variables
- ♿ **Accessibility First** — WCAG-compliant keyboard navigation, ARIA, and focus management
- 📦 **Tree-Shakable** — Import only what you need
- 🔧 **Customizable** — Override any design token without modifying source code
- 📱 **Responsive** — Mobile-first responsive components

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@nova-ui/tokens` | Design tokens (colors, spacing, typography, etc.) | 🚧 In Progress |
| `@nova-ui/styles` | CSS architecture, themes, and utilities | 🚧 In Progress |
| `@nova-ui/core` | Framework-independent behavior and accessibility utilities | 🚧 In Progress |
| `@nova-ui/angular` | Angular component library | 🚧 In Progress |
| `@nova-ui/react` | React component library | 📋 Planned |

## 🚀 Quick Start

### Angular

```bash
npm install @nova-ui/angular
```

```typescript
import { NovaButtonComponent } from '@nova-ui/angular';

@Component({
  imports: [NovaButtonComponent],
  template: `
    <nova-button variant="primary" size="medium">
      Get Started
    </nova-button>
  `,
})
export class AppComponent {}
```

### React

```bash
npm install @nova-ui/react
```

```tsx
import { NovaButton } from '@nova-ui/react';

export function App() {
  return (
    <NovaButton variant="primary" size="medium">
      Get Started
    </NovaButton>
  );
}
```

## 🧩 MVP Components

| Category | Components |
|----------|-----------|
| **Form** | Button, Input, Textarea, Select, Checkbox, Radio, Switch |
| **Display** | Card, Badge, Alert |
| **Feedback** | Spinner, Skeleton |
| **Interaction** | Modal, Dropdown, Tooltip, Tabs |

## 🎨 Theming

Customize any design token using CSS variables:

```css
:root {
  --nova-color-primary: #6366f1;
  --nova-color-background: #ffffff;
  --nova-radius-md: 8px;
}
```

Switch to dark mode:

```html
<html data-nova-theme="dark">
```

## 🏗️ Development

```bash
# Install dependencies
npm install

# Build all packages
npx nx run-many --target=build --all

# Run tests
npx nx run-many --target=test --all

# Lint
npx nx run-many --target=lint --all
```

## 📖 Documentation

Coming soon — built with Next.js.

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

[MIT](./LICENSE)
