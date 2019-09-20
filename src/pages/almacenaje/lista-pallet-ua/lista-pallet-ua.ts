import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ListaPalletUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-pallet-ua',
  templateUrl: 'lista-pallet-ua.html',
})
export class ListaPalletUaPage {

  vDatosRecibidos: any = [];
  listPalletUA: any = [];
  rowCount: any;
  Cant_Total: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.vDatosRecibidos = navParams.get('data');
    this.listPalletUA = this.vDatosRecibidos.lst_PalletUA;
    this.rowCount = this.listPalletUA.length;
    this.contador();
  }

  contador() {
    this.Cant_Total = this.listPalletUA.reduce(function (prev, cur) {
      debugger;
      return prev + cur.Cantidad;
    }, 0);
  }

  eliminarPalletUA(data) {
    debugger;
    this.presentAlertConfirm("¿Está seguro de eliminar el Pallet/UA?”.").then((result) => {
      if (result) {
        for (var j = 0; j < this.listPalletUA.length; j++) {
          if (data.Id == this.listPalletUA[j].Id) {
            this.listPalletUA.splice(j, 1);
            this.rowCount = this.listPalletUA.length;
            this.contador();
            this.presentToast('Se elimino correctamente el Pallet/UA.');
          }
        }
      }
    })
  }

  presentAlertConfirm(message): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              resolve(false);
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              resolve(true);
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    })
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPalletUaPage');
  }

}
