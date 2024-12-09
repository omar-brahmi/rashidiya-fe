import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {BaseService} from "../shared/forms/generics/services/base.service";
import {User} from "../core/models/user.model";
import {HttpService} from "../shared/forms/generics/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  override entityName = 'user';

  #httpService: HttpService = inject(HttpService);

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable()

  constructor() {
    super();
  }

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return this.currentUser$;
  }

  clearUser() {
    this.currentUserSubject.next(null);
  }

}
