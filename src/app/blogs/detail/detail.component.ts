import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import { TdDialogService, TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';

import { BlogService } from '../services/blog.service';

import { IBlog } from '../data/interfaces';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'tmblog-blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class BlogsDetailComponent implements OnInit {
  TM_SUBTITLE: string = 'Web application to manage manually tests';
  TMBLOG_SUBTITLE: string = 'SPA to manage the blogs created for the TFG project (BSc FYP)';
  PLUG_SUBTITLE: string = 'Java application to plug in Elastest with Testlink';
  blogs: IBlog[];
  filteredBlogs: IBlog[];
  loading: boolean = true;
  blog: IBlog;
  id: number;
  project: string;
  projectSubtitle: string;


  constructor(private _BlogService: BlogService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MdSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService) { }

  goBack(): void {
    this._router.navigate(['/blogs']);
  }

  ngOnInit(): void {
    // this._route.url.subscribe((url: any) => {
    //   this.action = (url.length > 1 ? url[1].path : 'add');
    // });
    this._route.params.subscribe((params: { id: number, project: string }) => {
      this.id = params.id;
      this.project = params.project;
      this.load();
    });
    this.projectSubtitle = (this.project === 'TestManagement') ? this.TM_SUBTITLE : this.projectSubtitle;
    this.projectSubtitle = (this.project === 'Plugin') ? this.PLUG_SUBTITLE : this.projectSubtitle;
    this.projectSubtitle = (this.project === 'Plugin') ? this.PLUG_SUBTITLE : this.projectSubtitle;

  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('loadingBlog');
      this.loading = true;
      this.blogs = await this._BlogService.staticQuery().toPromise();
    } catch (error) {
      this.blogs = await this._BlogService.staticQuery().toPromise();
    } finally {
      this.filteredBlogs = Object.assign([], this.blogs);
      this.filteredBlogs = this.blogs.filter((blog: IBlog) => {
        return blog.id.toString().toLowerCase().indexOf(this.id.toString().toLowerCase()) > -1;
      });
      this.blog = this.filteredBlogs[0];
      this._loadingService.resolve('loadingBlog');
      this.loading = false;
    }
  }

}
