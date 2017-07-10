import { Component, OnInit, Inject, HostListener } from '@angular/core';

import { Title, DOCUMENT } from '@angular/platform-browser';

import { TdLoadingService, TdDigitsPipe } from '@covalent/core';

import { UserService, IUser } from '../users';

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
export class DashboardComponent implements OnInit {
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
  items: Object[];
  users: IUser[];
  products: Object[];
  alerts: Object[];

  // Chart
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';

  colorScheme: any = {
    domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
  };

  // line, area
  autoScale: boolean = true;
  showButton: boolean = false;

  constructor(private _titleService: Title,
    private _itemsService: ItemsService,
    private _userService: UserService,
    private _alertsService: AlertsService,
    private _productsService: ProductsService,
    private _loadingService: TdLoadingService,
    private _windowService: WindowRefService,
    @Inject(DOCUMENT) private document: any) {
    // Chart
    this.multi = multi.map((group: any) => {
      group.series = group.series.map((dataItem: any) => {
        dataItem.name = new Date(dataItem.name);
        return dataItem;
      });
      return group;
    });

  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    alert('hi');
  }

  ngOnInit(): void {
    this._titleService.setTitle('TestManagement Blog');
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  showScroll(): boolean {
    if (this.document.body.scrollTop > 20 || this.document.documentElement.scrollTop > 20) {
      return true;
    }
    return false;
  }
}
