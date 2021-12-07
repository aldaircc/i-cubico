import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';


/**
 * Generated class for the EmbalajePage_09Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-12',
  templateUrl: 'embalaje-page-12.html',
})
export class EmbalajePage_12Page {

  lstDetalleBultoXBulto: any;
  vNroBulto: any;
  vNroBultoCeros: any;
  vEmbalajePage02: any;
  vEmbalajePage03: any;
  vEmbalajeTotalPage03: any;
  vNroBulto2: any;
  vFlagTodoItems: false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, public sGlobal: GlobalServiceProvider,
    public sEmbalaje: EmbalajeServiceProvider) {
    this.vNroBulto = navParams.get('dataNroBulto');
    this.vNroBultoCeros = navParams.get('dataNroBultoCeros');
    this.vEmbalajePage02 = navParams.get('dataPage02');
    this.vEmbalajePage03 = navParams.get('dataPageFiltro');
    this.vEmbalajeTotalPage03 = navParams.get('dataTotalPage03');
    this.vNroBulto2 = navParams.get('dataNroBulto2');
    this.vFlagTodoItems = navParams.get('flagTodoItems');
    this.sGlobal.resultGrabarBulto = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_12Page');
  }

  getDataBultosDespachoDetalle() {
    this.ListarBultosDespachoDetalle(this.vEmbalajePage02.Id_Tx);
  }

  llenarNumeros(bulto) {
    debugger;
    let s = bulto + "";
    while (s.length < 3)
      this.vNroBultoCeros = s = "0" + s;
    return this.vNroBultoCeros;
  }

  ListarBultosDespachoDetalle(strId_Tx) {
    this.sEmbalaje.ListarBultosDespachoDetalle(strId_Tx).then((result) => {

      this.lstDetalleBultoXBulto = result;
      for (let index = 0; index < this.lstDetalleBultoXBulto.length; index++) {
        this.lstDetalleBultoXBulto[index].NroBulto = this.llenarNumeros(this.lstDetalleBultoXBulto[index].NroBulto);
      }
      if (this.lstDetalleBultoXBulto.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  getDataDetalleBultoXBulto() {
    this.ListarDetalleBultoXBulto(this.vEmbalajePage02.Id_Tx, this.vNroBulto);
  }

  ListarDetalleBultoXBulto(strId_Tx, intNroBulto) {
    this.sEmbalaje.ListarDetalleBultoXBulto(strId_Tx, intNroBulto).then((result) => {
      debugger;
      this.lstDetalleBultoXBulto = result;
      for (let index = 0; index < this.lstDetalleBultoXBulto.length; index++) {
        this.lstDetalleBultoXBulto[index].NroBulto = this.llenarNumeros(this.lstDetalleBultoXBulto[index].NroBulto);
      }      
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  EliminarItems(objDetBultoXBulto) {
    objDetBultoXBulto.Anulado = 1;
    objDetBultoXBulto.Lote = objDetBultoXBulto.LoteLab;
    this.mostrarAlerta(objDetBultoXBulto);
  }

  mostrarAlerta(objDetBultoXBulto) {
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


            this.sEmbalaje.RegistrarProductoBulto(objDetBultoXBulto).then((result) => {
              debugger;
              console.log(result);
              var respuesta: any = result;
              this.mostrarConfirmacion("Confirmación", respuesta.message);
              if (this.vFlagTodoItems)
              this.getDataBultosDespachoDetalle();
            else
              this.getDataDetalleBultoXBulto();

            });

          }
        }
      ]
    });
    alert.present();

  }

  mostrarConfirmacion(title, message) {
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

  // goToEmbalajePage04() {    
  //   this.navCtrl.getViews().forEach(item => {
  //     if (item.name == 'EmbalajePage_04Page') {                
  //       this.navCtrl.popTo(item);
  //     }
  //   });
  // }

  ionViewWillEnter() {
    debugger;
    if (this.vFlagTodoItems)
      this.getDataBultosDespachoDetalle();
    else
      this.getDataDetalleBultoXBulto();
  }
}
