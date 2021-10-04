import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, Navbar, NavParams, ModalController, PopoverController, App, ToastController, AlertController, ViewController } from 'ionic-angular';
import { ReciboServiceProvider } from '../../providers/recibo-service/recibo-service';
import { ReciboPage_02Page } from './recibo-page-02/recibo-page-02';
import { IncidenciaPage } from '../incidencia/incidencia';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { PopoverReciboComponent } from '../../components/popover-recibo/popover-recibo';
import { ImpresoraPage } from '../impresora/impresora';
import { HomePage } from '../home/home';
import { MainMenuPage } from '../main-menu/main-menu'


/**
 * Generated class for the ReciboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo',
  templateUrl: 'recibo.html',
})
export class ReciboPage {
  searchQuery: string = '';
  @ViewChild(Navbar) navBar: Navbar;
  userDetail: any;
  listAuxRecepcion: any;
  listRecepcion: any;
  vReciboPage01: any;
  rowCount: any;
  rowReciboSelect: any;
  listConfirm: any = [];
  listProcess: any = [];
  countConfirm: number = 0;
  countProcess: number = 0;
  userProfile: any;

  constructor(public app: App, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public sRecibo: ReciboServiceProvider, public modalCtrl: ModalController, public sGlobal: GlobalServiceProvider,
    public alertCtrl: AlertController, public viewCtrl: ViewController) {
      this.userProfile = this.navParams.data;
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

  presentPopover(myEvent) {
    debugger;
    var estadoOrden = false;
    if (this.rowReciboSelect) {
      if (this.rowReciboSelect.Id_Estado == 2) {
        estadoOrden = false;
      } else {
        estadoOrden = true;
      }
    } else {
      estadoOrden = false;
    }

    let popover = this.popoverCtrl.create(PopoverReciboComponent, { 'page': 11, 'has_Id_Tx': estadoOrden });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      if (popoverData == 2) {
        this.showModalIncidencia(this.rowReciboSelect);
      } else if (popoverData == 3) {
        this.showModalImpresora();
      } else if (popoverData == 4) {
        this.presentAlertConfirm("¿Estás seguro que deseas cerrar sesión?").then((result) => {
          if (result) {
            this.navCtrl.pop();
            var nav = this.app.getRootNav();
            nav.setRoot(HomePage);
          }
        })

      }
      this.rowReciboSelect = null;
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

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  filterItems(ev: any) {
    const val = ev.value;
    if (val && val.trim() != '') {      
      this.listAuxRecepcion = this.listRecepcion.filter((item) => {       
        if(item.NumOrden!=null)
          return (item.NumOrden.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxRecepcion.length;
      if (this.rowCount > 0) {
        this.listConfirm = this.listAuxRecepcion.filter((item) => {
          return (item.Id_Estado == 2);
        });
        this.listProcess = this.listAuxRecepcion.filter((item) => {
          return (item.Id_Estado == 3);
        });
        this.countConfirm = this.listConfirm.length;
        this.countProcess = this.listProcess.length;
      } else {
        this.countConfirm = this.rowCount;
        this.countProcess = this.rowCount;
      }
    } else {
      this.rowCount = this.listRecepcion.length;

      this.listConfirm = this.listRecepcion.filter((item) => {
        return (item.Id_Estado == 2);
      });
      this.listProcess = this.listRecepcion.filter((item) => {
        return (item.Id_Estado == 3);
      });
      this.countConfirm = this.listConfirm.length;
      this.countProcess = this.listProcess.length;
      return this.listAuxRecepcion = this.listRecepcion;
    }
  }

  getRecepcionesXUsuario(strUsuario, intIdAlmacen, intIdMuelle) {
    this.sRecibo.getRecepcionesXUsuario(strUsuario, intIdAlmacen, intIdMuelle).then((result) => {

      this.listConfirm = [];
      this.listProcess = [];
      this.listAuxRecepcion = [];

      debugger;
      this.listRecepcion = result;

      for (var i = 0; i < this.listRecepcion.length; i++) {
        var obj = {
          'Cliente': result[i].Cliente,
          'CodBarraMuelle': result[i].CodBarraMuelle,
          'Estado': result[i].Estado,
          'FechaDocumento': result[i].FechaDocumento,
          'FechaLlegada': result[i].FechaLlegada,
          'FlagDetalle': result[i].FlagDetalle,
          'FlagPausa': result[i].FlagPausa,
          'Id_Cliente': result[i].Id_Cliente,
          'Id_Estado': result[i].Id_Estado,
          'Id_Muelle': result[i].Id_Muelle,
          'Id_Proveedor': result[i].Id_Proveedor,
          'Id_TipoDocumento': result[i].Id_TipoDocumento,
          'Id_TipoMovimiento': result[i].Id_TipoMovimiento,
          'Id_Tx': result[i].Id_Tx,
          'Muelle': result[i].Muelle,
          'NumOrden': result[i].NumOrden,
          'Observacion': result[i].Observacion,
          'Proveedor': result[i].Proveedor,
          'TipoDocumento': result[i].TipoDocumento,
          'TipoMovimiento': result[i].TipoMovimiento
        };
        this.listAuxRecepcion.push(obj);

        if (result[i].Id_Estado == 2) {
          this.listConfirm.push(obj);
        }
        if (result[i].Id_Estado == 3) {
          this.listProcess.push(obj);
        }
      }

      this.rowCount = this.listAuxRecepcion.length;
      this.countConfirm = this.listConfirm.length;
      this.countProcess = this.listProcess.length;

      if (this.listRecepcion.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    });
  }

  evaluateGoReciboPage02(data) {
    this.sGlobal.nombreEmpresa = data.Cliente;
    if (data.FlagPausa == true) {
      this.showModalIncidencia(data);
    } else {
      this.goToReciboPage02(data);
    }
  }

  goToReciboPage02(data) {
    this.vReciboPage01 = {
      "Id_Tx": data.Id_Tx,
      "NumOrden": data.NumOrden,
      "Cuenta": data.Cliente,
      "Proveedor": data.Proveedor,
      "Id_TipoMovimiento": data.Id_TipoMovimiento,
      "FlagPausa": data.FlagPausa,
      "Id_Cliente": data.Id_Cliente
    };

    this.navCtrl.push(ReciboPage_02Page, {
      data: this.vReciboPage01
    });
  }

  getDataRecepcion() {
    this.searchQuery = "";
    this.getRecepcionesXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen, this.sGlobal.Id_Muelle);
  }

  getReciboRow(obj): void {
    this.rowReciboSelect = obj;
    this.showToast('Recibo: ' + obj.Id_Tx + ' seleccionado', 2000, 'bottom', true, 'x', true);
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

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });

    modalIncidencia.onDidDismiss(result => {
      if (result.response == 200 && result.isChangePage == true) {
        data.FlagPausa = !data.FlagPausa;
        this.goToReciboPage02(data);
      } else {
        this.getDataRecepcion();
      }
    });
    modalIncidencia.present();
  }

  ionViewWillEnter() {
    this.getDataRecepcion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReciboPage');
  }

  confirmacionBack(): void {    
    this.navCtrl.push(MainMenuPage,this.userProfile);    
  }

}
