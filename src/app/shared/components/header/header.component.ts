import {Component, inject, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  #router: Router = inject(Router);

  @Input() title: string = "";
  @Input() backUrl: string = "";

  backButton() {
    this.#router.navigate([this.backUrl]);
  }

}
