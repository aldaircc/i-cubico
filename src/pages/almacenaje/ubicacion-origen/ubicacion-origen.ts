import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReabastecimientoPickingPage } from '../reabastecimiento-picking/reabastecimiento-picking'

/**
 * Generated class for the UbicacionOrigenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubicacion-origen',
  templateUrl: 'ubicacion-origen.html',
})
export class UbicacionOrigenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController ) {
  }

  goReabastecimientoPickingPage() {
    this.navCtrl.push(ReabastecimientoPickingPage);
}

  presentAlert(message): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [{
          text: 'OK',
          handler: () => {
            resolve(true);
            console.log('Agree clicked');
          }
        }]
      });
      confirm.present();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbicacionOrigenPage');
  }

}
