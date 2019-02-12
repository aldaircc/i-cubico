import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { InventarioPage_04Page } from '../inventario-page-04/inventario-page-04';

/**
 * Generated class for the InventarioPage_06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario-page-06',
  templateUrl: 'inventario-page-06.html',
})
export class InventarioPage_06Page {

  vParameter: any;
  listUbicacion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
  }

  listarUbicacionesSugeridasXProducto(intIdProducto, strLote, intIdAlmacen): void{
    this.sInve.listarUbicacionesSugeridasXProducto(intIdProducto, strLote, intIdAlmacen).then(result=>{
      this.listUbicacion = result;
      this.listUbicacion.forEach(el => {
        debugger;
        el.cantidadxUbicacion = this.listUbicacion.reduce((acc, cur) => cur.Id_Ubicacion === el.Id_Ubicacion ? ++acc : acc, 0);
      });
    });
  }
  
  ionViewWillEnter(){
    this.listarUbicacionesSugeridasXProducto(this.vParameter.Id_Producto, this.vParameter.Lote, this.sGlobal.Id_Almacen);
  }

  goToInventPage04(obj): void{
    debugger;
    var parameter: any;

    parameter = (this.vParameter.TipoInventario == 'GENERAL') ? 
      {
        'Fila': this.vParameter.Fila,
        'Id_Estado': this.vParameter.Id_Estado,
        'Id_Inventario': this.vParameter.Id_Inventario,
        'Id_Sector': this.vParameter.Id_Sector,
        'Sector': this.vParameter.Sector,
        'UsuarioAsignado': this.vParameter.UsuarioAsignado,
        'UsuarioInventariador': this.vParameter.UsuarioInventariador,
        'TipoInventario': this.vParameter.TipoInventario
      }
    :
      {
        'Id_Inventario' : this.vParameter.Id_Inventario,
        'Id_Estado' : this.vParameter.Id_Estado,
        'UsuarioInventariador' : this.vParameter.UsuarioInventariador,
        'UsuarioAsignado' : this.vParameter.UsuarioAsignado,
        'Id_Producto' : this.vParameter.Id_Producto,
        'Codigo' : this.vParameter.Codigo,
        'Producto' : this.vParameter.Producto,
        'Lote' : this.vParameter.Lote,
        'TipoInventario': this.vParameter.TipoInventario,
        
        'CodigoBarra': obj.CodigoBarra,
        'Columna': obj.Columna,
        'Fila': obj.Fila,
        'FlagTransito': obj.FlagTransito,
        'Id_Sector': obj.Id_Sector,
        'Id_Ubicacion': obj.Id_Ubicacion,
        'Nivel': obj.Nivel,
        'Posicion': obj.Posicion,
        'Sector': obj.Sector,
        'cantidadxUbicacion': obj.cantidadxUbicacion
      };

    this.navCtrl.push(InventarioPage_04Page, { 'vParameter': parameter });
  }
}
