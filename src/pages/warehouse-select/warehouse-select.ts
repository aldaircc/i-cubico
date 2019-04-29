import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { AuthService } from '../../providers/auth-service/auth-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { HomePage } from '../home/home';


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
  cedisInfo = { "Centro": "", "Id_Centro": "" };
  wareHouseInfo = { "Almacen": "", "Cliente": null, "CorreoSupervisor": "", "Id_Almacen": "", "Id_Cliente": "", "NombreSupervisor": "" };


  vWarehousePage: any;
  userProfileBack: any;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,
    public sGlobal: GlobalServiceProvider) {
    debugger;
    //const data = JSON.parse(localStorage.getItem('vUserData'));
    this.userDetails = this.sGlobal.vUserData;
    this.userProfile.ApeNom = this.userDetails[0].ApeNom;
    this.userProfile.Correo = this.userDetails[0].Correo;
    this.userProfile.FlagActivo = this.userDetails[0].FlagActivo;
    this.userProfile.FlagPermiso = this.userDetails[0].FlagPermiso;
    this.userProfile.FlagRestablecer = this.userDetails[0].FlagRestablecer;
    this.userProfile.Id_Almacen = this.userDetails[0].Id_Almacen;
    this.userProfile.Usuario = this.userDetails[0].Usuario;
    this.userInfo.strUsuario = this.userProfile.Usuario;

    this.userProfileBack = this.navParams.data;
    this.getCedis();

    //si viene de picking y almacenaje
    if (this.userProfileBack.page == "1") {
      debugger;
      this.cedisInfo.Id_Centro = this.sGlobal.Id_Centro.toString();
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WarehouseSelectPage');
  }

  getCedis() {
    debugger;
    this.auth.getCedis(this.userInfo).then((result) => {
      this.responseData = result;
      if (this.responseData.length > 0) {
        debugger;
        /* localStorage.setItem('vUserData', JSON.stringify(this.responseData));
        this.navCtrl.push(WarehouseSelectPage); */
        this.listCedis = this.responseData;
        if (this.userProfileBack.page == "1") {
          debugger;

          this.getWarehouse();

        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  getWarehouse() {
    debugger;
    let wareInfo = { "strUsuario": this.userProfile.Usuario, "intIdCentro": parseInt(this.cedisInfo.Id_Centro) };
    this.sGlobal.Id_Centro = parseInt(this.cedisInfo.Id_Centro);
    this.auth.getWarehouse(wareInfo).then((result) => {
      debugger;
      this.responseData = result;
      debugger;
      if (this.responseData.length > 0) {
        /* localStorage.setItem('vUserData', JSON.stringify(this.responseData));
        this.navCtrl.push(WarehouseSelectPage); */
        this.listWarehouse = this.responseData;

      }
      if (this.userProfileBack.page == "1") {
        debugger;
        this.wareHouseInfo.Id_Almacen = this.sGlobal.Id_Almacen.toString();
      }
      else {
      }
    }, (err) => {
      console.log(err);
    });
  }

  selectWareHouse0(data) {
    debugger;
    let wareBodega: any = data;
    this.sGlobal.Id_Almacen = wareBodega.Id_Almacen;
    this.sGlobal.nombreAlmacen = wareBodega.Almacen;

    this.userProfile.Id_Almacen = wareBodega.Id_Almacen;
    this.userProfile.Almacen = wareBodega.Almacen;

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

    if (this.userProfileBack.page == "1") {
      debugger;
      this.navCtrl.push(HomePage);
    } else {
      this.navCtrl.pop();
    }
  }

  goNext(): void {
    this.navCtrl.push(MainMenuPage, this.userProfile);
  }


  logout() {
    debugger;
    localStorage.clear();
    setTimeout(() => this.goBack(), 1000);
  }
}
