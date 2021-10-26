import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, ViewController, App, ModalController, Navbar, NavController, NavParams, PopoverController, ToastController, AlertController } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { RutaPickingPage } from '../ruta-picking/ruta-picking';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
import { DetallePorProductoPage } from '../detalle-por-producto/detalle-por-producto'
import { IncidenciaPage } from '../../incidencia/incidencia';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MainMenuPage } from '../../main-menu/main-menu'
import { HomePage } from '../../home/home';

import { PopoverPickingPage } from '../../picking/popover/popover-picking/popover-picking'

/**
 * Generated class for the DetallePickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-picking',
  templateUrl: 'detalle-picking.html',
})
export class DetallePickingPage {

  @ViewChild(Navbar) navBar: Navbar;

  searchQuery: string = '';
  vRutaPickingPage: any = [];
  listDetallePicking: any = [];
  listAuxDetallePicking: any = [];
  listaTempRutaPicking: any = [];
  listDetalleSinTrabajar: any = [];
  listDetalleProceso: any = [];
  listDetalleFinalizado: any = [];
  rowCount: any;
  rowCountSinTrabajar: any;
  rowCountProceso: any;
  rowCountFinalizado: any;
  vDetallePickingPage: any;
  idRutaPicking: number = 0;

  valorpopoverGlobal: boolean = false
  popoverGlobal: any;

  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider, public alertCtrl: AlertController,
    public viewCtrl: ViewController, private platform: Platform) {
    this.vRutaPickingPage = navParams.get('data');
    this.getDetallePickingLoad();
  }

  filterItems(ev: any) {
    debugger;
    const val = ev.value;
    if (val && val.trim() != '') {
      this.listAuxDetallePicking = this.listDetallePicking.filter((item) => {
        return (item.CodigoProducto.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Producto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxDetallePicking.length;

      if (this.rowCount > 0) {
        this.listDetalleSinTrabajar = this.listAuxDetallePicking.filter((item) => {
          return (item.CantidadPedida == item.Saldo);
        });
        this.listDetalleProceso = this.listAuxDetallePicking.filter((item) => {
          return (item.Saldo > 0 && item.Saldo < item.CantidadPedida);

        });
        this.listDetalleFinalizado = this.listAuxDetallePicking.filter((item) => {
          return (item.Saldo == 0);
        });

        this.rowCountSinTrabajar = this.listDetalleSinTrabajar.length;
        this.rowCountProceso = this.listDetalleProceso.length;
        this.rowCountFinalizado = this.listDetalleFinalizado.length;
      } else {
        this.rowCountSinTrabajar = this.rowCount;
        this.rowCountProceso = this.rowCount;
        this.rowCountFinalizado = this.rowCount;
      }
    } else {
      this.rowCount = this.listDetallePicking.length;
      this.listDetalleSinTrabajar = this.listDetallePicking.filter((item) => {
        return (item.CantidadPedida == item.Saldo);
      });
      this.listDetalleProceso = this.listDetallePicking.filter((item) => {
        return (item.Saldo > 0 && item.Saldo < item.CantidadPedida);
      });
      this.listDetalleFinalizado = this.listDetallePicking.filter((item) => {
        return (item.Saldo == 0);
      });

      this.rowCountSinTrabajar = this.listDetalleSinTrabajar.length;
      this.rowCountProceso = this.listDetalleProceso.length;
      this.rowCountFinalizado = this.listDetalleFinalizado.length;
      return this.listAuxDetallePicking = this.listDetallePicking;
    }
  }

  ValidarProducto(data) {
    debugger;
    if (data.FlagTransito == true) {
      this.presentToast("No existe ruta para este producto");
    } else {
      this.getDataRutaPicking(this.vRutaPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen, data)
    }
  }

  getDetallePickingLoad() {
    this.searchQuery = "";
    this.getDetallePicking(this.vRutaPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  getDetallePicking(strNroDoc, strUsuario, intIdAlmacen) {
    this.sPicking.getDetallePicking(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
      this.listDetallePicking = result;
      this.listAuxDetallePicking = [];

      this.listDetalleSinTrabajar = [];
      this.listDetalleProceso = [];
      this.listDetalleFinalizado = [];
      //Agregar columna idRuta
      for (var i = 0; i < this.listDetallePicking.length; i++) {
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
        this.listAuxDetallePicking.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;

        if (result[i].CantidadPedida == result[i].Saldo) {
          this.listDetalleSinTrabajar.push(obj);
        }
        if (result[i].Saldo == 0) {
          this.listDetalleFinalizado.push(obj);
        }
        if (result[i].Saldo > 0 && result[i].Saldo < result[i].CantidadPedida) {
          this.listDetalleProceso.push(obj);
        }
      }

      this.rowCount = this.listAuxDetallePicking.length;
      this.rowCountSinTrabajar = this.listDetalleSinTrabajar.length;
      this.rowCountProceso = this.listDetalleProceso.length;
      this.rowCountFinalizado = this.listDetalleFinalizado.length;

      if (this.listDetallePicking.length > 0) {
        console.log('Datos detalle picking', this.listDetallePicking);
      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-getDetallePicking', err);
    });
  }

  getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen, data) {
    this.sPicking.getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.listaTempRutaPicking = result;
      for (var i = 0; i < this.listaTempRutaPicking.length; i++) {
        if (result[i].Saldo > 0) {
          if (result[i].FlagTransito == false) {
            //Ir a ruta picking
            this.goRutaPickingPage(data);
            return;
          } else {
            if (i == this.listaTempRutaPicking.length - 1) {
              this.presentAlertConfirm("¿Desea cerrar picking?”.").then((result) => {
                if (result) {
                  // Ir a pagina cerrar picking
                  this.goCerrarPickingPage();
                } else {
                  this.presentToast("No existe ruta para este producto");
                }
              })
              return;
            }
          }
        }
        if (i == this.listaTempRutaPicking.length - 1) {
          this.presentAlertConfirm("¿Desea cerrar picking?”.").then((result) => {
            if (result) {
              // Ir a pagina cerrar picking
              this.goCerrarPickingPage();
            } else {
              this.presentToast("No existe ruta para este producto");
            }
          })
          return;
        }
      }
    }, err => {
      console.log('E-getDataRutaPicking', err);
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

  goOrdenesPicking() {
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'PickingPage') {
        this.navCtrl.popTo(item);
      }
    });
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

    this.popoverGlobal = this.popoverCtrl.create(PopoverPickingPage, { 'page': 2 });
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
      else if (popoverData == 5) {        
        this.goCerrarPickingPage();        
      }
    });
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

  goRutaPickingPage(data) {
    this.vDetallePickingPage = {
      'Id_Page_Anterior': 3,
      'idRutaPicking': data.idRutaPicking,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'FlagPausa': this.vRutaPickingPage.FlagPausa,
      'Id_Estado': this.vRutaPickingPage.Id_Estado,
      'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vDetallePickingPage
    });
  }

  goBackRutaPickingPage() {
    debugger;
    this.navCtrl.pop().then(() => {
      this.vDetallePickingPage = {
        'idRutaPicking': 0,
        'Id_Tx': this.vRutaPickingPage.Id_Tx,
        'NumOrden': this.vRutaPickingPage.NumOrden,
        'Cliente': this.vRutaPickingPage.Cliente,
        'Ciudad': this.vRutaPickingPage.Ciudad,
        'Zona': this.vRutaPickingPage.Zona,
        'FlagPausa': this.vRutaPickingPage.FlagPausa,
        'Id_Estado': this.vRutaPickingPage.Id_Estado,
        'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta
      };
      this.navParams.get('detallePicking')(this.vDetallePickingPage);
    });
  }

  goCerrarPickingPage() {
    let saldoTotalPicking = this.listAuxDetallePicking.reduce(function (prev, cur) {
      return prev + cur.Saldo;
    }, 0);
    debugger;
    this.vDetallePickingPage = {
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
      data: this.vDetallePickingPage
    });
  }

  dataFromDetallePorProductoPage: any;
  detallePorProductoCallback = data => {
    debugger;
    this.dataFromDetallePorProductoPage = data;
    console.log('data received from other page', this.dataFromDetallePorProductoPage);
    debugger;
    this.vRutaPickingPage = this.dataFromDetallePorProductoPage;
  };

  goDetallePorProductoPage(data): void {
    debugger;

    this.vDetallePickingPage = {
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'CodigoProducto': data.CodigoProducto,
      'Producto': data.Producto,
      'IdProducto': data.IdProducto,
      'Item': data.Item,
      'idRutaPicking': this.vRutaPickingPage.idRutaPicking,
      'FlagPausa': this.vRutaPickingPage.FlagPausa,
      'Id_Cuenta': this.vRutaPickingPage.Id_Cuenta,
      'Id_Estado': this.vRutaPickingPage.Id_Estado
    };

    this.navCtrl.push(DetallePorProductoPage, {
      data: this.vDetallePickingPage, detalleProducto: this.detallePorProductoCallback
    });
  }

  goPickingPorProductoPage() {
    debugger;
    this.navCtrl.pop().then(() => {
      this.vDetallePickingPage = {
        'idRutaPicking': this.vRutaPickingPage.idRutaPicking,
        'Id_Tx': this.vRutaPickingPage.Id_Tx,
        'NumOrden': this.vRutaPickingPage.NumOrden,
        'Cliente': this.vRutaPickingPage.Cliente,
        'Ciudad': this.vRutaPickingPage.Ciudad,
        'Zona': this.vRutaPickingPage.Zona
      };
      this.navParams.get('detallePicking')(this.vDetallePickingPage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePickingPage');
  }

  ionViewWillEnter(){
    this.getDetallePickingLoad();
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
