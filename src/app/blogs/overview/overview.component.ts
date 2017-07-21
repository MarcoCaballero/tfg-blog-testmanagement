import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { TdLoadingService, TdDialogService, TdMediaService, TdExpansionPanelComponent } from '@covalent/core';

import { BlogService } from '../services/blog.service';
import { IUser } from '../data/interfaces';

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
    users: IUser[];
    filteredUsers: IUser[];

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

    filterUsers(displayName: string = ''): void {
        this.filteredUsers = this.users.filter((user: IUser) => {
            (displayName === '') ? this.expPan1.close() : this.expPan1.open();
            (displayName === '') ? this.expPan2.close() : this.expPan2.open();
            (displayName === '') ? this.expPan3.close() : this.expPan3.open();
            return user.displayName.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
        });
        if (this.filteredUsers.length === 0) {
            this.enableFail = true;
        } else {
            this.enableFail = false;
        }
    }

    async load(): Promise<void> {
        try {
            this._loadingService.register('blogs.overview');
            this.users = await this._BlogService.staticQuery().toPromise();
        } catch (error) {
            this.users = await this._BlogService.staticQuery().toPromise();
        } finally {
            this.filteredUsers = Object.assign([], this.users);
            this._loadingService.resolve('blogs.overview');
        }
    }
}
