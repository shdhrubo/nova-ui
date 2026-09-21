import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar.component';
import { SidebarComponent } from './components/sidebar.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent, FooterComponent],
  template: `
    <docs-navbar></docs-navbar>

    <!-- If Landing Page -->
    <ng-container *ngIf="isHomePage">
      <router-outlet></router-outlet>
      <docs-footer></docs-footer>
    </ng-container>

    <!-- If Docs Page -->
    <ng-container *ngIf="!isHomePage">
      <!-- Mobile Secondary Navigation Bar for Documentation Pages -->
      <div class="docs-mobile-sidebar-bar">
        <button
          type="button"
          class="docs-mobile-sidebar-toggle-btn"
          (click)="mobileSidebarOpen = !mobileSidebarOpen"
          aria-label="Toggle documentation menu"
        >
          <span style="font-size: 1.05rem;">📑</span>
          <span style="font-weight: 600; font-size: 0.875rem;">Documentation Menu</span>
          <span class="docs-mobile-sidebar-badge">{{ mobileSidebarOpen ? '▲ Close' : '▼ Browse Components' }}</span>
        </button>
      </div>

      <div class="docs-layout">
        <docs-sidebar
          class="docs-sidebar-wrapper"
          [class.docs-sidebar-wrapper--mobile-open]="mobileSidebarOpen"
          (linkClicked)="mobileSidebarOpen = false"
        ></docs-sidebar>

        <div
          *ngIf="mobileSidebarOpen"
          class="docs-mobile-sidebar-backdrop"
          (click)="mobileSidebarOpen = false"
          aria-hidden="true"
        ></div>

        <main class="docs-content">
          <router-outlet></router-outlet>
        </main>
      </div>
      <docs-footer></docs-footer>
    </ng-container>
  `,
})
export class AppComponent implements OnInit {
  isHomePage = true;
  mobileSidebarOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateRoute(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateRoute(event.urlAfterRedirects);
        this.mobileSidebarOpen = false;
        window.scrollTo(0, 0);
      });
  }

  private updateRoute(url: string): void {
    this.isHomePage = url === '/' || url === '';
    this.mobileSidebarOpen = false;
  }
}
