import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService, TdDialogService, TdMediaService, StepState } from '@covalent/core';

import { BlogService } from '../services/blog.service';
import { IBlog, ITimeBlog } from '../data/interfaces';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'tmblog-blog-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
})
export class BlogTimelineComponent implements OnInit {

    stateStep: StepState = StepState.Complete;
    disabled: boolean = false;
    blogs: IBlog[];
    filteredBlogsArray: ITimeBlog[] = [];

    constructor(private _titleService: Title,
        private _loadingService: TdLoadingService,
        private _BlogService: BlogService) { }

    ngOnInit(): void {
        this._titleService.setTitle('Timeline');
        this.load();
        this.filteredBlogsArray = [
            { name: 'July, 2017' },
            { name: 'August, 2017' },
            { name: 'September, 2017' },
            { name: 'October, 2017' },
            { name: 'November, 2017' },
            { name: 'December, 2017' },
            { name: 'January, 2018' },
            { name: 'February, 2018' },
            { name: 'March, 2018' },
            { name: 'April, 2018' },
            { name: 'May, 2018' },
            { name: 'June, 2018' },
            { name: 'July, 2018' },
        ];
    }

    async load(): Promise<void> {
        try {
            this._loadingService.register('blogs.timeline');
            this.blogs = await this._BlogService.staticQuery().toPromise();
        } catch (error) {
            this.blogs = await this._BlogService.staticQuery().toPromise();
        } finally {
            this.processBlogsTimeline(this.blogs); // Call to processing and dissect blogs by date
            this._loadingService.resolve('blogs.timeline');
        }
    }

    // Processing each blog by year and month
    processBlogsTimeline(blogs: IBlog[]): void {
        let month: number = 7; // First month July
        let year: number = 2017; // First year 2017

        this.filteredBlogsArray.forEach((item: ITimeBlog) => {
            item.blogs = blogs.filter((blog: IBlog) => {
                return ((blog.month === month) && (blog.year === year));
            });
            item.blogs.sort(ByDay);
            month++;
            year = (month > 12) ? 2018 : year; // Next year 2018
            month = (month > 12) ? 1 : month; // Checking natural months
        });
    }

}

export function ByDay(a: IBlog, b: IBlog): number {
    return + (a.day > b.day);
}
