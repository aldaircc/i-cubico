import { Component } from '@angular/core';
import { IonicPage, Platform, ViewController, NavController, NavParams, AlertController, ModalController, PopoverController,ToastController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { PopoverEmbalajeComponent } from '../../../components/popover-embalaje/popover-embalaje';
import { EmbalajePage_03Page } from '../embalaje-page-03/embalaje-page-03';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { ImpresoraPage } from '../../impresora/impresora';

/**
 * Generated class for the EmbalajePage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-02',
  templateUrl: 'embalaje-page-02.html',
})
export class EmbalajePage_02Page {
  
  listEmbalaje: any;
  
  vEmbalajePage02:any = [];
  rowCount: any;
  rowReciboSelect: any;
  rowCountConfirm: any;
  rowCountProceso: any;
  listAuxEmbalaje: any = [];
  listDetalleConfirm: any = [];
  listDetalleProceso: any = [];

  valorpopoverGlobal: boolean = false
popoverGlobal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,private alertCtrl: AlertController,public sEmbalaje: EmbalajeServiceProvider, 
    public popoverCtrl: PopoverController,public sGlobal: GlobalServiceProvider,public modalCtrl: ModalController,
    public viewCtrl: ViewController, private platform: Platform) {            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_02Page');
  }

  getDataEmbalaje() {
    this.ListarDespachoXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  ListarDespachoXUsuario(strUsuario, intIdAlmacen) {
    this.sEmbalaje.ListarDespachoXUsuario(strUsuario, intIdAlmacen).then((result) => {

      this.listAuxEmbalaje = [];
      this.listDetalleConfirm = [];
      this.listDetalleProceso = [];

      this.listEmbalaje = result;
      debugger;
      // this.listAuxEmbalaje = this.listEmbalaje;
      for (var i = 0; i < this.listEmbalaje.length; i++) {
        var obj = {
          'Ciudad': result[i].Ciudad,
          'Cliente': result[i].Cliente,
          'CodigoZona': result[i].CodigoZona,
          'Direccion': result[i].Direccion,
          'Estado': result[i].Estado,
          'FechaDocumento': result[i].FechaDocumento,
          'FechaLlegada': result[i].FechaLlegada,
          'FlagCajaRegistradora': result[i].FlagCajaRegistradora,
          'FlagEtqLogistica': result[i].FlagEtqLogistica,
          'FlagEtqSGAA': result[i].FlagEtqSGAA,
          'FlagPausa': result[i].FlagPausa,
          'FlagVolumen': result[i].FlagVolumen,
          'Id_Ciudad': result[i].Id_Ciudad,
          'Id_ClienteLab': result[i].Id_ClienteLab,
          'Id_Estado': result[i].Id_Estado,
          'Id_Sucursal': result[i].Id_Sucursal,
          'Id_TipoDocumento': result[i].Id_TipoDocumento,
          'Id_TipoMovimiento': result[i].Id_TipoMovimiento,
          'Id_Tx': result[i].Id_Tx,
          'NumOrden': result[i].NumOrden,
          'NumeroFactura': result[i].NumeroFactura,
          'Observacion': result[i].Observacion,
          'Socio': result[i].Socio,
          'Sucursal': result[i].Sucursal,
          'TipoDocumento': result[i].TipoDocumento,
          'TipoMovimiento': result[i].TipoMovimiento,
          'Zona': result[i].Zona
        };
        this.listAuxEmbalaje.push(obj);

        if (result[i].Id_Estado == 2) {
          this.listDetalleConfirm.push(obj);
        }
        if (result[i].Id_Estado == 3) {
          this.listDetalleProceso.push(obj);
        }
      }

      this.rowCount = this.listAuxEmbalaje.length;
      this.rowCountConfirm = this.listDetalleConfirm.length;
      this.rowCountProceso = this.listDetalleProceso.length;

      if (this.listEmbalaje.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  getRegistrarIncidencia(obj):void{  
    debugger;
    this.rowReciboSelect = obj;
    this.showToast('Recibo: '+ obj.Id_Tx + ' seleccionado', 2000, 'bottom', true, 'x', true);
  }

  showToast(message, duration, position, showClose, closeText, dismissChange){
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
  

  filterItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.listAuxEmbalaje = this.listEmbalaje.filter((item) => {
        return (item.NumOrden.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxEmbalaje.length;
      debugger;
      if (this.rowCount > 0) {
        this.listDetalleConfirm = this.listAuxEmbalaje.filter((item) => {
          return (item.Id_Estado == 2);
        });
        this.listDetalleProceso = this.listAuxEmbalaje.filter((item) => {
          return (item.Id_Estado == 3);
        });
        this.rowCountConfirm = this.listDetalleConfirm.length;
        this.rowCountProceso = this.listDetalleProceso.length;
      } else {
        this.rowCountConfirm = this.rowCount;
        this.rowCountProceso = this.rowCount;
      }
      // if(this.rowCount == 0)
      //   this.mostrarConfirmacion("Advertencia","No se encontró la orden");

    } else {
      // this.rowCount = this.listEmbalaje.length;
      // return this.listAuxEmbalaje = this.listEmbalaje;

      this.rowCount = this.listEmbalaje.length;

      this.listDetalleConfirm = this.listEmbalaje.filter((item) => {
        return (item.Id_Estado == 2);
      });
      this.listDetalleProceso = this.listEmbalaje.filter((item) => {
        return (item.Id_Estado == 3);
      });

      this.rowCountConfirm = this.listDetalleConfirm.length;
      this.rowCountProceso = this.listDetalleProceso.length;

      return this.listAuxEmbalaje = this.listEmbalaje;
    }
  }

   presentPopover(myEvent){
    this.valorpopoverGlobal = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverEmbalajeComponent, {'page' : 12, 'has_Id_Tx': (this.rowReciboSelect != undefined) ? true : false });
    this.popoverGlobal.present({
      ev: myEvent
    });

    this.popoverGlobal.onDidDismiss(popoverData =>{     
      this.valorpopoverGlobal = false;
     console.log(popoverData);
      if(popoverData == 1){
        this.showModalIncidencia(this.rowReciboSelect);
      }
      if(popoverData == 4){
        this.showModalImpresora();
      }else if(popoverData == 5){
        this.goBackLoginPage();
      }
      this.rowReciboSelect = null;
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

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });

    modalIncidencia.onDidDismiss(result => {
      this.getDataEmbalaje();
      if (result.response == 200 && result.isChangePage == true) {
        data.FlagPausa = !data.FlagPausa;
        //this.goToReciboPage02(data);
      }else{
        //this.getDataRecepcion();
      }
    });
    modalIncidencia.present();
  }


  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }
  goBackLoginPage():void{
    this.navCtrl.push(HomePage);
  }

  mostrarConfirmacion(title,message){
  
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

  ValidarOrden(data) {
    debugger;
    if (data.FlagPausa == true) {
      this.showModalIncidencia(data);
    } else {
      this.goDetEmbalajePackingPage(data)
    }
  }

  goDetEmbalajePackingPage(data){    

    this.vEmbalajePage02 = {     
      "NumOrden":data.NumOrden,
      "Cliente":data.Cliente,
      "Ciudad":data.Ciudad,
      "Direccion":data.Direccion,
      "Id_Tx":data.Id_Tx,
      "CodigoZona":data.CodigoZona,
      "Zona":data.Zona
    };
    
    this.navCtrl.push(EmbalajePage_03Page, {
      dataPage02: this.vEmbalajePage02
    });

  }

  ionViewWillEnter() {    
    this.getDataEmbalaje();
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
