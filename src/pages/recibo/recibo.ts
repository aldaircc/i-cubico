import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, App } from 'ionic-angular';
import { ReciboServiceProvider } from '../../providers/recibo-service/recibo-service';
import { ReciboPage_02Page } from './recibo-page-02/recibo-page-02';
import { IncidenciaPage } from '../incidencia/incidencia';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { PopoverReciboComponent } from '../../components/popover-recibo/popover-recibo';
import { ImpresoraPage } from '../impresora/impresora';
import { HomePage } from '../home/home';

/**
 * Generated class for the ReciboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo',
  templateUrl: 'recibo.html',
})
export class ReciboPage {

  userDetail: any;
  listAuxRecepcion: any;
  listRecepcion: any;
  vReciboPage01: any;
  rowCount: any;
  rowReciboSelect: any;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
    public sRecibo: ReciboServiceProvider, public modalCtrl: ModalController, public sGlobal: GlobalServiceProvider) { }

  presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 11, 'has_Id_Tx': (this.rowReciboSelect != undefined) ? true : false });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      if(popoverData == 2){
        this.showModalIncidencia(this.rowReciboSelect);
      }else if(popoverData == 3){
        this.showModalImpresora();
      }else if(popoverData == 4){
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
      this.rowReciboSelect = null;
    });
  }


  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  filterItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.listAuxRecepcion = this.listRecepcion.filter((item) => {
        return (item.NumOrden.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxRecepcion.length;
    } else {
      this.rowCount = this.listRecepcion.length;
      return this.listAuxRecepcion = this.listRecepcion;
    }
  }

  getRecepcionesXUsuario(strUsuario, intIdAlmacen, intIdMuelle) {
    this.sRecibo.getRecepcionesXUsuario(strUsuario, intIdAlmacen, intIdMuelle).then((result) => {
      this.listRecepcion = result;
      this.listAuxRecepcion = this.listRecepcion;
      this.rowCount = this.listAuxRecepcion.length;
      if (this.listRecepcion.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    });
  }

  evaluateGoReciboPage02(data) {
    if (data.FlagPausa == true) {
      this.showModalIncidencia(data);
    } else {
      this.goToReciboPage02(data);
    }
  }

  goToReciboPage02(data) {
    this.vReciboPage01 = {
      "Id_Tx": data.Id_Tx,
      "NumOrden": data.NumOrden,
      "Cuenta": data.Cliente,
      "Proveedor": data.Proveedor,
      "Id_TipoMovimiento": data.Id_TipoMovimiento,
      "FlagPausa": data.FlagPausa,
      "Id_Cliente": data.Id_Cliente
    };

    this.navCtrl.push(ReciboPage_02Page, {
      data: this.vReciboPage01
    });
  }

  getDataRecepcion() {
    this.getRecepcionesXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen, this.sGlobal.Id_Muelle);
  }

  getReciboRow(obj):void{
    this.rowReciboSelect = obj;
  }

  showModalIncidencia(data) {
    let obj = {
      'Id_Tx': data.Id_Tx,
      'FlagPausa': data.FlagPausa,
      'Cliente': data.Cliente,
      'Id_Cliente': data.Id_Cliente,
      'Proveedor': data.Proveedor,
      'Id_TipoMovimiento': data.Id_TipoMovimiento,
      'Origen': 'RP01'
    };

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });

    modalIncidencia.onDidDismiss(result => {
      if (result.response == 200) {
        data.FlagPausa = !data.FlagPausa;
        this.goToReciboPage02(data);
      }

    });
    modalIncidencia.present();
  }

  ionViewWillEnter() {
    this.getDataRecepcion();
  }
}
