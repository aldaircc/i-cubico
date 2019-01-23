import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReasignarUaPage } from '../reasignar-ua/reasignar-ua'
import { ReubicarUaPage } from '../reubicar-ua/reubicar-ua'
import { ParticionarUaPage } from '../particionar-ua/particionar-ua'




/**
 * Generated class for the AdministrarUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrar-ua',
  templateUrl: 'administrar-ua.html',
})
export class AdministrarUaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  goReasignarUaPage() {
    this.navCtrl.push(ReasignarUaPage);
  }

  goReubicarUaPage() {
    this.navCtrl.push(ReubicarUaPage);
  }

  goParticionarUaPage() {
    this.navCtrl.push(ParticionarUaPage);
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministrarUaPage');
  }

}
