import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appWeightInput]',
  standalone: true
})
export class WeightInputDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.includes(event.key)) {
      return;
    }

    const inputValue: string = this.el.nativeElement.value;
    const current: string = inputValue ? inputValue : '';
    const next: string = current.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    if (value && !isNaN(parseFloat(value))) {
      this.el.nativeElement.value = formatWeight(value);
    }
  }

}

export function formatWeight(value: string | number): string {
  const numValue = parseFloat(value.toString());
  return !isNaN(numValue) ? numValue.toFixed(2) : '0.00';
}

export function unformatWeight(value: string | number | undefined): number {
  if (value === undefined || value === null) return 0;
  const numericValue = value.toString().replace(/[^\d.-]/g, '');
  return parseFloat(numericValue) || 0;
}
