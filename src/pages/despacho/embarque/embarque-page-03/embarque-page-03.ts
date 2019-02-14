import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { EmbarquePage_04Page } from '../embarque-page-04/embarque-page-04';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { EmbarquePage_05Page } from '../embarque-page-05/embarque-page-05';

/**
 * Generated class for the EmbarquePage_03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embarque-page-03',
  templateUrl: 'embarque-page-03.html',
})
export class EmbarquePage_03Page {

  vParameter: any;
  listDetalle: any;
  rowCount: number = 0;
  totalBultos: number = 0;
  totalSaldo: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider, public sDesp: DespachoServiceProvider) {
      this.vParameter = this.navParams.get('vParameter');
      this.listarDetalleXTransporte(this.vParameter.Id_Tra);
  }

  listarDetalleXTransporte(strIdTransporte): void{
    this.sDesp.listarDetalleXTransporte(strIdTransporte).then(result=>{
      this.listDetalle = result;
      this.rowCount = this.listDetalle.length;
      this.totalBultos = this.listDetalle.reduce((sum, c) => sum + c.CantidadBultos, 0);
      this.totalSaldo = this.listDetalle.reduce((sum, c) => sum + c.SaldoBultos, 0);
    });
  }

  cerrarEmbarque(): void{
    const confirm = this.alertCtrl.create({
      title: 'Cerrar',
      message: (this.totalSaldo == 0) ? '¿Finalizar despacho?' : 'Existen discrepancias. ¿Finalizar despacho?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            //cerrarEmbarque
            debugger;
            this.sDesp.cerrarEmbarque(this.vParameter.Id_Tra, ((this.totalSaldo == 0) ? 5 : 6) , this.sGlobal.userName).then(result=>{
              debugger;
              let res: any = result;

              if(res[0].ERROR == 0){
                alert(res[0].MENSAGE);
                //Ir a la primera pantalla
                this.navCtrl.remove(this.navCtrl.getViews().length - 2, 2);
              }

            });
          }
        },
        {
          text: 'No',
          handler: () => {
            return;
          }
        }
      ]
    });
    confirm.present();
  }

  verificarDespacho(): void{
    this.listarDetalleXTransporte(this.vParameter.Id_Tra);
  }

  goToEmbarPage04(obj): void{
    debugger;
    let parameter = {
      'Id_Tra': obj.Id_Tra,
      'Id_Conductor': obj.Id_Conductor,
      'Conductor': obj.Conductor,
      'Documento': obj.Documento,
      'Id_Vehiculo': obj.Id_Vehiculo,
      'Placa': obj.Placa,
      'totalSubBultos': obj.totalSubBultos,
      'totSubBultosLeido': obj.totSubBultosLeido,
      'totalBultos': this.totalBultos,
      'totalSaldo': this.totalSaldo
    };

    this.navCtrl.push(EmbarquePage_04Page, { 'vParameter': parameter });
  }

  goToEmbarPage05(obj): void{
    debugger;
    let parameter = {
      'Id_Tra': obj.Id_Tra,
      'Id_Conductor': obj.Id_Conductor,
      'Conductor': obj.Conductor,
      'Documento': obj.Documento,
      'Id_Vehiculo': obj.Id_Vehiculo,
      'Placa': obj.Placa,
      'totalSubBultos': obj.totalSubBultos,
      'totSubBultosLeido': obj.totSubBultosLeido,
      'totalBultos': this.totalBultos,
      'totalSaldo': this.totalSaldo
    };
    this.navCtrl.push(EmbarquePage_05Page, { 'vParameter': parameter});
  }
}
