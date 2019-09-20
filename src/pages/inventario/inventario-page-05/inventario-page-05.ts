import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the InventarioPage_05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario-page-05',
  templateUrl: 'inventario-page-05.html',
})
export class InventarioPage_05Page {

  vParameter: any;
  listDetail: any;
  rowCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
  }

  listarUAsXUbicacionInventario(strIdInventario, strCodBarraUbi): void {
    this.sInve.listarUAsXUbicacionInventario(strIdInventario, strCodBarraUbi).then(result => {
      this.listDetail = result;
      this.rowCount = this.listDetail.length;
    });
  }

  ionViewWillEnter() {
    this.listarUAsXUbicacionInventario(this.vParameter.Id_Inventario,
      (this.vParameter.TipoInventario == 'CICLICO') ? this.vParameter.Id_Producto : this.vParameter.Cod_Ubicacion);
  }

  deleterItem(obj): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmar eliminación',
      message: '¿Está seguro de eliminar el registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Si',
          handler: () => {
            this.eliminarUAInventario(this.vParameter.Id_Inventario, obj.UA_CodBarra);
          }
        }
      ]
    });
    alert.present();
  }

  eliminarUAInventario(strIdInventario, strUA): void {
    this.sInve.eliminarUAInventario(strIdInventario, strUA).then(result => {
      let res: any = result;
      if (res.errNumber == 0) {
        alert(res.message);
        this.listarUAsXUbicacionInventario(this.vParameter.Id_Inventario,
          (this.vParameter.TipoInventario == 'CICLICO') ? this.vParameter.Id_Producto : this.vParameter.Cod_Ubicacion);
      } else {
        alert(res.message);
      }
    });
  }
}
