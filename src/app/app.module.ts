import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {AnimationController, IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FadeAnimation} from "./animations/fadeAnimation";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationService} from "./services/authentication.service";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";

export function initializeApp(authService: AuthenticationService): () => Promise<void> {
  return (): Promise<void> => authService.setLoggedUser();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, IonicModule.forRoot({
    navAnimation: (baseEl, opts) => {
      const fadeAnimationService = new FadeAnimation(new AnimationController());
      return fadeAnimationService.createAnimation(baseEl, opts);
    }
  }), AppRoutingModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    FadeAnimation,
    provideHttpClient(withInterceptors([AuthInterceptor])),
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthenticationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
