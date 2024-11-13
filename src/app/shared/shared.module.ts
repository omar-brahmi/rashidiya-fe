import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimationLoader, LottieComponent, provideLottieOptions} from "ngx-lottie";
import player from "lottie-web";
import {LottieAnimationComponent} from "./components/lottie-animation/lottie-animation.component";
import {SpinnerComponent} from "./components/spinner/spinner.component";


@NgModule({
  declarations: [LottieAnimationComponent, SpinnerComponent],
  imports: [
    CommonModule,
    LottieComponent
  ],
  exports: [
    LottieAnimationComponent,
    SpinnerComponent
  ],
  providers: [
    AnimationLoader,
    provideLottieOptions({player: () => player})
  ]
})
export class SharedModule {
}
