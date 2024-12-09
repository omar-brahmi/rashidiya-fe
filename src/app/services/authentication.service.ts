import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService} from "../shared/forms/generics/services/http.service";
import {User} from "../core/models/user.model";
import {AuthenticationRequest} from "../core/models/AuthenticationRequest.model";
import {AuthenticationResponse} from "../core/models/AuthenticationResponse.model";
import {jwtDecode} from "jwt-decode";
import {UserService} from "./user.service";
import {ToastService} from "../shared/services/toast.service";
import {NavController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #httpService: HttpService = inject(HttpService);
  #userService: UserService = inject(UserService);
  #toastService: ToastService = inject(ToastService);

  private loggedUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public loggedUser$: Observable<User | null> = this.loggedUserSubject.asObservable();

  constructor(private navCtrl: NavController) {
  }

  authentication(data: AuthenticationRequest) {
    this.#httpService.post<AuthenticationResponse, AuthenticationRequest>('auth/signin', data).subscribe({
      next: res => {
        this.saveCredentials(res);
        this.setLoggedUser().then(value => {
          this.redirectToHomePage();
        });
      },
      error: error => {
        console.error(error);
        this.#toastService.error('username or password is incorrect')
      }
    })
  }

  private saveCredentials(authenticationResponse: AuthenticationResponse) {
    localStorage.setItem('token', authenticationResponse.token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getSubFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken?.sub || null;
      } catch (error) {
        console.error('Invalid token format', error);
        return null;
      }
    }
    return null;
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken?.roles || null;
      } catch (error) {
        console.error('Invalid token format', error);
        return null;
      }
    }
    return null;
  }

  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.exp || null; // Return expiration time or null if not found
      } catch (error) {
        console.error('Failed to decode token', error);
        return null; // Return null if decoding fails
      }
    }
    return null; // Return null if no token is found
  }

  setLoggedUser(): Promise<void> {
    return new Promise<void>((resolve) => {
      const subToken: string | null = this.getSubFromToken();
      if (subToken) {
        this.#userService.getOneObservable(subToken).subscribe({
          next: (user) => {
            this.loggedUserSubject.next(user);
            resolve();
          },
          error: (err) => {
            console.error("Failed to load user:", err);
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }


  getLoggedUser(): User | null {
    return this.loggedUserSubject.value;
  }

  logOut() {
    localStorage.clear();
    this.loggedUserSubject.next(null);
    this.navCtrl.navigateRoot(['/auth/login'], {replaceUrl: true});
  }

  redirectToHomePage() {
    this.navCtrl.navigateRoot(['/home'], {replaceUrl: true});
    return false;
  }

}
