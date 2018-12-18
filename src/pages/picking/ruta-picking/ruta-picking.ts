import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallePickingPage } from '../detalle-picking/detalle-picking';
import { PickingPorProductoPage } from '../picking-por-producto/picking-por-producto';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { analyzeAndValidateNgModules } from '@angular/compiler';



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
  listaTempRutaPicking: any = [];
  rutaPicking: any = [];
  posicion:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider) {
    this.vPickingPage = navParams.get('data');
    this.getDataRutaPicking(this.vPickingPage.Id_Tx, 'Admin', 2);
  }

  goDetallePickingPage():void{
    this.navCtrl.push(DetallePickingPage);
  }  

  goCerrarPickingPage():void{
    this.navCtrl.push(CierrePickingPage);
  }

  goPickingPorProductoPage():void{
    this.navCtrl.push(PickingPorProductoPage);
  }

  getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen){
    this.sPicking.getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen).then((result)=>{
      debugger;
      this.listaTempRutaPicking = result;
      this.rutaPicking = result[0];
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
    this.posicion = this.posicion + 1;
    if(this.posicion<this.listaTempRutaPicking.length){
      this.rutaPicking = this.listaTempRutaPicking[this.posicion];
    }
    
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutaPickingPage');
  }



}




