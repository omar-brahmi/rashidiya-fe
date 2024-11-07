import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appWeightInput]',
  standalone: true
})
export class WeightInputDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);  // Regular expression for 2 decimals
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];  // Allow special keys

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    // Allow special keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const inputValue: string = this.el.nativeElement.value;
    const current: string = inputValue ? inputValue : '';
    const next: string = current.concat(event.key);

    // If the value does not match the regular expression, prevent default
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event']) onBlur() {
    // If the input is left with invalid data, format it properly
    const value = this.el.nativeElement.value;
    if (value && !isNaN(value)) {
      // Ensure value is formatted with two decimals
      this.el.nativeElement.value = parseFloat(value).toFixed(2);
    }
  }

}
