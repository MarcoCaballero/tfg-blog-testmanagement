import { Component, AfterViewInit, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdMediaService } from '@covalent/core';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'tmblog-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements AfterViewInit, OnInit {

  title: string;
  fabToggle: boolean = false;
  firsTimeFab: boolean = true;

  constructor(private _titleService: Title,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService) { }

  ngOnInit(): void {
    this._titleService.setTitle('Product Dashboard');
    this.title = this._titleService.getTitle();
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

}
