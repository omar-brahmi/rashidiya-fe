import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {AnimationController, IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FadeAnimation} from "./animations/fadeAnimation";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    navAnimation: (baseEl, opts) => {
      const fadeAnimationService = new FadeAnimation(new AnimationController());
      return fadeAnimationService.createAnimation(baseEl, opts);
    }
  }), AppRoutingModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, FadeAnimation],
  bootstrap: [AppComponent]
})
export class AppModule {
}
