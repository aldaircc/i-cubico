import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { EtiquetadoPage_02Page } from '../etiquetado-page-02/etiquetado-page-02';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { EtiquetadoPage_04Page } from '../etiquetado-page-04/etiquetado-page-04';
/**
 * Generated class for the EtiquetadoSeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etiquetado-series',
  templateUrl: 'etiquetado-series.html'  
})
export class EtiquetadoSeriesPage {

  vEtq: any = {    
    'Articulo': "",        
    'Codigo': null,                            
    'Id_Producto': 0    
  };

  isVisibleSearchButton: boolean = false;
  titutlos1isDisplay: boolean = false;
  titutlos2isDisplay: boolean = true;  
  findArticulo: boolean = false;
  isEnabledSerie: boolean = true;

  listUAs: any = [];  
  rowCount: number = 0;
  serie: string = "";                  
 
  @ViewChild('iSerie', { read: ElementRef }) private iSerie: ElementRef;  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider, public sAlm: AlmacenajeServiceProvider, public toastCtrl: ToastController) {

    this.isVisibleSearchButton = (navParams.get('codePage') != null) ? true : false;
    this.titutlos1isDisplay = (navParams.get('codePage') != null) ? false : true;
    this.titutlos2isDisplay = (navParams.get('codePage') != null) ? true : false;
  }
 
  goToEtqPage02() {    
    this.findArticulo = true;
    this.navCtrl.push(EtiquetadoPage_02Page, {
      producto: this.productSelectedcallback      
    });
  }

  dataFromEtqPage02: any;
  productSelectedcallback = data => {
    this.dataFromEtqPage02 = data;    
    this.vEtq.Codigo = this.dataFromEtqPage02.Codigo;        
    this.vEtq.Articulo = this.dataFromEtqPage02.Descripcion;            
    this.vEtq.Id_Producto = this.dataFromEtqPage02.Id_Producto;                
  };  

  selectAll(el: ElementRef, time) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(() => {
      nativeEl.select();
    }, time);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  existInList(): boolean {
    var value: boolean = false;
    let filter = this.listUAs.filter(obj => obj.Serie.trim() === this.serie.trim());
    if (filter.length != 0) {
      value = true;
    }
    return value;
  }

  AddUA(): void {

    if (this.vEtq.Codigo == null || this.vEtq.Articulo == null || this.vEtq.Codigo == "" || this.vEtq.Articulo == "") {
      this.presentToast('Debe buscar el producto');
      this.selectAll(this.iSerie, 500);
      return;
    }
  
    if (this.serie.trim() == "") {
      this.presentToast('Ingresar Serie');
      this.selectAll(this.iSerie, 500);

      return;
    }
    if (this.serie.length == 5) {
        this.presentToast('El código de la serie debe tener 6 dígitos.');
        this.selectAll(this.iSerie, 500);
        return;
      }
    
    if (this.existInList()) {
      this.presentToast('La serie ya se encuentra en la lista');
      this.serie = "";
      this.selectAll(this.iSerie, 500);
      return;
    }

    this.validarExisteSerie(this.serie);
  }

  validarExisteSerie(strSerie) {    
    this.sAlm.validarExisteSerie(strSerie).then(result => {
      let res: any = result;
      if (res.length != 0) {

        debugger;
        if (!(this.serie == res[0].serie) && !(this.vEtq.Id_Producto == res[0].Id_Producto)) {
          this.presentToast('La serie no corresponde al producto');
          this.serie = "";
          this.selectAll(this.iSerie, 500);    
                        
        }
        
        
        if (this.existInList()) {
          this.serie = "";
          this.selectAll(this.iSerie, 500);
          return;
        } else {
          debugger;
          if (res.length == 1) {
            this.listUAs.push({
              'UA_CodBarra': res[0].UA_CodBarra,
              'Id_Producto': res[0].Id_Producto,
              'CodigoProducto': res[0].CodigoProducto,
              'NombreProducto': res[0].NombreProducto,                            
              'Cantidad': res[0].Cantidad,                    
              'Serie': res[0].Serie
            });
          } else {
            this.listUAs = res;
          }

          this.rowCount = this.listUAs.length;
          this.serie = "";
          this.selectAll(this.iSerie, 500);
        }
      } else {
        this.presentToast('La serie ingresada no existe');
        this.serie = "";
        this.selectAll(this.iSerie, 500);
      }
    });
  }

  deleteSerie(obj): void {
    let msgAlert = this.alertCtrl.create({
      title: 'Confirmar eliminación',
      message: '¿Está seguro de Eliminar la Serie?',
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
            this.selectAll(this.iSerie, 500);
          }
        }
      ]
    });
    msgAlert.present();
  }


  confirmacionBack(): void {

    if(this.listUAs.length > 0){
      this.presentAlertConfirm("Si sale de la pantalla se perderá la información. ¿Está seguro de salir?");
    }
    else{
      this.navCtrl.pop();
    }

  }


  goToEtqPage04(): void {
    if (this.listUAs.length != 0) {

      var listUA = [];
      this.listUAs.forEach(el => {
        listUA.push(el.UA_CodBarra);
      });

      this.navCtrl.push(EtiquetadoPage_04Page, { 'listUA': listUA });
    } else {
      this.presentToast('No existen series registradas');
      this.selectAll(this.iSerie, 500);
    }
  }

  ionViewWillEnter() {
    this.listUAs = [];
    this.serie = "";
    this.rowCount = 0;
    this.selectAll(this.iSerie, 500);
  }

  async confirmarRetorno (){
    let msgAlert = await this.alertCtrl.create({            
      title: 'Confirmar eliminación',
      message: 'Si sale de la pantalla se perderá la información. ¿Está seguro de salir?',
      buttons: [
        {
          text: 'No',       
          handler: () => {      
           
           console.log("Cancelado")
          }
        },
        {
          text: 'Si',
          handler: () => {
 
            console.log("Confirmado")        
          }
        }
      ]
    });
    await msgAlert.present();
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
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.navCtrl.pop();
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    })
  }
 

}
