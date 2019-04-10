import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { ParticionarUaPage } from '../menu-consultar/particionar-ua/particionar-ua'
import { ListaPalletUaPage } from '../lista-pallet-ua/lista-pallet-ua'
import { UbicacionDestinoPage } from '../ubicacion-destino/ubicacion-destino'
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';

/**
 * Generated class for the ReabastecimientoPickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reabastecimiento-picking',
  templateUrl: 'reabastecimiento-picking.html',
})
export class ReabastecimientoPickingPage {

  @ViewChild('txtCodBarraUA') txtCodBarraUARef;
  @ViewChild('txtCodBarraUA', { read: ElementRef }) private txtCodBarraUA: ElementRef;
  @ViewChild('txtCantidadUA') txtCantidadUARef;
  @ViewChild('txtCantidadUA', { read: ElementRef }) private txtCantidadUA: ElementRef;


  vReabastecimientoPickingPage: any;
  vDatosRecibidos: any = [];
  codeBar: string;
  Textcantidad: string;

  listValidarUA: any;
  listPalletUATemp: any = [];

  cantSugerida: number;
  saldo: number;

  Agregarisenabled: boolean = false;

  Id: number = 1;
  CantidadBk: any;

  ParticionUA: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public modalCtrl: ModalController) {
    this.vDatosRecibidos = navParams.get('data');
    this.cantSugerida = this.vDatosRecibidos.stockXReabastecer;
    this.saldo = this.vDatosRecibidos.stockXReabastecer
  }

  validarCodeBar() {
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        debugger;
        this.sAlmacenaje.getValidarUAUbicacion(this.codeBar.trim(), this.vDatosRecibidos.Id_Ubicacion).then((result) => {
          debugger;
          this.listValidarUA = result;
          if (this.listValidarUA.length > 0) {
            this.Textcantidad = this.listValidarUA[0].Cantidad
            this.CantidadBk = this.listValidarUA[0].Cantidad;
            this.Agregarisenabled = true;
            this.ParticionUA = true;
            setTimeout(() => {
              this.txtCantidadUARef.setFocus();
              this.selectAll(this.txtCantidadUA);
            }, (500));
          } else {
            this.Textcantidad = "";
            this.CantidadBk = "";
            this.Agregarisenabled = false;
            this.ParticionUA = false;
            this.presentAlert("Pallet/UA no existe").then((result) => {
              setTimeout(() => {
                this.txtCodBarraUARef.setFocus();
                this.selectAll(this.txtCodBarraUA);
              }, (500));
            })
          }
        }, (err) => {
          console.log('E-Ordenes Picking listar', err);
        });
      } else {
        this.presentToast("Ingrese Pallet/UA");
        setTimeout(() => {
          this.txtCodBarraUARef.setFocus();
          this.selectAll(this.txtCodBarraUA);
        }, (500));
      }
    } else {
      this.presentToast("Ingrese Pallet/UA");
      setTimeout(() => {
        this.txtCodBarraUARef.setFocus();
        this.selectAll(this.txtCodBarraUA);
      }, (500));
    }
  }

  ontxtPalletChange() {
    this.Textcantidad = "";
    this.CantidadBk = "";
    this.Agregarisenabled = false;
    this.ParticionUA = false;
  }

  agregar() {
    debugger;

    var cajas = 0;
    var CantXUMP = 0;
    var cant = parseFloat(this.Textcantidad);

    if (this.vDatosRecibidos.Id_Producto != this.listValidarUA[0].Id_Producto) {
      debugger;
      this.presentAlert("Pallet/UA no existe").then((result) => {
        setTimeout(() => {
          this.txtCodBarraUARef.setFocus();
          this.selectAll(this.txtCodBarraUA);
        }, (500));
      })
      return true;
    }

    if (this.vDatosRecibidos.LoteLab != this.listValidarUA[0].LoteLab) {
      debugger;
      this.presentAlert("Pallet/UA no existe").then((result) => {
        setTimeout(() => {
          this.txtCodBarraUARef.setFocus();
          this.selectAll(this.txtCodBarraUA);
        }, (500));
      })
      return true;
    }

    if (cant == 0) {
      debugger;
      this.presentAlert("La cantidad Pallet/UA debe ser diferente de 0.").then((result) => {
        setTimeout(() => {
          this.txtCantidadUARef.setFocus();
          this.selectAll(this.txtCantidadUA);
        }, (500));
      })
      return true;
    }

    if (cant > this.saldo) {
      debugger;
      this.presentAlert("Pallet/UA excede el saldo").then((result) => {
        setTimeout(() => {
          this.txtCantidadUARef.setFocus();
          this.selectAll(this.txtCantidadUA);
        }, (500));
      })
      return true;
    }

    //Obtener valor de cajas
    if (!this.listValidarUA[0].CantXUMP) {
      CantXUMP = 0;
    } else {
      CantXUMP = this.listValidarUA[0].CantXUMP;
    }

    if (CantXUMP != 0) {
      if (cant < CantXUMP) {
        cajas = 0;
      } else {
        cajas = Math.ceil(cant / CantXUMP);
      }
    } else {
      cajas = 0;
    }


    //Agregar a la lista 
    var obj = {
      'Id': this.Id,
      'Pallet_UA': this.codeBar,
      'Cantidad': parseFloat(this.Textcantidad),
      'CantXUMP': cajas
    };
    this.Id = this.Id + 1;
    this.listPalletUATemp.push(obj);

    this.codeBar = "";
    this.Textcantidad = "";
    this.CantidadBk = "";
    this.Agregarisenabled = false;
    this.ParticionUA = false;
    setTimeout(() => {
      this.txtCodBarraUARef.setFocus();
      this.selectAll(this.txtCodBarraUA);
    }, (500));

    //actualizar saldo

    this.saldo = this.saldo - cant;


    this.presentToast("Se agrego Pallet/UA a la lista.");



  }

  showModalParticionarUaPage() {
    debugger;

    if (this.ParticionUA == true) {
      var cant = parseFloat(this.Textcantidad);
      if (cant > this.CantidadBk) {
        this.presentAlert("La cantidad no debe ser mayor o igual al de la UA").then((resultAlert) => {
          setTimeout(() => {
            this.txtCantidadUARef.setFocus();
            this.selectAll(this.txtCantidadUA);
          }, (500));
        })
      } else if (cant == this.CantidadBk) {
        this.presentAlert("La cantidad no debe ser mayor o igual al de la UA").then((resultAlert) => {
          setTimeout(() => {
            this.txtCantidadUARef.setFocus();
            this.selectAll(this.txtCantidadUA);
          }, (500));
        })
      } else if (cant > this.saldo) {
        this.presentAlert("La cantidad no debe ser mayor al Saldo").then((resultAlert) => {
          setTimeout(() => {
            this.txtCantidadUARef.setFocus();
            this.selectAll(this.txtCantidadUA);
          }, (500));
        })
      }
      else {
        let obj = {
          'page': "modal",
          'CodBar_UA': this.listValidarUA[0].UA_CodBarra,
          'UM': this.listValidarUA[0].UM,
          'Codigo': this.listValidarUA[0].CodigoProducto,
          'DescProducto': this.listValidarUA[0].NombreProducto,
          'Lote': this.listValidarUA[0].LoteLab,
          'FechaEmision': this.vDatosRecibidos.FechaEmision,
          'FechaVencimiento': this.vDatosRecibidos.FechaVencimiento,
          'Pasillo': this.vDatosRecibidos.SectorD,
          'CantidadTotal': parseFloat(this.Textcantidad)
        };
        let modalIncidencia = this.modalCtrl.create(ParticionarUaPage, { 'data': obj });
        modalIncidencia.onDidDismiss(data => {
          debugger;
          if (data.response == 200) {
            this.navCtrl.pop();
          }
          if (data.limpiar != 0) {
            this.codeBar = "";
            this.Textcantidad = "";
            this.Agregarisenabled = false;
            this.ParticionUA = false;
            setTimeout(() => {
              this.txtCodBarraUARef.setFocus();
              this.selectAll(this.txtCodBarraUA);
            }, (500));
          }
          console.log("datos", data);
        });
        modalIncidencia.present();
      }
    } else {
      this.presentToast("Debe consultar el Pallet/UA.");
    }
  }

  // goParticionarUaPage() {
  //   debugger;

  //   var cant = parseFloat(this.Textcantidad);

  //   if (cant > this.CantidadBk) {
  //     this.presentAlert("La cantidad no debe ser mayor o igual al de la UA").then((resultAlert) => {
  //       setTimeout(() => {
  //         this.txtCantidadUARef.setFocus();
  //         this.selectAll(this.txtCantidadUA);
  //       }, (500));
  //     })

  //   } else if (cant == this.CantidadBk) {
  //     this.presentAlert("La cantidad no debe ser mayor o igual al de la UA").then((resultAlert) => {
  //       setTimeout(() => {
  //         this.txtCantidadUARef.setFocus();
  //         this.selectAll(this.txtCantidadUA);
  //       }, (500));
  //     })
  //   } else if (cant > this.saldo) {
  //     this.presentAlert("La cantidad no debe ser mayor al Saldo").then((resultAlert) => {
  //       setTimeout(() => {
  //         this.txtCantidadUARef.setFocus();
  //         this.selectAll(this.txtCantidadUA);
  //       }, (500));
  //     })
  //   }
  //   else {
  //     this.vReabastecimientoPickingPage = {
  //       'CodBar_UA': this.listValidarUA[0].UA_CodBarra,
  //       'UM': this.listValidarUA[0].UM,
  //       'Codigo': this.listValidarUA[0].CodigoProducto,
  //       'DescProducto': this.listValidarUA[0].NombreProducto,
  //       'Lote': this.listValidarUA[0].LoteLab,
  //       'FechaEmision': this.vDatosRecibidos.FechaEmision,
  //       'FechaVencimiento': this.vDatosRecibidos.FechaVencimiento,
  //       'Pasillo': this.vDatosRecibidos.SectorD,
  //       'CantidadTotal': parseFloat(this.Textcantidad)
  //     };
  //     this.navCtrl.push(ParticionarUaPage, {
  //       data: this.vReabastecimientoPickingPage
  //     });
  //   }
  // }


  goListaPalletUaPage() {
    debugger;
    if (this.listPalletUATemp.length > 0) {
      this.vReabastecimientoPickingPage = {
        'Id_Tx': this.vDatosRecibidos.Id_Tx,
        'Codigo': this.vDatosRecibidos.Codigo,
        'Producto': this.vDatosRecibidos.Producto,
        'LoteLab': this.vDatosRecibidos.LoteLab,
        'lst_PalletUA': this.listPalletUATemp
      };
      this.navCtrl.push(ListaPalletUaPage, {
        data: this.vReabastecimientoPickingPage
      });
    } else {
      this.presentToast("No hay elementos en la lista Pallet/UA.");
    }
  }

  goUbicacionDestinoPage() {
    debugger;
    if (this.listPalletUATemp.length > 0) {
      this.vReabastecimientoPickingPage = {
        'Codigo': this.vDatosRecibidos.Codigo,
        'Producto': this.vDatosRecibidos.Producto,
        'Sector': this.vDatosRecibidos.Sector,
        'Rack': this.vDatosRecibidos.Rack,
        'Columna': this.vDatosRecibidos.Columna,
        'Nivel': this.vDatosRecibidos.Nivel,
        'Posicion': this.vDatosRecibidos.Posicion,
        'CodigoBarra': this.vDatosRecibidos.CodigoBarra,
        'lst_PalletUA': this.listPalletUATemp
      };
      this.navCtrl.push(UbicacionDestinoPage, {
        data: this.vReabastecimientoPickingPage
      });
    } else {
      this.presentToast("No hay elementos en la lista Pallet/UA.");
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


  ionViewDidLoad() {
    setTimeout(() => {
      this.txtCodBarraUARef.setFocus();
    }, (500));
    console.log('ionViewDidLoad ReabastecimientoPickingPage');
  }
}
