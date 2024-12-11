import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthenticationService);

  const expirationTime = authService.getTokenExpiration();
  const currentTime = Math.floor(Date.now() / 1000);

  if (authService.getToken() && expirationTime && expirationTime > currentTime) {
    return true;
  } else {
    authService.logOut();
    return false
  }
};
