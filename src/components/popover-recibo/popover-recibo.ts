import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverReciboComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-recibo',
  templateUrl: 'popover-recibo.html'
})
export class PopoverReciboComponent {

  // items:any;
  text: string;

  isDisplayEtq : boolean = false;
  isDisplayIncidencia : boolean = false;
  isDisplayPrint : boolean = false;

  constructor(public viewCtrl: ViewController) {
    let page = viewCtrl.data.page;
    this.evaluateDisplayOptions(page);
  }

  evaluateDisplayOptions(value){
    switch (value) {
      case 11:
      this.isDisplayPrint = false;
      this.isDisplayIncidencia = false;
      this.isDisplayEtq = false;
        break;
      case 12:
        this.isDisplayPrint = true;
        this.isDisplayIncidencia = true;
        this.isDisplayEtq = false;
        break;
      case 13:
        this.isDisplayPrint = false;
        this.isDisplayIncidencia = false;
        this.isDisplayEtq = true;
        break;
      case 14:
        this.isDisplayPrint = true;
        this.isDisplayIncidencia = false;
        this.isDisplayEtq = false;
        break;
      case 21:
        this.isDisplayPrint = true;
        this.isDisplayIncidencia = false;
        this.isDisplayEtq = false;
        break;
      default:
        break;
    }
  }

  itemClick(item){
    this.viewCtrl.dismiss(item);
  }

}