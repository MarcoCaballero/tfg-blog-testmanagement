import { Component, OnInit, OnDestroy, NgZone, ElementRef } from '@angular/core';

import { tick } from '@angular/core/testing';

import { Title } from '@angular/platform-browser';

import { TdLoadingService, TdDigitsPipe } from '@covalent/core';

import { BlogService, IUser } from '../blogs';

import { routes, IRoutesObject } from '../shared/routes';

import { ItemsService, ProductsService, AlertsService, WindowRefService } from '../../services';

import { multi } from './data';

export interface IStackLogos {
  name: string;
  logo: string;
}

@Component({
  selector: 'tmblog-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [ItemsService, ProductsService, AlertsService, WindowRefService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  logos: IStackLogos[] = [
    { name: 'angular', logo: 'assets:angular' },
    { name: 'spring', logo: 'assets:spring' },
    { name: 'travis', logo: 'assets:travis' },
  ];
  logosBottom: IStackLogos[] = [
    { name: 'docker', logo: 'assets:docker' },
    { name: 'covalent', logo: 'assets:covalent-mark' },
    { name: 'elastest', logo: 'assets:elastest' },
  ];

  routes: IRoutesObject[];
  hasScrollYet: boolean = false;
  scrollToZ: boolean = false;
  fabToggle: boolean = false;

  constructor(private _titleService: Title,
    private _itemsService: ItemsService,
    private _BlogService: BlogService,
    private _alertsService: AlertsService,
    private _productsService: ProductsService,
    private _loadingService: TdLoadingService,
    private _winService: WindowRefService,
    private _ngzone: NgZone,
    private el: ElementRef) { }

  ngOnInit(): void {
    this._titleService.setTitle('TestManagement Blog');
    this.routes = routes;
    // NgZone to catch scroll events
    this._ngzone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.scroll, true);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
    this.hasScrollYet = !this.hasScrollYet;
  }

  scroll = (evento: any): void => {
    const scrollTop: number = this.el.nativeElement.querySelector('.md-content').scrollTop;
    this._ngzone.run(() => {

      if (!this.hasScrollYet && scrollTop > 340) {
        this.hasScrollYet = !this.hasScrollYet;
      }
      if (scrollTop >= 350) {
        this.fabToggle = true;
      } else {
        if (scrollTop === 0) {
          this.scrollToZ = false;
        }
        this.fabToggle = false;
      }
    });
  }

  scrollToZero(): void {
    this.scrollToZ = true;
    // this.el.nativeElement.querySelector('.md-content').scrollTop = 0; //Hard jump
    this.el.nativeElement.querySelector('#mainComponent-main').scrollIntoView({ behaviour: 'smooth' });

  }

}
