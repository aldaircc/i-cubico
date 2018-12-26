import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController , public sRecibo: ReciboServiceProvider,
    public sGlobal: GlobalServiceProvider) {
    this.vReciboPage03 = navParams.get('dataPage03');
    console.log('data received - Page 03', this.vReciboPage03);
    this.listarUAXProductoTx(this.vReciboPage03.Id_Tx, this.vReciboPage03.Id_Articulo, this.vReciboPage03.Item);
  }

  ionViewDidLoad() {
    
  }

  listarUAXProductoTx(strIdTx, intIdProducto, intItem){
    this.sRecibo.listarUAXProductoTx(strIdTx, intIdProducto, intItem).then(result=>{
      this.listBulto = result;
    });
  }

  deleteItem(data){

    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: '¿Esta seguro de eliminar el registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            //eliminar
            let objUA = {
              'UA_CodBarra': data.UA_CodBarra,
              'Id_Tx': 'A201899999999', //data.Id_Tx,
              'Id_Producto': data.Id_Producto,
              'LoteLab': data.LoteLab,
              'FechaEmision' : "/Date("+ new Date() +")/",
              'FechaVencimiento' : "/Date("+ new Date() +")/",
              'FechaIngreso' : "/Date("+ new Date() +")/",
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
    debugger;
    if(this.vReciboPage03.Id_TipoMovimiento == 0){
      alert('Esta transacción no tiene tipo de movimiento');
      return;
    }

    if(this.vReciboPage03.Id_TipoMovimiento == 11 || this.vReciboPage03.Id_TipoMovimiento == 13 || this.vReciboPage03.Id_TipoMovimiento == 14){
      this.sRecibo.registrarUATransferencia(objUA).then(result=>{
        debugger;
        console.log('UA transferencia', result);
        this.listarUAXProductoTx(this.vReciboPage03.Id_Tx, this.vReciboPage03.Id_Articulo, this.vReciboPage03.Item);
      });
    }else{
      this.sRecibo.registrarUA(objUA).then(result=>{
        debugger;
        console.log('Registrar UA', result);
        this.listarUAXProductoTx(this.vReciboPage03.Id_Tx, this.vReciboPage03.Id_Articulo, this.vReciboPage03.Item);
      });
    }
  }
}
