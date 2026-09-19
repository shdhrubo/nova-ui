# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-19

### 🚀 Initial Public Release

Initial release of the Nova UI cross-framework design system, CSS Cascade Layers architecture, and Angular 21 component suite.

### 📦 Packages Included
- **`@nova-ui/tokens` (v0.1.0)**: Centralized design token definitions for colors (primary, slate, semantic tones), typography scale, spacing (4px base), elevation/shadows, border-radii, and responsive breakpoints.
- **`@nova-ui/styles` (v0.1.0)**: Zero-runtime CSS architecture leveraging `@layer nova.reset, nova.tokens, nova.components, nova.utilities`. Includes dark theme presets, focus rings, accessibility utilities (`.nova-sr-only`), and individual component styling.
- **`@nova-ui/core` (v0.1.0)**: Framework-independent TypeScript interfaces, variant types, and accessibility utilities (focus trapping, keyboard navigation constants).
- **`@nova-ui/angular` (v0.1.0)**: 16 production-grade standalone components built for Angular 21:
  - **Button (`nova-button`)**: 7 visual variants, 3 sizes, animated loading spinner, and disabled states.
  - **Input (`nova-input`)**: Floating/stacked label, helper hint, error text with `role="alert"`, and `ControlValueAccessor` integration.
  - **Textarea (`nova-textarea`)**: Reactive Forms integration, character count, auto-resize, and error states.
  - **Select (`nova-select`)**: Custom single and multi-select dropdown, real-time search filtering, and keyboard navigation.
  - **Checkbox (`nova-checkbox`)**: Checked, unchecked, and indeterminate states with micro-animations.
  - **Radio (`nova-radio`, `nova-radio-group`)**: Arrow key navigation, vertical/horizontal orientation, and group value management.
  - **Switch (`nova-switch`)**: Accessible toggle with `role="switch"`, `aria-checked`, custom sizes, and label alignment.
  - **Card (`nova-card`)**: Composable container with header, title, description, content, and footer sub-components.
  - **Badge (`nova-badge`)**: 5 semantic status variants, 3 sizes, and dot indicator support.
  - **Alert (`nova-alert`)**: Status alerts (`info`, `success`, `warning`, `danger`), dismiss action, and `role="alert"`.
  - **Modal (`nova-modal`)**: Accessible dialog with backdrop click dismiss, `Escape` key handler, focus trap, and customizable animations.
  - **Dropdown (`nova-dropdown`)**: Trigger menu with customizable action items, danger items, click-outside dismissal, and keyboard accessibility.
  - **Tooltip (`nova-tooltip`)**: Directional tooltips (`top`, `bottom`, `left`, `right`) triggered via hover and focus.
  - **Tabs (`nova-tabs`)**: Keyboard navigable tablist with active tab indicators and disabled tab states.
  - **Spinner (`nova-spinner`)**: Accessible SVG circular spinner with `role="status"` and screen reader text.
  - **Skeleton (`nova-skeleton`)**: Placeholder shapes (`text`, `circular`, `rectangular`) with shimmering wave and pulse animations.

### 🌐 Applications
- **`apps/demo-angular`**: Interactive showcase testing all 16 components with live reactive forms, dark mode toggling, and data loading simulations.
- **`apps/docs`**: Developer documentation website featuring an atmospheric hero workbench, live interactive component studio, architectural bento grid, and API reference.

### 🤝 Community & Tooling
- Changesets setup for automated semantic versioning and changelog generation.
- Structured GitHub Issue Templates (Bug Report, Feature Request, Component Proposal) and Pull Request template.
- CI/CD workflows for automated build, linting, packaging dry-run, and automated release.
