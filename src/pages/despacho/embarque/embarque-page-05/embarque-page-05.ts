import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App } from 'ionic-angular';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { HomePage } from '../../../home/home';
import { PopoverReciboComponent } from '../../../../components/popover-recibo/popover-recibo';

/**
 * Generated class for the EmbarquePage_05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embarque-page-05',
  templateUrl: 'embarque-page-05.html',
})
export class EmbarquePage_05Page {

  listBulto: any = [];
  listSubBulto: any = [];
  vParameter: any;
  bolBulto: boolean = false;
  bolSubBulto: boolean = false;
  rowCount: number = 0;

  constructor(public app: App, public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams, public sDesp: DespachoServiceProvider,
    public sGlobal: GlobalServiceProvider) {
    this.bolBulto = true;
    this.bolSubBulto = false;
    this.vParameter = this.navParams.get('vParameter');
    this.listarBultosXCargarTransporte(this.vParameter.Id_Tra);
  }

  presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 1});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      if(popoverData == 4){
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }
  
  mostrarBultos(): void{
    this.bolSubBulto = false;
    if(this.bolSubBulto == false){
      this.listarBultosXCargarTransporte(this.vParameter.Id_Tra);
      this.bolBulto = true;
    }
  }

  mostrarSubBultos(): void{
    this.bolBulto = false;
    if(this.bolBulto == false){
      this.listarSubBultosLeidos(this.vParameter.Id_Tra, 2);
      this.bolSubBulto = true;
    }
  }

  listarBultosXCargarTransporte(strIdTransporte): void{
    this.sDesp.listarBultosXCargarTransporte(strIdTransporte).then(result=>{
      debugger;
      this.listBulto = result;
      this.rowCount = this.listBulto.length;
    });
  }

  listarSubBultosLeidos(strTransaccion, tipo): void{
    this.sDesp.listarSubBultosLeidos(strTransaccion, tipo).then(result=>{
      debugger;
      this.listSubBulto = result;
      this.rowCount = this.listSubBulto.length;
    });
  }
}
