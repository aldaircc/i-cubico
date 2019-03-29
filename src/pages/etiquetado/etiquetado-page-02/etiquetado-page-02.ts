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
  rowCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public sEtq: EtiquetadoServiceProvider, public sGlobal: GlobalServiceProvider) {
      this.listarCuentasXAlmacenUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen, 0);
  }

  filtrarProducto(): void{
    let message = this.validarCampos();
    if(message.length > 0){
      alert(message);
      return;
    }

    this.listarProductoXFiltro(this.tipoFiltro, this.filterText, this.IdCuenta);
  }

  validarCampos(){
    var message = "";
    if(this.IdCuenta == 0){
      message = "Seleccione una cuenta";
      return message;
    }

    if(this.tipoFiltro == 0){
      message = "Seleccione un tipo de filtro"
      return message;
    }

    if(this.filterText.trim() == ""){
      message = "Ingrese filtro";
      return message;
    }
    return message;
  }

  selectCard(data){
      this.navCtrl.pop().then(() => {
        data.IdCuentaLPN = this.IdCuenta;
        this.navParams.get('producto')(data);
      });
  }

  listarCuentasXAlmacenUsuario(strUsuario, intIdAlmacen, intIdCuenta): void{
    this.sEtq.listarCuentasXAlmacenUsuario(strUsuario, intIdAlmacen, intIdCuenta).then(result=>{
      this.listCuentaAlmac = result;
    });
  }

  listarProductoXFiltro(intTipo, strFiltro, intIdCuenta): void{
    this.sEtq.listarProductoXFiltro(intTipo, strFiltro, intIdCuenta).then(result=>{
      this.listFilter = result;
      this.rowCount = this.listFilter.length;
      if(this.listFilter.length == 0){
        alert('No se encontraron resultados');
      }
    });
  }  
}
