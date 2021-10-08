import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_06Page } from '../embalaje-page-06/embalaje-page-06';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the EmbalajePage_07Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-07',
  templateUrl: 'embalaje-page-07.html',
})
export class EmbalajePage_07Page {

  listBalanza: any;
  pesoFisico: number;
  vNroBulto: number;
  vNroBultoCeros: any;
  vEmbalajePage02: any;
  vDetalleDespacho: any = [];
  vPage: any;
  IdBalanza: number = 0;
  @ViewChild('selectFormat') selectFormat: Select;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sEmbalaje: EmbalajeServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vNroBulto = navParams.get('dataNroBulto');
    this.vNroBultoCeros = navParams.get('dataNroBultoCeros');
    this.vEmbalajePage02 = navParams.get('dataPage02');
    this.sGlobal.resultGrabarBulto = false; 
  }

  getDataBalanzasXAlmacen() {
    this.ListarBalanzasXAlmacen(2);
  }

  ListarBalanzasXAlmacen(intId_almacen) {
    this.sEmbalaje.ListarBalanzasXAlmacen(intId_almacen).then((result) => {
      this.listBalanza = result;
      if (this.listBalanza.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  ionViewWillEnter() {
    this.getDataBalanzasXAlmacen();
  }

  onChange() {
    debugger
    let obj = this.listBalanza.filter(x => x.IdBalanza == this.IdBalanza)[0];
  }

  validarCampos() {
    var message = "";
    if (this.IdBalanza == 0) {
      message = "Seleccione una balanza";
      setTimeout(() => {
        this.selectFormat.open();
      }, 500);
      return message;
    }
    if (!this.pesoFisico) {
      this.pesoFisico = 0;
    }
    return message;
  }

  goDetalleDespacho() {
    debugger;
    let message = this.validarCampos();
    if (message.length > 0) {
      alert(message);
      return;
    }
    var resultFor = false;
    this.navCtrl.getViews().forEach(item => {
      debugger;
      if (item.name == 'EmbalajePage_06Page') {
        debugger;
        resultFor = true;
        this.sGlobal.resultObtenerPeso = true;
        this.sGlobal.pesoBulto = this.pesoFisico;
        this.navCtrl.popTo(item);
      }
    });

    if (!resultFor) {
      this.sGlobal.resultObtenerPeso = true;
      this.sGlobal.pesoBulto = this.pesoFisico;
      this.navCtrl.push(EmbalajePage_06Page, {
        dataNroBulto: this.vNroBulto, dataNroBultoCeros: this.vNroBultoCeros,
        dataPage02: this.vEmbalajePage02
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_07Page');
  }
}
