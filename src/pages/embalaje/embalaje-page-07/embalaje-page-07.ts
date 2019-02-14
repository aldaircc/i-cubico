import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';

/**
 * Generated class for the EmbalajePage_07Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-07',
  templateUrl: 'embalaje-page-07.html',
})
export class EmbalajePage_07Page {

  listBalanza: any;
  pesoFisico: number;
  vNroBulto: number;
  vNroBultoCeros:any;
  vEmbalajePage02: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sEmbalaje: EmbalajeServiceProvider) {
      this.vNroBulto = navParams.get('dataNroBulto'); 
      this.vNroBultoCeros = navParams.get('dataNroBultoCeros');  
      this.vEmbalajePage02 = navParams.get('dataPage02');     
  }

  getDataBalanzasXAlmacen() {
    this.ListarBalanzasXAlmacen(2);
  }

  ListarBalanzasXAlmacen(intId_almacen) {
    this.sEmbalaje.ListarBalanzasXAlmacen(intId_almacen).then((result) => {      
      this.listBalanza = result;
      if (this.listBalanza.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  ionViewWillEnter() {
    this.getDataBalanzasXAlmacen();    
  }
  
  GuardarPesoBulto(){   

    var objEmbalaje = {
      'Id_Tx': this.vEmbalajePage02.Id_Tx,
      'NroBulto': this.vNroBulto,
      'Peso': this.pesoFisico,
      'Observacion': this.vEmbalajePage02.Direccion,
      'CodigoBarra': this.vEmbalajePage02.Id_Tx+'/'+this.vNroBultoCeros      
    };
    debugger;
    this.sEmbalaje.RegistrarPesoBulto(objEmbalaje).then((result)=>{      
      console.log(result);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_07Page');
  }

}
