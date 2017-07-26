import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService, TdDialogService, TdMediaService, StepState } from '@covalent/core';

import { FeaturesService, IFeature } from '../../../services';
import { BlogService } from '../services/blog.service';
import { IBlog } from '../data/interfaces';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'tmblog-blog-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    viewProviders: [FeaturesService],
})
export class BlogTimelineComponent implements OnInit {

    stateStep: StepState = StepState.Complete;
    disabled: boolean = false;
    blogs: IBlog[];
    filteredBlogs: IBlog[];

    constructor(private _titleService: Title,
        private _loadingService: TdLoadingService,
        private _BlogService: BlogService) { }

    ngOnInit(): void {
        this._titleService.setTitle('Timeline');
        this.load();
    }

    filterBlogs(title: string = ''): void {
        this.filteredBlogs = this.blogs.filter((blog: IBlog) => {
            return blog.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
        });
    }

    async load(): Promise<void> {
        try {
            this._loadingService.register('blogs.timeline');
            this.blogs = await this._BlogService.staticQuery2().toPromise();
        } catch (error) {
            this.blogs = await this._BlogService.staticQuery2().toPromise();
        } finally {
            this.filteredBlogs = Object.assign([], this.blogs);
            this._loadingService.resolve('blogs.timeline');
        }
    }
}
