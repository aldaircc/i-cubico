import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, App } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { EmbarquePage_02Page } from '../embarque-page-02/embarque-page-02';
import { PopoverReciboComponent } from '../../../../components/popover-recibo/popover-recibo';
import { IncidenciaPage } from '../../../incidencia/incidencia';
import { HomePage } from '../../../home/home';

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

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalCtrl: ModalController,
    public sGlobal: GlobalServiceProvider, public sDesp: DespachoServiceProvider) {
      this.listarPlanificacionXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  presentPopover(event){
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 51});
    popover.present({
      ev: event
    });

    popover.onDidDismiss(popoverData =>{
      if(popoverData == 2){
        this.showModalIncidencia();
      }else if(popoverData == 4){
        debugger;
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }

  showModalIncidencia(){ //data
    debugger;
    // let obj = { 
    //     'Id_Tx' : data.Id_Tx,
    //     'FlagPausa' : data.FlagPausa,
    //     'Cliente' : data.Cliente,
    //     'Id_Cliente' : data.Id_Cliente,
    //     'Proveedor' : data.Proveedor,
    //     'Id_TipoMovimiento' : data.Id_TipoMovimiento,
    //     'Origen' : 'RP02'
    //   };

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage); //{ 'pIncidencia' : obj});
    modalIncidencia.onDidDismiss(data =>{
      if(data.response == 200){
        this.navCtrl.pop();
      }
    });
    modalIncidencia.present();
  }

  listarPlanificacionXUsuario(strUsuario, intIdAlmacen): void{
    this.sDesp.listarPlanificacionXUsuario(strUsuario, intIdAlmacen).then(result=>{
      let res: any = result;
      this.listEmbarque = res;
      this.listAuxEmbarque = this.listEmbarque;
      this.rowCount = this.listEmbarque.length;
    });
  }

  filterItems(ev: any):void{
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

  goToEmbarPage02(obj):void{
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

}
