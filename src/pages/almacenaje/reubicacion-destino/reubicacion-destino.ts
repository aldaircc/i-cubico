import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { ReubicacionPage } from '../../almacenaje/reubicacion/reubicacion'

/**
 * Generated class for the ReubicacionDestinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reubicacion-destino',
  templateUrl: 'reubicacion-destino.html',
})
export class ReubicacionDestinoPage {
  codeBarDestino: string;
  resultUbicacion: any;
  Sector: any;
  Fila: any;
  Columna: any;
  Nivel: any;
  Posicion: any;
  vDatosRecibidos: any = [];
  rowCountUAS: any = 0;
  resultUAsUbicacion: any;

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodDestino') txtCodDestinoRef;
  @ViewChild('txtCodDestino', { read: ElementRef }) private txtCodDestino: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vDatosRecibidos = navParams.get('data');
  }

  validarCodeBar() {
    debugger;
    if (this.codeBarDestino) {
      if (this.codeBarDestino.trim() != "") {
        if (this.codeBarDestino != this.vDatosRecibidos.Codigo_Origen) {
          this.sAlmacenaje.getListarUbicacionXCodigoBarra(this.codeBarDestino, this.sGlobal.Id_Almacen).then((result) => {
            debugger;
            this.resultUbicacion = result;
            if (this.resultUbicacion.length > 0) {
              this.sAlmacenaje.getListarUAsXUbicacion(this.codeBarDestino, this.sGlobal.Id_Almacen).then((resultUAs) => {
                debugger;
                this.resultUAsUbicacion = resultUAs;
                this.rowCountUAS = this.resultUAsUbicacion.length;
              }, err => {
                console.log('E-getListarUbicacionXCodigoBarra', err);
              });
              this.Sector = this.resultUbicacion[0].Sector;
              this.Fila = this.resultUbicacion[0].Fila;
              this.Columna = this.resultUbicacion[0].Columna;
              this.Nivel = this.resultUbicacion[0].Nivel;
              this.Posicion = this.resultUbicacion[0].Posicion;
              setTimeout(() => {
                this.txtCodDestinoRef.setFocus();
                this.selectAll(this.txtCodDestino);
              }, (500));
            } else {
              //Mensaje la ubicacion no exiset
              this.presentAlert("Ubicación destino no existe.").then((resultAlert) => {
                if (resultAlert) {
                  //select y focus en ubicaicon origen
                  setTimeout(() => {
                    this.txtCodDestinoRef.setFocus();
                    this.selectAll(this.txtCodDestino);
                  }, (500));
                }
              })
            }
          }, err => {
            console.log('E-getListarUbicacionXCodigoBarra', err);
          });
        }
        else {
          this.presentAlert("El código de ubicación destino tiene que ser diferente al código de ubicación origen.").then((resultAlert) => {
            if (resultAlert) {
              setTimeout(() => {
                this.txtCodDestinoRef.setFocus();
                this.selectAll(this.txtCodDestino);
              }, (500));
            }
          })
        }
      }
      else {
        this.presentToast("Ingrese código de ubicación");
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
    }
    setTimeout(() => {
      this.txtCodDestinoRef.setFocus();
    }, (500));
  }

  reubicarDestino(): void {
    debugger;
    if (this.codeBarDestino) {
      if (this.codeBarDestino.trim() != "") {
        if (this.resultUbicacion.length > 0) {
          if (this.rowCountUAS > 0) {
            this.presentAlertConfirm("Ubicación destino no se encuentra vacia. ¿Esta seguro de continuar?”.").then((resultAlert3) => {
              if (resultAlert3) {
                this.registrarReubicacionDestino(this.sGlobal.Id_Centro, this.vDatosRecibidos.Id_Producto, this.sGlobal.Id_Almacen, this.vDatosRecibidos.cantidadTotal, this.resultUbicacion[0].Id_Ubicacion, this.sGlobal.userName, this.vDatosRecibidos.listUA);
              }
            })
          } else {
            this.registrarReubicacionDestino(this.sGlobal.Id_Centro, this.vDatosRecibidos.Id_Producto, this.sGlobal.Id_Almacen, this.vDatosRecibidos.cantidadTotal, this.resultUbicacion[0].Id_Ubicacion, this.sGlobal.userName, this.vDatosRecibidos.listUA);
          }
        } else {
          this.presentToast('No se encontraron registros');
          this.selectAll(this.txtCodDestino);
        }
      } else {
        this.presentToast('Ingrese código de ubicación');
        this.selectAll(this.txtCodDestino);
      }
    }else{
      this.presentToast('Ingrese código de ubicación');
        this.selectAll(this.txtCodDestino);
    }    
  }

  registrarReubicacionDestino(IdCentro, IdProducto, IdAlmacen, Cantidad, IdUbicacionDestino, strUsuario, strUA): void {
    debugger;
    this.sAlmacenaje.postReubicacionMasiva(IdCentro, IdProducto, IdAlmacen, Cantidad, IdUbicacionDestino, strUsuario, strUA).then(result => {
      debugger;
      let res: any = result;
      if (res.errNumber == 0) {
        console.log(res.message);
        this.presentAlert("UA´s o Pallets reubicadas correctamente.").then((resultAlert) => {
          if (resultAlert) {
            this.goBackReubicacionMasiva()
          }
        })
      } else {
        this.presentAlert("Error. No se puedo registrar el valor.");
        console.log(res.message);
      }
    });
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  limpiar() {
    this.codeBarDestino = "";
    this.Sector = "";
    this.Fila = "";
    this.Columna = "";
    this.Nivel = "";
    this.Posicion = "";
    this.resultUbicacion = [];
    this.rowCountUAS = 0;
    setTimeout(() => {
      this.txtCodDestinoRef.setFocus();
    }, (500));
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

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  goBackReubicacionMasiva() {
    this.navCtrl.push(ReubicacionPage);
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      if (this.vDatosRecibidos.Total_Pallet > 0) {
        this.presentAlertConfirm("Quedan " + this.vDatosRecibidos.Total_Pallet + " Pallet/Ua por reubicar. ¿Está seguro de salir?").then((result) => {
          if (result) {
            this.navCtrl.push(ReubicacionPage);
          }
        })
      } else {
        this.navCtrl.push(ReubicacionPage);
      }
    }

    setTimeout(() => {
      this.txtCodDestinoRef.setFocus();
    }, (500));
    console.log('ionViewDidLoad ReubicacionDestinoPage');
  }
}
