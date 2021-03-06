import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ImpresoraServiceProvider } from '../../providers/impresora-service/impresora-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

/**
 * Generated class for the ImpresoraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-impresora',
  templateUrl: 'impresora.html',
})
export class ImpresoraPage {
  userDetail: any;
  listImpresora: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sImpresora: ImpresoraServiceProvider, public alertCtrl: AlertController,
    public viewCtrl: ViewController, public sGlobal: GlobalServiceProvider) {
    this.listarAccesosImpresoraXUsuario(this.sGlobal.userName);
  }

  ionViewDidLoad() {
  }

  listarAccesosImpresoraXUsuario(usuario) {
    this.sImpresora.listarAccesosImpresoraXUsuario(usuario).then(result => {
      this.listImpresora = result;
    });
  }

  selectImpresora(print) {
    const confirm = this.alertCtrl.create({
      title: 'Impresora',
      message: 'Ha seleccionado la impresora ' + print.Nombre + '. ¿Desea continuar?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.sGlobal.Id_Impresora = print.Id_Impresora;
            this.sGlobal.nombreImpresora = print.Nombre;
            let printSel = { 'printSel': print.Nombre };
            this.dismiss(printSel);
          }
        },
        {
          text: 'No',
          handler: () => {
            return;
          }
        }
      ]
    });
    confirm.present();
  }

  dismiss(dataSel) {
    this.viewCtrl.dismiss(dataSel);
  }
}
