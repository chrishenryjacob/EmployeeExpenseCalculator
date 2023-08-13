import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTrim]',
  standalone: true
})
export class TrimDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur')
  onInputBlur() {
    const value = this.el.nativeElement.value;
    if (typeof value === 'string') {
      this.el.nativeElement.value = value.trim();
    }
  }

}
