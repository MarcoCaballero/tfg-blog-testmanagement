import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptorService, RESTService } from '@covalent/http';

import { IBlog } from '../data/interfaces';

export class BlogService extends RESTService<IBlog> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/blogs',
    });
  }

  staticQuery(): Observable<IBlog[]> {
    return this._http.get('data/blogs.json')
      .map((res: Response) => {
        return res.json();
      });
  }

  getAll(): Observable<IBlog[]> {
    return this._http.get('data/blogs.json')
      .map((response: Response) => {
        return response.json();
      });
  }

  getById(id: number): Observable<IBlog> {
    return this._http.get('data/blogs.json')
      .map((response: Response) => {
        let all: IBlog[] = response.json();
        all = all.filter((blog: IBlog) => {
          return blog.id.toString().toLowerCase().indexOf(id.toString().toLowerCase()) > -1;
        });
        let selected: IBlog = all[0];

        return selected;
      });
  }

  getByProject(project: string): Observable<IBlog[]> {
    return this._http.get('data/blogs.json')
      .map((response: Response) => {
        let all: IBlog[] = response.json();
        all = all.filter((blog: IBlog) => {
          return blog.project.toLowerCase().indexOf(project.toLowerCase()) > -1;
        });

        return all;
      });
  }

  getByProjectId(projectID: number): Observable<IBlog[]> {
    return this._http.get('data/blogs.json')
      .map((response: Response) => {
        let all: IBlog[] = response.json();
        all = all.filter((blog: IBlog) => {
          return blog.projectID.toString().toLowerCase().indexOf(projectID.toString().toLowerCase()) > -1;
        });

        return all;
      });
  }

}

export const USERS_API: InjectionToken<string> = new InjectionToken<string>('USERS_API');

export function USER_PROVIDER_FACTORY(
  parent: BlogService, interceptorHttp: HttpInterceptorService, api: string): BlogService {
  return parent || new BlogService(interceptorHttp, api);
}

export const USER_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: BlogService,
  deps: [[new Optional(), new SkipSelf(), BlogService], HttpInterceptorService, USERS_API],
  useFactory: USER_PROVIDER_FACTORY,
};
