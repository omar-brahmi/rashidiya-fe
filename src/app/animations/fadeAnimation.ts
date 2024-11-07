import {Injectable} from '@angular/core';
import {Animation, AnimationController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FadeAnimation {
  constructor(private animationCtrl: AnimationController) {
  }

  createAnimation(baseEl: HTMLElement, opts: any): Animation {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;

    const fadeIn = this.animationCtrl
      .create()
      .addElement(enteringEl)
      .duration(100)
      .fromTo('opacity', '1', '1');

    const fadeOut = this.animationCtrl
      .create()
      .addElement(leavingEl)
      .duration(100)
      .fromTo('opacity', '0', '0');

    const animation = this.animationCtrl.create();
    animation.addAnimation([fadeIn, fadeOut]);
    return animation;
  }

}
