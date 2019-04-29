import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-picking',
  templateUrl: 'popover-picking.html',
})


export class PopoverPickingPage {

  isDisplayIncidencias: boolean = false;
  isDisplayUA: boolean = false;
  isDisplayUbicacion: boolean = false;
  //isDisplayMenu: boolean = false;
  isDisplayCerrar: boolean = false;


  constructor(public viewCtrl: ViewController) {
    let page = viewCtrl.data;
    this.evaluateDisplayOptions(page);
  }

  evaluateDisplayOptions(value) {
    switch (value.page) {
      case 0:
        this.isDisplayIncidencias = value.has_Id_Tx;;
        this.isDisplayUA = true;
        this.isDisplayUbicacion = true;
        // this.isDisplayMenu = false;
        this.isDisplayCerrar = true;
        break;
      case 1:
        this.isDisplayIncidencias = true;
        this.isDisplayUA = true;
        this.isDisplayUbicacion = true;
        // this.isDisplayMenu = true;
        this.isDisplayCerrar = true;
        break;
      default:
        break;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPickingPage');
  }

  itemClick(item) {
    debugger;
    this.viewCtrl.dismiss(item);
  }

}
