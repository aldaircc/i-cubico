import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';

/**
 * Generated class for the ConsultarEanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultar-ean',
  templateUrl: 'consultar-ean.html',
})
export class ConsultarEanPage {

  codeEan: string;
  ResultEan: any
  codigo: string;
  producto: string;
  sector: string;
  listAuxResultEan: any = [];
  rowCount: any = 0;
  rowCountTotal: any = 0;

  @ViewChild('txtEan') txtEanRef;
  @ViewChild('txtEan', { read: ElementRef }) private txtEan: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
  }

  validarCodeBar() {
    debugger;
    if (this.codeEan) {
      if (this.codeEan.trim() != "") {
        debugger;
        this.sAlmacenaje.getListarUbicacionesXEAN(this.codeEan, this.sGlobal.Id_Almacen).then((result) => {
          debugger;
          this.ResultEan = result;
          this.listAuxResultEan = result;
          this.rowCount = this.listAuxResultEan.length;
          if (this.ResultEan.length == 0) {
            this.presentAlert("No hay datos para mostrar, código de EAN 13 / EAN 14 no existe").then((resultAlert) => {
              if (resultAlert) {
                this.codigo = "";
                this.producto = "";
                this.sector = "";
                setTimeout(() => {
                  //this.txtEanRef.setFocus();
                  this.selectAll(this.txtEan);
                }, (500));
              }
            })
          } else {
            this.codigo = this.ResultEan[0].Codigo;
            this.producto = this.ResultEan[0].Producto;
            this.sector = this.ResultEan[0].Nombre;
            let CantidadTotal = this.listAuxResultEan.reduce(function (prev, cur) {
              return prev + cur.Cantidad;
            }, 0); //Obtener el cantidad total.
            this.rowCountTotal = CantidadTotal;
          }
        }, err => {
          console.log('E-getListarUAUbicada', err);
        });
      }
      else {
        this.presentToast("Ingrese código Ean");
      }
    } else {
      this.presentToast("Ingrese código Ean");
    }
    setTimeout(() => {
      //this.txtEanRef.setFocus();
      this.selectAll(this.txtEan);
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

  ionViewDidLoad() {
    setTimeout(() => {
      //this.txtEanRef.setFocus();
      this.selectAll(this.txtEan);
    }, (500));
    console.log('ionViewDidLoad ConsultarEanPage');
  }

}
