import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmbarquePage_01Page } from './embarque/embarque-page-01/embarque-page-01';
import { ReciboBultoPage_01Page } from './recibo/recibo-bulto-page-01/recibo-bulto-page-01';

/**
 * Generated class for the DespachoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-despacho',
  templateUrl: 'despacho.html',
})
export class DespachoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToEmbarPage01(){
    this.navCtrl.push(EmbarquePage_01Page);
  }

  gotToReciboBultoPage01(){
    this.navCtrl.push(ReciboBultoPage_01Page);
  }
}
