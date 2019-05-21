import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_07Page } from '../embalaje-page-07/embalaje-page-07';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';

/**
 * Generated class for the EmbalajePage_06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-06',
  templateUrl: 'embalaje-page-06.html',
})
export class EmbalajePage_06Page {

  vNroBulto: number;
  vNroBultoCeros: any;
  vEmbalajePage02: any;
  vFlagNuevoNumero: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sEmbalaje: EmbalajeServiceProvider) {      
    this.vNroBulto = navParams.get('dataNroBulto'); 
    this.vNroBultoCeros = navParams.get('dataNroBultoCeros');  
    this.vEmbalajePage02 = navParams.get('dataPage02');      
  }

  goToEmbalajePage07(){           
    this.navCtrl.push(EmbalajePage_07Page,{      
      dataNroBulto: this.vNroBulto,
      dataNroBultoCeros: this.vNroBultoCeros, 
      dataPage02: this.vEmbalajePage02 
    });
  }

  goToReciboPage04(){
    this.navCtrl.push(EmbalajePage_04Page,{   
      dataPageFiltro: '',
      dataTotalPage03: '',      
      nroBulto: this.vNroBulto + 1,   
      dataPage02: this.vEmbalajePage02      
      //dataNroBulto: this.vNroBulto,
      //nroBulto: this.vNroBultoCeros, 
      //dataPage02: this.vEmbalajePage02 
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_06Page');
  }

  ionViewWillLeave(){
    this.vFlagNuevoNumero = true;
  }

 

}
