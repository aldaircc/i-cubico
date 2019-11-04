import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the BultoMasivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bulto-masivo',
  templateUrl: 'bulto-masivo.html',
})
export class BultoMasivoPage {

  valorpopoverGlobal: boolean = false
  popoverGlobal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BultoMasivoPage');
  }

  ionViewWillEnter() {

  }

}
