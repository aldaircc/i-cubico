import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { OtraUbicacionPage } from '../otra-ubicacion/otra-ubicacion'
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PalletsTransitoPage } from '../pallets-transito/pallets-transito';

/**
 * Generated class for the AlmacenajePalletUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-almacenaje-pallet-ua',
  templateUrl: 'almacenaje-pallet-ua.html',
})
export class AlmacenajePalletUaPage {


  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  vDatosUbicacion: any = [];
  vAlmacenajePalletUaPage: any = [];
  codeBar: string;
  codBar: string;
  isBgRed: boolean = false;
  isBgGreen: boolean = false;
  isbgWhite: boolean = false;
  isBgYellow: boolean = false;
  rowCount: any = 0;
  rowCountTotal: any = 0;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vDatosUbicacion = navParams.get('data');
    this.rowCountTotal = this.vDatosUbicacion.CantidadPallets;
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        this.codBar = this.vDatosUbicacion.CodigoBarraUbi.trim();
        if (this.codeBar.trim() == this.codBar) {
          this.isbgWhite = false;
          this.isBgRed = false;
          this.isBgYellow = true;
          this.isBgGreen = false;
        } else {
          this.isbgWhite = false;
          this.isBgRed = true;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.presentAlert("Ubicación no es correcta.").then((resultAlert) => {
            if (resultAlert) {
              setTimeout(() => {
                this.txtCodUbicacionRef.setFocus();
              }, (500));
            }
          })
        }
      }
      else {
        this.presentToast("Ingrese código de ubicación");
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
    }
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));
  }

  registrarUAUbicacion() {
    if (this.codeBar) {
      if (this.codeBar.trim() != ""){
        debugger;

        // this.registroUas();
        // this.resultaRegistro();

        for (var i = 0; i < this.vDatosUbicacion.lst_UA.length; i++){
          var count = 0;
          var codUA = this.vDatosUbicacion.lst_UA[i];
          this.sAlmacenaje.postRegistrarUAUbicacion(codUA, this.vDatosUbicacion.Id_Ubicacion, this.sGlobal.userName).then(result => {
            debugger;
            count = count + 1;
            var message: any = result;
            if (message.errNumber == 0) {
              this.rowCount = this.rowCount + 1;  
            }
            if(count == this.vDatosUbicacion.lst_UA.length){
              if(this.rowCount == this.rowCountTotal){
                this.isbgWhite = false;
                this.isBgRed = false;
                this.isBgYellow = false;
                this.isBgGreen = true;
                this.presentAlert("Proceso de almacenaje de Pallets/UA´s finalizado.").then((resultAlert) => {
                  if (resultAlert) {
                    this.goPalletsUasTransito();
                  }
                })
              }else{
                this.isbgWhite = false;
                this.isBgRed = true;
                this.isBgYellow = false;
                this.isBgGreen = false;
                var saldo = this.rowCountTotal - this.rowCount;
                this.presentAlert("No se almacenaron " + saldo + " Pallets/UA´s. Intente otra vez.");
              }
            }
          });
        }
      }else{
        this.presentToast("Ingrese código de ubicación");
      }      
    } else {
      this.presentToast("Ingrese código de ubicación");
    }    
  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
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

  goOtraUbicacionPage() {
    this.vAlmacenajePalletUaPage = {
      'Id_Ubicacion_Transito' : this.vDatosUbicacion.Id_Ubicacion_Transito
    };
    this.navCtrl.push(OtraUbicacionPage, {
      data: this.vAlmacenajePalletUaPage
    });

  }

  goPalletsUasTransito(){
    debugger;
    this.vAlmacenajePalletUaPage = {
      'Id_Ubicacion_Transito' : this.vDatosUbicacion.Id_Ubicacion_Transito
    };
    this.navCtrl.push(PalletsTransitoPage, {
      data: this.vAlmacenajePalletUaPage
    });
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));

    console.log('ionViewDidLoad AlmacenajePalletUaPage');
  }

}
