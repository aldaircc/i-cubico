import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
/**
 * Generated class for the ReabastecimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reabastecimiento',
  templateUrl: 'reabastecimiento.html',
})
export class ReabastecimientoPage {

  vPickingXProducto: any = [];
  TextObservacion: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController, public sAlmacenaje: AlmacenajeServiceProvider,
    public sGlobal: GlobalServiceProvider, public alertCtrl: AlertController) {
    this.vPickingXProducto = navParams.get('data');
  }

  aceptarReabastecer() {
    this.reabastecer(this.vPickingXProducto.IdProducto, this.vPickingXProducto.IdUbicacion, this.TextObservacion, this.sGlobal.Id_TerminalRF, this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  reabastecer(intIdProducto, intIdUbicacionDestino, strObservacion, intIdRF, strUsuario, IdAlmacen) {
    this.sAlmacenaje.Reabastecer(intIdProducto, intIdUbicacionDestino, strObservacion, intIdRF, strUsuario, IdAlmacen).then(result => {
      debugger;
      var message: any = result;
      if (message.errNumber == 0) {
        this.presentAlert("Se realizó correctamente el registro de solicitud de reabastecimiento");
        this.goBackRutaPicking();
      } else {
        this.presentAlert("No se realizó la solicitud de reabastecimiento");
      }
    });
  }

  goBackRutaPicking() {
    this.navCtrl.pop();
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverRutaPickingPage, {
    });
    popover.present({
      ev: ev
    });
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
    console.log('ionViewDidLoad ReabastecimientoPage');
  }
}
