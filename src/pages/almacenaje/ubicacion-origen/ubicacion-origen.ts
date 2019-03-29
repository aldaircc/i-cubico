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

  listUbicacionDestino: any;
  //listAuxUbicacionDestino: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public sGlobal: GlobalServiceProvider, public sAlmacenaje: AlmacenajeServiceProvider) {
      this.vDatosRecibidos = navParams.get('data');
      this.getRutaReabastecimientoXTx(this.vDatosRecibidos.Id_Tx, this.vDatosRecibidos.Id_Producto, this.sGlobal.Id_Almacen);
  } 

  getRutaReabastecimientoXTx(Id_Tx, Id_Producto, Id_Almacen){
    debugger;
    this.sAlmacenaje.getRutaReabastecimientoXTx(Id_Tx, Id_Producto, Id_Almacen).then((result) => {
      debugger;
      //this.listAuxUbicacionDestino = [];
      this.listUbicacionDestino = result;

      // for (var i = 0; i < this.listReabastecimiento.length; i++) {
      //   var obj = {
      //     'Codigo': result[i].Codigo,
      //     'ColumnaD': result[i].ColumnaD,
      //     'ColumnaO': result[i].ColumnaO,
      //     'Estado': result[i].Estado,
      //     'FilaD': result[i].FilaD,
      //     'FilaO': result[i].FilaO,
      //     'Id_Estado': result[i].Id_Estado,
      //     'Id_PasilloD': result[i].Id_PasilloD,
      //     'Id_PasilloO': result[i].Id_PasilloO,
      //     'Id_Producto': result[i].Id_Producto,
      //     'Id_SectorD': result[i].Id_SectorD,
      //     'Id_SectorO': result[i].Id_SectorO,
      //     'Id_Tx': result[i].Id_Tx,
      //     'Id_Ubicacion_Destino': result[i].Id_Ubicacion_Destino,
      //     'Id_Ubicacion_Origen': result[i].Id_Ubicacion_Origen,
      //     'Movimiento': result[i].Movimiento,
      //     'NivelD': result[i].NivelD,
      //     'NivelO': result[i].NivelO,
      //     'Observacion': result[i].Observacion,
      //     'PasilloD': result[i].PasilloD,
      //     'PasilloO': result[i].PasilloO,
      //     'PosicionD': result[i].PosicionD,
      //     'PosicionO': result[i].PosicionO,
      //     'Prioridad': result[i].Prioridad,
      //     'Producto': result[i].Producto,
      //     'SectorD': result[i].SectorD,
      //     'SectorO': result[i].SectorO,
      //     'Ubicacion_Destino': result[i].Ubicacion_Destino,
      //     'Ubicacion_Origen': result[i].Ubicacion_Origen
      //   };
      //   this.listAuxReabastecimiento.push(obj);
      //   //this.idRutaPicking = this.idRutaPicking + 1;

        
      // }


      if (this.listUbicacionDestino.length > 0) {
        console.log('Datos reabastecimiento', this.listUbicacionDestino);
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

      }else{
        this.presentToast("Ingrese código de ubicación");
        setTimeout(() => {
          this.txtCodUbicacionRef.setFocus();
          this.selectAll(this.txtCodUbicacion);
        }, (500));
      }
    }else{
      this.presentToast("Ingrese código de ubicación");
      setTimeout(() => {
        this.txtCodUbicacionRef.setFocus();
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

  goReabastecimientoPickingPage() {
    this.navCtrl.push(ReabastecimientoPickingPage);
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.txtCodUbicacionRef.setFocus();
    }, (500));
    console.log('ionViewDidLoad UbicacionOrigenPage');
  }
}
