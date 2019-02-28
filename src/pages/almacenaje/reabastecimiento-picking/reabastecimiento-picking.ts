import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertCmp, AlertController } from 'ionic-angular';
import { ParticionarUaPage } from '../menu-consultar/particionar-ua/particionar-ua'
import { ListaPalletUaPage } from '../lista-pallet-ua/lista-pallet-ua'
import { UbicacionDestinoPage } from '../ubicacion-destino/ubicacion-destino'

/**
 * Generated class for the ReabastecimientoPickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reabastecimiento-picking',
  templateUrl: 'reabastecimiento-picking.html',
})
export class ReabastecimientoPickingPage {

  @ViewChild('txtCodBarraUA') txtCodBarraUARef;
  vReabastecimientoPickingPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  goParticionarUaPage() {
    this.vReabastecimientoPickingPage = {
      'CodBar_UA': "",
      'UM': "",
      'DescProducto': "",
      'Lote': "",
      'FechaEmision': "",
      'FechaVencimiento': "",
      //'CantidadUA' : sdfsdfsf,
      //'Saldo' : dfsdfsdf,
      'CantidadTotal': ""
    };
    this.navCtrl.push(ParticionarUaPage, {
      data: this.vReabastecimientoPickingPage
    });
  }

  goListaPalletUaPage() {
    this.navCtrl.push(ListaPalletUaPage);
  }

  goUbicacionDestinoPage() {
    this.navCtrl.push(UbicacionDestinoPage);
  }

  presentAlert(message): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [{
          text: 'OK',
          handler: () => {
            resolve(true);
            console.log('Agree clicked');
          }
        }]
      });
      confirm.present();
    })
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.txtCodBarraUARef.setFocus();
    }, (500));
    console.log('ionViewDidLoad ReabastecimientoPickingPage');
  }
}
