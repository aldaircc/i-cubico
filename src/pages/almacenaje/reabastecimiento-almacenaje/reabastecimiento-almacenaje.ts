import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { UbicacionOrigenPage } from '../ubicacion-origen/ubicacion-origen'
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';


/**
 * Generated class for the ReabastecimientoAlmacenajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reabastecimiento-almacenaje',
  templateUrl: 'reabastecimiento-almacenaje.html',
})
export class ReabastecimientoAlmacenajePage {
  @ViewChild(Navbar) navBar: Navbar;
  fecha: any;
  nomAlmacen: any;
  userDetail: any;

  listReabastecimiento: any;
  listAuxReabastecimiento: any = [];
  listSinTrabajar: any = [];
  listProceso: any = []
  rowCount: any;
  rowCountSinTrabajar: any;
  rowCountProceso: any;

  vReabastecerPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider,
    public sAlmacenaje: AlmacenajeServiceProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.fecha = new Date().toISOString();
    this.nomAlmacen = this.sGlobal.nombreAlmacen;
    this.userDetail = this.sGlobal.userName;
    this.getReabastecimiento();
  }

  getReabastecimiento(){
    this.getListarReabastecimientoXUsuario(this.sGlobal.Id_Almacen, this.sGlobal.userName);
  }

  getListarReabastecimientoXUsuario(intIdAlmacen, strUsuario) {
    debugger;
    this.sAlmacenaje.getListarReabastecimientoXUsuario(intIdAlmacen, strUsuario).then((result) => {
      debugger;
      this.listAuxReabastecimiento = [];
      this.listSinTrabajar = [];
      this.listProceso = [];
      this.listReabastecimiento = result;
      //this.listAuxOrdenesPicking = this.listOrdenesPicking;

      for (var i = 0; i < this.listReabastecimiento.length; i++) {
        var obj = {
          'Codigo': result[i].Codigo,
          'ColumnaD': result[i].ColumnaD,
          'ColumnaO': result[i].ColumnaO,
          'Estado': result[i].Estado,
          'FilaD': result[i].FilaD,
          'FilaO': result[i].FilaO,
          'Id_Estado': result[i].Id_Estado,
          'Id_PasilloD': result[i].Id_PasilloD,
          'Id_PasilloO': result[i].Id_PasilloO,
          'Id_Producto': result[i].Id_Producto,
          'Id_SectorD': result[i].Id_SectorD,
          'Id_SectorO': result[i].Id_SectorO,
          'Id_Tx': result[i].Id_Tx,
          'Id_Ubicacion_Destino': result[i].Id_Ubicacion_Destino,
          'Id_Ubicacion_Origen': result[i].Id_Ubicacion_Origen,
          'Movimiento': result[i].Movimiento,
          'NivelD': result[i].NivelD,
          'NivelO': result[i].NivelO,
          'Observacion': result[i].Observacion,
          'PasilloD': result[i].PasilloD,
          'PasilloO': result[i].PasilloO,
          'PosicionD': result[i].PosicionD,
          'PosicionO': result[i].PosicionO,
          'Prioridad': result[i].Prioridad,
          'Producto': result[i].Producto,
          'SectorD': result[i].SectorD,
          'SectorO': result[i].SectorO,
          'Ubicacion_Destino': result[i].Ubicacion_Destino,
          'Ubicacion_Origen': result[i].Ubicacion_Origen
        };
        this.listAuxReabastecimiento.push(obj);
        //this.idRutaPicking = this.idRutaPicking + 1;

        if (result[i].Id_Estado == 10) {
          this.listSinTrabajar.push(obj);
        }
        if (result[i].Id_Estado == 3) {
          this.listProceso.push(obj);
        }
      }

      this.rowCount = this.listAuxReabastecimiento.length;
      this.rowCountSinTrabajar = this.listSinTrabajar.length;
      this.rowCountProceso = this.listProceso.length;

      if (this.listReabastecimiento.length > 0) {
        console.log('Datos reabastecimiento', this.listReabastecimiento);
      } else {
        this.presentToast('No se encontraron registros.');
      }
    }, (err) => {
      console.log('E-Ordenes Picking listar', err);
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  presentAlertConfirm(message): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              resolve(false);
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              resolve(true);
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    })
  }

  goUbicacionOrigenPage(data) {
    debugger;
    this.vReabastecerPage = {
      'Id_Tx': data.Id_Tx,
      'Id_Producto': data.Id_Producto
    };
    this.navCtrl.push(UbicacionOrigenPage, {
      data: this.vReabastecerPage
    });
  }



  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.presentAlertConfirm("¿Está seguro de salir?").then((result) => {
        if (result) {
          this.navCtrl.pop();
        }
      })
    }
    console.log('ionViewDidLoad ReabastecimientoAlmacenajePage');
  }
}
