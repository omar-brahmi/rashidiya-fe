import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimationLoader, LottieComponent, provideLottieOptions} from "ngx-lottie";
import player from "lottie-web";
import {LottieAnimationComponent} from "./components/lottie-animation/lottie-animation.component";


@NgModule({
  declarations: [LottieAnimationComponent],
  imports: [
    CommonModule,
    LottieComponent
  ],
  exports: [
    LottieAnimationComponent
  ],
  providers: [
    AnimationLoader,
    provideLottieOptions({player: () => player})
  ]
})
export class SharedModule {
}
