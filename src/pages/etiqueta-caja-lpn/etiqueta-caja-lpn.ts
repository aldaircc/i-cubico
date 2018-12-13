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

  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  selectOptions : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectOptions = {
      title: 'Pizza Toppings',
      subTitle: 'Select your toppings',
      mode: 'md'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EtiquetaCajaLpnPage');
  }

}
