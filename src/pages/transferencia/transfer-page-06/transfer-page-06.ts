import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';

/**
 * Generated class for the TransferPage_06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-page-06',
  templateUrl: 'transfer-page-06.html',
})
export class TransferPage_06Page {

  vParameter: any;
  vEnviarData: any;
  strUbicacion: string = "";
  Id_UbicacionDestino: number = 0;
  fila: string = "";
  columna: string = "";
  nivel: string = "";
  posicion: string = "";
  isDisabledButton: boolean = true;
  isError: boolean = false;
  isNormal: boolean = true;
  @ViewChild('iUbicacion', { read: ElementRef }) private inputUbicacion: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public sAlmac: AlmacenajeServiceProvider,
    public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('data');
  }

  validarUbicacion() {
    if (this.strUbicacion.trim() != "") {
      if (this.strUbicacion != this.vParameter.Id_Tx) {
        this.sAlmac.listarUbicacionXCodigoBarra(this.strUbicacion, this.sGlobal.Id_Almacen).then(result => {
          let res: any = result;
          if (res.length != 0) {
            this.isDisabledButton = false;
            this.fila = res[0].Fila;
            this.columna = res[0].Columna;
            this.nivel = res[0].Nivel;
            this.posicion = res[0].Posicion;
            this.Id_UbicacionDestino = res[0].Id_Ubicacion;
            alert('Código de ubicación, verificado correctamente.');
            this.isError = false;
            this.isNormal = false;
            this.strUbicacion = "";
            this.selectAll(this.inputUbicacion, 500);
          } else {
            alert('No hay datos para mostrar, código de ubicación no existe.');
            this.isError = true;
            this.isNormal = false;
            this.strUbicacion = "";
            this.selectAll(this.inputUbicacion, 500);
          }
        });

        this.isDisabledButton = false;
      } else {
        alert('El código de ubicación ingresada debe ser distinta a la actual.');
        this.isError = true;
        this.isNormal = false;
        this.selectAll(this.inputUbicacion, 500);
        return;
      }
    } else {
      alert('Ingrese código de ubicación');
      this.strUbicacion = "";
      this.isDisabledButton = true;
      this.selectAll(this.inputUbicacion, 500);
      return;
    }
  }

  transferir() {
    this.reubicarUAsXSubAlmacen(this.vParameter.Id_Tx, this.vParameter.Id_Producto, this.vParameter.Lote,
      this.vParameter.Id_Ubicacion, this.Id_UbicacionDestino, this.sGlobal.Id_Almacen,
      this.vParameter.Id_SubAlmacen, this.sGlobal.userName);
  }

  reubicarUAsXSubAlmacen(strIdTx, intIdProducto, strLote, intIdUbicacionOrigen, intIdUbicacionDestino, intIdAlmacen, intIdSubAlmacen, strUser): void {
    this.sPicking.reubicarUAsXSubAlmacen(strIdTx, intIdProducto, strLote, intIdUbicacionOrigen, intIdUbicacionDestino, intIdAlmacen, intIdSubAlmacen, strUser)
      .then(result => {
        let res: any = result;
        if (res.errNumber == 0) {
          alert(res.message);
          this.goBackTransferPage05();
        }
      });
  }

  goBackTransferPage05() {
    debugger;
    this.navCtrl.pop().then(() => {
      this.vEnviarData = {
        'bolSinUbi': false
      };
      this.navParams.get('transferpage06')(this.vEnviarData);
    });
  }

  selectAll(el: ElementRef, time) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(() => {
      nativeEl.select();
    }, time);
  }

  ionViewWillEnter() {
    this.selectAll(this.inputUbicacion, 500);
  }
}
