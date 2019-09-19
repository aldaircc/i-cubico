import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ReabastecimientoPickingPage } from '../reabastecimiento-picking/reabastecimiento-picking'
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';

/**
 * Generated class for the UbicacionOrigenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubicacion-origen',
  templateUrl: 'ubicacion-origen.html',
})
export class UbicacionOrigenPage {

  @ViewChild('txtCodUbicacion') txtCodUbicacionRef;
  @ViewChild('txtCodUbicacion', { read: ElementRef }) private txtCodUbicacion: ElementRef;
  codeBar:string;
  vDatosRecibidos: any = [];
  vUbicacionOrigenPage: any;

  listUbicacionDestino: any;
  listUbicacionOrigen: any;
  //listAuxUbicacionDestino: any = [];

  listAuxUbicacionDestino: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider, public sAlmacenaje: AlmacenajeServiceProvider) {
      this.vDatosRecibidos = navParams.get('data');
      this.getRutaReabastecimientoXTx(this.vDatosRecibidos.Id_Tx, this.vDatosRecibidos.Id_Producto, this.sGlobal.Id_Almacen);
  } 

  getRutaReabastecimientoXTx(Id_Tx, Id_Producto, Id_Almacen){
    debugger;
    this.sAlmacenaje.getRutaReabastecimientoXTx(Id_Tx, Id_Producto, Id_Almacen).then((result) => {
      debugger;
      this.listUbicacionDestino = result;      
      if (this.listUbicacionDestino.length > 0) {
        this.listAuxUbicacionDestino = result[0];
        this.getListarUbicacionUASugeridaXReabastecer(this.sGlobal.Id_Almacen, this.vDatosRecibidos.Id_Producto, this.listAuxUbicacionDestino.ubiDestino, this.vDatosRecibidos.Movimiento);
        console.log('Datos reabastecimiento', this.listUbicacionDestino);
      } else {
        this.presentToast('No se encontraron registros.');
      }
    }, (err) => {
      console.log('E-Ordenes Picking listar', err);
    });
  }


  getListarUbicacionUASugeridaXReabastecer(intIdAlmacen, intIdProducto, intIdUbiDestino, strMovimiento){
    debugger;
    this.sAlmacenaje.getListarUbicacionUASugeridaXReabastecer(intIdAlmacen, intIdProducto, intIdUbiDestino, strMovimiento).then((result) => {
      debugger;
      this.listUbicacionOrigen = result;

      if (this.listUbicacionOrigen.length > 0) {
        console.log('Datos reabastecimiento', this.listUbicacionOrigen);
      } else {
        this.presentToast('No se encontraron registros.');
      }
    }, (err) => {
      console.log('E-Ordenes Picking listar', err);
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

  validarCodeBar(){
    if(this.codeBar){
      if(this.codeBar.trim()!=""){
        debugger;
        if(this.codeBar.trim() == this.listUbicacionOrigen[0].CodigoBarra.trim()){
          this.goReabastecimientoPickingPage();
        }else{
          this.presentAlert("¿Ubicación de origen ingresada no existe?").then((result) => {
            setTimeout(() => {
              //this.txtCodUbicacionRef.setFocus();
              this.selectAll(this.txtCodUbicacion);
            }, (500));
          })
        }
      }else{
        this.presentToast("Ingrese código de ubicación");
        setTimeout(() => {
          //this.txtCodUbicacionRef.setFocus();
          this.selectAll(this.txtCodUbicacion);
        }, (500));
      }
    }else{
      this.presentToast("Ingrese código de ubicación");
      setTimeout(() => {
        //this.txtCodUbicacionRef.setFocus();
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
      duration: 2000,
      position: 'bottom'
    });  
    toast.present();
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

  goReabastecimientoPickingPage() {
    debugger;
    this.vUbicacionOrigenPage = {
      
      'Id_Tx': this.vDatosRecibidos.Id_Tx,
      'Codigo': this.vDatosRecibidos.Codigo,
      'Id_Producto': this.vDatosRecibidos.Id_Producto,
      'Producto': this.vDatosRecibidos.Producto,
      'LoteLab': this.listAuxUbicacionDestino.LoteLab,
      'stockXReabastecer': this.listAuxUbicacionDestino.stockXReabastecer,
      'Sector': this.listAuxUbicacionDestino.Sector,
      'Rack': this.listAuxUbicacionDestino.Rack,
      'Columna': this.listAuxUbicacionDestino.Columna,
      'Nivel': this.listAuxUbicacionDestino.Nivel,
      'Posicion': this.listAuxUbicacionDestino.Posicion,
      'CodigoBarra': this.listAuxUbicacionDestino.CodigoBarra,
      'Id_Ubicacion': this.listUbicacionOrigen[0].Id_Ubicacion,
      'FechaEmision': this.listUbicacionOrigen[0].FechaEmision,
      'FechaVencimiento': this.listUbicacionOrigen[0].FechaVencimiento,
      'SectorD': this.vDatosRecibidos.SectorD,
    };
    // PREGUNTAR SI VA PARA REABASTECIMIENTOPICKING O REABASTECIMIENTOALMACENAJE
    //TAMBIEN UTILIZAR CALLBACK PARA ENVIAR LOS DATOS A UBICACIONORIGENPAGE
    this.navCtrl.push(ReabastecimientoPickingPage, { 
      data: this.vUbicacionOrigenPage      
    });
  }

  ionViewDidLoad() {
    setTimeout(() => {
      //this.txtCodUbicacionRef.setFocus();
      this.selectAll(this.txtCodUbicacion);
    }, (500));
    console.log('ionViewDidLoad UbicacionOrigenPage');
  }
}
