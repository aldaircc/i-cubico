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
      debugger;
    this.vParameter = this.navParams.get('vParameter');
    this.listarStockProductoXUbicaciones(this.sGlobal.Id_Almacen, this.vParameter.Id_SubAlmacenOrigen, this.vParameter.Id_Producto, this.vParameter.Lote);
  }

  ionViewDidLoad() {
    
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
      debugger;
      this.listUbiLote = res;
      this.lote = (this.listUbiLote.length > 0) ? this.listUbiLote[0].Lote : '';
      this.rowCount = this.listUbiLote.length;
    });
  }

  goToTransferPage04(data):void{
    console.log('data selected page 04', data);
    debugger;
    let parameter = {
      'CantidadOperacion': this.vParameter.CantidadOperacion,
      'CantidadPedida': this.vParameter.CantidadPedida,
      'Cod_Producto': this.vParameter.Cod_Producto,
      'Id_Producto': this.vParameter.Id_Producto,
      'Id_SubAlmacen': this.vParameter.Id_SubAlmacenOrigen,
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
    // var row = lstDetailTx.Where(x => x.Id_Tx.Equals(strIdTx)).FirstOrDefault();
    // cantidad = row.CantidadPedida.Value;
    // intIdProducto = row.Id_Producto;
    // decCantOper = row.CantidadOperacion.Value;
    // decSaldo = row.Saldo.Value;

    // cantUA = decCantOper;
    // lblCodProduct04.Text = strCodProduct;
    // lblProductName04.Text = producto;
    // txtSaldo.Text = decSaldo.ToString();
    // txtCountRecib.Text = decCantOper.ToString();
    // txtLoteProd.Text = strLote;
    // txtCountProd.Text = cantidad.ToString();

    // string[] dataUbication = smgUbic.Cells[smgUbic.SelectedCell.RowIndex, 1].Text.Split('-');
    // List<string> ubication = new List<string>();
    // foreach (string item in dataUbication)
    // {
    //     ubication.Add(item.Split(':')[1]);
    // }
    // txtRow.Text = ubication[0];
    // txtColumn.Text = ubication[1];
    // txtLevel.Text = ubication[2];
    // txtPosition.Text = ubication[3];
    // intIdUbicacion = Convert.ToInt32(smgUbic.Cells[smgUbic.SelectedCell.RowIndex, 0].Text);
    // lblIdTx.Text = intIdUbicacion.ToString();
    // lblIdTx.Tag = smgUbic.Cells[smgUbic.SelectedCell.RowIndex, 1].Text;
    // manejoPaneles(4);
    // btnPickingUA.Enabled = false;
    // setColorBasePanelVerify();
    // txtCountUA.Text = string.Empty;
    // txtBarCode.Text = string.Empty;
    this.navCtrl.push(TransferPage_04Page, { 'vParameter': parameter });
  }

}
