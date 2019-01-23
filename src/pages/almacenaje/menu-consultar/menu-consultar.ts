import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdministrarUaPage } from '../menu-consultar/administrar-ua/administrar-ua'
import { ConsultarPalletPage } from '../menu-consultar/consultar-pallet/consultar-pallet'
import { ConsultarEanPage } from '../menu-consultar/consultar-ean/consultar-ean'



/**
 * Generated class for the MenuConsultarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-consultar',
  templateUrl: 'menu-consultar.html',
})
export class MenuConsultarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goAdministrarUaPage() {
    this.navCtrl.push(AdministrarUaPage);
  }

  goConsultarPalletPage() {
    this.navCtrl.push(ConsultarPalletPage);
  }

  goConsultarEanPage() {
    this.navCtrl.push(ConsultarEanPage);
  }

  





  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuConsultarPage');
  }

}
