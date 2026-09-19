import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { COMPONENTS_DATA } from '../data/components-data';

@Component({
  selector: 'docs-components-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <div style="margin-bottom: var(--nova-space-8);">
        <span class="nova-badge nova-badge--primary nova-badge--sm" style="margin-bottom: var(--nova-space-2);">Components</span>
        <h1 style="font-size: var(--nova-text-3xl); font-weight: 800; margin: 0 0 var(--nova-space-2);">Component Library</h1>
        <p style="font-size: var(--nova-text-base); color: var(--nova-color-text-secondary); margin: 0; line-height: 1.6;">
          Production-ready components designed with design tokens, strict TypeScript, and accessible keyboard interactions.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--nova-space-10);">
        <section *ngFor="let cat of categories">
          <div style="display: flex; alignItems: center; gap: 8px; margin-bottom: var(--nova-space-4);">
            <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0;">{{ cat }} Components</h2>
            <span class="nova-badge nova-badge--ghost nova-badge--sm">{{ getComponents(cat).length }}</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--nova-space-4);">
            <a
              *ngFor="let comp of getComponents(cat)"
              [routerLink]="['/docs/components', comp.slug]"
              class="docs-feature-card"
              style="display: block; text-decoration: none;"
            >
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--nova-space-2);">
                <strong style="font-size: 1.125rem; color: var(--nova-color-text);">{{ comp.name }}</strong>
                <span style="font-size: 0.75rem; color: var(--nova-color-primary); font-weight: 500;">View API →</span>
              </div>
              <p style="margin: 0; font-size: 0.875rem; color: var(--nova-color-text-secondary); line-height: 1.5;">
                {{ comp.description }}
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class ComponentsOverviewComponent {
  categories = ['Foundational', 'Form', 'Interactive', 'Feedback'];

  getComponents(category: string) {
    return COMPONENTS_DATA.filter((c) => c.category === category);
  }
}
