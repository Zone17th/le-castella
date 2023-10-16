import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, catchError, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private _router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      const errorCode: number = error.status;
      switch (errorCode) {
        case 403:
          this._router.navigateByUrl('/error/403');
          break;
        case 401:
          this._router.navigateByUrl('/auth/login');
          break;
        case 404:
          // this._router.navigateByUrl('/error/404');
          break;
      }

      return throwError(() => error);
    }));
  }
}
