import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptorService, RESTService } from '@covalent/http';

export interface IUser {
  displayName: string;
  id: string;
  email: string;
  created: Date;
  lastAccess: Date;
  siteAdmin: number;
}

export class BlogService extends RESTService<IUser> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/blogs',
    });
  }

  staticQuery(): Observable<IUser[]> {
    return this._http.get('data/users.json')
    .map((res: Response) => {
      return res.json();
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
