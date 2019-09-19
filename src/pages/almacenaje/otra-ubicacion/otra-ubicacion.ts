import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { AlmacenajePalletUaPage } from '../almacenaje-pallet-ua/almacenaje-pallet-ua'


/**
 * Generated class for the OtraUbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otra-ubicacion',
  templateUrl: 'otra-ubicacion.html',
})
export class OtraUbicacionPage {
  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;
  listSector: any = [];
  id_Sectorlt: number = 0;
  radioGroupisenabled1: boolean = false;
  radioGroupisenabled2: boolean = false;
  radioGroupisenabled3: boolean = false;
  txtCodUbicacionisenabled: boolean = false;
  tipoFiltro: number = 0;
  listUbicaciones: any = [];
  listAuxUbicaciones: any = [];
  codeBar: string;
  rowCount: any = 0;
  vOtraUbiacionPage: any;
  vDatosUbicacion: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider,
    public sAlmacenaje: AlmacenajeServiceProvider, public toastCtrl: ToastController) {
    this.vDatosUbicacion = navParams.get('data');
    debugger;
    this.listarSectoresXAlmacen();
  }

  listarSectoresXAlmacen() {
    this.sAlmacenaje.getListarSectoresXAlmacen(this.sGlobal.Id_Almacen).then(result => {
      debugger;
      this.listSector = result;
    });
  }

  onChange() {
    let obj = this.listSector.filter(x => x.Id_Sector == this.id_Sectorlt)[0];
    debugger;
    var idMarca = this.vDatosUbicacion.Id_Marca;
    var idCondicion = 1;
    this.ListarUbicacionesDisponibles(this.sGlobal.Id_Almacen, idMarca, idCondicion, obj.Id_Sector)
  }

  onChangeRadio() {
    debugger;
    if (this.tipoFiltro == 1) {
      this.txtCodUbicacionisenabled = false;
      //Filtrar x Marca
      this.listAuxUbicaciones = this.listUbicaciones.filter((item) => {
        return (item.Marca != "Sin Marca");
      });
      this.rowCount = this.listAuxUbicaciones.length;

      if (this.rowCount == 0) {
        this.presentToast("No se encontraron registros");
      }
    }
    if (this.tipoFiltro == 2) {
      this.txtCodUbicacionisenabled = false;
      this.listAuxUbicaciones = this.listUbicaciones.filter((item) => {
        return (item.Marca == "Sin Marca");
      });
      this.rowCount = this.listAuxUbicaciones.length;
      if (this.rowCount == 0) {
        this.presentToast("No se encontraron registros");
      }
    }
    if (this.tipoFiltro == 3) {
      this.listAuxUbicaciones = [];
      this.txtCodUbicacionisenabled = true;
      this.rowCount = this.listAuxUbicaciones.length;
      setTimeout(() => {
        this.selectAll(this.txtCodUbicacion);
        //this.txtCodUbicacionRef.setFocus();
      }, (500));
    }
  }

  filtrarCodeBar() {
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if (this.codeBar.length == 14) {
          this.listAuxUbicaciones = this.listUbicaciones.filter((item) => {
            return (item.CodigoBarra.trim() == this.codeBar.trim());
          });
          this.rowCount = this.listAuxUbicaciones.length;
          if (this.rowCount == 0) {
            this.presentToast("No se encontraron registros");
          }
          setTimeout(() => {
            //this.txtCodUbicacionRef.setFocus();
            this.selectAll(this.txtCodUbicacion);
          }, (500));
        } else {
          this.presentToast("El código de ubicación debe tener 14 dígitos.");
          setTimeout(() => {
            this.selectAll(this.txtCodUbicacion);
          }, (500));
        }
      } else {
        this.presentToast("Ingrese código de ubicación");
        setTimeout(() => {
          //this.txtCodUbicacionRef.setFocus();
          this.selectAll(this.txtCodUbicacion);
        }, (500));
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
      setTimeout(() => {
        //this.txtCodUbicacionRef.setFocus();
        this.selectAll(this.txtCodUbicacion);
      }, (500));
    }
  }

  ListarUbicacionesDisponibles(intIdAlmacen, intIdMarca, intCondicion, intIdSector) {
    this.sAlmacenaje.getListarUbicacionesDisponibles(intIdAlmacen, intIdMarca, intCondicion, intIdSector).then(result => {
      debugger;
      this.listUbicaciones = result;
      this.listAuxUbicaciones = this.listUbicaciones;
      let obj = this.listSector.filter(x => x.Id_Sector == this.id_Sectorlt)[0];
      if (obj.Id_Sector) {
        this.radioGroupisenabled1 = true;
        this.radioGroupisenabled2 = true;
        this.radioGroupisenabled3 = true;
        this.tipoFiltro = 1;
      }
    });
  }

  // SeleccionarUbicacion(data){
  //   this.goAlmacenajePalletPage(data)
  // }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  SeleccionarUbicacion(data) {
    debugger;
    this.navCtrl.pop().then(() => {
      data.Id_Ubicacion_Transito = this.vDatosUbicacion.Id_Ubicacion_Transito,
        data.CantidadPallets = this.vDatosUbicacion.CantidadPallets,
        data.lst_UA = this.vDatosUbicacion.lst_UA,
        this.navParams.get('ubicacion')(data);
    });
  }

  // goAlmacenajePalletPage(data){
  //   debugger;
  //   this.vOtraUbiacionPage = {
  //     'Sector' : data.Sector,
  //     'Fila' : data.Fila,
  //     'Columna' : data.Columna,
  //     'Nivel' : data.Nivel,
  //     'Posicion' : data.Posicion,
  //     'CodigoBarraUbi' : data.CodigoBarra,
  //     'Id_Ubicacion' : data.Id_Ubicacion,
  //     'Id_Ubicacion_Transito' : this.vDatosUbicacion.Id_Ubicacion_Transito,
  //     'CantidadPallets' : this.vDatosUbicacion.CantidadPallets,
  //     'lst_UA' : this.vDatosUbicacion.lst_UA
  //   };
  //   this.navCtrl.push(AlmacenajePalletUaPage, {
  //     data: this.vOtraUbiacionPage
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtraUbicacionPage');
  }
}
