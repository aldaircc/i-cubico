import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public sPicking: PickingServiceProvider,
    public sGlobal: GlobalServiceProvider) {
      this.vParameter = this.navParams.get('vParameter');
      this.listarDetalleTransfXTx(this.vParameter.Id_Tx);
  }

  listarDetalleTransfXTx(strIdTx){
    this.sPicking.listarDetalleTransfXTx(strIdTx).then(result=>{
      this.listDetalle = result;
      this.rowCount = this.listDetalle.length;
    });
  }

  cerrarTx(){
//     if (smartGridTx.SelectedCell == null)
//     {
//         Resco.Controls.MessageBox.MessageBoxEx.Show("Seleccione una transacción.", "Picking");
//         return;
//     }
//     else
//     {
//         string contentMessage = string.Empty;
//         decimal totalSaldo = 0;
//         totalSaldo = lstDetailTx.Sum(x => x.Saldo).Value;
//         contentMessage = (totalSaldo > 0) ? "Existe saldo. ¿Desea cerrar la transacción?" : "¿Estas seguro de cerrar la transacción?";

//         if ((Resco.Controls.MessageBox.MessageBoxEx.Show(contentMessage, "Confirmar",
// MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button1)) == DialogResult.Yes)
//         {
//             message = closeTransferXSubAlmacen(lblNumTx.Text, control.Global.Usuario);
this.sPicking.cerrarTransferenciaXSubAlmacen("NumTx", this.sGlobal.userName).then(result=>{
    let res: any = result;
    if(res != null){
      //regresar a la pagina 01
    }
});
//CerrarTransferenciaXSubAlmacen
//             if (message != null)
//             {
//                 LoadTxList();
//                 //initDetailTx(strIdTx);
//                 manejoPaneles(1);
//             }
//         }
    // }
  }
}
