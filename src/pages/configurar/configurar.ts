import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ParametrosPage } from '../configurar/parametros/parametros';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ConfigurarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configurar',
  templateUrl: 'configurar.html',
})
export class ConfigurarPage {

  public clave: any;
  public clavejson: any;
  @ViewChild('iClave', { read: ElementRef }) private iClave: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private file: File,
    public alertCtrl: AlertController) {
  }

  goBackLoginPage(){
    this.navCtrl.push(HomePage);
  }

  ingresarParametros(){

    if(this.clave){
      if(this.clave.trim()!= ""){
        this.getJSON().subscribe(
          (data) => {
            {
              debugger;
              this.clavejson = data.passwordConfig;
            }
          }
        )
  
        if(this.clave==this.clavejson){
          this.navCtrl.push(ParametrosPage)
        }else{
          this.presentAlert("Contraseña incorrecta.");
          this.selectAll(this.iClave, 500);
        }
      }else{      
        this.presentAlert("Debe ingresar contraseña");
        this.selectAll(this.iClave, 500);
      }
    }else{
      this.presentAlert("Debe ingresar contraseña");
      this.selectAll(this.iClave, 500);
    }        
  }

  public getJSON(): Observable<any> {    
    return this.http.get(this.file.externalRootDirectory + "/Config/connect.json")
      .map((res: any) => res.json());
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
    console.log('ionViewDidLoad ConfigurarPage');
  }

}
