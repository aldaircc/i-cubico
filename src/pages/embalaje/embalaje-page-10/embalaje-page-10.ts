import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,PopoverController, ModalController,  ToastController } from 'ionic-angular';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_05Page } from '../embalaje-page-05/embalaje-page-05';
import { EmbalajePage_06Page } from '../embalaje-page-06/embalaje-page-06';
import { EmbalajePage_07Page } from '../embalaje-page-07/embalaje-page-07';
import { EmbalajePage_09Page } from '../embalaje-page-09/embalaje-page-09';
import { EmbalajePage_03Page } from '../embalaje-page-03/embalaje-page-03';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { v } from '@angular/core/src/render3';
import { DeferObservable } from 'rxjs/observable/DeferObservable';

/**
 * Generated class for the EmbalajePage_10Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-10',
  templateUrl: 'embalaje-page-10.html',
})
export class EmbalajePage_10Page {
  
  @ViewChild('txtSerie') txtSerieRef;
  @ViewChild('txtSerie', { read: ElementRef }) private txtSerie: ElementRef;  
  vNroBulto: any;
  vNroBultoCeros: any;
  vSerie: any;
  vEmbalajePage02: any;    
  rowCount: any;  
  resultadoRegistroSerie: any;
  listDetalleXBulto: any = [];    

  vEmbalajePage03: any;
  vEmbalajeTotalPage03:any;
  vUltimoNroBulto: any;
  lstBultosDespacho: any;
  data: any;
  vListaProductoSelect: any;
  vPage: any;
  vSaldo: any;
  vFiltroProductos: any;
  lstProductoDespacho:any;
  vItem: any;
  vValido: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public popoverCtrl: PopoverController, public sGlobal: GlobalServiceProvider, public sEmbalaje: EmbalajeServiceProvider) {
    debugger;   
    
    this.data = this.navParams.get('data');
    this.vNroBulto = this.vNroBultoCeros = navParams.get('nroBulto');    
    this.vEmbalajePage02 = navParams.get('dataPage02');    
    this.vListaProductoSelect = navParams.get('dataPageFiltro');    
    this.vPage = navParams.get('page');   
    this.vSaldo = this.vListaProductoSelect.Saldo
    if(this.vPage==5 || this.vPage==8)     
      this.vSaldo = navParams.get('vSaldo');
    
    if(this.vPage!=5)     
      this.llenarNumeros();
    
    this.vItem = navParams.get('item');
      


  }

  ionViewDidLoad() {                   
    setTimeout(() => {
      this.vSerie = "";
      this.selectAll(this.txtSerie);
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

  selectAll(el: ElementRef) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  registrarSerie(){
    // var resultSerie = false;

    // for (var j = 0; j < this.listDetalleXBulto.length; j++) {
    //   if(this.vSerie == this.listDetalleXBulto[j].Serie){
    //     resultSerie = true;
    //   }                  
    // }

    // if(resultSerie){
    //   this.presentAlert("La Serie ya se encuentra en la lista.").then((resultAlert) => {
    //     if (resultAlert) {
    //       setTimeout(() => {
    //         this.vSerie = "";
    //         this.selectAll(this.txtSerie);
    //       }, (500));
    //     }
    //   })
    // }
    
    this.sEmbalaje.ValidarSerieEmbalaje(this.vSerie,this.vListaProductoSelect.Id_Tx).then((result) => {     
      this.vValido = result;

      if(this.vValido.errNumber != 0){
        
        this.presentAlert("La serie ya se encuentra registrada").then((resultAlert) => {
          if (resultAlert) {
            setTimeout(() => {
              this.vSerie = "";
              this.selectAll(this.txtSerie);
            }, (500));
          }
        });                
      }
      else{

        var objEmbalaje = {
          'Id_Tx': this.vListaProductoSelect.Id_Tx,
          'NroBulto': this.vNroBulto,
          'Id_Producto': this.vListaProductoSelect.Id_Producto,
          'Id_UM': this.vListaProductoSelect.Id_UM,
          'Cantidad': 1,
          'Anulado': 0,
          'Id_RF': this.sGlobal.Id_TerminalRF,
          'Item': this.vListaProductoSelect.Item,
          'Id_Almacen': this.sGlobal.Id_Almacen,
          'UsuarioRegistro': this.sGlobal.userName,
          'Id_UMP': 0,
          'Lote': this.vSerie,
          'Serie': this.vSerie,
          'Codigo': this.vListaProductoSelect.Codigo,
        };
          console.log(objEmbalaje,"datos a grabar")
          
        this.sEmbalaje.RegistrarProductoBulto(objEmbalaje).then((result) => {
          debugger;
          this.resultadoRegistroSerie = result;
          if(this.resultadoRegistroSerie.errNumber == 0){
            this.listDetalleXBulto.unshift(objEmbalaje);
            this.vListaProductoSelect.Saldo = this.vListaProductoSelect.Saldo - 1;
            this.rowCount = this.listDetalleXBulto.length;
            this.vSerie = "";            
          }
          else{

            this.presentAlert(this.resultadoRegistroSerie.message).then((resultAlert) => {
              if (resultAlert) {
                setTimeout(() => {
                  this.vSerie = "";
                  this.selectAll(this.txtSerie);
                }, (200));
              }
            })

          }
                           
          //this.ListarDetalleXBulto(this.vListaProductoSelect.Id_Tx,this.vNroBulto);
                        
         });
      } 
    })
  
       
    
  }

  ListarDetalleXBulto(strIdTx, intNroBulto) {
    this.sEmbalaje.ListarDetalleXBulto(strIdTx,intNroBulto).then((result) => {
      debugger;      
        this.listDetalleXBulto = result;        
        this.rowCount = this.listDetalleXBulto.length;        
    }, (err) => {
      console.log('ListarDetalleXBulto', err);
    });
  }


  goToEmbalajePage05() {
    debugger;
    this.vPage = 5;
      this.navCtrl.push(EmbalajePage_05Page, {
        dataPageFiltro: this.vListaProductoSelect,
        dataNroBultoCeros: this.vNroBultoCeros,
        dataTotalPage03: this.vEmbalajeTotalPage03,
        dataNroBulto: this.vNroBulto,
        dataPage02: this.vEmbalajePage02,
        descProducto: this.vListaProductoSelect.Producto, 
        vSaldo: this.vSaldo,        
      });  
  }
  
  goToEmbalajePage06() {    
    debugger;
    this.vPage = 6;
    if(this.listDetalleXBulto.length > 0){
      this.navCtrl.push(EmbalajePage_06Page, {
        dataNroBulto: this.vNroBulto,
        dataNroBultoCeros: this.vNroBultoCeros,
        dataPage02: this.vEmbalajePage02,        
        descProducto: this.vListaProductoSelect.Producto,        
        dataPageFiltro: this.vListaProductoSelect,
        data: this.data,
        vSaldo: this.vSaldo
      });
    }
    else{      
      this.presentAlert("No hay series agregadas").then((resultAlert) => {
        if (resultAlert) {
          setTimeout(() => {
            this.vSerie = "";
            this.selectAll(this.txtSerie);
          }, (500));
        }
      })
    }
  }

  goToEmbalajePage07() {   

    if(this.listDetalleXBulto.length > 0){
      this.vPage = 7;
      this.navCtrl.push(EmbalajePage_07Page, {
        dataNroBulto: this.vNroBulto,
        dataNroBultoCeros: this.vNroBultoCeros,
        dataPage02: this.vEmbalajePage02
      });
    }
    else{      
      this.presentAlert("No hay series agregadas").then((resultAlert) => {
        if (resultAlert) {
          setTimeout(() => {
            this.vSerie = "";
            this.selectAll(this.txtSerie);
          }, (500));
        }
      })
    }
  }

  goToEmbalajePage09() {   
    this.vPage = 9;
    this.navCtrl.push(EmbalajePage_09Page, {
      dataPageFiltro: this.vEmbalajePage03,
      dataNroBultoCeros: this.vNroBultoCeros,
      dataTotalPage03: this.vEmbalajeTotalPage03,
      dataNroBulto: this.vNroBulto,
      dataNroBulto2: this.vNroBulto,
      dataPage02: this.vEmbalajePage02,
      flagTodoItems: true
    });
  }

  llenarNumeros() {
    debugger;
    if(this.vPage == 5){      
      let s = this.vNroBultoCeros + "";
      while (s.length < 3)
        this.vNroBultoCeros = s = "0" + s;
      return this.vNroBultoCeros;
    }
    else{     
        this.vNroBulto = this.vNroBulto + 1;
        this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
        let s = this.vNroBultoCeros + "";
        while (s.length < 3)
          this.vNroBultoCeros = s = "0" + s;
        return this.vNroBultoCeros;                 
    }
  }

  incrementarNumeroBulto() {
    debugger;
    if(this.vNroBulto==0){
      this.vNroBulto = this.vNroBulto + 1;
      this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
      let s = this.vNroBultoCeros + "";
      while (s.length < 3)
        this.vNroBultoCeros = s = "0" + s;
      return this.vNroBultoCeros;
    }else{
      debugger;
      this.vNroBulto = this.vNroBulto + 1;
      this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
      let s = this.vNroBultoCeros + "";
      while (s.length < 3)
        this.vNroBultoCeros = s = "0" + s;
      return this.vNroBultoCeros;
    }    
  }
 
  ionViewWillEnter() {     
    debugger;    

    if(this.vPage == 3){
      //Lista las series
      this.ListarDetalleXBulto(this.vListaProductoSelect.Id_Tx,this.vNroBulto); 
    }

    if(this.vPage == 5){                       
      //Lista las series
      this.ListarDetalleXBulto(this.vListaProductoSelect.Id_Tx,this.vNroBulto);      
      //Lista los producto de la orden para obtener el saldo actual
      this.getListarDespachoDetalle();
    }

    if(this.vPage == 9){                 
      //Lista los bultos que contienen series y las series
      this.ListarBultosDespacho(this.vListaProductoSelect.Id_Tx);  
      //Lista los producto de la orden para obtener el saldo actual
      this.getListarDespachoDetalle();
      //  //Lista las series
      // this.ListarDetalleXBulto(this.vListaProductoSelect.Id_Tx,this.vNroBulto);      
    }

    if(this.vPage == 8){
    //Lista los bultos que contienen series y las series
    this.ListarBultosDespacho(this.vListaProductoSelect.Id_Tx);    
    }    
      
    setTimeout(() => {      
      this.txtSerieRef.setFocus();            
    }, (500));    
  }    

  confirmacionBack(): void {            
    this.navCtrl.push(EmbalajePage_03Page, {
      dataPage02: this.vEmbalajePage02,
      data: this.data      
    });
  }

  getListarDespachoDetalle() {
    this.ListarDespachoDetalle(this.vEmbalajePage02.Id_Tx);   
  }

  ListarDespachoDetalle(strId_Tx) {
    this.sEmbalaje.ListarDespachoDetalle(strId_Tx).then((result) => {    
      this.lstProductoDespacho = result;  
      debugger;
      
      var lista;
      if(this.vItem != null && this.vItem != undefined){
        this.vListaProductoSelect =  this.lstProductoDespacho.filter((item) => {      
          return (item.Item == this.vItem);
        });
      }            
      if(this.vPage == 9){
        lista =  this.lstProductoDespacho.filter((item) => {      
          return (item.Item == this.vListaProductoSelect.Item);
        });
        this.vListaProductoSelect = lista[0];
      }      

      // else{
      //   this.vListaProductoSelect =  this.lstProductoDespacho.filter((item) => {      
      //     return (item.Item == this.vListaProductoSelect.Item);
      //   });
      // }

    

      // this.vSaldo = this.vFiltroProductos[0].Saldo;      
      setTimeout(() => {
        this.vSerie = "";
        this.selectAll(this.txtSerie);
      }, (500));    
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  ListarBultosDespacho(strId_Tx) {
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {    
      this.lstBultosDespacho = result;  
      debugger;

      this.lstBultosDespacho =  this.lstBultosDespacho.filter((flag) => {      
        return (flag.FlagImpreso == 1);
      });


      if(this.lstBultosDespacho.length >0){
        this.vNroBulto = this.lstBultosDespacho[this.lstBultosDespacho.length - 1].NroBulto + 1;   
      }
      else{
        this.vNroBulto = 1
      }
      //Lista las series
      this.ListarDetalleXBulto(this.vListaProductoSelect.Id_Tx,this.vNroBulto);      
    })
  }
  //     if(this.vUltimoNroBulto != this.vNroBulto){
   
  //       this.vNroBulto = this.vUltimoNroBulto;
  //       this.sEmbalaje.ListarDetalleXBulto(strId_Tx,this.vNroBulto).then((result) => {           
  //           this.listDetalleXBulto = result;        
  //           this.rowCount = this.listDetalleXBulto.length;        
  //       }, (err) => {
  //         console.log('ListarDetalleXBulto', err);
  //       });             
  //     }    
  //     else{
  //       this.incrementarNumeroBulto();                 
  //       this.sEmbalaje.ListarDetalleXBulto(strId_Tx,this.vNroBulto).then((result) => {           
  //         this.listDetalleXBulto = result;        
  //         this.rowCount = this.listDetalleXBulto.length;        
  //       }, (err) => {
  //         console.log('ListarDetalleXBulto', err);
  //       });          
  //     }   
  //     setTimeout(() => {
  //       this.vSerie = "";
  //       this.selectAll(this.txtSerie);
  //     }, (500));    
  //   }, (err) => {
  //     console.log('E-Embalaje listar', err);
  //   });
  // }

}
