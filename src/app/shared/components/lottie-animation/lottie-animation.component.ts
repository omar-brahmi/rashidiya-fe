import {Component, Input} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-lottie-animation',
  templateUrl: './lottie-animation.component.html',
  styleUrls: ['./lottie-animation.component.scss'],
})
export class LottieAnimationComponent {

  @Input() options!: AnimationOptions;

}
