import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routes, IRoutesObject } from '../shared/routes';

@Component({
  selector: 'tmblog-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  routes: IRoutesObject[];
  routesExactTrue: IRoutesObject[];
  routesExactFalse: IRoutesObject[];

  constructor(private _router: Router) {
    this.routes = routes;
  }

  ngOnInit(): void {
    this.routesExactTrue = this.routes.slice(0, 1);
    this.routesExactFalse = this.routes.slice(1, this.routes.length);
  }

  logout(): void {
    this._router.navigate(['/login']);
  }

}
