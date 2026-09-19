import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'docs-tokens',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div style="margin-bottom: var(--nova-space-8);">
        <span class="nova-badge nova-badge--primary nova-badge--sm" style="margin-bottom: var(--nova-space-2);">Foundations</span>
        <h1 style="font-size: var(--nova-text-3xl); font-weight: 800; margin: 0 0 var(--nova-space-2);">Design Tokens</h1>
        <p style="font-size: var(--nova-text-base); color: var(--nova-color-text-secondary); margin: 0; line-height: 1.6;">
          Explore the design tokens defined in <code>&#64;nova-ui/tokens</code> and exposed as CSS Custom Properties in <code>&#64;nova-ui/styles</code>.
        </p>
      </div>

      <!-- Color Palettes -->
      <section style="margin-bottom: var(--nova-space-12);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          Color Palettes
        </h2>
        <p style="color: var(--nova-color-text-secondary); margin: 0 0 var(--nova-space-6); line-height: 1.5;">
          Curated harmonious color curves tailored for accessible contrast across light and dark modes.
        </p>

        <div style="display: flex; flex-direction: column; gap: var(--nova-space-6);">
          <div *ngFor="let scale of colorScales" style="border: 1px solid var(--nova-color-border); border-radius: var(--nova-radius-lg); padding: var(--nova-space-4); background: var(--nova-color-card);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--nova-space-3);">
              <div>
                <strong style="font-size: 1rem; color: var(--nova-color-text);">{{ scale.name }}</strong>
                <code style="margin-left: 8px; font-size: 0.75rem; color: var(--nova-color-primary); background: var(--nova-color-muted); padding: 2px 6px; border-radius: 4px;">{{ scale.token }}</code>
              </div>
              <span style="font-size: 0.8125rem; color: var(--nova-color-text-secondary);">{{ scale.description }}</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: var(--nova-space-3);">
              <div *ngFor="let shade of scale.shades" style="border-radius: var(--nova-radius-md); overflow: hidden; border: 1px solid var(--nova-color-border);">
                <div [style.background-color]="shade.hex" style="height: 56px;"></div>
                <div style="padding: 6px 8px; background: var(--nova-color-card); font-size: 0.75rem; display: flex; justify-content: space-between;">
                  <span style="font-weight: 600;">{{ shade.label }}</span>
                  <span style="color: var(--nova-color-text-muted); font-family: var(--nova-font-mono);">{{ shade.hex }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Typography -->
      <section style="margin-bottom: var(--nova-space-12);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          Typography Scale
        </h2>
        <div class="docs-table-wrapper">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Font Size</th>
                <th>Line Height</th>
                <th>Sample</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let t of typographyScales">
                <td><code>{{ t.token }}</code></td>
                <td>{{ t.size }}</td>
                <td>{{ t.line }}</td>
                <td [style.font-size]="'var(' + t.token + ')'" style="font-weight: 500;">{{ t.sample }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Spacing & Radii -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--nova-space-8);">
        <section>
          <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
            Spacing Scale
          </h2>
          <div class="docs-table-wrapper">
            <table class="docs-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Value</th>
                  <th>Visual Bar</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of spacingScale">
                  <td><code>{{ s.token }}</code></td>
                  <td>{{ s.value }}</td>
                  <td>
                    <div [style.width]="'var(' + s.token + ')'" style="height: 12px; background: var(--nova-color-primary); border-radius: 2px;"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
            Border Radii
          </h2>
          <div class="docs-table-wrapper">
            <table class="docs-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Value</th>
                  <th>Target Elements</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of radiusScale">
                  <td><code>{{ r.token }}</code></td>
                  <td>{{ r.value }}</td>
                  <td>{{ r.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class TokensComponent {
  colorScales = [
    {
      name: 'Primary (Indigo)',
      token: '--nova-color-primary',
      description: 'Core brand and primary interactive accents',
      shades: [
        { label: '50', hex: '#eef2ff' },
        { label: '100', hex: '#e0e7ff' },
        { label: '500', hex: '#6366f1' },
        { label: '600', hex: '#4f46e5' },
        { label: '700', hex: '#4338ca' },
      ],
    },
    {
      name: 'Secondary (Violet)',
      token: '--nova-color-secondary',
      description: 'Complementary accent and secondary highlights',
      shades: [
        { label: '50', hex: '#f5f3ff' },
        { label: '500', hex: '#8b5cf6' },
        { label: '600', hex: '#7c3aed' },
        { label: '700', hex: '#6d28d9' },
      ],
    },
    {
      name: 'Success (Emerald)',
      token: '--nova-color-success',
      description: 'Positive outcomes, completed states, and verified badges',
      shades: [
        { label: '50', hex: '#ecfdf5' },
        { label: '500', hex: '#10b981' },
        { label: '600', hex: '#059669' },
      ],
    },
    {
      name: 'Danger (Rose)',
      token: '--nova-color-danger',
      description: 'Error alerts, destructive buttons, and validation warnings',
      shades: [
        { label: '50', hex: '#fff1f2' },
        { label: '500', hex: '#f43f5e' },
        { label: '600', hex: '#e11d48' },
      ],
    },
    {
      name: 'Warning (Amber)',
      token: '--nova-color-warning',
      description: 'Cautions, pending notices, and non-blocking warnings',
      shades: [
        { label: '50', hex: '#fffbeb' },
        { label: '500', hex: '#f59e0b' },
        { label: '600', hex: '#d97706' },
      ],
    },
  ];

  typographyScales = [
    { token: '--nova-text-xs', size: '0.75rem', line: '1rem', sample: 'Microcopy & small tags' },
    { token: '--nova-text-sm', size: '0.875rem', line: '1.25rem', sample: 'Input labels & descriptions' },
    { token: '--nova-text-base', size: '1rem', line: '1.5rem', sample: 'Standard body reading text' },
    { token: '--nova-text-lg', size: '1.125rem', line: '1.75rem', sample: 'Card titles & callouts' },
    { token: '--nova-text-xl', size: '1.25rem', line: '1.75rem', sample: 'Section subheadings' },
    { token: '--nova-text-2xl', size: '1.5rem', line: '2rem', sample: 'Section titles' },
    { token: '--nova-text-3xl', size: '1.875rem', line: '2.25rem', sample: 'Page headings' },
    { token: '--nova-text-4xl', size: '2.25rem', line: '2.5rem', sample: 'Hero headlines' },
  ];

  spacingScale = [
    { token: '--nova-space-1', value: '4px' },
    { token: '--nova-space-2', value: '8px' },
    { token: '--nova-space-3', value: '12px' },
    { token: '--nova-space-4', value: '16px' },
    { token: '--nova-space-6', value: '24px' },
    { token: '--nova-space-8', value: '32px' },
    { token: '--nova-space-12', value: '48px' },
    { token: '--nova-space-16', value: '64px' },
  ];

  radiusScale = [
    { token: '--nova-radius-sm', value: '4px', desc: 'Inputs & small badges' },
    { token: '--nova-radius-md', value: '6px', desc: 'Buttons & dropdown menus' },
    { token: '--nova-radius-lg', value: '8px', desc: 'Cards & alerts' },
    { token: '--nova-radius-xl', value: '12px', desc: 'Modals & dialogs' },
    { token: '--nova-radius-full', value: '9999px', desc: 'Pills, spinners, avatars' },
  ];
}
