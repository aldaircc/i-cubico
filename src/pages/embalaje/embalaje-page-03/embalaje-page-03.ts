import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { PopoverEmbalajeComponent } from '../../../components/popover-embalaje/popover-embalaje';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';
import { EmbalajePage_08Page } from '../embalaje-page-08/embalaje-page-08';

/**
 * Generated class for the EmbalajePage_03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-03',
  templateUrl: 'embalaje-page-03.html',
})
export class EmbalajePage_03Page {

  vEmbalajePage02:any;
  listDetEmbalaje: any;
  listAuxDetEmbalaje: any;
  listDetBultosEmbalaje: any;  
  vNroBulto: any;
  vTipoCierre: any;

  rowCount: any;
  rowCountPendiente: number = 0;
  rowCountEnProceso: number = 0;
  rowCountCompleto: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public sEmbalaje: EmbalajeServiceProvider, public popoverCtrl: PopoverController) {
      this.vEmbalajePage02 = navParams.get('dataPage02');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_03Page');
  }

  getDataDetEmbalaje() {
    this.ListarDespachoDetalle(this.vEmbalajePage02.Id_Tx);
  }

  ListarDespachoDetalle(strId_Tx) {

    this.sEmbalaje.ListarDespachoDetalle(strId_Tx).then((result) => {
      this.listDetEmbalaje = result;
      this.listAuxDetEmbalaje = this.listDetEmbalaje;
      
      this.rowCount = this.listAuxDetEmbalaje.length;
      this.filterItemsEstado();
      if (this.listDetEmbalaje.length > 0) {

      } else {
        alert('No se encontraron datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  filterItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.listAuxDetEmbalaje = this.listDetEmbalaje.filter((item) => {
        return (item.Codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxDetEmbalaje.length;
    } else {
      this.rowCount = this.listDetEmbalaje.length;
      return this.listAuxDetEmbalaje = this.listDetEmbalaje;
    }
  }

  filterItemsBultos(ev: any) {
  
      this.listDetEmbalaje = this.listDetEmbalaje.filter((item) => {
        
        return (item.Item == ev);
       
      });     
      return this.listDetEmbalaje;
  }

  filterItemsEstado() {    
    this.rowCountCompleto = 0;
    this.rowCountPendiente = 0;
    this.rowCountEnProceso = 0;
    for(let data of this.listDetEmbalaje){
      if(data.Saldo == 0)
        this.rowCountCompleto++;
      else if (data.Saldo == data.CantidadOperacion)
        this.rowCountPendiente++;
      else
        this.rowCountEnProceso++;
    }  
  }
  
   presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverEmbalajeComponent, {'page' : 12});
    popover.present({
      ev: myEvent
    });
  }

  getDataDetBultosEmbalaje() {        
    this.ListarBultosDespacho(this.vEmbalajePage02.Id_Tx);
  }

  ListarBultosDespacho(strId_Tx) {        
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {         
      this.listDetBultosEmbalaje = result;                 
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  validacionNroBulto(){     
    if(this.listDetBultosEmbalaje.length > 0)
    this.vNroBulto = this.listDetBultosEmbalaje[this.listDetBultosEmbalaje.length - 1].NroBulto + 1
    else
      this.vNroBulto = 1
  }

  goToEmbalajePage04(){           
    this.validacionNroBulto();
    this.navCtrl.push(EmbalajePage_04Page,{        
      dataPageFiltro: this.filterItemsBultos(1),
      dataTotalPage03: this.listAuxDetEmbalaje,      
      nroBulto: this.vNroBulto,   
      dataPage02: this.vEmbalajePage02   
    });
  }

  goToEmbalajePage08(){               
    this.navCtrl.push(EmbalajePage_08Page,{
      dataPage02: this.vEmbalajePage02,
      totalBultos: this.rowCount
    });
  }

  cerrarDespacho(){

    var message = "";
    let saldo = this.listAuxDetEmbalaje.reduce(function(prev, cur){
      return prev + cur.Saldo;
    }, 0);

    if(saldo > 0){
      this.vTipoCierre = 6;
      message = "Existen ítems incompletos, ¿Cerrar Packing?";
    }else{
      this.vTipoCierre = 5;
      message = "¿Cerrar el Packing?";
    }

    let alert = this.alertCtrl.create({
      title: 'Cerrar Despacho',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Buy clicked');
            console.log(this.vTipoCierre);
            this.sEmbalaje.CerrarDespacho(this.vEmbalajePage02.Id_Tx,this.vTipoCierre,"admin",2).then((result)=>{      
              console.log(result);
            });
          }
        }
      ]
    });
    alert.present();

  }

  ionViewWillEnter() {    
    this.getDataDetEmbalaje();
    this.getDataDetBultosEmbalaje();    
  }

}
