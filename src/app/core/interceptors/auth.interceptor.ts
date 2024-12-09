import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const authToken = authenticationService.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 403) {
          authenticationService.logOut();
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      return throwError(() => err);
    })
  );
};
