import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Platform, ViewController, App, Navbar, NavController, NavParams, PopoverController, ModalController, ToastController, AlertController } from 'ionic-angular';
import { DetallePickingPage } from '../detalle-picking/detalle-picking';
import { PickingPorProductoPage } from '../picking-por-producto/picking-por-producto';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PickingPage } from '../../picking/picking';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { HomePage } from '../../home/home';
import { PopoverPickingPage } from '../../picking/popover/popover-picking/popover-picking'

/**
 * Generated class for the RutaPickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ruta-picking',
  templateUrl: 'ruta-picking.html',
})
export class RutaPickingPage {

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;

  vPickingPage: any = [];
  vRutaPickingPage: any = [];
  listaTempRutaPicking: any = [];
  listaRutaPicking: any = [];
  rutaPicking: any = [];
  posicion: number = 0;
  contador: number = 1;
  total: number = 1;
  idRutaPicking: number = 0;
  codBar: string;
  codeBar: string;
  Fila: string;
  isBgRed: boolean = false;
  isbgWhite: boolean = false;
  Backisenabled: boolean = false;
  Nextisenabled: boolean = false;
  valorpopoverGlobal: boolean = false
  popoverGlobal: any;


  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public viewCtrl: ViewController, private platform: Platform) {
      debugger;
    this.vPickingPage = navParams.get('data');
    this.getDataRutaPicking(this.vPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if (this.codeBar.length == 14) {
          this.codBar = this.rutaPicking.CodBarraUbi.trim();
          if (this.codeBar.trim() == this.codBar) {
            this.isbgWhite = true;
            this.isBgRed = false;
            this.goPickingPorProductoPage();
          } else {
            this.isbgWhite = false;
            this.isBgRed = true;
            this.codeBar = "";
            this.presentToast("Código de ubicación incorrecto");
          }
        } else {
          this.presentToast("El código de ubicación debe tener 14 dígitos.");
          setTimeout(() => {
            this.selectAll(this.txtCodUbicacion);
          }, (500));
        }
      }
      else {
        this.presentToast("Ingrese código de ubicación");
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
    }
    setTimeout(() => {
      this.selectAll(this.txtCodUbicacion);
    }, (500));
  }

  getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen) {
    debugger;
    this.sPicking.getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
      this.listaRutaPicking = [];
      this.listaTempRutaPicking = result;
      for (var i = 0; i < this.listaTempRutaPicking.length; i++) {
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
        debugger;
        this.listaRutaPicking.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }
      //Agregar columna idRuta, para que se pueda usar al momento de volver de detalle
      //comparar idRuta para actualizar la posicion de la lista
      debugger;
      for (var i = 0; i < this.listaRutaPicking.length; i++) {
        debugger;
        if (result[i].Saldo > 0) {
          debugger;
          if (result[i].FlagTransito == false) {
            debugger;
            var id = this.vPickingPage.idRutaPicking;
            this.contador = 1;
            if (id) {
              this.contador = id + 1;
              this.posicion = id;
              this.rutaPicking = result[this.posicion];
              if (this.contador == 1) {
                this.Backisenabled = false;
              } else { this.Backisenabled = true; }
              if (this.contador == this.listaRutaPicking.length) {
                this.Nextisenabled = true;
              } else {
                this.Nextisenabled = false;
              }
            } else {
              this.contador = i + 1;
              this.posicion = i;
              this.rutaPicking = result[i];
              if (this.contador == 1) {
                this.Backisenabled = false;
              } else { this.Backisenabled = true; }
              if (this.contador == this.listaRutaPicking.length) {
                this.Nextisenabled = true;
              } else {
                this.Nextisenabled = false;
              }
            }
            this.total = this.listaRutaPicking.length;
            if (this.contador == this.listaRutaPicking.length) {
              this.Nextisenabled = true;
            }
            console.log('detalles', this.rutaPicking);
            if (this.rutaPicking.length == 0) {
              console.log('No se encontraron detalles', this.rutaPicking);
            }
            return;
          } else {
            if (i == this.listaRutaPicking.length - 1) {
              this.goDetallePickingPage();
              return;
            }
          }
        }
        if (i == this.listaRutaPicking.length - 1) {
          this.goDetallePickingPage();
          return;
        }
      }
    }, err => {
      console.log('E-getDetailXTx', err);
    });
  }

  goConsultarUbicacionPage() {
    this.navCtrl.push(ConsultarUbicacionPage);
  }

  NextRutaPicking() {
    debugger;
    var posicionTempGlobal = this.posicion;
    var contadorTempGlobal = this.contador;
    this.posicion = this.posicion + 1;
    if (this.posicion < this.listaRutaPicking.length) {
      //Si tiene ruta
      if (this.listaRutaPicking[this.posicion].IdUbicacion != 0) {
        this.contador = this.contador + 1;
        this.rutaPicking = this.listaRutaPicking[this.posicion];
        this.Backisenabled = true;
      } else { //Si no tiene ruta        
        if (this.posicion == this.listaRutaPicking.length - 1) {
          this.posicion = this.posicion - 1;
          this.presentAlert("No hay mas articulos con ruta.");
        } else {
          this.presentAlertConfirm("El siguiente articulo no tiene ruta,  si desea ir a un articulo que tenga ruta presionar ACEPTAR.").then((result) => {
            if (result) {
              debugger;
              this.contador = this.contador + 1;
              var tieneRuta = false;
              var posicionTemp = this.posicion;
              for (var i = posicionTemp + 1; i < this.listaRutaPicking.length; i++) {
                this.posicion = this.posicion + 1;
                this.contador = this.contador + 1;
                if (this.listaRutaPicking[i].IdUbicacion != 0) {
                  this.rutaPicking = this.listaRutaPicking[i];
                  this.Backisenabled = true;
                  tieneRuta = true;
                  return;
                }
              }
              if (!tieneRuta) {
                this.presentAlert("No hay mas articulos con ruta.");
                this.posicion = posicionTempGlobal;
                this.contador = contadorTempGlobal;
              }
            } else {
              this.posicion = this.posicion - 1;
            }
          })
        }
      }
    }
    if (this.posicion == this.listaRutaPicking.length - 1) {
      this.Nextisenabled = true;
    }
    this.codeBar = "";
    setTimeout(() => {
      this.selectAll(this.txtCodUbicacion);
    }, (500));
  }

  BackRutaPicking() {
    debugger;
    var posicionTempGlobal = this.posicion;
    var contadorTempGlobal = this.contador;
    this.posicion = this.posicion - 1;
    if (this.posicion >= 0) {
      //Si tiene ruta
      if (this.listaRutaPicking[this.posicion].IdUbicacion != 0) {
        this.contador = this.contador - 1;
        this.rutaPicking = this.listaRutaPicking[this.posicion];
        this.Nextisenabled = false;
      } else {
        if (this.posicion == 0) {
          this.posicion = this.posicion + 1;
          this.presentAlert("No hay mas articulos con ruta.");
        } else {
          this.presentAlertConfirm("El siguiente articulo no tiene ruta,  si desea ir a un articulo que tenga ruta presionar ACEPTAR.").then((result) => {
            if (result) {
              debugger;
              this.contador = this.contador - 1;
              var posicionTemp = this.posicion;
              var tieneRuta = false;
              for (var i = posicionTemp - 1; i >= 0; i--) {
                this.posicion = this.posicion - 1;
                this.contador = this.contador - 1;
                if (this.listaRutaPicking[i].IdUbicacion != 0) {
                  this.rutaPicking = this.listaRutaPicking[i];
                  if (this.posicion == 0) {
                    this.Backisenabled = false;
                  }
                  tieneRuta = true;
                  return;
                }
              }
              if (!tieneRuta) {
                this.presentAlert("No hay mas articulos con ruta.");
                this.posicion = posicionTempGlobal;
                this.contador = contadorTempGlobal;
              }
            } else {
              this.posicion = this.posicion + 1;
            }
          })
        }
      }
    }
    debugger;
    if (this.posicion == 0) {
      this.Backisenabled = false;
    }
    this.codeBar = "";
    setTimeout(() => {
      this.selectAll(this.txtCodUbicacion);
    }, (500));
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
        if (this.vPickingPage.Id_Estado != 2) {
          this.showModalIncidencia(this.vPickingPage);
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
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
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
        this.goPickingPage();
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

  goPickingPage() {
    debugger;
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'PickingPage') {
        this.navCtrl.popTo(item);
      }
    });
  }

  dataFromDetallePickingPage: any;
  detallePickingCallback = data => {
    debugger;
    this.dataFromDetallePickingPage = data;
    console.log('data received from other page', this.dataFromDetallePickingPage);
    debugger;
    this.vRutaPickingPage = this.dataFromDetallePickingPage;
    
    
  };

  goDetallePickingPage() {
    debugger;
    this.vRutaPickingPage = {
      'Id_Tx': this.vPickingPage.Id_Tx,
      'NumOrden': this.vPickingPage.NumOrden,
      'Cliente': this.vPickingPage.Cliente,
      'Ciudad': this.vPickingPage.Ciudad,
      'Zona': this.vPickingPage.Zona,
      'FlagPausa': this.vPickingPage.FlagPausa,
      'Id_Cuenta': this.vPickingPage.Id_Cuenta,
      'Id_Estado': this.vPickingPage.Id_Estado
    };
    this.navCtrl.push(DetallePickingPage, {
      data: this.vRutaPickingPage, detallePicking: this.detallePickingCallback
    });
  }

  goCerrarPickingPage() {
    let saldoTotal = this.listaRutaPicking.reduce(function (prev, cur) {
      return prev + cur.Saldo;
    }, 0);
    debugger;
    this.vRutaPickingPage = {
      'Id_Tx': this.vPickingPage.Id_Tx,
      'NumOrden': this.vPickingPage.NumOrden,
      'Cliente': this.vPickingPage.Cliente,
      'Ciudad': this.vPickingPage.Ciudad,
      'Zona': this.vPickingPage.Zona,
      'Saldo': saldoTotal,
      'FlagPausa': this.vPickingPage.FlagPausa,
      'Id_Cuenta': this.vPickingPage.Id_Cuenta,
    };
    this.navCtrl.push(CierrePickingPage, {
      data: this.vRutaPickingPage
    });
  }

  dataFromPickingPorProductoPage: any;
  pickingPorProductoCallback = data => {
    debugger;
    this.dataFromPickingPorProductoPage = data;
    console.log('data received from other page', this.dataFromPickingPorProductoPage);
    debugger;
    this.vPickingPage = this.dataFromPickingPorProductoPage;
    this.codeBar = "";
    this.getDataRutaPicking(this.vPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);
    setTimeout(() => {
      this.selectAll(this.txtCodUbicacion);
    }, (500));
  };

  goPickingPorProductoPage() {
    debugger;
    this.vRutaPickingPage = {
      'idRutaPicking': this.listaRutaPicking[this.posicion].idRutaPicking,
      'Id_Tx': this.vPickingPage.Id_Tx,
      'NumOrden': this.vPickingPage.NumOrden,
      'Cliente': this.vPickingPage.Cliente,
      'Ciudad': this.vPickingPage.Ciudad,
      'Zona': this.vPickingPage.Zona,
      'FlagPausa': this.vPickingPage.FlagPausa,
      'Id_Cuenta': this.vPickingPage.Id_Cuenta,
      'Id_Estado': this.vPickingPage.Id_Estado
    };
    this.navCtrl.push(PickingPorProductoPage, {
      data: this.vRutaPickingPage, pickingPorProducto: this.pickingPorProductoCallback
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
    console.log('ionViewDidLoad RutaPickingPage');
  }

  ionViewWillEnter(){
    this.platform.registerBackButtonAction(() => {
      debugger;
      if(this.valorpopoverGlobal){
        this.valorpopoverGlobal = false;
        this.popoverGlobal.dismiss();
      }else{
        this.navCtrl.pop(); 
      }      
  });
  }
}




