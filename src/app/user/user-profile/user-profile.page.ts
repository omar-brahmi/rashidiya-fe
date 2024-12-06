import { Component, OnInit } from '@angular/core';
import { Role, User } from '../../core/models/user.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user: User = {
    id: 1,
    firstname: 'Amir',
    lastname: 'Elghribi',
    role: Role.ADMIN,
    username: 'amirelghribi',
    email: 'amir.elghribi@example.com',
    password: ''
  };

  stats = {
    operations: 2451,
    clients: 1257
  };

  constructor(private navController: NavController) { }

  ngOnInit() {
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
    // Implement logout logic
    console.log('Logout clicked');
  }
}
