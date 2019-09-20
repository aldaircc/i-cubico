import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetallePalletUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-pallet-ua',
  templateUrl: 'detalle-pallet-ua.html',
})
export class DetallePalletUaPage {

  vParemetrosRecibidos: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vParemetrosRecibidos = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePalletUaPage');
  }

}
