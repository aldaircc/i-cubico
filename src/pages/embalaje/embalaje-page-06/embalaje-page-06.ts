import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_07Page } from '../embalaje-page-07/embalaje-page-07';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

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

  peso: any;
  pesoFisico: any;
  resultRegistro: any;

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    public sEmbalaje: EmbalajeServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vNroBulto = navParams.get('dataNroBulto');
    this.vNroBultoCeros = navParams.get('dataNroBultoCeros');
    this.vEmbalajePage02 = navParams.get('dataPage02');
    //this.pesoFisico = navParams.get('peso');
  }

  // dataFromPeso: any;
  // pesoCallback = data => {
  //   debugger;
  //   this.dataFromPeso = data;
  //   console.log('data received from other page', this.dataFromPeso);
  //   debugger;
  //   this.pesoFisico = this.dataFromPeso.peso;
  // };

  goToEmbalajePage07() {
    debugger;    
    this.navCtrl.push(EmbalajePage_07Page, {
      dataNroBulto: this.vNroBulto, dataNroBultoCeros: this.vNroBultoCeros,
      dataPage02: this.vEmbalajePage02
    });
  }


  // goToEmbalajePage07() {
  //   debugger;
  //   this.navCtrl.push(EmbalajePage_07Page, {
  //     dataNroBulto: this.vNroBulto, dataNroBultoCeros: this.vNroBultoCeros,
  //     dataPage02: this.vEmbalajePage02, page: 6, peso: this.pesoCallback
  //   });
  // }

  GuardarPesoBulto() {
    debugger;
    if (this.pesoFisico > 1) {
      var objEmbalaje = {
        'Id_Tx': this.vEmbalajePage02.Id_Tx,
        'NroBulto': this.vNroBulto,
        'Peso': this.pesoFisico,
        'Observacion': this.vEmbalajePage02.Direccion,
        'CodigoBarra': this.vEmbalajePage02.Id_Tx + '/' + this.vNroBultoCeros
      };
      debugger;
      this.sEmbalaje.RegistrarPesoBulto(objEmbalaje).then((result) => {
        console.log(result);
        debugger;
        this.resultRegistro = result;
        if (this.resultRegistro.errNumber == 0) {
          this.presentAlert(this.resultRegistro.message);
          this.goPrepararBultosBack();
        } else {
          this.presentAlert(this.resultRegistro.message);
        }
      });
    } else {
      this.presentAlert("No se ha capturado peso del bulto.");
    }
  }

  goPrepararBultosBack() { 
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'EmbalajePage_04Page') {
        this.sGlobal.resultGrabarBulto = true;
        this.navCtrl.popTo(item);
      }
    });
  }

  presentAlert(message): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [{
          text: 'OK',
          handler: () => {
            resolve(true);
            console.log('Agree clicked');
          }
        }]
      });
      confirm.present();
    })
  }

  // goToEmbalajePage07_old(){           
  //   this.navCtrl.push(EmbalajePage_07Page,{      
  //     dataNroBulto: this.vNroBulto,
  //     dataNroBultoCeros: this.vNroBultoCeros, 
  //     dataPage02: this.vEmbalajePage02 
  //   });
  // }

  goToReciboPage04() {
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'EmbalajePage_04Page') {
        this.navCtrl.popTo(item);
      }
    });
    // this.navCtrl.push(EmbalajePage_04Page, {
    //   dataPageFiltro: '',
    //   dataTotalPage03: '',
    //   nroBulto: this.vNroBulto + 1,
    //   dataPage02: this.vEmbalajePage02
    //   //dataNroBulto: this.vNroBulto,
    //   //nroBulto: this.vNroBultoCeros, 
    //   //dataPage02: this.vEmbalajePage02 
    // });
  }

  ionViewDidLoad() {

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.getViews().forEach(item => {
        if (item.name == 'EmbalajePage_04Page') {
          this.navCtrl.popTo(item);
        }
      });
    }


    console.log('ionViewDidLoad EmbalajePage_06Page');
  }

  ionViewWillLeave() {
    this.vFlagNuevoNumero = true;
  }

  ionViewWillEnter() {  
    if(this.sGlobal.resultObtenerPeso){
      debugger;
      this.pesoFisico = this.sGlobal.pesoBulto;
      this.sGlobal.resultObtenerPeso = false;
      this.sGlobal.pesoBulto = 0;
    }       
  }



}
