import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { File } from '@ionic-native/file';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the ParametrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parametros',
  templateUrl: 'parametros.html',
})
export class ParametrosPage {

  public rutaServicioBD: any;
  public rutaServicioImpresion: any;
  public idRF: any;
  public clave: any;
  public jsonItems: any;

  @ViewChild('iRutaBD', { read: ElementRef }) private iRutaBD: ElementRef;
  @ViewChild('iRutaImpresion', { read: ElementRef }) private iRutaImpresion: ElementRef;
  @ViewChild('iRF', { read: ElementRef }) private iRF: ElementRef;
  @ViewChild('iPassword', { read: ElementRef }) private iPassword: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private file: File,
    public alertCtrl: AlertController) {
    var obj;
    debugger;
    this.getJSON().subscribe(
      (data) => {
        {
          debugger;
          this.rutaServicioBD = data.url;
          this.rutaServicioImpresion = data.urlPrint;
          this.idRF = data.idRF;
          this.clave = data.passwordConfig;
        }
      }
    )
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.file.externalRootDirectory + "/Config/connect.json")
      .map((res: any) => res.json());
  }

  validarCampos() {
    var message = "";

    if (this.rutaServicioBD) {
      if (this.rutaServicioBD.trim() == "") {
        message = "Debe ingresar ruta de servicio";
        this.selectAll(this.iRutaBD, 500);
        return message;
      }
    } else {
      message = "Debe ingresar ruta de servicio";
      this.selectAll(this.iRutaBD, 500);
      return message;
    }

    if (this.rutaServicioImpresion) {
      if (this.rutaServicioImpresion.trim() == "") {
        message = "Debe ingresar ruta de servicio";
        this.selectAll(this.iRutaImpresion, 500);
        return message;
      }
    } else {
      message = "Debe ingresar ruta de servicio";
      this.selectAll(this.iRutaImpresion, 500);
      return message;
    }

    if (this.idRF) {
      if (this.idRF.trim() == "") {
        message = "Debe ingresar ruta de servicio";
        this.selectAll(this.iRF, 500);
        return message;
      }
    } else {
      message = "Debe ingresar ruta de servicio";
      this.selectAll(this.iRF, 500);
      return message;
    }

    if (this.clave) {
      if (this.clave.trim() == "") {
        message = "Debe ingresar ruta de servicio";
        this.selectAll(this.iPassword, 500);
        return message;
      }
    } else {
      message = "Debe ingresar ruta de servicio";
      this.selectAll(this.iPassword, 500);
      return message;
    }

    return message;
  }

  grabarParametros() {
    debugger;
    let message = this.validarCampos();

    if (message.length > 0) {
      this.presentAlert(message);
      return;
    }

    var exist = this.file.checkFile(this.file.externalRootDirectory + "/Config", "connect.json");
    if (exist) {
      let data = {
        url: this.rutaServicioBD,
        urlPrint: this.rutaServicioImpresion,
        idRF: this.idRF,
        passwordConfig: this.clave
      };
      var jFile = JSON.parse(JSON.stringify(data));
      this.file.writeFile(this.file.externalRootDirectory + "/Config", "connect.json", jFile, { replace: true })
      this.presentAlert("Los parámetros se grabaron correctamente.");
      this.goBackLoginPage();
    } else {
      this.presentAlert("No se encontro archivo de configuración.");
    }
  }

  selectAll(el: ElementRef, time) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(() => {
      nativeEl.select();
    }, time);
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
    console.log('ionViewDidLoad ParametrosPage');
  }

  goBackLoginPage() {
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'HomePage') {
        this.navCtrl.popTo(item);
      }
    });
  }
}
