import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { AdministrarUaPage } from '../menu-consultar/administrar-ua/administrar-ua'
import { ConsultarPalletPage } from '../menu-consultar/consultar-pallet/consultar-pallet'
import { ConsultarEanPage } from '../menu-consultar/consultar-ean/consultar-ean'
import { AlmacenajePage } from '../almacenaje';



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
  @ViewChild(Navbar) navBar: Navbar;
  vMenuConsultarPage: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goAdministrarUaPage() {
    this.vMenuConsultarPage = {
      'page': 0
    };
    this.navCtrl.push(AdministrarUaPage, {
      data: this.vMenuConsultarPage
    });
  }

  goConsultarPalletPage() {
    this.navCtrl.push(ConsultarPalletPage);
  }

  goConsultarEanPage() {
    this.navCtrl.push(ConsultarEanPage);
  }
  
  // goMenuAlmacenajePage(){
  //   this.navCtrl.push(AlmacenajePage);
  // }

  ionViewDidLoad() {
  //   this.navBar.backButtonClick = (e: UIEvent) => {
  //     this.goMenuAlmacenajePage();       
  // }
    console.log('ionViewDidLoad MenuConsultarPage');
  }

}
