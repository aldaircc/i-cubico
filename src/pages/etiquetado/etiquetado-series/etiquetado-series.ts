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
    this.vEtq.Id_Condicion = this.dataFromEtqPage02.Id_Condicion;                
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

    console.log(this.serie.length,"total");
    if (this.serie.length < 6 || this.serie.length > 30) {
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

    this.validarExisteSerie(this.serie,this.vEtq.Id_Producto);
  }

  validarExisteSerie(strSerie, intId_Producto) {    
    this.sAlm.validarExisteSerie(strSerie, intId_Producto).then(result => {
      let res: any = result;
      console.log(res,"respuesta");
      console.log(res.errNumber,"número");

        if(res.errNumber == 0){
          this.listUAs.push({            
            'Serie': this.serie         
          });
          this.serie = "";
        }
        else{
          this.presentToast(res.message);
          this.serie = "";
          this.selectAll(this.iSerie, 500);  
          // this.listUAs = res;  
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
        listUA.push(el.Serie);        
      });

      this.navCtrl.push(EtiquetadoPage_04Page, { 'flagSerie': true, 'listUA': listUA, 'Id_Producto': this.vEtq.Id_Producto,'Id_Condicion':this.vEtq.Id_Condicion });
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
