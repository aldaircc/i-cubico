import { Component, DebugElement } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_05Page } from '../embalaje-page-05/embalaje-page-05';
import { EmbalajePage_09Page } from '../embalaje-page-09/embalaje-page-09';
import { RenderDebugInfo } from '@angular/core/src/render/api';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
/**
 * Generated class for the EmbalajePage_04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-04',
  templateUrl: 'embalaje-page-04.html',
})
export class EmbalajePage_04Page {

  vEmbalajePage03:any;
  vEmbalajeTotalPage03:any;
  vNroBulto: any;
  vNroItem: number = 1;
  vTotalItems: any;
  cantEmbalar:number;  
  vNroBultoCeros: any;
  vEmbalajePage02:any;
  listDetEmbalaje: any;
  listAuxDetEmbalaje: any;
  listDetBultosEmbalaje: any;
  rowCount: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,public sEmbalaje: EmbalajeServiceProvider,
    public sGlobal: GlobalServiceProvider) {        
    this.vEmbalajePage03 = navParams.get('dataPageFiltro');           
    this.vEmbalajePage02 = navParams.get('dataPage02');   
    this.vEmbalajeTotalPage03 = navParams.get('dataTotalPage03');   
    this.vNroBulto = this.vNroBultoCeros =  navParams.get('nroBulto');               
    this.vTotalItems = this.vEmbalajeTotalPage03.length; 
    this.llenarNumeros();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_04Page');
  }

  filterItemsBultos(ev: any) {      
    this.vEmbalajePage03 = this.vEmbalajeTotalPage03.filter((item) => {     
      
      return (item.Item == ev);     
    });     
    debugger;
    return this.vEmbalajePage03;
  }

  goToAnterior(){        
    if((this.vNroItem - 1) != 0)    
    {
      this.filterItemsBultos(this.vNroItem - 1);       
      this.vNroItem = (this.vNroItem - 1);     
    }
  }

  goToSiguiente(){        
    if(this.vNroItem  != this.vEmbalajeTotalPage03.length)    
    {
      this.filterItemsBultos(this.vNroItem + 1);  
      this.vNroItem = (this.vNroItem + 1);
    }
  }  
  
  goToEmbalajePage05(){        
    this.navCtrl.push(EmbalajePage_05Page,{   
      dataPageFiltro: this.vEmbalajePage03,           
      dataNroBultoCeros: this.vNroBultoCeros,
      dataTotalPage03: this.vEmbalajeTotalPage03,
      dataNroBulto: this.vNroBulto,        
      dataPage02: this.vEmbalajePage02    
    });
  }

  goToEmbalajePage09(){            
    this.navCtrl.push(EmbalajePage_09Page,{  
      dataPageFiltro: this.vEmbalajePage03,                       
      dataNroBultoCeros: this.vNroBultoCeros,
      dataTotalPage03: this.vEmbalajeTotalPage03,
      dataNroBulto: this.vNroBulto,
      dataNroBulto2: this.vNroBulto,      
      dataPage02: this.vEmbalajePage02 
    });
  }

  llenarNumeros(){    
    let s = this.vNroBultoCeros + "";
    while (s.length < 3)
      this.vNroBultoCeros = s = "0" + s;
    return this.vNroBultoCeros;
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


  getDataDetEmbalaje() {
    this.ListarDespachoDetalle(this.vEmbalajePage02.Id_Tx);
    
  }

  ListarDespachoDetalle(strId_Tx) {

    this.sEmbalaje.ListarDespachoDetalle(strId_Tx).then((result) => {
      this.listDetEmbalaje = result;
      this.vEmbalajeTotalPage03 = this.listAuxDetEmbalaje = this.listDetEmbalaje;
      debugger;
      this.vTotalItems = this.rowCount = this.listAuxDetEmbalaje.length;
      this.filterItemsBultos(this.vNroItem); 
      if (this.listDetEmbalaje.length > 0) {

      } else {
        alert('No se encontraron datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  getDataDetBultosEmbalaje() {        
    this.ListarBultosDespacho(this.vEmbalajePage02.Id_Tx);
  }

  ListarBultosDespacho(strId_Tx) {        
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {         
      this.listDetBultosEmbalaje = result;    
      this.validacionNroBulto();
      this.llenarNumeros();
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  validacionNroBulto(){     
    if(this.listDetBultosEmbalaje.length > 0)
      this.vNroBultoCeros = this.vNroBulto = this.listDetBultosEmbalaje[this.listDetBultosEmbalaje.length - 1].NroBulto + 1
    else
      this.vNroBultoCeros = this.vNroBulto = 1
  }


  guardarProductoBulto(){       
    if(this.cantEmbalar == undefined || this.cantEmbalar == 0){
      this.mostrarConfirmacion("Advertencia","Debe ingresar una cantidad a embalar");
      return;
    }

    if(this.cantEmbalar > this.vEmbalajePage03[0].CantidadPedida){
      this.mostrarConfirmacion("Advertencia","La cantidad a embalar es mayor a la cantidad pedida");
      return;
    }

    if(this.cantEmbalar > this.vEmbalajePage03[0].Saldo){
      this.mostrarConfirmacion("Advertencia","La cantidad a embalar es mayor al saldo");
      return;
    }


    var objEmbalaje = {
      'Id_Tx': this.vEmbalajePage03[0].Id_Tx,
      'NroBulto': this.vNroBulto,
      'Id_Producto': this.vEmbalajePage03[0].Id_Producto,
      'Id_UM': this.vEmbalajePage03[0].Id_UM,
      'Cantidad': this.cantEmbalar,
      'Anulado': 0,
      'Id_RF': 1,
      'Item': this.vEmbalajePage03[0].Item,
      'Id_Almacen': 2,
      'UsuarioRegistro': this.sGlobal.userName,
      'Id_UMP': 0,
      'Lote': this.vEmbalajePage03[0].Lote 
    };
    
    this.sEmbalaje.RegistrarProductoBulto(objEmbalaje).then((result)=>{  
      console.log(result);
      this.getDataDetEmbalaje();

      this.cantEmbalar = 0.00;      
      var respuesta : any = result;      
      if(respuesta.errNumber == -1)
        this.mostrarConfirmacion("Advetencia",respuesta.message);      
                  
    });
  }

  ionViewWillEnter() {   
    debugger; 
    this.getDataDetEmbalaje();    
    // this.getDataDetBultosEmbalaje();    
  }

}