import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NovaButtonComponent,
  NovaBadgeComponent,
  NovaCardComponent,
  NovaCardHeaderComponent,
  NovaCardTitleComponent,
  NovaCardContentComponent,
  NovaInputComponent,
  NovaThemeService,
} from '@nova-ui-library/angular';
import { CodeBlockComponent } from '../components/code-block.component';

@Component({
  selector: 'docs-theming',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CodeBlockComponent,
    NovaButtonComponent,
    NovaBadgeComponent,
    NovaCardComponent,
    NovaCardHeaderComponent,
    NovaCardTitleComponent,
    NovaCardContentComponent,
    NovaInputComponent,
  ],
  template: `
    <div>
      <!-- Header -->
      <div style="margin-bottom: var(--nova-space-8);">
        <div style="display: flex; gap: var(--nova-space-2); align-items: center; margin-bottom: var(--nova-space-2);">
          <span class="nova-badge nova-badge--primary nova-badge--sm">Guide</span>
        </div>
        <h1 style="font-size: var(--nova-text-3xl); font-weight: 800; margin: 0 0 var(--nova-space-2);">
          Theming & Customization
        </h1>
        <p style="font-size: var(--nova-text-base); color: var(--nova-color-text-secondary); margin: 0; line-height: 1.6;">
          Configure your brand colors, border radius scales, and dark mode statically in <code>app.config.ts</code> or dynamically at runtime using modern Angular Signals.
        </p>
      </div>

      <!-- Interactive Playground -->
      <section style="margin-bottom: var(--nova-space-10); padding: var(--nova-space-6); background: var(--nova-color-surface); border: 1px solid var(--nova-color-border); border-radius: var(--nova-radius-lg); box-shadow: var(--nova-shadow-sm);">
        <div style="margin-bottom: var(--nova-space-4);">
          <h2 style="font-size: var(--nova-text-lg); font-weight: 700; margin: 0 0 var(--nova-space-1);">
            🎨 Interactive Live Preview
          </h2>
          <p style="color: var(--nova-color-text-secondary); font-size: 0.875rem; margin: 0;">
            Click any color palette or border radius below to see Nova UI components adapt in real time:
          </p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: var(--nova-space-6); margin-bottom: var(--nova-space-6);">
          <!-- Color Presets -->
          <div>
            <label style="display: block; font-size: var(--nova-text-xs); font-weight: 600; color: var(--nova-color-text-secondary); margin-bottom: var(--nova-space-2);">
              Brand Primary Color
            </label>
            <div style="display: flex; gap: var(--nova-space-2); align-items: center;">
              @for (preset of colorPresets; track preset.hex) {
                <button
                  type="button"
                  (click)="applyColor(preset.hex)"
                  [title]="preset.name"
                  [style.background]="preset.hex"
                  [style.outline]="activeColor === preset.hex ? '2px solid var(--nova-color-text)' : 'none'"
                  [style.outline-offset]="'2px'"
                  style="width: 28px; height: 28px; border-radius: var(--nova-radius-full); border: none; cursor: pointer; transition: transform 0.15s ease;"
                ></button>
              }
            </div>
          </div>

          <!-- Radius Presets -->
          <div>
            <label style="display: block; font-size: var(--nova-text-xs); font-weight: 600; color: var(--nova-color-text-secondary); margin-bottom: var(--nova-space-2);">
              Corner Radius
            </label>
            <div style="display: flex; gap: var(--nova-space-2);">
              @for (r of radiusPresets; track r.value) {
                <nova-button
                  [variant]="activeRadius === r.value ? 'primary' : 'outline'"
                  size="sm"
                  (click)="applyRadius(r.value)"
                >
                  {{ r.label }}
                </nova-button>
              }
            </div>
          </div>

          <!-- Reset -->
          <div style="margin-left: auto; align-self: flex-end;">
            <nova-button variant="ghost" size="sm" (click)="resetTheme()">
              ↺ Reset
            </nova-button>
          </div>
        </div>

        <!-- Sample Components Card -->
        <nova-card variant="elevated">
          <nova-card-header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <nova-card-title>Live Component Adaptation</nova-card-title>
              <nova-badge variant="primary" size="sm">Brand Themed</nova-badge>
            </div>
          </nova-card-header>
          <nova-card-content>
            <div style="display: flex; flex-wrap: wrap; gap: var(--nova-space-3); align-items: center; margin-bottom: var(--nova-space-4);">
              <nova-button variant="primary">Primary Button</nova-button>
              <nova-button variant="secondary">Secondary</nova-button>
              <nova-button variant="outline">Outline</nova-button>
              <nova-badge variant="primary">Active Badge</nova-badge>
              <nova-badge variant="secondary">Tag</nova-badge>
            </div>
            <nova-input
              label="Themed Form Input"
              placeholder="Focus ring and borders match the active theme..."
            ></nova-input>
          </nova-card-content>
        </nova-card>
      </section>

      <!-- Section 1: Application Startup -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          1. Setup via <code>provideNovaUI()</code>
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          In modern Angular applications, initialize your theme configuration inside <code>app.config.ts</code> using <code>provideNovaUI()</code>. This sets up theme tokens before any component is rendered:
        </p>
        <docs-code-block [code]="appConfigCode" language="typescript"></docs-code-block>
      </section>

      <!-- Section 2: Runtime Theming -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          2. Dynamic Theming with <code>NovaThemeService</code>
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          Inject <code>NovaThemeService</code> in any Angular component to toggle dark mode, switch brand palettes, or modify border radius at runtime:
        </p>
        <docs-code-block [code]="themeServiceCode" language="typescript"></docs-code-block>
      </section>

      <!-- Section 3: API Reference -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          3. Configuration API Reference
        </h2>
        
        <h3 style="font-size: var(--nova-text-base); font-weight: 600; margin: var(--nova-space-4) 0 var(--nova-space-2);">
          <code>NovaThemeColors</code> Properties
        </h3>
        <div class="docs-table-wrapper" style="margin-bottom: var(--nova-space-6);">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
                <th>Auto-Derived If Omitted?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>primary</code></td>
                <td><code>string</code></td>
                <td>Main brand accent color (hex, rgb, hsl).</td>
                <td>Defaults to <code>#6366f1</code> (Indigo)</td>
              </tr>
              <tr>
                <td><code>primaryHover</code></td>
                <td><code>string</code></td>
                <td>Hover state for primary buttons and accents.</td>
                <td>Auto-darkened by 8% from <code>primary</code></td>
              </tr>
              <tr>
                <td><code>primaryForeground</code></td>
                <td><code>string</code></td>
                <td>Text color on top of primary background.</td>
                <td>Auto-calculated for high WCAG contrast</td>
              </tr>
              <tr>
                <td><code>secondary</code></td>
                <td><code>string</code></td>
                <td>Secondary brand accent color.</td>
                <td>Defaults to <code>#8b5cf6</code> (Violet)</td>
              </tr>
              <tr>
                <td><code>background</code></td>
                <td><code>string</code></td>
                <td>App background canvas color.</td>
                <td>Theme default</td>
              </tr>
              <tr>
                <td><code>surface</code></td>
                <td><code>string</code></td>
                <td>Card, modal, and popover surface color.</td>
                <td>Theme default</td>
              </tr>
              <tr>
                <td><code>text</code></td>
                <td><code>string</code></td>
                <td>Main body text color.</td>
                <td>Theme default</td>
              </tr>
              <tr>
                <td><code>border</code></td>
                <td><code>string</code></td>
                <td>Default border color for cards and dividers.</td>
                <td>Theme default</td>
              </tr>
              <tr>
                <td><code>ring</code></td>
                <td><code>string</code></td>
                <td>Focus outline ring color for inputs & buttons.</td>
                <td>Matches <code>primary</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="font-size: var(--nova-text-base); font-weight: 600; margin: var(--nova-space-4) 0 var(--nova-space-2);">
          <code>NovaThemeService</code> Methods
        </h3>
        <div class="docs-table-wrapper">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Parameters</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>setTheme(config)</code></td>
                <td><code>NovaThemeConfig</code></td>
                <td>Replaces the entire theme configuration.</td>
              </tr>
              <tr>
                <td><code>setColors(colors)</code></td>
                <td><code>Partial&lt;NovaThemeColors&gt;</code></td>
                <td>Overrides specific colors while keeping the rest.</td>
              </tr>
              <tr>
                <td><code>setRadius(radius)</code></td>
                <td><code>string | Partial&lt;NovaThemeRadius&gt;</code></td>
                <td>Updates border radius scale across all components.</td>
              </tr>
              <tr>
                <td><code>setMode(mode)</code></td>
                <td><code>'light' | 'dark' | 'system'</code></td>
                <td>Sets active color mode.</td>
              </tr>
              <tr>
                <td><code>toggleMode()</code></td>
                <td>—</td>
                <td>Toggles between light and dark modes.</td>
              </tr>
              <tr>
                <td><code>resetTheme()</code></td>
                <td>—</td>
                <td>Clears all overrides back to default styling.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 4: Pre-Made Presets -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          4. Ready-to-Use Presets
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          Copy and paste these pre-crafted themes into your <code>app.config.ts</code>:
        </p>
        <docs-code-block [code]="presetsCode" language="typescript"></docs-code-block>
      </section>
    </div>
  `,
})
export class ThemingComponent {
  private themeService = inject(NovaThemeService);

