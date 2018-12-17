import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallePickingPage } from '../detalle-picking/detalle-picking';
import {PickingPorProductoPage} from '../picking-por-producto/picking-por-producto';
import {CierrePickingPage} from '../cierre-picking/cierre-picking';



/**
 * Generated class for the RutaPickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ruta-picking',
  templateUrl: 'ruta-picking.html',
})
export class RutaPickingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goDetallePickingPage():void{
    this.navCtrl.push(DetallePickingPage);
  }  

  goCerrarPickingPage():void{
    this.navCtrl.push(CierrePickingPage);
  }

  goPickingPorProductoPage():void{
    this.navCtrl.push(PickingPorProductoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutaPickingPage');
  }

}




