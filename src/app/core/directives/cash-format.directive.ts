import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appCashFormat]'
})
export class CashFormatDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = this.formatCash(input.value);
  }

  private formatCash(value: string): string {
    // Remove any non-numeric characters except for the decimal comma
    value = value.replace(/[^\d,]/g, '');

    // Split integer and decimal parts
    const [integerPart, decimalPart] = value.split(',');

    // Add thousand separators to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Combine the integer part with the decimal part (if it exists)
    return decimalPart != null ? `${formattedInteger},${decimalPart}` : formattedInteger;
  }

}

export function formatNumberToCash(value: number | undefined): string {
  if (value === undefined || value === null) return '';
  // Convert number to string and replace the decimal point with a comma
  const stringValue = value.toFixed(2).replace('.', ',');

  // Split integer and decimal parts
  const [integerPart, decimalPart] = stringValue.split(',');

  // Add thousand separators to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Combine the integer part with the decimal part
  return `${formattedInteger},${decimalPart}`;
}


export function unformatCash(value: string | number | undefined): number {
  if (value === undefined || value === null) return 0;
  const cleanedValue = value.toString().replace(/[^\d,]/g, '');
  const numericValue = parseFloat(cleanedValue.replace(',', '.'));
  return isNaN(numericValue) ? 0 : numericValue;
}

