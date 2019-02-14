import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverEmbalajeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-embalaje',
  templateUrl: 'popover-embalaje.html'
})
export class PopoverEmbalajeComponent {  

  text: string;

  isDisplayIncidencia : boolean = false;
  isDisplayMasivo : boolean = false;
  isDisplayEtqMaster : boolean = false;
  isDisplayPrint : boolean = false;
  isDisplayCerrar : boolean = false;

  constructor(public viewCtrl: ViewController) {
    let page = viewCtrl.data.page;
    this.evaluateDisplayOptions(page);
  }

  evaluateDisplayOptions(value){
    switch (value) {
      case 11:
      this.isDisplayPrint = false;
      this.isDisplayIncidencia = false;      
        break;
      case 12:
      this.isDisplayIncidencia  = true;
      this.isDisplayMasivo = true;
      this.isDisplayEtqMaster  = true;
      this.isDisplayPrint = true;
      this.isDisplayCerrar = true;     
        break;
      case 13:
        break;
      case 14:
        this.isDisplayPrint = true;
        this.isDisplayIncidencia = false;        
        break;
      default:
        break;
    }
  }

  itemClick(item){
    this.viewCtrl.dismiss(item);
  }

}
