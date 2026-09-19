import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { COMPONENTS_DATA } from '../data/components-data';

export interface SearchResultItem {
  title: string;
  description: string;
  path: string;
  category: string;
  group: 'Documentation' | 'Components';
}

export interface FlattenedSearchResultItem extends SearchResultItem {
  flatIndex: number;
}

export interface SearchGroup {
  name: string;
  items: FlattenedSearchResultItem[];
}

@Component({
  selector: 'docs-search-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div *ngIf="open" class="docs-modal-backdrop" (click)="closeModal()">
      <div
        class="docs-modal-dialog"
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-modal="true"
        aria-label="Documentation search"
      >
        <!-- Search Input Bar -->
        <div class="docs-modal-search-bar">
          <span class="docs-modal-search-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            #searchInput
            type="text"
            class="docs-modal-search-input"
            placeholder="Search documentation, components, tokens..."
            [(ngModel)]="query"
            (ngModelChange)="onQueryChange()"
            (keydown)="onInputKeyDown($event)"
          />
          <button
            *ngIf="query"
            type="button"
            class="docs-modal-clear-btn"
            (click)="query = ''; onQueryChange()"
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <kbd class="docs-modal-esc-badge" (click)="closeModal()">ESC</kbd>
        </div>

        <!-- Search Results Body -->
        <div class="docs-modal-body" #resultsContainer role="listbox">
          <!-- Empty State -->
          <div *ngIf="filteredResults.length === 0" class="docs-modal-empty">
            <div class="docs-modal-empty__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <p class="docs-modal-empty__title">No results found for "<strong>{{ query }}</strong>"</p>
            <p class="docs-modal-empty__subtitle">Try searching for keywords like <em>Button</em>, <em>Modal</em>, <em>Dropdown</em>, or <em>Tokens</em>.</p>
          </div>

          <!-- Grouped Results -->
          <div *ngFor="let group of groupedResults" class="docs-modal-group">
            <div class="docs-modal-group__header">{{ group.name }}</div>
            <div class="docs-modal-group__items">
              <a
                *ngFor="let item of group.items"
                [routerLink]="item.path"
                (click)="selectItem(item, $event)"
                (mouseenter)="selectedIndex = item.flatIndex"
                class="docs-modal-item"
                [class.docs-modal-item--active]="selectedIndex === item.flatIndex"
                [id]="'search-item-' + item.flatIndex"
                role="option"
                [attr.aria-selected]="selectedIndex === item.flatIndex"
              >
                <div class="docs-modal-item__main">
                  <div class="docs-modal-item__title-row">
                    <span class="docs-modal-item__title">{{ item.title }}</span>
                    <span class="docs-modal-item__badge">{{ item.category }}</span>
                  </div>
                  <p *ngIf="item.description" class="docs-modal-item__desc">{{ item.description }}</p>
                </div>
                <div class="docs-modal-item__shortcut">
                  <svg class="docs-modal-item__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Footer Helper Navigation -->
        <div class="docs-modal-footer">
          <div class="docs-modal-shortcuts">
            <span class="docs-shortcut-pill"><kbd class="docs-kbd">↑</kbd><kbd class="docs-kbd">↓</kbd> Navigate</span>
            <span class="docs-shortcut-pill"><kbd class="docs-kbd">↵</kbd> Select</span>
            <span class="docs-shortcut-pill"><kbd class="docs-kbd">ESC</kbd> Close</span>
          </div>
          <div class="docs-modal-count" *ngIf="filteredResults.length > 0">
            {{ filteredResults.length }} result{{ filteredResults.length === 1 ? '' : 's' }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SearchModalComponent implements OnChanges {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  query = '';
  selectedIndex = 0;

  staticLinks: SearchResultItem[] = [
    {
      title: 'Getting Started',
      description: 'Installation, stylesheets setup, and standalone Angular usage',
      path: '/docs/getting-started',
      category: 'Guide',
      group: 'Documentation',
    },
    {
      title: 'Explore All Components',
      description: 'Complete catalog of standalone Angular UI components',
      path: '/docs/components',
      category: 'Catalog',
      group: 'Documentation',
    },
    {
      title: 'Design Tokens Explorer',
      description: 'Interactive color palettes, scales, spacing, radii, and shadows',
      path: '/docs/tokens',
      category: 'Foundations',
      group: 'Documentation',
    },
    {
      title: 'Architecture & CSS Layers',
      description: 'Cascade layers (@layer nova.*) and core accessibility patterns',
      path: '/docs/architecture',
      category: 'Architecture',
      group: 'Documentation',
    },
  ];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.selectedIndex = 0;
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      }, 50);
    }
  }

  get allItems(): SearchResultItem[] {
    const comps: SearchResultItem[] = COMPONENTS_DATA.map((c) => ({
      title: c.name,
      description: c.description,
      path: `/docs/components/${c.slug}`,
      category: c.category,
      group: 'Components',
    }));

    return [...this.staticLinks, ...comps];
  }

  get filteredResults(): SearchResultItem[] {
    if (!this.query.trim()) return this.allItems;
    const q = this.query.toLowerCase().trim();
    return this.allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }

  get groupedResults(): SearchGroup[] {
    const map = new Map<string, FlattenedSearchResultItem[]>();
    this.filteredResults.forEach((item, index) => {
      const flatItem: FlattenedSearchResultItem = { ...item, flatIndex: index };
      if (!map.has(item.group)) {
        map.set(item.group, []);
      }
      map.get(item.group)!.push(flatItem);
    });

    const groups: SearchGroup[] = [];
    for (const [name, items] of map.entries()) {
      groups.push({ name, items });
    }
    return groups;
  }

  onQueryChange(): void {
    this.selectedIndex = 0;
  }

  onInputKeyDown(e: KeyboardEvent): void {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.filteredResults.length > 0) {
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredResults.length;
        this.scrollToSelected();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.filteredResults.length > 0) {
        this.selectedIndex =
          (this.selectedIndex - 1 + this.filteredResults.length) % this.filteredResults.length;
        this.scrollToSelected();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = this.filteredResults[this.selectedIndex];
      if (selected) {
        this.selectItem(selected);
      }
    }
  }

  selectItem(item: SearchResultItem, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const path = item.path;
    this.closeModal();
    this.router.navigateByUrl(path);
  }

  scrollToSelected(): void {
    setTimeout(() => {
      const el = document.getElementById('search-item-' + this.selectedIndex);
      el?.scrollIntoView({ block: 'nearest' });
    }, 10);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.open = !this.open;
      this.openChange.emit(this.open);
    }
    if (e.key === 'Escape' && this.open) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.open = false;
    this.query = '';
    this.openChange.emit(false);
  }
}
