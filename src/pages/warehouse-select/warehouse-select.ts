import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavController, NavParams, AlertController, Platform, ViewController } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { AuthService } from '../../providers/auth-service/auth-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

/**
 * Generated class for the WarehouseSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-warehouse-select',
  templateUrl: 'warehouse-select.html',
})
export class WarehouseSelectPage {

  listCedis = [];
  listWarehouse = [];
  responseData: any;
  userDetails: any;
  userProfile = { "Almacen": "", "ApeNom": "", "Cliente": "", "Correo": "", "FlagActivo": false, "FlagPermiso": false, "FlagRestablecer": false, "Foto": null, "Id_Almacen": "", "Id_Cliente": null, "Id_Perfil": "", "Perfil": "", "Usuario": "", "page": "0" };
  userInfo = { "strUsuario": "" };
  cedisInfo = { "Centro": "", "Id_Centro": 0 };
  wareHouseInfo = { "Almacen": "", "Cliente": null, "CorreoSupervisor": "", "Id_Almacen": "", "Id_Cliente": "", "NombreSupervisor": "" };
  vWarehousePage: any;

  constructor(public app: App, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,
    public sGlobal: GlobalServiceProvider, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    debugger;
    this.userDetails = this.sGlobal.vUserData;
    this.userProfile.ApeNom = this.userDetails[0].ApeNom;
    this.userProfile.Correo = this.userDetails[0].Correo;
    this.userProfile.FlagActivo = this.userDetails[0].FlagActivo;
    this.userProfile.FlagPermiso = this.userDetails[0].FlagPermiso;
    this.userProfile.FlagRestablecer = this.userDetails[0].FlagRestablecer;
    this.userProfile.Id_Almacen = this.userDetails[0].Id_Almacen;
    this.userProfile.Usuario = this.userDetails[0].Usuario;
    this.userInfo.strUsuario = this.userProfile.Usuario;
    this.getCedis();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarehouseSelectPage');
  }

  getCedis() {
    debugger;
    this.auth.getCedis(this.userInfo).then((result) => {
      this.responseData = result;
      if (this.responseData.length > 0) {
        debugger;
        this.listCedis = this.responseData;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getWarehouse() {
    debugger;
    let wareInfo = { "strUsuario": this.userProfile.Usuario, "intIdCentro": this.cedisInfo.Id_Centro };
    this.sGlobal.Id_Centro = this.cedisInfo.Id_Centro;
    this.auth.getWarehouse(wareInfo).then((result) => {
      debugger;
      this.responseData = result;
      this.sGlobal.Id_Centro = this.cedisInfo.Id_Centro;
      debugger;
      if (this.responseData.length > 0) {
        this.listWarehouse = this.responseData;
      }
      else {
      }
    }, (err) => {
      console.log(err);
    });
  }

  selectWareHouse(data) {
    debugger;
    for (var i = 0; i < this.listWarehouse.length; i++) {
      debugger;
      if (this.listWarehouse[i].Id_Almacen == data) {
        debugger;
        this.sGlobal.Id_Almacen = this.listWarehouse[i].Id_Almacen;
        this.sGlobal.nombreAlmacen = this.listWarehouse[i].Almacen;

        this.userProfile.Id_Almacen = this.listWarehouse[i].Id_Almacen;
        this.userProfile.Almacen = this.listWarehouse[i].Almacen;
      }
    }
  }


  goBack(): void {
    this.navCtrl.pop();
  }

  goNext(): void {
    let message = this.validarCampos();
    if (message.length > 0) {
      alert(message);
      return;
    }
    this.navCtrl.push(MainMenuPage, this.userProfile);
  }

  validarCampos() {
    debugger;
    var message = "";
    if (this.sGlobal.Id_Centro == 0) {
      message = "Seleccione centro de distribución";
      return message;
    }
    else if (this.sGlobal.Id_Almacen == 0) {
      message = "Seleccione almacén";
      return message;
    }
    return message;
  }

  logout() {
    debugger
    this.presentAlertConfirm("¿Deseas cerrar sesión?").then((result) => {
      if (result) {
        localStorage.clear();
        setTimeout(() => this.goBack(), 1000);
      }
    })
  }
}
