import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const isAuth = inject(AuthService).isAuth();
  const router = inject(Router);
  if (isAuth) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
