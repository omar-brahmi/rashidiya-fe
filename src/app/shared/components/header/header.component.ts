import {Component, inject, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Operation} from "../../../core/models/operation.model";
import {Status} from "../../../core/models/enumerations/status.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  #router: Router = inject(Router);

  @Input() title: string = "";
  @Input() backUrl: string = "";
  @Input() operation: Operation | null = null;

  backButton() {
    this.#router.navigate([this.backUrl]);
  }

  protected readonly Status = Status;
}
