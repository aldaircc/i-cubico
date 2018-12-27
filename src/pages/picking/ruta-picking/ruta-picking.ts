import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { DetallePickingPage } from '../detalle-picking/detalle-picking';
import { PickingPorProductoPage } from '../picking-por-producto/picking-por-producto';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'



/**
 * Generated class for the RutaPickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ruta-picking',
  templateUrl: 'ruta-picking.html',
})
export class RutaPickingPage {

  vPickingPage: any = [];
  vRutaPickingPage: any = [];
  listaTempRutaPicking: any = [];
  rutaPicking: any = [];
  posicion:number = 0;
  contador:number = 1;  
  total:number = 1;  

  codBar:string;
  codeBar:string;
  isBgRed:boolean = false;
  isBgGreen:boolean = false;
  Fila:string;
  

  Backisenabled:boolean=false;
  Nextisenabled:boolean=false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController, public toastCtrl: ToastController) {
    this.vPickingPage = navParams.get('data');
    this.getDataRutaPicking(this.vPickingPage.Id_Tx, 'Admin', 2);
  }

  goDetallePickingPage(){

    debugger;  
      this.vRutaPickingPage = {
        'Id_Tx' : this.vPickingPage.Id_Tx,
        'NumOrden' : this.vPickingPage.NumOrden,
        'Cliente' : this.vPickingPage.Cliente
      };

      this.navCtrl.push(DetallePickingPage, {
        data: this.vRutaPickingPage
      });    
  }

  // goDetallePickingPage():void{
  //   this.navCtrl.push(DetallePickingPage);
  // }  

  // goCerrarPickingPage():void{
  //   this.navCtrl.push(CierrePickingPage);
  // }

  goCerrarPickingPage(){

    debugger;  
      this.vRutaPickingPage = {
        'Id_Tx' : this.vPickingPage.Id_Tx,
        'NumOrden' : this.vPickingPage.NumOrden,
        'Ciudad' : this.vPickingPage.Ciudad,
        'Zona' : this.vPickingPage.Zona,
        'Saldo' : this.rutaPicking.Saldo
        
      };

      this.navCtrl.push(CierrePickingPage, {
        data: this.vRutaPickingPage
      });    
  }

  // goPickingPorProductoPage():void{
  //   this.navCtrl.push(PickingPorProductoPage);
  // }

  goPickingPorProductoPage(){

    debugger;  
      this.vRutaPickingPage = {
        'Id_Tx' : this.vPickingPage.Id_Tx,
        'NumOrden' : this.vPickingPage.NumOrden,
        'Cliente' : this.vPickingPage.Cliente
      };

      this.navCtrl.push(PickingPorProductoPage, {
        data: this.vRutaPickingPage
      });    
  }

  getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen){
    this.sPicking.getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen).then((result)=>{
      debugger;
      this.listaTempRutaPicking = result;
      this.rutaPicking = result[0];
      this.contador = 1;
      this.total = this.listaTempRutaPicking.length;      
      if(this.contador==this.listaTempRutaPicking.length){
        this.Nextisenabled=true;
      }
      console.log('detalles', this.rutaPicking);
      if(this.rutaPicking.length == 0){
        console.log('No se encontraron detalles', this.rutaPicking);  
      }
    },err=>{
      console.log('E-getDetailXTx',err);
    });
  }

  NextRutaPicking(){
    debugger;
    this.total = this.listaTempRutaPicking.length;
    this.posicion = this.posicion + 1;
    if(this.posicion<this.listaTempRutaPicking.length){
      this.contador = this.contador + 1;
      this.rutaPicking = this.listaTempRutaPicking[this.posicion];
      this.Backisenabled=true;
    }
    if(this.contador==this.listaTempRutaPicking.length){
      this.Nextisenabled=true;
    }
  }

    BackRutaPicking(){
      debugger;
      this.total = this.listaTempRutaPicking.length;
      this.posicion = this.posicion - 1;
      if(this.posicion>=0){
        this.contador = this.contador - 1;
        this.rutaPicking = this.listaTempRutaPicking[this.posicion];
        this.Nextisenabled=false;
      }
      if(this.contador==1){
        this.Backisenabled=false;
      }
    }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutaPickingPage');
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverRutaPickingPage, {
      // contentEle: this.content.nativeElement,
      // textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

  validarCodeBar(){
    debugger;
    if(this.codeBar){
      if(this.codeBar.trim()!=""){
        if (this.codeBar.trim().length >= 5){
      
          this.codBar = this.rutaPicking.Fila.trim() + this.rutaPicking.Columna.toString() + this.rutaPicking.Nivel.toString() + this.rutaPicking.Posicion.toString();
          if(this.codeBar.trim() == this.codBar){
            this.isBgGreen = true;
            this.isBgRed = false;
            this.goPickingPorProductoPage();
          }else{
            this.isBgGreen = false;
            this.isBgRed = true;
            this.codeBar = "";
          }
        }else{
          this.isBgGreen = false;
          this.isBgRed = true;
          this.codeBar = "";
        }
      }
      else{
        this.presentToast("Ingrese código de ubicación");
      }
      
    }else{
      this.presentToast("Ingrese código de ubicación");
    }
    
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });  
    toast.present();
  }

}




