import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the TransferPage_06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-page-06',
  templateUrl: 'transfer-page-06.html',
})
export class TransferPage_06Page {
  
  vParameter: any;
  strUbicacion: string = "";
  fila: string = "";
  columna: string = "";
  nivel: string = "";
  posicion: string = "";
  isDisabledButton: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
  }

  ionViewDidLoad() {}

  validarUbicacion(){
    if(this.strUbicacion.trim() != ""){
      if(this.strUbicacion != this.vParameter.Id_Tx){
      //             initUbicacionXBarCode(txtIdUbication, control.Global.IdAlmacen);
        this.isDisabledButton = false;
      }else{
        alert('El código de ubicación ingresada debe ser distinta a la actual.');
        return;
      }
    }else{
      alert('Ingrese código de ubicación');
      this.strUbicacion = "";
      this.isDisabledButton = true;
      return;
    }
  }

  transferir(){
    //this.reubicarUAsXSubAlmacen();
  }

  reubicarUAsXSubAlmacen(strIdTx, intIdProducto, strLote, intIdUbicacionOrigen, intIdUbicacionDestino, intIdAlmacen, intIdSubAlmacen, strUser): void{
    debugger;
    this.sPicking.reubicarUAsXSubAlmacen(strIdTx, intIdProducto, strLote, intIdUbicacionOrigen, intIdUbicacionDestino, intIdAlmacen, intIdSubAlmacen, strUser)
    .then(result=>{
      debugger;
      let res: any = result;

      if(res.errNumber == 0){
        this.navCtrl.pop();
      }
    });
  }
}
