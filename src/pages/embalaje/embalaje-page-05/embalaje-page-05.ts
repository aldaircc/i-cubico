import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_06Page } from '../embalaje-page-06/embalaje-page-06';
import { EmbalajePage_09Page } from '../embalaje-page-09/embalaje-page-09';
import { MethodFn } from '@angular/core/src/reflection/types';

/**
 * Generated class for the EmbalajePage_05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-05',
  templateUrl: 'embalaje-page-05.html',
})
export class EmbalajePage_05Page {
  detalle: string = "bultos";

  listDetBultosEmbalaje: any;  
  lstDetalleBultoXBulto: any;
  vNroBulto: number;
  vNroBultoCeros: any;
  vNroBultoCerosItems: any;
  vEmbalajePage02:any
  vEmbalajePage03: any;
  vEmbalajeTotalPage03: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public sEmbalaje: EmbalajeServiceProvider) {        
      this.vEmbalajePage03 = navParams.get('dataPageFiltro'); 
      this.vEmbalajeTotalPage03 = navParams.get('dataTotalPage03');   
      this.vNroBulto = navParams.get('dataNroBulto'); 
      this.vNroBultoCeros = navParams.get('dataNroBultoCeros'); 
      this.vEmbalajePage02 = navParams.get('dataPage02');        
      debugger;
  }

  getDataDetBultosEmbalaje() {
    this.ListarBultosDespacho(this.vEmbalajePage02.Id_Tx);
  }

  ListarBultosDespacho(strId_Tx) {
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {
      this.listDetBultosEmbalaje = result;                 
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  getDataDetalleBultoXBulto() {
    this.ListarBultosDespachoDetalle(this.vEmbalajePage02.Id_Tx);
  }

  ListarBultosDespachoDetalle(strId_Tx) {
    this.sEmbalaje.ListarBultosDespachoDetalle(strId_Tx).then((result) => {
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
  
  llenarNumeros(){    
    let s = this.vNroBultoCerosItems + "";
    while (s.length < 3)
      this.vNroBultoCerosItems = s = "0" + s;
    return this.vNroBultoCerosItems;
  }

  goToEmbalajePage06(){    
    debugger;    
    this.navCtrl.push(EmbalajePage_06Page,{                  
      dataNroBulto: this.vNroBulto,
      dataNroBultoCeros: this.vNroBultoCeros,      
      dataPage02: this.vEmbalajePage02 
    });
  }

  goToEmbalajePage09(objDetBultosEmbalaje){      
    this.vNroBultoCerosItems = objDetBultosEmbalaje.NroBulto;
    this.llenarNumeros();
    this.navCtrl.push(EmbalajePage_09Page,{
      dataPageFiltro: this.vEmbalajePage03,        
      dataTotalPage03: this.vEmbalajeTotalPage03,
      dataNroBulto2: this.vNroBulto,
      dataNroBulto: objDetBultosEmbalaje.NroBulto,
      dataNroBultoCeros: this.vNroBultoCerosItems,
      dataPage02: this.vEmbalajePage02,
    });
  }

  mostrarConfirmacion(message){
  
    let alertConfirmacion = this.alertCtrl.create({
      title: 'Confirmación',
      message: message,
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });
    alertConfirmacion.present();
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
          
          var objEmbalaje = {
            'Id_Tx': objDetBultoXBulto.Id_Tx,
            'NroBulto': objDetBultoXBulto.NroBulto,
            'Id_Producto': objDetBultoXBulto.Id_Producto,
            'Id_UM': objDetBultoXBulto.Id_UM,
            'Cantidad': objDetBultoXBulto.Cantidad,
            'Anulado': 1,
            'Id_RF': 1,
            'Item': objDetBultoXBulto.Item,
            'Id_Almacen': 2,
            'UsuarioRegistro': 'ADMIN',
            'Id_UMP': 0,
            'Lote': objDetBultoXBulto.LoteLab 
          };
          
          this.sEmbalaje.RegistrarProductoBulto(objEmbalaje).then((result)=>{ 
            debugger;
            console.log(result);
            var respuesta : any = result;

            this.mostrarConfirmacion(respuesta.message);
            this.getDataDetBultosEmbalaje();
            this.getDataDetalleBultoXBulto();         
          });
          
        }
      }
    ]
  });
  alert.present();

  }

  eliminarBulto(objDetBultoXBulto){
    this.mostrarAlerta(objDetBultoXBulto);
  }

  ionViewWillEnter() {
    this.getDataDetBultosEmbalaje();
    this.getDataDetalleBultoXBulto();
  }

  

}
