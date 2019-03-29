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

  text: string;
  isDisplayEtq : boolean = false;
  isDisplayIncidencia : boolean = false;
  isDisplayPrint : boolean = false;
  isDisplaySesion: boolean = false;
  isDisplayUA: boolean = false;

  constructor(public viewCtrl: ViewController) {
    let page = viewCtrl.data;
    this.evaluateDisplayOptions(page);
  }

  evaluateDisplayOptions(value){
    switch (value.page) {
      case 0:
        this.isDisplayPrint = true;
        this.isDisplayIncidencia = false;
        this.isDisplayEtq = false;
        this.isDisplaySesion = true;
        break;
      case 1:
        this.isDisplayPrint = false;
        this.isDisplayIncidencia = false;
        this.isDisplayEtq = false;
        this.isDisplaySesion = true;
        break;
      case 11:
        this.isDisplayPrint = true;
        this.isDisplayIncidencia = value.has_Id_Tx;
        this.isDisplayEtq = false;
        this.isDisplaySesion = true;
        break;
      case 12:
        this.isDisplayPrint = true;
        this.isDisplayIncidencia = true;
        this.isDisplayEtq = false;
        break;
      case 13:
        this.isDisplayPrint = true;
        this.isDisplayIncidencia = true;
        this.isDisplayEtq = true;
        this.isDisplayUA = true;
        this.isDisplaySesion = true;
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
      case 51:
        this.isDisplayPrint = false;
        this.isDisplayIncidencia = true;
        this.isDisplayEtq = false;
        this.isDisplaySesion = true;
        break;
      default:
        break;
    }
  }

  itemClick(item){
    this.viewCtrl.dismiss(item);
  }

}