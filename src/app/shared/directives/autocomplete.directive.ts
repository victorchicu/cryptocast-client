import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    this.element.autocomplete = "off"
  }
}