  activeColor = '#6366f1';
  activeRadius = '8px';

  colorPresets = [
    { name: 'Indigo', hex: '#6366f1' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Rose', hex: '#f43f5e' },
    { name: 'Amber', hex: '#f59e0b' },
    { name: 'Violet', hex: '#8b5cf6' },
    { name: 'Cyan', hex: '#06b6d4' },
  ];

  radiusPresets = [
    { label: 'Sharp (0px)', value: '0px' },
    { label: 'Default (8px)', value: '8px' },
    { label: 'Curved (14px)', value: '14px' },
    { label: 'Pill (9999px)', value: '9999px' },
  ];

  applyColor(hex: string): void {
    this.activeColor = hex;
    this.themeService.setColors({ primary: hex });
  }

  applyRadius(rad: string): void {
    this.activeRadius = rad;
    this.themeService.setRadius(rad);
  }

  resetTheme(): void {
    this.activeColor = '#6366f1';
    this.activeRadius = '8px';
    this.themeService.resetTheme();
  }

  appConfigCode = `// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideNovaUI } from '@nova-ui-library/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNovaUI({
      theme: {
        colors: {
          primary: '#10b981',       // Emerald brand color
          secondary: '#8b5cf6',     // Violet secondary accent
        },
        radius: '10px',             // 10px rounded border radius scale
        mode: 'light',              // 'light' | 'dark' | 'system'
      },
    }),
  ],
};`;

  themeServiceCode = `// Any Angular Component
import { Component, inject } from '@angular/core';
import { NovaThemeService, NovaButtonComponent } from '@nova-ui-library/angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NovaButtonComponent],
  template: \`
    <nova-button variant="outline" size="sm" (click)="theme.toggleMode()">
      {{ theme.isDark() ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </nova-button>

    <nova-button variant="primary" size="sm" (click)="setEmeraldTheme()">
      Emerald Theme
    </nova-button>
  \`,
})
export class SettingsComponent {
  theme = inject(NovaThemeService);

  setEmeraldTheme() {
    this.theme.setColors({
      primary: '#10b981',
      secondary: '#8b5cf6',
    });
  }
}`;

  presetsCode = `// Popular Color Presets for provideNovaUI({ theme: { ... } })

// 🌿 Emerald (Modern, eco, fintech)
const emeraldTheme = {
  colors: { primary: '#10b981', secondary: '#059669' },
  radius: '8px',
};

// 🌸 Rose (Vibrant, retail, social)
const roseTheme = {
  colors: { primary: '#f43f5e', secondary: '#e11d48' },
  radius: '12px',
};

// 💼 Corporate Blue (Enterprise, SaaS)
const corporateTheme = {
  colors: { primary: '#0284c7', secondary: '#0369a1' },
  radius: '6px',
};

// 🔮 Neon Violet (Creative, crypto, AI)
const violetTheme = {
  colors: { primary: '#8b5cf6', secondary: '#a855f7' },
  radius: '14px',
};`;
}
