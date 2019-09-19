import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ReubicacionDestinoPage } from '../../almacenaje/reubicacion-destino/reubicacion-destino'
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { AlmacenajePage } from '../../almacenaje/almacenaje';

/**
 * Generated class for the ReubicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reubicacion',
  templateUrl: 'reubicacion.html',
})
export class ReubicacionPage {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtPalletUa') txtPalletUaRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;
  @ViewChild('txtPalletUa', { read: ElementRef }) private txtPalletUa: ElementRef;
  codeBar: string;
  codeBar_Bk: string;
  codePalletUA: string;
  resultUbicacion: any;
  resultPalletUA: any;
  listAuxResultPalletUA: any = [];
  Fila: any;
  Columna: any;
  Nivel: any;
  Posicion: any;
  txtPalletUaisenabled: boolean = false;
  rowCount: any = 0;
  vReubicacionDestinoPage: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider, public sAlmacenaje: AlmacenajeServiceProvider) {
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if (this.codeBar.length == 14) {
          if (!this.codeBar_Bk) {
            debugger;
            this.codeBar_Bk = this.codeBar.trim();
          }
          if (this.codeBar_Bk != this.codeBar.trim()) {
            debugger;
            //Preguntar si desea cambiar de num de ubicacion
            this.presentAlertConfirm("¿Desea cambiar el código de ubicación?”.").then((resultAlert3) => {
              if (resultAlert3) {
                this.Fila = "";
                this.Columna = "";
                this.Nivel = "";
                this.Posicion = "";
                this.codePalletUA = "";
                this.txtPalletUaisenabled = false;
                this.resultPalletUA = [];
                this.listAuxResultPalletUA = [];
                this.rowCount = this.resultPalletUA.length;
                setTimeout(() => {
                  //this.txtCodUbicacionRef.setFocus();
                  this.selectAll(this.txtCodUbicacion);
                }, (500));
                this.codeBar_Bk = this.codeBar.trim();
                this.ListarUbicacionXCodigoBarra();
              }
            })
          } else {
            this.codeBar_Bk = this.codeBar.trim();
            this.ListarUbicacionXCodigoBarra();
          }
        } else {
          this.presentToast("El código de ubicación debe tener 14 dígitos.");
        }
      }
      else {
        this.presentToast("Ingrese código de ubicación");
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
    }
    setTimeout(() => {
      //this.txtCodUbicacionRef.setFocus();
      this.selectAll(this.txtCodUbicacion);
    }, (500));
  }

  ListarUbicacionXCodigoBarra() {
    this.sAlmacenaje.getListarUbicacionXCodigoBarra(this.codeBar, this.sGlobal.Id_Almacen).then((result) => {
      debugger;
      this.resultUbicacion = result;
      if (this.resultUbicacion.length > 0) {
        this.Fila = this.resultUbicacion[0].Fila;
        this.Columna = this.resultUbicacion[0].Columna;
        this.Nivel = this.resultUbicacion[0].Nivel;
        this.Posicion = this.resultUbicacion[0].Posicion;
        this.txtPalletUaisenabled = true;
        setTimeout(() => {
          //this.txtPalletUaRef.setFocus();
          this.selectAll(this.txtPalletUa);
        }, (500));
      } else {
        //Mensaje la ubicacion no exiset
        this.presentAlert("Ubicación no existe.").then((resultAlert) => {
          if (resultAlert) {
            //select y focus en ubicaicon origen
            setTimeout(() => {
              //this.txtCodUbicacionRef.setFocus();
              this.selectAll(this.txtCodUbicacion);
            }, (500));
          }
        })
      }
    }, err => {
      console.log('E-getListarUbicacionXCodigoBarra', err);
    });
  }

  validarPalletUA() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if (this.codePalletUA) {
          if (this.codePalletUA.trim() != "") {
            if (this.codePalletUA.length == 12) {
              this.sAlmacenaje.getValidarExisteUAUbicada(this.codePalletUA, "", this.resultUbicacion[0].Id_Ubicacion).then((result) => {
                debugger;
                this.resultPalletUA = result;
                //this.rowCount = this.resultPalletUA.length;
                if (this.resultPalletUA.length > 0) {
                  if (this.listAuxResultPalletUA.length == 0) {
                    for (var i = 0; i < this.resultPalletUA.length; i++) {
                      var obj = {
                        'Cantidad': result[i].Cantidad,
                        'CodigoProducto': result[i].CodigoProducto,
                        'FlagAveriado': result[i].FlagAveriado,
                        'FlagDisponible': result[i].FlagDisponible,
                        'Id_Marca': result[i].Id_Marca,
                        'Id_Producto': result[i].Id_Producto,
                        'Id_UM': result[i].Id_UM,
                        'LoteLab': result[i].LoteLab,
                        'LotePT': result[i].LotePT,
                        'NombreProducto': result[i].NombreProducto,
                        'UA_CodBarra': result[i].UA_CodBarra,
                        'UM': result[i].UM
                      };
                      this.listAuxResultPalletUA.push(obj);
                    }
                  } else {
                    for (var i = 0; i < this.resultPalletUA.length; i++) {
                      var resultPalletUA = false;
                      var UA = result[i].UA_CodBarra;
                      var IdProducto = result[i].Id_Producto;
                      for (var j = 0; j < this.listAuxResultPalletUA.length; j++) {
                        if (UA == this.listAuxResultPalletUA[j].UA_CodBarra) { //Si no se encuentra en la lista agregar elemento a la lista
                          resultPalletUA = true;
                        }
                        if (IdProducto != this.listAuxResultPalletUA[0].Id_Producto) {
                          resultPalletUA = true;
                        }
                      }
                      if (!resultPalletUA) {
                        var obj = {
                          'Cantidad': result[i].Cantidad,
                          'CodigoProducto': result[i].CodigoProducto,
                          'FlagAveriado': result[i].FlagAveriado,
                          'FlagDisponible': result[i].FlagDisponible,
                          'Id_Marca': result[i].Id_Marca,
                          'Id_Producto': result[i].Id_Producto,
                          'Id_UM': result[i].Id_UM,
                          'LoteLab': result[i].LoteLab,
                          'LotePT': result[i].LotePT,
                          'NombreProducto': result[i].NombreProducto,
                          'UA_CodBarra': result[i].UA_CodBarra,
                          'UM': result[i].UM
                        };
                        this.listAuxResultPalletUA.push(obj);
                      } else {
                        this.presentAlert("El código de Pallet/UA ya se encuentra en la lista.").then((resultAlert) => {
                          if (resultAlert) {
                            setTimeout(() => {
                              this.codePalletUA = "";
                              //this.txtPalletUaRef.setFocus();
                              this.selectAll(this.txtPalletUa);
                            }, (500));
                          }
                        })
                      }
                    }
                  }
                  this.rowCount = this.listAuxResultPalletUA.length;
                  // this.codeBar = "";
                  setTimeout(() => {
                    this.codePalletUA = "";
                    //this.txtPalletUaRef.setFocus();
                    this.selectAll(this.txtPalletUa);
                  }, (500));

                } else {
                  this.presentAlert("UA/Pallet no pertenece a la ubicación.").then((resultAlert) => {
                    if (resultAlert) {
                      setTimeout(() => {
                        //this.txtPalletUaRef.setFocus();
                        this.selectAll(this.txtPalletUa);
                      }, (500));
                    }
                  })
                }
              }, err => {
                console.log('E-getListarUbicacionXCodigoBarra', err);
              });
            } else {
              this.presentToast("El código Pallet/UA debe tener 12 dígitos.");
              setTimeout(() => {
                this.selectAll(this.txtPalletUa);
              }, (500));
            }
          }
          else {
            this.presentToast("Ingrese código de Pallet/UA");
            setTimeout(() => {
              //this.txtPalletUaRef.setFocus();
              this.selectAll(this.txtPalletUa);
            }, (500));
          }
        } else {
          this.presentToast("Ingrese código de Pallet/UA");
          setTimeout(() => {
            //this.txtPalletUaRef.setFocus();
            this.selectAll(this.txtPalletUa);
          }, (500));
        }
      } else {
        this.presentToast("Ingrese código de ubicación");
        setTimeout(() => {
          //this.txtCodUbicacionRef.setFocus();
          this.selectAll(this.txtCodUbicacion);
        }, (500));
      }
    } else {
      this.presentToast("Ingrese código de ubicación");
      setTimeout(() => {
        //this.txtCodUbicacionRef.setFocus();
        this.selectAll(this.txtCodUbicacion);
      }, (500));
    }
  }

  eliminarPalletUA(data) {
    debugger;
    this.presentAlertConfirm("¿Está seguro de eliminar el Pallet/UA?”.").then((result) => {
      if (result) {
        for (var j = 0; j < this.listAuxResultPalletUA.length; j++) {
          if (data.UA_CodBarra == this.listAuxResultPalletUA[j].UA_CodBarra) {
            this.listAuxResultPalletUA.splice(j, 1);
            this.rowCount = this.listAuxResultPalletUA.length;
          }
        }
      }
    })
  }

  limpiar() {
    this.codeBar = "";
    this.codeBar_Bk = "";
    this.Fila = "";
    this.Columna = "";
    this.Nivel = "";
    this.Posicion = "";
    this.codePalletUA = "";
    this.txtPalletUaisenabled = false;
    this.resultPalletUA = [];
    this.listAuxResultPalletUA = [];
    this.rowCount = this.resultPalletUA.length;
    setTimeout(() => {
      //this.txtCodUbicacionRef.setFocus();
      this.selectAll(this.txtCodUbicacion);
    }, (500));
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

  goReubicacionDestinoPage() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if (this.listAuxResultPalletUA.length > 0){
          var listUA = [];
              this.listAuxResultPalletUA.forEach(el => {
                listUA.push(el.UA_CodBarra);
              });

              let cantidadTotal = this.listAuxResultPalletUA.reduce(function (prev, cur) {
                return prev + cur.Cantidad;
              }, 0);

              this.vReubicacionDestinoPage = {
                'Codigo_Origen': this.codeBar_Bk,
                'Total_Pallet': this.rowCount,
                'Id_Producto': this.listAuxResultPalletUA[0].Id_Producto,
                'cantidadTotal': cantidadTotal,
                'listUA': listUA
              };
              this.navCtrl.push(ReubicacionDestinoPage, {
                data: this.vReubicacionDestinoPage
              });
        }else{
          if (this.codePalletUA) {
            if (this.codePalletUA.trim() != "") {
              this.presentToast("No ha agregado el código de Pallet/UA");
              setTimeout(() => {
                this.selectAll(this.txtPalletUa);
              }, (500));
            } else {
              this.presentToast("Ingrese código de Pallet/UA");
              setTimeout(() => {
                this.selectAll(this.txtPalletUa);
              }, (500));
            }
          } else {
            this.presentToast("Ingrese código de Pallet/UA");
            setTimeout(() => {
              this.selectAll(this.txtPalletUa);
            }, (500));
          }
        }        
      } else {
        this.presentToast("Ingrese código de ubicación origen.");
        setTimeout(() => {
          this.selectAll(this.txtCodUbicacion);
        }, (500));
      }
    } else {
      this.presentToast("Ingrese código de ubicación origen.");
      setTimeout(() => {
        this.selectAll(this.txtCodUbicacion);
      }, (500));
    }
  }

  ionViewDidLoad() {
    // this.navBar.backButtonClick = (e: UIEvent) => {
    //   this.navCtrl.push(AlmacenajePage);
    // }

    setTimeout(() => {
      this.selectAll(this.txtCodUbicacion);
      //this.txtCodUbicacionRef.setFocus();
    }, (500));
    console.log('ionViewDidLoad ReubicacionPage');
  }

  ionViewWillEnter() {
    this.limpiar();
  }


}
