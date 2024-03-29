import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, AlertController, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ReciboPage } from '../recibo/recibo';
import { PickingPage } from '../picking/picking';
import { AlmacenajePage } from '../almacenaje/almacenaje';
import { EmbalajePage } from '../embalaje/embalaje';
import { EtiquetadoPage_01Page } from '../etiquetado/etiquetado-page-01/etiquetado-page-01';
import { TransferPage_01Page } from '../transferencia/transfer-page-01/transfer-page-01';
import { InventarioPage_01Page } from '../inventario/inventario-page-01/inventario-page-01';
import { DespachoPage } from '../despacho/despacho';

import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { AuthService } from '../../providers/auth-service/auth-service';

import { WarehouseSelectPage } from '../warehouse-select/warehouse-select';
import { OpcionesPage } from '../etiquetado/opciones/opciones';


/**
 * Generated class for the MainMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  userProfile: any;
  vMainMenuPage: any;
  responseData: any;

  btnReciboisenabled: boolean = false;
  btnAlmacenajeisenabled: boolean = false;
  btnPickingisenabled: boolean = false;
  btnEmbalajeisenabled: boolean = false;
  btnDespachoisenabled: boolean = false;
  btnTransferenciaisenabled: boolean = false;
  btnInventarioisenabled: boolean = false;
  btnEtiquetadoisenabled: boolean = false;

  constructor(private app: App, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, 
    public sGlobal: GlobalServiceProvider, public viewCtrl: ViewController, public auth: AuthService, public alertCtrl: AlertController) {
    this.userProfile = this.navParams.data;
    this.accesosModulos();
  }

  accesosModulos(){
    let paramAcceso = { "strUser": this.sGlobal.userName, "Tipo": "M", "intIdRF" : this.sGlobal.Id_Almacen };
    debugger
    this.auth.getAccesosMenusXUsuario(paramAcceso).then((result) => {
      debugger;
      this.responseData = result;
      if (this.responseData.length > 0) {
        for(var i = 0; i < this.responseData.length; i++){
          if(this.responseData[i].Url == "MREC01"){ //Recepcion
            this.btnReciboisenabled = true;
          }
          if(this.responseData[i].Url == "MUBI01"){ //Ubicacion
            this.btnAlmacenajeisenabled = true;
          }
          if(this.responseData[i].Url == "MPCK01"){ //Picking
            this.btnPickingisenabled = true;
          }
          if(this.responseData[i].Url == "MDES01"){ //Despacho
            this.btnEmbalajeisenabled = true;
          }
          if(this.responseData[i].Url == "MINV01"){ //Inventario
            this.btnInventarioisenabled = true;
          }
          if(this.responseData[i].Url == "METQ01"){ //Etiquetado
            this.btnEtiquetadoisenabled = true;
          }
          if(this.responseData[i].Url == "MEMB01"){ //Embarque
            this.btnDespachoisenabled = true;
          }
          if(this.responseData[i].Url == "MPRO01"){ //Produccion
            this.btnTransferenciaisenabled = true;
          }
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('Almacen'));
  }

  goBackWarehouseSelect(): void {
    debugger;
    this.navCtrl.pop();
  }

  // goBackLoginPage(): void {
  //   debugger;
  //   this.sGlobal.Id_Centro = 0;
  //   this.sGlobal.Id_Almacen = 0;
  //   this.navCtrl.push(HomePage);
  // }

  goBackLoginPage() {
    debugger
    this.presentAlertConfirm("¿Deseas cerrar sesión?").then((result) => {
      if (result) {
        localStorage.clear();
        setTimeout(() => this.goBack(), 1000);
      }
    })
  }

  goBack(): void {
    this.navCtrl.pop();
    var nav = this.app.getRootNav();
    nav.setRoot(HomePage);
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

  goReciboPage() {
    this.navCtrl.push(ReciboPage,this.userProfile);
  }

  goPickingPage() {    
    this.navCtrl.push(PickingPage,this.userProfile);
  }

  goAlmacenajePage() {
    this.navCtrl.push(AlmacenajePage,this.userProfile);
  }

  goEmbalajePage() {
    this.navCtrl.push(EmbalajePage,this.userProfile);
  }

  goEtiquetado() {
    this.navCtrl.push(OpcionesPage);
  }

  goTransferencia() {
    this.navCtrl.push(TransferPage_01Page);
  }

  goInventario() {
    this.navCtrl.push(InventarioPage_01Page);
  }

  goDespacho() {
    this.navCtrl.push(DespachoPage,this.userProfile);
  }
}
