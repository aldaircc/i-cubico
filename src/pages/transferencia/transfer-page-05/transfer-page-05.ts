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
  }

  listarUAsTransferidasXSubAlmacen(strIdTx,intId_Producto, strLote, intId_Ubicacion): void{
    this.sPicking.listarUAsTransferidasXSubAlmacen(strIdTx, intId_Producto, strLote, intId_Ubicacion).then(result=>{
      
      var res: any = result;
      var strSector = "";
      res.forEach(el => {
        let dataUbi = el.UbicacionDestino.split('-');
        dataUbi.forEach(cel => {
          let val = cel.split(':');
          if(val[0].trim().length > 1){
            strSector = val[0].substring(0, val[0].length - 1).trim();
            el.Sector = strSector;
            el.Fila = val[1].trim();
          }else{
            switch (val[0].trim()){
              case  'F': 
                el.Fila = (parseInt(val[1]) <= 9) ? "0" + val[1].trim() : val[1].trim();
                break;
              case  'N': 
                el.Nivel = (parseInt(val[1]) <= 9) ? "0" + val[1].trim() : val[1].trim();
                break;
              case  'C': 
                el.Columna = (parseInt(val[1]) <= 9) ? "0" + val[1].trim() : val[1].trim();
                break;
              case  'P': 
                el.Posicion = (parseInt(val[1]) <= 9) ? "0" + val[1].trim() : val[1].trim();
                break;
              default:
                break;
            }
          }
        });
        el.Ubicacion_2 = el.UbicacionDestino.replace(strSector, '');
      });

      this.listUAsTrans = res;
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
    if(this.listAxUATrans.length > 0){
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

  ionViewWillEnter(){
    this.listarUAsTransferidasXSubAlmacen(this.vParameter.Id_Tx, this.vParameter.Id_Producto, this.vParameter.Lote, this.vParameter.Id_Ubicacion);
  }
}
