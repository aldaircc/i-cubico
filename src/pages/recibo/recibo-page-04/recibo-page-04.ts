import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ModalController } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { ReciboPage_05Page } from '../recibo-page-05/recibo-page-05';
import { PopoverReciboComponent } from '../../../components/popover-recibo/popover-recibo';
import { ImpresoraPage } from '../../impresora/impresora';

/**
 * Generated class for the ReciboPage_04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo-page-04',
  templateUrl: 'recibo-page-04.html',
})
export class ReciboPage_04Page {

  vReciboPage03 : any;
  listBulto : any = [];
  rowCount : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController , public sRecibo: ReciboServiceProvider,
    public sGlobal: GlobalServiceProvider, public popoverCtrl: PopoverController,
    public modalCtrl: ModalController) {
    this.vReciboPage03 = navParams.get('dataPage03');
    console.log('data received - Page 03', this.vReciboPage03);
    this.listarUAXProductoTx(this.vReciboPage03.Id_Tx, this.vReciboPage03.Id_Articulo, this.vReciboPage03.Item);
  }

  ionViewDidLoad() {
    
  }

  listarUAXProductoTx(strIdTx, intIdProducto, intItem){
    this.sRecibo.listarUAXProductoTx(strIdTx, intIdProducto, intItem).then(result=>{
      this.listBulto = result;
      this.rowCount = this.listBulto.length;
    });
  }

  deleteItem(data){

    let alert = this.alertCtrl.create({
      title: 'Confirmar eliminación',
      message: '¿Esta seguro de eliminar el registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Si',
          handler: () => {
            //eliminar
            let currentDate = new Date().toISOString();
            let objUA = {
              'UA_CodBarra': data.UA_CodBarra,
              'Id_Tx': 'A201899999999', //data.Id_Tx,
              'Id_Producto': data.Id_Producto,
              'LoteLab': data.LoteLab,
              'FechaEmision' : "/Date("+ Date.parse(currentDate) +")/",
              'FechaVencimiento' : "/Date("+ Date.parse(currentDate) +")/",
              'FechaIngreso' : "/Date("+ Date.parse(currentDate) +")/",
              'Cantidad' : data.Cantidad,
              'Saldo' : data.SaldoTotal,
              'CantidadAveriada' : data.CantidadAveriada,
              'Id_TerminalRF' : 1,
              'Item' : this.vReciboPage03.Item,
              'UsuarioRegistro' : this.sGlobal.userName,
              'Id_Almacen' : this.sGlobal.Id_Almacen,
              'FlagAnulado' : true,
              'Observacion' : ''
            };

            this.evaluateDelete(objUA);
          }
        }
      ]
    });
    alert.present();
  }

  evaluateDelete(objUA){
    if(this.vReciboPage03.Id_TipoMovimiento == 0){
      alert('Esta transacción no tiene tipo de movimiento');
      return;
    }

    if(this.vReciboPage03.Id_TipoMovimiento == 11 || this.vReciboPage03.Id_TipoMovimiento == 13 || this.vReciboPage03.Id_TipoMovimiento == 14){
      this.sRecibo.registrarUATransferencia(objUA).then(result=>{
        let res : any = result;
        alert(res.message);
      });
    }else{
      this.sRecibo.registrarUA(objUA).then(result=>{
        let res : any = result;
        alert(res.message);
      });
    }
    this.listarUAXProductoTx(this.vReciboPage03.Id_Tx, this.vReciboPage03.Id_Articulo, this.vReciboPage03.Item);
  }

  evaluateSaldo(){
    if(this.vReciboPage03.currentSaldo > 0){
      let alert = this.alertCtrl.create({
        title: 'Confirmar cierre de pallet',
        message: '¿Tiene un saldo pendiente, está seguro de cerrar el pallet?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
            
            }
          },
          {
            text: 'Si',
            handler: () => {
            //presenter.navigateToReciboTab05(objReceived, strNumOrden, intId_TipoMovimiento, bolAutomatic, currentSaldo);  
            this.goToReciboPage05(this.vReciboPage03);
            }
          }
        ]
      });
      alert.present();
    }else{
      //presenter.navigateToReciboTab05(objReceived, strNumOrden, intId_TipoMovimiento, bolAutomatic, currentSaldo);
      this.goToReciboPage05(this.vReciboPage03);
    }
  }

  goToReciboPage05(data){
    debugger;
    let obj = {
        'Id_Tx' : data.Id_Tx,
        'NumOrden' : data.NumOrden,
        'Codigo' : data.Codigo,
        'Articulo' : data.Articulo,
        'Id_Articulo' : data.Id_Articulo,
        'UM' : data.UM,
        'Id_UM' : data.Id_UM,
        'Fecha_Emi' : data.Fecha_Emi,
        'Fecha_Venci' : data.Fecha_Venci,
        'Lote' : data.Lote,
        'CantPedida' : data.CantPedida,
        'CantRecib' : data.CantidadOperacion,
        'Saldo' : data.Saldo,
        'Item' : data.Item,
        'Factor' : data.Factor,
        'FlagSeriePT' : data.FlagSeriePT,
        'Id_TipoMovimiento' : data.Id_TipoMovimiento,
        'bolAutomatic' : data.bolAutomatic,
        'currentSaldo' : data.Saldo
    };

    this.navCtrl.push(ReciboPage_05Page, {
      dataPage04: obj
    });
  }

  presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 14});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(option =>{
      if(option == 3){
        this.showModalImpresora();
      }
    });
  }

  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }
}