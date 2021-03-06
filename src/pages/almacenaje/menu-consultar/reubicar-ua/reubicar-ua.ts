import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Navbar } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { AdministrarUaPage } from '../../menu-consultar/administrar-ua/administrar-ua'

/**
 * Generated class for the ReubicarUaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reubicar-ua',
  templateUrl: 'reubicar-ua.html',
})
export class ReubicarUaPage {

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;
  codeBar: string;
  resultUbicacion: any;
  resultReubicar: any;
  Sector: any;
  Fila: any;
  Columna: any;
  Nivel: any;
  Posicion: any;
  vDatosRecibidos: any = [];
  vReubicarUAPage: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider, public toastCtrl: ToastController) {
      this.vDatosRecibidos = navParams.get('data');
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        if(this.codeBar.length == 14){
          this.sAlmacenaje.getListarUbicacionXCodigoBarra(this.codeBar, this.sGlobal.Id_Almacen).then((result) => {
            debugger;
            this.resultUbicacion = result;
            if (this.resultUbicacion.length > 0) {
  
              if(this.vDatosRecibidos.Id_Ubicacion != this.resultUbicacion[0].Id_Ubicacion){
                this.Sector = this.resultUbicacion[0].Sector;
                this.Fila = this.resultUbicacion[0].Fila;
                this.Columna = this.resultUbicacion[0].Columna;
                this.Nivel = this.resultUbicacion[0].Nivel;
                this.Posicion = this.resultUbicacion[0].Posicion;
              }else{
                this.presentAlert("La Ubicación debe ser diferente a la ubicación origen.").then((resultAlert) => {
                  if (resultAlert) {
                    setTimeout(() => {
                      this.selectAll(this.txtCodUbicacion);
                    }, (500));
                  }
                })
              } 
            } else {
              this.Sector = "";
              this.Fila = "";
              this.Columna = "";
              this.Nivel = "";
              this.Posicion = "";
              this.presentAlert("Ubicación no registrada.").then((resultAlert) => {
                if (resultAlert) {
                  setTimeout(() => {
                    this.selectAll(this.txtCodUbicacion);
                  }, (500));
                }
              })
            }
          }, err => {
            console.log('E-getListarUbicacionXCodigoBarra', err);
          });
        }else{
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
      this.selectAll(this.txtCodUbicacion);
    }, (500));
  }

  reubicarUA(){
    debugger;
    if (this.codeBar){
      if (this.codeBar.trim() != ""){
        if(this.resultUbicacion){
          this.presentAlertConfirm("¿Está seguro de cambiar la ubicación?.").then((result) => {
            if (result) {
              debugger;
              this.sAlmacenaje.postReUbicarUA(this.vDatosRecibidos.CodBar_UA, this.resultUbicacion[0].Id_Ubicacion, this.sGlobal.userName).then((result) => {
                debugger;
                this.resultReubicar = result;
                debugger;
                let res: any = result;
                if (res.errNumber == 0) {
                  console.log(res.message);
                  this.presentAlert("UA reubicada correctamente.").then((resultAlert2) => {
                    this.Sector = "";
                    this.Fila = "";
                    this.Columna = "";
                    this.Nivel = "";
                    this.Posicion = "";
                    this.codeBar = "";
                    this.goAdministrarUaPage();
                  })
                } else {
                  debugger;
                  this.presentAlert(res.message).then((resultAlert2) => {
                    setTimeout(() => {
                      this.selectAll(this.txtCodUbicacion);
                    }, (500));
                  })            
                  console.log(res.message);
                }
              }, err => {
                console.log('E-postReAsignarUA', err);
              });
            }else{
              setTimeout(() => {
                this.selectAll(this.txtCodUbicacion);
              }, (500));
            }
          })
        }else{
          this.presentToast("No hay registros, debe consultar la ubicación");
        setTimeout(() => {
          this.selectAll(this.txtCodUbicacion);
        }, (500));
        }        
      }else{
        this.presentToast("Ingrese código de ubicación");
        setTimeout(() => {
          this.selectAll(this.txtCodUbicacion);
        }, (500));
      }
    }else{
      this.presentToast("Ingrese código de ubicación");
      setTimeout(() => {
        this.selectAll(this.txtCodUbicacion);
      }, (500));
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

  goAdministrarUaPage(){
    debugger;
      this.navCtrl.pop().then(() => {
        this.vReubicarUAPage = {
          'page': 2
        };
        this.navParams.get('reubicar')(this.vReubicarUAPage);
      });
  }

  ionViewDidLoad() {
    //Enviar page 2 a administrar ua
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop();      
  }
    setTimeout(() => {
      this.selectAll(this.txtCodUbicacion);
    }, (500));
    console.log('ionViewDidLoad ReubicarUaPage');
  }
}
