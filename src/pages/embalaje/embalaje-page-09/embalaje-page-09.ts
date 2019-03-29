import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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


  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
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

  EliminarItems(objDetBultoXBulto){
    objDetBultoXBulto.Anulado = 1;
    objDetBultoXBulto.Lote = objDetBultoXBulto.LoteLab;    
    this.mostrarAlerta(objDetBultoXBulto);
  }


  mostrarAlerta(objDetBultoXBulto){

    var message = "";
    message = "¿Desea eliminar bulto?";

    let alert = this.alertCtrl.create({
      title: 'Eliminar Bulto',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Buy clicked');  
                    
            
            this.sEmbalaje.RegistrarProductoBulto(objDetBultoXBulto).then((result)=>{ 
              debugger;
              console.log(result);
              var respuesta : any = result;

              this.mostrarConfirmacion("Confirmación",respuesta.message);            
              this.getDataDetalleBultoXBulto();         
            });
            
          }
        }
      ]
    });
    alert.present();

  }

  mostrarConfirmacion(title,message){
  
    let alertConfirmacion = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });
    alertConfirmacion.present();
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
