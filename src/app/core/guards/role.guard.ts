import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Role} from "../models/user.model";
import {NavController} from "@ionic/angular";

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  const authService = inject(AuthenticationService);
  const router = inject(NavController);

  const userRole = authService.getRoleFromToken();

  const routeRoles: Role[] = route.data['roles'];

  if (routeRoles && userRole && routeRoles.includes(userRole as Role)) {
    return Promise.resolve(true);
  } else {
    return router.navigateRoot(['/login']);
  }
};
