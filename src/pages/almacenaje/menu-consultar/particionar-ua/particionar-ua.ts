import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Navbar } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { ImpresoraPage } from '../../../impresora/impresora'
import { ReciboServiceProvider } from '../../../../providers/recibo-service/recibo-service';
import { AdministrarUaPage } from '../../menu-consultar/administrar-ua/administrar-ua'

/**
 * Generated class for the ParticionarUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-particionar-ua',
  templateUrl: 'particionar-ua.html',
})
export class ParticionarUaPage {

  @ViewChild(Navbar) navBar: Navbar;

  vDatosRecibidos: any = [];
  NombreImpresora: any;
  NuevaUA : any;
  vParticionarPage: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider, public modalCtrl: ModalController, public sRecibo: ReciboServiceProvider) {
    debugger;
    this.vDatosRecibidos = navParams.get('data');
    this.NombreImpresora = this.sGlobal.Id_Impresora ==  0 ? "NINGUNA"  : this.sGlobal.nombreImpresora;    
  }

  validarImprimir(){
    if (this.sGlobal.Id_Impresora == 0) {
      this.presentAlert("Impresora no existe. Seleccionar otra impresora").then((resultAlert) => {
        //Mostrar lista de impresoras.   
        this.showModalImpresora(); 
      })
    } else {
      this.presentAlertConfirm("¿Está seguro de imprimir la etiqueta?”.").then((resultAlert3) => {
        if (resultAlert3) {
          //Imprimir y Particionar
          this.particionarUA();

        }
      })
    }
  }
  
  particionarUA(){
    debugger;
    this.sRecibo.postinsertarUAParticionada(this.vDatosRecibidos.CodBar_UA, this.vDatosRecibidos.CantidadTotal, this.sGlobal.userName, this.sGlobal.Id_Centro).then(result => {
      debugger;
      this.NuevaUA = result;      
    });
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
    modalIncidencia.onDidDismiss(data =>{
      this.NombreImpresora = this.sGlobal.nombreImpresora;
    });    
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

  goAdministrarUaPage() {
    this.vParticionarPage = {
      'page': 3,
      'CodBar_UA': this.vDatosRecibidos.CodBar_UA
    };
    this.navCtrl.push(AdministrarUaPage, {
      data: this.vParticionarPage
    });
  }

  ionViewDidLoad() {
    //Enviar page 3 a administrar ua
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.goAdministrarUaPage();       
  }

    console.log('ionViewDidLoad ParticionarUaPage');
  }
    
}
