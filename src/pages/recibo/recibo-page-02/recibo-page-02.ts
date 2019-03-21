import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { ReciboPage_03Page } from '../recibo-page-03/recibo-page-03';
import { ImpresoraPage } from '../../impresora/impresora';
import { PopoverReciboComponent } from '../../../components/popover-recibo/popover-recibo';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { EtiquetadoPage_01Page } from '../../etiquetado/etiquetado-page-01/etiquetado-page-01';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the ReciboPage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo-page-02',
  templateUrl: 'recibo-page-02.html',
})

export class ReciboPage_02Page {
 
  tablestyle = 'bootstrap';

  vReciboPage01:any = [];
  vReciboPage02:any = [];
  listDetailTx: any = [];
  listAuxDetailTx:any = [];
  rowCount:number = 0;
  userDetail: any;
  bolAutomatic: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, public sRecibo: ReciboServiceProvider,
    public modalCtrl: ModalController, public popoverCtrl: PopoverController, public sGlobal: GlobalServiceProvider) {
      this.vReciboPage01 = navParams.get('data');
      const data = JSON.parse(localStorage.getItem('vUserData'));
      this.userDetail = data;
  }

  presentPopover(myEvent){
    debugger;
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 12});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      if(popoverData == 2){
        this.showModalIncidencia(this.vReciboPage01);
      }else if(popoverData == 3){
        this.showModalImpresora();
      }
    });
  }

  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  showModalIncidencia(data){
    let obj = { 
        'Id_Tx' : data.Id_Tx,
        'FlagPausa' : data.FlagPausa,
        'Cliente' : data.Cliente,
        'Id_Cliente' : data.Id_Cliente,
        'Proveedor' : data.Proveedor,
        'Id_TipoMovimiento' : data.Id_TipoMovimiento,
        'Origen' : 'RP02'
      };

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia' : obj});
    modalIncidencia.onDidDismiss(data =>{
      if(data.response == 200){
        this.navCtrl.pop();
      }
    });
    modalIncidencia.present();
  }

  switchStyle() {
    if (this.tablestyle == 'dark') {
      this.tablestyle = 'bootstrap';
    } else {
      this.tablestyle = 'dark';
    }
  }

  ionViewDidLoad() {

  }

  getDetailXTx(strIdTx){
    this.sRecibo.getDetalleXTx(strIdTx).then((result)=>{
      this.listDetailTx = result;
      this.listAuxDetailTx = this.listDetailTx;
      this.rowCount = this.listAuxDetailTx.length;
      if(this.listDetailTx.length == 0){
        alert('No se encontraron detalles');
      }
    });
  }

  filterItems(ev: any){
    const val = ev.target.value.trim();
    if(val && val.trim() != ''){
      this.listAuxDetailTx = this.listDetailTx.filter((item)=>{
        return (item.Codigo.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.Descripcion.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxDetailTx.length;
    }else{
      this.rowCount = this.listDetailTx.length;
      return this.listAuxDetailTx = this.listDetailTx;
    }
  }

  goToReciboPage03(data){
  debugger;

  this.vReciboPage02 = {
    "Id_Tx":this.vReciboPage01.Id_Tx,
    "NumOrden":this.vReciboPage01.NumOrden,
    "Codigo":data.Codigo,
    "Descripcion":data.Descripcion, //Articulo
    "Id_Producto":data.Id_Producto, //Id_Articulio
    "UM":data.UM,
    "Id_UM":data.Id_UM,
    "Fecha_Emi":data.FechaEmision,
    "Fecha_Venci":data.FechaVencimiento,
    "Lote":data.Lote,
    "CantPedida":data.CantidadPedida,
    "CantidadOperacion":data.CantidadOperacion, //CantRecib
    "Saldo":data.Saldo,
    "Item":data.Item,
    "Factor":data.Factor,
    "FlagSeriePT":data.FlagSeriePT,
    "Id_TipoMovimiento":this.vReciboPage01.Id_TipoMovimiento,
    "bolAutomatic": this.bolAutomatic, //value check
    "FlagPausa":this.vReciboPage01.FlagPausa,
    "Cuenta":this.vReciboPage01.Cuenta,
    "Id_Cliente":this.vReciboPage01.Id_Cliente,

    //Campos utiles para impresión
    "CantidadPedida": data.CantidadPedida,
	  "LoteLab": data.Lote,
	  "Articulo": data.Descripcion,
	  "Cliente": this.vReciboPage01.Cuenta,
	  "UM_Base": data.UMBase,
	  "TipoAlmacenaje": data.TipoAlmacenaje,
    "Acceso": 0,
    "NroDoc": this.vReciboPage01.NumOrden,
    "FecEmi": data.FechaEmision,
    "FecVen": data.FechaVencimiento,
    "FlagSerie": data.FlagSeriePT,
    "FlagLote": data.FlagLotePT,
    "CondicionAlmac": data.CondicionAlmacenamiento,
    "Condicion": data.Condicion,
    "Id_Condicion": data.Id_Condicion,
    "idTipoMovimiento": this.vReciboPage01.Id_TipoMovimiento,
	  "IdCuentaLPN": this.vReciboPage01.Id_Cliente,
    "Id_SubAlmacen": data.Id_SubAlmacen,
    "NombreSubAlmacen": data.NombreSubAlmacen
  };

    this.navCtrl.push(ReciboPage_03Page, {
      dataPage02: this.vReciboPage02
    });
  }

  cerrarTxRecepcion(){
    if(this.vReciboPage01.Id_TipoMovimiento === 0){
      alert('Esta transacción no tiene tipo de movimiento');
      return;
    }else{
      
      var message = "";
      let saldo = this.listDetailTx.reduce(function(prev, cur){
        return prev + cur.Saldo;
      }, 0);

      if(saldo > 0){
        message = "Existen " + saldo + " productos con saldo pendiente ¿Está seguro de cerrar la transacción?";
      }else{
        message = "¿Está seguro de cerrar la transacción?";
      }

      let alerta = this.alertCtrl.create({
        title: 'Advertencia',
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              console.log('Buy clicked');
              debugger;
              this.sRecibo.cerrarRecepcion('99999'/**this.vReciboPage01.Id_Tx**/, (saldo > 0 ? 6 : 5), this.sGlobal.userName).then(result=>{
                let res: any = result; 
                this.getDetailXTx(this.vReciboPage01.Id_Tx);
              });
            }
          }
        ]
      });
      alerta.present();
    }
  }

  navigateToEtqCajaLpn(data){
    let objEtq = {
    "LoteLab": data.Lote,
    "Id_Producto": data.Id_Producto,
    "Id_UM": data.UM,
    "CantidadPedida": data.CantidadPedida,
    "Codigo": data.Codigo,
    "Articulo": data.Descripcion, //Articulo
    "UM": data.UM,
    "Cliente": this.vReciboPage01.Cuenta,//data.Cuenta,
    "UM_Base": data.UMBase,
    "TipoAlmacenaje": data.TipoAlmacenaje,
    "Item": data.Item,
    "Acceso": 0,
    "NroDoc": this.vReciboPage01.NumOrden,
    "FecEmi": data.FechaEmision,
    "FecVen": data.FechaVencimiento,
    "FlagSerie": data.FlagSeriePT,
    "FlagLote": data.FlagLotePT,
    "CondicionAlmac": data.CondicionAlmacenamiento,
    "Condicion": data.Condicion,
    "Id_Condicion": data.Id_Condicion,
    "Id_Cliente": this.vReciboPage01.Id_Cliente,
    "idTipoMovimiento": this.vReciboPage01.Id_TipoMovimiento,
    "IdCuentaLPN": this.vReciboPage01.Id_Cliente,
    "Id_SubAlmacen": data.Id_SubAlmacen
  }

    let etqModal = this.modalCtrl.create(EtiquetadoPage_01Page, { vEtq: objEtq });
    etqModal.onDidDismiss(data => {
      console.log("Data retornada del modal", data);
    });
    etqModal.present();
  }

  ionViewWillEnter(){
    this.getDetailXTx(this.vReciboPage01.Id_Tx);
  }
}