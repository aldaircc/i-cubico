import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ReciboPage } from '../recibo/recibo';
import { AlmacenajePage } from '../almacenaje/almacenaje';
import { EmbalajePage } from '../embalaje/embalaje';

/**
 * Generated class for the MainMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  userProfile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userProfile=this.navParams.data;

  }

  ionViewDidLoad() {
    console.log(this.navParams.get('Almacen'));
   
  }

  goBackWarehouseSelect():void{
    this.navCtrl.pop();

  }

  goBackLoginPage():void{
    this.navCtrl.push(HomePage);
  }

  goReciboPage(){
    this.navCtrl.push(ReciboPage);

  }

  goAlmacenajePage(){
    this.navCtrl.push(AlmacenajePage);
  }

  goEmbalajePage(){
    this.navCtrl.push(EmbalajePage);
  }
}
