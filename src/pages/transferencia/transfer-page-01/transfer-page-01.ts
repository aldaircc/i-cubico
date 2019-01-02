import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';

/**
 * Generated class for the TransferPage_01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-page-01',
  templateUrl: 'transfer-page-01.html',
})
export class TransferPage_01Page {

  listTransf : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public sGlobal: GlobalServiceProvider, public sPicking: PickingServiceProvider) {
      this.listarTransferenciaSubAlmacenXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  listarTransferenciaSubAlmacenXUsuario(strUsuario, intIdAlmacen){
    this.sPicking.listarTransferenciaSubAlmacenXUsuario(strUsuario, intIdAlmacen).then(result=>{
      this.listTransf = result;
    });
  }

  goToPage02(){
    
    // if (smartGridTx.SelectedCell.RowIndex == -1)
    // {
    //     Resco.Controls.MessageBox.MessageBoxEx.Show(" Seleccione una transacción ", "Picking",
    //     MessageBoxButtons.OK, MessageBoxIcon.Asterisk, MessageBoxDefaultButton.Button2);
    //     return;
    // }
    // else
    // {
    //     string strIdTx = smartGridTx.Cells[smartGridTx.SelectedCell.RowIndex, 0].Text;
    //     lblNumTx.Text = smartGridTx.Cells[smartGridTx.SelectedCell.RowIndex, 0].Text;
    //     lblFecReg.Text = Convert.ToDateTime(smartGridTx.Cells[smartGridTx.SelectedCell.RowIndex, 1].Text).ToShortDateString();
    //     lblCuenta.Text = smartGridTx.Cells[smartGridTx.SelectedCell.RowIndex, 2].Text;
    //     intIdSubAlmacenOrigen = Convert.ToInt32(smartGridTx.Cells[smartGridTx.SelectedCell.RowIndex, 6].Data);
    //     intIdSubAlmacenDestino = Convert.ToInt32(smartGridTx.Cells[smartGridTx.SelectedCell.RowIndex, 7].Data);

    //     initDetailTx(strIdTx);
    //     manejoPaneles(2);
    // }
  }
}
