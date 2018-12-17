import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallePorProductoPage } from '../detalle-por-producto/detalle-por-producto'
import { ReabastecimientoPage } from '../reabastecimiento/reabastecimiento'

/**
 * Generated class for the PickingPorProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picking-por-producto',
  templateUrl: 'picking-por-producto.html',
})
export class PickingPorProductoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goDetallePorProductoPage():void{
    this.navCtrl.push(DetallePorProductoPage);
  }

  goReabastecimientoPage():void{
    this.navCtrl.push(ReabastecimientoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPorProductoPage');
  }

}
