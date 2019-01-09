import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Generated class for the SelectAllDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  //selector: '[select-all]' // Attribute selector
  selector: 'ion-input[select-all]'
})
export class SelectAllDirective {

  constructor(private el: ElementRef) {
    debugger;
  }

  @HostListener('click')
  selectAll(){
    debugger;
    let nativeEl: HTMLInputElement = this.el.nativeElement.querySelector('input');
    if(nativeEl){
      if(nativeEl.setSelectionRange){
        return nativeEl.setSelectionRange(0, nativeEl.value.length);
      }
      nativeEl.select();
    }
  }
}
