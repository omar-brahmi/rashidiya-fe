import {Component, Input} from '@angular/core';
import {Operation} from "../../../core/models/operation.model";
import {DatePipe, NgClass} from "@angular/common";
import {HomePageModule} from "../../../home/home.module";
import {IonicModule} from "@ionic/angular";
import {ListPageModule} from "../../../operation/list/list.module";
import {NgxIonicImageViewerModule} from "@herdwatch-apps/ngx-ionic-image-viewer";
import {Status} from "../../../core/models/enumerations/status.enum";
import {getStateDisplayName, State} from "../../../core/models/enumerations/state.enum";
import {formatNumberToCash} from "../../../core/directives/cash-format.directive";

@Component({
  selector: 'app-operation-detail',
  templateUrl: './operation-detail.component.html',
  styleUrls: ['./operation-detail.component.scss'],
  imports: [
    DatePipe,
    HomePageModule,
    IonicModule,
    ListPageModule,
    NgxIonicImageViewerModule,
    NgClass
  ],
  standalone: true
})
export class OperationDetailComponent {

  @Input() indexView: number = 0;
  @Input() operation: Operation | null = null;

  protected readonly Status = Status;
  protected readonly getStateDisplayName = getStateDisplayName;
  protected readonly State = State;
  protected readonly formatNumberToCash = formatNumberToCash;
}
