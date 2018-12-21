import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
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

  TextcodBarra: string='';
  Textcantidad : string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController) {
    this.vRutaPickingPage = navParams.get('data');
    this.getPickingProductoLoad();
    
  }

  getPickingProductoLoad(){
    this.TextcodBarra = "";
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPorProductoPage');
  }

}
