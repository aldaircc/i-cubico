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
  rowCount : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
    this.listarUAsTransferidasXSubAlmacen(this.vParameter.Id_Tx, this.vParameter.Id_Producto, this.vParameter.Lote, this.vParameter.Id_Ubicacion);
  }

  ionViewDidLoad() {}

  listarUAsTransferidasXSubAlmacen(strIdTx,intId_Producto, strLote, intId_Ubicacion): void{
    this.sPicking.listarUAsTransferidasXSubAlmacen(strIdTx, intId_Producto, strLote, intId_Ubicacion).then(result=>{
      this.listUAsTrans = result;
      this.filterUATransfer(this.bolSinUbi);
    });
  }

  checkboxClicked($event) {
    this.filterUATransfer(this.bolSinUbi);
  }

  filterUATransfer(bolUbi): void{
    this.listAxUATrans = (bolUbi == true) ? this.listUAsTrans.filter(el => el.Id_UbicacionDestino === null): this.listUAsTrans.filter(el=>el.Id_UbicacionDestino != null);
    this.rowCount = this.listAxUATrans.length;
  }

  goToTransferPage06(): void{
    // Cantidad: 2196
    // CantidadOperacion: 170
    // CantidadPedida: 170
    // Cod_Producto: "120502A2602001"
    // Columna: "04"
    // Fila: "B"
    // Id_Producto: 129
    // Id_SubAlmacen: 2
    // Id_Tx: "A20190110001"
    // Id_UM: 13
    // Id_Ubicacion: 43
    // Item: 1
    // Lote: "10603677"
    // Nivel: "01"
    // Posicion: "01"
    // Producto: "PURINOR SUSPENSION x 50 mL M.M."
    // Saldo: 0
    // Sector: "SECTOR PT 1"
    // UM: "UNIDAD"
    // Ubicacion: "SECTOR PT 1 F: B  - N: 1 - C: 4 - P: 1"
    // Ubicacion_2: " F: B  - N: 1 - C: 4 - P: 1"

    if(this.listUAsTrans.length > 0){
      let parameter = {
        'Id_Tx': this.vParameter.Id_Tx,
        'Id_Producto': this.vParameter.Id_Producto,
        'Lote': this.vParameter.Lote,
        'Id_Ubicacion': this.vParameter.Id_Ubicacion,
        'Id_SubAlmacen': this.vParameter.Id_SubAlmacen,
        'Cod_Producto': this.vParameter.Cod_Producto,
        'Producto': this.vParameter.Producto,
        'CantidadPallet': this.listAxUATrans.reduce(function(prev, cur){ return prev + cur.Cantidad }, 0)
      };
      this.navCtrl.push(TransferPage_06Page, { 'vParameter' : parameter });
    }else{
      alert('No existen UAs para reubicar.');
      return;
    }
  }
}
