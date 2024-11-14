import {Component} from '@angular/core';
import {creativeSegmentAnimation} from "../animations/fadeInOutAnimation";

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.page.html',
  styleUrls: ['./reporting.page.scss'],
  animations: [creativeSegmentAnimation]

})
export class ReportingPage {

  segment: string = "balancePerDay";

  constructor() {
  }

}
