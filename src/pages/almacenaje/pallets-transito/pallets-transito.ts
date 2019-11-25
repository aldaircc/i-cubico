import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AlmacenajePalletUaPage } from '../almacenaje-pallet-ua/almacenaje-pallet-ua'
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { DetallePalletUaPage } from '../detalle-pallet-ua/detalle-pallet-ua'
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { OtraUbicacionPage } from '../otra-ubicacion/otra-ubicacion'

/**
 * Generated class for the PalletsTransitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pallets-transito',
  templateUrl: 'pallets-transito.html',
})
export class PalletsTransitoPage {

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('txtCodPalletUa') txtCodPalletUaRef;
  @ViewChild('txtCodPalletUa', { read: ElementRef }) private txtCodPalletUa: ElementRef;

  vTransitoPage: any = [];
  vPalletTransitoPage: any = [];  
  codeBar:string;
  listPalletTransito: any;
  listUbicacion: any;
  listAuxPalletTransito: any = [];
  rowCount: any = 0;
  vId_Ubicacion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl:ToastController, public sAlmacenaje: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
      this.vId_Ubicacion = this.vTransitoPage = navParams.get('data'); 
  }

  ubicacion(){
    if(this.listAuxPalletTransito.length>0){
      var intIdMarca = this.listAuxPalletTransito[0].Id_Marca;
      var intIdAlmacen = this.sGlobal.Id_Almacen;
      var intIdCondicion = this.listAuxPalletTransito[0].Id_Condicion;
      var CodBarraUA = this.listAuxPalletTransito[0].UA_CodBarra;
      debugger;
      this.sAlmacenaje.getListarUbicacionLibreXMarcaSugerida(intIdMarca, intIdAlmacen, intIdCondicion, CodBarraUA).then((result)=>{
        debugger;
        this.listUbicacion = result;
        if(this.listUbicacion.length>0){
          this.goAlmacenajePalletUaPage();
        }else{
          this.presentAlertConfirm("No existe ubicación sugerida. ¿Desea seleccionar otra ubicación?”.").then((result) => {
            if (result) {
              this.goOtraUbicacionPage();
            }
          })
        }               
      },err=>{
        console.log('E-getDataRutaPicking',err);
      });
    }else{
      this.presentToast("No se encontraron registros, ingrese código de Pallet/UA's");
        setTimeout(() => {
          this.txtCodPalletUaRef.setFocus();
          this.selectAll(this.txtCodPalletUa);
        }, (500));
    }    
  }

  validarCodigo(){
    if(this.codeBar){
      if(this.codeBar.trim()!=""){
        if(this.codeBar.length==12){
          debugger;
          this.sAlmacenaje.getValidarUATransito(this.codeBar, this.vId_Ubicacion.Id_Ubicacion_Transito).then((result)=>{
            debugger;
            this.listPalletTransito = result;
            if(this.listPalletTransito.length == 0){
              this.presentAlert("Pallet/UA' no registrada").then((resultAlert) => {
                if (resultAlert) {
                  setTimeout(() => {
                    this.txtCodPalletUaRef.setFocus();
                    this.selectAll(this.txtCodPalletUa);
                  }, (500));
                }
              })
            }else{
              if(this.listAuxPalletTransito.length == 0){
                for (var i = 0; i < this.listPalletTransito.length; i++) {
                  var obj = {
                    'Cantidad': result[i].Cantidad,
                    'CodigoProducto': result[i].CodigoProducto,
                    'FechaEmision': result[i].FechaEmision,
                    'FechaVencimiento': result[i].FechaVencimiento,
                    'FlagAveriado': result[i].FlagAveriado,
                    'FlagCuarentena': result[i].FlagCuarentena,
                    'FlagDisponible': result[i].FlagDisponible,
                    'Id_Condicion': result[i].Id_Condicion,
                    'Id_Marca': result[i].Id_Marca,
                    'Id_Producto': result[i].Id_Producto,
                    'Id_UM': result[i].Id_UM,
                    'LoteLab': result[i].LoteLab,
                    'LotePT': result[i].LotePT,
                    'NombreProducto': result[i].NombreProducto,
                    'Serie': result[i].Serie,
                    'UA_CodBarra': result[i].UA_CodBarra,
                    'UM': result[i].UM
                  };
                  this.listAuxPalletTransito.push(obj);
                }
              }else{
                //Validar que num de UA recibida no se encuentre en la lista Auxiliar
                for (var i = 0; i < this.listPalletTransito.length; i++) {
                  var resultUA = false;
                  var UA = result[i].UA_CodBarra;
                  for (var j = 0; j < this.listAuxPalletTransito.length; j++) {
                    if(UA == this.listAuxPalletTransito[j].UA_CodBarra){ //Si no se encuentra en la lista agregar elemento a la lista
                      resultUA = true;
                    }                  
                  }
                  if(!resultUA){
                    var obj = {
                      'Cantidad': result[i].Cantidad,
                      'CodigoProducto': result[i].CodigoProducto,
                      'FechaEmision': result[i].FechaEmision,
                      'FechaVencimiento': result[i].FechaVencimiento,
                      'FlagAveriado': result[i].FlagAveriado,
                      'FlagCuarentena': result[i].FlagCuarentena,
                      'FlagDisponible': result[i].FlagDisponible,
                      'Id_Condicion': result[i].Id_Condicion,
                      'Id_Marca': result[i].Id_Marca,
                      'Id_Producto': result[i].Id_Producto,
                      'Id_UM': result[i].Id_UM,
                      'LoteLab': result[i].LoteLab,
                      'LotePT': result[i].LotePT,
                      'NombreProducto': result[i].NombreProducto,
                      'Serie': result[i].Serie,
                      'UA_CodBarra': result[i].UA_CodBarra,
                      'UM': result[i].UM
                    };
                    this.listAuxPalletTransito.push(obj);
                    
                  }else{
                    this.presentAlert("El código de Pallet/UA ya se encuentra en la lista.").then((resultAlert) => {
                      if (resultAlert) {
                        setTimeout(() => {
                          this.codeBar = "";
                          this.txtCodPalletUaRef.setFocus();
                          this.selectAll(this.txtCodPalletUa);
                        }, (500));
                      }
                    })
                  }
                }
              }
              this.rowCount = this.listAuxPalletTransito.length;
  
              setTimeout(() => {
                this.codeBar = "";
                this.txtCodPalletUaRef.setFocus();
                this.selectAll(this.txtCodPalletUa);
              }, (500));
            }                
          },err=>{
            console.log('E-getDataRutaPicking',err);
          }); 
        }else{
          this.presentToast("El código de Pallet/UA's debe tener 12 dígitos.");
          setTimeout(() => {          
            this.txtCodPalletUaRef.setFocus();
            this.selectAll(this.txtCodPalletUa);
          }, (500));
        }               
      }else{
        this.presentToast("Ingrese código de Pallet/UA's");
        setTimeout(() => {          
          this.txtCodPalletUaRef.setFocus();
          this.selectAll(this.txtCodPalletUa);
        }, (500));
      }
    }else{
      this.presentToast("Ingrese código de Pallet/UA's");
      setTimeout(() => {
        this.txtCodPalletUaRef.setFocus();
        this.selectAll(this.txtCodPalletUa);
      }, (500));
    }
  }

  eliminarPalletUA(data){
    debugger;
    this.presentAlertConfirm("¿Está seguro de eliminar el Pallet/UA?”.").then((result) => {
      if (result) {
        for (var j = 0; j < this.listAuxPalletTransito.length; j++) {
          if(data.UA_CodBarra == this.listAuxPalletTransito[j].UA_CodBarra){ //Si no se encuentra en la lista agregar elemento a la lista
            this.listAuxPalletTransito.splice(j,1);
            this.rowCount = this.listAuxPalletTransito.length;
          }                  
        }
      }
    })
  }

  limpiar(){
    this.listAuxPalletTransito = [];
    this.rowCount = this.listAuxPalletTransito.length;
    this.codeBar = "";
    setTimeout(() => {
      this.txtCodPalletUaRef.setFocus();
    }, (500));   
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
      duration: 5000,
      position: 'bottom'
    });  
    toast.present();
  }

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  dataFromAlmacenajePalletUAPage : any;  
  Selectedcallback = data => {
    debugger;
    this.dataFromAlmacenajePalletUAPage = data;
    console.log('data received from other page', this.dataFromAlmacenajePalletUAPage);
    this.vTransitoPage = this.dataFromAlmacenajePalletUAPage;
    this.limpiar();
    debugger;
  };

  goAlmacenajePalletUaPage(){
    var listUA = [];
      this.listAuxPalletTransito.forEach(el => {
        listUA.push(el.UA_CodBarra);
      });
      debugger;
    this.vPalletTransitoPage = {      
      'Sector' : this.listUbicacion[0].Sector,
      'Fila' : this.listUbicacion[0].Fila,
      'Columna' : this.listUbicacion[0].Columna,
      'Nivel' : this.listUbicacion[0].Nivel,
      'Posicion' : this.listUbicacion[0].Posicion,
      'CodigoBarraUbi' : this.listUbicacion[0].CodigoBarra,
      'Id_Ubicacion' : this.listUbicacion[0].Id_Ubicacion,
      'Id_Ubicacion_Transito' : this.vTransitoPage.Id_Ubicacion_Transito,
      'CantidadPallets' : this.rowCount,
      'Id_Marca' : this.listAuxPalletTransito[0].Id_Marca,
      'lst_UA' : listUA
    };
    this.navCtrl.push(AlmacenajePalletUaPage, {
      data: this.vPalletTransitoPage, palletTransito: this.Selectedcallback
    });
  }

  goDetallePalletUaPage(data) {
    debugger;
    this.vPalletTransitoPage = {
      'NombreProducto': data.NombreProducto,
      'CodigoProducto' : data.CodigoProducto,
      'UM' : data.UM,
      'UA_CodBarra' : data.UA_CodBarra,
      'LoteLab' : data.LoteLab,
      'FechaEmision': data.FechaEmision,
      'FechaVencimiento': data.FechaVencimiento,
      'Cantidad': data.Cantidad
    };
    this.navCtrl.push(DetallePalletUaPage, {
      data: this.vPalletTransitoPage
    });
  }

  goOtraUbicacionPage() {    
    this.vPalletTransitoPage = {
      'Id_Marca' : this.listAuxPalletTransito[0].Id_Marca
    };
    this.navCtrl.push(OtraUbicacionPage, {
      data: this.vPalletTransitoPage
    });
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.selectAll(this.txtCodPalletUa);
    }, (500));
    this.navBar.backButtonClick = (e:UIEvent)=>{
      if(this.listAuxPalletTransito.length>0){
        this.presentAlertConfirm("Quedan " + this.rowCount + " registros por ubicar. ¿Está seguro de salir?").then((result) => {
          if (result) {
            this.navCtrl.pop();
          }
        })
      }else{
        this.navCtrl.pop();
      }             
     }
    console.log('ionViewDidLoad PalletsTransitoPage');
  }
}
