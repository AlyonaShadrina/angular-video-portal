import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightDateBased]'
})
export class HighlightDateBasedDirective implements OnInit {

  @Input() appHighlightDateBased: string = '';

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const nowDateTime = new Date().getTime();
    const twoWeeksAgoDate = new Date(nowDateTime);
    const twoWeeksAgoDateTime = twoWeeksAgoDate.setDate(twoWeeksAgoDate.getDate() - 14);
    const inputDateTime = new Date(this.appHighlightDateBased).getTime();

    if (nowDateTime < inputDateTime) {
      this.el.nativeElement.style.border = '2px solid blue';
    } else if (inputDateTime > twoWeeksAgoDateTime) {
      this.el.nativeElement.style.border = '2px solid green';
    } else {
      this.el.nativeElement.style.border = '2px solid transparent';
    }
  }

}
