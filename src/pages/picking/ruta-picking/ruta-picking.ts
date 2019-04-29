import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, Navbar, NavController, NavParams, PopoverController, ModalController, ToastController, AlertController } from 'ionic-angular';
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
import { MainMenuPage } from '../../main-menu/main-menu'

import { PopoverPickingPage } from '../../picking/popover/popover-picking/popover-picking'

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


  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider, public modalCtrl: ModalController,
    public alertCtrl: AlertController) {
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

  goConsultarUbicacionPage() {
    this.navCtrl.push(ConsultarUbicacionPage);
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
    let popover = this.popoverCtrl.create(PopoverPickingPage, {'page' : 1});
    popover.present({
      ev: ev
    });

    popover.onDidDismiss(popoverData => {
      if (popoverData == 1) {
        this.showModalIncidencia(this.vPickingPage);
      } else if (popoverData == 2) {
        debugger;
        this.showModalAdministrarUaPage();
      } else if (popoverData == 3) {
        debugger;
        this.goConsultarUbicacionPage();
      } 
      // else if (popoverData == 4) {
      //   debugger;
      //   this.goMenu();
      // } 
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

  showModalIncidencia(data) {
    debugger;
    let obj = {
      'Id_Tx': data.Id_Tx,
      'FlagPausa' : data.FlagPausa,
      'NumOrden': data.NumOrden,
      'id_Cliente': data.Id_Cuenta,
      'id_Modulo': 5
    };

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });
    modalIncidencia.onDidDismiss(data => {
      debugger;
      console.log("datos", data);
    });
    modalIncidencia.present();
  }

   showModalAdministrarUaPage(){
    debugger;
    let obj = {
      'page': "modal",
    };
    let modalIncidencia = this.modalCtrl.create(AdministrarUaPage, { 'data': obj });
    modalIncidencia.onDidDismiss(data => {
      debugger;
        if(data.response == 200){
        this.navCtrl.pop();
      }
      console.log("datos", data);
    });
    modalIncidencia.present();
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
      'Zona': this.vPickingPage.Zona,
      'FlagPausa': this.vPickingPage.FlagPausa,
      'Id_Cuenta': this.vPickingPage.Id_Cuenta,
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
      'Id_Cuenta': this.vPickingPage.Id_Cuenta
    };
    this.navCtrl.push(PickingPorProductoPage, {
      data: this.vRutaPickingPage
    });
  }

  goMenu() {
    debugger;
    this.navCtrl.push(MainMenuPage);
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




