import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-operation',
  templateUrl: './card-operation.component.html',
  styleUrls: ['./card-operation.component.scss'],
})
export class CardOperationComponent  implements OnInit {

  @Input() isFlipped = false;
  @Input() index: number | undefined;

  constructor() { }

  ngOnInit() {}

}
