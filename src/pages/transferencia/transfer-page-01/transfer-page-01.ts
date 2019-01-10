import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { TransferPage_02Page } from '../transfer-page-02/transfer-page-02';

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
  rowCount: number = 0;
  countConfirm: number = 0;
  countProcess: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public sGlobal: GlobalServiceProvider, public sPicking: PickingServiceProvider,
    public alertCtrl: AlertController) { }

  listarTransferenciaSubAlmacenXUsuario(strUsuario, intIdAlmacen){
    this.sPicking.listarTransferenciaSubAlmacenXUsuario("ADMIN", intIdAlmacen).then(result=>{
      this.listTransf = result;
      this.countConfirm = this.listTransf.reduce((acc, cur) => cur.Id_Estado === 3 ? ++acc : acc, 0);
      this.countProcess = this.listTransf.reduce((acc, cur) => cur.Id_Estado === 1 ? ++acc : acc, 0);
      this.rowCount = this.listTransf.length;
    });
  }

  goToTransferPage02(data){
    console.log('Data selected', data);
    let parameter = {
      'Id_Tx' : data.Id_Tx,
      'FechaDocumento' : data.FechaDocumento,
      'Cuenta' : data.Cuenta,
      'Id_SubAlmacenOrigen' : data.Id_SubAlmacenOrigen,
      'Id_SubAlmacenDestino' : data.Id_SubAlmacenDestino
    };

    this.navCtrl.push(TransferPage_02Page, { 'vParameter': parameter });
    
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

   selected = [];
  
   open(row) {
  //   debugger;
  //   let alert = this.alertCtrl.create({
  //     title: 'Row',
  //     message: `${row.name} is ${row.age} years old!`,
  //     buttons: ['OK']
  //   });
  //   alert.present();
   }

   onSelect({ selected }) {
  //   console.log('Select Event', selected, this.selected);
   }

   onActivate(event) {
  //   console.log('Activate Event', event);
   }

   ionViewWillEnter(){
      this.listarTransferenciaSubAlmacenXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
   }
}
