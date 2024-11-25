import {Component, Input} from '@angular/core';
import {Client} from "../../../../../../../../../core/models/client.model";

@Component({
  selector: 'app-card-select-client',
  templateUrl: './card-select-client.component.html',
  styleUrls: ['./card-select-client.component.scss'],
})
export class CardSelectClientComponent {

  @Input() client: Client | null = null;

}
