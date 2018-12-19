import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ImpresoraServiceProvider } from '../../providers/impresora-service/impresora-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

/**
 * Generated class for the ImpresoraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-impresora',
  templateUrl: 'impresora.html',
})
export class ImpresoraPage {

  userDetail : any;
  listImpresora : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sImpresora:ImpresoraServiceProvider, public alertCtrl: AlertController,
    public viewCtrl:ViewController, public sGlobal:GlobalServiceProvider) {
      // const data = JSON.parse(localStorage.getItem('vUserData'));
      // this.userDetail = data;
      debugger;
      console.log('Id_Impresora', navParams.get('Id_Impresora'));
      this.listarAccesosImpresoraXUsuario('ADMIN');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImpresoraPage');
  }

  listarAccesosImpresoraXUsuario(usuario){
    this.sImpresora.listarAccesosImpresoraXUsuario(usuario).then(result=>{
      console.log('Result impresora', result);
      this.listImpresora = result;
    });    
  }

  selectImpresora(print){
    console.log('Print selected', print);
    const confirm = this.alertCtrl.create({
      //title: 'Use this lightsaber?',
      message: 'Ha seleccionado la impresora '+ print.Nombre+'. ¿Desea continuar?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.sGlobal.Id_Impresora = print.Id_Impresora;
            console.log('Disagree clicked', print.Nombre);
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  dismiss(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
