import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
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

  @ViewChild('txtFiltro') txtFiltroRef;
  @ViewChild('selectFormat') selectFormat: Select;
  @ViewChild('txtFiltro', { read: ElementRef }) private txtFiltro: ElementRef;

  listCuentaAlmac: any;
  listFilter: any;
  tipoFiltro: number = 0;
  IdCuenta: number = 0;
  filterText: string = "";
  rowCount: string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sEtq: EtiquetadoServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.listarCuentasXAlmacenUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen, 0);
  }

  filtrarProducto(): void {
    let message = this.validarCampos();
    if (message.length > 0) {
      alert(message);
      return;
    }
    this.listarProductoXFiltro(this.tipoFiltro, this.filterText, this.IdCuenta);
  }

  validarCampos() {
    var message = "";
    if (this.IdCuenta == 0) {
      message = "Seleccione una cuenta";
      setTimeout(() => {
        this.selectFormat.open();
      }, 500);
      return message;
    }

    if (this.tipoFiltro == 0) {
      message = "Seleccione un tipo de filtro"
      return message;
    }

    if (this.filterText.trim() == "") {
      message = "Ingrese filtro";
      setTimeout(() => {
        this.selectAll(this.txtFiltro);
      }, (500));
      return message;
    }
    return message;
  }

  selectCard(data) {
    debugger;
    this.navCtrl.pop().then(() => {
      data.IdCuentaLPN = this.IdCuenta;
      this.navParams.get('producto')(data);
    });
  }

  onChangeRadio() {
    if (this.tipoFiltro == 1 || this.tipoFiltro == 2 || this.tipoFiltro == 3) {
      setTimeout(() => {
        this.selectAll(this.txtFiltro);
      }, (500));
    }
  }

  listarCuentasXAlmacenUsuario(strUsuario, intIdAlmacen, intIdCuenta): void {
    this.sEtq.listarCuentasXAlmacenUsuario(strUsuario, intIdAlmacen, intIdCuenta).then(result => {
      debugger;
      this.listCuentaAlmac = result;
    });
  }

  onChange() {
    debugger
    let obj = this.listCuentaAlmac.filter(x => x.Id_Cuenta == this.IdCuenta)[0];
    this.sGlobal.nombreEmpresa = obj.NombreCuenta;
  }

  listarProductoXFiltro(intTipo, strFiltro, intIdCuenta): void {
    this.sEtq.listarProductoXFiltro(intTipo, strFiltro, intIdCuenta).then(result => {
      debugger;
      this.listFilter = result;
      debugger;
      this.rowCount = this.listFilter.length;
      if (this.listFilter.length == 0) {
        alert('No se encontraron resultados');
      }
      setTimeout(() => {
        this.selectAll(this.txtFiltro);
      }, (500));
    });
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }
}
