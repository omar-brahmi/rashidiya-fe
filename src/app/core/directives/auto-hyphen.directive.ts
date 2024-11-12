import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appAutoHyphen]',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoHyphenDirective),
    multi: true
  }]
})
export class AutoHyphenDirective implements ControlValueAccessor {
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef) {}

  writeValue(value: any): void {
    this.el.nativeElement.value = this.format(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 15) {
      value = value.substring(0, 15);
    }

    const formattedValue = this.format(value);

    input.value = formattedValue;

    this.onChange(formattedValue);
  }

  // Format the value as 000-0000-0000000-0
  private format(value: string): string {
    if (value.length > 3 && value.length <= 7) {
      return value.replace(/^(\d{3})(\d{0,4})/, '$1-$2');
    } else if (value.length > 7 && value.length <= 14) {
      return value.replace(/^(\d{3})(\d{4})(\d{0,7})/, '$1-$2-$3');
    } else if (value.length === 15) {
      return value.replace(/^(\d{3})(\d{4})(\d{7})(\d{0,1})/, '$1-$2-$3-$4');
    }
    return value;
  }
}
