import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ReciboPage } from '../recibo/recibo';
import { PickingPage } from '../picking/picking';
import { AlmacenajePage } from '../almacenaje/almacenaje';
import { EmbalajePage } from '../embalaje/embalaje';
import { EtiquetadoPage_01Page } from '../etiquetado/etiquetado-page-01/etiquetado-page-01';
import { TransferPage_01Page } from '../transferencia/transfer-page-01/transfer-page-01';
import { InventarioPage_01Page } from '../inventario/inventario-page-01/inventario-page-01';
import { DespachoPage } from '../despacho/despacho';

import { GlobalServiceProvider } from '../../providers/global-service/global-service';

import { WarehouseSelectPage } from '../warehouse-select/warehouse-select';


/**
 * Generated class for the MainMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  userProfile:any;
  //userProfileBack:any;

  //userProfileBack={"Almacen":"","ApeNom":"","page":"1"};


  vMainMenuPage: any;

  constructor(private app:App, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider, public viewCtrl: ViewController) {
    this.userProfile=this.navParams.data;
  //vDatosRecibidos: any = [];
  }

  ionViewDidLoad() {    
    // this.platform.registerBackButtonAction(() => { 
    //   debugger;
    //   let nav = this.app.getActiveNavs()[0];
    //   let activeView = nav.getActive();        
    //   if(activeView.name === 'MainMenuPage'){
    //     if(this.userProfile.page == "0"){
    //       this.navCtrl.pop();
    //     }else{
    //       // this.userProfileBack.Almacen = this.userProfile.nombreAlmacen;
    //       // this.userProfileBack.ApeNom = this.userProfile.apeNom; 
    //       this.navCtrl.push(WarehouseSelectPage, this.userProfileBack);
    //     }
    //   }      
    // });
    console.log(this.navParams.get('Almacen'));   
  }

  goBackWarehouseSelect():void{
    debugger;
    //if(this.userProfile.page == "0"){
      //this.navCtrl.pop();
    //}else{
      // this.userProfileBack.Almacen = this.userProfile.nombreAlmacen;
      // this.userProfileBack.ApeNom = this.userProfile.apeNom; 
      //this.navCtrl.push(WarehouseSelectPage, this.userProfileBack);
    //}
    this.navCtrl.pop();
  }

  goBackLoginPage():void{
    debugger;
    this.sGlobal.Id_Centro=0;
    this.sGlobal.Id_Almacen=0;
    this.navCtrl.push(HomePage);
  }

  goReciboPage(){
    this.navCtrl.push(ReciboPage);
  }

  goPickingPage(){
    debugger;
    this.navCtrl.push(PickingPage);

  }

  goAlmacenajePage(){
    this.navCtrl.push(AlmacenajePage);
  }

  goEmbalajePage(){
    this.navCtrl.push(EmbalajePage);
    }

  goEtiquetado(){
    this.navCtrl.push(EtiquetadoPage_01Page, { codePage: 7 });
  }

  goTransferencia(){
    this.navCtrl.push(TransferPage_01Page);
  }

  goInventario(){
    this.navCtrl.push(InventarioPage_01Page);
  }

  goDespacho(){
    this.navCtrl.push(DespachoPage);
  }
}
