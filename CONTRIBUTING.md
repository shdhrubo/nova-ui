# Contributing to Nova UI

Thank you for your interest in contributing to Nova UI! 🎉

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/<your-username>/nova-ui.git`
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feature/my-feature`

## Development Workflow

### Branch Naming

- `feature/<name>` — New features
- `fix/<name>` — Bug fixes
- `docs/<name>` — Documentation updates
- `test/<name>` — Test additions/updates

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(button): add loading state
fix(select): fix keyboard navigation
docs(button): add accessibility examples
test(modal): add focus trap tests
chore(deps): update dependencies
```

### Local Development

```bash
# Start the interactive showcase app
npm start                # http://localhost:4200

# Start the documentation portal
npm run docs             # http://localhost:3000

# Build all packages
npm run build

# Verify packaging integrity
npm run pack:all
```

### Creating a Changeset

If your PR introduces changes that affect published packages (`@nova-ui/tokens`, `@nova-ui/styles`, `@nova-ui/core`, `@nova-ui/angular`), create a changeset before committing:

```bash
npm run changeset
```

Follow the interactive prompts to choose the bump type (`patch`, `minor`, `major`) and provide a concise summary of the change.

### Running Checks

Before submitting a PR, ensure:

```bash
# Format check
npm run format:check

# Build all packages
npm run build

# Packaging validation
npm run pack:all
```

## Pull Request Requirements

- Clear description of the problem and solution
- Tests for new functionality
- Documentation updates if applicable
- Screenshots for visual changes
- Breaking change information if applicable

## Component Guidelines

Every new component must include:

1. **Implementation** — Component code
2. **Types** — TypeScript interfaces
3. **Styles** — CSS using design tokens
4. **Tests** — Unit and component tests
5. **Accessibility** — Keyboard navigation, ARIA, screen reader support
6. **Documentation** — Usage examples and API reference

## Code Style

- TypeScript strict mode
- Prettier for formatting
- ESLint for linting
- CSS custom properties (design tokens) for styling

## Questions?

Open a [GitHub Issue](https://github.com/shdhrubo/nova-ui/issues) or start a [Discussion](https://github.com/shdhrubo/nova-ui/discussions).
