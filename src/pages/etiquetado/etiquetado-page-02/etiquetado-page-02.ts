import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EtiquetadoServiceProvider } from '../../../providers/etiquetado-service/etiquetado-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the EtiquetadoPage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etiquetado-page-02',
  templateUrl: 'etiquetado-page-02.html',
})
export class EtiquetadoPage_02Page {

  listCuentaAlmac: any;
  listFilter: any;
  tipoFiltro: number = 0;
  IdCuenta: number = 0;
  filterText: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public sEtq: EtiquetadoServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.listarCuentasXAlmacenUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen, 0);
  }

  ionViewDidLoad() {
    
  }

  filtrarProducto(): void{
    debugger;
    this.listarProductoXFiltro(this.tipoFiltro, this.filterText, this.IdCuenta);
  }

  listarCuentasXAlmacenUsuario(strUsuario, intIdAlmacen, intIdCuenta): void{
    this.sEtq.listarCuentasXAlmacenUsuario(strUsuario, intIdAlmacen, intIdCuenta).then(result=>{
      this.listCuentaAlmac = result;
    });
  }

  listarProductoXFiltro(intTipo, strFiltro, intIdCuenta): void{
    this.sEtq.listarProductoXFiltro(intTipo, strFiltro, intIdCuenta).then(result=>{
      this.listFilter = result;
    });
  }  
}
