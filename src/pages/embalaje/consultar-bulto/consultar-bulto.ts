import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, AlertController, ToastController, PopoverController, ModalController, Navbar, Platform  } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the ConsultarBultoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultar-bulto',
  templateUrl: 'consultar-bulto.html',
})
export class ConsultarBultoPage {
  @ViewChild('txtCodBarBulto', { read: ElementRef }) private txtCodBarBulto: ElementRef;

  codeBarBulto: string;
  ResultBulto: any = [];
  vMostrar: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sEmbalaje: EmbalajeServiceProvider, public sGlobal: GlobalServiceProvider,
    public modalCtrl: ModalController, public popoverCtrl: PopoverController,
    private platform: Platform) {      
  }

  ionViewDidLoad() { 
    setTimeout(() => {
      this.selectAll(this.txtCodBarBulto);
    }, (500));    
    console.log('ionViewDidLoad ConsultarBultoPage');
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  validarBulto() {    
    if (this.codeBarBulto != undefined) {
      if (this.codeBarBulto.length == 16) {
        this.sEmbalaje.ConsultarBulto(this.codeBarBulto).then((result) => {          
          this.ResultBulto = result;               
          if (this.ResultBulto.length > 0) {
            this.ResultBulto = result[0]; 
            this.vMostrar = true;
          } else {
             this.presentToast("No se encontraron datos.");
             this.vMostrar = false;
          }
        }, err => {
          console.log('E-getBulto', err);          
        }); 
      }
      else {
        this.presentToast("El código del bulto debe tener 16 dígitos.");
        this.vMostrar = false;
        setTimeout(() => {
          this.selectAll(this.txtCodBarBulto);
        }, (500));
      }    
    } 
    else {
      this.presentToast("Ingrese código de bulto.");
      this.vMostrar = false;
      setTimeout(() => {
        this.selectAll(this.txtCodBarBulto);
      }, (500));
    }
  }

}
