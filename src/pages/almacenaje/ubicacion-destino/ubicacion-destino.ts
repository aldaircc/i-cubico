import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the UbicacionDestinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubicacion-destino',
  templateUrl: 'ubicacion-destino.html',
})
export class UbicacionDestinoPage {

  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;

  @ViewChild('txtCodPalletUa') txtCodPalletUaRef;
  @ViewChild('txtCodPalletUa', { read: ElementRef }) private txtCodPalletUa: ElementRef;

  codeBarUbicacion: string;
  codeBarPalletUA: string;
  RegistrarUA: boolean = false;
  vDatosRecibidos: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.vDatosRecibidos = navParams.get('data');
  }

  validarCodeBar() {
    if (this.codeBarUbicacion) {
      if (this.codeBarUbicacion.trim() != "") {
        debugger;
        //Segun la validacion posicionarse para validar el Pallet/UA

        if (this.codeBarUbicacion.trim() == this.vDatosRecibidos.CodigoBarra.trim()) {

          this.RegistrarUA = true;
          setTimeout(() => {
            this.selectAll(this.txtCodPalletUa);
          }, (500));
        } else {
          this.presentAlert("Ubicación destino incorrecta.").then((resultAlert) => {
            this.RegistrarUA = false;
            setTimeout(() => {
              this.selectAll(this.txtCodUbicacion);
            }, (500));
          })
        }
      } else {
        this.presentToast("Ingrese Código de ubicación");
        setTimeout(() => {
          this.selectAll(this.txtCodUbicacion);
        }, (500));
      }
    } else {
      this.presentToast("Ingrese Código de ubicación");
      setTimeout(() => {
        this.selectAll(this.txtCodUbicacion);
      }, (500));
    }
  }

  validarCodeBarPallet() {
    if (this.RegistrarUA) {
      if (this.codeBarPalletUA) {
        if (this.codeBarPalletUA.trim() != "") {
          debugger;
        } else {
          this.presentToast("Ingrese Pallet/UA");
          setTimeout(() => {
            this.selectAll(this.txtCodPalletUa);
          }, (500));
        }
      } else {
        this.presentToast("Ingrese Pallet/UA");
        setTimeout(() => {
          this.selectAll(this.txtCodPalletUa);
        }, (500));
      }
    } else {
      this.presentToast("Debe consultar el código de ubicación.");
    }
  }

  ontxtUbicacionChange() {
    this.RegistrarUA = false;
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

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.selectAll(this.txtCodUbicacion);
    }, (500));
    console.log('ionViewDidLoad UbicacionDestinoPage');
  }
}
