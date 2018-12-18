import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { ReciboPage_03Page } from '../recibo-page-03/recibo-page-03';
import { ImpresoraPage } from '../../impresora/impresora';
import { PopoverReciboComponent } from '../../../components/popover-recibo/popover-recibo';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { EtiquetaCajaLpnPage } from '../../etiqueta-caja-lpn/etiqueta-caja-lpn';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, public sRecibo: ReciboServiceProvider,
    public modalCtrl: ModalController, public popoverCtrl: PopoverController) {
      this.vReciboPage01 = navParams.get('data');
      const data = JSON.parse(localStorage.getItem('vUserData'));
      this.userDetail = data;
      this.getDetailXTx(this.vReciboPage01.Id_Tx);      
  }

  presentPopover(myEvent){
    debugger;
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 2});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      if(popoverData == 1){

      }else if(popoverData == 2){

        this.showModalIncidencia(this.vReciboPage01);
      }
    });
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
      debugger;
      console.log("datos", data);
      console.log('Regresar a pagina 01');
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
      console.log('detalles', this.listDetailTx);
      if(this.listDetailTx.length == 0){
        console.log('No se encontraron detalles', this.listDetailTx);  
      }
    },err=>{
      console.log('E-getDetailXTx',err);
    });
  }

  filterItems(ev: any){
    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.listAuxDetailTx = this.listDetailTx.filter((item)=>{
        return (item.Codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxDetailTx.length;
    }else{
      this.rowCount = this.listDetailTx.length;
      return this.listAuxDetailTx = this.listDetailTx;
    }
  }

  goToReciboPage03(data){

  this.vReciboPage02 = {
    "Id_Tx":this.vReciboPage01.Id_Tx,
    "NumOrden":this.vReciboPage01.NumOrden,
    "Codigo":data.Codigo,
    "Descripcion":data.Descripcion, //Articulo
    "Id_Producto":data.Id_Producto, //Id_Articulio
    "UM":data.UM,
    "Id_UM":data.UM,
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
    "bolAutomatic":this.vReciboPage01, //value check
    "FlagPausa":this.vReciboPage01.FlagPausa,
    "Cuenta":this.vReciboPage01.Cuenta,
    "Id_Cliente":this.vReciboPage01.Id_Cliente
  };
  console.log('going to go page 03', this.vReciboPage02);

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

      let alert = this.alertCtrl.create({
        title: 'Confirm purchase',
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
              this.sRecibo.cerrarRecepcion('99999'/**this.vReciboPage01.Id_Tx**/, (saldo > 0 ? 6 : 5), "ADMIN"/**this.userDetail[0].Usuario**/)
            }
          }
        ]
      });
      alert.present();
    }
  }

  navigateToEtqCajaLpn(data){
    debugger;
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

    let etqModal = this.modalCtrl.create(EtiquetaCajaLpnPage, { vEtq: objEtq });
    etqModal.onDidDismiss(data => {
      console.log("Data retornada", data);
    });
    etqModal.present();
  }
  
}