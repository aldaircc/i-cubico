import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
/**
 * Generated class for the DetallePorProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-por-producto',
  templateUrl: 'detalle-por-producto.html',
})
export class DetallePorProductoPage {

  vPickingXProducto: any = [];
  searchQuery: string='';
  listDetalleProducto: any;
  listAuxDetalleProducto: any;
  rowCount: any;
  resultEliminar: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public alertCtrl: AlertController, 
    public popoverCtrl : PopoverController, public sGlobal: GlobalServiceProvider) {
    this.vPickingXProducto = navParams.get('data');
    this.getDetalleXProductoLoad();
  }

  getDetalleXProductoLoad(){
    this.searchQuery = "";
    this.getDetalleXProducto(this.vPickingXProducto.Id_Tx, this.vPickingXProducto.IdProducto, this.vPickingXProducto.Item);
  }

  getDetalleXProducto(strIdTx, intIdProducto, intItem){
    debugger;
    this.sPicking.getDetalleXProducto("A20181980018", 80, intItem).then((result)=>{
      debugger;
      this.listDetalleProducto = result;
      this.listAuxDetalleProducto = this.listDetalleProducto;
      this.rowCount = this.listAuxDetalleProducto.length;
      if(this.listDetalleProducto.length > 0){
        console.log('Datos ordenes picking', this.listDetalleProducto);
      }else{
        alert('No se encontrarón datos.');
      }
    }, (err)=>{
      console.log('E-Ordenes Detalle por producto listar', err);
    });
  }

  eliminarUA(data){
    this.presentAlertConfirm("¿Desea eliminar UA seleccionada?”.").then((result) => {
      if (result) {
        debugger;
        // Eliminar UA
        let objUA = {          
          'UA_CodBarra' : data.UA_CodBarra, //
          'Id_Tx' : "A20181980018",   //this.vPickingXProducto.Id_Tx,
          'Id_Producto' : 80 ,  //this.vPickingXProducto.IdProducto
          'Id_UM': data.Id_UM,  //
          'Cantidad' : data.Cantidad,  //
          'FlagAnulado': true, //
          'Id_TerminalRF' : 1,  //
          'Item' : this.vPickingXProducto.Item,  //
          'Id_Almacen' : this.sGlobal.Id_Almacen,  //
          'UsuarioRegistro' : this.sGlobal.userName,  //
        };
        this.sPicking.RegistarEliminarUA(objUA).then(result=>{
          debugger;
          this.resultEliminar = result;
          this.presentAlert(this.resultEliminar.message);
          this.getDetalleXProductoLoad();
        });
      }
    })
  }

  filterItems(ev: any){
    debugger;
    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.listAuxDetalleProducto = this.listDetalleProducto.filter((item)=>{
        return (item.UA_CodBarra.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.rowCount = this.listAuxDetalleProducto.length;
    }else{
      this.rowCount = this.listDetalleProducto.length;
      return this.listAuxDetalleProducto = this.listDetalleProducto;
    }
  }

  presentAlertConfirm(message): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              resolve(false);
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              resolve(true);
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    })
  }

  presentAlert(message): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [{
          text: 'OK',
          handler: () => {
            resolve(true);
            console.log('Agree clicked');
          }
        }]
      });
      confirm.present();
    })

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
    console.log('ionViewDidLoad DetallePorProductoPage');
  }

}
