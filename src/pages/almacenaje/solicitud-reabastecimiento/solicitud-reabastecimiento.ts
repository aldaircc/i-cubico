import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbastecimientoSolicitudPage } from '../../almacenaje/abastecimiento-solicitud/abastecimiento-solicitud'

/**
 * Generated class for the SolicitudReabastecimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitud-reabastecimiento',
  templateUrl: 'solicitud-reabastecimiento.html',
})
export class SolicitudReabastecimientoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getDataOrdenes(){
    this.navCtrl.push(AbastecimientoSolicitudPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitudReabastecimientoPage');
  }

}
