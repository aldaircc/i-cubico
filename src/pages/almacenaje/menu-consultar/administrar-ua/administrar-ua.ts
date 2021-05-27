import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, AlertController, ToastController, PopoverController, ModalController, Navbar, Platform  } from 'ionic-angular';
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
import { PopoverReciboComponent } from '../../../../components/popover-recibo/popover-recibo';
//import { Keyboard } from '@ionic-native/keyboard/ngx';



/**
 * Generated class for the AdministrarUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrar-ua',
  templateUrl: 'administrar-ua.html'
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

  id_FormatLabel: any;

  valorpopoverGlobal: boolean = false;
  popoverGlobal: any;
  LoteReadOnly: boolean = false;

  formatLabels: any = [
    { 'Id_Format': 1, 'Label': 'ETQ_UA.txt' },
    { 'Id_Format': 2, 'Label': 'ETQ_UAGrande.txt' }
  ];

  // private keyboard: Keyboard
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider,
    public modalCtrl: ModalController, public sEtq: EtiquetadoServiceProvider, public popoverCtrl: PopoverController,
    private platform: Platform) {
    this.vDatosRecibidos = navParams.get('data');
    if (this.vDatosRecibidos.page == 'modal') {
      this.botonisDisplay = true;
      this.titutlo1isDisplay = false;
      this.titutlo2isDisplay = true;
    }
  }
  

  validarCodeBarUA() {
    if (this.codeBarUA) {
      if (this.codeBarUA.trim() != "") {
        if (this.codeBarUA.length == 12) {
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
                    this.selectAll(this.txtCodUA);
                  }, (500));
                }
              })
            } else {

              if(this.ResultUA[0].Lote == '999999'){
                this.LoteReadOnly = true;


              }
              else{
                this.LoteReadOnly = false;
              }

              this.ResultUA_Aux = this.ResultUA[0];
              this.FechaEmision =  ( result[0].FechaEmision == null) ? "" :  moment(result[0].FechaEmision, "DD-MM-YYYY").toDate().toISOString();
              this.FechaVencimiento = (result[0].FechaVencimiento == null) ? "" : moment(result[0].FechaVencimiento, "DD-MM-YYYY").toDate().toISOString();
              this.Lote = result[0].Lote;
              this.Cantidad = result[0].Cantidad;

              this.FechaEmisionBk = ( result[0].FechaEmision == null) ? "" : moment(result[0].FechaEmision, "DD-MM-YYYY").toDate().toISOString();
              this.FechaVencimientoBk = (result[0].FechaVencimiento == null) ? "" : moment(result[0].FechaVencimiento, "DD-MM-YYYY").toDate().toISOString();
              this.LoteBk = result[0].Lote;
              this.CantidadBk = result[0].Cantidad;

              this.btnReimprimirisenabled = true;
              this.btnEliminarisenabled = true;
              this.btnActualizarisenabled = true;
              this.btnReasignarisenabled = true;
              this.btnReubicarisenabled = true;
              this.btnParticionarisenabled = true;

              setTimeout(() => {
                this.selectAll(this.txtCantidad);
              }, (500));

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
          this.presentToast("El código de UA debe tener 12 dígitos.");
          setTimeout(() => {
            this.selectAll(this.txtCodUA);
          }, (500));
        }
      } else {
        this.presentToast("Ingrese código de UA");
        setTimeout(() => {
          this.selectAll(this.txtCodUA);
        }, (500));
      }
    } else {
      this.presentToast("Ingrese código de UA");
      setTimeout(() => {
        this.selectAll(this.txtCodUA);
      }, (500));
    }
  }

  eliminartUA() {
    debugger;
    this.presentAlertConfirm("¿Está seguro de eliminar la UA?.").then((result) => {
      if (result) {
        debugger
        let fecha = new Date().toISOString();
        debugger;

        let feEmi;
        let feVenc;

        if(this.FechaEmision == ""){
          feEmi = null;
        }
        else{
          feEmi = "/Date("  + this.FechaEmision + ")/";
        }

        if(this.FechaVencimiento == ""){
          feVenc = null;
        }
        else{
          feVenc = "/Date("  + this.FechaVencimiento + ")/" ; 
        }




        let objUA = {
          'UA_CodBarra': this.ResultUA[0].UA_CodBarra,
          'FechaRegistro': "/Date(" + Date.parse(fecha) + ")/",
          'FechaEmision': feEmi,
          'FechaVencimiento': feVenc,
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
    debugger;
    var update = false;

    if (this.FechaEmision != this.FechaEmisionBk) {
      update = true;
    }
    if (this.FechaVencimiento != this.FechaVencimientoBk) {
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
          debugger;

          let feEmi;
          let feVenc;

          if(this.FechaEmision == ""){
            feEmi = null;
          }
          else{
            feEmi = "/Date("  + this.FechaEmision + ")/";
          }

          if(this.FechaVencimiento == ""){
            feVenc = null;
          }
          else{
            feVenc = "/Date("  + this.FechaVencimiento + ")/" ; 
          }

          let objUA = {

            'UA_CodBarra': this.ResultUA[0].UA_CodBarra,
            'FechaRegistro': "/Date(" + Date.parse(fecha) + ")/",
            'FechaEmision':  feEmi,
            'FechaVencimiento':  feVenc,
            'LoteLab': this.Lote,
            'Cantidad': this.Cantidad,
            'UsuarioRegistro': this.sGlobal.userName
          };
          debugger;
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
          this.showModalImpresora();
        })
      } else {
        this.presentAlertConfirm("¿Está seguro de imprimir la etiqueta?.").then((resultAlert3) => {
          if (resultAlert3) {
            //Imprimir
            this.imprimir();
          }
        })
      }
    } else {
      this.presentAlert("No es posible reimprimir, existen campos modificados. Volver a ingresar la UA").then((resultAlert) => {
        setTimeout(() => {
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
    let fechaVencimientoStringPrint = fechaVencimientoPrint.toISOString();

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
    // listEtq.push({ "campo": "|CANTIDAD|", "valor": parseFloat(this.Cantidad).toFixed(2) });
    listEtq.push({ "campo": "|CANTIDAD|", "valor": parseFloat(this.Cantidad) });
    listEtq.push({ "campo": "|COPIAS|", "valor": "1" });
    listEtq.push({ "campo": "|CODBARRA|", "valor": this.codeBarUA });
    listEtq.push({ "campo": "|PRODUCTO|", "valor": this.ResultUA_Aux.Descripcion });
    listEtq.push({ "campo": "|EAN14|", "valor": "" });
    listEtq.push({ "campo": "|EAN|", "valor": "" });
    listEtq.push({ "campo": "|VENCIMIENTO|", "valor": moment(this.FechaVencimiento).format("MMM-YYYY") });
    listEtq.push({ "campo": "|CUENTA|", "valor": this.ResultUA_Aux.Pasillo });
    listEtq.push({ "campo": "|TXTSALDO|", "valor": "" });
    listContainer.push({ 'etiqueta': listEtq });

    debugger;
    let format = this.formatLabels.filter(x => x.Id_Format == this.id_FormatLabel)[0];
    // this.sEtq.imprimirListaEtiquetas(listContainer, 'ETQ_UA.txt', this.sGlobal.nombreImpresora, true).then(result => {
    this.sEtq.imprimirListaEtiquetas(listContainer, format.Label, this.sGlobal.nombreImpresora, true).then(result => {
      debugger;
      var message: any = result;
      if (message.errNumber == -1) {
        alert(message.mensaje);
      }
    });
  }

  

  presentPopover(myEvent) {
    debugger;
    let popover
    this.valorpopoverGlobal = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverReciboComponent, { 
      'page': 21    });
    this.popoverGlobal.present({      
      ev: myEvent      
    });
    this.popoverGlobal.onDidDismiss(popoverData => {
      this.valorpopoverGlobal = false;
      if (popoverData == 3) {
        this.showModalImpresora();
      }   
    });

    
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
    modalIncidencia.onDidDismiss(data => {
      if (this.sGlobal.Id_Impresora == 0) {
        this.NombreImpresora = "NINGUNA";
      } else {
        this.NombreImpresora = this.sGlobal.nombreImpresora;
        console.log('Id_Impresora - actualizada', this.sGlobal.Id_Impresora);
      }
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
    this.id_FormatLabel = "";
    setTimeout(() => {
      this.selectAll(this.txtCodUA);
    }, (500));
  }

  CantidadChange(ev: any) {
    let val = ev.target.value;
    let name = ev.target.name;

    let cant = 0; //Cantidad de puntos en la cadena
    for (var i = 0; i < val.length; i++) {
      if (val.charAt(i) == ".") {
        cant = cant + 1;
      }
    }

    if (cant == 0) { //Significa que es un número entero      
      if (val.length > 5) {
        if (name == "txtCant") {
          this.Cantidad = 0;
          setTimeout(() => {
            this.selectAll(this.txtCantidad);
          }, (500));
        }
        alert("La cantidad ingresada debe ser menor. Máximo 5 números enteros y 3 decimales.")
      }
    } else if (cant == 1) {
      //Metodo para saber cuantos digitos hay despues del .
      var punto = 0;
      var cantDecimales = 0;
      for (var i = 0; i < val.length; i++) {
        if (punto == 1) {
          cantDecimales = cantDecimales + 1;
        }
        if (val.charAt(i) == ".") {
          punto = punto + 1;
        }
      }
      //Validar que solo tenga 3 decimales
      if (cantDecimales > 3) {
        if (name == "txtCant") {
          this.Cantidad = 0;
          setTimeout(() => {
            this.selectAll(this.txtCantidad);
          }, (500));
        }
        alert("La cantidad ingresada debe ser menor. Máximo 5 números enteros y 3 decimales.")
      }
    } else if (cant > 1) { //Valida que solo tenga un punto decimal
      if (name == "txtCant") {
        this.Cantidad = 0;
        setTimeout(() => {
          this.selectAll(this.txtCantidad);
        }, (500));
      }
      alert("El número ingresado no tiene formato correcto, vuelva a ingresar.")
    }
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
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
    debugger;
    if (this.Cantidad > this.CantidadBk) {
      this.presentAlert("La cantidad no debe ser mayor").then((resultAlert) => {
        setTimeout(() => {
          this.selectAll(this.txtCantidad);
        }, (500));
      })

    } else {
      this.vAdministrarUAPage = {
        'CodBar_UA': this.codeBarUA,
        'Lote': this.Lote,
        'Id_Producto': this.ResultUA[0].Id_Producto,
        'CantidadOrigen': this.Cantidad
      };
      this.navCtrl.push(ReasignarUaPage, {
        data: this.vAdministrarUAPage, reasignar: this.reasignarCallback
      });
    }
  }

  dataFromReasignarUaPage: any;
  dataFromReubicarUaPage: any;
  dataFromParticionarUaPage: any;
  reasignarCallback = data => {
    debugger;
    this.dataFromReasignarUaPage = data;
    console.log('data received from other page', this.dataFromReasignarUaPage);
    debugger;
    this.vDatosRecibidos.page = this.dataFromReasignarUaPage.page;
    this.limpiar();
  };

  reubicarCallback = data => {
    debugger;
    this.dataFromReubicarUaPage = data;
    console.log('data received from other page', this.dataFromReubicarUaPage);
    debugger;
    this.vDatosRecibidos.page = this.dataFromReubicarUaPage.page;
    this.limpiar();
  };

  particionarCallback = data => {
    debugger;
    this.dataFromParticionarUaPage = data;
    console.log('data received from other page', this.dataFromParticionarUaPage);
    debugger;
    this.vDatosRecibidos = this.dataFromParticionarUaPage;
    this.codeBarUA = this.vDatosRecibidos.CodBar_UA;
    this.validarCodeBarUA();
  };

  goReubicarUaPage() {
    this.vAdministrarUAPage = {
      'CodBar_UA': this.codeBarUA,
      'Id_Ubicacion': this.ResultUA[0].Id_Ubicacion
    };
    this.navCtrl.push(ReubicarUaPage, {
      data: this.vAdministrarUAPage, reubicar: this.reubicarCallback
    });
  }

  goParticionarUaPage() {
    debugger;
    if (this.Cantidad > this.CantidadBk) {
      this.presentAlert("La cantidad no debe ser mayor o igual al de la UA").then((resultAlert) => {
        setTimeout(() => {
          this.selectAll(this.txtCantidad);
        }, (500));
      })

    } else if (this.Cantidad == this.CantidadBk) {
      this.presentAlert("La cantidad no debe ser mayor o igual al de la UA").then((resultAlert) => {
        setTimeout(() => {
          this.selectAll(this.txtCantidad);
        }, (500));
      })
    } else {
      this.vAdministrarUAPage = {
        'page': 0,
        'CodBar_UA': this.codeBarUA,
        'UM': this.ResultUA_Aux.UM,
        'Codigo': this.ResultUA_Aux.Codigo,
        'DescProducto': this.ResultUA_Aux.Descripcion,
        'Lote': this.Lote,
        'FechaEmision':  (this.FechaEmision == null) ? "" : moment(this.FechaEmision).format("DD-MM-YYYY"),
        'FechaVencimiento': (this.FechaVencimiento == null) ? "" : moment(this.FechaVencimiento).format("DD-MM-YYYY"),
        'Pasillo': this.ResultUA_Aux.Pasillo,
        'CantidadTotal': parseFloat(this.Cantidad)
      };
      this.navCtrl.push(ParticionarUaPage, {
        data: this.vAdministrarUAPage, particionar: this.particionarCallback
      });
    }
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
    setTimeout(() => {
      this.selectAll(this.txtCodUA);
    }, (500));    
    console.log('ionViewDidLoad AdministrarUaPage');
  }

  ionViewWillEnter(){
    debugger;
    this.platform.registerBackButtonAction(() => {
      debugger;
      if(this.valorpopoverGlobal){
        this.valorpopoverGlobal = false;
        this.popoverGlobal.dismiss();
      }else{
        this.navCtrl.pop(); 
      }      
  });
  }
  
}
