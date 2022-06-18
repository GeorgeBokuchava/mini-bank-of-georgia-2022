import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appPopup]'
})
export class PopupDirective {

  constructor(private elRef: ElementRef) {}

  @Output() toggle: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) mouseEnter(targetElement: any){
    const clickedInside = this.elRef.nativeElement.contains(targetElement);

    if (clickedInside){
      this.toggle.emit(null)
    }
    if (!clickedInside){
      this.close.emit(false)
    }
  }
}
