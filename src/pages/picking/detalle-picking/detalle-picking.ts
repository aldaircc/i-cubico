import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, PopoverController, ToastController, AlertController } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { RutaPickingPage } from '../ruta-picking/ruta-picking';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
import { DetallePorProductoPage } from '../detalle-por-producto/detalle-por-producto'
import { PickingPage } from '../../picking/picking';
import { PickingPorProductoPage } from '../picking-por-producto/picking-por-producto';

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider, public alertCtrl: AlertController) {
    this.vRutaPickingPage = navParams.get('data');
    this.getDetallePickingLoad();
    //this.getDetallePicking(this.vRutaPickingPage.Id_Tx, 'Admin', 2);
  }

  filterItems(ev: any) {
    debugger;
    const val = ev.target.value;
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
          return (item.Saldo == 0);
        });
        this.listDetalleFinalizado = this.listAuxDetallePicking.filter((item) => {
          return (item.CantidadPedida - item.Saldo > 0);
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
        return (item.Saldo == 0);
      });
      this.listDetalleFinalizado = this.listDetallePicking.filter((item) => {
        return (item.CantidadPedida - item.Saldo > 0);
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
      //Ir a ruta picking y ubicarse en el producto seleccionado, enviar idRuta 
      //this.goRutaPickingPage(data)
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
      //this.listAuxDetallePicking = this.listDetallePicking;


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
      console.log('E-Detalle Picking listar', err);
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
              //this.presentToast("No existe ruta para este producto");
              //this.goDetallePickingPage(data);
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
          //this.presentToast("No existe ruta para este producto");
          //this.goDetallePickingPage(data);
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
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
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
      'Zona': this.vRutaPickingPage.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vDetallePickingPage
    });
  }

  goBackRutaPickingPage(idRutaPicking) {
    this.vDetallePickingPage = {
      'Id_Page_Anterior': 3,
      'idRutaPicking': idRutaPicking,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vDetallePickingPage
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
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'Saldo': saldoTotalPicking
    };
    this.navCtrl.push(CierrePickingPage, {
      data: this.vDetallePickingPage
    });
  }

  goDetallePorProductoPage(data): void {
    debugger;
        
    var idPageAnterior2 = 0;
    if(this.vRutaPickingPage.Id_Page_Anterior){
      idPageAnterior2 = this.vRutaPickingPage.Id_Page_Anterior;
    }else{
      idPageAnterior2 = this.vRutaPickingPage.Id_Page_Anterior2;
    }

    this.vDetallePickingPage = {
      'Id_Page_Anterior': 3,
      'Id_Page_Anterior2': idPageAnterior2,
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
    };

    this.navCtrl.push(DetallePorProductoPage, {
      data: this.vDetallePickingPage
    });
    //this.navCtrl.push(DetallePorProductoPage);
  }

  goPickingPage() {
    this.navCtrl.push(PickingPage);
  }

  goPickingPorProductoPage() {
    debugger;
    this.vDetallePickingPage = {
      'Id_Page_Anterior': 3,
      'idRutaPicking': this.vRutaPickingPage.idRutaPicking,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };
    this.navCtrl.push(PickingPorProductoPage, {
      data: this.vDetallePickingPage
    });
  }



  ionViewDidLoad() {
    debugger;
    this.navBar.backButtonClick = (e: UIEvent) => {
      if (this.vRutaPickingPage.Id_Page_Anterior == 1) {
        this.goPickingPage(); //ir a ordenes picking
      }
      if (this.vRutaPickingPage.Id_Page_Anterior == 2) {
        this.goBackRutaPickingPage(0); //ir a ruta picking
      }
      if (this.vRutaPickingPage.Id_Page_Anterior == 5) {
        this.goPickingPorProductoPage(); //ir a picking por producto
      }
      if (this.vRutaPickingPage.Id_Page_Anterior2 == 1) {
        this.goPickingPage(); //ir a ordenes picking
      }
      if (this.vRutaPickingPage.Id_Page_Anterior2 == 2) {
        this.goBackRutaPickingPage(0); //ir a ruta picking
      }
      if (this.vRutaPickingPage.Id_Page_Anterior2 == 5) {
        this.goPickingPorProductoPage(); //ir a ruta picking
      }

    }


    console.log('ionViewDidLoad DetallePickingPage');
  }

}
