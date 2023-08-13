import { ElementRef } from '@angular/core';
import { TrimDirective } from './trim.directive';

describe('TrimDirective', () => {
  it('should trim input value', () => {
    const inputElement: any = { value: '  Some Value  ' };
    const directive = new TrimDirective(new ElementRef(inputElement));
    directive.onInputBlur();
    expect(inputElement.value).toBe('Some Value');
  });
});
