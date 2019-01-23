import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the TransitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transito',
  templateUrl: 'transito.html',
})
export class TransitoPage {

  nomAlmacen: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider) {
  this.nomAlmacen = this.sGlobal.nombreAlmacen;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransitoPage');
  }

}
