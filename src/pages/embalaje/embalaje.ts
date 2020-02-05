import { Component } from '@angular/core';
import { IonicPage, Platform, ViewController, NavController, AlertController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PopoverEmbalajeComponent } from '../../components/popover-embalaje/popover-embalaje';
import { EmbalajePage_02Page } from '../embalaje/embalaje-page-02/embalaje-page-02';
import { ImpresoraPage } from '../impresora/impresora';
import { ConsultarBultoPage } from './consultar-bulto/consultar-bulto';

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

  valorpopoverGlobal: boolean = false
popoverGlobal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController, public modalCtrl: ModalController,
    public viewCtrl: ViewController, private platform: Platform
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
    this.valorpopoverGlobal = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverEmbalajeComponent, { 'page': 13 });
    debugger;
    this.popoverGlobal.present({
      ev: myEvent
    });

    this.popoverGlobal.onDidDismiss(popoverData => {
      debugger;
      this.valorpopoverGlobal = false;
      if (popoverData == 4) {
        this.showModalImpresora();
      } else if (popoverData == 5) {
        this.mostrarMensajeConfirmacion();
      }
    });
  }

  mostrarMensajeConfirmacion() {
    this.presentAlertConfirm("¿Está seguro de cerrar sesión?").then((result) => {
      if (result) {
        this.goBackLoginPage();
      }
    })  
  };

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

  goBackLoginPage(): void {
    this.navCtrl.push(HomePage);
  }

  goEmbalajePackingPage() {
    this.navCtrl.push(EmbalajePage_02Page);
  }

  goConsultarBulto() {      
    this.navCtrl.push(ConsultarBultoPage);
  }

  ionViewWillEnter(){
    this.platform.registerBackButtonAction(() => {
      debugger;
      if(this.valorpopoverGlobal){
        this.valorpopoverGlobal = false;
        this.popoverGlobal.dismiss();
      }else{
        this.navCtrl.pop(); 
      }      
  });
  }

}