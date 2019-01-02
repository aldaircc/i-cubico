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
}
