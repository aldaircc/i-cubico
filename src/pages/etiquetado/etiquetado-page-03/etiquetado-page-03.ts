import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { EtiquetadoPage_04Page } from '../etiquetado-page-04/etiquetado-page-04';

/**
 * Generated class for the EtiquetadoPage_03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etiquetado-page-03',
  templateUrl: 'etiquetado-page-03.html',
})
export class EtiquetadoPage_03Page {

  rowCount: number = 0;
  strUA: string = "";
  listUAs: any = [];
  @ViewChild('inputUA', { read: ElementRef }) private inputUA:ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sAlm: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
  }

  AddUA(): void{
    debugger;
    if(this.strUA.trim() == ""){
      alert('Ingresar UA');
      this.selectAll(this.inputUA, 500);
      return;
    }

    if(this.existInList()){
      alert('La UA ya se encuentra en la lista');
      this.strUA = "";
      this.selectAll(this.inputUA, 500);
      return;
    }

    this.validarExisteUA(this.strUA);
  }

  existInList(): boolean{
    debugger;
    var value: boolean = false;
    let filter =  this.listUAs.filter(obj => obj.UA_CodBarra.trim() === this.strUA.trim());
    if(filter.length != 0){
      value = true;
    }
    return value;
  }

  validarExisteUA(strUA){
    this.sAlm.validarExisteUA(strUA).then(result=>{
      debugger;
      let res:any = result;
      if(res.length != 0){

        if(this.existInList()){
          this.strUA = "";
          this.selectAll(this.inputUA, 500);
          return;
        }else{
          this.listUAs.push({
            'UA_CodBarra' : res[0].UA_CodBarra,
            'Id_Producto' : res[0].Id_Producto,
            'CodigoProducto' : res[0].CodigoProducto,
            'NombreProducto' : res[0].NombreProducto,
            'Id_UM' : res[0].Id_UM,
            'UM' : res[0].UM,
            'Cantidad' : res[0].Cantidad,
            'LoteLab' : res[0].LoteLab,
            'LotePT' : res[0].LotePT,
            'FlagDisponible' : res[0].FlagDisponible,
            'FlagAveriado' : res[0].FlagAveriado,
            'Id_Marca' : res[0].Id_Marca
          });
          this.rowCount = this.listUAs.length;
          this.strUA = "";
          this.selectAll(this.inputUA, 500);
        }
      }else{
        alert('UA no registrada');
        this.strUA = "";
        this.selectAll(this.inputUA, 500);
      }
    });
  }

  deleteUA(obj): void{
    let msgAlert = this.alertCtrl.create({
      title: 'Confirmar eliminación',
      message: '¿Está seguro de Eliminar UA?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Si',
          handler: () => {
            const index: number = this.listUAs.indexOf(obj);
            if (index !== -1) {
              this.listUAs.splice(index, 1);
              this.rowCount = this.listUAs.length;
            }  
            alert('Operación exitosa');
            this.selectAll(this.inputUA, 500);
          }
        }
      ]
    });
    msgAlert.present();
  }

  goToEtqPage04(): void{
    if(this.listUAs.length != 0){

      var listUA = [];
      this.listUAs.forEach(el => {
        listUA.push(el.UA_CodBarra);  
      });

      this.navCtrl.push(EtiquetadoPage_04Page, { 'listUA' : listUA });
    }else{
      alert('No existen UAs registradas');
      this.selectAll(this.inputUA, 500);
    }
  }

  ionViewWillEnter(){
    this.listUAs = [];
    this.strUA = "";
    this.rowCount = 0;
    this.selectAll(this.inputUA, 500);
  }

  selectAll(el: ElementRef, time){
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(()=>{
      nativeEl.select();
    }, time);
  }
}
