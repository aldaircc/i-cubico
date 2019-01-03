import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { RutaPickingPage } from '../ruta-picking/ruta-picking';

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

  vDetallePickingPage: any;

  idRutaPicking:number = 0; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController, public toastCtrl: ToastController) {
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
      this.idRutaPicking = 0;
      this.listDetallePicking = result;
      //Agregar columna idRuta
      for(var i = 0; i< this.listDetallePicking.length; i++){
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
        this.listAuxDetallePicking.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }


      //this.listAuxDetallePicking = this.listDetallePicking;


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

  ValidarProducto(data){
    debugger;
    if(data.FlagTransito==true){
      this.presentToast("No existe ruta para este producto");
    }else{
      //Ir a ruta picking y ubicarse en el producto seleccionado, enviar idRuta 
      this.goRutaPickingPage(data)
    }      
  }

  goRutaPickingPage(data){
    this.vDetallePickingPage = {
      'idRutaPicking': data.idRutaPicking,
      'Id_Tx' : this.vRutaPickingPage.Id_Tx,
      'NumOrden' : this.vRutaPickingPage.NumOrden,
      'Cliente' : this.vRutaPickingPage.Cliente,
      'Ciudad' :this.vRutaPickingPage.Ciudad,
      'Zona' : this.vRutaPickingPage.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vDetallePickingPage
    });
  }

  filterItems(ev: any){
    debugger;
    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.listAuxDetallePicking = this.listDetallePicking.filter((item)=>{
        return (item.CodigoProducto.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Producto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxDetallePicking.length;
    }else{
      this.rowCount = this.listDetallePicking.length;
      return this.listAuxDetallePicking = this.listDetallePicking;
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
    console.log('ionViewDidLoad DetallePickingPage');
  }

}
