import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { InventarioPage_02Page } from '../inventario-page-02/inventario-page-02';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';

/**
 * Generated class for the InventarioPage_01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario-page-01',
  templateUrl: 'inventario-page-01.html',
})
export class InventarioPage_01Page {

  listInvent: any;
  rowCount: number = 0;
  countConfirm: number = 0;
  countProcess: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
  }

  ionViewWillEnter() {
    this.listarInventarioXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  listarInventarioXUsuario(strUsuario, intIdAlmacen): void {
    this.sInve.listarInventarioXUsuario(strUsuario, intIdAlmacen).then(result => {
      this.listInvent = result;
      this.countConfirm = this.listInvent.reduce((acc, cur) => cur.Id_Estado === 10 ? ++acc : acc, 0);
      this.countProcess = this.listInvent.reduce((acc, cur) => cur.Id_Estado === 3 ? ++acc : acc, 0);
      this.rowCount = this.listInvent.length;
    });
  }

  goToInventPage02(data): void {
    let parameter = {
      'Id_Inventario': data.Id_Inventario,
      'FechaProgramacion': data.FechaProgramacion,
      'FechaCierre': data.FechaCierre,
      'Id_Estado': data.Id_Estado,
      'TipoInventario': data.TipoInventario
    }
    this.navCtrl.push(InventarioPage_02Page, { 'vParameter': parameter });
  }
}
