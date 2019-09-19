import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import moment from 'moment';
import { ImpresoraServiceProvider } from '../../../providers/impresora-service/impresora-service';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EtiquetadoServiceProvider } from '../../../providers/etiquetado-service/etiquetado-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';



/**
 * Generated class for the EmbalajePage_08Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-08',
  templateUrl: 'embalaje-page-08.html',
})
export class EmbalajePage_08Page {

  listImpresora: any;
  listDetBultosEmbalaje: any;  
  vEmbalajeTotalPage02: any;  
  formatLabels : any = 'ETQ_Bultov2.txt';
  id_Impresora: any;  
  vNombreImpresora: any;
  vUltimoBulto:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,    
    public sImpresora: ImpresoraServiceProvider,  public sEmbalaje: EmbalajeServiceProvider, public sEtq: EtiquetadoServiceProvider,
    public alertCtrl: AlertController,public sGlobal: GlobalServiceProvider) {       
      debugger;
      this.vEmbalajeTotalPage02 = navParams.get('dataPage02');         
      this.getDataDetBultosEmbalaje();                 
  }

  getDataAccesosImpresoraXUsuario() {
    this.ListarAccesosImpresoraXUsuario(this.sGlobal.userName);
  }

  filterImpresora(ev: any) {
  
    this.listImpresora = this.listImpresora.filter((item) => {
      
      return (item.Acceso == ev);
     
    });     
    return this.listImpresora;
  }

  ListarAccesosImpresoraXUsuario(strUsuario) {
    this.sImpresora.listarAccesosImpresoraXUsuario(strUsuario).then((result) => {      
      this.listImpresora = result;
      this.filterImpresora(1);
      if (this.listImpresora.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  ionViewWillEnter() {
    this.getDataAccesosImpresoraXUsuario();    
  }


  getDataDetBultosEmbalaje() {        
    this.ListarBultosDespacho(this.vEmbalajeTotalPage02.Id_Tx);
  }
  
  ListarBultosDespacho(strId_Tx) {    
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {           
      this.listDetBultosEmbalaje = result; 
      debugger;
      for (let index = 0; index < this.listDetBultosEmbalaje.length; index++) {
        if(index == this.listDetBultosEmbalaje.length - 1)          
          this.vUltimoBulto = this.listDetBultosEmbalaje[index].NroBulto;
      }
                      
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  obtenerNombreImpresora(){        
    this.id_Impresora
    this.vNombreImpresora = this.listImpresora.filter((item) => {
      return (item.Id_Impresora == this.id_Impresora);
    });    

    this.vNombreImpresora = this.vNombreImpresora[0].Nombre;
    console.log(this.vNombreImpresora);
    debugger;
  }


  // obtenerNombre(nombre: any){
  //   nombre
  //   debugger;
  // }


  ImprimirBultos(){    
    var listContainer = [];
    var listEtq = [];
    let currentDate = moment(new Date());    
    
    
    for(let i = 0; i < this.listDetBultosEmbalaje.length; i++){  
      listEtq = [];
      listEtq.push({ "campo": "|FACTURA|", "valor" : "" });
      listEtq.push({ "campo": "|CODZONA|", "valor" : this.vEmbalajeTotalPage02.CodigoZona } );
      listEtq.push({ "campo": "|CLIENTE|", "valor" :  this.vEmbalajeTotalPage02.Cliente });
      listEtq.push({ "campo": "|ALMACEN|", "valor" : this.sGlobal.nombreAlmacen });
      listEtq.push({ "campo": "|ZONA|", "valor" :  this.vEmbalajeTotalPage02.Zona });
      listEtq.push({ "campo": "|DIRECCION|", "valor" : this.vEmbalajeTotalPage02.Direccion });
      listEtq.push({ "campo": "|PICKING|", "valor" : this.vEmbalajeTotalPage02.NumOrden });
      listEtq.push({ "campo": "|BULTO|", "valor" :  this.listDetBultosEmbalaje[i].NroBulto });
      listEtq.push({ "campo": "|CODBARRA|", "valor" :  this.listDetBultosEmbalaje[i].CodigoBarra });
      listEtq.push({ "campo": "|PESO|", "valor" :  this.listDetBultosEmbalaje[i].Peso });
      listEtq.push({ "campo": "|CIUDAD|", "valor" :  this.vEmbalajeTotalPage02.Ciudad });
      listEtq.push({ "campo": "|PEDIDO|", "valor" :  this.vEmbalajeTotalPage02.NumOrden });
      listEtq.push({ "campo": "|FECHA|", "valor" : currentDate.format("DD/MM/YYYY") });
      listEtq.push({ "campo": "|OBSERVACION|", "valor" : this.listDetBultosEmbalaje[i].Observacion });
      listEtq.push({ "campo": "|GUIA|", "valor" : "" });
      listContainer.push({ 'etiqueta' : listEtq }); 
    
    }

    this.sEtq.imprimirListaEtiquetas(listContainer, this.formatLabels, this.vNombreImpresora, true).then(result=>{
      debugger;
      var message : any = result;
      if (message.errNumber == -1){
        //Toast.makeText(this, "Print"+ message.message, Toast.LENGTH_SHORT).show();
        alert(message.mensaje);
      }else{
        alert("Impresión exitosa.");
      }
    });    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_08Page');
  }

}
