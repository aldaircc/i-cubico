import { Component } from '@angular/core';
import { PickingServiceProvider } from '../../providers/picking-service/picking-service';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { RutaPickingPage } from '../picking/ruta-picking/ruta-picking'
import { IncidenciaPage } from '../incidencia/incidencia';

/**
 * Generated class for the PickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picking',
  templateUrl: 'picking.html',
})
export class PickingPage {

  userDetail: any;
  listOrdenesPicking: any;
  listAuxOrdenesPicking: any;
  rowCount: any;
  vPickingPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,    
    public sPicking: PickingServiceProvider, public modalCtrl: ModalController) {
    const data = JSON.parse(localStorage.getItem('vUserData'));
    this.userDetail = data;
    this.getDataOrdenes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPage');
  }

   

  getDataOrdenes(){
    // this.getOrdenesXUsuario(this.userDetail[0].Usuario, 2);
    this.getOrdenesXUsuario('Admin', 2);
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

  goRutaPickingPage(data){

    debugger;
    if(data.FlagPausa == true){
      this.showModalIncidencia(data);
    }else{
      
      this.vPickingPage = {
        'Id_Tx' : data.Id_Tx,
        'NumOrden' : data.NumOrden
      };

      this.navCtrl.push(RutaPickingPage, {
        data: this.vPickingPage
      });
    }
  }

  showModalIncidencia(data){
    let obj = { 
        'Id_Tx' : data.Id_Tx,
        'NumOrden' : data.NumOrden
      };

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia' : obj});
    modalIncidencia.onDidDismiss(data =>{
      debugger;
      console.log("datos", data);
    });
    modalIncidencia.present();
  }

}
