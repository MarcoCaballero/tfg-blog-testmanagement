import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tmblog-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
    title: 'Dashboard',
    route: '/',
    icon: 'dashboard',
  }, {
    title: 'Product Dashboard',
    route: '/product',
    icon: 'view_quilt',
  }, {
    title: 'Product Logs',
    route: '/logs',
    icon: 'receipt',
  }, {
    title: 'Blogs section',
    route: '/blogs',
    icon: 'forum',
  },
  ];

  constructor(private _router: Router) { }

  logout(): void {
    this._router.navigate(['/login']);
  }

}
