import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { DetallePorProductoPage } from '../detalle-por-producto/detalle-por-producto'
import { ReabastecimientoPage } from '../reabastecimiento/reabastecimiento'
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
/**
 * Generated class for the PickingPorProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picking-por-producto',
  templateUrl: 'picking-por-producto.html',
})
export class PickingPorProductoPage {

  vRutaPickingPage: any = [];
  listaTempPickingProducto: any = [];
  pickingProducto: any = [];
  posicion:number = 0;
  contador:number = 1;  
  total:number = 1; 
  Backisenabled:boolean=false;
  Nextisenabled:boolean=false;

  codeBar: string;
  Textcantidad : string='';
  codUbicacion:string;

  UAPicking: any = [];

  isBgRed:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController, public toastCtrl: ToastController) {
    this.vRutaPickingPage = navParams.get('data');
    this.getPickingProductoLoad();
    
  }

  getPickingProductoLoad(){
    this.codeBar = "";
    this.Textcantidad = "";
    this.getPickingProducto(this.vRutaPickingPage.Id_Tx, 'Admin', 2);
  }

  goDetallePorProductoPage():void{
    this.navCtrl.push(DetallePorProductoPage);
  }

  goReabastecimientoPage():void{
    this.navCtrl.push(ReabastecimientoPage);
  }

  getPickingProducto(strNroDoc, strUsuario, intIdAlmacen){
    this.sPicking.getPickingProducto(strNroDoc, strUsuario, intIdAlmacen).then((result)=>{
      debugger;
      this.listaTempPickingProducto = result;
      this.pickingProducto = result[0];
      this.contador = 1;
      this.total = this.listaTempPickingProducto.length;      
      if(this.contador==this.listaTempPickingProducto.length){
        this.Nextisenabled=true;
      }
      console.log('detalles', this.pickingProducto);
      if(this.pickingProducto.length == 0){
        console.log('No se encontraron detalles', this.pickingProducto);  
      }
    },err=>{
      console.log('E-getPickingProducto',err);
    });
  }

  validarCodeBar() {
    debugger;
    if(this.codeBar){
      if(this.codeBar.trim()!=""){
        if (this.codeBar.trim().length >= 6) {
          //this.codUbicacion = this.vRutaPickingPage.Fila.trim() + this.vRutaPickingPage.Columna.toString() + this.vRutaPickingPage.Nivel.toString() + this.vRutaPickingPage.Posicion.toString();
          //this.codUbicacion =  this.pickingProducto.CodBarraUbi.trim();
          this.sPicking.getValidarUAPicking(this.vRutaPickingPage.Id_Tx, this.codeBar.trim(), this.pickingProducto.CodigoProducto, this.pickingProducto.Item, this.pickingProducto.LoteProducto, this.pickingProducto.IdUbicacion).then((result) => {
            debugger;
            this.UAPicking = result;
            if (this.UAPicking.length > 0) {
              //Mostrar cantidad de la UA
               if(this.UAPicking.cantidad > this.pickingProducto.Saldo){ //Cantidad de la UA es mayor al saldo
                 //Editar cantidad de la UA
                 if(this.UAPicking.cantidad > this.pickingProducto.Saldo){ //Cantidad de la UA es mayor al saldo
                  //Volver a escanear codigo de barra
                }else{
                  //Registrar cantidad de la UA
                }
 
               }else{
                 //Registrar cantidad de la UA
               }

    
            } else {
              this.presentToast("UA no pertenece a la ubicación");
              this.isBgRed = true;
              this.codeBar = "";
            }
          }, (err) => {
            console.log('E-Verficar UA', err);
          });
          
        }else{
          this.presentToast("UA no pertenece a la ubicación");
          this.isBgRed = true;
          this.codeBar = "";
        } 
      }else{
        this.presentToast("Ingresar código de UA");
        this.isBgRed = true;
        this.codeBar = "";
      }
    }else{
      this.presentToast("Ingresar código de UA");
        this.isBgRed = true;
        this.codeBar = "";
    }
    
  }

  NextRutaPicking(){
    debugger;
    this.total = this.listaTempPickingProducto.length;  
    this.posicion = this.posicion + 1;
    if(this.posicion<this.listaTempPickingProducto.length){
      this.contador = this.contador + 1;
      this.pickingProducto = this.listaTempPickingProducto[this.posicion];
      this.Backisenabled=true;
    }
    if(this.contador==this.listaTempPickingProducto.length){
      this.Nextisenabled=true;
    }
  }

    BackRutaPicking(){
      debugger;
      this.total = this.listaTempPickingProducto.length;  
      this.posicion = this.posicion - 1;
      if(this.posicion>=0){
        this.contador = this.contador - 1;
        this.pickingProducto = this.listaTempPickingProducto[this.posicion];
        this.Nextisenabled=false;
      }
      if(this.contador==1){
        this.Backisenabled=false;
      }
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

    presentToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'bottom'
      });  
      toast.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPorProductoPage');
  }

}
