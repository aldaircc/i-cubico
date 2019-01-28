import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InventarioPage_06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario-page-06',
  templateUrl: 'inventario-page-06.html',
})
export class InventarioPage_06Page {

  vParameter: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    debugger;
    this.vParameter = this.navParams.get('vParameter');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventarioPage_06Page');
  }

}
