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
  
  @ViewChild('txtSerie', { read: ElementRef }) private txtSerie: ElementRef;
  vlistDetEmbalajeTop1: any;
  vlistAuxDetEmbalaje: any;
  vNroBulto: any;
  vNroBultoCeros: any;
  vSerie: any;
  vListaTransac: any;

  vlistTransacDetEmbalaje: any;
  vEmbalajePage02: any;
  vProducto: any;
  vCodProducto: any;
  rowCount: any;
  Id_UM: any;
  resultadoRegistroSerie: any;
  listDetalleXBulto: any = [];

  valorpopoverGlobal: boolean = false
  popoverGlobal: any;

  vNroItemVisual: number;
  vEmbalajePage03: any;
  vEmbalajeTotalPage03:any;
  vUltimoNroBulto: any;
  lstBultosDespacho: any;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public popoverCtrl: PopoverController, public sGlobal: GlobalServiceProvider, public sEmbalaje: EmbalajeServiceProvider) {
    debugger;
    //this.vlistDetEmbalajeTop1 = navParams.get('listDetEmbalajeTop1');
    //this.vlistAuxDetEmbalaje = navParams.get('listAuxDetEmbalaje');
    this.data = this.navParams.get('data');
    this.vNroBulto = this.vNroBultoCeros = navParams.get('nroBulto');
    this.vlistTransacDetEmbalaje = navParams.get('listTransacDetEmbalaje');
    this.vEmbalajePage02 = navParams.get('dataPage02');
    this.vNroItemVisual = navParams.get('nroItemVisual');
    this.vProducto = navParams.get('descProducto');
    // this.rowCount = this.vlistTransacDetEmbalaje.length;
    
    this.Id_UM = navParams.get('Id_UM');
    this.llenarNumeros();
  }


  goToEmbalajePage04(data) {
    debugger;
    this.vListaTransac = {
      'CantidadEmbalado': data.CantidadEmbalado,
      'CantidadPicking': data.CantidadPicking,
      'Id_Producto': data.Id_Producto,
      'Id_Tx': data.Id_Tx,
      'Item': data.Item,
      'Lote': data.Lote
    };

    this.navCtrl.push(EmbalajePage_04Page, {
      page: 10,
      //dataPageFiltro: this.vlistDetEmbalajeTop1,
      //dataTotalPage03: this.vlistAuxDetEmbalaje,
      nroBulto: this.vNroBulto,
      dataPage02: this.vEmbalajePage02,
      lstTransac: this.vListaTransac,
      nroItemVisual : this.vNroItemVisual
      //,nomProducto: this.vProducto
    });
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
    var resultSerie = false;

    for (var j = 0; j < this.listDetalleXBulto.length; j++) {
      if(this.vSerie == this.listDetalleXBulto[j].Serie){
        resultSerie = true;
      }                  
    }

    if(resultSerie){
      this.presentAlert("La Serie ya se encuentra en la lista.").then((resultAlert) => {
        if (resultAlert) {
          setTimeout(() => {
            this.vSerie = "";
            this.selectAll(this.txtSerie);
          }, (500));
        }
      })
    }
    else{
        var objEmbalaje = {
          'Id_Tx': this.vlistTransacDetEmbalaje[0].Id_Tx,
          'NroBulto': this.vNroBulto,
          'Id_Producto': this.vlistTransacDetEmbalaje[0].Id_Producto,
          'Id_UM': this.Id_UM,
          'Cantidad': 1,
          'Anulado': 0,
          'Id_RF': this.sGlobal.Id_TerminalRF,
          'Item': this.vlistTransacDetEmbalaje[0].Item,
          'Id_Almacen': this.sGlobal.Id_Almacen,
          'UsuarioRegistro': this.sGlobal.userName,
          'Id_UMP': 0,
          'Lote': this.vSerie
        };
          console.log(objEmbalaje,"datos a grabar")
        this.sEmbalaje.RegistrarProductoBulto(objEmbalaje).then((result) => {
          this.resultadoRegistroSerie = result;
          if(this.resultadoRegistroSerie.errNumber == 0){
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
                           
          this.ListarDetalleXBulto(this.vlistTransacDetEmbalaje[0].Id_Tx,this.vNroBulto);
                        
         });
    }
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
    this.navCtrl.push(EmbalajePage_05Page, {
      dataPageFiltro: this.vEmbalajePage03,
      dataNroBultoCeros: this.vNroBultoCeros,
      dataTotalPage03: this.vEmbalajeTotalPage03,
      dataNroBulto: this.vNroBulto,
      dataPage02: this.vEmbalajePage02,
      descProducto: this.vProducto,
      listTransacDetEmbalaje: this.vlistTransacDetEmbalaje
    });
  }
  
  goToEmbalajePage06() {    
    if(this.listDetalleXBulto.length > 0){
      this.navCtrl.push(EmbalajePage_06Page, {
        dataNroBulto: this.vNroBulto,
        dataNroBultoCeros: this.vNroBultoCeros,
        dataPage02: this.vEmbalajePage02,
        listTransacDetEmbalaje: this.vlistTransacDetEmbalaje,
        descProducto: this.vProducto,
        nroItemVisual: this.vNroItemVisual,
        data: this.data
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
    this.navCtrl.push(EmbalajePage_07Page, {
      dataNroBulto: this.vNroBulto,
      dataNroBultoCeros: this.vNroBultoCeros,
      dataPage02: this.vEmbalajePage02
    });
  }

  goToEmbalajePage09() {
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
    if(this.vNroBulto ==0){
      this.vNroBulto = this.vNroBulto + 1;
      this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
      let s = this.vNroBultoCeros + "";
      while (s.length < 3)
        this.vNroBultoCeros = s = "0" + s;
      return this.vNroBultoCeros;
    }else{      
      //this.vNroBulto = this.vNroBulto + 1;
      //this.vNroBultoCeros = parseInt(this.vNroBultoCeros) + 1;
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
    console.log(this.sGlobal.resultGrabarBulto,"FlagResultado Grabar");        
    if (this.sGlobal.resultGrabarBulto) {            
      this.getDataDetBultosEmbalaje();
    } 
    else{
     this.ListarDetalleXBulto(this.vlistTransacDetEmbalaje[0].Id_Tx,this.vNroBulto);
      this.sGlobal.resultGrabarBulto = false;          
    }
    setTimeout(() => {
      this.vSerie = "";
      this.selectAll(this.txtSerie);
    }, (500));    
  }    

  confirmacionBack(): void {            
    this.navCtrl.push(EmbalajePage_03Page, {
      dataPage02: this.vEmbalajePage02,
      data: this.data      
    });
  }

  getDataDetBultosEmbalaje() {
    this.ListarBultosDespacho(this.vEmbalajePage02.Id_Tx);   
  }

  ListarBultosDespacho(strId_Tx) {
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {    
      this.lstBultosDespacho = result;  
      
      this.vUltimoNroBulto = this.lstBultosDespacho[this.lstBultosDespacho.length - 1].NroBulto;           
      
      if(this.vUltimoNroBulto != this.vNroBulto){
        this.vNroBulto = this.vUltimoNroBulto;
        this.sEmbalaje.ListarDetalleXBulto(strId_Tx,this.vNroBulto).then((result) => {           
            this.listDetalleXBulto = result;        
            this.rowCount = this.listDetalleXBulto.length;        
        }, (err) => {
          console.log('ListarDetalleXBulto', err);
        });             
      }    
      else{
        this.incrementarNumeroBulto();                 
        this.sEmbalaje.ListarDetalleXBulto(strId_Tx,this.vNroBulto).then((result) => {           
          this.listDetalleXBulto = result;        
          this.rowCount = this.listDetalleXBulto.length;        
        }, (err) => {
          console.log('ListarDetalleXBulto', err);
        });          
      }   
      setTimeout(() => {
        this.vSerie = "";
        this.selectAll(this.txtSerie);
      }, (500));    
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

}
