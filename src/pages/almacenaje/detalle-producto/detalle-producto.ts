import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalleProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-producto',
  templateUrl: 'detalle-producto.html',
})
export class DetalleProductoPage {

  vParemetrosRecibidos: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vParemetrosRecibidos = navParams.get('data'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleProductoPage');
  }

}
