import { Component } from '@angular/core';
import { IonicPage, App, ModalController, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MainMenuPage } from '../../main-menu/main-menu'
import { HomePage } from '../../home/home';
/**
 * Generated class for the ReabastecimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reabastecimiento',
  templateUrl: 'reabastecimiento.html',
})
export class ReabastecimientoPage {

  vPickingXProducto: any = [];
  TextObservacion: string = '';

  constructor(public app: App,  public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController, public sAlmacenaje: AlmacenajeServiceProvider,
    public sGlobal: GlobalServiceProvider, public alertCtrl: AlertController) {
    this.vPickingXProducto = navParams.get('data');
  }

  aceptarReabastecer() {
    this.reabastecer(this.vPickingXProducto.IdProducto, this.vPickingXProducto.IdUbicacion, this.TextObservacion, this.sGlobal.Id_TerminalRF, this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  reabastecer(intIdProducto, intIdUbicacionDestino, strObservacion, intIdRF, strUsuario, IdAlmacen) {
    this.sAlmacenaje.Reabastecer(intIdProducto, intIdUbicacionDestino, strObservacion, intIdRF, strUsuario, IdAlmacen).then(result => {
      debugger;
      var message: any = result;
      if (message.errNumber == 0) {
        this.presentAlert("Se realizó correctamente el registro de solicitud de reabastecimiento");
        this.goBackRutaPicking();
      } else {
        this.presentAlert("No se realizó la solicitud de reabastecimiento");
      }
    });
  }

  goBackRutaPicking() {
    this.navCtrl.pop();
  }

  showModalIncidencia2(){ //data
    debugger;
    let modalIncidencia = this.modalCtrl.create(IncidenciaPage); //{ 'pIncidencia' : obj});
    modalIncidencia.onDidDismiss(data =>{
      if(data.response == 200){
        this.navCtrl.pop();
      }
    });
    modalIncidencia.present();
  }

  goAdministrarUaPage() {
    this.vPickingXProducto = {
      'page': 6
    };
    this.navCtrl.push(AdministrarUaPage, {
      data: this.vPickingXProducto
    });
  }

  goConsultarUbicacionPage() {
    this.navCtrl.push(ConsultarUbicacionPage);
  }

  goMenu() {
    debugger;
    this.navCtrl.push(MainMenuPage);
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverRutaPickingPage, {
      // contentEle: this.content.nativeElement,
      // textEle: this.text.nativeElement
    });
    popover.present({
      ev: ev
    });

    popover.onDidDismiss(popoverData => {
      if (popoverData == 1) {
        this.showModalIncidencia2();
      } else if (popoverData == 2) {
        debugger;
        this.goAdministrarUaPage();
      } else if (popoverData == 3) {
        debugger;
        this.goConsultarUbicacionPage();
      } else if (popoverData == 4) {
        debugger;
        this.goMenu();
      } else if (popoverData == 5) {
        debugger;
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReabastecimientoPage');
  }
}
