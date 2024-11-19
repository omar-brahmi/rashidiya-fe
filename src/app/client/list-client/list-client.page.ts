import {Component} from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
})
export class ListClientPage {

  constructor(private nav: NavController) {
  }

  redirectToNewClient() {
    this.nav.navigateRoot("/form-client");
  }

}
