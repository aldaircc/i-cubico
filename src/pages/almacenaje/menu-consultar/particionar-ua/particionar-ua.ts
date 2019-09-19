import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Navbar, ViewController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { ImpresoraPage } from '../../../impresora/impresora'
import { ReciboServiceProvider } from '../../../../providers/recibo-service/recibo-service';
import { AdministrarUaPage } from '../../menu-consultar/administrar-ua/administrar-ua'
import { AlmacenajeServiceProvider } from '../../../../providers/almacenaje-service/almacenaje-service';
import { EtiquetadoServiceProvider } from '../../../../providers/etiquetado-service/etiquetado-service';
import moment from 'moment';

/**
 * Generated class for the ParticionarUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-particionar-ua',
  templateUrl: 'particionar-ua.html',
})
export class ParticionarUaPage {
  @ViewChild(Navbar) navBar: Navbar;
  vDatosRecibidos: any = [];
  vParticionarPage: any = [];
  ResultUA: any
  NombreImpresora: any;
  NuevaUA: any;
  CantUA: any;
  SaldoUA: any;
  UndXCajas: any;
  FechaIngreso: any;
  fecha: any;

  botonisDisplay: boolean = false;
  titutlo1isDisplay: boolean = true;
  titutlo2isDisplay: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider, public modalCtrl: ModalController, public sRecibo: ReciboServiceProvider,
    public sAlmacenaje: AlmacenajeServiceProvider, public sEtq: EtiquetadoServiceProvider, public viewCtrl: ViewController) {
    debugger;
    this.vDatosRecibidos = navParams.get('data');
    this.NombreImpresora = this.sGlobal.Id_Impresora == 0 ? "NINGUNA" : this.sGlobal.nombreImpresora;
    this.nuevaCantidad();

    if (this.vDatosRecibidos.page == 'modal') {
      this.botonisDisplay = true;
      this.titutlo1isDisplay = false;
      this.titutlo2isDisplay = true;
    }
  }

  nuevaCantidad() {
    this.sAlmacenaje.getListarUAConNuevaCantidad(this.vDatosRecibidos.CodBar_UA, this.vDatosRecibidos.CantidadTotal).then((result) => {
      debugger;
      this.ResultUA = result;
      debugger;
      if (this.ResultUA.length != 0) {
        this.CantUA = this.ResultUA[0].NroCajas;
        this.SaldoUA = this.ResultUA[0].SaldoTotal;
        this.UndXCajas = this.ResultUA[0].UndXCajas;
        this.FechaIngreso = this.ResultUA[0].FechaIngreso;
      }
    }, err => {
      console.log('E-getListarUAConNuevaCantidad', err);
    });
  }

  validarImprimir() {
    if (this.sGlobal.Id_Impresora == 0) {
      this.presentAlert("Impresora no existe. Seleccionar otra impresora").then((resultAlert) => {
        //Mostrar lista de impresoras.   
        this.showModalImpresora();
      })
    } else {
      this.presentAlertConfirm("¿Está seguro de imprimir la etiqueta?.").then((resultAlert3) => {
        if (resultAlert3) {
          //Imprimir y Particionar
          this.particionarUA_ImprimirUA();
        }
      })
    }
  }

  particionarUA_ImprimirUA() {
    debugger;
    this.sRecibo.postinsertarUAParticionada(this.vDatosRecibidos.CodBar_UA, this.vDatosRecibidos.CantidadTotal, this.sGlobal.userName, this.sGlobal.Id_Centro).then(result => {
      debugger;
      this.NuevaUA = result;

      if(this.NuevaUA.trim() != ""){
        debugger;
        var listContainer = [];
        var listEtq = [];
  
        this.fecha = new Date().toISOString()
        let fechaVencimientoPrint = moment(this.vDatosRecibidos.FechaVencimiento, "DD-MM-YYYY").toDate();
        listEtq = [];
        listEtq.push({ "campo": "|MES|", "valor": moment(this.fecha).format("MMMM") });
        listEtq.push({ "campo": "|ANIO|", "valor": moment(this.fecha).format("YYYY") });
        listEtq.push({ "campo": "|LOTE|", "valor": this.vDatosRecibidos.Lote.trim() });
        listEtq.push({ "campo": "|CODIGO|", "valor": this.vDatosRecibidos.Codigo });
        listEtq.push({ "campo": "|CANTBULTO|", "valor": this.CantUA });
        listEtq.push({ "campo": "|CANTXBULTO|", "valor": this.UndXCajas });
        listEtq.push({ "campo": "|SALDO|", "valor": this.SaldoUA });
        listEtq.push({ "campo": "|FECHA_INGRESO|", "valor": this.FechaIngreso });
        listEtq.push({ "campo": "|ORDEN|", "valor": "" });
        listEtq.push({ "campo": "|USUARIO|", "valor": this.sGlobal.apeNom });
        listEtq.push({ "campo": "|COMPOSICION|", "valor": "" });
        listEtq.push({ "campo": "|UMED|", "valor": this.vDatosRecibidos.UM });
        listEtq.push({ "campo": "|CANTIDAD|", "valor": parseFloat(this.vDatosRecibidos.CantidadTotal) });
        // listEtq.push({ "campo": "|CANTIDAD|", "valor": parseFloat(this.vDatosRecibidos.CantidadTotal).toFixed(2) });
        listEtq.push({ "campo": "|COPIAS|", "valor": "1" });
        listEtq.push({ "campo": "|CODBARRA|", "valor": this.NuevaUA });
        listEtq.push({ "campo": "|PRODUCTO|", "valor": this.vDatosRecibidos.DescProducto });
        listEtq.push({ "campo": "|EAN14|", "valor": "" });
        listEtq.push({ "campo": "|EAN|", "valor": "" });
        listEtq.push({ "campo": "|VENCIMIENTO|", "valor": moment(fechaVencimientoPrint).format("MMM-YYYY") });
        listEtq.push({ "campo": "|CUENTA|", "valor": this.vDatosRecibidos.Pasillo });
        listEtq.push({ "campo": "|TXTSALDO|", "valor": "" });
        listContainer.push({ 'etiqueta': listEtq });
  
        debugger;
  
        this.sEtq.imprimirListaEtiquetas(listContainer, 'ETQ_UA.txt', this.sGlobal.nombreImpresora, true).then(result => {
          debugger;
          var message: any = result;
          if (message.errNumber == -1) {
            alert(message.mensaje);
          }
        });
      }else{
        this.presentAlert("No se pudo particionar la UA.");
      }      
    });
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
    modalIncidencia.onDidDismiss(data => {
      this.NombreImpresora = this.sGlobal.nombreImpresora;
    });
  }

  dismiss(data = { 'response': 400, 'limpiar' : 1 }) {
    this.viewCtrl.dismiss(data);
  }

  // let printSel = {'printSel': print.Nombre };
  //           this.dismiss(printSel);

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

  // goAdministrarUaPage() {
  //   this.vParticionarPage = {
  //     'page': 3,
  //     'CodBar_UA': this.vDatosRecibidos.CodBar_UA
  //   };
  //   this.navCtrl.push(AdministrarUaPage, {
  //     data: this.vParticionarPage
  //   });
  // }

  goAdministrarUaPage(){
    debugger;
      this.navCtrl.pop().then(() => {
        this.vParticionarPage = {
          'page': 3,
          'CodBar_UA': this.vDatosRecibidos.CodBar_UA
        };
        this.navParams.get('particionar')(this.vParticionarPage);
      });
  }

  ionViewDidLoad() {
    //Enviar page 3 a administrar ua
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.goAdministrarUaPage();
    }
    console.log('ionViewDidLoad ParticionarUaPage');
  }
}
