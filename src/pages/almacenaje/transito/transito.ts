import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { PalletsTransitoPage } from '../pallets-transito/pallets-transito';
import {AlmacenajePage} from '../../almacenaje/almacenaje'

/**
 * Generated class for the TransitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transito',
  templateUrl: 'transito.html',
})
export class TransitoPage {
  @ViewChild(Navbar) navBar: Navbar; 
  nomAlmacen: any;
  rowCount: any;
  listUbicacionTransito: any;
  listAuxUbicacionTransito: any;
  vTransitoPage: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider,
    public sAlmacenaje: AlmacenajeServiceProvider) {
    this.getUbicacionTransitoLoad();
    this.nomAlmacen = this.sGlobal.nombreAlmacen;
  }

  getUbicacionTransitoLoad(){
    this.getUbicacionTransito(this.sGlobal.Id_Almacen);
  }

  getUbicacionTransito(intIdAlmacen){
    debugger;
    this.sAlmacenaje.getUbicacionTransito(intIdAlmacen).then((result)=>{
      debugger;
      this.listUbicacionTransito = result;
      this.listAuxUbicacionTransito = this.listUbicacionTransito;
      this.rowCount = this.listAuxUbicacionTransito.length;

      if(this.listUbicacionTransito.length > 0){
        console.log('Datos ubicacion transito', this.listUbicacionTransito);
      }else{
        alert('No se encontrarón datos.');
      }
    }, (err)=>{
      console.log('E-Ubicacion transito listar', err);
    });    
  }

  goPalletsUasTransito(data){
    debugger;
    this.vTransitoPage = {
      'Id_Ubicacion_Transito' : data.Id_Ubicacion
    };
    this.navCtrl.push(PalletsTransitoPage, {
      data: this.vTransitoPage
    });
  }

  ionViewDidLoad() {

    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      this.navCtrl.push(AlmacenajePage);       
     }
    console.log('ionViewDidLoad TransitoPage');
  }
}
