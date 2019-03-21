import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, App } from 'ionic-angular';
import { EmbarquePage_01Page } from './embarque/embarque-page-01/embarque-page-01';
import { ReciboBultoPage_01Page } from './recibo/recibo-bulto-page-01/recibo-bulto-page-01';
import { PopoverReciboComponent } from '../../components/popover-recibo/popover-recibo';
import { HomePage } from '../home/home';
import { ImpresoraPage } from '../impresora/impresora';

/**
 * Generated class for the DespachoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-despacho',
  templateUrl: 'despacho.html',
})
export class DespachoPage {

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, 
    public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
  }

  presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 0 });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
     if(popoverData == 3){
        this.showModalImpresora();
      }else if(popoverData == 4){
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }

  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  goToEmbarPage01(){
    this.navCtrl.push(EmbarquePage_01Page);
  }

  gotToReciboBultoPage01(){
    this.navCtrl.push(ReciboBultoPage_01Page);
  }
}
