import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EtiquetadoPage_01Page } from '../etiquetado-page-01/etiquetado-page-01';
import { EtiquetadoSeriesPage } from '../etiquetado-series/etiquetado-series';

/**
 * Generated class for the OpcionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opciones',
  templateUrl: 'opciones.html',
})
export class OpcionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionesPage');
  }

  goGeneralPage(): void {
    this.navCtrl.push(EtiquetadoPage_01Page , { codePage: 7 });
  }

  goSeriesPage(): void {
    this.navCtrl.push(EtiquetadoSeriesPage , { codePage: 7 });
  }


}
