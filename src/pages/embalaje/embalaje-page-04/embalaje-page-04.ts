import { Component, DebugElement } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController,ModalController,ToastController } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_05Page } from '../embalaje-page-05/embalaje-page-05';
import { EmbalajePage_06Page } from '../embalaje-page-06/embalaje-page-06';
import { EmbalajePage_07Page } from '../embalaje-page-07/embalaje-page-07';
import { EmbalajePage_08Page } from '../embalaje-page-08/embalaje-page-08';
import { EmbalajePage_09Page } from '../embalaje-page-09/embalaje-page-09';
import { PopoverEmbalajeComponent } from '../../../components/popover-embalaje/popover-embalaje';
import { HomePage } from '../../home/home';
import { RenderDebugInfo } from '@angular/core/src/render/api';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { ImpresoraPage } from '../../impresora/impresora';
import { IncidenciaPage } from '../../incidencia/incidencia';
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
  rowReciboSelect: any;
  txtCant : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,private alertCtrl: AlertController,public sEmbalaje: EmbalajeServiceProvider,public modalCtrl: ModalController,
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
      dataPage02: this.vEmbalajePage02,
      flagTodoItems: true 
    });
  }

  goToEmbalajePage08(){               
    this.navCtrl.push(EmbalajePage_08Page,{
      dataPage02: this.vEmbalajePage02,
      totalBultos: this.rowCount
    });
  }

  


  // goToEmbalajePage07() {
  //   debugger;    
  //   this.navCtrl.push(EmbalajePage_07Page, {
  //     dataNroBulto: this.vNroBulto, dataNroBultoCeros: this.vNroBultoCeros,
  //     dataPage02: this.vEmbalajePage02, peso: this.pesoCallback
  //   });
  // }

  goToEmbalajePage07(){           
    this.navCtrl.push(EmbalajePage_07Page,{      
      dataNroBulto: this.vNroBulto,
      dataNroBultoCeros: this.vNroBultoCeros, 
      dataPage02: this.vEmbalajePage02
      //page: 4 
    });
  }

  goToEmbalajePage06(){    
    debugger;    
    this.navCtrl.push(EmbalajePage_06Page,{                  
      dataNroBulto: this.vNroBulto,
      dataNroBultoCeros: this.vNroBultoCeros,      
      dataPage02: this.vEmbalajePage02,
      //peso: 0 
    });
  }

  llenarNumeros(){ 
    debugger;   
    this.vNroBulto = this.vNroBulto  + 1;
    this.vNroBultoCeros = parseInt(this.vNroBultoCeros)   + 1;
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

  getRegistrarIncidencia(obj):void{      
    this.rowReciboSelect = obj;
    this.showToast('Recibo: '+ obj.Id_Tx + ' seleccionado', 2000, 'bottom', true, 'x', true);
  }

  showToast(message, duration, position, showClose, closeText, dismissChange){
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showClose,
      closeButtonText: closeText,
      dismissOnPageChange: dismissChange
    });

    toast.present();
  }

  // getDataDetBultosEmbalaje() {        
  //   this.ListarBultosDespacho(this.vEmbalajePage02.Id_Tx);
  // }

  // ListarBultosDespacho(strId_Tx) {        
  //   this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {         
  //     this.listDetBultosEmbalaje = result;    
  //     this.validacionNroBulto();
  //     this.llenarNumeros();
  //   }, (err) => {
  //     console.log('E-Embalaje listar', err);
  //   });
  // }

  // validacionNroBulto(){     
  //   if(this.listDetBultosEmbalaje.length > 0)
  //     this.vNroBultoCeros = this.vNroBulto = this.listDetBultosEmbalaje[this.listDetBultosEmbalaje.length - 1].NroBulto + 1
  //   else
  //     this.vNroBultoCeros = this.vNroBulto = 1
  // }


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

  showModalIncidencia(data) {
    let obj = {
      'Id_Tx': data.Id_Tx,
      'FlagPausa': data.FlagPausa,
      'Cliente': data.Cliente,
      'Id_Cliente': data.Id_Cliente,
      'Proveedor': data.Proveedor,
      'Id_TipoMovimiento': data.Id_TipoMovimiento,
      'Origen': 'RP01',
      'id_Modulo': 1
    };

    this.sGlobal.resultIncidencia = false;
    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });
    modalIncidencia.onDidDismiss(result => {
      if (this.sGlobal.resultIncidencia) {
        this.goToEmbalajePage02();
      }
      // if (result.response == 200 && result.isChangePage == true) {
      //   data.FlagPausa = !data.FlagPausa;
      //   //this.goToReciboPage02(data);
      // }else{
      //   //this.getDataRecepcion();
      // }
    });
    modalIncidencia.present();
  }

  goToEmbalajePage02() {
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'EmbalajePage_02Page') {
        this.navCtrl.popTo(item);
      }
    });
  }

//   this.txtCant = document.getElementById('txtCantidad');

//   number.onkeydown = function(e) {
//     if(!((e.keyCode > 95 && e.keyCode < 106)
//       || (e.keyCode > 47 && e.keyCode < 58) 
//       || e.keyCode == 8)) {
//         return false;
//     }
// }

CantChange(ev:any){
      if(!((ev.keyCode > 95 && ev.keyCode < 106)
      || (ev.keyCode > 47 && ev.keyCode < 58) 
      || ev.keyCode == 8)) {
        return true;
    }
}

  presentPopover(myEvent){
    // let popover = this.popoverCtrl.create(PopoverEmbalajeComponent, {'page' : 12, 'has_Id_Tx': (this.rowReciboSelect != undefined) ? true : false });    
    // popover.present({
    //   ev: myEvent
    // });

    let popover = this.popoverCtrl.create(PopoverEmbalajeComponent, { 'page': 15 });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      debugger;
      if(popoverData == 1){
        // this.showModalIncidencia(this.rowReciboSelect);
        this.showModalIncidencia(this.vEmbalajePage02);        
      }
      if(popoverData == 4){
        this.showModalImpresora();
      }else if(popoverData == 5){
        this.goBackLoginPage();
      }
    });   
  }

  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }
  goBackLoginPage():void{
    this.navCtrl.push(HomePage);
  }

  ionViewWillEnter() {       
    this.getDataDetEmbalaje();  
    
    if(this.sGlobal.resultGrabarBulto){
      this.llenarNumeros();
      this.sGlobal.resultGrabarBulto = false;
    }
    
    debugger; 
    // this.getDataDetBultosEmbalaje();    
  }

}