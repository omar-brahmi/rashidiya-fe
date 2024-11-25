import {Component, Input} from '@angular/core';
import {Client} from "../../../../core/models/client.model";

@Component({
  selector: 'app-card-client',
  templateUrl: './card-client.component.html',
  styleUrls: ['./card-client.component.scss'],
})
export class CardClientComponent {

  @Input() client: Client | null = null;

}
