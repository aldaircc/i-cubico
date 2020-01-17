import { Component, DebugElement, ViewChild } from '@angular/core';
import { IonicPage, Navbar, Platform, ViewController, NavController, NavParams, AlertController, PopoverController, ModalController, ToastController } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_05Page } from '../embalaje-page-05/embalaje-page-05';
import { EmbalajePage_06Page } from '../embalaje-page-06/embalaje-page-06';
import { EmbalajePage_07Page } from '../embalaje-page-07/embalaje-page-07';
import { EmbalajePage_08Page } from '../embalaje-page-08/embalaje-page-08';
import { EmbalajePage_09Page } from '../embalaje-page-09/embalaje-page-09';
import { PopoverEmbalajeComponent } from '../../../components/popover-embalaje/popover-embalaje';
import { HomePage } from '../../home/home';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { ImpresoraPage } from '../../impresora/impresora';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { EmbalajePage_10Page } from '../embalaje-page-10/embalaje-page-10';
/**
 * Generated class for the EmbalajePage_04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-04',
  templateUrl: 'embalaje-page-04.html',
})
export class EmbalajePage_04Page {

  @ViewChild(Navbar) navBar: Navbar;

  vEmbalajePage03: any;
  vLisTransacEmbalaje: any;
  vListProductSelect: any;
  vListEmbalajeTemp: any = [];
  vEmbalajeTotalPage03: any;
  vNroBulto: any;
  vNomProducto: any;
  vNroItem: number;
  vNroItemVisual: number;
  vTotalItems: any;
  cantEmbalar: number;
  vNroBultoCeros: any;
  vEmbalajePage02: any;
  listDetEmbalaje: any;
  listAuxDetEmbalaje: any;
  listDetBultosEmbalaje: any;
  rowCount: any;
  rowReciboSelect: any;
  txtCant: any;
  vPage: any;

  listTransacDetEmbalaje: any;

  valorpopoverGlobal: boolean = false
  popoverGlobal: any;

  Backisenabled: boolean = false
  Nextisenabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
    public toastCtrl: ToastController, private alertCtrl: AlertController, public sEmbalaje: EmbalajeServiceProvider,
    public modalCtrl: ModalController, public viewCtrl: ViewController, private platform: Platform,
    public sGlobal: GlobalServiceProvider) {
    debugger;
    //this.vEmbalajePage03 = navParams.get('dataPageFiltro');
    this.vLisTransacEmbalaje = navParams.get('lstTransac');
    this.vEmbalajePage02 = navParams.get('dataPage02');
    //this.vEmbalajeTotalPage03 = navParams.get('dataTotalPage03');
    this.vNroBulto = this.vNroBultoCeros = navParams.get('nroBulto');
    //this.vNomProducto = navParams.get('nomProducto');
    //this.vTotalItems = this.vEmbalajeTotalPage03.length;
    this.vListProductSelect = navParams.get('lstProductSelect');

    this.vPage = navParams.get('page');
    this.vNroItemVisual = navParams.get('nroItemVisual');




    //     var objTemp = {      
    //       'CantXCaja': this.vEmbalajePage03[0].CantXCaja,
    //       'CantidadDespacho': this.vPage == 3 ? this.vEmbalajePage03[0].CantidadDespacho : this.vLisTransacEmbalaje.CantidadEmbalado,
    //       'CantidadOperacion': this.vPage == 3 ? this.vEmbalajePage03[0].CantidadOperacion : this.vLisTransacEmbalaje.CantidadPicking,
    //       'CantidadPedida': this.vEmbalajePage03[0].CantidadPedida,
    //       'Codigo': this.vPage == 3 ? this.vEmbalajePage03[0].Codigo : this.vLisTransacEmbalaje.Id_Producto,
    //       'EAN13': this.vEmbalajePage03[0].EAN13,
    //       'EAN14': this.vEmbalajePage03[0].EAN14,
    //       'FlagRevision': this.vEmbalajePage03[0].FlagRevision,
    //       'Id_Producto': this.vEmbalajePage03[0].Id_Producto,
    //       'Id_Tx': this.vEmbalajePage03[0].Id_Tx,
    //       'Id_UM': this.vEmbalajePage03[0].Id_UM,
    //       'Id_UMP': this.vEmbalajePage03[0].Id_UMP,
    //       'Item': this.vEmbalajePage03[0].Item,
    //       'ItemSAP': this.vEmbalajePage03[0].ItemSAP,
    //       'Lote': this.vPage == 3 ? this.vLisTransacEmbalaje[0].Lote : this.vLisTransacEmbalaje.Lote,
    //       'PosicionReferencia': this.vEmbalajePage03[0].PosicionReferencia,
    //       'Producto': this.vEmbalajePage03[0].Producto,
    //       'Saldo': this.vEmbalajePage03[0].Saldo,
    //       'SaldoDespacho': this.vEmbalajePage03[0].SaldoDespacho,
    //       'UM': this.vEmbalajePage03[0].UM,
    //       'UMP': this.vEmbalajePage03[0].UMP,
    //     };

    //     this.vListEmbalajeTemp.push(objTemp);
    // debugger;
    //     var cant = this.vListEmbalajeTemp.length;

    this.llenarNumeros();
  }

  filterItemsBultos(ev: any) {
    debugger;
    this.vEmbalajePage03 = this.vEmbalajeTotalPage03.filter((item) => {
      return (item.Item == ev);
    });
    debugger;
    return this.vEmbalajePage03;
    // debugger;
    // this.vListEmbalajeTemp = this.vEmbalajeTotalPage03.filter((item) => {
    //   return (item.Item == ev);
    // });
    // debugger;
    // return this.vListEmbalajeTemp;

    // this.vListEmbalajeTemp = this.vEmbalajeTotalPage03.filter((item) => {
    //   return (item.Item == numItem);
    // });
    // debugger;
    // return this.vListEmbalajeTemp;
  }

  goToAnterior() {
    debugger;
    if ((this.vNroItemVisual - 1) != 0) {
      this.filterItemsBultos(this.vNroItem - 1);
      this.vNroItem = (this.vNroItem - 1);
      this.vNroItemVisual = this.vNroItemVisual - 1;
      if (this.vNroItemVisual - 1 == 0) {
        this.Backisenabled = true;
      }
      if (this.vNroItemVisual != this.vEmbalajeTotalPage03.length) {
        this.Nextisenabled = false;
      }
    }
    this.sEmbalaje.ListarTransaccionDetEmbalaje(this.vEmbalajePage03[0].Id_Tx, this.vEmbalajePage03[0].Item).then((result) => {
      debugger;
      this.listTransacDetEmbalaje = result;
      debugger;
      if (this.listTransacDetEmbalaje.length > 0) {
        debugger;
        if (this.listTransacDetEmbalaje.length == 1) {
          debugger;
          //Mostrar el producto actual con el lote obtenido
          this.vListEmbalajeTemp = [];
          var objTemp = {
            'CantXCaja': this.vEmbalajePage03[0].CantXCaja,
            'CantidadDespacho': this.listTransacDetEmbalaje[0].CantidadEmbalado,
            'CantidadOperacion': this.listTransacDetEmbalaje[0].CantidadPicking,
            'CantidadPedida': this.vEmbalajePage03[0].CantidadPedida,
            'Codigo': this.vEmbalajePage03[0].Codigo,
            'EAN13': this.vEmbalajePage03[0].EAN13,
            'EAN14': this.vEmbalajePage03[0].EAN14,
            'FlagRevision': this.vEmbalajePage03[0].FlagRevision,
            'Id_Producto': this.vEmbalajePage03[0].Id_Producto,
            'Id_Tx': this.vEmbalajePage03[0].Id_Tx,
            'Id_UM': this.vEmbalajePage03[0].Id_UM,
            'Id_UMP': this.vEmbalajePage03[0].Id_UMP,
            'Item': this.vEmbalajePage03[0].Item,
            'ItemSAP': this.vEmbalajePage03[0].ItemSAP,
            'Lote': this.listTransacDetEmbalaje[0].Lote,
            'PosicionReferencia': this.vEmbalajePage03[0].PosicionReferencia,
            'Producto': this.vEmbalajePage03[0].Producto,
            'Saldo': this.listTransacDetEmbalaje[0].CantidadPicking - this.listTransacDetEmbalaje[0].CantidadEmbalado,
            'SaldoDespacho': this.vEmbalajePage03[0].SaldoDespacho,
            'UM': this.vEmbalajePage03[0].UM,
            'UMP': this.vEmbalajePage03[0].UMP,
          };
          debugger;
          this.vListEmbalajeTemp.push(objTemp);
        } else {
          //Ir a la pantalla lote x producto para seleccionar 1
          this.validacionNroBulto();
          this.navCtrl.push(EmbalajePage_10Page, {
            nroBulto: this.vNroBulto,
            listTransacDetEmbalaje: this.listTransacDetEmbalaje,
            dataPage02: this.vEmbalajePage02,
            nroItemVisual: this.vNroItemVisual
            , descProducto: this.vEmbalajePage03[0].Producto
          });

        }
      } else {
        //Si no trae resultado ir al siguiente
        if (this.vNroItemVisual - 1 == 0) {
          alert("No se encontraron registros");
          this.goToSiguiente();
          this.Backisenabled = true;
        } else {
          this.goToAnterior();
        }
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });

  }

  goToSiguiente() {
    //Consultar embalaje y su es mas de 1 Ir a la pantalla Lote x Producto       
    if (this.vNroItemVisual != this.vEmbalajeTotalPage03.length) {
      this.filterItemsBultos(this.vNroItem + 1);
      this.vNroItem = (this.vNroItem + 1);
      this.vNroItemVisual = (this.vNroItemVisual + 1)
      if (this.vNroItemVisual - 1 != 0) {
        this.Backisenabled = false;
      }
      if (this.vNroItemVisual == this.vEmbalajeTotalPage03.length) {
        this.Nextisenabled = true;
      }
    }
    debugger;
    //this.vListEmbalajeTemp;

    this.sEmbalaje.ListarTransaccionDetEmbalaje(this.vEmbalajePage03[0].Id_Tx, this.vEmbalajePage03[0].Item).then((result) => {
      debugger;
      this.listTransacDetEmbalaje = result;
      debugger;
      if (this.listTransacDetEmbalaje.length > 0) {
        debugger;
        if (this.listTransacDetEmbalaje.length == 1) {
          debugger;
          //Mostrar el producto actual con el lote obtenido
          this.vListEmbalajeTemp = [];
          var objTemp = {
            'CantXCaja': this.vEmbalajePage03[0].CantXCaja,
            'CantidadDespacho': this.listTransacDetEmbalaje[0].CantidadEmbalado,
            'CantidadOperacion': this.listTransacDetEmbalaje[0].CantidadPicking,
            'CantidadPedida': this.vEmbalajePage03[0].CantidadPedida,
            'Codigo': this.vEmbalajePage03[0].Codigo,
            'EAN13': this.vEmbalajePage03[0].EAN13,
            'EAN14': this.vEmbalajePage03[0].EAN14,
            'FlagRevision': this.vEmbalajePage03[0].FlagRevision,
            'Id_Producto': this.vEmbalajePage03[0].Id_Producto,
            'Id_Tx': this.vEmbalajePage03[0].Id_Tx,
            'Id_UM': this.vEmbalajePage03[0].Id_UM,
            'Id_UMP': this.vEmbalajePage03[0].Id_UMP,
            'Item': this.vEmbalajePage03[0].Item,
            'ItemSAP': this.vEmbalajePage03[0].ItemSAP,
            'Lote': this.listTransacDetEmbalaje[0].Lote,
            'PosicionReferencia': this.vEmbalajePage03[0].PosicionReferencia,
            'Producto': this.vEmbalajePage03[0].Producto,
            'Saldo': this.listTransacDetEmbalaje[0].CantidadPicking - this.listTransacDetEmbalaje[0].CantidadEmbalado,
            'SaldoDespacho': this.vEmbalajePage03[0].SaldoDespacho,
            'UM': this.vEmbalajePage03[0].UM,
            'UMP': this.vEmbalajePage03[0].UMP,
          };
          debugger;
          this.vListEmbalajeTemp.push(objTemp);
        } else {
          //Ir a la pantalla lote x producto para seleccionar 1
          this.validacionNroBulto();
          this.navCtrl.push(EmbalajePage_10Page, {
            //listDetEmbalajeTop1: this.filterItemsBultos(1),
            //listAuxDetEmbalaje: this.listAuxDetEmbalaje,
            nroBulto: this.vNroBulto,
            listTransacDetEmbalaje: this.listTransacDetEmbalaje,
            dataPage02: this.vEmbalajePage02,
            nroItemVisual: this.vNroItemVisual
            , descProducto: this.vEmbalajePage03[0].Producto
          });
        }
      } else {
        //Si no trae resultado ir al siguiente
        if (this.vNroItemVisual == this.vEmbalajeTotalPage03.length) {
          alert("No se encontraron registros");
          this.goToAnterior();
          this.Nextisenabled = true;
        } else {
          this.goToSiguiente();
        }
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  validacionNroBulto() {
    debugger;
    if (this.listDetBultosEmbalaje.length > 0)
      this.vNroBulto = this.listDetBultosEmbalaje[this.listDetBultosEmbalaje.length - 1].NroBulto
    else
      this.vNroBulto = 0
  }

  goToEmbalajePage05() {
    this.navCtrl.push(EmbalajePage_05Page, {
      dataPageFiltro: this.vEmbalajePage03,
      dataNroBultoCeros: this.vNroBultoCeros,
      dataTotalPage03: this.vEmbalajeTotalPage03,
      dataNroBulto: this.vNroBulto,
      dataPage02: this.vEmbalajePage02
    });
  }

  goToEmbalajePage09() {
    this.navCtrl.push(EmbalajePage_09Page, {
      dataPageFiltro: this.vEmbalajePage03,
      dataNroBultoCeros: this.vNroBultoCeros,
      dataTotalPage03: this.vEmbalajeTotalPage03,
      dataNroBulto: this.vNroBulto,
      dataNroBulto2: this.vNroBulto,
      dataPage02: this.vEmbalajePage02,
      flagTodoItems: true
    });
  }

  goToEmbalajePage08() {
    this.navCtrl.push(EmbalajePage_08Page, {
      dataPage02: this.vEmbalajePage02,
      totalBultos: this.rowCount
    });
  }

  goToEmbalajePage07() {
    this.navCtrl.push(EmbalajePage_07Page, {
      dataNroBulto: this.vNroBulto,
      dataNroBultoCeros: this.vNroBultoCeros,
      dataPage02: this.vEmbalajePage02
    });
  }

  goToEmbalajePage06() {
    debugger;
    this.navCtrl.push(EmbalajePage_06Page, {
      dataNroBulto: this.vNroBulto,
      dataNroBultoCeros: this.vNroBultoCeros,
      dataPage02: this.vEmbalajePage02,
    });
  }


  llenarNumeros2() {
    debugger;
    if(this.vNroBulto==0){
      this.vNroBulto = this.vNroBulto + 1;
      this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
      let s = this.vNroBultoCeros + "";
      while (s.length < 3)
        this.vNroBultoCeros = s = "0" + s;
      return this.vNroBultoCeros;
    }else{
      debugger;
      this.vNroBulto = this.vNroBulto + 1;
      this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
      let s = this.vNroBultoCeros + "";
      while (s.length < 3)
        this.vNroBultoCeros = s = "0" + s;
      return this.vNroBultoCeros;
    }    
  }

  llenarNumeros() {
    debugger;
    if(this.vNroBulto==0){
      this.vNroBulto = this.vNroBulto + 1;
      this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
      let s = this.vNroBultoCeros + "";
      while (s.length < 3)
        this.vNroBultoCeros = s = "0" + s;
      return this.vNroBultoCeros;
    }else{      
      //this.vNroBulto = this.vNroBulto + 1;
      //this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
      let s = this.vNroBultoCeros + "";
      while (s.length < 3)
        this.vNroBultoCeros = s = "0" + s;
      return this.vNroBultoCeros;
    }    
  }

  mostrarConfirmacion(title, message) {
    let alertConfirmacion = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });
    alertConfirmacion.present();
  }


  getDataDetEmbalaje() {
    this.ListarDespachoDetalle(this.vEmbalajePage02.Id_Tx);
  }

  getDataDetEmbalajeUpdate(strId_Tx, numeroItem, loteActual) {
    debugger;
    this.sEmbalaje.ListarDespachoDetalle(strId_Tx).then((result) => {
      this.listDetEmbalaje = result;
      this.vEmbalajeTotalPage03 = this.listAuxDetEmbalaje = this.listDetEmbalaje;
      debugger;
      this.vTotalItems = this.rowCount = this.listAuxDetEmbalaje.length;

      if (this.vNroItemVisual == this.vTotalItems) {
        this.Nextisenabled = true;
      }
      if (this.vNroItemVisual - 1 == 0) {
        this.Backisenabled = true;
      }
      this.filterItemsBultos(numeroItem);
      if (this.listDetEmbalaje.length > 0) {
        this.sEmbalaje.ListarTransaccionDetEmbalaje(strId_Tx, numeroItem).then((result) => {
          debugger;
          this.listTransacDetEmbalaje = result;
          debugger;
          //Recorrer la lista transac y obtener las cantidades actualizadas
          var CantidadEmbaladoActualizado, CantidadPickingActualizado
          for(var i = 0; i < this.listTransacDetEmbalaje.length; i++){
            if(loteActual == this.listTransacDetEmbalaje[i].Lote){
              CantidadEmbaladoActualizado = this.listTransacDetEmbalaje[i].CantidadEmbalado;
              CantidadPickingActualizado = this.listTransacDetEmbalaje[i].CantidadPicking;
            }
          }
          //Mostrar el producto actual con el lote obtenido
          debugger;
          this.vListEmbalajeTemp = [];
          var objTemp = {
            'CantXCaja': this.vEmbalajePage03[0].CantXCaja,
            'CantidadDespacho': CantidadEmbaladoActualizado,
            'CantidadOperacion': CantidadPickingActualizado,
            'CantidadPedida': this.vEmbalajePage03[0].CantidadPedida,
            'Codigo': this.vEmbalajePage03[0].Codigo,
            'EAN13': this.vEmbalajePage03[0].EAN13,
            'EAN14': this.vEmbalajePage03[0].EAN14,
            'FlagRevision': this.vEmbalajePage03[0].FlagRevision,
            'Id_Producto': this.vEmbalajePage03[0].Id_Producto,
            'Id_Tx': this.vEmbalajePage03[0].Id_Tx,
            'Id_UM': this.vEmbalajePage03[0].Id_UM,
            'Id_UMP': this.vEmbalajePage03[0].Id_UMP,
            'Item': this.vEmbalajePage03[0].Item,
            'ItemSAP': this.vEmbalajePage03[0].ItemSAP,
            'Lote': loteActual,
            'PosicionReferencia': this.vEmbalajePage03[0].PosicionReferencia,
            'Producto': this.vEmbalajePage03[0].Producto,
            'Saldo': CantidadPickingActualizado - CantidadEmbaladoActualizado,
            'SaldoDespacho': this.vEmbalajePage03[0].SaldoDespacho,
            'UM': this.vEmbalajePage03[0].UM,
            'UMP': this.vEmbalajePage03[0].UMP,
          };

          this.vListEmbalajeTemp.push(objTemp);
          debugger;
          var cant = this.vListEmbalajeTemp.length;
        }, (err) => {
          console.log('E-Embalaje listar', err);
        });
      } else {
        alert('No se encontraron datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  ListarDespachoDetalle(strId_Tx) {
    debugger;
    //Preguntar de que pantalla viene para saber que IdTX consultar de la 3 o la 10 (Probar)
    if (this.vPage == 10) { //Si es la 3 consulta el Tx de pantalla 2, si es la 10 el Tx de la pantalla 10 (Probar)
      strId_Tx = this.vLisTransacEmbalaje.Id_Tx
      this.vNroItem = this.vLisTransacEmbalaje.Item
    }

    this.sEmbalaje.ListarDespachoDetalle(strId_Tx).then((result) => {
      this.listDetEmbalaje = result;
      this.vEmbalajeTotalPage03 = this.listAuxDetEmbalaje = this.listDetEmbalaje;
      debugger;
      this.vTotalItems = this.rowCount = this.listAuxDetEmbalaje.length;

      if (this.vNroItemVisual == this.vTotalItems) {
        this.Nextisenabled = true;
      }
      if (this.vNroItemVisual - 1 == 0) {
        this.Backisenabled = true;
      }
      if (this.vPage == 3) {
        this.vNroItem = this.vListProductSelect.Item
      }
      //Y lo mismo con el Item para que pueda hacer el filterItemsButtons (Probar)
      this.filterItemsBultos(this.vNroItem);
      if (this.listDetEmbalaje.length > 0) {
        debugger;
        this.vListEmbalajeTemp = [];
        var objTemp = {
          'CantXCaja': this.vEmbalajePage03[0].CantXCaja,
          'CantidadDespacho': this.vPage == 3 ? this.vEmbalajePage03[0].CantidadDespacho : this.vLisTransacEmbalaje.CantidadEmbalado,
          'CantidadOperacion': this.vPage == 3 ? this.vEmbalajePage03[0].CantidadOperacion : this.vLisTransacEmbalaje.CantidadPicking,
          'CantidadPedida': this.vEmbalajePage03[0].CantidadPedida,
          'Codigo': this.vEmbalajePage03[0].Codigo,
          'EAN13': this.vEmbalajePage03[0].EAN13,
          'EAN14': this.vEmbalajePage03[0].EAN14,
          'FlagRevision': this.vEmbalajePage03[0].FlagRevision,
          'Id_Producto': this.vEmbalajePage03[0].Id_Producto,
          'Id_Tx': this.vEmbalajePage03[0].Id_Tx,
          'Id_UM': this.vEmbalajePage03[0].Id_UM,
          'Id_UMP': this.vEmbalajePage03[0].Id_UMP,
          'Item': this.vEmbalajePage03[0].Item,
          'ItemSAP': this.vEmbalajePage03[0].ItemSAP,
          'Lote': this.vPage == 3 ? this.vLisTransacEmbalaje[0].Lote : this.vLisTransacEmbalaje.Lote,
          'PosicionReferencia': this.vEmbalajePage03[0].PosicionReferencia,
          'Producto': this.vEmbalajePage03[0].Producto,
          'Saldo': this.vPage == 3 ? this.vEmbalajePage03[0].Saldo : this.vLisTransacEmbalaje.CantidadPicking - this.vLisTransacEmbalaje.CantidadEmbalado,
          'SaldoDespacho': this.vEmbalajePage03[0].SaldoDespacho,
          'UM': this.vEmbalajePage03[0].UM,
          'UMP': this.vEmbalajePage03[0].UMP,
        };

        this.vListEmbalajeTemp.push(objTemp);
        debugger;
        var cant = this.vListEmbalajeTemp.length;

      } else {
        alert('No se encontraron datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  getDataDetBultosEmbalaje() {
    this.ListarBultosDespacho(this.vEmbalajePage02.Id_Tx);
  }

  ListarBultosDespacho(strId_Tx) {
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {
      debugger;
      this.listDetBultosEmbalaje = result;
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  getRegistrarIncidencia(obj): void {
    this.rowReciboSelect = obj;
    this.showToast('Recibo: ' + obj.Id_Tx + ' seleccionado', 2000, 'bottom', true, 'x', true);
  }

  showToast(message, duration, position, showClose, closeText, dismissChange) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showClose,
      closeButtonText: closeText,
      dismissOnPageChange: dismissChange
    });

    toast.present();
  }

  guardarProductoBulto() {
    debugger;
    if (this.cantEmbalar == undefined || this.cantEmbalar == 0) {
      this.mostrarConfirmacion("Advertencia", "Debe ingresar una cantidad a embalar");
      return;
    }

    if (this.cantEmbalar > this.vListEmbalajeTemp[0].CantidadPedida) {
      this.mostrarConfirmacion("Advertencia", "La cantidad a embalar es mayor a la cantidad pedida");
      return;
    }

    if (this.cantEmbalar > this.vListEmbalajeTemp[0].Saldo) {
      this.mostrarConfirmacion("Advertencia", "La cantidad a embalar es mayor al saldo");
      return;
    }

    var objEmbalaje = {
      'Id_Tx': this.vListEmbalajeTemp[0].Id_Tx,
      'NroBulto': this.vNroBulto,
      'Id_Producto': this.vListEmbalajeTemp[0].Id_Producto,
      'Id_UM': this.vListEmbalajeTemp[0].Id_UM,
      'Cantidad': this.cantEmbalar,
      'Anulado': 0,
      'Id_RF': this.sGlobal.Id_TerminalRF,
      'Item': this.vListEmbalajeTemp[0].Item,
      'Id_Almacen': this.sGlobal.Id_Almacen,
      'UsuarioRegistro': this.sGlobal.userName,
      'Id_UMP': 0,
      'Lote': this.vListEmbalajeTemp[0].Lote
    };

    this.sEmbalaje.RegistrarProductoBulto(objEmbalaje).then((result) => {
      console.log(result);
      debugger;
      //this.getDataDetEmbalaje();
      this.getDataDetEmbalajeUpdate(this.vListEmbalajeTemp[0].Id_Tx, this.vListEmbalajeTemp[0].Item, this.vListEmbalajeTemp[0].Lote);

      this.cantEmbalar = 0.00;
      var respuesta: any = result;
      if (respuesta.errNumber == -1)
        this.mostrarConfirmacion("Advetencia", respuesta.message);
      // else{
      //   this.goToSiguiente();
      // }

    });
  }

  showModalIncidencia(data) {
    let obj = {
      'Id_Tx': data.Id_Tx,
      'FlagPausa': data.FlagPausa,
      'Cliente': data.Cliente,
      'Id_Cliente': data.Id_Cliente,
      'Proveedor': data.Proveedor,
      'Id_TipoMovimiento': data.Id_TipoMovimiento,
      'Origen': 'RP01',
      'id_Modulo': 1
    };

    this.sGlobal.resultIncidencia = false;
    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });
    modalIncidencia.onDidDismiss(result => {
      if (this.sGlobal.resultIncidencia) {
        this.goToEmbalajePage02();
      }
    });
    modalIncidencia.present();
  }

  goToEmbalajePage02() {
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'EmbalajePage_02Page') {
        this.navCtrl.popTo(item);
      }
    });
  }

  CantChange(ev: any) {
    if (!((ev.keyCode > 95 && ev.keyCode < 106)
      || (ev.keyCode > 47 && ev.keyCode < 58)
      || ev.keyCode == 8)) {
      return true;
    }
  }

  presentPopover(myEvent) {
    this.valorpopoverGlobal = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverEmbalajeComponent, { 'page': 15 });
    this.popoverGlobal.present({
      ev: myEvent
    });

    this.popoverGlobal.onDidDismiss(popoverData => {
      debugger;
      this.valorpopoverGlobal = false;
      if (popoverData == 1) {
        this.showModalIncidencia(this.vEmbalajePage02);
      }
      if (popoverData == 4) {
        this.showModalImpresora();
      } else if (popoverData == 5) {
        this.goBackLoginPage();
      }
    });
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  goBackLoginPage(): void {
    this.navCtrl.push(HomePage);
  }

  ionViewWillEnter() {
    this.getDataDetEmbalaje();
    this.getDataDetBultosEmbalaje();
    debugger;
    if (this.sGlobal.resultGrabarBulto) {
      this.llenarNumeros2();      
      this.sGlobal.resultGrabarBulto = false;
    }

    this.platform.registerBackButtonAction(() => {
      debugger;
      if (this.valorpopoverGlobal) {
        this.valorpopoverGlobal = false;
        this.popoverGlobal.dismiss();
      } else {
        //this.navCtrl.pop();
        this.navCtrl.getViews().forEach(item => {
          if (item.name == 'EmbalajePage_03Page') {
            this.navCtrl.popTo(item);
          }
        });
      }
    });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.getViews().forEach(item => {
        if (item.name == 'EmbalajePage_03Page') {
          this.navCtrl.popTo(item);
        }
      });
    }
  }
}