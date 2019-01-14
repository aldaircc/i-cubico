import { Component, ViewChild, ElementRef } from '@angular/core';
import { PickingServiceProvider } from '../../providers/picking-service/picking-service';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, ToastController  } from 'ionic-angular';
import { RutaPickingPage } from '../picking/ruta-picking/ruta-picking'
import { IncidenciaPage } from '../incidencia/incidencia';
import { PopoverPickingPage } from '../picking/popover/popover-picking/popover-picking'
import { DetallePickingPage } from '../picking/detalle-picking/detalle-picking'
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

/**
 * Generated class for the PickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picking',
  templateUrl: 'picking.html'
})

export class PickingPage {

  searchQuery: string='';  
  listOrdenesPicking: any;
  listAuxOrdenesPicking: any;
  userDetail: any;
  rowCount: any;
  vPickingPage: any;

  listaTempRutaPicking: any = [];

  // @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  // @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,    
    public sPicking: PickingServiceProvider, public modalCtrl: ModalController, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider) {
    const data = JSON.parse(localStorage.getItem('vUserData'));
    this.userDetail = data;
    this.getDataOrdenes();
  }

  
  filterItems(ev: any){
    debugger;
    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.listAuxOrdenesPicking = this.listOrdenesPicking.filter((item)=>{
        return (item.NumOrden.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxOrdenesPicking.length;
    }else{
      this.rowCount = this.listOrdenesPicking.length;
      return this.listAuxOrdenesPicking = this.listOrdenesPicking;
    }
  }

  ValidarOrden(data){
    debugger;
    if(data.FlagPausa == true){
      this.showModalIncidencia(data);
    }else{
      this.getDataRutaPicking(data.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen, data)  
    }
  }

  getDataOrdenes(){
    // this.getOrdenesXUsuario(this.userDetail[0].Usuario, 2);
    this.searchQuery = "";
    this.getOrdenesXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  getOrdenesXUsuario(strUsuario, intIdAlmacen){
    
    this.sPicking.getOrdenesXUsuario(strUsuario, intIdAlmacen).then((result)=>{
      debugger;
      this.listOrdenesPicking = result;
      this.listAuxOrdenesPicking = this.listOrdenesPicking;
      this.rowCount = this.listAuxOrdenesPicking.length;
      if(this.listOrdenesPicking.length > 0){
        console.log('Datos ordenes picking', this.listOrdenesPicking);
      }else{
        alert('No se encontrarón datos.');
      }
    }, (err)=>{
      console.log('E-Ordenes Picking listar', err);
    });
  }  

  getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen, data){
    this.sPicking.getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen).then((result)=>{
      debugger;
      this.listaTempRutaPicking = result;
      for(var i = 0; i< this.listaTempRutaPicking.length; i++){
        if(result[i].Saldo>0){ 
          if(result[i].FlagTransito == false){     
            //Ir a ruta picking
            this.goRutaPickingPage(data);
            return;
          }else{
            // this.presentToast("No existe ruta para este producto");
            // this.goDetallePickingPage(data);
            //return;
            if(i==this.listaTempRutaPicking.length-1){
              this.presentToast("No existe ruta para este producto");
              this.goDetallePickingPage(data);
              return;
            }
          }        
        }
        if(i==this.listaTempRutaPicking.length-1){
          this.presentToast("No existe ruta para este producto");
          this.goDetallePickingPage(data);
          return;
        }
      }      
    },err=>{
      console.log('E-getDataRutaPicking',err);
    });
  }

  goRutaPickingPage(data){
    this.vPickingPage = {
      'Id_Tx' : data.Id_Tx,
      'NumOrden' : data.NumOrden,
      'Cliente' : data.Cliente,
      'Ciudad' : data.Ciudad,
      'Zona' : data.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vPickingPage
    });
  }

  goDetallePickingPage(data){
    debugger;  
      this.vPickingPage = {
        'Id_Tx' : data.Id_Tx,
        'NumOrden' : data.NumOrden,
        'Cliente' : data.Cliente
      };
      this.navCtrl.push(DetallePickingPage, {
        data: this.vPickingPage
      });    
  }

  showModalIncidencia(data){
    let obj = { 
        'Id_Tx' : data.Id_Tx,
        'NumOrden' : data.NumOrden,
        'Cliente' : data.Cliente,
        'Ciudad' : data.Ciudad,
        'Zona' : data.Zona
      };

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia' : obj});
    modalIncidencia.onDidDismiss(data =>{
      debugger;
      console.log("datos", data);
    });
    modalIncidencia.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });  
    toast.present();
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPickingPage, {
      // contentEle: this.content.nativeElement,
      // textEle: this.text.nativeElement
    });
    popover.present({
      ev: ev
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPage');
  }

}
