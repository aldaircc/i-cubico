import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Navbar } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { AdministrarUaPage } from '../../menu-consultar/administrar-ua/administrar-ua'

/**
 * Generated class for the ReasignarUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reasignar-ua',
  templateUrl: 'reasignar-ua.html',
})
export class ReasignarUaPage {

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtPalletUa') txtPalletUaRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;
  @ViewChild('txtPalletUa', { read: ElementRef }) private txtPalletUa: ElementRef;
  codeBar: string;
  codePalletUA: string;
  resultUbicacion: any;
  resultPalletUA: any;
  resultReasignar: any;
  Sector: any;
  Fila: any;
  Columna: any;
  Nivel: any;
  Posicion: any;
  txtPalletUaisenabled: boolean = false;
  isBgGreen: boolean = false;
  isbgWhite: boolean = false;
  vDatosRecibidos: any = [];
  valorPalletUa: boolean = false;
  vReasignarUAPage: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vDatosRecibidos = navParams.get('data');
  }


  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        this.sAlmacenaje.getListarUbicacionXCodigoBarra(this.codeBar, this.sGlobal.Id_Almacen).then((result) => {
          debugger;
          this.resultUbicacion = result;
          if (this.resultUbicacion.length > 0) {
            this.Sector = this.resultUbicacion[0].Sector;
            this.Fila = this.resultUbicacion[0].Fila;
            this.Columna = this.resultUbicacion[0].Columna;
            this.Nivel = this.resultUbicacion[0].Nivel;
            this.Posicion = this.resultUbicacion[0].Posicion;
            this.txtPalletUaisenabled = true;
            setTimeout(() => {
              this.txtPalletUaRef.setFocus();
              this.selectAll(this.txtPalletUa);
            }, (500));
          } else {
            this.Sector = "";
            this.Fila = "";
            this.Columna = "";
            this.Nivel = "";
            this.Posicion = "";
            this.txtPalletUaisenabled = false;
            this.presentAlert("Ubicación no registrada.").then((resultAlert) => {
              if (resultAlert) {
                setTimeout(() => {
                  this.txtCodUbicacionRef.setFocus();
                  this.selectAll(this.txtCodUbicacion);
                }, (500));
              }
            })
          }
        }, err => {
          console.log('E-getListarUbicacionXCodigoBarra', err);
        });
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

  validarPalletUA() {
    debugger;
    if (this.codePalletUA) {
      if (this.codePalletUA.trim() != "") {
        this.sAlmacenaje.getValidarExisteUAUbicada(this.codePalletUA, "", this.resultUbicacion[0].Id_Ubicacion).then((result) => {
          debugger;
          this.resultPalletUA = result;
          if (this.resultPalletUA.length > 0) {
            //validar si lote y producto son iguales a la ubicacion anterior
            this.isbgWhite = false;
            this.isBgGreen = true;
            this.valorPalletUa = true;
            setTimeout(() => {
              this.txtPalletUaRef.setFocus();
              this.selectAll(this.txtPalletUa);
            }, (500));

          } else {
            this.isbgWhite = true;
            this.isBgGreen = false;
            this.valorPalletUa = false;
            this.presentAlert("UA/Pallet no registrada.").then((resultAlert) => {
              if (resultAlert) {
                setTimeout(() => {
                  this.txtPalletUaRef.setFocus();
                  this.selectAll(this.txtPalletUa);
                }, (500));
              }
            })
          }
        }, err => {
          console.log('E-getValidarExisteUAUbicada', err);
        });
      } else {
        this.presentToast("Ingrese código de Pallet/UA");
        setTimeout(() => {
          this.txtCodUbicacionRef.setFocus();
        }, (500));
      }
    } else {
      this.presentToast("Ingrese código de Pallet/UA");
      setTimeout(() => {
        this.txtCodUbicacionRef.setFocus();
      }, (500));
    }
  }

  reasignarPalletUA() {
    if (this.valorPalletUa == true){
      this.presentAlertConfirm("¿Está seguro de reasignar la UA?”.").then((result) => {
        if (result) {
          this.sAlmacenaje.postReAsignarUA(this.vDatosRecibidos.CodBar_UA, this.codePalletUA, this.resultUbicacion[0].Id_Ubicacion, this.resultPalletUA[0].Cantidad, this.sGlobal.userName).then((result) => {
            debugger;
            this.resultReasignar = result;
  
            let res: any = result;
            if (res.errNumber == 0) {
              console.log(res.message);
              this.presentAlert("Reasignación exitosa.").then((resultAlert2) => {
                this.Sector = "";
                this.Fila = "";
                this.Columna = "";
                this.Nivel = "";
                this.Posicion = "";
                this.codePalletUA = "";
                this.codeBar = "";
                this.txtPalletUaisenabled = false;
                this.isbgWhite = true;
                this.isBgGreen = false;
                setTimeout(() => {
                  this.txtCodUbicacionRef.setFocus();
                  this.selectAll(this.txtCodUbicacion);
                }, (500));
              })
            } else {
              //this.presentAlert("Error. No se pudo realizar la reasignación.").then((resultAlert2) => {
              this.presentAlert(res.message).then((resultAlert2) => {
                setTimeout(() => {
                  this.txtPalletUaRef.setFocus();
                  this.selectAll(this.txtPalletUa);
                }, (500));
              })
              console.log(res.message);
            }
          }, err => {
            console.log('E-postReAsignarUA', err);
          });
        }
      })
    }else{
      this.presentToast("No se encontraron registros.");
    }    
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

  goAdministrarUaPage() {
    this.vReasignarUAPage = {
      'page': 1
    };
    this.navCtrl.push(AdministrarUaPage, {
      data: this.vReasignarUAPage
    });
  }

  ionViewDidLoad() {
    //Enviar page 1 a administrar ua
    this.navBar.backButtonClick = (e: UIEvent) => {
        this.goAdministrarUaPage();       
    }
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));
    console.log('ionViewDidLoad ReasignarUaPage');
  }

}
