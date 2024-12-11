import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).getLoggedUser() ? inject(AuthenticationService).redirectToHomePage() : true;
};
