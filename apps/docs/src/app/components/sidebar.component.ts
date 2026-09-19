import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { COMPONENTS_DATA } from '../data/components-data';

@Component({
  selector: 'docs-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="docs-sidebar">
      <!-- Overview Group -->
      <div class="docs-sidebar__group">
        <h4 class="docs-sidebar__title">Overview</h4>
        <ul class="docs-sidebar__nav">
          <li>
            <a
              routerLink="/docs/getting-started"
              routerLinkActive="docs-sidebar__link--active"
              (click)="onLinkClick()"
              class="docs-sidebar__link"
            >
              <span>Getting Started</span>
            </a>
          </li>
          <li>
            <a
              routerLink="/docs/tokens"
              routerLinkActive="docs-sidebar__link--active"
              (click)="onLinkClick()"
              class="docs-sidebar__link"
            >
              <span>Design Tokens</span>
              <span class="nova-badge nova-badge--secondary nova-badge--sm">Tokens</span>
            </a>
          </li>
          <li>
            <a
              routerLink="/docs/architecture"
              routerLinkActive="docs-sidebar__link--active"
              (click)="onLinkClick()"
              class="docs-sidebar__link"
            >
              <span>Architecture & CSS Layers</span>
            </a>
          </li>
          <li>
            <a
              routerLink="/docs/components"
              routerLinkActive="docs-sidebar__link--active"
              (click)="onLinkClick()"
              class="docs-sidebar__link"
            >
              <span>All Components</span>
              <span class="nova-badge nova-badge--primary nova-badge--sm">Explore</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Categories -->
      <div *ngFor="let cat of categories" class="docs-sidebar__group">
        <h4 class="docs-sidebar__title">{{ cat.name }} Components</h4>
        <ul class="docs-sidebar__nav">
          <li *ngFor="let comp of getCategoryComponents(cat.name)">
            <a
              [routerLink]="['/docs/components', comp.slug]"
              routerLinkActive="docs-sidebar__link--active"
              (click)="onLinkClick()"
              class="docs-sidebar__link"
            >
              <span>{{ comp.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  @Output() linkClicked = new EventEmitter<void>();

  categories = [
    { name: 'Foundational' },
    { name: 'Form' },
    { name: 'Interactive' },
    { name: 'Feedback' },
  ];

  getCategoryComponents(category: string) {
    return COMPONENTS_DATA.filter((c) => c.category === category);
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }
}
