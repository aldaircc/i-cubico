import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ParametrosPage } from '../configurar/parametros/parametros';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goBackLoginPage(){
    this.navCtrl.push(HomePage);
  }

  ingresarParametros(){
    this.navCtrl.push(ParametrosPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurarPage');
  }

}
