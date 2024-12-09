import {Component, inject} from '@angular/core';
import {Role, User} from '../../core/models/user.model';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage {

  #authenticationService: AuthenticationService = inject(AuthenticationService);

  user: User = {
    id: 1,
    firstname: 'Amir',
    lastname: 'Elghribi',
    role: Role.ADMIN,
    username: 'amirelghribi',
    email: 'amir.elghribi@example.com',
    password: ''
  };

  constructor(private navController: NavController) {
  }

  getInitials(): string {
    return `${this.user.firstname.charAt(0)}${this.user.lastname.charAt(0)}`;
  }

  goBack() {
    this.navController.back();
  }

  editProfile() {
    // Implement edit profile logic
    console.log('Edit profile clicked');
  }

  logout() {
    this.#authenticationService.logOut();
  }

}
