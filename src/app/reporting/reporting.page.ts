import {Component, inject} from '@angular/core';
import {creativeSegmentAnimation} from "../animations/fadeInOutAnimation";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.page.html',
  styleUrls: ['./reporting.page.scss'],
  animations: [creativeSegmentAnimation]

})
export class ReportingPage {

  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  segment: string = "consultation";

  constructor() {
    this.getSegmentParam();
  }

  getSegmentParam() {
    this.segment = 'consultation';
    const dayParam = this.#activatedRoute.snapshot.queryParamMap.get('reminder');
    if (dayParam == "true") {
      this.segment = 'reminder';
    }
  }

}
