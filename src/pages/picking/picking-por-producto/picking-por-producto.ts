import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Platform, ViewController, App, ModalController, Navbar, NavController, NavParams, PopoverController, ToastController, AlertController } from 'ionic-angular';
import { DetallePorProductoPage } from '../detalle-por-producto/detalle-por-producto'
import { ReabastecimientoPage } from '../reabastecimiento/reabastecimiento'
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { DetallePickingPage } from '../detalle-picking/detalle-picking';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { RutaPickingPage } from '../ruta-picking/ruta-picking';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MainMenuPage } from '../../main-menu/main-menu'
import { HomePage } from '../../home/home';

import { PopoverPickingPage } from '../../picking/popover/popover-picking/popover-picking'
/**
 * Generated class for the PickingPorProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picking-por-producto',
  templateUrl: 'picking-por-producto.html',
})
export class PickingPorProductoPage {

  vRutaPickingPage: any = [];
  listaTempPickingProducto: any = [];
  listPickingProducto: any = [];
  pickingProducto: any = [];
  UAPicking: any = [];
  vPickingXProducto: any = [];
  resultRegistrar: any = [];
  listProductoConRuta: any = [];
  posicion: number = 0;
  contador: number = 1;
  total: number = 1;
  idRutaPicking: number = 0;
  Backisenabled: boolean = false;
  Nextisenabled: boolean = false;
  Txtcantidadisenabled: boolean = false;
  isBgRed: boolean = false;
  isBgYellow: boolean = false;
  isBgGreen: boolean = false;
  isbgWhite: boolean = false;
  codeBar: string;
  Textcantidad: string = '';
  codUbicacion: string;
  valor: number = 0;

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodBarraUA') txtCodBarraUARef;
  @ViewChild('txtCantidadUA') txtCantidadUARef;
  @ViewChild('txtCodBarraUA', { read: ElementRef }) private txtCodBarraUA: ElementRef;
  @ViewChild('txtCantidadUA', { read: ElementRef }) private txtCantidadUA: ElementRef;

  valorpopoverGlobal: boolean = false
  popoverGlobal: any;

  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider, public viewCtrl: ViewController, private platform: Platform) {
    this.vRutaPickingPage = navParams.get('data');
    this.getPickingProductoLoad();
  }

  getPickingProductoLoad() {
    this.codeBar = "";
    this.Textcantidad = "";
    this.getPickingProducto(this.vRutaPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  getPickingProducto(strNroDoc, strUsuario, intIdAlmacen) {
    this.sPicking.getPickingProducto(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
      this.listPickingProducto = result;

      this.listaTempPickingProducto = [];

      for (var i = 0; i < this.listPickingProducto.length; i++) {
        var obj = {
          'idRutaPicking': this.idRutaPicking,
          'Caja': result[i].Caja,
          'CantidadPedida': result[i].CantidadPedida,
          'CodBarraUbi': result[i].CodBarraUbi,
          'CodigoProducto': result[i].CodigoProducto,
          'Columna': result[i].Columna,
          'Contenedor': result[i].Contenedor,
          'Fila': result[i].Fila,
          'FlagAscendente': result[i].FlagAscendente,
          'FlagDescendente': result[i].FlagDescendente,
          'FlagTransito': result[i].FlagTransito,
          'IdPasillo': result[i].IdPasillo,
          'IdProducto': result[i].IdProducto,
          'IdSector': result[i].IdSector,
          'IdUMBase': result[i].IdUMBase,
          'IdUbicacion': result[i].IdUbicacion,
          'Item': result[i].Item,
          'LoteProducto': result[i].LoteProducto,
          'LoteRecibo': result[i].LoteRecibo,
          'Nivel': result[i].Nivel,
          'Pasillo': result[i].Pasillo,
          'Posicion': result[i].Posicion,
          'Producto': result[i].Producto,
          'Referencia': result[i].Referencia,
          'Saldo': result[i].Saldo,
          'SaldoCaja': result[i].SaldoCaja,
          'Sector': result[i].Sector,
          'UMBase': result[i].UMBase
        };
        this.listaTempPickingProducto.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }

      for (var i = 0; i < this.listaTempPickingProducto.length; i++) {
        if (result[i].FlagTransito == false) {
          var id = this.vRutaPickingPage.idRutaPicking;
          this.contador = 1;
          if (id >= 0) {
            debugger;
            this.contador = id + 1;
            this.posicion = id;
            this.pickingProducto = result[this.posicion];
            if (this.contador == 1) {
              this.Backisenabled = false;
            } else { this.Backisenabled = true; }
            if (this.contador == this.listaTempPickingProducto.length) {
              this.Nextisenabled = true;
            } else {
              this.Nextisenabled = false;
            }
          }

          this.total = this.listaTempPickingProducto.length;
          if (this.contador == this.listaTempPickingProducto.length) {
            this.Nextisenabled = true;
          }
          console.log('detalles', this.pickingProducto);
          if (this.pickingProducto.length == 0) {
            console.log('No se encontraron detalles', this.pickingProducto);
          }
          return;
        }
      }

    }, err => {
      console.log('E-getPickingProducto', err);
    });
  }

  getPickingProductoUpdate(strNroDoc, strUsuario, intIdAlmacen) {
    this.sPicking.getPickingProducto(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
      this.listPickingProducto = result;
      this.listaTempPickingProducto = [];

      for (var i = 0; i < this.listPickingProducto.length; i++) {
        var obj = {
          'idRutaPicking': this.idRutaPicking,
          'Caja': result[i].Caja,
          'CantidadPedida': result[i].CantidadPedida,
          'CodBarraUbi': result[i].CodBarraUbi,
          'CodigoProducto': result[i].CodigoProducto,
          'Columna': result[i].Columna,
          'Contenedor': result[i].Contenedor,
          'Fila': result[i].Fila,
          'FlagAscendente': result[i].FlagAscendente,
          'FlagDescendente': result[i].FlagDescendente,
          'FlagTransito': result[i].FlagTransito,
          'IdPasillo': result[i].IdPasillo,
          'IdProducto': result[i].IdProducto,
          'IdSector': result[i].IdSector,
          'IdUMBase': result[i].IdUMBase,
          'IdUbicacion': result[i].IdUbicacion,
          'Item': result[i].Item,
          'LoteProducto': result[i].LoteProducto,
          'LoteRecibo': result[i].LoteRecibo,
          'Nivel': result[i].Nivel,
          'Pasillo': result[i].Pasillo,
          'Posicion': result[i].Posicion,
          'Producto': result[i].Producto,
          'Referencia': result[i].Referencia,
          'Saldo': result[i].Saldo,
          'SaldoCaja': result[i].SaldoCaja,
          'Sector': result[i].Sector,
          'UMBase': result[i].UMBase
        };
        this.listaTempPickingProducto.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }
      debugger;
      this.pickingProducto = result[this.posicion];
      this.ValidarSiguienteProducto();
      return;
    }, err => {
      console.log('E-getPickingProductoUpdate', err);
    });
  }

  registarUA() {
    if (parseInt(this.Textcantidad) > this.pickingProducto.Saldo) { //Cantidad de la UA es mayor al saldo
      //Editar cantidad de la UA
      this.presentToast("Cantidad de UA no puede ser mayor al saldo");
    } else {
      if (this.sGlobal.Id_TerminalRF == 0) {
        this.presentAlert("El campo Id RF no esta configurado. Contactese con el administrador del sistema.");
      } else {
        //Registrar cantidad de la UA
        debugger;
        // Registrar UA
        let objUA = {
          'UA_CodBarra': this.codeBar.trim(),
          'Id_Tx': this.vRutaPickingPage.Id_Tx,
          'Id_Producto': this.pickingProducto.IdProducto,
          'Id_UM': this.pickingProducto.IdUMBase,
          'Cantidad': this.Textcantidad,
          'FlagAnulado': false,
          'Id_TerminalRF': this.sGlobal.Id_TerminalRF,
          'Item': this.pickingProducto.Item,
          'Id_Almacen': this.sGlobal.Id_Almacen,
          'UsuarioRegistro': this.sGlobal.userName,
          'UsuarioModificacion': this.sGlobal.userName
        };
        this.sPicking.RegistarEliminarUA(objUA).then(result => {
          debugger;
          this.resultRegistrar = result;
          if (this.resultRegistrar.errNumber == 0) {
            this.isBgRed = false;
            this.isBgYellow = false;
            this.isBgGreen = true;
            this.codeBar = "";
            this.Textcantidad = "";
          } else {
            this.isBgRed = true;
            this.isBgYellow = false;
            this.isBgGreen = false;
            this.codeBar = "";
            this.Textcantidad = "";
            this.presentToast(this.resultRegistrar.message);
          }
          //Actulizar los campos cant. atendida y saldo
          this.getPickingProductoUpdate(this.vRutaPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);

          setTimeout(() => {
            this.selectAll(this.txtCodBarraUA);
          }, (500));
        });
      }
    }
  }

  keydown(event: any) {
    debugger;
    const MY_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(MY_REGEXP);
    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }

  keyup(event: any) {
    debugger;
    const MY_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(MY_REGEXP);
    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }
  private isDisabled: boolean = false;
  validarCodeBar() {
    debugger;

    if (this.codeBar.substring(0, 1) == "P") {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
    }


    if (this.codeBar.trim() == "") {
      this.presentToast("Ingresar código de UA");
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.codeBar = "";
      this.Textcantidad = "";
      setTimeout(() => {
        this.selectAll(this.txtCodBarraUA);
      }, (500));

      return;
    }

    if (this.pickingProducto.IdPasillo == 1) {

      if (this.codeBar.length < 6) {
        this.presentToast("El código de serie debe tener más de 5 dígitos.");
        setTimeout(() => {
          this.selectAll(this.txtCodBarraUA);
        }, (500));

        return;
      }

      this.sPicking.ValidarSeriePicking(this.vRutaPickingPage.Id_Tx, this.pickingProducto.IdUbicacion, this.pickingProducto.Item, this.pickingProducto.IdProducto, this.codeBar.trim()).then((result) => {

        this.UAPicking = result;
        if (this.UAPicking.errNumber == 0) {
          this.isbgWhite = false;
          this.isBgRed = false;
          this.isBgYellow = true;
          this.isBgGreen = false;
          //Mostrar cantidad de la UA
          this.Textcantidad = "1";
          setTimeout(() => {
            this.selectAll(this.txtCantidadUA);
          }, (500));

          if (this.UAPicking.valor2 != 2) {
            //Bloquear campo cantidad
            this.Txtcantidadisenabled = false;
            if (this.UAPicking.valor2 == 1) {
              //Registrar cantidad de la UA automaticamente
              this.registarUA();
            }
          }
        } else {
          this.presentToast(this.UAPicking.message);
          this.isbgWhite = false;
          this.isBgRed = true;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.Textcantidad = "";
          setTimeout(() => {
            this.selectAll(this.txtCodBarraUA);
          }, (500));
        }

      });

    }
    else {

      if (this.codeBar.length != 12 ) {
        this.presentToast("El código de barra debe tener 12 dígitos.");
        setTimeout(() => {
          this.selectAll(this.txtCodBarraUA);
        }, (500));

        return;
      }

      this.sPicking.getValidarUAPicking(this.vRutaPickingPage.Id_Tx, this.codeBar.trim(), this.pickingProducto.IdProducto, this.pickingProducto.LoteProducto, this.pickingProducto.IdUbicacion).then((result) => {
        debugger;
        this.UAPicking = result;
        if (this.UAPicking.errNumber == 0) {
          this.isbgWhite = false;
          this.isBgRed = false;
          this.isBgYellow = true;
          this.isBgGreen = false;
          //Mostrar cantidad de la UA
          this.Textcantidad = this.UAPicking.valor1;
          setTimeout(() => {
            this.selectAll(this.txtCantidadUA);
          }, (500));

          if (this.UAPicking.valor2 != 2) {
            //Bloquear campo cantidad
            this.Txtcantidadisenabled = false;
            if (this.UAPicking.valor2 == 1) {
              //Registrar cantidad de la UA automaticamente
              this.registarUA();
            }
          }
        } else {
          this.presentToast(this.UAPicking.message);
          this.isbgWhite = false;
          this.isBgRed = true;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.Textcantidad = "";
          setTimeout(() => {
            this.selectAll(this.txtCodBarraUA);
          }, (500));
        }
      }, (err) => {
        console.log('E-Verficar UA', err);
      });

    }
  }

  ValidarSiguienteProducto() {
    let saldoTotal = this.listaTempPickingProducto.reduce(function (prev, cur) {
      return prev + cur.Saldo;
    }, 0); //Obtener el saldo total de los productos.

    if (this.contador == this.listaTempPickingProducto.length)  //Si el saldo total de los productos con ruta se completa 
    {
      this.valor = 1;
      if (saldoTotal == 0) {
        //se sugiere cerrar picking
        debugger;
        this.presentAlertConfirm("Orden de picking completa. ¿Desea cerrar picking?").then((result) => {
          if (result) {
            // Ir a pagina cerrar picking
            this.goCerrarPickingPage();
          } else {
            // this.goDetallePickingPage2();
            this.goOrdenesPicking();
          }
        })
      }
      // else {
      //   this.presentAlertConfirm("Orden de picking incompleta. ¿Desea cerrar picking?").then((result) => {
      //     if (result) {
      //       // Ir a pagina cerrar picking
      //       this.goCerrarPickingPage();
      //     } else {
      //       // this.goDetallePickingPage2();
      //       this.goOrdenesPicking();
      //     }
      //   })
      // }
    } else {//Si el saldo total de los productos con ruta se No completa
      debugger;
      if (this.pickingProducto.Saldo == 0) {//Si Item completado
        //-Si el siguiente producto tiene la misma ubicacion 
        if (this.posicion + 1 < this.listaTempPickingProducto.length) {
          debugger;
          var codigo_Ubi = this.listaTempPickingProducto[this.posicion + 1].CodBarraUbi;
          var transito = this.listaTempPickingProducto[this.posicion + 1].FlagTransito;
          debugger;
          if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
            debugger;
            //avanzar al siguiente producto en la misma pantalla
            this.presentAlert("Item completado");
            this.total = this.listaTempPickingProducto.length;
            this.posicion = this.posicion + 1;
            if (this.posicion < this.listaTempPickingProducto.length) {
              this.contador = this.contador + 1;
              this.pickingProducto = this.listaTempPickingProducto[this.posicion];
              this.Backisenabled = true;
            }
            if (this.contador == this.listaTempPickingProducto.length) {
              this.Nextisenabled = true;
            }
          } else {
            debugger;
            //volver a ruta picking y ubicarse en la posicion siguiente...          
            this.presentAlert("Item completado").then((resultAlert2) => {

              if (transito == false) {
                debugger;
                this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking + 1;
                this.goRutaPickingPage();
              } else {
                debugger;
                this.goOrdenesPicking();
              }
            })
          }
        } else {
          debugger;
        }
      }
    }
  }

  NextRutaPicking() {
    debugger;
    if (this.pickingProducto.Saldo > 0) {
      this.presentAlertConfirm("¿Desea generar una orden de reabastecimiento?").then((result) => {
        if (result) {
          this.goReabastecimientoPage();
        } else {
          if (this.posicion + 1 < this.listaTempPickingProducto.length) {
            var codigo_Ubi = this.listaTempPickingProducto[this.posicion + 1].CodBarraUbi;
            if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
              this.NextRuta();
              this.isbgWhite = true;
              this.isBgRed = false;
              this.isBgYellow = false;
              this.isBgGreen = false;
              this.codeBar = "";
              this.Textcantidad = "";
              setTimeout(() => {
                this.selectAll(this.txtCodBarraUA);
              }, (500));
            } else {
              debugger;
              this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking + 1;
              this.goRutaPickingPage();
            }
          }
        }
      })
    } else {
      if (this.posicion + 1 < this.listaTempPickingProducto.length) {
        var codigo_Ubi = this.listaTempPickingProducto[this.posicion + 1].CodBarraUbi;
        if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
          this.NextRuta();
          this.isbgWhite = true;
          this.isBgRed = false;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.Textcantidad = "";
          setTimeout(() => {
            this.selectAll(this.txtCodBarraUA);
          }, (500));
        } else {
          debugger;
          this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking + 1;
          this.goRutaPickingPage();
        }
      }
    }
  }

  NextRuta() {
    this.total = this.listaTempPickingProducto.length;
    this.posicion = this.posicion + 1;
    if (this.posicion < this.listaTempPickingProducto.length) {
      this.contador = this.contador + 1;
      this.pickingProducto = this.listaTempPickingProducto[this.posicion];
      this.Backisenabled = true;
    }
    if (this.contador == this.listaTempPickingProducto.length) {
      this.Nextisenabled = true;
    }
  }

  BackRutaPicking() {
    debugger;
    if (this.pickingProducto.Saldo > 0) {
      this.presentAlertConfirm("¿Desea generar una orden de reabastecimiento?").then((result) => {
        if (result) {
          this.goReabastecimientoPage();
        } else {
          if (this.posicion - 1 >= 0) {
            var codigo_Ubi = this.listaTempPickingProducto[this.posicion - 1].CodBarraUbi;
            if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
              this.BackRuta();
              this.isbgWhite = true;
              this.isBgRed = false;
              this.isBgYellow = false;
              this.isBgGreen = false;
              this.codeBar = "";
              this.Textcantidad = "";
              setTimeout(() => {
                this.selectAll(this.txtCodBarraUA);
              }, (500));
            } else {
              this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking - 1;
              this.goRutaPickingPage();
            }
          }
        }
      });
    } else {
      if (this.posicion - 1 >= 0) {
        var codigo_Ubi = this.listaTempPickingProducto[this.posicion - 1].CodBarraUbi;
        if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
          this.BackRuta();
          this.isbgWhite = true;
          this.isBgRed = false;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.Textcantidad = "";
          setTimeout(() => {
            this.selectAll(this.txtCodBarraUA);
          }, (500));
        } else {
          this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking - 1;
          this.goRutaPickingPage();
        }
      }
    }
  }

  BackRuta() {
    this.total = this.listaTempPickingProducto.length;
    this.posicion = this.posicion - 1;
    if (this.posicion >= 0) {
      this.contador = this.contador - 1;
      this.pickingProducto = this.listaTempPickingProducto[this.posicion];
      this.Nextisenabled = false;
    }
    if (this.contador == 1) {
      this.Backisenabled = false;
    }
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
    this.sGlobal.resultIncidencia = false;
    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });
    modalIncidencia.onDidDismiss(data => {
      debugger;
      if (this.sGlobal.resultIncidencia) {
        this.goOrdenesPicking();
      }
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

  goMenu() {
    debugger;
    this.navCtrl.push(MainMenuPage);
  }

  presentPopover(ev) {
    this.valorpopoverGlobal = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverPickingPage, { 'page': 1 });
    this.popoverGlobal.present({
      ev: ev
    });

    this.popoverGlobal.onDidDismiss(popoverData => {
      this.valorpopoverGlobal = false;
      if (popoverData == 1) {
        if (this.vRutaPickingPage.Id_Estado != 2) {
          this.showModalIncidencia(this.vRutaPickingPage);
        } else {
          this.presentAlert("No puede registrar incidencia de una transacción que no fue iniciada");
        }
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

  goRutaPickingPage() {
    debugger;
    this.navCtrl.pop().then(() => {
      debugger;
      this.vPickingXProducto = {
        'idRutaPicking': this.pickingProducto.idRutaPicking,
        'Id_Tx': this.vRutaPickingPage.Id_Tx,
        'NumOrden': this.vRutaPickingPage.NumOrden,
        'Cliente': this.vRutaPickingPage.Cliente,
        'Ciudad': this.vRutaPickingPage.Ciudad,
        'Zona': this.vRutaPickingPage.Zona,
        'FlagPausa': this.vRutaPickingPage.FlagPausa,
        'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta
      };
      this.navParams.get('pickingPorProducto')(this.vPickingXProducto);
    });
  }

  goRutaPickingPageUpdate() {
    this.vPickingXProducto = {
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'FlagPausa': this.vRutaPickingPage.FlagPausa,
      'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vPickingXProducto
    });
  }

  goCerrarPickingPage() {
    let saldoTotalPicking = this.listaTempPickingProducto.reduce(function (prev, cur) {
      return prev + cur.Saldo;
    }, 0);
    debugger;
    this.vPickingXProducto = {
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'Saldo': saldoTotalPicking,
      'FlagPausa': this.vRutaPickingPage.FlagPausa,
      'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta
    };
    this.navCtrl.push(CierrePickingPage, {
      data: this.vPickingXProducto
    });
  }

  dataFromdetallePickingPage: any;
  detallePickingCallback = data => {
    debugger;
    this.dataFromdetallePickingPage = data;
    console.log('data received from other page', this.dataFromdetallePickingPage);
    debugger;
    this.vRutaPickingPage = this.dataFromdetallePickingPage;
  };

  goDetallePickingPage() {
    debugger;
    this.vPickingXProducto = {
      'idRutaPicking': this.listaTempPickingProducto[this.posicion].idRutaPicking,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'FlagPausa': this.vRutaPickingPage.FlagPausa,
      'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta,
      'Id_Estado': this.vRutaPickingPage.Id_Estado
    };

    this.navCtrl.push(DetallePickingPage, {
      data: this.vPickingXProducto, detallePicking: this.detallePickingCallback
    });
  }

  goOrdenesPicking() {
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'PickingPage') {
        this.navCtrl.popTo(item);
      }
    });
  }

  dataFromdetallePorProductoPage: any;
  detallePorProductoCallback = data => {
    debugger;
    this.dataFromdetallePorProductoPage = data;
    console.log('data received from other page', this.dataFromdetallePorProductoPage);
    debugger;
    this.vRutaPickingPage = this.dataFromdetallePorProductoPage;
  };

  goDetallePorProductoPage(): void {
    debugger;
    this.vPickingXProducto = {
      'Id_Page_Anterior': 5,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'CodigoProducto': this.pickingProducto.CodigoProducto,
      'Producto': this.pickingProducto.Producto,
      'IdProducto': this.pickingProducto.IdProducto,
      'Item': this.pickingProducto.Item,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'idRutaPicking': this.listaTempPickingProducto[this.posicion].idRutaPicking,
      'FlagPausa': this.vRutaPickingPage.FlagPausa,
      'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta,
      'Id_Estado': this.vRutaPickingPage.Id_Estado
    };

    this.navCtrl.push(DetallePorProductoPage, {
      data: this.vPickingXProducto, detallePorProducto: this.detallePorProductoCallback
    });
  }

  goReabastecimientoPage(): void {
    debugger;
    this.vPickingXProducto = {
      'Sector': this.pickingProducto.Sector,
      'Pasillo': this.pickingProducto.Pasillo,
      'Fila': this.pickingProducto.Fila,
      'Columna': this.pickingProducto.Columna,
      'Nivel': this.pickingProducto.Nivel,
      'Posicion': this.pickingProducto.Posicion,
      'IdProducto': this.pickingProducto.IdProducto,
      'IdUbicacion': this.pickingProducto.IdUbicacion,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'FlagPausa': this.vRutaPickingPage.FlagPausa,
      'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta
    };
    this.navCtrl.push(ReabastecimientoPage, {
      data: this.vPickingXProducto
    });
  }

  RegistrarSolicitudPicking(): void {
    this.presentAlertConfirm("¿Estás seguro de registrar la solicitud?").then((result) => {
      if (result) {
        console.log("entra");
        this.sPicking.RegistrarSolicitudPicking(this.vRutaPickingPage.Id_Tx, this.pickingProducto.Item, this.pickingProducto.IdProducto, 0, this.pickingProducto.Saldo, this.sGlobal.Id_Almacen, this.sGlobal.userName).then(result => {
          var message: any = result;
          if (message.errNumber == 0 || message.errNumber == 1) {
            console.log("exito");
            this.presentAlert(message.message);
          }
          else {
            this.presentAlert("No se realizó el registro de la solicitud");
          }
        });

      }


    });
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.selectAll(this.txtCodBarraUA);
    }, (500));
    console.log('ionViewDidLoad PickingPorProductoPage');
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {
      debugger;
      if (this.valorpopoverGlobal) {
        this.valorpopoverGlobal = false;
        this.popoverGlobal.dismiss();
      } else {
        this.navCtrl.pop();
      }
    });
  }

}
