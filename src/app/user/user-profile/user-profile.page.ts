import {Component, inject} from '@angular/core';
import {User} from '../../core/models/user.model';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage {

  #authenticationService: AuthenticationService = inject(AuthenticationService);

  loggedUser: User | null = this.#authenticationService.getLoggedUser();

  constructor(private navController: NavController) {
  }

  goBack() {
    this.navController.back();
  }

  logout() {
    this.#authenticationService.logOut();
  }

}
