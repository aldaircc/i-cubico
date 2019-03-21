import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, App, ModalController, Navbar, NavController, NavParams, PopoverController, ToastController, AlertController } from 'ionic-angular';
import { DetallePorProductoPage } from '../detalle-por-producto/detalle-por-producto'
import { ReabastecimientoPage } from '../reabastecimiento/reabastecimiento'
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { DetallePickingPage } from '../detalle-picking/detalle-picking';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { RutaPickingPage } from '../ruta-picking/ruta-picking';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MainMenuPage } from '../../main-menu/main-menu'
import { HomePage } from '../../home/home';
/**
 * Generated class for the PickingPorProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picking-por-producto',
  templateUrl: 'picking-por-producto.html',
})
export class PickingPorProductoPage {

  vRutaPickingPage: any = [];
  listaTempPickingProducto: any = [];
  listPickingProducto: any = [];
  pickingProducto: any = [];
  UAPicking: any = [];
  vPickingXProducto: any = [];
  resultRegistrar: any = [];
  listProductoConRuta: any = [];
  posicion: number = 0;
  contador: number = 1;
  total: number = 1;
  idRutaPicking: number = 0;
  Backisenabled: boolean = false;
  Nextisenabled: boolean = false;
  Txtcantidadisenabled: boolean = false;
  isBgRed: boolean = false;
  isBgYellow: boolean = false;
  isBgGreen: boolean = false;
  isbgWhite: boolean = false;
  codeBar: string;
  Textcantidad: string = '';
  codUbicacion: string;

  valor: number = 0;

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodBarraUA') txtCodBarraUARef;
  @ViewChild('txtCantidadUA') txtCantidadUARef;
  @ViewChild('txtCantidadUA', { read: ElementRef }) private txtCantidadUA: ElementRef;

  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider) {
    this.vRutaPickingPage = navParams.get('data');
    this.getPickingProductoLoad();
  }

  getPickingProductoLoad() {
    this.codeBar = "";
    this.Textcantidad = "";
    this.getPickingProducto(this.vRutaPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  getPickingProducto(strNroDoc, strUsuario, intIdAlmacen) {
    this.sPicking.getPickingProducto(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
      this.listPickingProducto = result;

      this.listaTempPickingProducto = [];

      for (var i = 0; i < this.listPickingProducto.length; i++) {
        var obj = {
          'idRutaPicking': this.idRutaPicking,
          'Caja': result[i].Caja,
          'CantidadPedida': result[i].CantidadPedida,
          'CodBarraUbi': result[i].CodBarraUbi,
          'CodigoProducto': result[i].CodigoProducto,
          'Columna': result[i].Columna,
          'Contenedor': result[i].Contenedor,
          'Fila': result[i].Fila,
          'FlagAscendente': result[i].FlagAscendente,
          'FlagDescendente': result[i].FlagDescendente,
          'FlagTransito': result[i].FlagTransito,
          'IdPasillo': result[i].IdPasillo,
          'IdProducto': result[i].IdProducto,
          'IdSector': result[i].IdSector,
          'IdUMBase': result[i].IdUMBase,
          'IdUbicacion': result[i].IdUbicacion,
          'Item': result[i].Item,
          'LoteProducto': result[i].LoteProducto,
          'LoteRecibo': result[i].LoteRecibo,
          'Nivel': result[i].Nivel,
          'Pasillo': result[i].Pasillo,
          'Posicion': result[i].Posicion,
          'Producto': result[i].Producto,
          'Referencia': result[i].Referencia,
          'Saldo': result[i].Saldo,
          'SaldoCaja': result[i].SaldoCaja,
          'Sector': result[i].Sector,
          'UMBase': result[i].UMBase
        };
        this.listaTempPickingProducto.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }

      for (var i = 0; i < this.listaTempPickingProducto.length; i++) {
        //if(result[i].Saldo>0){ 
        if (result[i].FlagTransito == false) {
          var id = this.vRutaPickingPage.idRutaPicking;
          this.contador = 1;
          if (id >= 0) {
            debugger;
            this.contador = id + 1;
            this.posicion = id;
            this.pickingProducto = result[this.posicion];
            if (this.contador == 1) {
              this.Backisenabled = false;
            } else { this.Backisenabled = true; }
            if (this.contador == this.listaTempPickingProducto.length) {
              this.Nextisenabled = true;
            } else {
              this.Nextisenabled = false;
            }
          }
          // else{
          //   this.contador = i + 1;
          //   this.posicion = i;
          //   this.pickingProducto = result[i];
          //   if(this.contador==1){
          //     this.Backisenabled=false;
          //   }else{this.Backisenabled=true;}
          //   if(this.contador==this.listaTempPickingProducto.length){
          //     this.Nextisenabled=true;
          //   }else{
          //     this.Nextisenabled=false;
          //   }
          // }

          this.total = this.listaTempPickingProducto.length;
          if (this.contador == this.listaTempPickingProducto.length) {
            this.Nextisenabled = true;
          }
          console.log('detalles', this.pickingProducto);
          if (this.pickingProducto.length == 0) {
            console.log('No se encontraron detalles', this.pickingProducto);
          }

          debugger;
          // if(this.valorRegistrar==1){
          //   debugger;
          //   this.ValidarSiguienteProducto();
          // }
          return;
        }
        //}
      }

    }, err => {
      console.log('E-getPickingProducto', err);
    });
  }

  getPickingProductoUpdate(strNroDoc, strUsuario, intIdAlmacen) {
    this.sPicking.getPickingProducto(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
      this.listPickingProducto = result;

      this.listaTempPickingProducto = [];

      for (var i = 0; i < this.listPickingProducto.length; i++) {
        var obj = {
          'idRutaPicking': this.idRutaPicking,
          'Caja': result[i].Caja,
          'CantidadPedida': result[i].CantidadPedida,
          'CodBarraUbi': result[i].CodBarraUbi,
          'CodigoProducto': result[i].CodigoProducto,
          'Columna': result[i].Columna,
          'Contenedor': result[i].Contenedor,
          'Fila': result[i].Fila,
          'FlagAscendente': result[i].FlagAscendente,
          'FlagDescendente': result[i].FlagDescendente,
          'FlagTransito': result[i].FlagTransito,
          'IdPasillo': result[i].IdPasillo,
          'IdProducto': result[i].IdProducto,
          'IdSector': result[i].IdSector,
          'IdUMBase': result[i].IdUMBase,
          'IdUbicacion': result[i].IdUbicacion,
          'Item': result[i].Item,
          'LoteProducto': result[i].LoteProducto,
          'LoteRecibo': result[i].LoteRecibo,
          'Nivel': result[i].Nivel,
          'Pasillo': result[i].Pasillo,
          'Posicion': result[i].Posicion,
          'Producto': result[i].Producto,
          'Referencia': result[i].Referencia,
          'Saldo': result[i].Saldo,
          'SaldoCaja': result[i].SaldoCaja,
          'Sector': result[i].Sector,
          'UMBase': result[i].UMBase
        };
        this.listaTempPickingProducto.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }

      debugger;
      this.pickingProducto = result[this.posicion];


      this.ValidarSiguienteProducto();

      return;

    }, err => {
      console.log('E-getPickingProducto', err);
    });
  }




  registarUA() {
    debugger;
    //this.valorRegistrar = 1;

    if (parseInt(this.Textcantidad) > this.pickingProducto.Saldo) { //Cantidad de la UA es mayor al saldo
      //Editar cantidad de la UA
      this.presentToast("Cantidad de UA no puede ser mayor al saldo");
    } else {
      //Registrar cantidad de la UA
      debugger;
      // Registrar UA
      let objUA = {
        'UA_CodBarra': this.codeBar.trim(), //
        'Id_Tx': this.vRutaPickingPage.Id_Tx,// "A20181980018",
        'Id_Producto': this.pickingProducto.IdProducto,// 80 ,
        'Id_UM': this.pickingProducto.IdUMBase,  //
        'Cantidad': this.Textcantidad,  //
        'FlagAnulado': false, //
        'Id_TerminalRF': this.sGlobal.Id_TerminalRF,  //
        'Item': this.pickingProducto.Item,  //
        'Id_Almacen': this.sGlobal.Id_Almacen,  //
        'UsuarioRegistro': this.sGlobal.userName  //
      };
      this.sPicking.RegistarEliminarUA(objUA).then(result => {
        debugger;
        this.resultRegistrar = result;
        if (this.resultRegistrar.errNumber == 0) {
          this.isBgRed = false;
          this.isBgYellow = false;
          this.isBgGreen = true;
          this.codeBar = "";
          this.Textcantidad = "";
        } else {
          this.isBgRed = true;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.Textcantidad = "";
          this.presentToast(this.resultRegistrar.message);
        }
        //Actulizar los campos cant. atendida y saldo
        this.getPickingProductoUpdate(this.vRutaPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);

        setTimeout(() => {
          this.txtCodBarraUARef.setFocus();
        }, (500));

      });
    }
  }

  keydown(event: any) {
    debugger;
    const MY_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(MY_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }

  keyup(event: any) {
    debugger;
    const MY_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(MY_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        this.sPicking.getValidarUAPicking(this.vRutaPickingPage.Id_Tx, this.codeBar.trim(), this.pickingProducto.IdProducto, this.pickingProducto.LoteProducto, this.pickingProducto.IdUbicacion).then((result) => {
          debugger;
          this.UAPicking = result;
          if (this.UAPicking.errNumber == 0) {
            this.isbgWhite = false;
            this.isBgRed = false;
            this.isBgYellow = true;
            this.isBgGreen = false;
            //Mostrar cantidad de la UA
            this.Textcantidad = this.UAPicking.valor1;

            setTimeout(() => {
              this.txtCantidadUARef.setFocus();
              this.selectAll(this.txtCantidadUA);
            }, (500));

            // this.selectAll(this.txtCantidadUA);

            if (this.UAPicking.valor2 != 2) {
              //Bloquear campo cantidad
              this.Txtcantidadisenabled = false;
              if (this.UAPicking.valor2 == 1) {
                //Registrar cantidad de la UA automaticamente
                this.registarUA();
              }
            }
          } else {
            this.presentToast(this.UAPicking.message);
            //this.presentToast("UA no pertenece a la ubicación");
            this.isbgWhite = false;
            this.isBgRed = true;
            this.isBgYellow = false;
            this.isBgGreen = false;
            this.codeBar = "";
            this.Textcantidad = "";
            setTimeout(() => {
              this.txtCodBarraUARef.setFocus();
            }, (500));
          }
        }, (err) => {
          console.log('E-Verficar UA', err);
        });
      } else {
        this.presentToast("Ingresar código de UA");
        this.isbgWhite = false;
        this.isBgRed = true;
        this.isBgYellow = false;
        this.isBgGreen = false;
        this.codeBar = "";
        this.Textcantidad = "";
        setTimeout(() => {
          this.txtCodBarraUARef.setFocus();
        }, (500));
      }
    } else {
      this.presentToast("Ingresar código de UA");
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.codeBar = "";
      this.Textcantidad = "";
      setTimeout(() => {
        this.txtCodBarraUARef.setFocus();
      }, (500));
    }
  }

  ValidarSiguienteProducto() {
    // for (var i = 0; i < this.listaTempPickingProducto.length; i++) {
    //   if (this.listaTempPickingProducto[i].FlagTransito == false) {
    //     //Hacer nueva lista temp.
    //     this.listProductoConRuta.push(this.listaTempPickingProducto[i])
    //   }
    // }

    let saldoTotal = this.listaTempPickingProducto.reduce(function (prev, cur) {
      return prev + cur.Saldo;
    }, 0); //Obtener el saldo total de los productos.

    if (this.contador == this.listaTempPickingProducto.length)  //Si el saldo total de los productos con ruta se completa 
    {
      this.valor = 1;
      if (saldoTotal == 0) {
        //se sugiere cerrar picking
        debugger;
        this.presentAlertConfirm("Orden de picking completa. ¿Desea cerrar picking?”.").then((result) => {
          if (result) {
            // Ir a pagina cerrar picking
            this.goCerrarPickingPage();
          } else {
            this.goDetallePickingPage2();
          }
        })
      } else {
        this.presentAlertConfirm("Orden de picking incompleta. ¿Desea cerrar picking?”.").then((result) => {
          if (result) {
            // Ir a pagina cerrar picking
            this.goCerrarPickingPage();
          } else {
            this.goDetallePickingPage2();
          }
        })
      }
    } else {//Si el saldo total de los productos con ruta se No completa
      debugger;
      if (this.pickingProducto.Saldo == 0) {//Si Item completado
        //-Si el siguiente producto tiene la misma ubicacion 
        //this.presentAlert("Item completado");
        if (this.posicion + 1 < this.listaTempPickingProducto.length) {
          debugger;
          var codigo_Ubi = this.listaTempPickingProducto[this.posicion + 1].CodBarraUbi;
          var transito = this.listaTempPickingProducto[this.posicion + 1].FlagTransito;

          if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
            //avanzar al siguiente producto en la misma pantalla
            this.presentAlert("Item completado");
            this.total = this.listaTempPickingProducto.length;
            this.posicion = this.posicion + 1;
            if (this.posicion < this.listaTempPickingProducto.length) {
              this.contador = this.contador + 1;
              this.pickingProducto = this.listaTempPickingProducto[this.posicion];
              this.Backisenabled = true;
            }
            if (this.contador == this.listaTempPickingProducto.length) {
              this.Nextisenabled = true;
            }
          } else {
            //volver a ruta picking y ubicarse en la posicion siguiente...          
            this.presentAlert("Item completado").then((resultAlert2) => {

              if(transito==false){
                this.goRutaPickingPage();
              }else{
                this.goDetallePickingPage2();
              }              
            })
          }
        } else {

        }
      }
    }
    //this.valorRegistrar=0;
  }



  NextRutaPicking() {
    debugger;
    if (this.pickingProducto.Saldo > 0) {
      this.presentAlertConfirm("¿Desea generar una orden de reabastecimiento?”.").then((result) => {
        if (result) {
          this.goReabastecimientoPage();
        } else {
          if (this.posicion + 1 < this.listaTempPickingProducto.length) {
            var codigo_Ubi = this.listaTempPickingProducto[this.posicion + 1].CodBarraUbi;
            if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
              this.NextRuta();
              this.isbgWhite = true;
              this.isBgRed = false;
              this.isBgYellow = false;
              this.isBgGreen = false;
              this.codeBar = "";
              this.Textcantidad = "";
              setTimeout(() => {
                this.txtCodBarraUARef.setFocus();
              }, (500));
            } else {
              debugger;
              this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking + 1;
              this.goRutaPickingPage();
            }
          }
        }
      })
    } else {
      if (this.posicion + 1 < this.listaTempPickingProducto.length) {
        var codigo_Ubi = this.listaTempPickingProducto[this.posicion + 1].CodBarraUbi;
        if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
          this.NextRuta();
          this.isbgWhite = true;
          this.isBgRed = false;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.Textcantidad = "";
          setTimeout(() => {
            this.txtCodBarraUARef.setFocus();
          }, (500));
        } else {
          debugger;
          this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking + 1;
          this.goRutaPickingPage();
        }
      }
    }
  }

  NextRuta() {
    this.total = this.listaTempPickingProducto.length;
    this.posicion = this.posicion + 1;
    if (this.posicion < this.listaTempPickingProducto.length) {
      this.contador = this.contador + 1;
      this.pickingProducto = this.listaTempPickingProducto[this.posicion];
      this.Backisenabled = true;
    }
    if (this.contador == this.listaTempPickingProducto.length) {
      this.Nextisenabled = true;
    }
  }

  BackRutaPicking() {
    debugger;
    if (this.pickingProducto.Saldo > 0) {
      this.presentAlertConfirm("¿Desea generar una orden de reabastecimiento?”.").then((result) => {
        if (result) {
          this.goReabastecimientoPage();
        } else {
          if (this.posicion - 1 >= 0) {
            var codigo_Ubi = this.listaTempPickingProducto[this.posicion - 1].CodBarraUbi;
            if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
              this.BackRuta();
              this.isbgWhite = true;
              this.isBgRed = false;
              this.isBgYellow = false;
              this.isBgGreen = false;
              this.codeBar = "";
              this.Textcantidad = "";
              setTimeout(() => {
                this.txtCodBarraUARef.setFocus();
              }, (500));
            } else {
              this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking - 1;
              this.goRutaPickingPage();
            }
          }
        }
      });
    } else {
      if (this.posicion - 1 >= 0) {
        var codigo_Ubi = this.listaTempPickingProducto[this.posicion - 1].CodBarraUbi;
        if (this.pickingProducto.CodBarraUbi == codigo_Ubi) {
          this.BackRuta();
          this.isbgWhite = true;
          this.isBgRed = false;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.Textcantidad = "";
          setTimeout(() => {
            this.txtCodBarraUARef.setFocus();
          }, (500));
        } else {
          this.pickingProducto.idRutaPicking = this.listaTempPickingProducto[this.posicion].idRutaPicking - 1;
          this.goRutaPickingPage();
        }
      }
    }
  }

  BackRuta() {
    this.total = this.listaTempPickingProducto.length;
    this.posicion = this.posicion - 1;
    if (this.posicion >= 0) {
      this.contador = this.contador - 1;
      this.pickingProducto = this.listaTempPickingProducto[this.posicion];
      this.Nextisenabled = false;
    }
    if (this.contador == 1) {
      this.Backisenabled = false;
    }
  }

  showModalIncidencia2(){ //data
    debugger;
    let modalIncidencia = this.modalCtrl.create(IncidenciaPage); //{ 'pIncidencia' : obj});
    modalIncidencia.onDidDismiss(data =>{
      if(data.response == 200){
        this.navCtrl.pop();
      }
    });
    modalIncidencia.present();
  }

  showModalAdministrarUaPage(){
    debugger;
    let obj = {
      'page': "modal",
    };
    let modalIncidencia = this.modalCtrl.create(AdministrarUaPage, { 'data': obj });
    modalIncidencia.onDidDismiss(data => {
      debugger;
        if(data.response == 200){
        this.navCtrl.pop();
      }
      console.log("datos", data);
    });
    modalIncidencia.present();
  }

  goConsultarUbicacionPage() {
    this.navCtrl.push(ConsultarUbicacionPage);
  }

  goMenu() {
    debugger;
    this.navCtrl.push(MainMenuPage);
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverRutaPickingPage, {
      // contentEle: this.content.nativeElement,
      // textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss(popoverData => {
      if (popoverData == 1) {
        this.showModalIncidencia2();
      } else if (popoverData == 2) {
        debugger;
        this.showModalAdministrarUaPage();
      } else if (popoverData == 3) {
        debugger;
        this.goConsultarUbicacionPage();
      } else if (popoverData == 4) {
        debugger;
        this.goMenu();
      } else if (popoverData == 5) {
        debugger;
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
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

  goRutaPickingPage() {
    debugger;
    this.vPickingXProducto = {
      'Id_Page_Anterior': 1,
      'idRutaPicking': this.pickingProducto.idRutaPicking,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vPickingXProducto
    });
  }

  goRutaPickingPageUpdate() {
    this.vPickingXProducto = {

      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vPickingXProducto
    });
  }

  goCerrarPickingPage() {
    let saldoTotalPicking = this.listaTempPickingProducto.reduce(function (prev, cur) {
      return prev + cur.Saldo;
    }, 0);
    debugger;
    this.vPickingXProducto = {
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'Saldo': saldoTotalPicking
    };
    this.navCtrl.push(CierrePickingPage, {
      data: this.vPickingXProducto
    });
  }

  goDetallePickingPage() {
    debugger;
    this.vPickingXProducto = {
      'Id_Page_Anterior': 5,
      'idRutaPicking': this.listaTempPickingProducto[this.posicion].idRutaPicking,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };

    this.navCtrl.push(DetallePickingPage, {
      data: this.vPickingXProducto
    });
  }

  goDetallePickingPage2() {
    debugger;
    this.vPickingXProducto = {
      'Id_Page_Anterior': 1,
      'idRutaPicking': this.listaTempPickingProducto[this.posicion].idRutaPicking,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };

    this.navCtrl.push(DetallePickingPage, {
      data: this.vPickingXProducto
    });
  }

  goDetallePorProductoPage(): void {
    debugger;
    this.vPickingXProducto = {
      'Id_Page_Anterior': 5,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'CodigoProducto': this.pickingProducto.CodigoProducto,
      'Producto': this.pickingProducto.Producto,
      'IdProducto': this.pickingProducto.IdProducto,
      'Item': this.pickingProducto.Item,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona,
      'idRutaPicking': this.listaTempPickingProducto[this.posicion].idRutaPicking,
    };

    this.navCtrl.push(DetallePorProductoPage, {
      data: this.vPickingXProducto
    });
    //this.navCtrl.push(DetallePorProductoPage);
  }

  goReabastecimientoPage(): void {
    debugger;
    this.vPickingXProducto = {
      'Sector': this.pickingProducto.Sector,
      'Pasillo': this.pickingProducto.Pasillo,
      'Fila': this.pickingProducto.Fila,
      'Columna': this.pickingProducto.Columna,
      'Nivel': this.pickingProducto.Nivel,
      'Posicion': this.pickingProducto.Posicion,
      'IdProducto': this.pickingProducto.IdProducto,
      'IdUbicacion': this.pickingProducto.IdUbicacion
      //'Id_TerminalRF': this.sGlobal.Id_TerminalRF
    };
    this.navCtrl.push(ReabastecimientoPage, {
      data: this.vPickingXProducto
    });
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  ionViewDidLoad() {

    setTimeout(() => {
      this.txtCodBarraUARef.setFocus();
    }, (500));

    this.navBar.backButtonClick = (e: UIEvent) => {
      // todo something
      debugger;
      // // if (this.vRutaPickingPage.idRutaPicking) {
      // //   this.goRutaPickingPage();
      // // } 
      // this.goRutaPickingPage();
      // // else {
      // //   this.navCtrl.pop();
      // // }

      if(this.valor == 0){
        this.goRutaPickingPage();
      }else{
        this.goDetallePickingPage2();
      }
    }
    console.log('ionViewDidLoad PickingPorProductoPage');
  }

}
