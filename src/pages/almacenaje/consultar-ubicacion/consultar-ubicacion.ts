import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto'

/**
 * Generated class for the ConsultarUbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultar-ubicacion',
  templateUrl: 'consultar-ubicacion.html',
})
export class ConsultarUbicacionPage {
  @ViewChild(Navbar) navBar: Navbar;
  codeBar: string;
  codeBarBK: string;
  listUas: any = [];
  resultUbicacion: any;
  vConsultarUbicacionPage: any = [];
  rowCount: any = 0;
  Fila: any;
  Columna: any;
  Nivel: any;
  Posicion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
  }

  @ViewChild('txtBuscar') txtBuscarRef;
  @ViewChild('txtBuscar', { read: ElementRef }) private txtBuscar: ElementRef;

  validarCodigo() {
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if (this.codeBar.length == 14) {
          this.codeBarBK = this.codeBar.trim();
          debugger;
          this.ListarUAsXUbicacion();
          this.ListarUbicacionXCodigoBarra();
        } else {
          this.presentToast("El código de ubicación debe tener 14 dígitos.");
          setTimeout(() => {
            this.selectAll(this.txtBuscar);
          }, (500));
        }
      } else {
        this.presentToast("Ingrese código de ubicación");
        setTimeout(() => {
          this.selectAll(this.txtBuscar);
        }, (500));
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
      setTimeout(() => {
        this.selectAll(this.txtBuscar);
      }, (500));
    }
  }

  ListarUbicacionXCodigoBarra() {
    this.sAlmacenaje.getListarUbicacionXCodigoBarra(this.codeBar, this.sGlobal.Id_Almacen).then((result) => {
      debugger;
      this.resultUbicacion = result;
      if (this.resultUbicacion.length > 0) {
        this.Fila = this.resultUbicacion[0].Fila;
        this.Columna = this.resultUbicacion[0].Columna;
        this.Nivel = this.resultUbicacion[0].Nivel;
        this.Posicion = this.resultUbicacion[0].Posicion;                
      } else {
        //Mensaje la ubicacion no exiset
        this.presentAlert("Ubicación no existe.").then((resultAlert) => {          
        })
      }
    }, err => {
      console.log('E-getListarUbicacionXCodigoBarra', err);
    });
  }

  ListarUAsXUbicacion() {
    this.sAlmacenaje.getListarUAsXUbicacion(this.codeBarBK, this.sGlobal.Id_Almacen).then((result) => {
      debugger;
      this.listUas = result;
      this.rowCount = this.listUas.length;
      if (this.listUas.length == 0) {
        this.presentAlert("No se encontraron registros").then((resultAlert) => {
          if (resultAlert) {
            setTimeout(() => {
              this.selectAll(this.txtBuscar);
            }, (500));
          }
        })
      } else {
        setTimeout(() => {
          this.selectAll(this.txtBuscar);
        }, (500));
      }
    }, err => {
      console.log('E-getDataRutaPicking', err);
    });
  }

  ListarUAsXUbicacion_update() {
    this.sAlmacenaje.getListarUAsXUbicacion(this.codeBarBK, this.sGlobal.Id_Almacen).then((result) => {
      debugger;
      this.listUas = result;
      this.rowCount = this.listUas.length;
    }, err => {
      console.log('E-getDataRutaPicking', err);
    });
  }

  eliminarUA(data) {
    this.presentAlertConfirm("¿Está seguro de eliminar la UA: " + data.UA_CodBarra + " en la ubicación?.").then((result) => {
      if (result) {
        debugger;
        let fecha = new Date().toISOString();
        let objUA = {
          'UA_CodBarra': data.UA_CodBarra,
          'FechaRegistro': "/Date(" + Date.parse(fecha) + ")/",
          'FechaEmision': data.FechaEmision,
          'FechaVencimiento': data.FechaVencimiento,
          'Lote': data.LoteLab,
          'Cantidad': data.Cantidad,
          'UsuarioRegistro': this.sGlobal.userName
        };
        this.sAlmacenaje.postRegistrarUAStandBy(objUA, 2, this.sGlobal.Id_Almacen).then(result => {
          debugger;
          let res: any = result;
          if (res.errNumber == 0) {
            console.log(res.message);
            this.presentAlert("Pallet/UA en Stand By.");
            this.ListarUAsXUbicacion_update();
          } else {
            this.presentAlert("Error. No se pudo eliminar el valor.");
            console.log(res.message);
          }
        });
      }
    })
  }

  eliminarUAS() {
    if (this.listUas.length > 0) {
      this.presentAlertConfirm("¿Está seguro de eliminar : " + this.rowCount + " registros de UA´s en la ubicación?.").then((result) => {
        if (result) {
          for (var i = 0; i < this.listUas.length; i++) {
            var count = 0;
            let fecha = new Date().toISOString();
            let objUA = {
              'UA_CodBarra': this.listUas[i].UA_CodBarra,
              'FechaRegistro': "/Date(" + Date.parse(fecha) + ")/",
              'FechaEmision': this.listUas[i].FechaEmision,
              'FechaVencimiento': this.listUas[i].FechaVencimiento,
              'Lote': this.listUas[i].LoteLab,
              'Cantidad': this.listUas[i].Cantidad,
              'UsuarioRegistro': this.sGlobal.userName
            };

            this.sAlmacenaje.postRegistrarUAStandBy(objUA, 2, this.sGlobal.Id_Almacen).then(result => {
              debugger;
              count = count + 1;
              if (count == this.listUas.length) {
                let res: any = result;
                if (res.errNumber == 0) {
                  console.log(res.message);
                  this.presentAlert("Pallets/UA's en Stand By.");
                  this.ListarUAsXUbicacion_update();
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

  goDetalleProductoPage(data) {
    debugger;
    this.vConsultarUbicacionPage = {
      'Producto': data.Producto,
      'Codigo': data.Codigo,
      'UM': data.UM,
      'UA_CodBarra': data.UA_CodBarra,
      'LoteLab': data.LoteLab,
      'FechaEmision': data.FechaEmision,
      'FechaVencimiento': data.FechaVencimiento,
      'Cantidad': data.Cantidad
    };
    this.navCtrl.push(DetalleProductoPage, {
      data: this.vConsultarUbicacionPage
    });
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
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
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.presentAlertConfirm("¿Está seguro de salir?").then((result) => {
        if (result) {
          this.navCtrl.pop();
        }
      })
    }
    setTimeout(() => {
      this.selectAll(this.txtBuscar);
    }, (500));
    console.log('ionViewDidLoad ConsultarUbicacionPage');
  }
}
