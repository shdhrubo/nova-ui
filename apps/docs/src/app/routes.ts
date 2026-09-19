import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { GettingStartedComponent } from './pages/getting-started.component';
import { TokensComponent } from './pages/tokens.component';
import { ArchitectureComponent } from './pages/architecture.component';
import { ComponentsOverviewComponent } from './pages/components-overview.component';
import { ComponentDetailComponent } from './pages/component-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docs/getting-started', component: GettingStartedComponent },
  { path: 'docs/tokens', component: TokensComponent },
  { path: 'docs/architecture', component: ArchitectureComponent },
  { path: 'docs/components', component: ComponentsOverviewComponent },
  { path: 'docs/components/:slug', component: ComponentDetailComponent },
  { path: '**', redirectTo: '' },
];
