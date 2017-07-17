import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import { TdDialogService, TdLoadingService } from '@covalent/core';

import { BlogService, IUser } from '../services/blog.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'tmblog-blog-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class BlogsFormComponent implements OnInit {

  users: IUser[];
  filteredUsers: IUser[];
  displayName: string;
  email: string;
  id: string;
  admin: boolean;
  user: IUser;
  action: string;

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
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: { id: string }) => {
      this.id = params.id;
      if (this.id) {
        this.load();
      }
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('blog.id');
      this.users = await this._BlogService.query().toPromise();
    } catch (error) {
      this.users = await this._BlogService.staticQuery().toPromise();
    } finally {
      this.filteredUsers = Object.assign([], this.users);
      this.filteredUsers = this.users.filter((user: IUser) => {
        return user.id.indexOf(this.id.toLowerCase()) > -1;
      });
      this.user = this.filteredUsers[0];
      this._loadingService.resolve('blog.id');
    }
  }

}
