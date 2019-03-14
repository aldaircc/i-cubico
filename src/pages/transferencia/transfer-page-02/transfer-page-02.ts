import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { TransferPage_03Page } from '../transfer-page-03/transfer-page-03';

/**
 * Generated class for the TransferPage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-page-02',
  templateUrl: 'transfer-page-02.html',
})
export class TransferPage_02Page {

  listDetalle: any = [];
  vParameter: any;
  rowCount : number = 0;
  countPendient: number = 0;
  countConfirm: number = 0;
  countProcess: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sPicking: PickingServiceProvider,
    public alertCtrl: AlertController, public sGlobal: GlobalServiceProvider) {
      this.vParameter = this.navParams.get('vParameter');
  }

  listarDetalleTransfXTx(strIdTx){
    this.sPicking.listarDetalleTransfXTx(strIdTx).then(result=>{
      this.listDetalle = result;
      debugger;
      this.rowCount = this.listDetalle.length;
      this.countPendient = this.listDetalle.reduce((acc, cur) => (cur.Saldo == cur.CantidadPedida) ? ++acc : acc, 0);
      this.countProcess = this.listDetalle.reduce((acc, cur) => ((cur.Saldo != cur.CantidadPedida) && cur.Saldo > 0) ? ++acc : acc, 0);
      this.countConfirm = this.listDetalle.reduce((acc, cur) => (cur.Saldo == 0) ? ++acc : acc, 0);
    });
  }

  cerrarTx(){
    let saldoTotal = this.listDetalle.reduce((sum, c) => sum + c.Saldo, 0);
    let message = (saldoTotal > 0) ? "Existe saldo. ¿Desea cerrar la transacción?" : "¿Estas seguro de cerrar la transacción?";

    let alert = this.alertCtrl.create({
      title: 'Confirmar cierre',
      message: message,
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
            this.sPicking.cerrarTransferenciaXSubAlmacen(this.vParameter.Id_Tx, this.sGlobal.userName).then(result=>{
                let res: any = result;
                if(res != null){
                  this.navCtrl.pop();
                }
            });
          }
        }
      ]
    });
    alert.present();
  }

  goToTransferPage03(data): void{
    let parameter = {
      'Id_Almacen' : this.sGlobal.Id_Almacen,
      'Id_SubAlmacenOrigen': this.vParameter.Id_SubAlmacenOrigen,
      'Id_SubAlmacenDestino': this.vParameter.Id_SubAlmacenDestino,
      'Id_Tx' : data.Id_Tx,
      'Item' : data.Item,
      'Cod_Producto' : data.Codigo,
      'Producto' : data.Producto,
      'Lote' : data.Lote,
      'CantidadPedida' : data.CantidadPedida,
      'Id_Producto' : data.Id_Producto,
      'CantidadOperacion' : data.CantidadOperacion,
      'Saldo' : data.Saldo,
      'Id_UM': data.Id_UM,
      'UM': data.UM
    };

    this.navCtrl.push(TransferPage_03Page, {'vParameter' : parameter});
  }

  ionViewWillEnter(){
    this.listarDetalleTransfXTx(this.vParameter.Id_Tx);
  }
}