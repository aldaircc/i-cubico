import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';

/**
 * Generated class for the EmbarquePage_03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embarque-page-03',
  templateUrl: 'embarque-page-03.html',
})
export class EmbarquePage_03Page {

  vParameter: any;
  listDetalle: any;
  rowCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sDesp: DespachoServiceProvider) {
      
      this.vParameter = this.navParams.get('vParameter');
      this.listarSubBultosLeidos(this.vParameter.Id_Tra, 2);
  }

  listarSubBultosLeidos(strTransaccion, tipo): void{
    this.sDesp.listarSubBultosLeidos(strTransaccion, tipo).then(result=>{
      this.listDetalle = result;
      this.rowCount = this.listDetalle.length;
    });
  }
}
