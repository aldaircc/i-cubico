import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { EmbarquePage_03Page } from '../embarque-page-03/embarque-page-03';

/**
 * Generated class for the EmbarquePage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embarque-page-02',
  templateUrl: 'embarque-page-02.html',
})
export class EmbarquePage_02Page {

  vParameter :any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider,
    public sDesp: DespachoServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
  }

  goToEmbarPage03(obj):void{
    let parameter = {
      'Id_Tra': obj.Id_Tra,
      'Id_Conductor': obj.Id_Conductor,
      'Conductor': obj.Conductor,
      'Documento': obj.Documento,
      'Id_Vehiculo': obj.Id_Vehiculo,
      'Placa': obj.Placa
   };
   
   this.navCtrl.push(EmbarquePage_03Page, { 'vParameter': parameter });
  }
}
