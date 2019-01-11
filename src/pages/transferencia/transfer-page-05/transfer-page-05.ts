import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { TransferPage_06Page } from '../transfer-page-06/transfer-page-06';

/**
 * Generated class for the TransferPage_05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-page-05',
  templateUrl: 'transfer-page-05.html',
})
export class TransferPage_05Page {

  vParameter: any;
  listUAsTrans: any;
  listAxUATrans: any;
  bolSinUbi: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public sGlobal: GlobalServiceProvider) {
    debugger;
    this.vParameter = this.navParams.get('vParameter');
    this.listarUAsTransferidasXSubAlmacen(this.vParameter.Id_Tx, this.vParameter.Id_Producto, this.vParameter.Lote, this.vParameter.Id_Ubicacion);
  }

  ionViewDidLoad() {
    
  }

  listarUAsTransferidasXSubAlmacen(strIdTx,intId_Producto, strLote, intId_Ubicacion): void{
    debugger;
    this.sPicking.listarUAsTransferidasXSubAlmacen(strIdTx, intId_Producto, strLote, intId_Ubicacion).then(result=>{
      debugger;
      this.listUAsTrans = result;
      this.listAxUATrans = this.listUAsTrans;
    });
  }

  checkboxClicked($event) {
    debugger;
    this.listAxUATrans = (this.bolSinUbi == true) ? this.listUAsTrans.filter(el => el.Id_UbicacionDestino === null): this.listUAsTrans.filter(el=>el.Id_UbicacionDestino != null);
    console.log('new value' + this.bolSinUbi);

    // this.booksByStoreID = this.books.filter(
    //   book => book.store_id === this.store.id);

    // btnChangeUbi.Visible = chkWithOutUbication.Checked;
    // lstAuxUAsTransfer = (chkWithOutUbication.Checked == true) ?
    //     lstUAsTransferidas.Where(x => x.Id_UbicacionDestino == null).ToList()
    //     : lstUAsTransferidas;

    // smgListUAs.DataSource = lstAuxUAsTransfer;
  }

  goToTransferPage06(): void{
    debugger;
    if(this.listUAsTrans.length > 0){
      let parameter = {};
      this.navCtrl.push(TransferPage_06Page, { 'vParameter' : parameter });
  //               manejoPaneles(6);
  //               lblCodProduct06.Text = strCodProduct.ToString();
  //               lblProductName06.Text = producto;
  //               lblCantPalletUbiDest.Text = lstAuxUAsTransfer.Sum(x => x.Cantidad).ToString();
  //               btnTransferSubAl.Enabled = false;

  //               txtIdUbication.Text = string.Empty;
  //               txtColUbiDest.Text = string.Empty;
  //               txtRowUbiDest.Text = string.Empty;
  //               txtLevelUbiDest.Text = string.Empty;
  //               txtPosUbiDest.Text = string.Empty;
    }else{
      alert('No existen UAs para reubicar.');
      return;
    }
  }
}
