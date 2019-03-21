import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { ImpresoraPage } from '../../impresora/impresora'
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PickingPage } from '../../picking/picking';

import { IncidenciaPage } from '../../incidencia/incidencia';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua'
import { ConsultarUbicacionPage } from '../../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MainMenuPage } from '../../main-menu/main-menu'
import { HomePage } from '../../home/home';

import { EtiquetadoServiceProvider } from '../../../providers/etiquetado-service/etiquetado-service';

/**
 * Generated class for the CierrePickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cierre-picking',
  templateUrl: 'cierre-picking.html',
})
export class CierrePickingPage {
  @ViewChild('txtCodMuelle') txtCodMuelleRef;

  vRutaPickingPage: any = [];
  codeBar: string;

  listNombreMuelleXAlmacen: any = [];
  resultMuelleXAlmacen: any = [];

  resultCierre: any = [];

  Aceptarisenabled: boolean = false;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public sGlobal: GlobalServiceProvider, public sEtq: EtiquetadoServiceProvider) {
    this.vRutaPickingPage = navParams.get('data');
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

  ontxtCodMuelleChange() {
    this.resultMuelleXAlmacen = [];
    this.Aceptarisenabled = false;
  }


  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        this.sPicking.getMuelleXAlmacen(2, this.codeBar.trim()).then((result) => {
          debugger;
          this.listNombreMuelleXAlmacen = result;
          if (this.listNombreMuelleXAlmacen.length > 0) {
            this.resultMuelleXAlmacen = result[0];
            this.Aceptarisenabled = true;
            console.log('Datos Muelle por almacen', this.listNombreMuelleXAlmacen);
          } else {
            this.resultMuelleXAlmacen = [];
            this.Aceptarisenabled = false;
            //this.presentAlert("Código de barras muelle no es correcto");
            this.codeBar = "";

            this.presentAlert("¿Código de barras muelle no es correcto”.").then((resultAlert3) => {
              if (resultAlert3) {
                // Mostrar lista de impresoras
                setTimeout(() => {
                  this.txtCodMuelleRef.setFocus();
                }, (500));
              }
            })
            console.log('No se encontrarón datos.', this.listNombreMuelleXAlmacen);
          }
        }, (err) => {
          this.Aceptarisenabled = false;
          console.log('E-Muelle por almacen', err);
        });
      } else {
        this.Aceptarisenabled = false;
        this.presentToast("Ingrese código de muelle");
        setTimeout(() => {
          this.txtCodMuelleRef.setFocus();
        }, (500));
      }
    } else {
      this.Aceptarisenabled = false;
      this.presentToast("Ingrese código de muelle");
      setTimeout(() => {
        this.txtCodMuelleRef.setFocus();
      }, (500));
    }

  }

  CerrarPicking() {
    if (this.vRutaPickingPage.Saldo > 0) {
      this.presentAlertConfirm("Va a cerrar orden de picking incompleta, ¿Desea continuar?”.").then((resultAlert) => {
        if (resultAlert) {
          // Cerrar Picking
          this.sPicking.CerrarPicking(this.vRutaPickingPage.Id_Tx, 6, this.sGlobal.userName, this.listNombreMuelleXAlmacen[0].Id_Muelle, this.sGlobal.Id_Almacen).then((resultCerrar) => {
            debugger;
            this.resultCierre = resultCerrar;
            if (this.resultCierre.errNumber == 0) {
              this.presentAlert("Operación exitosa").then((resultAlert2) => {
                if (resultAlert2) {
                  this.presentAlertConfirm("¿Desea imprimir el picking?”.").then((resultAlert3) => {
                    if (resultAlert3) {
                      // Mostrar lista de impresoras
                      this.showModalImpresora();
                    }
                    //Ir a detalle ordenes
                    this.goPickingPage();
                  })
                }
              })
              console.log('Operación exitosa', this.listNombreMuelleXAlmacen);
            } else {
              this.presentToast(this.resultCierre.message);
              console.log(this.resultCierre.message, this.listNombreMuelleXAlmacen);
            }
          }, (err) => {
            console.log('E-Muelle por almacen', err);
          });

        } else {
          this.goBackRutaPicking();
          //this.navCtrl.pop();
        }
      })
    } else {
      this.presentAlertConfirm("Desea cerrar picking?”.").then((resultAlertCompleto) => {
        if (resultAlertCompleto) {
          // Cerrar Picking
          this.sPicking.CerrarPicking(this.vRutaPickingPage.Id_Tx, 5, this.sGlobal.userName, this.listNombreMuelleXAlmacen[0].Id_Muelle, this.sGlobal.Id_Almacen).then((resultCerrar) => {
            debugger;
            this.resultCierre = resultCerrar;
            if (this.resultCierre.errNumber == 0) {
              this.presentAlert("Operación exitosa").then((resultAlert) => {
                if (resultAlert) {
                  this.presentAlertConfirm("¿Desea imprimir el picking?”.").then((result) => {
                    if (result) {
                      // Mostrar lista de impresoras
                      this.showModalImpresora();
                      this.imprimir();
                    }
                    //Ir a detalle ordenes
                    this.goPickingPage();
                  })
                }
              })
              console.log('Operación exitosa', this.listNombreMuelleXAlmacen);
            } else {
              this.presentToast(this.resultCierre.message);
              console.log(this.resultCierre.message, this.listNombreMuelleXAlmacen);
            }
          }, (err) => {
            console.log('E-Muelle por almacen', err);
          });
        }
      })
    }
  }

  imprimir() {
    debugger;
    var listContainer = [];
    var listEtq = [];

    listEtq = [];
    listEtq.push({ "campo": "|NROPICKING|", "valor": this.vRutaPickingPage.NumOrden });
    listEtq.push({ "campo": "|CLIENTE|", "valor": this.vRutaPickingPage.Cliente });
    listEtq.push({ "campo": "|COPIAS|", "valor": 1 });
    listEtq.push({ "campo": "|ALMACEN|", "valor": this.sGlobal.nombreAlmacen });
    listEtq.push({ "campo": "|USUARIO|", "valor": this.sGlobal.apeNom });
    listContainer.push({ 'etiqueta': listEtq });

    this.sEtq.imprimirListaEtiquetas(listContainer, 'ETQ_Pickingv2.txt', this.sGlobal.nombreImpresora, true).then(result => {
      debugger;
      var message: any = result;
      if (message.errNumber == -1) {
        alert(message.mensaje);
      }
    });
  }

  validarCodeBar_old() {
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        this.sPicking.getMuelleXAlmacen(2, this.codeBar.trim()).then((result) => {
          this.listNombreMuelleXAlmacen = result;
          if (this.listNombreMuelleXAlmacen.length > 0) {
            console.log('Datos Muelle por almacen', this.listNombreMuelleXAlmacen);
            if (this.vRutaPickingPage.Saldo > 0) {
              this.presentAlertConfirm("Va a cerrar orden de picking incompleta, ¿Desea continuar?”.").then((resultAlert) => {
                if (resultAlert) {
                  // Cerrar Picking
                  this.sPicking.CerrarPicking(this.vRutaPickingPage.Id_Tx, 6, this.sGlobal.userName, this.listNombreMuelleXAlmacen[0].Id_Muelle, this.sGlobal.Id_Almacen).then((resultCerrar) => {
                    debugger;
                    this.resultCierre = resultCerrar;
                    if (this.resultCierre.errNumber == 0) {

                      this.presentAlert("Operación exitosa").then((resultAlert2) => {
                        if (resultAlert2) {
                          this.presentAlertConfirm("¿Desea imprimir el picking?”.").then((resultAlert3) => {
                            if (resultAlert3) {
                              // Mostrar lista de impresoras
                              this.showModalImpresora();
                            }
                          })
                        }
                      })
                      console.log('Operación exitosa', this.listNombreMuelleXAlmacen);
                    } else {
                      this.presentToast(this.resultCierre.message);
                      console.log(this.resultCierre.message, this.listNombreMuelleXAlmacen);
                    }
                  }, (err) => {
                    console.log('E-Muelle por almacen', err);
                  });
                  // this.CerrarPicking(this.vRutaPickingPage.Id_Tx, 6, "Admin", this.listNombreMuelleXAlmacen[0].Id_Muelle, 2);
                  // debugger;
                  // if(this.resultCierre.errNumber == 0){
                  //   this.presentAlert("Operación exitosa").then((result) => {
                  //     if (result) {
                  //       this.presentAlertConfirm("¿Desea imprimir el picking?”.").then((result) => {
                  //         if (result) {
                  //           // Mostrar lista de impresoras
                  //           this.showModalImpresora();
                  //         }
                  //       })
                  //     }
                  //   })
                  // }else{
                  //   this.presentToast(this.resultCierre.message);
                  // }   
                } else {
                  this.goBackRutaPicking();
                  //this.navCtrl.pop();
                }
              })
            } else {
              this.presentAlertConfirm("Desea cerrar picking?”.").then((resultAlertCompleto) => {
                if (resultAlertCompleto) {
                  // Cerrar Picking
                  this.sPicking.CerrarPicking(this.vRutaPickingPage.Id_Tx, 5, this.sGlobal.userName, this.listNombreMuelleXAlmacen[0].Id_Muelle, this.sGlobal.Id_Almacen).then((resultCerrar) => {
                    debugger;
                    this.resultCierre = resultCerrar;
                    if (this.resultCierre.errNumber == 0) {
                      this.presentAlert("Operación exitosa").then((resultAlert) => {
                        if (resultAlert) {
                          this.presentAlertConfirm("¿Desea imprimir el picking?”.").then((result) => {
                            if (result) {
                              // Mostrar lista de impresoras
                              this.showModalImpresora();
                            }
                          })
                        }
                      })
                      console.log('Operación exitosa', this.listNombreMuelleXAlmacen);
                    } else {
                      this.presentToast(this.resultCierre.message);
                      console.log(this.resultCierre.message, this.listNombreMuelleXAlmacen);
                    }
                  }, (err) => {
                    console.log('E-Muelle por almacen', err);
                  });
                  // this.CerrarPicking(this.vRutaPickingPage.Id_Tx, 5, "Admin", this.listNombreMuelleXAlmacen[0].Id_Muelle, 2);
                  // if(this.resultCierre.errNumber == 0){
                  //   this.presentAlert("Operación exitosa").then((result) => {
                  //     if (result) {
                  //       this.presentAlertConfirm("¿Desea imprimir el picking?”.").then((result) => {
                  //         if (result) {
                  //           // Mostrar lista de impresoras
                  //           this.showModalImpresora();
                  //         }
                  //       })
                  //     }
                  //   });
                  // }else{
                  //   this.presentToast(this.resultCierre.message);
                  // }
                }
              })
            }

          } else {
            this.presentAlert("Código de barras muelle no es correcto");
            this.codeBar = "";
            console.log('No se encontrarón datos.', this.listNombreMuelleXAlmacen);
          }
        }, (err) => {
          console.log('E-Muelle por almacen', err);
        });
      } else {
        this.presentToast("Ingrese código de muelle");
      }
    } else {
      this.presentToast("Ingrese código de muelle");
    }

  }
  CerrarPicking_old(idTx, idEstado, usuario, idMuelle, IdAlmacen) {
    debugger;
    this.sPicking.CerrarPicking(idTx, idEstado, usuario, idMuelle, IdAlmacen).then((result) => {
      debugger;
      this.resultCierre = result;
      if (this.resultCierre.errNumber == 0) {
        console.log('Operación exitosa', this.listNombreMuelleXAlmacen);
      } else {
        console.log(this.resultCierre.message, this.listNombreMuelleXAlmacen);
      }
    }, (err) => {
      console.log('E-Muelle por almacen', err);
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

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  showModalIncidencia2() { //data
    debugger;
    let modalIncidencia = this.modalCtrl.create(IncidenciaPage); //{ 'pIncidencia' : obj});
    modalIncidencia.onDidDismiss(data => {
      if (data.response == 200) {
        this.navCtrl.pop();
      }
    });
    modalIncidencia.present();
  }


  showModalAdministrarUaPage() {
    debugger;
    let obj = {
      'page': "modal",
    };
    let modalIncidencia = this.modalCtrl.create(AdministrarUaPage, { 'data': obj });
    modalIncidencia.onDidDismiss(data => {
      debugger;
      if (data.response == 200) {
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

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  goBackRutaPicking() {
    this.navCtrl.pop();
  }

  goPickingPage() {
    this.navCtrl.push(PickingPage);
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.txtCodMuelleRef.setFocus();
    }, (500));
    console.log('ionViewDidLoad CierrePickingPage');
  }

}
