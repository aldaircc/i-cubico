import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';

/**
 * Generated class for the DetallePickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-picking',
  templateUrl: 'detalle-picking.html',
})
export class DetallePickingPage {

  searchQuery: string='';
  vRutaPickingPage: any = [];
  listDetallePicking: any = [];
  listAuxDetallePicking: any = [];
  rowCount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider) {
    this.vRutaPickingPage = navParams.get('data');
    this.getDetallePickingLoad();
    //this.getDetallePicking(this.vRutaPickingPage.Id_Tx, 'Admin', 2);
  }

  getDetallePickingLoad(){
    this.searchQuery = "";
    this.getDetallePicking(this.vRutaPickingPage.Id_Tx, 'Admin', 2);
  }

  getDetallePicking(strNroDoc, strUsuario, intIdAlmacen){
    this.sPicking.getDetallePicking(strNroDoc, strUsuario, intIdAlmacen).then((result)=>{
      debugger;
      this.listDetallePicking = result;
      this.listAuxDetallePicking = this.listDetallePicking;
      this.rowCount = this.listAuxDetallePicking.length;
      if(this.listDetallePicking.length > 0){
        console.log('Datos detalle picking', this.listDetallePicking);
      }else{
        alert('No se encontrarón datos.');
      }
    }, (err)=>{
      console.log('E-Detalle Picking listar', err);
    });    
  }

  filterItems(ev: any){
    debugger;
    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.listAuxDetallePicking = this.listDetallePicking.filter((item)=>{
        return (item.CodigoProducto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxDetallePicking.length;
    }else{
      this.rowCount = this.listDetallePicking.length;
      return this.listAuxDetallePicking = this.listDetallePicking;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePickingPage');
  }

}
