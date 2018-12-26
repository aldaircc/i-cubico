import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReciboPage_05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo-page-05',
  templateUrl: 'recibo-page-05.html',
})
export class ReciboPage_05Page {

  vReciboPage04 : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vReciboPage04 = this.navParams.get('dataPage04');
    console.log('data page 04', this.navParams.get('dataPage04'));
  }

  ionViewDidLoad() {
    
  }

}
