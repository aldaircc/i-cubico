import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmbalajePage_02Page } from '../embalaje/embalaje-page-02/embalaje-page-02';

/**
 * Generated class for the EmbalajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje',
  templateUrl: 'embalaje.html',
})
export class EmbalajePage {  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage');
  }

  goEmbalajePackingPage(){    
    this.navCtrl.push(EmbalajePage_02Page);
  }

}
