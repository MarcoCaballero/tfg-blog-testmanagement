import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogsComponent } from './blogs.component';
import { BlogsFormComponent } from './form/form.component';

const routes: Routes = [{
    path: 'blogs',
    children: [{
      path: '',
      component: BlogsComponent,
    }, {
      path: 'add',
      component: BlogsFormComponent,
    }, {
      path: ':id/edit',
      component: BlogsFormComponent,
    }],
}];

export const userRoutes: ModuleWithProviders = RouterModule.forChild(routes);
