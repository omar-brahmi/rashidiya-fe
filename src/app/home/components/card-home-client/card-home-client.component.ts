import {Component, Input} from '@angular/core';
import {Client} from "../../../core/models/client.model";

@Component({
  selector: 'app-card-home-client',
  templateUrl: './card-home-client.component.html',
  styleUrls: ['./card-home-client.component.scss'],
  standalone: true
})
export class CardHomeClientComponent {

  @Input() client: Client | null = null;

}
