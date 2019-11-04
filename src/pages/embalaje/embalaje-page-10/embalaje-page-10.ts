import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';

/**
 * Generated class for the EmbalajePage_10Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-10',
  templateUrl: 'embalaje-page-10.html',
})
export class EmbalajePage_10Page {

  vlistDetEmbalajeTop1: any;
  vlistAuxDetEmbalaje: any;
  vnroBulto: any;

  vListaTransac: any;

  vlistTransacDetEmbalaje: any;
  vEmbalajePage02: any;
  vProducto: any;
  rowCount: any;

  vNroItemVisual: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    debugger;
    //this.vlistDetEmbalajeTop1 = navParams.get('listDetEmbalajeTop1');
    //this.vlistAuxDetEmbalaje = navParams.get('listAuxDetEmbalaje');

    this.vnroBulto = navParams.get('nroBulto');
    this.vlistTransacDetEmbalaje = navParams.get('listTransacDetEmbalaje');
    this.vEmbalajePage02 = navParams.get('dataPage02');
    this.vNroItemVisual = navParams.get('nroItemVisual');
    this.vProducto = navParams.get('descProducto');
    this.rowCount = this.vlistTransacDetEmbalaje.length;
  }


  goToEmbalajePage04(data) {
    debugger;
    this.vListaTransac = {
      'CantidadEmbalado': data.CantidadEmbalado,
      'CantidadPicking': data.CantidadPicking,
      'Id_Producto': data.Id_Producto,
      'Id_Tx': data.Id_Tx,
      'Item': data.Item,
      'Lote': data.Lote
    };

    this.navCtrl.push(EmbalajePage_04Page, {
      page: 10,
      //dataPageFiltro: this.vlistDetEmbalajeTop1,
      //dataTotalPage03: this.vlistAuxDetEmbalaje,
      nroBulto: this.vnroBulto,
      dataPage02: this.vEmbalajePage02,
      lstTransac: this.vListaTransac,
      nroItemVisual : this.vNroItemVisual
      //,nomProducto: this.vProducto
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_10Page');
  }
}
