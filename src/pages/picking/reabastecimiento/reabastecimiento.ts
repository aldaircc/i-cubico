import { Component } from '@angular/core';
import { IonicPage, App, ModalController, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { HomePage } from '../../home/home';
import { PopoverPickingPage } from '../../picking/popover/popover-picking/popover-picking'
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

  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,
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

  showModalIncidencia(data) {
    debugger;
    let obj = {
      'Id_Tx': data.Id_Tx,
      'FlagPausa': data.FlagPausa,
      'NumOrden': data.NumOrden,
      'id_Cliente': data.Id_Cuenta,
      'id_Modulo': 5
    };

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });
    modalIncidencia.onDidDismiss(data => {
      debugger;
      console.log("datos", data);
    });
    modalIncidencia.present();
  }

  showModalAdministrarUaPage() {
    debugger;
    let obj = {
      'page': "modal",
    };
    let modalIncidencia = this.modalCtrl.create(AdministrarUaPage, { 'data': obj });
    modalIncidencia.onDidDismiss(data => {
      debugger;
      if (data.response == 200) {
        this.navCtrl.pop();
      }
      console.log("datos", data);
    });
    modalIncidencia.present();
  }

  goConsultarUbicacionPage() {
    this.navCtrl.push(ConsultarUbicacionPage);
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPickingPage, { 'page': 1 });
    popover.present({
      ev: ev
    });

    popover.onDidDismiss(popoverData => {
      if (popoverData == 1) {
        this.showModalIncidencia(this.vPickingXProducto);
      } else if (popoverData == 2) {
        debugger;
        this.showModalAdministrarUaPage();
      } else if (popoverData == 3) {
        debugger;
        this.goConsultarUbicacionPage();
      }
      else if (popoverData == 4) {
        debugger;
        this.presentAlertConfirm("¿Estás seguro que deseas cerrar sesión?").then((result) => {
          if (result) {
            this.navCtrl.pop();
            var nav = this.app.getRootNav();
            nav.setRoot(HomePage);
          }
        })
      }
    });
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
