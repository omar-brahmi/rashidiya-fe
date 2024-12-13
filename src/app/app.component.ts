import {Component, inject, OnInit} from '@angular/core';
import {register} from "swiper/element/bundle";
import {Subscription} from "rxjs";
import {NavController, Platform} from "@ionic/angular";

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  #platform: Platform = inject(Platform);

  private backButtonSubscription?: Subscription

  constructor(private nav: NavController) {
  }

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(true);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
    this.handleBackButton();
  }

  initializeDarkPalette(isDark: boolean | undefined) {
    this.toggleDarkPalette(isDark);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean | undefined) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  handleBackButton() {
    this.backButtonSubscription = this.#platform.backButton.subscribeWithPriority(10, () => {
      this.nav.back();
    });
  }

}
