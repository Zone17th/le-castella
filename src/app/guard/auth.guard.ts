import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  // return true;
  if (localStorage.getItem('accessToken')) {
    return true;
  }
  const router: Router = inject(Router);

  router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}})
    .then(r =>localStorage.setItem('returnUrl', state.url));
  return false;
};
