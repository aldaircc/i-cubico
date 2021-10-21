import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ViewController, NavController, Platform, NavParams, ToastController, IonicFormInput, Button, PopoverController, ModalController, App, AlertController } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { isNullOrUndefined } from '../../../../node_modules/@swimlane/ngx-datatable/release/utils';
import { ReciboPage_04Page } from '../recibo-page-04/recibo-page-04';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PopoverReciboComponent } from '../../../components/popover-recibo/popover-recibo';
import { EtiquetadoPage_01Page } from '../../etiquetado/etiquetado-page-01/etiquetado-page-01';
import { ImpresoraPage } from '../../impresora/impresora';
import { IncidenciaPage } from '../../incidencia/incidencia';
import { HomePage } from '../../home/home';

/**
 * Generated class for the ReciboPage_03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo-page-03',
  templateUrl: 'recibo-page-03.html',
})
export class ReciboPage_03Page {

  vReciboPage02: any;
  codeBar: any = { 'Text': '', 'Tag': '' };  
  cantidadRec: number = 0;
  cantidadAve: number = 0;
  cantidadBulto: number = 0;
  cantidad: number = 0;
  isDisabledSave: boolean = true;
  bolUaValida: boolean = true;
  bolUa: boolean = false;
  isBgRed: boolean = false;
  isBgYellow: boolean = false;
  isBgGreen: boolean = false;

  valorpopoverGlobal: boolean = false
popoverGlobal: any;

  @ViewChild('iBtnSave') iBtnSave: Button;
  @ViewChild('iCodeBar', { read: ElementRef }) private iCodeBar: ElementRef;
  @ViewChild('iCantidadRecibida', { read: ElementRef }) private iCantidadRecibida: ElementRef;

  constructor(public app: App, public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public sRecibo: ReciboServiceProvider,
    public popoverCtrl: PopoverController, public modalCtrl: ModalController, public sGlobal: GlobalServiceProvider,
    public alertCtrl: AlertController, public viewCtrl: ViewController) {
      debugger;
    this.vReciboPage02 = navParams.get('dataPage02');
  }

  getUAsProducto(strId_Tx, intId_Producto, intItem): void {
    this.sRecibo.listarUAXProductoTx(strId_Tx, intId_Producto, intItem).then(result => {
      let res: any = result;
      this.cantidadBulto = res.length;
    });
  }

  selectAll(el: ElementRef, time) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(() => {
      nativeEl.select();
    }, time);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000            
    });

    toast.onDidDismiss(() => {      
      this.selectAll(this.iCodeBar, 100);
      this.codeBar.Text = "";
    });

    toast.present();
  }

  validarCodeBar() {    
    debugger;
    if (this.vReciboPage02.FlagSeriePT == true) {
  
      if (this.codeBar.Text.trim().length >= 6) {

        if (this.vReciboPage02.Id_TipoMovimiento === 0) {
          this.presentToast("Esta transacción no tiene tipo de movimiento");
          return;
        }

        if (this.vReciboPage02.Id_TipoMovimiento === 11 ||
          this.vReciboPage02.Id_TipoMovimiento === 13 ||
          this.vReciboPage02.Id_TipoMovimiento === 14) {
          this.sRecibo.validarReciboTransferenciaSerie(this.vReciboPage02.NumOrden, this.codeBar.Text,
            this.vReciboPage02.Item).then((result) => {
              debugger;
              let rpta: any = result;
              if (rpta.errNumber != 0) {
                this.isBgRed = true;
                this.isBgYellow = false;
                this.isDisabledSave = false;                
                this.bolUa = false;
                this.cantidadRec = 0;
                this.codeBar.Text = "";
                this.selectAll(this.iCodeBar, 500);
                this.presentToast(rpta.message);                
              } else {
                this.bolUa = true;
                this.isBgYellow = true;
                this.cantidad = 1;
                this.cantidadRec = this.cantidad;
                this.selectAll(this.iCantidadRecibida, 500);
                this.codeBar.Tag = this.codeBar.Text;
                if (this.vReciboPage02.bolAutomatic === true) {
                  this.saveTransaction();
                }                
              }
            }, (err) => {
              console.log('E-validarReciboTransferenciaSerie', err);
            });
        } else {
          this.sRecibo.validarReciboSerie(this.codeBar.Text, this.vReciboPage02.Id_Tx, this.vReciboPage02.Id_Producto).then(result => {
            let res: any = result;
            debugger;
            if (res.errNumber != 0) {
              this.codeBar.Text = "";
              this.cantidadRec = 0;
              this.bolUa = false;              
              this.isBgRed = true;
              this.isBgYellow = false;
              this.isBgGreen = false;
              this.selectAll(this.iCodeBar, 500);
              this.presentToast(res.message);
            } else {
              this.isBgRed = false;
              this.isBgYellow = true;
              this.cantidad = 1;
              this.cantidadRec = this.cantidad;
              this.selectAll(this.iCantidadRecibida, 500);
              this.bolUa = true;
              this.codeBar.Tag = this.codeBar.Text;
              if (this.vReciboPage02.bolAutomatic === true) {
                this.saveTransaction();
              }              
            }
          });
        }
        debugger;
        
      }    
      else{
        this.presentToast("Ingrese código de barras correcto");
        this.isBgRed = true;
        this.isBgYellow = false;
        this.isBgGreen = false;
        this.bolUa = false;
        this.codeBar.Tag = '';        
        this.cantidadAve = 0;
        this.cantidadRec = 0;
        this.selectAll(this.iCodeBar, 500);
      }        
    } else {
      debugger;
      if (this.vReciboPage02.Id_TipoMovimiento === 0) {
        this.presentToast('Esta transacción no tiene tipo de movimiento');
        return;
      }

      var ua: any;

      if (this.vReciboPage02.Id_TipoMovimiento == 11 ||
        this.vReciboPage02.Id_TipoMovimiento == 13 ||
        this.vReciboPage02.Id_TipoMovimiento == 14) {
        ua = {
          'Id_Tx': this.vReciboPage02.Id_Tx,
          'UA_CodBarra': this.codeBar.Text,
          'Id_Producto': this.vReciboPage02.Id_Producto,
          'Item': this.vReciboPage02.Item,
          'Id_Almacen': this.sGlobal.Id_Almacen
        };
        this.sRecibo.validarUAReciboTransferencia(ua).then((result) => {
          this.cantidad = 0;
          debugger;
          let rpta: any = result;
          if (rpta.errNumber === 0) {

            if (this.cantidad === 0) {
              this.cantidad = rpta.valor1;
            }

            this.cantidadRec = rpta.valor1;
            this.codeBar.Tag = this.codeBar.Text;
            this.selectAll(this.iCantidadRecibida, 500);
            this.isBgYellow = true;
            this.isBgRed = false;
            this.isBgGreen = false;
            this.bolUa = true;
            if (this.vReciboPage02.bolAutomatic === true) {
              this.saveTransaction();
            }

          } else if (rpta.errNumber === 1) {
            this.isBgRed = true;
            this.isBgYellow = false;
            this.isBgGreen = false;
            this.bolUa = false;
            this.selectAll(this.iCodeBar, 500);
            this.presentToast(rpta.message);
          } else if (rpta.errNumber === -1) {
            this.isBgRed = true;
            this.isBgYellow = false;
            this.isBgGreen = false;
            this.bolUa = false;
            this.presentToast(rpta.message);
            this.selectAll(this.iCodeBar, 500);
          } else {
            this.isBgRed = true;
            this.isBgYellow = false;
            this.isBgGreen = false;
            this.bolUa = false;
            this.presentToast(rpta.message);
            this.selectAll(this.iCodeBar, 500);
          }
        });

      } else {

        if (this.codeBar.Text.trim().length >= 12) {
          debugger;
          ua = {
            'UA_CodBarra': this.codeBar.Text,
            'Id_Producto': this.vReciboPage02.Id_Producto,
            'Item': this.vReciboPage02.Item
          }
          this.sRecibo.validarUARecibo(ua).then((result) => {
            this.cantidad = 0;
            this.selectAll(this.iCodeBar, 500);
            let rpta: any = result;
            debugger;
            if (rpta.errNumber === 0) {

              if (this.cantidad === 0) {
                this.cantidad = rpta.valor1;
              }

              this.isBgRed = false;
              this.isBgYellow = true;
              this.isBgGreen = false;
              this.bolUa = true;              
              this.cantidadRec = rpta.valor1;
              this.codeBar.Tag = this.codeBar.Text;
              this.selectAll(this.iCantidadRecibida, 500);

              if (this.vReciboPage02.bolAutomatic == true) {
                this.saveTransaction();
              }

            } else if (rpta.errNumber === 1) {
              this.isBgRed = true;
              this.isBgYellow = false;
              this.isBgGreen = false;
              this.codeBar.Tag = '';
              this.presentToast(rpta.message);
              this.bolUa = false;              
              this.cantidadAve = 0;
              this.cantidadRec = 0;
              this.selectAll(this.iCodeBar, 500);
            } else if (rpta.errNumber === -1) {
              this.codeBar.Tag = '';
              this.isBgRed = true;
              this.isBgYellow = false;
              this.isBgGreen = false;
              this.presentToast(rpta.message);
              this.bolUa = false;              
              this.cantidadAve = 0;
              this.cantidadRec = 0;
              this.selectAll(this.iCodeBar, 500);
            } else {
              this.isBgRed = true;
              this.isBgYellow = false;
              this.isBgGreen = false;
              this.presentToast(rpta.message);
              this.bolUa = false;              
              this.cantidadAve = 0;
              this.cantidadRec = 0;
              this.selectAll(this.iCodeBar, 500);
            }
          });
        }
        else {
          this.presentToast("Ingrese código de barras correcto");
          this.codeBar.Tag = '';
          this.isBgRed = true;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.bolUa = false;          
          this.cantidadAve = 0;
          this.cantidadRec = 0;
          this.selectAll(this.iCodeBar, 500);
        }
      }
    }  
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

  validarCamposIngreso() {
    debugger;
    var result: boolean = true;    
   
    if (this.bolUa == false) {
      alert('Debe validar o ingresar una UA correcta');
      result = false;
      this.selectAll(this.iCodeBar, 500);
      return result;
    }   

    if (this.isDisabledSave === false) {
      result = false;
      return result;
    }

    if (this.codeBar.Text.trim() == "") {
      this.presentToast('Ingrese el código de barras');
      this.selectAll(this.iCodeBar, 500);
      result = false;
      return result;
    }

    if (this.cantidadRec == 0) {
      this.presentToast("Ingrese la cantidad");
      this.selectAll(this.iCantidadRecibida, 500);
      result = false;
      return result;
    }

    // if (this.vReciboPage02.CantPedida < this.cantidadRec) {
    //   this.presentToast("Ingrese la cantidad");
    //   this.selectAll(this.iCantidadRecibida, 500);
    //   result = false;
    //   return result;
    // }

    if (!this.vReciboPage02.FlagSeriePT) {
      if (!(this.codeBar.Text.trim() == this.codeBar.Tag.trim())) {
        this.presentToast('La UA no es correcta');
        this.selectAll(this.iCantidadRecibida, 500);
        result = false;
        return result;
      }
    }

    if (this.vReciboPage02.Id_TipoMovimiento != 3) {
      if (this.codeBar.Text.trim() == "") {
        this.presentToast('Ingrese código de barras UA.');
        this.selectAll(this.iCodeBar, 500);
        result = false;
        return result;
      }
    }

    if (isNullOrUndefined(this.cantidadAve)) {
      this.cantidadAve = 0;
    }
   
    return result;
  }

  saveTransaction() {
    
    if (this.vReciboPage02.Saldo < this.cantidadRec) {     
      this.presentConfirmDialog('Confirmación', 'La cantidad ingresada es mayor al saldo, ¿Está seguro de continuar?').then(rpta => {
        if (rpta == true) {        
                    
          if (!this.validarCamposIngreso()) {
            debugger;              
            console.log('hay campos pendientes de llenar');
            return;
          }
            var objTxUbi = {
            'TipoUbicacion': 1,
            'Id_Producto': this.vReciboPage02.Id_Producto,
            'Id_Ubicacion_Origen': 0,
            'Id_Almacen': this.sGlobal.Id_Almacen,
            'Id_Tx': this.vReciboPage02.Id_Tx,
            'Prioridad': 10,
            'Observacion': ' from ionic ',
            'UsuarioModificacion': this.sGlobal.userName
            };

            this.vReciboPage02.TipoAlmacenaje = (this.vReciboPage02.TipoAlmacenaje == undefined) ? 0 : this.vReciboPage02.TipoAlmacenaje;
            this.sRecibo.registrarUATransito(objTxUbi).then((result) => {
              debugger;
              let rpta: any = result;
              var sumCantidad = this.cantidadRec + this.vReciboPage02.CantidadOperacion;

              if (this.cantidad != 0) {
                if (this.cantidad != this.cantidadRec) {
                  this.presentToast('Esta cantidad no corresponde');
                  this.selectAll(this.iCantidadRecibida, 500);
                  return;
                }
              }

              let objUA = {
                'UA_CodBarra': this.codeBar.Text,
                'Id_Tx': this.vReciboPage02.Id_Tx,
                'Id_Producto': this.vReciboPage02.Id_Producto,
                'LoteLab': this.vReciboPage02.LoteLab,
                'Serie': (this.vReciboPage02.FlagSeriePT === true) ? this.codeBar.Text : null,
                'FechaEmision': this.vReciboPage02.FechaEmision,
                'FechaVencimiento': this.vReciboPage02.FechaVencimiento,
                'Cantidad': this.cantidadRec,
                'Saldo': this.cantidadRec,
                'CantidadAveriada': this.cantidadAve,
                'Id_TerminalRF': this.sGlobal.Id_TerminalRF,
                'Item': this.vReciboPage02.Item,
                'Id_Ubicacion': 0,
                'Id_Tx_Ubi': (result === "") ? null : result,
                'Observacion': '',
                'UsuarioRegistro': this.sGlobal.userName,
                'Id_Almacen': this.sGlobal.Id_Almacen,
                'Id_UM': this.vReciboPage02.Id_UM,
                'FlagAnulado': false
              };
              debugger;
              if (this.vReciboPage02.Id_TipoMovimiento == 0) {
                this.presentToast('Esta transacción no tiene tipo de movimiento');
                return;
              }

              if (this.vReciboPage02.Id_TipoMovimiento === 11 ||
                this.vReciboPage02.Id_TipoMovimiento === 13 ||
                this.vReciboPage02.Id_TipoMovimiento === 14) {
                this.sRecibo.registrarUATransferencia(objUA).then(result => {
                  debugger;
                  this.evaluarResultado(result);
                });
              } else {
                this.sRecibo.registrarUA(objUA).then(result => {
                  debugger;
                  this.evaluarResultado(result);
                });
              }
            });
         
      
        } else {                
          this.selectAll(this.iCantidadRecibida, 500);       
          return true;
        }
      });   
    }
    else{
      
      if (!this.validarCamposIngreso()) {
        debugger;           
        console.log('hay campos pendientes de llenar');
        return;
      }   

      var objTxUbi = {
        'TipoUbicacion': 1,
        'Id_Producto': this.vReciboPage02.Id_Producto,
        'Id_Ubicacion_Origen': 0,
        'Id_Almacen': this.sGlobal.Id_Almacen,
        'Id_Tx': this.vReciboPage02.Id_Tx,
        'Prioridad': 10,
        'Observacion': ' from ionic ',
        'UsuarioModificacion': this.sGlobal.userName
      };

      this.vReciboPage02.TipoAlmacenaje = (this.vReciboPage02.TipoAlmacenaje == undefined) ? 0 : this.vReciboPage02.TipoAlmacenaje;
      this.sRecibo.registrarUATransito(objTxUbi).then((result) => {
        debugger;
        let rpta: any = result;
        var sumCantidad = this.cantidadRec + this.vReciboPage02.CantidadOperacion;

        if (this.cantidad != 0) {
          if (this.cantidad != this.cantidadRec) {
            this.presentToast('Esta cantidad no corresponde');
            this.selectAll(this.iCantidadRecibida, 500);
            return;
          }
        }

        let objUA = {
          'UA_CodBarra': this.codeBar.Text,
          'Id_Tx': this.vReciboPage02.Id_Tx,
          'Id_Producto': this.vReciboPage02.Id_Producto,
          'LoteLab': this.vReciboPage02.LoteLab,
          'Serie': (this.vReciboPage02.FlagSeriePT === true) ? this.codeBar.Text : null,
          'FechaEmision': this.vReciboPage02.FechaEmision,
          'FechaVencimiento': this.vReciboPage02.FechaVencimiento,
          'Cantidad': this.cantidadRec,
          'Saldo': this.cantidadRec,
          'CantidadAveriada': this.cantidadAve,
          'Id_TerminalRF': this.sGlobal.Id_TerminalRF,
          'Item': this.vReciboPage02.Item,
          'Id_Ubicacion': 0,
          'Id_Tx_Ubi': (result === "") ? null : result,
          'Observacion': '',
          'UsuarioRegistro': this.sGlobal.userName,
          'Id_Almacen': this.sGlobal.Id_Almacen,
          'Id_UM': this.vReciboPage02.Id_UM,
          'FlagAnulado': false
        };
        debugger;
        if (this.vReciboPage02.Id_TipoMovimiento == 0) {
          this.presentToast('Esta transacción no tiene tipo de movimiento');
          return;
        }

        if (this.vReciboPage02.Id_TipoMovimiento === 11 ||
          this.vReciboPage02.Id_TipoMovimiento === 13 ||
          this.vReciboPage02.Id_TipoMovimiento === 14) {
          this.sRecibo.registrarUATransferencia(objUA).then(result => {
            debugger;
            this.evaluarResultado(result);
          });
        } else {
          this.sRecibo.registrarUA(objUA).then(result => {
            debugger;
            this.evaluarResultado(result);
          });
        }
      });     
    }
  }

  evaluarResultado(message) {
    if (message.errNumber === 0) {
      let valor1 = parseFloat(message.valor1);
      this.cantidadBulto++;
      this.vReciboPage02.Saldo = this.vReciboPage02.Saldo - valor1;
      let saldo = this.vReciboPage02.Saldo;
      this.vReciboPage02.CantidadOperacion += valor1;
      this.isBgRed = false;
      this.isBgYellow = false;
      this.isBgGreen = true;
      this.selectAll(this.iCodeBar, 500);
      // this.bolUaValida = false;
      this.cantidadAve = 0;
      this.cantidadRec = 0;
      this.codeBar.Text = "";
      this.codeBar.Tag = "";

      if (saldo == 0) {
        this.presentToast('Producto completo');
        this.selectAll(this.iCodeBar, 500);
        this.codeBar.Text = "";
      } else {
        this.presentToast('Registro exitoso');
        this.selectAll(this.iCodeBar, 500);
        this.codeBar.Text = "";
      }
    } else if (message.errNumber == 1) {
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.presentToast(message.message);
      this.selectAll(this.iCodeBar, 500);
    } else if (message.errNumber == -1) {
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.presentToast(message.message);
      this.selectAll(this.iCodeBar, 500);
    } else {
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.presentToast('Operación fallida, intente otra vez');
      this.selectAll(this.iCodeBar, 500);
    }
  }

  callBackReciboPage04 = (values) => {
    return new Promise((resolve, reject) => {
      if (values.wasDeleted == true) {
        this.vReciboPage02.Saldo = values.saldo;
        this.vReciboPage02.CantidadOperacion = this.vReciboPage02.CantPedida - values.saldo;
      }
      
    });
  }

  goToReciboPage04() {
    debugger;
    let obj = {
      "Id_Tx": this.vReciboPage02.Id_Tx,
      "NumOrden": this.vReciboPage02.NumOrden,
      "Codigo": this.vReciboPage02.Codigo,
      "Articulo": this.vReciboPage02.Descripcion,
      "Id_Articulo": this.vReciboPage02.Id_Producto,
      "UM": this.vReciboPage02.UM,
      "Id_UM": this.vReciboPage02.Id_UM,
      "Fecha_Emi": this.vReciboPage02.Fecha_Emi,
      "Fecha_Venci": this.vReciboPage02.Fecha_Venci,
      "Lote": this.vReciboPage02.Lote,
      "CantPedida": this.vReciboPage02.CantPedida,
      "CantRecib": this.vReciboPage02.CantidadOperacion,
      "Saldo": this.vReciboPage02.Saldo,
      "Item": this.vReciboPage02.Item,
      "Factor": this.vReciboPage02.Factor,
      "FlagSeriePT": this.vReciboPage02.FlagSeriePT,
      "Id_TipoMovimiento": this.vReciboPage02.Id_TipoMovimiento,
      "bolAutomatic": this.vReciboPage02.bolAutomatic,
      "currentSaldo": this.vReciboPage02.Saldo,
      "Cuenta": this.vReciboPage02.Cuenta
    };

    this.navCtrl.push(ReciboPage_04Page, {
      dataPage03: obj,
      callBackReciboPage04: this.callBackReciboPage04
    });
  }

  presentReciboPopover(myEvent) {
    this.valorpopoverGlobal = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverReciboComponent, { 'page': 13 });
    this.popoverGlobal.present({
      ev: myEvent
    });

    this.popoverGlobal.onDidDismiss(popoverData => {
      this.valorpopoverGlobal = false;
      if (popoverData == 1) {
        console.log('data para imprimir', this.vReciboPage02);
        this.navigateToEtqCajaLpn(this.vReciboPage02);
      } else if (popoverData == 2) {
        if (this.vReciboPage02.CantidadPedida != this.vReciboPage02.Saldo) {
          this.showModalIncidencia(this.vReciboPage02);
        } else {
          this.presentAlert("No puede registrar incidencia de una transacción que no fue trabajada");
        }
      } else if (popoverData == 3) {
        this.showModalImpresora();
      } else if (popoverData == 4) {
        this.presentAlertConfirm("¿Estás seguro que deseas cerrar sesión?").then((result) => {
          if (result) {
            this.navCtrl.pop();
            var nav = this.app.getRootNav();
            nav.setRoot(HomePage);
          }
        })
      } else if (popoverData == 5) {
        this.goToReciboPage04();
      }
    });
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


  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  showModalIncidencia(data) {
    debugger;
    let obj = {
      'Id_Tx': data.Id_Tx,
      'FlagPausa': data.FlagPausa,
      'Cliente': data.Cliente,
      'Id_Cliente': data.Id_Cliente,
      'Proveedor': data.Proveedor,
      'Id_TipoMovimiento': data.Id_TipoMovimiento,
      'Origen': 'RP02',
      'id_Modulo': 1
    };

    let modalIncidencia = this.modalCtrl.create(IncidenciaPage, { 'pIncidencia': obj });
    modalIncidencia.onDidDismiss(data => {
      if (data.response == 200) {
        debugger;
        this.navCtrl.getViews().forEach(item => {
          if (item.name == 'ReciboPage') {
            this.navCtrl.popTo(item);
          }
        });
      }
    });
    modalIncidencia.present();
  }

  navigateToEtqCajaLpn(data) {
    debugger;
    let objEtq = {
      "LoteLab": data.Lote,
      "Id_Producto": data.Id_Producto,
      "Id_UM": data.Id_UM,
      "CantidadPedida": data.CantidadPedida,
      "CantidadOperacion": data.CantidadOperacion,
      "Codigo": data.Codigo,
      "Articulo": data.Articulo,
      "UM": data.UM,
      "Cliente": data.Cliente,
      "UM_Base": data.UM_Base,
      "TipoAlmacenaje": data.TipoAlmacenaje,
      "Item": data.Item,
      "Acceso": 0,
      "NroDoc": data.NroDoc,
      "FecEmi": data.FecEmi,
      "FecVen": data.FecVen,
      "FlagSerie": data.FlagSerie,
      "FlagLote": data.FlagLote,
      "CondicionAlmac": data.CondicionAlmac,
      "Condicion": data.Condicion,
      "Id_Condicion": data.Id_Condicion,
      "Id_Cliente": data.Id_Cliente,
      "idTipoMovimiento": data.idTipoMovimiento,
      "IdCuentaLPN": data.IdCuentaLPN,
      "Id_SubAlmacen": data.Id_SubAlmacen,
      "Saldo": data.Saldo,
      "Factor": data.Factor,
      "page": true
    }

    let etqModal = this.modalCtrl.create(EtiquetadoPage_01Page, { vEtq: objEtq });
    etqModal.onDidDismiss(data => {
      console.log("Data retornada del modal", data);
    });
    etqModal.present();
  }

  ionViewWillEnter() {
    this.selectAll(this.iCodeBar, 500);
    this.getUAsProducto(this.vReciboPage02.Id_Tx, this.vReciboPage02.Id_Producto, this.vReciboPage02.Item);

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

  ionViewDidLoad() {
  }
}