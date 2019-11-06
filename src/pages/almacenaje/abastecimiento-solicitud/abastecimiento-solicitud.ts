import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReubicarSolicitudPage } from '../../almacenaje/reubicar-solicitud/reubicar-solicitud'

/**
 * Generated class for the AbastecimientoSolicitudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abastecimiento-solicitud',
  templateUrl: 'abastecimiento-solicitud.html',
})
export class AbastecimientoSolicitudPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  limpiar(){
    this.navCtrl.push(ReubicarSolicitudPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbastecimientoSolicitudPage');
  }

}
