import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { TdLoadingService, TdDialogService, TdMediaService, TdExpansionPanelComponent } from '@covalent/core';

import { BlogService } from '../services/blog.service';
import { IUser, IBlog } from '../data/interfaces';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'tmblog-blogs-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class BlogsOverviewComponent implements OnInit {
    @ViewChild('exppan1') expPan1: TdExpansionPanelComponent;
    @ViewChild('exppan2') expPan2: TdExpansionPanelComponent;
    @ViewChild('exppan3') expPan3: TdExpansionPanelComponent;
    disabled: boolean = false;
    chipAddition: boolean = false;
    chipRemoval: boolean = false;
    enableFail: boolean = false;

    f1Model: string[] = [
        'Angular',
        'Angular-Material',
        'Spring',
        'MySQL',
        'Teradata covalent',
    ];
    f2Model: string[] = [
        'Java',
        'Testlink-Java-Api',
        'Maven',
        'Elastest',
    ];
    f3Model: string[] = [
        'Angular',
        'Angular-Material',
        'JSON',
        'MarkDown',
        'Teradata covalent',
    ];

    blogs: IBlog[];
    filteredBlogs: IBlog[];

    constructor(private _titleService: Title,
        private _loadingService: TdLoadingService,
        private _dialogService: TdDialogService,
        private _snackBarService: MdSnackBar,
        private _BlogService: BlogService,
        public media: TdMediaService) {
    }

    ngOnInit(): void {
        this._titleService.setTitle('TestManagement Blogs');
        this.load();
    }

    filterBlogs(title: string = ''): void {
        this.filteredBlogs = this.blogs.filter((blog: IBlog) => {
            (title === '') ? this.expPan1.close() : this.expPan1.open();
            (title === '') ? this.expPan2.close() : this.expPan2.open();
            (title === '') ? this.expPan3.close() : this.expPan3.open();
            return blog.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
        });
        if (this.filteredBlogs.length === 0) {
            this.enableFail = true;
        } else {
            this.enableFail = false;
        }
    }

    async load(): Promise<void> {
        try {
            this._loadingService.register('blogs.overview');
            this.blogs = await this._BlogService.staticQuery2().toPromise();
        } catch (error) {
            this.blogs = await this._BlogService.staticQuery2().toPromise();
        } finally {
            this.filteredBlogs = Object.assign([], this.blogs);
            this._loadingService.resolve('blogs.overview');
        }
    }
}
