import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { EmbarquePage_02Page } from '../embarque-page-02/embarque-page-02';

/**
 * Generated class for the EmbarquePage_01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embarque-page-01',
  templateUrl: 'embarque-page-01.html',
})
export class EmbarquePage_01Page {

  listEmbarque: any;
  listAuxEmbarque: any;
  rowCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider,
    public sDesp: DespachoServiceProvider) {
      this.listarPlanificacionXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  listarPlanificacionXUsuario(strUsuario, intIdAlmacen): void{
    this.sDesp.listarPlanificacionXUsuario(strUsuario, intIdAlmacen).then(result=>{
      let res: any = result;
      this.listEmbarque = res;
      this.rowCount = this.listEmbarque.length;
    });
  }

  filterItems(ev: any):void{
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.listEmbarque = this.listEmbarque.filter((item) => {
        return (item.Conductor.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxEmbarque.length;
    } else {
      this.rowCount = this.listEmbarque.length;
      return this.listAuxEmbarque = this.listEmbarque;
    }
  }

  goToEmbarPage02(obj):void{
    let parameter = {
       'Id_Tra': obj.Id_Tra,
       'Id_Conductor': obj.Id_Conductor,
       'Conductor': obj.Conductor,
       'Documento': obj.Documento,
       'Id_Vehiculo': obj.Id_Vehiculo,
       'Placa': obj.Placa
    };

    this.navCtrl.push(EmbarquePage_02Page, { 'vParameter': parameter });
  }

}
