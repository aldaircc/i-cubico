import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, PopoverController, ModalController, App, Platform } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { EmbarquePage_02Page } from '../embarque-page-02/embarque-page-02';
import { PopoverReciboComponent } from '../../../../components/popover-recibo/popover-recibo';
import { IncidenciaPage } from '../../../incidencia/incidencia';
import { HomePage } from '../../../home/home';
import { DespachoPage } from '../../../despacho/despacho';

/**
 * Generated class for the EmbarquePage_01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embarque-page-01',
  templateUrl: 'embarque-page-01.html',
})
export class EmbarquePage_01Page {

  listEmbarque: any;
  listAuxEmbarque: any;
  rowCount: number = 0;
  userProfile: any;

  valorpopoverGlobal01: boolean = false
  popoverGlobal: any;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalCtrl: ModalController,
    public sGlobal: GlobalServiceProvider, public sDesp: DespachoServiceProvider, private platform: Platform, public viewCtrl: ViewController) {
      this.userProfile = this.navParams.data;
  }

  presentPopover(event) {
    debugger;
    this.valorpopoverGlobal01 = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverReciboComponent, { 'page': 52 });
    this.popoverGlobal.present({
      ev: event
    });

    this.popoverGlobal.onDidDismiss(popoverData => {
      this.valorpopoverGlobal01 = false;
      if (popoverData == 4) {
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }

  showModalIncidencia() {
    debugger;
    let modalIncidencia = this.modalCtrl.create(IncidenciaPage);
    modalIncidencia.onDidDismiss(data => {
      if (data.response == 200) {
        this.navCtrl.pop();
      }
    });
    modalIncidencia.present();
  }

  listarPlanificacionXUsuario(strUsuario, intIdAlmacen): void {
    this.sDesp.listarPlanificacionXUsuario(strUsuario, intIdAlmacen).then(result => {
      let res: any = result;
      this.listEmbarque = res;
      this.listAuxEmbarque = this.listEmbarque;
      this.rowCount = this.listEmbarque.length;
    });
  }

  filterItems(ev: any): void {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.listAuxEmbarque = this.listEmbarque.filter((item) => {
        return (item.Id_Tra.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxEmbarque.length;
    } else {
      this.rowCount = this.listEmbarque.length;
      return this.listAuxEmbarque = this.listEmbarque;
    }
  }

  goToEmbarPage02(obj): void {
    let parameter = {
      'Id_Tra': obj.Id_Tra,
      'Id_Conductor': obj.Id_Conductor,
      'Conductor': obj.Conductor,
      'Documento': obj.Documento,
      'Id_Vehiculo': obj.Id_Vehiculo,
      'Placa': obj.Placa
    };

    this.navCtrl.push(EmbarquePage_02Page, { 'vParameter': parameter });
  }  

  ionViewDidLoad(){
  }

  ionViewWillEnter() {
    this.listarPlanificacionXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);

    this.platform.registerBackButtonAction(() => {
      debugger;
      if(this.valorpopoverGlobal01){
        this.valorpopoverGlobal01 = false;
        this.popoverGlobal.dismiss();
      }
      else{
        this.navCtrl.pop(); 
      }      
  });

  }

  confirmacionBack(): void {
    this.navCtrl.push(DespachoPage,this.userProfile);    
  }

}