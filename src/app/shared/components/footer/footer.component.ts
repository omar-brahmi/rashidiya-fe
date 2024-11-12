import {Component, inject} from '@angular/core';
import {NavController} from "@ionic/angular";
import {OperationService} from "../../../services/operation.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  #operationService: OperationService = inject(OperationService);
  #router: NavController = inject(NavController);

  redirectTo(url: string) {
    if (url === '/form/step-one-operation') {
      this.#operationService.destroyOperationSubject();
    }
    this.#router.navigateRoot([url]);
  }

}
