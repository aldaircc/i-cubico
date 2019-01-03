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
  listaRutaPicking: any = [];
  rutaPicking: any = [];
  posicion:number = 0;
  contador:number = 1;  
  total:number = 1;  

  idRutaPicking:number = 0; 

  codBar:string;
  codeBar:string;
  isBgRed:boolean = false;
  isbgWhite:boolean = false;
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
        'Cliente' : this.vPickingPage.Cliente,
        'Ciudad' :  this.vPickingPage.Ciudad,
        'Zona' :  this.vPickingPage.Zona
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

    let saldoTotal = this.listaRutaPicking.reduce(function(prev, cur){
      return prev + cur.Saldo;
    }, 0);


    debugger;  
      this.vRutaPickingPage = {
        'Id_Tx' : this.vPickingPage.Id_Tx,
        'NumOrden' : this.vPickingPage.NumOrden,
        'Ciudad' : this.vPickingPage.Ciudad,
        'Zona' : this.vPickingPage.Zona,
        'Saldo' : saldoTotal
        
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
      this.idRutaPicking = 0;
      this.listaTempRutaPicking = result;
      for(var i = 0; i< this.listaTempRutaPicking.length; i++){
        var obj = { 
          'idRutaPicking' : this.idRutaPicking,
          'Caja' : result[i].Caja,
          'CantidadPedida' : result[i].CantidadPedida,
          'CodBarraUbi' : result[i].CodBarraUbi,
          'CodigoProducto' : result[i].CodigoProducto,
          'Columna' : result[i].Columna,
          'Contenedor' : result[i].Contenedor,
          'Fila' : result[i].Fila,
          'FlagAscendente' : result[i].FlagAscendente,
          'FlagDescendente' : result[i].FlagDescendente,
          'FlagTransito' : result[i].FlagTransito,
          'IdPasillo' : result[i].IdPasillo,
          'IdProducto' : result[i].IdProducto,
          'IdSector' : result[i].IdSector,
          'IdUMBase' : result[i].IdUMBase,
          'IdUbicacion' : result[i].IdUbicacion,
          'Item' : result[i].Item,
          'LoteProducto' : result[i].LoteProducto,
          'LoteRecibo' : result[i].LoteRecibo,
          'Nivel' : result[i].Nivel,
          'Pasillo' : result[i].Pasillo,
          'Posicion' : result[i].Posicion,
          'Producto' : result[i].Producto,
          'Referencia' : result[i].Referencia,
          'Saldo' : result[i].Saldo,
          'SaldoCaja' : result[i].SaldoCaja,
          'Sector' : result[i].Sector,
          'UMBase' : result[i].UMBase        
        };
        this.listaRutaPicking.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }
      
      //Agregar columna idRuta, para que se pueda usar al momento de volver de detalle
      //comparar idRuta para actualizar la posicion de la lista
      for(var i = 0; i< this.listaRutaPicking.length; i++){
        if(result[0].Saldo>0){ 
          if(result[0].FlagTransito == false){

            var id = this.vPickingPage.idRutaPicking;
            this.contador = 1;
            if(id){
              this.contador = id + 1;
              this.posicion = id;
              this.rutaPicking = result[this.posicion];
              if(this.contador==1){
                this.Backisenabled=false;
              }else{this.Backisenabled=true;}
              if(this.contador==this.listaRutaPicking.length){
                this.Nextisenabled=true;
              }else{
                this.Nextisenabled=false;
              }
            }else{
              this.rutaPicking = result[0];
            }

            //this.rutaPicking = result[0];
            //this.contador = 1;
            this.total = this.listaRutaPicking.length;      
            if(this.contador==this.listaRutaPicking.length){
              this.Nextisenabled=true;
            }
            console.log('detalles', this.rutaPicking);
            if(this.rutaPicking.length == 0){
              console.log('No se encontraron detalles', this.rutaPicking);  
            }
            return;
          }else{
            this.goDetallePickingPage();
            return;
          }        
        }
        if(i==this.listaRutaPicking.length-1){
          this.goDetallePickingPage();
          return;
        }
      }      
    },err=>{
      console.log('E-getDetailXTx',err);
    });
  }

  NextRutaPicking(){
    debugger;
    this.total = this.listaRutaPicking.length;
    this.posicion = this.posicion + 1;
    if(this.posicion<this.listaRutaPicking.length){
      this.contador = this.contador + 1;
      this.rutaPicking = this.listaRutaPicking[this.posicion];
      this.Backisenabled=true;
    }
    if(this.contador==this.listaRutaPicking.length){
      this.Nextisenabled=true;
    }
  }

    BackRutaPicking(){
      debugger;
      this.total = this.listaRutaPicking.length;
      this.posicion = this.posicion - 1;
      if(this.posicion>=0){
        this.contador = this.contador - 1;
        this.rutaPicking = this.listaRutaPicking[this.posicion];
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
          //this.codBar = this.rutaPicking.Fila.trim() + this.rutaPicking.Columna.toString() + this.rutaPicking.Nivel.toString() + this.rutaPicking.Posicion.toString();
          this.codBar = this.rutaPicking.CodBarraUbi.trim();
          if(this.codeBar.trim() == this.codBar){
            this.isbgWhite = true;
            this.isBgRed = false;
            this.goPickingPorProductoPage();
          }else{
            this.isbgWhite = false;
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




