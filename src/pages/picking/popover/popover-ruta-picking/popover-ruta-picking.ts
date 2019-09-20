import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverRutaPickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-ruta-picking',
  templateUrl: 'popover-ruta-picking.html',
})
export class PopoverRutaPickingPage {

  constructor(public viewCtrl: ViewController) {
    let page = viewCtrl.data.page;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverRutaPickingPage');
  }

  itemClick(item){
    debugger;
    this.viewCtrl.dismiss(item);
  }
}
