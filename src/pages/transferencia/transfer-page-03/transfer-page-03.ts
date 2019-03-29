import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { TransferPage_04Page } from '../transfer-page-04/transfer-page-04';

/**
 * Generated class for the TransferPage_03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-page-03',
  templateUrl: 'transfer-page-03.html',
})
export class TransferPage_03Page {

  vParameter : any;
  listUbiLote : any;
  rowCount : number = 0;
  lote: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sGlobal: GlobalServiceProvider, public sPicking: PickingServiceProvider) {
      this.vParameter = this.navParams.get('vParameter');
  }

  listarStockProductoXUbicaciones(intIdAlmacen, intIdSubAlmacenOrigen, intIdProducto, strLote){
    this.sPicking.listarStockProductoXUbicaciones(intIdAlmacen, intIdSubAlmacenOrigen, intIdProducto, strLote).then(result=>{
      let res:any = result;
      var strSector;
      res.forEach(el => {
        let dataUbi = el.Ubicacion.split('-');
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
        el.Ubicacion_2 = el.Ubicacion.replace(strSector, '');
      });
      this.listUbiLote = res;
      this.lote = (this.listUbiLote.length > 0) ? this.listUbiLote[0].Lote : '';
      this.rowCount = this.listUbiLote.length;
    });
  }

  goToTransferPage04(data):void{
    let parameter = {
      'CantidadOperacion': this.vParameter.CantidadOperacion,
      'CantidadPedida': this.vParameter.CantidadPedida,
      'Cod_Producto': this.vParameter.Cod_Producto,
      'Id_Producto': this.vParameter.Id_Producto,
      'Id_SubAlmacenOrigen': this.vParameter.Id_SubAlmacenOrigen,
      'Id_SubAlmacenDestino': this.vParameter.Id_SubAlmacenDestino,
      'Id_Tx': this.vParameter.Id_Tx,
      'Id_UM': this.vParameter.Id_UM,
      'Item': this.vParameter.Item,
      'Lote': this.vParameter.Lote,
      'Producto': this.vParameter.Producto,
      'Saldo': this.vParameter.Saldo,
      'UM': this.vParameter.UM, 

      'Cantidad' : data.Cantidad,
      'Id_Ubicacion' : data.Id_Ubicacion,
      'Ubicacion' : data.Ubicacion,
      'Ubicacion_2' : data.Ubicacion_2,
      'Sector' : data.Sector,
      'Fila' : data.Fila,
      'Columna' : data.Columna,
      'Nivel' : data.Nivel,
      'Posicion' : data.Posicion
    };
    
    this.navCtrl.push(TransferPage_04Page, { 'vParameter': parameter });
  }

  ionViewWillEnter(){
    this.listarStockProductoXUbicaciones(this.sGlobal.Id_Almacen, this.vParameter.Id_SubAlmacenOrigen, this.vParameter.Id_Producto, this.vParameter.Lote);
  }
}
