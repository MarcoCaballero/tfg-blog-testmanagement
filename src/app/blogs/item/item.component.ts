import { Component, Input } from '@angular/core';

import { BlogService } from '../services/blog.service';

import { IBlog } from '../data/interfaces';

@Component({
    selector: 'tmblog-blogs-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class BlogsItemComponent {
    @Input() blog: IBlog;
}
