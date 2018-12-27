import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController, AlertController } from 'ionic-angular';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';

/**
 * Generated class for the CierrePickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cierre-picking',
  templateUrl: 'cierre-picking.html',
})
export class CierrePickingPage {

  vRutaPickingPage: any = [];
  codeBar: string;

  listNombreMuelleXAlmacen: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.vRutaPickingPage = navParams.get('data');
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverRutaPickingPage, {
      // contentEle: this.content.nativeElement,
      // textEle: this.text.nativeElement
    });
    popover.present({
      ev: ev
    });
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar.trim().length >= 6) {
      this.sPicking.getMuelleXAlmacen(2, this.codeBar.trim()).then((result) => {
        debugger;
        this.listNombreMuelleXAlmacen = result;
        if (this.listNombreMuelleXAlmacen.length > 0) {
          console.log('Datos Muelle por almacen', this.listNombreMuelleXAlmacen);
          if (this.vRutaPickingPage.Saldo > 0) {
            this.presentAlertConfirm("Va a cerrar orden de picking incompleta, ¿Desea continuar?”.").then((result) => {
              if (result) {
                // Cerrar Picking
                this.presentAlert("Operación exitosa").then((result) => {
                  if (result) {
                    this.presentAlertConfirm("¿Desea imprimir el picking?”.").then((result) => {
                      if (result) {
                        // Mostrar lista de impresoras
                      }
                    })
                  }
                })

              } else {
                this.navCtrl.pop();
              }
            })
          } else {
            this.presentAlertConfirm("Desea cerrar picking?”.").then((result) => {
              if (result) {
                // Cerrar Picking
                this.presentAlert("Operación exitosa").then((result) => {
                  if (result) {
                    this.presentAlertConfirm("¿Desea imprimir el picking?”.").then((result) => {
                      if (result) {
                        // Mostrar lista de impresoras
                      }
                    })
                  }
                });
              }
            })
          }

        } else {
          this.presentAlert("Código de barras muelle no es correcto");
          this.codeBar = "";
          console.log('No se encontrarón datos.', this.listNombreMuelleXAlmacen);
        }
      }, (err) => {
        console.log('E-Muelle por almacen', err);
      });
    } else {
      this.presentAlert("Código de barras muelle no es correcto");
      this.codeBar = "";
    }
  }

  getMuelleXAlmacen(intIdAlmacen, strCodigoBarra) {
    debugger;
    this.sPicking.getMuelleXAlmacen(intIdAlmacen, strCodigoBarra).then((result) => {
      debugger;
      this.listNombreMuelleXAlmacen = result;
      if (this.listNombreMuelleXAlmacen.length > 0) {
        console.log('Datos Muelle por almacen', this.listNombreMuelleXAlmacen);
      } else {
        console.log('No se encontrarón datos.', this.listNombreMuelleXAlmacen);
      }
    }, (err) => {
      console.log('E-Muelle por almacen', err);
    });
  }

  // presentAlert(message) {
  //   const alert = this.alertCtrl.create({
  //     title: 'Mensaje',
  //     subTitle: message,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

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
    console.log('ionViewDidLoad CierrePickingPage');
  }

}
