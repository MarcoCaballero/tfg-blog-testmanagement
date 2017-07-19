import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogsComponent } from './blogs.component';
import { BlogsFormComponent } from './form/form.component';
import { BlogTimelineComponent } from './timeline/timeline.component';
import { BlogsOverviewComponent } from './overview/overview.component';

const routes: Routes = [{
  path: 'blogs',
  component: BlogsComponent,
  children: [{
    path: '',
    component: BlogsOverviewComponent,
  }, {
    path: 'timeline',
    component: BlogTimelineComponent,
  },
  {
    path: ':id/edit',
    component: BlogsFormComponent,
  }],
}];

export const userRoutes: ModuleWithProviders = RouterModule.forChild(routes);
