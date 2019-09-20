import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PopoverEmbalajeComponent } from '../../components/popover-embalaje/popover-embalaje';
import { EmbalajePage_02Page } from '../embalaje/embalaje-page-02/embalaje-page-02';
import { ImpresoraPage } from '../impresora/impresora';

/**
 * Generated class for the EmbalajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje',
  templateUrl: 'embalaje.html',
})
export class EmbalajePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController, public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage');
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverEmbalajeComponent, { 'page': 13 });
    debugger;
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      debugger;
      if (popoverData == 4) {
        this.showModalImpresora();
      } else if (popoverData == 5) {
        this.goBackLoginPage();
      }
    });
  }

  goBackLoginPage(): void {
    this.navCtrl.push(HomePage);
  }

  goEmbalajePackingPage() {
    this.navCtrl.push(EmbalajePage_02Page);
  }

}
