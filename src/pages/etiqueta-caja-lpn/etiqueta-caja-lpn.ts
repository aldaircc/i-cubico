import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EtiquetaCajaLpnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etiqueta-caja-lpn',
  templateUrl: 'etiqueta-caja-lpn.html',
})
export class EtiquetaCajaLpnPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EtiquetaCajaLpnPage');
  }

}
