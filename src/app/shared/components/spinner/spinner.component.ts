import {Component} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {

  options: AnimationOptions = {
    path: '/assets/lottiefiles/spinner.json',
    loop: true,
    autoplay: true
  };

}
