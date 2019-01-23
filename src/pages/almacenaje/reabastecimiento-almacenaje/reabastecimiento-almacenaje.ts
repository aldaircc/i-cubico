import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the ReabastecimientoAlmacenajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reabastecimiento-almacenaje',
  templateUrl: 'reabastecimiento-almacenaje.html',
})
export class ReabastecimientoAlmacenajePage {
  
  fecha: any;
  nomAlmacen: any;
  userDetail: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider) {
    this.fecha = new Date().toISOString();
    this.nomAlmacen = this.sGlobal.nombreAlmacen;
    this.userDetail = this.sGlobal.userName;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReabastecimientoAlmacenajePage');
  }

}
