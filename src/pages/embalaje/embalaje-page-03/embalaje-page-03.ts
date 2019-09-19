import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, PopoverController, ToastController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { PopoverEmbalajeComponent } from '../../../components/popover-embalaje/popover-embalaje';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';
import { EmbalajePage_08Page } from '../embalaje-page-08/embalaje-page-08';
import { BultoMasivoPage } from '../bulto-masivo/bulto-masivo';
import { EmbalajePage_02Page } from '../embalaje-page-02/embalaje-page-02';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { ImpresoraPage } from '../../impresora/impresora';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

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

  vEmbalajePage02: any;
  listDetEmbalaje: any;
  listAuxDetEmbalaje: any;
  listDetBultosEmbalaje: any;
  vNroBulto: any;
  vTipoCierre: any;

  rowReciboSelect: any;

  rowCount: any;
  rowCountPendiente: number = 0;
  rowCountEnProceso: number = 0;
  rowCountCompleto: number = 0;

  resultCierre: any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public toastCtrl: ToastController,
    public sGlobal: GlobalServiceProvider, public sEmbalaje: EmbalajeServiceProvider, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
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
        return ((item.Codigo.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.Producto.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.EAN13.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.EAN14.toLowerCase().indexOf(val.toLowerCase()) > -1));
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
    for (let data of this.listDetEmbalaje) {
      if (data.Saldo == 0) {
        this.rowCountCompleto++;
      }
      else if (data.Saldo == data.CantidadOperacion) {
        this.rowCountPendiente++;
      }
      else {
        this.rowCountEnProceso++;
      }
    }
  }

  filterItemsEstado2(data) {
    if (data != undefined) {
      if (data.Saldo == 0) {
        return "label-color count-green-footer";
      }
      else if (data.Saldo == data.CantidadOperacion) {
        return "label-color count-gris-footer";
      }
      else {
        return "label-color count-yellow-footer";
      }
    }
  }

  getRegistrarIncidencia(obj): void {
    debugger;
    this.rowReciboSelect = obj;
    this.showToast('Recibo: ' + obj.Id_Tx + ' seleccionado', 2000, 'bottom', true, 'x', true);
  }

  showToast(message, duration, position, showClose, closeText, dismissChange) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showClose,
      closeButtonText: closeText,
      dismissOnPageChange: dismissChange
    });

    toast.present();
  }

  presentPopover(myEvent) {
    // let popover = this.popoverCtrl.create(PopoverEmbalajeComponent, { 'page': 12, 'has_Id_Tx': (this.rowReciboSelect != undefined) ? true : false });
    // popover.present({
    //   ev: myEvent
    // });

    let popover = this.popoverCtrl.create(PopoverEmbalajeComponent, { 'page': 15 });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      debugger;
      if (popoverData == 1) {
        // this.showModalIncidencia(this.rowReciboSelect);
        this.showModalIncidencia(this.vEmbalajePage02);
      }
      if (popoverData == 2) {
        this.goBultoMasivo();
      }
      if (popoverData == 4) {
        this.showModalImpresora();
      } else if (popoverData == 5) {
        this.goBackLoginPage();
      }
      this.rowReciboSelect = null;
    });
  }

  goBultoMasivo(){
    this.navCtrl.push(BultoMasivoPage);
  }


  showModalIncidencia(data) {
    let obj = {
      'Id_Tx': data.Id_Tx,
      'FlagPausa': data.FlagPausa,
      'Cliente': data.Cliente,
      'Id_Cliente': data.Id_Cliente,
      'Proveedor': data.Proveedor,
      'Id_TipoMovimiento': data.Id_TipoMovimiento,
      'Origen': 'RP01',
      'id_Modulo': 1
    };

    this.sGlobal.resultIncidencia = false;
    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });
    modalIncidencia.onDidDismiss(result => {
      debugger;
      if (this.sGlobal.resultIncidencia) {
        this.goToEmbalajePage02();
      }
      // if (result.response == 200 && result.isChangePage == true) {
      //   data.FlagPausa = !data.FlagPausa;
      //   //this.goToReciboPage02(data);
      // } else {
      //   //this.getDataRecepcion();
      // }
    });
    modalIncidencia.present();
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }
  goBackLoginPage(): void {
    this.navCtrl.push(HomePage);
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

  // mostrarConfirmacion(title, message): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //   let alertConfirmacion = this.alertCtrl.create({
  //     title: title,
  //     message: message,
  //     buttons: [
  //       {
  //         text: 'Aceptar'
  //       }
  //     ]
  //   });
  //   alertConfirmacion.present();
  // })
  // }

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

  validacionNroBulto() {
    if (this.listDetBultosEmbalaje.length > 0)
      this.vNroBulto = this.listDetBultosEmbalaje[this.listDetBultosEmbalaje.length - 1].NroBulto
    else
      this.vNroBulto = 0
  }

  goToEmbalajePage04() {
    this.validacionNroBulto();
    this.navCtrl.push(EmbalajePage_04Page, {
      dataPageFiltro: this.filterItemsBultos(1),
      dataTotalPage03: this.listAuxDetEmbalaje,
      nroBulto: this.vNroBulto,
      dataPage02: this.vEmbalajePage02
    });
  }

  goToEmbalajePage08() {
    debugger;
    this.navCtrl.push(EmbalajePage_08Page, {
      dataPage02: this.vEmbalajePage02
    });
  }

  // goToEmbalajePage02Old() {
  //   this.navCtrl.push(EmbalajePage_02Page);
  // }

  goToEmbalajePage02() {
    this.navCtrl.getViews().forEach(item => {
      if (item.name == 'EmbalajePage_02Page') {
        this.navCtrl.popTo(item);
      }
    });
  }

  cerrarDespacho() {

    var message = "";
    let saldo = this.listAuxDetEmbalaje.reduce(function (prev, cur) {
      return prev + cur.Saldo;
    }, 0);

    if (saldo > 0) {
      this.vTipoCierre = 6;
      message = "Existen ítems incompletos, ¿Cerrar Packing?";
    } else {
      this.vTipoCierre = 5;
      message = "¿Cerrar el Packing?";
    }

    this.presentAlertConfirm(message).then((result) => {
      if (result) {
        debugger;
        // Mostrar lista de impresoras
        console.log('Buy clicked');
        console.log(this.vTipoCierre);
        this.sEmbalaje.CerrarDespacho(this.vEmbalajePage02.Id_Tx, this.vTipoCierre, "admin", 2).then((result) => {
          debugger;
          this.resultCierre = result;
          debugger;
          if (this.resultCierre.errNumber == 0) {
            debugger
            console.log(result);
            // this.mostrarConfirmacion("Confirmación", "Cierre correcto");
            this.presentAlert("Cierre correcto");
            this.goToEmbalajePage02();
            // this.presentAlert("Cierre correcto").then((resultAlert) => {
            //   if (resultAlert) {
            //         this.goToEmbalajePage02();                  
            //   }else{
            //     this.goToEmbalajePage02(); 
            //   }
            // })
          }
        }, (err) => {
          console.log('E-CerrarDespacho', err);
        });
      }
    })

    // let alert = this.alertCtrl.create({
    //   title: 'Cerrar Despacho',
    //   message: message,
    //   buttons: [
    //     {
    //       text: 'Cancelar',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Aceptar',
    //       handler: () => {
    //         debugger;
    //         console.log('Buy clicked');
    //         console.log(this.vTipoCierre);
    //         this.sEmbalaje.CerrarDespacho(this.vEmbalajePage02.Id_Tx,this.vTipoCierre,"admin",2).then((result)=>{ 
    //           debugger;     
    //           console.log(result);
    //           this.mostrarConfirmacion("Confirmación","Cierre correcto");
    //           this.goToEmbalajePage02();
    //         });
    //       }
    //     }
    //   ]
    // });
    // alert.present();

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

  ionViewWillEnter() {
    this.getDataDetEmbalaje();
    this.getDataDetBultosEmbalaje();
  }

}
