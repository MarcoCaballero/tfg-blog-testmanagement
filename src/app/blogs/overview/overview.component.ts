import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { TdLoadingService, TdDialogService, TdMediaService, TdExpansionPanelComponent } from '@covalent/core';

import { BlogService } from '../services/blog.service';
import { IBlog } from '../data/interfaces';

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
    blogsOne: IBlog[];
    blogsTwo: IBlog[];
    blogsThree: IBlog[];
    filteredBlogsOne: IBlog[];
    filteredBlogsTwo: IBlog[];
    filteredBlogsThree: IBlog[];
    enableFailOne: boolean = false;
    enableFailTwo: boolean = false;
    enableFailThree: boolean = false;



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
        this.filteredBlogsOne = this.blogsOne.filter((blog1: IBlog) => {
            (title === '') ? this.expPan1.close() : this.expPan1.open();
            return blog1.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
        });
        this.filteredBlogsTwo = this.blogsTwo.filter((blog2: IBlog) => {
            (title === '') ? this.expPan2.close() : this.expPan2.open();
            return blog2.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
        });
        this.filteredBlogsThree = this.blogsThree.filter((blog3: IBlog) => {
            (title === '') ? this.expPan3.close() : this.expPan3.open();
            return blog3.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
        });

        this.enableFailOne = (this.filteredBlogsOne.length === 0);
        this.enableFailTwo = (this.filteredBlogsTwo.length === 0);
        this.enableFailThree = (this.filteredBlogsThree.length === 0);
    }

    async load(): Promise<void> {
        try {
            this._loadingService.register('blogs.overview');
            this.blogs = await this._BlogService.getAll().toPromise();
            this.blogsOne = await this._BlogService.getByProjectId(0).toPromise();
            this.blogsTwo = await this._BlogService.getByProjectId(1).toPromise();
            this.blogsThree = await this._BlogService.getByProjectId(2).toPromise();
        } catch (error) {
            this.blogsOne = await this._BlogService.getByProjectId(0).toPromise();
            this.blogsTwo = await this._BlogService.getByProjectId(1).toPromise();
            this.blogsThree = await this._BlogService.getByProjectId(2).toPromise();
        } finally {
            this.filteredBlogsOne = Object.assign([], this.blogsOne);
            this.filteredBlogsTwo = Object.assign([], this.blogsTwo);
            this.filteredBlogsThree = Object.assign([], this.blogsThree);
            this._loadingService.resolve('blogs.overview');
        }
    }

}
