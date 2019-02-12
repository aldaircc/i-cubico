import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ReciboPage } from '../recibo/recibo';
import { PickingPage } from '../picking/picking';
import { AlmacenajePage } from '../almacenaje/almacenaje';
import { EmbalajePage } from '../embalaje/embalaje';
import { EtiquetadoPage_01Page } from '../etiquetado/etiquetado-page-01/etiquetado-page-01';
import { TransferPage_01Page } from '../transferencia/transfer-page-01/transfer-page-01';
import { InventarioPage_01Page } from '../inventario/inventario-page-01/inventario-page-01';

/**
 * Generated class for the MainMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  userProfile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userProfile=this.navParams.data;

  }

  ionViewDidLoad() {
    console.log(this.navParams.get('Almacen'));
   
  }

  goBackWarehouseSelect():void{
    this.navCtrl.pop();

  }

  goBackLoginPage():void{
    this.navCtrl.push(HomePage);
  }

  goReciboPage(){
    this.navCtrl.push(ReciboPage);

  }

  goPickingPage(){
    this.navCtrl.push(PickingPage);

  }

  goAlmacenajePage(){
    this.navCtrl.push(AlmacenajePage);
  }

  goEmbalajePage(){
    this.navCtrl.push(EmbalajePage);
    }
  goEtiquetado(){
    this.navCtrl.push(EtiquetadoPage_01Page, { codePage: 7 });
  }

  goTransferencia(){
    this.navCtrl.push(TransferPage_01Page);
  }

  goInventario(){
    this.navCtrl.push(InventarioPage_01Page);
  }
}
