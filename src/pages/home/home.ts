import { Component, Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { WarehouseSelectPage } from '../warehouse-select/warehouse-select';
import { AuthService } from '../../providers/auth-service/auth-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ConfigurarPage } from '../configurar/configurar';
import xml2js from 'xml2js';
import { map } from "rxjs/operators";
import { fetch as fetchPolyfill } from 'whatwg-fetch'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public xmlItems: any;
  public jsonItems: any;
  responseData: any;
  userData = { "Usuario": "", "Clave": "", "idterminal": "1" };

  constructor(public navCtrl: NavController, public auth: AuthService, public sGlobal: GlobalServiceProvider,
    public http: Http, public platform: Platform, private androidPermissions: AndroidPermissions, private file: File,
    public alertCtrl: AlertController) {
    var obj;
    this.platform.ready().then(() => {
      debugger;
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]
      );
    });
  }

  iniciarSesion() {
    this.getJSON().subscribe(
      (data) => {
        {
          debugger;
          this.sGlobal.url = data.url;
          this.sGlobal.urlPrint = data.urlPrint;
          this.sGlobal.Id_TerminalRF = data.idRF;
          this.sGlobal.loadXML();

          this.auth.getUsers(this.userData).then((result) => {
            debugger;
            this.responseData = result;
            if (this.responseData.length > 0) {
              this.sGlobal.vUserData = result;
              this.sGlobal.userName = result[0].Usuario;
              this.sGlobal.apeNom = result[0].ApeNom;
              this.navCtrl.push(WarehouseSelectPage);
            }
            else {
              this.presentAlert("Usuario o contraseña incorrecta");
            }
          }, (err) => {
            console.log(err);
          });
        }
      }
    )
  }

  iniciarSesionWeb() {
    this.auth.getUsers(this.userData).then((result) => {
      debugger;
      this.responseData = result;
      if (this.responseData.length > 0) {
        this.sGlobal.vUserData = result;
        this.sGlobal.userName = result[0].Usuario;
        this.sGlobal.apeNom = result[0].ApeNom;
        this.navCtrl.push(WarehouseSelectPage);
      }
      else {
        this.presentAlert("Usuario o contraseña incorrecta");
      }
    }, (err) => {
      console.log(err);
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

  configurar() {
    this.navCtrl.push(ConfigurarPage);
  }

  goWarehouseSelect(): void {
    this.navCtrl.push(WarehouseSelectPage);
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.file.externalRootDirectory + "/Config/connect.json")
      .map((res: any) => res.json());
  }
}
