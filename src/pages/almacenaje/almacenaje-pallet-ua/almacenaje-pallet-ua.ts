import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { OtraUbicacionPage } from '../otra-ubicacion/otra-ubicacion'
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PalletsTransitoPage } from '../pallets-transito/pallets-transito';

/**
 * Generated class for the AlmacenajePalletUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-almacenaje-pallet-ua',
  templateUrl: 'almacenaje-pallet-ua.html',
})
export class AlmacenajePalletUaPage {
  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;
  vDatosUbicacion: any = [];
  vAlmacenajePalletUaPage: any = [];
  codeBar: string;
  codBar: string;
  isBgRed: boolean = false;
  isBgGreen: boolean = false;
  isbgWhite: boolean = false;
  isBgYellow: boolean = false;
  valorCodBarra: boolean = false;
  rowCount: any = 0;
  rowCountTotal: any = 0;

  vUbicacion: any = {
    'Sector': "",
    'Fila': "",
    'Columna': "",
    'Nivel': "",
    'Posicion': "",
    'CodigoBarraUbi': "",
    'Id_Ubicacion': 0,
    'Id_Ubicacion_Transito': 0,
    'CantidadPallets': 0,
    'lst_UA': []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vDatosUbicacion = navParams.get('data');
    debugger;
    this.rowCountTotal = this.vDatosUbicacion.CantidadPallets;
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if (this.codeBar.length == 14) {
          this.codBar = this.vDatosUbicacion.CodigoBarraUbi.trim();
          if (this.codeBar.trim() == this.codBar) {
            this.isbgWhite = false;
            this.isBgRed = false;
            this.isBgYellow = true;
            this.isBgGreen = false;
            this.valorCodBarra = true;
          } else {
            this.isbgWhite = false;
            this.isBgRed = true;
            this.isBgYellow = false;
            this.isBgGreen = false;
            this.codeBar = "";
            this.valorCodBarra = false;
            this.presentAlert("Ubicación no es correcta.").then((resultAlert) => {
              if (resultAlert) {
                setTimeout(() => {
                  this.txtCodUbicacionRef.setFocus();
                }, (500));
              }
            })
          }
        } else {
          this.presentToast("El código de ubicación debe tener 14 dígitos.");
        }
      }
      else {
        this.presentToast("Ingrese código de ubicación");
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
    }
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));
  }

  registrarUAUbicacion() {
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if (this.valorCodBarra) {
          debugger;
          for (var i = 0; i < this.vDatosUbicacion.lst_UA.length; i++) {
            var count = 0;
            var codUA = this.vDatosUbicacion.lst_UA[i];
            this.sAlmacenaje.postRegistrarUAUbicacion(codUA, this.vDatosUbicacion.Id_Ubicacion, this.sGlobal.userName).then(result => {
              debugger;
              count = count + 1;
              var message: any = result;
              if (message.errNumber == 0) {
                this.rowCount = this.rowCount + 1;
              }
              if (count == this.vDatosUbicacion.lst_UA.length) {
                if (this.rowCount == this.rowCountTotal) {
                  this.isbgWhite = false;
                  this.isBgRed = false;
                  this.isBgYellow = false;
                  this.isBgGreen = true;
                  this.presentAlert("Proceso de almacenaje de Pallets/UA´s finalizado.").then((resultAlert) => {
                    if (resultAlert) {
                      this.goBackPalletTransito();
                    }
                  })
                } else {
                  this.isbgWhite = false;
                  this.isBgRed = true;
                  this.isBgYellow = false;
                  this.isBgGreen = false;
                  var saldo = this.rowCountTotal - this.rowCount;
                  this.presentAlert("No se almacenaron " + saldo + " Pallets/UA´s. Intente otra vez.");
                }
              }
            });
          }
        } else {
          this.presentAlert("Ubicación no es correcta.").then((resultAlert) => {
            if (resultAlert) {
              setTimeout(() => {
                this.txtCodUbicacionRef.setFocus();
              }, (500));
            }
          })
        }
      } else {
        this.presentToast("Ingrese código de ubicación");
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
    }
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
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

  goOtraUbicacionPage() {
    debugger;
    this.vAlmacenajePalletUaPage = {
      'Id_Ubicacion_Transito': this.vDatosUbicacion.Id_Ubicacion_Transito,
      'Id_Marca': this.vDatosUbicacion.Id_Marca,
      'CantidadPallets': this.vDatosUbicacion.CantidadPallets,
      'lst_UA': this.vDatosUbicacion.lst_UA
    };
    this.navCtrl.push(OtraUbicacionPage, {
      data: this.vAlmacenajePalletUaPage, ubicacion: this.Selectedcallback
    });
  }

  dataFromOtraUbicacionPage: any;
  Selectedcallback = data => {
    debugger;
    this.dataFromOtraUbicacionPage = data;
    console.log('data received from other page', this.dataFromOtraUbicacionPage);
    debugger;
    this.vDatosUbicacion.Sector = this.dataFromOtraUbicacionPage.Sector;
    this.vDatosUbicacion.Fila = this.dataFromOtraUbicacionPage.Fila;
    this.vDatosUbicacion.Columna = this.dataFromOtraUbicacionPage.Columna;
    this.vDatosUbicacion.Nivel = this.dataFromOtraUbicacionPage.Nivel;
    this.vDatosUbicacion.Posicion = this.dataFromOtraUbicacionPage.Posicion;
    this.vDatosUbicacion.CodigoBarraUbi = this.dataFromOtraUbicacionPage.CodigoBarra;
    this.vDatosUbicacion.Id_Ubicacion = this.dataFromOtraUbicacionPage.Id_Ubicacion;
    this.vDatosUbicacion.Id_Ubicacion_Transito = this.dataFromOtraUbicacionPage.Id_Ubicacion_Transito;
    this.vDatosUbicacion.CantidadPallets = this.dataFromOtraUbicacionPage.CantidadPallets;
    this.vDatosUbicacion.lst_UA = this.dataFromOtraUbicacionPage.lst_UA;
  };

  goBackPalletTransito() {
    debugger;
    this.navCtrl.pop().then(() => {
      this.vAlmacenajePalletUaPage = {
        'Id_Ubicacion': this.vDatosUbicacion.Id_Ubicacion
      };
      this.navParams.get('palletTransito')(this.vAlmacenajePalletUaPage);
    });
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.selectAll(this.txtCodUbicacion);
    }, (500));
    console.log('ionViewDidLoad AlmacenajePalletUaPage');
  }
}
