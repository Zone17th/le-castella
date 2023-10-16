import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  API_IGNORE_ACCESS_TOKEN = ['/api/admin/auth/login'];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('accessToken');
    const isIgnore = this.API_IGNORE_ACCESS_TOKEN.find(apiIgnore =>
      request.url.indexOf(apiIgnore) !== -1
    );
    if (!isIgnore && accessToken) {
      const authHeader = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authHeader);
    }
    return next.handle(request);
  }
}
