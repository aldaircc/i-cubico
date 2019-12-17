import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { InventarioPage_03Page } from '../inventario-page-03/inventario-page-03';

/**
 * Generated class for the InventarioPage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario-page-02',
  templateUrl: 'inventario-page-02.html',
})
export class InventarioPage_02Page {

  listProduct: any;
  listPercha: any;
  vParameter: any;
  isCiclico: boolean = false;
  isGeneral: boolean = false;
  countConfirm: number = 0;
  countProcess: number = 0;
  rowCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
    if (this.vParameter.TipoInventario == 'CICLICO') {
      this.isCiclico = true;
      this.listarProductosXUsuarioInventario(this.vParameter.Id_Inventario, this.sGlobal.Id_Almacen, 'ADMIN', this.vParameter.Id_Estado);
    } else if (this.vParameter.TipoInventario == 'GENERAL') {
      this.isGeneral = true;
      this.listarPerchasXUsuarioInventario(this.vParameter.Id_Inventario, this.sGlobal.Id_Almacen, 'ADMIN', this.vParameter.Id_Estado);
    }
  }

  listarProductosXUsuarioInventario(strIdInventario, intIdAlmacen, strUsuario, intIdEstado) {
    this.sInve.listarProductosXUsuarioInventario(strIdInventario, intIdAlmacen, strUsuario, intIdEstado).then(result => {
      this.listProduct = result;
      this.countConfirm = this.listProduct.reduce((acc, cur) => cur.Id_Estado === 10 ? ++acc : acc, 0);
      this.countProcess = this.listProduct.reduce((acc, cur) => cur.Id_Estado === 3 ? ++acc : acc, 0);
      this.rowCount = this.listProduct.length;
    });
  }

  listarPerchasXUsuarioInventario(strIdIventario, intIdAlmacen, strUsuario, intIdEstado) {
    this.sInve.listarPerchasXUsuarioInventario(strIdIventario, intIdAlmacen, strUsuario, intIdEstado).then(result => {
      this.listPercha = result;
      this.countConfirm = this.listPercha.reduce((acc, cur) => cur.Id_Estado === 10 ? ++acc : acc, 0);
      this.countProcess = this.listPercha.reduce((acc, cur) => cur.Id_Estado === 3 ? ++acc : acc, 0);
      this.rowCount = this.listPercha.length;
    });
  }

  goToInventPage03(data): void {    
    var parameter: any;

    parameter = (this.vParameter.TipoInventario == 'GENERAL') ?
      {
        'Fila': data.Fila,
        'Id_Estado': data.Id_Estado,
        'Id_Inventario': data.Id_Inventario,
        'Id_Sector': data.Id_Sector,
        'Sector': data.Sector,
        'UsuarioAsignado': data.UsuarioAsignado,
        'UsuarioInventariador': data.UsuarioInventariador,
        'TipoInventario': this.vParameter.TipoInventario,
        'FechaProgramacion': this.vParameter.FechaProgramacion
      }
      :
      {
        'Id_Inventario': data.Id_Inventario,
        'Id_Estado': data.Id_Estado,
        'Id_Sector': data.Id_Sector,
        'Sector': data.Sector,
        'UsuarioInventariador': data.UsuarioInventariador,
        'UsuarioAsignado': data.UsuarioAsignado,
        'Id_Producto': data.Id_Producto,
        'Codigo': data.Codigo,
        'Producto': data.Producto,
        'Lote': data.Lote,
        'TipoInventario': this.vParameter.TipoInventario,
        'FechaProgramacion': this.vParameter.FechaProgramacion
      }
      ;

    this.navCtrl.push(InventarioPage_03Page, { 'vParameter': parameter });
  }
}
