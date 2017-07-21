import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService, TdDialogService, TdMediaService, StepState } from '@covalent/core';

import { FeaturesService, IFeature } from '../../../services';
import { BlogService } from '../services/blog.service';
import { IUser } from '../data/interfaces';

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
    users: IUser[];
    filteredUsers: IUser[];

    constructor(private _titleService: Title,
        private _loadingService: TdLoadingService,
        private _BlogService: BlogService) { }

    ngOnInit(): void {
        this._titleService.setTitle('Timeline');
        this.load();
    }

    filterUsers(displayName: string = ''): void {
        this.filteredUsers = this.users.filter((user: IUser) => {
            return user.displayName.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
        });
    }

    async load(): Promise<void> {
        try {
            this._loadingService.register('blogs.timeline');
            this.users = await this._BlogService.staticQuery().toPromise();
        } catch (error) {
            this.users = await this._BlogService.staticQuery().toPromise();
        } finally {
            this.filteredUsers = Object.assign([], this.users);
            this._loadingService.resolve('blogs.timeline');
        }
    }
}
