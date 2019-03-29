import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, AlertController, ToastController, ModalController, Navbar } from 'ionic-angular';
import { ReasignarUaPage } from '../reasignar-ua/reasignar-ua'
import { ReubicarUaPage } from '../reubicar-ua/reubicar-ua'
import { ParticionarUaPage } from '../particionar-ua/particionar-ua'
import { AlmacenajeServiceProvider } from '../../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { ImpresoraPage } from '../../../impresora/impresora'
import { MenuConsultarPage } from '../../../almacenaje/menu-consultar/menu-consultar'
import { PickingPage } from '../../../picking/picking'
import { RutaPickingPage } from '../../../picking/ruta-picking/ruta-picking';
import { DetallePickingPage } from '../../../picking/detalle-picking/detalle-picking'
import { CierrePickingPage } from '../../../picking/cierre-picking/cierre-picking';
import moment from 'moment';
import { EtiquetadoServiceProvider } from '../../../../providers/etiquetado-service/etiquetado-service';



/**
 * Generated class for the AdministrarUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrar-ua',
  templateUrl: 'administrar-ua.html',
})
export class AdministrarUaPage {

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodUA') txtCodUARef;
  @ViewChild('txtCodUA', { read: ElementRef }) private txtCodUA: ElementRef;
  @ViewChild('txtCantidad') txtCantidadRef;
  @ViewChild('txtCantidad', { read: ElementRef }) private txtCantidad: ElementRef;


  fecha: any;
  codeBarUA: string;
  ResultUA: any
  ResultUA_Aux: any = [];
  FechaEmision: any;
  FechaVencimiento: any;
  Lote: any;
  Cantidad: any;
  FechaEmisionBk: any;
  FechaVencimientoBk: any;
  LoteBk: any;
  CantidadBk: any;
  btnReimprimirisenabled: boolean = false;
  btnEliminarisenabled: boolean = false;
  btnActualizarisenabled: boolean = false;
  btnReasignarisenabled: boolean = false;
  btnReubicarisenabled: boolean = false;
  btnParticionarisenabled: boolean = false;
  NombreImpresora: any;
  vAdministrarUAPage: any;
  vDatosRecibidos: any = [];

  botonisDisplay: boolean = false;
  titutlo1isDisplay: boolean = true;
  titutlo2isDisplay: boolean = false;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider,
    public modalCtrl: ModalController, public sEtq: EtiquetadoServiceProvider) {
    this.vDatosRecibidos = navParams.get('data');
    if (this.vDatosRecibidos.page == 3) {
      this.codeBarUA = this.vDatosRecibidos.CodBar_UA;
      this.validarCodeBarUA();
    }
    if (this.vDatosRecibidos.page == 'modal') {
      this.botonisDisplay = true;
      this.titutlo1isDisplay = false;
      this.titutlo2isDisplay = true;
    }
  }

  validarCodeBarUA() {
    if (this.codeBarUA) {
      if (this.codeBarUA.trim() != "") {
        debugger;
        this.sAlmacenaje.getListarUAUbicada(this.codeBarUA, this.sGlobal.Id_Almacen).then((result) => {
          debugger;
          this.ResultUA = result;
          if (this.ResultUA.length == 0) {
            this.NombreImpresora = "NINGUNA";
            this.presentAlert("UA' no registrada").then((resultAlert) => {
              if (resultAlert) {
                this.limpiar();
                setTimeout(() => {
                  this.txtCodUARef.setFocus();
                  this.selectAll(this.txtCodUA);
                }, (500));
              }
            })
          } else {
            this.ResultUA_Aux = this.ResultUA[0];
            this.FechaEmision = result[0].FechaEmision;
            this.FechaVencimiento = result[0].FechaVencimiento;
            this.Lote = result[0].Lote;
            this.Cantidad = result[0].Cantidad;

            this.FechaEmisionBk = result[0].FechaEmision;
            this.FechaVencimientoBk = result[0].FechaVencimiento;
            this.LoteBk = result[0].Lote;
            this.CantidadBk = result[0].Cantidad;

            this.btnReimprimirisenabled = true;
            this.btnEliminarisenabled = true;
            this.btnActualizarisenabled = true;
            this.btnReasignarisenabled = true;
            this.btnReubicarisenabled = true;
            this.btnParticionarisenabled = true;

            if (this.sGlobal.Id_Impresora == 0) {
              this.NombreImpresora = "NINGUNA";
            } else {
              this.NombreImpresora = this.sGlobal.nombreImpresora;
            }
          }
        }, err => {
          console.log('E-getDataRutaPicking', err);
        });
      } else {
        this.presentToast("Ingrese código de UA");
        setTimeout(() => {
          this.txtCodUARef.setFocus();
          this.selectAll(this.txtCodUA);
        }, (500));
      }
    } else {
      this.presentToast("Ingrese código de UA");
      setTimeout(() => {
        this.txtCodUARef.setFocus();
        this.selectAll(this.txtCodUA);
      }, (500));
    }
  }

  eliminartUA() {
    debugger;
    this.presentAlertConfirm("¿Está seguro de eliminar la UA?”.").then((result) => {
      if (result) {
        debugger
        let fecha = new Date().toISOString();
        let fechaEmision = moment(this.FechaEmision, "DD-MM-YYYY").toDate();
        let fechaEmisionString = fechaEmision.toISOString();
        let fechaVencimiento = moment(this.FechaVencimiento, "DD-MM-YYYY").toDate();
        let fechaVencimientoString = fechaVencimiento.toISOString();
        debugger;
        let objUA = {
          'UA_CodBarra': this.ResultUA[0].UA_CodBarra,
          'FechaRegistro': "/Date(" + Date.parse(fecha) + ")/",
          'FechaEmision': "/Date(" + Date.parse(fechaEmisionString) + ")/",
          'FechaVencimiento': "/Date(" + Date.parse(fechaVencimientoString) + ")/",
          'Lote': this.Lote,
          'Cantidad': this.Cantidad,
          'UsuarioRegistro': this.sGlobal.userName
        };

        this.sAlmacenaje.postRegistrarUAStandBy(objUA, 2, this.sGlobal.Id_Almacen).then(result => {
          debugger;
          let res: any = result;
          if (res.errNumber == 0) {
            console.log(res.message);
            this.presentAlert("UA en Stand By.").then((resultAlert2) => {
              this.limpiar();
            })
          } else {
            this.presentAlert("Error. No se pudo eliminar el valor.");
            console.log(res.message);
          }
        });
      }
    })
  }

  actualizarUA() {
    var update = false;

    if (this.FechaEmision.trim() != this.FechaEmisionBk.trim()) {
      update = true;
    }
    if (this.FechaVencimiento.trim() != this.FechaVencimientoBk.trim()) {
      update = true;
    }
    if (this.Lote.trim() != this.LoteBk.trim()) {
      update = true;
    }
    if (this.Cantidad != this.CantidadBk) {
      update = true;
    }

    if (update == true) {
      this.presentAlertConfirm("¿Está seguro de modificar la UA?”.").then((resultAlert3) => {
        if (resultAlert3) {
          debugger
          let fecha = new Date().toISOString();
          let fechaEmision = moment(this.FechaEmision, "DD-MM-YYYY").toDate();
          let fechaEmisionString = fechaEmision.toISOString();
          let fechaVencimiento = moment(this.FechaVencimiento, "DD-MM-YYYY").toDate();
          let fechaVencimientoString = fechaVencimiento.toISOString();
          debugger;
          let objUA = {
            'UA_CodBarra': this.ResultUA[0].UA_CodBarra,
            'FechaRegistro': "/Date(" + Date.parse(fecha) + ")/",
            'FechaEmision': "/Date(" + Date.parse(fechaEmisionString) + ")/",
            'FechaVencimiento': "/Date(" + Date.parse(fechaVencimientoString) + ")/",
            'Lote': this.Lote,
            'Cantidad': this.Cantidad,
            'UsuarioRegistro': this.sGlobal.userName
          };

          this.sAlmacenaje.postRegistrarUAStandBy(objUA, 1, this.sGlobal.Id_Almacen).then(result => {
            debugger;
            let res: any = result;
            if (res.errNumber == 0) {
              console.log(res.message);
              this.presentAlert("UA en Stand By.").then((resultAlert2) => {
                this.limpiar();
              })
            } else {
              this.presentAlert("No se ha modificado algún campo de la UA.");
              console.log(res.message);
            }
          });
        }
      })
    } else {
      this.presentAlert("No se ha modificado algún campo de la UA.");
    }

  }

  reImprimirUA() {
    var reimprimir = true;
    if (this.Lote.trim() != this.LoteBk.trim()) {
      reimprimir = false;
    } else if (this.Cantidad != this.CantidadBk) {
      reimprimir = false;
    }

    if (reimprimir == true) {
      debugger;
      if (this.sGlobal.Id_Impresora == 0) {
        this.presentAlert("Impresora no existe. Seleccionar otra impresora").then((resultAlert) => {
          //Mostrar lista de impresoras.   
          this.showModalImpresora();
        })
      } else {
        this.presentAlertConfirm("¿Está seguro de imprimir la etiqueta?”.").then((resultAlert3) => {
          if (resultAlert3) {
            //Imprimir
            this.imprimir();
          }
        })
      }
    } else {
      this.presentAlert("No es posible reimprimir, existen campos modificados. Volver a ingresar la UA").then((resultAlert) => {
        setTimeout(() => {
          this.txtCodUARef.setFocus();
          this.selectAll(this.txtCodUA);
        }, (500));
      })
    }
  }

  imprimir() {
    debugger;
    var listContainer = [];
    var listEtq = [];

    this.fecha = new Date().toISOString()
    let fechaVencimientoPrint = moment(this.FechaVencimiento, "DD-MM-YYYY").toDate();
    //let fechaVencimientoStringPrint = fechaVencimientoPrint.toISOString();

    listEtq = [];
    listEtq.push({ "campo": "|MES|", "valor": moment(this.fecha).format("MMMM") });
    listEtq.push({ "campo": "|ANIO|", "valor": moment(this.fecha).format("YYYY") });
    listEtq.push({ "campo": "|LOTE|", "valor": this.Lote.trim() });
    listEtq.push({ "campo": "|CODIGO|", "valor": this.ResultUA_Aux.Codigo });
    listEtq.push({ "campo": "|CANTBULTO|", "valor": this.Cantidad });
    listEtq.push({ "campo": "|CANTXBULTO|", "valor": 0 });
    listEtq.push({ "campo": "|SALDO|", "valor": 0 });
    listEtq.push({ "campo": "|FECHA_INGRESO|", "valor": "" });
    listEtq.push({ "campo": "|ORDEN|", "valor": "" });
    listEtq.push({ "campo": "|USUARIO|", "valor": this.sGlobal.apeNom });
    listEtq.push({ "campo": "|COMPOSICION|", "valor": "" });
    listEtq.push({ "campo": "|UM|", "valor": this.ResultUA_Aux.UM });
    listEtq.push({ "campo": "|CANTIDAD|", "valor": parseFloat(this.Cantidad).toFixed(2) });
    listEtq.push({ "campo": "|COPIAS|", "valor": "1" });
    listEtq.push({ "campo": "|CODBARRA|", "valor": this.codeBarUA });
    listEtq.push({ "campo": "|PRODUCTO|", "valor": this.ResultUA_Aux.Descripcion });
    listEtq.push({ "campo": "|EAN14|", "valor": "" });
    listEtq.push({ "campo": "|EAN|", "valor": "" });
    listEtq.push({ "campo": "|VENCIMIENTO|", "valor": moment(fechaVencimientoPrint).format("MMM-YYYY") });
    listEtq.push({ "campo": "|CUENTA|", "valor": this.ResultUA_Aux.Pasillo });
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
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
    modalIncidencia.onDidDismiss(data => {
      this.NombreImpresora = this.sGlobal.nombreImpresora;
    });
  }

  limpiar() {
    this.ResultUA_Aux = [];
    this.codeBarUA = "";
    this.FechaEmision = "";
    this.FechaVencimiento = "";
    this.Lote = "";
    this.Cantidad = "";
    this.FechaEmisionBk = "";
    this.FechaVencimientoBk = "";
    this.LoteBk = "";
    this.CantidadBk = "";
    this.NombreImpresora = "";
    this.btnReimprimirisenabled = false;
    this.btnEliminarisenabled = false;
    this.btnActualizarisenabled = false;
    this.btnReasignarisenabled = false;
    this.btnReubicarisenabled = false;
    this.btnParticionarisenabled = false;
    setTimeout(() => {
      this.txtCodUARef.setFocus();
    }, (500));
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
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

  goReasignarUaPage() {
    this.vAdministrarUAPage = {
      'CodBar_UA': this.codeBarUA,
      'Lote': this.Lote,
      'Id_Producto': this.ResultUA[0].Id_Producto

    };
    this.navCtrl.push(ReasignarUaPage, {
      data: this.vAdministrarUAPage
    });
  }

  goReubicarUaPage() {
    this.vAdministrarUAPage = {
      'CodBar_UA': this.codeBarUA,
      'Id_Ubicacion': this.ResultUA[0].Id_Ubicacion
    };
    this.navCtrl.push(ReubicarUaPage, {
      data: this.vAdministrarUAPage
    });
  }

  goParticionarUaPage() {
    debugger;

    if (this.Cantidad > this.CantidadBk) {
      this.presentAlert("La cantidad no debe ser mayor o igual al de la UA").then((resultAlert) => {
        setTimeout(() => {
          this.txtCantidadRef.setFocus();
          this.selectAll(this.txtCantidad);
        }, (500));
      })

    } else if (this.Cantidad == this.CantidadBk) {
      this.presentAlert("La cantidad no debe ser mayor o igual al de la UA").then((resultAlert) => {
        setTimeout(() => {
          this.txtCantidadRef.setFocus();
          this.selectAll(this.txtCantidad);
        }, (500));
      })
    } else {
      this.vAdministrarUAPage = {
        'CodBar_UA': this.codeBarUA,
        'UM': this.ResultUA_Aux.UM,
        'Codigo': this.ResultUA_Aux.Codigo,
        'DescProducto': this.ResultUA_Aux.Descripcion,
        'Lote': this.Lote,
        'FechaEmision': this.FechaEmision,
        'FechaVencimiento': this.FechaVencimiento,
        'Pasillo': this.ResultUA_Aux.Pasillo,
        'CantidadTotal': parseFloat(this.Cantidad)
      };
      this.navCtrl.push(ParticionarUaPage, {
        data: this.vAdministrarUAPage
      });
    }
  }

  goMenuConsultarPage() {
    this.navCtrl.push(MenuConsultarPage);
  }

  goPickingPage() {
    this.navCtrl.push(PickingPage);
  }

  goRutaPickingPage() {
    this.vAdministrarUAPage = {
      'idRutaPicking': this.vDatosRecibidos.idRutaPicking,
      'Id_Tx': this.vDatosRecibidos.Id_Tx,
      'NumOrden': this.vDatosRecibidos.NumOrden,
      'Cliente': this.vDatosRecibidos.Cliente,
      'Ciudad': this.vDatosRecibidos.Ciudad,
      'Zona': this.vDatosRecibidos.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vAdministrarUAPage
    });
  }

  goDetallePickingPage() {
    debugger;
    this.vAdministrarUAPage = {
      'Id_Page_Anterior': this.vDatosRecibidos.Id_Page_Anterior,
      'Id_Tx': this.vDatosRecibidos.Id_Tx,
      'NumOrden': this.vDatosRecibidos.NumOrden,
      'Cliente': this.vDatosRecibidos.Cliente
    };
    this.navCtrl.push(DetallePickingPage, {
      data: this.vAdministrarUAPage
    });
  }

  goCerrarPickingPage() {
    debugger;
    this.vAdministrarUAPage = {
      'Id_Tx': this.vDatosRecibidos.Id_Tx,
      'NumOrden': this.vDatosRecibidos.NumOrden,
      'Ciudad': this.vDatosRecibidos.Ciudad,
      'Zona': this.vDatosRecibidos.Zona,
      'Saldo': this.vDatosRecibidos.Saldo
    };
    this.navCtrl.push(CierrePickingPage, {
      data: this.vAdministrarUAPage
    });
  }

  dismiss(data = { 'response': 400 }) {
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      // if(this.vDatosRecibidos.page == 4){
      //   this.goPickingPage();
      // }else if(this.vDatosRecibidos.page == 5){
      //   this.goRutaPickingPage();
      // }
      // else if(this.vDatosRecibidos.page == 6){
      //   this.goDetallePickingPage();
      // }
      // else if(this.vDatosRecibidos.page == 7){
      //   this.goCerrarPickingPage();
      // }
      // else if(this.vDatosRecibidos.page == 8){
      //   this.dismiss();
      // }
      // else if(this.vDatosRecibidos.page == 9){
      //   //Ir a detalle por producto/ver uas
      // }
      // else if(this.vDatosRecibidos.page == 10){
      //   //Ir a reabastecimiento
      // }
      // else{
      //   this.goMenuConsultarPage();
      // }
      this.goMenuConsultarPage();
    }
    setTimeout(() => {
      this.txtCodUARef.setFocus();
    }, (500));
    console.log('ionViewDidLoad AdministrarUaPage');
  }

}
