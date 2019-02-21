import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import moment from 'moment';
/**
 * Generated class for the ConsultarPalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultar-pallet',
  templateUrl: 'consultar-pallet.html',
})
export class ConsultarPalletPage {

  @ViewChild('txtPallet') txtPalletRef;
  @ViewChild('txtPallet', { read: ElementRef }) private txtPallet: ElementRef;
  codeBarPallet: string;
  ResultPallet: any
  ResultPallet_Aux: any = [];
  rowCount: any = 0;
  rowCountTotal: any = 0;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
  }

  validarCodeBar() {
    debugger;
    if (this.codeBarPallet) {
      if (this.codeBarPallet.trim() != "") {
        debugger;
        debugger;
        this.sAlmacenaje.getListarUAUbicada(this.codeBarPallet, this.sGlobal.Id_Almacen).then((result) => {
          debugger;
          this.ResultPallet = result;
          this.rowCount = this.ResultPallet.length;
          if (this.ResultPallet.length == 0) {
            this.presentAlert("No hay datos para mostrar, código de pallet no existe").then((resultAlert) => {
              if (resultAlert) {
                setTimeout(() => {
                  this.txtPalletRef.setFocus();
                  this.selectAll(this.txtPallet);
                }, (500));
              }
            })
          } else {

            this.ResultPallet_Aux = this.ResultPallet[0];
            let CantidadTotal = this.ResultPallet.reduce(function (prev, cur) {
              return prev + cur.Cantidad;
            }, 0); //Obtener el cantidad total.
            this.rowCountTotal = CantidadTotal;
          }
        }, err => {
          console.log('E-getListarUAUbicada', err);
        });
      }
      else {
        this.presentToast("Ingrese código de ubicación");
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
    }
    setTimeout(() => {
      this.txtPalletRef.setFocus();
    }, (500));
  }

  eliminarPallet() {
    if (this.ResultPallet.length > 0) {
      this.presentAlertConfirm("¿Está seguro de eliminar el Pallet : " + this.codeBarPallet.trim() + "?”.").then((result) => {
        if (result) {
          debugger;
          for (var i = 0; i < this.ResultPallet.length; i++) {
            var count = 0;
            let fecha = new Date().toISOString();
            let fechaEmision = moment(this.ResultPallet[i].FechaEmision, "DD-MM-YYYY").toDate();
            let fechaEmisionString = fechaEmision.toISOString();
            let fechaVencimiento = moment(this.ResultPallet[i].FechaVencimiento, "DD-MM-YYYY").toDate();
            let fechaVencimientoString = fechaVencimiento.toISOString();

            let objUA = {
              'UA_CodBarra': this.ResultPallet[i].UA_CodBarra,
              'FechaRegistro': "/Date(" + Date.parse(fecha) + ")/",
              'FechaEmision': "/Date(" + Date.parse(fechaEmisionString) + ")/",
              'FechaVencimiento': "/Date(" + Date.parse(fechaVencimientoString) + ")/",
              'Lote': this.ResultPallet[i].Lote,
              'Cantidad': this.ResultPallet[i].Cantidad,
              'UsuarioRegistro': this.sGlobal.userName
            };

            this.sAlmacenaje.postRegistrarUAStandBy(objUA, 2, this.sGlobal.Id_Almacen).then(result => {
              debugger;
              count = count + 1;
              if (count == this.ResultPallet.length) {
                let res: any = result;
                if (res.errNumber == 0) {
                  console.log(res.message);
                  this.presentAlert("Pallet enviado a Stand By.");
                  this.limpiar();
                } else {
                  this.presentAlert("Error. No se pudo eliminar los valores.");
                  console.log(res.message);
                }
              }
            });
          }
        }
      })
    }
  }

  limpiar() {
    this.codeBarPallet = "";
    this.ResultPallet = []
    this.ResultPallet_Aux = [];
    this.rowCount = 0;
    this.rowCountTotal = 0;
    setTimeout(() => {
      this.txtPalletRef.setFocus();
    }, (500));
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
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

  ionViewDidLoad() {
    setTimeout(() => {
      this.txtPalletRef.setFocus();
    }, (500));
    console.log('ionViewDidLoad ConsultarPalletPage');
  }

}
