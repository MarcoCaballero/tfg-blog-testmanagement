import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import { BlogService, IUser } from './services/blog.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'tmblog-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements AfterViewInit, OnInit {

  users: IUser[];
  filteredUsers: IUser[];
  disabled: boolean = false;
  fabToggle: boolean = false;
  firsTimeFab: boolean = true;

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MdSnackBar,
    private _BlogService: BlogService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('TestManagement Blogs');
    this.load();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    // force a new change detection cycle since change detections
    // have finished when `ngAfterViewInit` is executed
    this._changeDetectorRef.detectChanges();
  }

  switchFab(): void {
    if (this.firsTimeFab) {
      this.firsTimeFab = !this.firsTimeFab;
    }
    this.fabToggle = !this.fabToggle;
  }

  filterUsers(displayName: string = ''): void {
    this.filteredUsers = this.users.filter((user: IUser) => {
      return user.displayName.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('users.list');
      this.users = await this._BlogService.query().toPromise();
    } catch (error) {
      this.users = await this._BlogService.staticQuery().toPromise();
    } finally {
      this.filteredUsers = Object.assign([], this.users);
      this._loadingService.resolve('users.list');
    }
  }

 }
