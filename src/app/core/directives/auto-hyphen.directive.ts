import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appAutoHyphen]',
  standalone: true
})
export class AutoHyphenDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, ''); // Remove all non-numeric characters

    // Restrict the length to a maximum of 15 digits
    if (value.length > 15) {
      value = value.substring(0, 15);
    }

    // Format the value: 000-0000-0000000-0
    if (value.length > 3 && value.length <= 7) {
      value = value.replace(/^(\d{3})(\d{0,4})/, '$1-$2');
    } else if (value.length > 7 && value.length <= 14) {
      value = value.replace(/^(\d{3})(\d{4})(\d{0,7})/, '$1-$2-$3');
    } else if (value.length === 15) {
      value = value.replace(/^(\d{3})(\d{4})(\d{7})(\d{0,1})/, '$1-$2-$3-$4');
    }

    // Set the formatted value back to the input field
    input.value = value;
  }

}
