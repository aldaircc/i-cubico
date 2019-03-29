import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Checkbox } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { EmbarquePage_05Page } from '../embarque-page-05/embarque-page-05';

/**
 * Generated class for the EmbarquePage_04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embarque-page-04',
  templateUrl: 'embarque-page-04.html',
})
export class EmbarquePage_04Page {

  vParameter: any;
  strCodeBarBulto: string = "";
  bultoLeido: number = 0;
  subBultoLeido: number = 0;
  bolEliminar: boolean = false;
  @ViewChild('inputCodeBarBulto', { read: ElementRef }) private inputCodeBarBulto: ElementRef;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider, public sDesp: DespachoServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
    this.bultoLeido = (this.vParameter.OperacionBultos != undefined) ? this.vParameter.OperacionBultos : 0;
  }

  presentConfirmDialog(title, message): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const confirm = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [{
          text: 'OK',
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

  cargarBulto(){

    if(this.strCodeBarBulto.length == 0 || this.strCodeBarBulto.trim() == ""){
      alert('Debe ingresar el código de bulto');
      return;
    }else{
      /** Inicio **/
      if(this.bolEliminar == true){
        
        this.presentConfirmDialog('Eliminar', '¿Desea quitar el (sub) bulto del embarque?').then(result=>{
          if(result == true){
            this.sDesp.eliminarBultoEmbarque(this.strCodeBarBulto, this.vParameter.Id_Tra, this.sGlobal.Id_Almacen, this.sGlobal.userName).then(result=>{
              let res: any = result;

              if(res.errNumber == 0){
                alert(res.message);
                this.bultoLeido = parseFloat(res.valor1);
                this.subBultoLeido = parseFloat(res.valor2);
                this.bolEliminar = false;
                this.selectAll(this.inputCodeBarBulto, 600);
              }else if(res.errNumber == -1){
                alert(res.message);
                this.strCodeBarBulto = "";
                // chkEliminar.checked = false;
                this.selectAll(this.inputCodeBarBulto, 600);
              }
            });
          }
        });
      }else{
        this.sDesp.cargaBultoTransporte(this.strCodeBarBulto, this.vParameter.Id_Tra, this.sGlobal.Id_Almacen, this.sGlobal.userName).then(result=>{
          let res:any = result;
    
          if(res.errNumber == 0){
            alert('Registro exitoso');
            this.selectAll(this.inputCodeBarBulto, 600);
            this.bultoLeido = parseFloat(res.valor1);
            this.subBultoLeido = parseFloat(res.valor2);
          }else{
            alert(res.message);
            this.strCodeBarBulto = "";
            this.selectAll(this.inputCodeBarBulto, 600);
          }
    
        });
      }
      /** Fin **/
    }    
  }

  checkboxClicked(chkEliminar: Checkbox) {
    this.bolEliminar = chkEliminar.checked;
  }

  goToEmbarPage05(obj): void{
    let parameter = {
      'Id_Tra': obj.Id_Tra,
      'Id_Conductor': obj.Id_Conductor,
      'Conductor': obj.Conductor,
      'Documento': obj.Documento,
      'Id_Vehiculo': obj.Id_Vehiculo,
      'Placa': obj.Placa,
      'totalSubBultos': obj.totalSubBultos,
      'totSubBultosLeido': obj.totSubBultosLeido,
      'totalBultos': obj.totalBultos,
      'totalSaldo': obj.totalSaldo,
      'OperacionBultos': obj.OperacionBultos
    };
    this.navCtrl.push(EmbarquePage_05Page, { 'vParameter': parameter});
  }

  selectAll(el: ElementRef, time){
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(()=>{
      nativeEl.select();
    }, time);
  }

  ionViewWillEnter() {
    this.selectAll(this.inputCodeBarBulto, 500);
  }
}
