import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Navbar, Platform, App, NavParams, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { ReciboPage_03Page } from '../recibo-page-03/recibo-page-03';
import { ImpresoraPage } from '../../impresora/impresora';
import { PopoverReciboComponent } from '../../../components/popover-recibo/popover-recibo';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { ReciboPage } from '../../recibo/recibo';
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
 
  @ViewChild(Navbar) navBar: Navbar;
  tablestyle = 'bootstrap';

  vReciboPage01:any = [];
  vReciboPage02:any = [];
  listDetailTx: any = [];
  listAuxDetailTx:any = [];
  rowCount:number = 0;
  userDetail: any;
  bolAutomatic: boolean = false;


  listConfirm: any = [];
  listProcess: any = [];
  listFinalizado: any = [];

  countConfirm: number = 0;
  countProcess: number = 0;
  countFinalizado: number = 0;
  cantPendiente: number = 0;

  constructor(public app: App, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, public sRecibo: ReciboServiceProvider,
    public modalCtrl: ModalController, public popoverCtrl: PopoverController, public sGlobal: GlobalServiceProvider) {
      this.vReciboPage01 = navParams.get('data');
      const data = JSON.parse(localStorage.getItem('vUserData'));
      this.userDetail = data;
  }

  presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 12});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      if(popoverData == 2){
        if(this.listAuxDetailTx.length != this.listConfirm.length){
          this.showModalIncidencia(this.vReciboPage01);
        }else{
          this.presentAlert("No puede registrar incidencia de una transacción que no fue trabajada"); 
        }        
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
        'Origen' : 'RP02',
        'id_Modulo': 1
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

  getDetailXTx(strIdTx){
    this.sRecibo.getDetalleXTx(strIdTx).then((result)=>{
      debugger;

      this.listConfirm = [];
      this.listProcess = [];
      this.listFinalizado = [];
      this.listAuxDetailTx = [];

      this.listDetailTx = result;
      //this.listAuxDetailTx = this.listDetailTx;

      for (var i = 0; i < this.listDetailTx.length; i++) {
        var obj = {
          'Alias': result[i].Alias,
          'CantidadBulto': result[i].CantidadBulto,
          'CantidadOperacion': result[i].CantidadOperacion,
          'CantidadPedida': result[i].CantidadPedida,
          'CantidadXBulto': result[i].CantidadXBulto,
          'Codigo': result[i].Codigo,
          'Columna': result[i].Columna,
          'Composicion': result[i].Composicion,
          'Condicion': result[i].Condicion,
          'CondicionAlmacenamiento': result[i].CondicionAlmacenamiento,
          'CondicionSAP': result[i].CondicionSAP,
          'Descripcion': result[i].Descripcion,
          'EAN13': result[i].EAN13,
          'EAN14': result[i].EAN14,
          'Factor': result[i].Factor,
          'FechaEmision': result[i].FechaEmision,
          'FechaVencimiento': result[i].FechaVencimiento,
          'Fila': result[i].Fila,
          'FlagLotePT': result[i].FlagLotePT,
          'FlagSeriePT': result[i].FlagSeriePT,
          'Id_Composicion': result[i].Id_Composicion,
          'Id_Condicion': result[i].Id_Condicion,
          'Id_Pasillo': result[i].Id_Pasillo,
          'Id_Producto': result[i].Id_Producto,
          'Id_SubAlmacen': result[i].Id_SubAlmacen,
          'Id_Tx': result[i].Id_Tx,
          'Id_UM': result[i].Id_UM,
          'Id_UMB': result[i].Id_UMB,
          'Id_Ubicacion': result[i].Id_Ubicacion,
          'Inspeccion': result[i].Inspeccion,
          'Item': result[i].Item,
          'ItemSAP': result[i].ItemSAP,
          'Lote': result[i].Lote,
          'Nivel': result[i].Nivel,
          'NombreSubAlmacen': result[i].NombreSubAlmacen,
          'Posicion': result[i].Posicion,
          'PosicionReferencia': result[i].PosicionReferencia,
          'Position': result[i].Position,
          'Saldo': result[i].Saldo,
          'TipoAlmacenaje': result[i].TipoAlmacenaje,
          'UM': result[i].UM,
          'UMBase': result[i].UMBase
        };
        this.listAuxDetailTx.push(obj);

        if (result[i].CantidadPedida == result[i].Saldo) {
          this.listConfirm.push(obj);
        }
        if (result[i].Saldo > 0 && result[i].CantidadOperacion > 0) {
          this.listProcess.push(obj);
        }
        if (result[i].CantidadPedida == result[i].CantidadOperacion) {
          this.listFinalizado.push(obj);
        }
      }

      this.rowCount = this.listAuxDetailTx.length;
      this.countConfirm = this.listConfirm.length;
      this.countProcess = this.listProcess.length;
      this.countFinalizado = this.listFinalizado.length;

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
      if (this.rowCount > 0) {
        this.listConfirm = this.listAuxDetailTx.filter((item) => {
          return (item.CantidadPedida == item.Saldo);
        });
        this.listProcess = this.listAuxDetailTx.filter((item) => {
          return (item.Saldo > 0 && item.CantidadOperacion > 0);
        });
        this.listFinalizado = this.listAuxDetailTx.filter((item) => {
          return (item.CantidadPedida == item.CantidadOperacion);
        });

        this.countConfirm = this.listConfirm.length;
        this.countProcess = this.listProcess.length;
        this.countFinalizado = this.listFinalizado.length;
      } else {
        this.countConfirm = this.rowCount;
        this.countProcess = this.rowCount;
        this.countFinalizado = this.rowCount;
        alert('Orden no existe');
      }
      
      // if(this.rowCount <= 0){
      //   alert('Orden no existe');
      // }
      
    }else{
      this.rowCount = this.listDetailTx.length;

      this.listConfirm = this.listDetailTx.filter((item) => {
        return (item.CantidadPedida == item.Saldo);
      });
      this.listProcess = this.listDetailTx.filter((item) => {
        return (item.Saldo > 0 && item.CantidadOperacion > 0);
      });
      this.listFinalizado = this.listAuxDetailTx.filter((item) => {
        return (item.CantidadPedida == item.CantidadOperacion);
      });

      this.countConfirm = this.listConfirm.length;
      this.countProcess = this.listProcess.length;
      this.countFinalizado = this.listFinalizado.length;

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

      // if(saldo > 0){
      //   message = "Existen " + saldo + " productos con saldo pendiente ¿Está seguro de cerrar la transacción?";
      // }else{
      //   message = "¿Está seguro de cerrar la transacción?";
      // }


      debugger;
      if(this.listAuxDetailTx.length != this.listConfirm.length){
        if(saldo > 0){
          this.cantPendiente = this.countConfirm + this.countProcess;
          this.presentAlertConfirm("Existen " + this.cantPendiente + " producto(s) con saldo pendiente ¿Está seguro de cerrar la transacción?").then((resultAlert) => {
            if (resultAlert) {
              this.sRecibo.cerrarRecepcion(this.vReciboPage01.Id_Tx, (saldo > 0 ? 6 : 5), this.sGlobal.userName).then(result=>{
                let res: any = result; 
                this.getDetailXTx(this.vReciboPage01.Id_Tx);
                this.navCtrl.push(ReciboPage);
              });
            }
            else{
              return;
            }
          })

         // message = "Existen " + this.rowCount + " productos con saldo pendiente ¿Está seguro de cerrar la transacción?";
        }else{
          this.presentAlertConfirm("¿Está seguro de cerrar la transacción?").then((resultAlert) => {
            if (resultAlert) {
              this.sRecibo.cerrarRecepcion(this.vReciboPage01.Id_Tx, (saldo > 0 ? 6 : 5), this.sGlobal.userName).then(result=>{
                let res: any = result; 
                this.getDetailXTx(this.vReciboPage01.Id_Tx);
                this.navCtrl.push(ReciboPage);
              });
            }else{
              return;
            }
          })
          //message = "¿Está seguro de cerrar la transacción?";
        }
      }else{
        this.presentAlert("No se puede cerrar una transacción que no fue trabajada");  
      }

      // let alerta = this.alertCtrl.create({
      //   title: 'Advertencia',
      //   message: message,
      //   buttons: [
      //     {
      //       text: 'Cancelar',
      //       role: 'cancel',
      //       handler: () => {
      //         return;
      //       }
      //     },
      //     {
      //       text: 'Aceptar',
      //       handler: () => {
      //         this.sRecibo.cerrarRecepcion(this.vReciboPage01.Id_Tx, (saldo > 0 ? 6 : 5), this.sGlobal.userName).then(result=>{
      //           let res: any = result; 
      //           this.getDetailXTx(this.vReciboPage01.Id_Tx);
      //         });
      //       }
      //     }
      //   ]
      // });
      // alerta.present();
    }
  }

  navigateToEtqCajaLpn(data){
    debugger;
    let objEtq = {
    "LoteLab": data.Lote,
    "Id_Producto": data.Id_Producto,
    "Id_UM": data.Id_UM,
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
    "Id_SubAlmacen": data.Id_SubAlmacen,
    "Saldo": data.Saldo, //Add by Arturo
    "page": true
  }

    let etqModal = this.modalCtrl.create(EtiquetadoPage_01Page, { vEtq: objEtq });
    etqModal.onDidDismiss(data => {
      console.log("Data retornada del modal", data);
    });
    etqModal.present();
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

  ionViewWillEnter(){
    this.getDetailXTx(this.vReciboPage01.Id_Tx);
  }

  ionViewDidLoad() {
    
  }
}