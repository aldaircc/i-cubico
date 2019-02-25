import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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

  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;
  codeBar:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
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

  validarCodeBar(){
    if(this.codeBar){
      if(this.codeBar.trim()!=""){

      }else{
        this.presentToast("Ingrese código de ubicación");
        setTimeout(() => {
          this.txtCodUbicacionRef.setFocus();
          this.selectAll(this.txtCodUbicacion);
        }, (500));
      }
    }else{
      this.presentToast("Ingrese código de ubicación");
      setTimeout(() => {
        this.txtCodUbicacionRef.setFocus();
        this.selectAll(this.txtCodUbicacion);
      }, (500));
    }
  }

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

  goReabastecimientoPickingPage() {
    this.navCtrl.push(ReabastecimientoPickingPage);
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));
    console.log('ionViewDidLoad UbicacionOrigenPage');
  }
}
