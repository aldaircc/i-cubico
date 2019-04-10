import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { PopoverEmbalajeComponent } from '../../../components/popover-embalaje/popover-embalaje';
import { EmbalajePage_03Page } from '../embalaje-page-03/embalaje-page-03';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { ImpresoraPage } from '../../impresora/impresora';

/**
 * Generated class for the EmbalajePage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-02',
  templateUrl: 'embalaje-page-02.html',
})
export class EmbalajePage_02Page {

  NombreUsuario: any;
  NombreAlmacen: any;
  listEmbalaje: any;
  listAuxEmbalaje: any;
  vEmbalajePage02:any = [];
  rowCount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,public sEmbalaje: EmbalajeServiceProvider, 
    public popoverCtrl: PopoverController,public sGlobal: GlobalServiceProvider,public modalCtrl: ModalController) {
      this.NombreUsuario = this.sGlobal.userName;
      this.NombreAlmacen = this.sGlobal.nombreAlmacen;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_02Page');
  }

  getDataEmbalaje() {
    this.ListarDespachoXUsuario(this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  ListarDespachoXUsuario(strUsuario, intIdAlmacen) {
    this.sEmbalaje.ListarDespachoXUsuario(strUsuario, intIdAlmacen).then((result) => {
      this.listEmbalaje = result;
      this.listAuxEmbalaje = this.listEmbalaje;
      this.rowCount = this.listAuxEmbalaje.length;
      if (this.listEmbalaje.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  filterItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.listAuxEmbalaje = this.listEmbalaje.filter((item) => {
        return (item.NumOrden.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxEmbalaje.length;
      debugger;
      if(this.rowCount == 0)
        this.mostrarConfirmacion("Advertencia","No se encontró la orden");

    } else {
      this.rowCount = this.listEmbalaje.length;
      return this.listAuxEmbalaje = this.listEmbalaje;
    }
  }

   presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverEmbalajeComponent, {'page' : 12});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      debugger;
      if(popoverData == 4){
        this.showModalImpresora();
      }else if(popoverData == 5){
        this.goBackLoginPage();
      }
    });   
  }

  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }
  goBackLoginPage():void{
    this.navCtrl.push(HomePage);
  }

  mostrarConfirmacion(title,message){
  
    let alertConfirmacion = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });
    alertConfirmacion.present();
  }

  goDetEmbalajePackingPage(data){    

    this.vEmbalajePage02 = {     
      "NumOrden":data.NumOrden,
      "Cliente":data.Cliente,
      "Ciudad":data.Ciudad,
      "Direccion":data.Direccion,
      "Id_Tx":data.Id_Tx,
      "CodigoZona":data.CodigoZona,
      "Zona":data.Zona
    };
    
    this.navCtrl.push(EmbalajePage_03Page, {
      dataPage02: this.vEmbalajePage02
    });

  }

  ionViewWillEnter() {    
    this.getDataEmbalaje();
  }

}
