import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, ViewController, App, ModalController, NavController, NavParams, AlertController, PopoverController, Navbar } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MainMenuPage } from '../../main-menu/main-menu'
import { HomePage } from '../../home/home';
import { PopoverPickingPage } from '../../picking/popover/popover-picking/popover-picking'
/**
 * Generated class for the DetallePorProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-por-producto',
  templateUrl: 'detalle-por-producto.html',
})
export class DetallePorProductoPage {

  @ViewChild(Navbar) navBar: Navbar;

  vDetalleXProducto: any = [];
  vPickingXProducto: any = [];
  resultEliminar: any = [];
  listDetalleProducto: any;
  listAuxDetalleProducto: any;
  rowCount: any;
  searchQuery: string = '';

  valorpopoverGlobal: boolean = false
popoverGlobal: any;

  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public alertCtrl: AlertController, public viewCtrl: ViewController, private platform: Platform,
    public popoverCtrl: PopoverController, public sGlobal: GlobalServiceProvider) {
    this.vPickingXProducto = navParams.get('data');
    this.getDetalleXProductoLoad();
  }

  filterItems(ev: any) {
    debugger;
    const val = ev.value;
    if (val && val.trim() != '') {
      this.listAuxDetalleProducto = this.listDetalleProducto.filter((item) => {
        return (item.UA_CodBarra.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxDetalleProducto.length;
    } else {
      this.rowCount = this.listDetalleProducto.length;
      return this.listAuxDetalleProducto = this.listDetalleProducto;
    }
  }

  getDetalleXProductoLoad() {
    this.searchQuery = "";
    this.getDetalleXProducto(this.vPickingXProducto.Id_Tx, this.vPickingXProducto.IdProducto, this.vPickingXProducto.Item);
  }

  getDetalleXProducto(strIdTx, intIdProducto, intItem) {
    debugger;
    this.sPicking.getDetalleXProducto(strIdTx, intIdProducto, intItem).then((result) => {
      debugger;
      this.listDetalleProducto = result;
      this.listAuxDetalleProducto = this.listDetalleProducto;
      this.rowCount = this.listAuxDetalleProducto.length;
      if (this.listDetalleProducto.length > 0) {
        console.log('Datos ordenes picking', this.listDetalleProducto);
      } else {
        this.presentAlert('No se encontraron datos.');
      }
    }, (err) => {
      console.log('E-getDetalleXProducto', err);
    });
  }

  eliminarUA(data) {
    this.presentAlertConfirm("¿Desea eliminar UA seleccionada?").then((result) => {
      if (result) {
        debugger;
        // Eliminar UA
        let objUA = {
          'UA_CodBarra': data.UA_CodBarra,
          'Id_Tx': this.vPickingXProducto.Id_Tx,
          'Id_Producto': this.vPickingXProducto.IdProducto,
          'Id_UM': data.Id_UM,
          'Cantidad': data.Cantidad,
          'FlagAnulado': true,
          'Id_TerminalRF': this.sGlobal.Id_TerminalRF,
          'Item': this.vPickingXProducto.Item,
          'Id_Almacen': this.sGlobal.Id_Almacen,
          'UsuarioRegistro': this.sGlobal.userName,
        };
        this.sPicking.RegistarEliminarUA(objUA).then(result => {
          debugger;
          this.resultEliminar = result;
          this.presentAlert(this.resultEliminar.message).then((resultAlert2) => {
            this.getDetalleXProductoLoad();
          })

        });
      }
    })
  } 

  goPickingPorProductoPage() {
    debugger;
    this.navCtrl.pop().then(() => {
      this.vDetalleXProducto = {
        'idRutaPicking': this.vPickingXProducto.idRutaPicking,
        'Id_Tx': this.vPickingXProducto.Id_Tx,
        'NumOrden': this.vPickingXProducto.NumOrden,
        'Cliente': this.vPickingXProducto.Cliente,
        'Ciudad': this.vPickingXProducto.Ciudad,
        'Zona': this.vPickingXProducto.Zona,
        'FlagPausa': this.vPickingXProducto.FlagPausa,
        'Id_Cuenta': this.vPickingXProducto.Id_Cuenta
      };
      this.navParams.get('detallePorProducto')(this.vDetalleXProducto);
    });
  }  

  goDetallePickingPage() {
    debugger;
    this.navCtrl.pop().then(() => {
      this.vDetalleXProducto = {
        'Id_Tx': this.vPickingXProducto.Id_Tx,
        'NumOrden': this.vPickingXProducto.NumOrden,
        'Cliente': this.vPickingXProducto.Cliente,
        'Ciudad': this.vPickingXProducto.Ciudad,
        'Zona': this.vPickingXProducto.Zona,
        'idRutaPicking': this.vPickingXProducto.idRutaPicking,
        'FlagPausa': this.vPickingXProducto.FlagPausa,
        'Id_Cuenta': this.vPickingXProducto.Id_Cuenta
      };
      this.navParams.get('detalleProducto')(this.vDetalleXProducto);
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
    this.popoverGlobal = this.popoverCtrl.create(PopoverPickingPage, { 'page': 1 });
    this.popoverGlobal.present({
      ev: ev
    });

    this.popoverGlobal.onDidDismiss(popoverData => {
      this.valorpopoverGlobal = false;
      if (popoverData == 1) {
        debugger;
        if (this.vPickingXProducto.Id_Estado != 2) {
          this.showModalIncidencia(this.vPickingXProducto);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePorProductoPage');
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
