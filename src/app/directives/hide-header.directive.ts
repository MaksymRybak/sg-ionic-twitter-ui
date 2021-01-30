import { AfterViewInit, Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';

// NOTA: this directive is used to move header with the ion content when scrolling up

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements AfterViewInit {
  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;

  constructor(private renderer: Renderer2, private domCtrl: DomController) { }

  ngAfterViewInit() {
    this.header = this.header.el;
    this.children = this.header.children;
  }

  // ion-content is a host of this directive, so we can listen for its events
  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    // console.log('onContentScroll: ', $event);
    const scrollTop: number = $event.detail.scrollTop;  // how far we are from the top
    // console.log('scrollTop: ', scrollTop);

    let newPosition = -scrollTop;

    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }

    let newOpacity = 1 - (newPosition / -this.headerHeight);

    // domCtrl schedule repainting under the hood in the best way 
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'top', newPosition + 'px');
      // nice effect changing opacity of header childrens when scrolling up
      for (let c of this.children) {
        this.renderer.setStyle(c, 'opacity', newOpacity);
      }
    });
  }
}
