import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MdSnackBarModule, MdIconModule, MdListModule, MdTooltipModule, MdCardModule, MdButtonModule,
  MdToolbarModule, MdInputModule, MdSlideToggleModule, MdMenuModule,
} from '@angular/material';

import {
  CovalentLoadingModule, CovalentDialogsModule, CovalentMediaModule, CovalentLayoutModule, CovalentMessageModule,
  CovalentSearchModule, CovalentCommonModule, CovalentExpansionPanelModule, CovalentChipsModule, CovalentStepsModule,
} from '@covalent/core';

import { CovalentMarkdownModule } from '@covalent/markdown';

import { BlogsComponent } from './blogs.component';

import { BlogsDetailComponent } from './detail/detail.component';

import { BlogsOverviewComponent } from './overview/overview.component';

import { BlogTimelineComponent } from './timeline/timeline.component';

import { BlogsItemComponent } from './item/item.component';

import { userRoutes } from './blogs.routes';

import { BlogService, USER_PROVIDER, USERS_API } from './services/blog.service';

import { IUser } from './data/interfaces';

export { BlogsComponent, BlogsDetailComponent, BlogService, IUser, USER_PROVIDER, USERS_API };

@NgModule({
  declarations: [
    BlogsComponent,
    BlogsDetailComponent,
    BlogTimelineComponent,
    BlogsOverviewComponent,
    BlogsItemComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    // angular modules
    CommonModule,
    FormsModule,
    RouterModule,
    // material modules
    MdSnackBarModule,
    MdIconModule,
    MdListModule,
    MdTooltipModule,
    MdCardModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdSlideToggleModule,
    MdMenuModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    CovalentExpansionPanelModule,
    CovalentMarkdownModule,
    CovalentChipsModule,
    CovalentStepsModule,
    CovalentMessageModule,
    // extra
    userRoutes,
  ], // modules needed to run this module
  providers: [
    { provide: USERS_API, useValue: '' },
    USER_PROVIDER,
  ],
})
export class BlogsModule { }
