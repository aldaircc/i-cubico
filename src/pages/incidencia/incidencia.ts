import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IncidenciaServiceProvider } from '../../providers/incidencia-service/incidencia-service';

/**
 * Generated class for the IncidenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incidencia',
  templateUrl: 'incidencia.html',
})
export class IncidenciaPage {

  vParameters : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
    public sIncidencia: IncidenciaServiceProvider) {
    this.vParameters = navParams.get('objRecPage02');
    debugger;
    this.listarCausalesXModulo(0, 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncidenciaPage');
  }

  dismiss(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  listarCausalesXModulo(id_Cliente, id_Modulo){
    this.sIncidencia.listarCausalesXModulo(id_Cliente, id_Modulo).then(result=>{
      debugger;
      console.log('Result', result);
    });
  }

}
