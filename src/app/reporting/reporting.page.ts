import {Component} from '@angular/core';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.page.html',
  styleUrls: ['./reporting.page.scss'],
})
export class ReportingPage {

  segment: string = "consultation";

  constructor() {
  }

}
