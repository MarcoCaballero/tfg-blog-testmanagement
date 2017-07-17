import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { routes } from '../shared/routes';

@Component({
  selector: 'tmblog-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[];

  constructor(private _router: Router) {
    this.routes = routes;
  }

  logout(): void {
    this._router.navigate(['/login']);
  }

}
