import { Component, ViewChild, ElementRef } from '@angular/core';
import { PickingServiceProvider } from '../../providers/picking-service/picking-service';
import { IonicPage, App, Navbar, NavController, NavParams, ModalController, PopoverController, ToastController } from 'ionic-angular';
import { RutaPickingPage } from '../picking/ruta-picking/ruta-picking'
import { IncidenciaPage } from '../incidencia/incidencia';
import { PopoverPickingPage } from '../picking/popover/popover-picking/popover-picking'
import { DetallePickingPage } from '../picking/detalle-picking/detalle-picking'
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { MainMenuPage } from '../main-menu/main-menu';
import { AdministrarUaPage } from '../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { HomePage } from '../home/home';

/**
 * Generated class for the PickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picking',
  templateUrl: 'picking.html'
})

export class PickingPage {

  searchQuery: string = '';
  listOrdenesPicking: any;
  //listAuxOrdenesPicking: any;
  userDetail: any;
  nomAlmacen: any;
  rowCount: any;
  vPickingPage: any;

  listAuxOrdenesPicking: any = [];
  listaTempRutaPicking: any = [];
  listDetalleSinTrabajar: any = [];
  listDetalleProceso: any = [];
  rowCountSinTrabajar: any;
  rowCountProceso: any;

  rowPickingSelect: any;

  // @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  // @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public modalCtrl: ModalController, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider) {
    const data = JSON.parse(localStorage.getItem('vUserData'));
    this.userDetail = this.sGlobal.apeNom;
    this.nomAlmacen = this.sGlobal.nombreAlmacen;
    this.getDataOrdenes();
  }

  filterItems(ev: any) {
    debugger;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.listAuxOrdenesPicking = this.listOrdenesPicking.filter((item) => {
        return (item.NumOrden.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxOrdenesPicking.length;
      if (this.rowCount > 0) {
        this.listDetalleSinTrabajar = this.listAuxOrdenesPicking.filter((item) => {
          return (item.Id_Estado == 2);
        });
        this.listDetalleProceso = this.listAuxOrdenesPicking.filter((item) => {
          return (item.Id_Estado == 3);
        });
        this.rowCountSinTrabajar = this.listDetalleSinTrabajar.length;
        this.rowCountProceso = this.listDetalleProceso.length;
      } else {
        this.rowCountSinTrabajar = this.rowCount;
        this.rowCountProceso = this.rowCount;
      }
    } else {
      this.rowCount = this.listOrdenesPicking.length;

      this.listDetalleSinTrabajar = this.listOrdenesPicking.filter((item) => {
        return (item.Id_Estado == 2);
      });
      this.listDetalleProceso = this.listOrdenesPicking.filter((item) => {
        return (item.Id_Estado == 3);
      });

      this.rowCountSinTrabajar = this.listDetalleSinTrabajar.length;
      this.rowCountProceso = this.listDetalleProceso.length;



      return this.listAuxOrdenesPicking = this.listOrdenesPicking;
    }
  }

  ValidarOrden(data) {
    debugger;
    if (data.FlagPausa == true) {
      this.showModalIncidencia(data);
    } else {
      this.getDataRutaPicking(data.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen, data)
    }
  }


  habilitaIncidencia(obj):void{
    this.rowPickingSelect = obj;
    this.presentToast('Se habilito la opción Registrar incidencias');
  }

  getDataOrdenes() {
    // this.getOrdenesXUsuario(this.userDetail[0].Usuario, 2);
    this.searchQuery = "";
    this.getOrdenesXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  getOrdenesXUsuario(strUsuario, intIdAlmacen) {
    debugger;
    this.sPicking.getOrdenesXUsuario(strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.listAuxOrdenesPicking = [];
      this.listDetalleSinTrabajar = [];
      this.listDetalleProceso = [];

      this.listOrdenesPicking = result;
      //this.listAuxOrdenesPicking = this.listOrdenesPicking;

      for (var i = 0; i < this.listOrdenesPicking.length; i++) {
        var obj = {
          'Ciudad': result[i].Ciudad,
          'Cliente': result[i].Cliente,
          'Cuenta': result[i].Cuenta,
          'Estado': result[i].Estado,
          'FechaDocumento': result[i].FechaDocumento,
          'FechaLlegada': result[i].FechaLlegada,
          'FlagPausa': result[i].FlagPausa,
          'Id_ClienteLab': result[i].Id_ClienteLab,
          'Id_Cuenta': result[i].Id_Cuenta,
          'Id_Estado': result[i].Id_Estado,
          'Id_TipoDocumento': result[i].Id_TipoDocumento,
          'Id_TipoMovimiento': result[i].Id_TipoMovimiento,
          'Id_Tx': result[i].Id_Tx,
          'ModeloPicking': result[i].ModeloPicking,
          'MovimientoPicking': result[i].MovimientoPicking,
          'NumOrden': result[i].NumOrden,
          'Observacion': result[i].Observacion,
          'TipoDocumento': result[i].TipoDocumento,
          'TipoMovimiento': result[i].TipoMovimiento,
          'Zona': result[i].Zona
        };
        this.listAuxOrdenesPicking.push(obj);
        //this.idRutaPicking = this.idRutaPicking + 1;

        if (result[i].Id_Estado == 2) {
          this.listDetalleSinTrabajar.push(obj);
        }
        if (result[i].Id_Estado == 3) {
          this.listDetalleProceso.push(obj);
        }
      }

      this.rowCount = this.listAuxOrdenesPicking.length;
      this.rowCountSinTrabajar = this.listDetalleSinTrabajar.length;
      this.rowCountProceso = this.listDetalleProceso.length;

      if (this.listOrdenesPicking.length > 0) {
        console.log('Datos ordenes picking', this.listOrdenesPicking);
      } else {
        this.presentToast('No tiene ordenes asignadas.');
      }
    }, (err) => {
      console.log('E-Ordenes Picking listar', err);
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
            // this.presentToast("No existe ruta para este producto");
            // this.goDetallePickingPage(data);
            //return;
            if (i == this.listaTempRutaPicking.length - 1) {
              this.presentToast("No existe ruta para este producto");
              this.goDetallePickingPage(data);
              return;
            }
          }
        }
        if (i == this.listaTempRutaPicking.length - 1) {
          this.presentToast("No existe ruta para este producto");
          this.goDetallePickingPage(data);
          return;
        }
      }
    }, err => {
      console.log('E-getDataRutaPicking', err);
    });
  }

  goRutaPickingPage(data) {
    this.vPickingPage = {
      'Id_Page_Anterior': 1,
      'Id_Tx': data.Id_Tx,
      'NumOrden': data.NumOrden,
      'Cliente': data.Cliente,
      'Id_Cuenta': data.Id_Cuenta,
      'Ciudad': data.Ciudad,
      'Zona': data.Zona,
      'FlagPausa': data.FlagPausa
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vPickingPage
    });
  }

  goDetallePickingPage(data) {
    debugger;
    this.vPickingPage = {
      'Id_Page_Anterior': 1,
      'Id_Tx': data.Id_Tx,
      'NumOrden': data.NumOrden,
      'Id_Cuenta': data.Id_Cuenta,
      'Cliente': data.Cliente,
      'FlagPausa': data.FlagPausa
    };
    this.navCtrl.push(DetallePickingPage, {
      data: this.vPickingPage
    });
  }

  goMenu() {
    debugger;
    this.navCtrl.push(MainMenuPage);
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

  goConsultarUbicacionPage() {
    this.navCtrl.push(ConsultarUbicacionPage);
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

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  presentPopover(ev) {
    // let popover = this.popoverCtrl.create(PopoverPickingPage, {
    //   // contentEle: this.content.nativeElement,
    //   // textEle: this.text.nativeElement
    // });
    // popover.present({
    //   ev: ev
    // });

    let popover = this.popoverCtrl.create(PopoverPickingPage, {'page' : 0, 'has_Id_Tx': (this.rowPickingSelect != undefined) ? true : false });
    popover.present({
      ev: ev
    });

    popover.onDidDismiss(popoverData => {
      if (popoverData == 1) {
        this.showModalIncidencia(this.rowPickingSelect);
      } else if (popoverData == 2) {
        debugger;
        this.showModalAdministrarUaPage();
      } else if (popoverData == 3) {
        debugger;
        this.goConsultarUbicacionPage();
      } else if (popoverData == 4) {
        debugger;
        this.goMenu();
      }else if (popoverData == 5) {
        debugger;
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      // todo something
      this.navCtrl.push(MainMenuPage);
    }
    console.log('ionViewDidLoad PickingPage');
  }
}
