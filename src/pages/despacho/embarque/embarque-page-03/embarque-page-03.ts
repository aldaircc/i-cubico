import { Component } from '@angular/core';
import { IonicPage, Platform, ViewController, NavController, NavParams, AlertController, ModalController, PopoverController, App } from 'ionic-angular';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { EmbarquePage_04Page } from '../embarque-page-04/embarque-page-04';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { EmbarquePage_05Page } from '../embarque-page-05/embarque-page-05';
import { PopoverReciboComponent } from '../../../../components/popover-recibo/popover-recibo';
import { HomePage } from '../../../home/home';

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
  totalOperado: number = 0;

  rowCountPendiente: number = 0;
  rowCountEnProceso: number = 0;
  rowCountCompleto: number = 0;

  listDetalleSinTrabajar: any = [];
  listDetalleProceso: any = [];
  listDetalleFinalizado: any = [];

  valorpopoverGlobal: boolean = false
  popoverGlobal: any;

  constructor(public app: App, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider, public sDesp: DespachoServiceProvider, public viewCtrl: ViewController, private platform: Platform) {
    this.vParameter = this.navParams.get('vParameter');
  }

  ionViewWillEnter() {
    this.listarDetalleXTransporte(this.vParameter.Id_Tra);

    this.platform.registerBackButtonAction(() => {
      debugger;
      if (this.valorpopoverGlobal) {
        this.valorpopoverGlobal = false;
        this.popoverGlobal.dismiss();
      } else {
        this.navCtrl.pop();
      }
    });
  }

  presentPopover(myEvent) {
    this.valorpopoverGlobal = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverReciboComponent, { 'page': 1 });
    this.popoverGlobal.present({
      ev: myEvent
    });

    this.popoverGlobal.onDidDismiss(popoverData => {
      this.valorpopoverGlobal = false;
      if (popoverData == 4) {
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }

  listarDetalleXTransporte(strIdTransporte): void {
    this.sDesp.listarDetalleXTransporte(strIdTransporte).then(result => {
      this.listDetalle = result;
      this.rowCount = this.listDetalle.length;
      if (this.rowCount > 0) {
        this.listDetalleSinTrabajar = this.listDetalle.filter((item) => {
          return (item.CantidadBultos == item.SaldoBultos);
        });
        this.listDetalleProceso = this.listDetalle.filter((item) => {
          return (item.OperacionBultos > 0 && item.SaldoBultos > 0);
        });
        this.listDetalleFinalizado = this.listDetalle.filter((item) => {
          return (item.OperacionBultos > 0 && item.SaldoBultos == 0);
        });
        this.rowCountPendiente = this.listDetalleSinTrabajar.length;
        this.rowCountEnProceso = this.listDetalleProceso.length;
        this.rowCountCompleto = this.listDetalleFinalizado.length;
      } else {
        this.rowCountPendiente = this.rowCount;
        this.rowCountEnProceso = this.rowCount;
        this.rowCountCompleto = this.rowCount;
      }
      this.totalBultos = this.listDetalle.reduce((sum, c) => sum + c.CantidadBultos, 0);
      this.totalSaldo = this.listDetalle.reduce((sum, c) => sum + c.SaldoBultos, 0);
      this.totalOperado = this.listDetalle.reduce((sum, c) => sum + c.OperacionBultos, 0);
    });
  }



  presentConfirmDialog(title, message): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [{
          text: 'Si',
          handler: () => {
            resolve(true);
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            resolve(false);
          }
        }
        ]
      });
      confirm.present();
    })
  }

  cerrarEmbarque(): void {
    var mensaje = "";
    this.totalSaldo == 0 ? mensaje = "¿Finalizar despacho?" : mensaje = "Existen discrepancias. ¿Finalizar despacho?";
    this.presentConfirmDialog('Mensaje', mensaje).then(result => {
      if (result == true) {
        this.sDesp.cerrarEmbarque(this.vParameter.Id_Tra, ((this.totalSaldo == 0) ? 5 : 6), this.sGlobal.userName).then(result => {
          let res: any = result;
          if (res[0].ERROR == 0) {
            alert(res[0].MENSAGE);
            //Ir a la primera pantalla
            this.navCtrl.remove(this.navCtrl.getViews().length - 2, 2);
          }
        });
      } else {
        return;
      }
    });
  }

  verificarDespacho(): void {
    this.listarDetalleXTransporte(this.vParameter.Id_Tra);
  }

  goToEmbarPage04(obj): void {
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
      'totalSaldo': this.totalSaldo,
      'OperacionBultos': obj.OperacionBultos
    };

    this.navCtrl.push(EmbarquePage_04Page, { 'vParameter': parameter });
  }

  goToEmbarPage05(obj): void {
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
      'totalSaldo': this.totalSaldo,
      'OperacionBultos': obj.OperacionBultos
    };
    this.navCtrl.push(EmbarquePage_05Page, { 'vParameter': parameter });
  }
}
