import { Component, ViewChild } from '@angular/core';

import { IonicPage, Navbar, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { DetallePickingPage } from '../detalle-picking/detalle-picking';
import { PickingPorProductoPage } from '../picking-por-producto/picking-por-producto';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PickingPage } from '../../picking/picking';

// import { Keyboard } from '@ionic-native/keyboard';

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider) {
    this.vPickingPage = navParams.get('data');
    this.getDataRutaPicking(this.vPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        //this.codBar = this.rutaPicking.Fila.trim() + this.rutaPicking.Columna.toString() + this.rutaPicking.Nivel.toString() + this.rutaPicking.Posicion.toString();
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

  getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen) {
    this.sPicking.getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
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
        this.listaRutaPicking.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }
      //Agregar columna idRuta, para que se pueda usar al momento de volver de detalle
      //comparar idRuta para actualizar la posicion de la lista
      for (var i = 0; i < this.listaRutaPicking.length; i++) {
        if (result[i].Saldo > 0) {
          if (result[i].FlagTransito == false) {
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
            //this.rutaPicking = result[0];
            //this.contador = 1;
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

  NextRutaPicking() {
    debugger;
    this.total = this.listaRutaPicking.length;
    this.posicion = this.posicion + 1;
    if (this.posicion < this.listaRutaPicking.length) {
      this.contador = this.contador + 1;
      this.rutaPicking = this.listaRutaPicking[this.posicion];
      this.Backisenabled = true;
    }
    if (this.contador == this.listaRutaPicking.length) {
      this.Nextisenabled = true;
    }
    this.codeBar = "";
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));
  }

  BackRutaPicking() {
    debugger;
    this.total = this.listaRutaPicking.length;
    this.posicion = this.posicion - 1;
    if (this.posicion >= 0) {
      this.contador = this.contador - 1;
      this.rutaPicking = this.listaRutaPicking[this.posicion];
      this.Nextisenabled = false;
    }
    if (this.contador == 1) {
      this.Backisenabled = false;
    }
    this.codeBar = "";
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));
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

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  goPickingPage() {
    this.navCtrl.push(PickingPage);
  }

  goDetallePickingPage() {
    debugger;
    this.vRutaPickingPage = {
      'Id_Page_Anterior': 2,
      'Id_Tx': this.vPickingPage.Id_Tx,
      'NumOrden': this.vPickingPage.NumOrden,
      'Cliente': this.vPickingPage.Cliente,
      'Ciudad': this.vPickingPage.Ciudad,
      'Zona': this.vPickingPage.Zona
    };
    this.navCtrl.push(DetallePickingPage, {
      data: this.vRutaPickingPage
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
      'Ciudad': this.vPickingPage.Ciudad,
      'Zona': this.vPickingPage.Zona,
      'Saldo': saldoTotal
    };
    this.navCtrl.push(CierrePickingPage, {
      data: this.vRutaPickingPage
    });
  }

  goPickingPorProductoPage() {
    debugger;
    this.vRutaPickingPage = {
      'idRutaPicking': this.listaRutaPicking[this.posicion].idRutaPicking,
      'Id_Tx': this.vPickingPage.Id_Tx,
      'NumOrden': this.vPickingPage.NumOrden,
      'Cliente': this.vPickingPage.Cliente,
      'Ciudad': this.vPickingPage.Ciudad,
      'Zona': this.vPickingPage.Zona
    };
    this.navCtrl.push(PickingPorProductoPage, {
      data: this.vRutaPickingPage
    });
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.goPickingPage();
    }

    console.log('ionViewDidLoad RutaPickingPage');
  }

}




