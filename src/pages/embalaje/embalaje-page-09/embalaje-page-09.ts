import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';


/**
 * Generated class for the EmbalajePage_09Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-09',
  templateUrl: 'embalaje-page-09.html',
})
export class EmbalajePage_09Page {

  lstDetalleBultoXBulto: any;
  vNroBulto: any;
  vNroBultoCeros: any;
  vEmbalajePage02: any;
  vEmbalajePage03: any;
  vEmbalajeTotalPage03: any;
  vNroBulto2: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sEmbalaje: EmbalajeServiceProvider) {
      this.vNroBulto = navParams.get('dataNroBulto'); 
      this.vNroBultoCeros = navParams.get('dataNroBultoCeros'); 
      this.vEmbalajePage02 = navParams.get('dataPage02');   
      this.vEmbalajePage03 = navParams.get('dataPageFiltro');                
      this.vEmbalajeTotalPage03 = navParams.get('dataTotalPage03');  
      this.vNroBulto2 = navParams.get('dataNroBulto2');            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_09Page');
  }

  getDataDetalleBultoXBulto() {
    this.ListarDetalleBultoXBulto(this.vEmbalajePage02.Id_Tx,this.vNroBulto);
  }

  ListarDetalleBultoXBulto(strId_Tx,intNroBulto) {
    this.sEmbalaje.ListarDetalleBultoXBulto(strId_Tx,intNroBulto).then((result) => {
      debugger;
      this.lstDetalleBultoXBulto = result;
      if (this.lstDetalleBultoXBulto.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  goToEmbalajePage04(){
    debugger;
    this.navCtrl.push(EmbalajePage_04Page,{
      dataPageFiltro: this.vEmbalajePage03,                       
      dataPage02: this.vEmbalajePage02,
      dataTotalPage03: this.vEmbalajeTotalPage03,
      nroBulto: this.vNroBulto2      
    });
  }

  ionViewWillEnter() {
    this.getDataDetalleBultoXBulto();    
  }

}
