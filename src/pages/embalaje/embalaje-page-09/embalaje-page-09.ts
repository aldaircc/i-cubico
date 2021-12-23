import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EmbalajePage_06Page } from '../embalaje-page-06/embalaje-page-06';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { EmbalajePage_10Page } from '../embalaje-page-10/embalaje-page-10';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';
import { EmbalajePage_12Page } from '../embalaje-page-12/embalaje-page-12';


/**
 * Generated class for the EmbalajePage_05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-09',
  templateUrl: 'embalaje-page-09.html',
})
export class EmbalajePage_09Page {
  detalle: string = "bultos";

  listDetBultosEmbalaje: any;
  lstDetalleBultoXBulto: any;
  vNroBulto: number;
  vNroBultoCeros: any;
  vNroBultoCerosItems: any;
  vEmbalajePage02: any
  vEmbalajePage03: any;
  vEmbalajeTotalPage03: any;
  vTotalDetalle: any = 1;
  vUltimoBulto: any;
  vNroItem: any = 0;
  vBultoSelect: any;
  vProducto: any;
  //vlistTransacDetEmbalaje:any;
  vLisTransacEmbalaje:any;
  vSaldo:any;  

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public sEmbalaje: EmbalajeServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vEmbalajePage03 = navParams.get('dataPageFiltro');
    this.vEmbalajeTotalPage03 = navParams.get('dataTotalPage03');
    this.vNroBulto = navParams.get('dataNroBulto');
    this.vNroBultoCeros = navParams.get('dataNroBultoCeros');
    this.vEmbalajePage02 = navParams.get('dataPage02');
    this.vProducto = navParams.get('descProducto');
    //this.vlistTransacDetEmbalaje = navParams.get('listTransacDetEmbalaje');
    this.sGlobal.resultGrabarBulto = false;
    this.vLisTransacEmbalaje = navParams.get('lstTransac');   
    this.vSaldo = navParams.get('vSaldo');   
           
    debugger;
  }

  getDataDetBultosEmbalaje() {
    this.ListarBultosDespacho(this.vEmbalajePage02.Id_Tx);
  }

  ListarBultosDespacho(strId_Tx) {
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {
      this.listDetBultosEmbalaje = result;
      for (let index = 0; index < this.listDetBultosEmbalaje.length; index++) {
        this.vTotalDetalle++;
        this.vUltimoBulto = this.listDetBultosEmbalaje[index].NroBulto;
        this.listDetBultosEmbalaje[index].NroBulto = this.llenarNumeros(this.listDetBultosEmbalaje[index].NroBulto);
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  getDataDetalleBultoXBulto() {
    this.ListarBultosDespachoDetalle(this.vEmbalajePage02.Id_Tx);
  }

  ListarBultosDespachoDetalle(strId_Tx) {
    this.sEmbalaje.ListarBultosDespachoDetalle(strId_Tx).then((result) => {
      debugger;
      this.lstDetalleBultoXBulto = result;
      for (let index = 0; index < this.lstDetalleBultoXBulto.length; index++) {
        this.lstDetalleBultoXBulto[index].NroBulto = this.llenarNumeros(this.lstDetalleBultoXBulto[index].NroBulto);
      }
      if (this.lstDetalleBultoXBulto.length > 0) {

      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  llenarNumeros(bulto) {
    debugger;
    let s = bulto + "";
    while (s.length < 3)
      this.vNroBultoCeros = s = "0" + s;
    return this.vNroBultoCeros;
  }

  goToEmbalajePage06() {
    debugger;
    this.navCtrl.push(EmbalajePage_06Page, {
      dataNroBulto: this.vNroBulto,
      dataNroBultoCeros: this.vNroBultoCeros,
      dataPage02: this.vEmbalajePage02
    });
  }

  goToEmbalajePage10() {        
    debugger;    
    var a = this.vEmbalajePage03;
    if (this.vBultoSelect) {           
      if ((this.vEmbalajePage03.FlagLotePT == 1 && this.vEmbalajePage03.FlagSeriePT == 0) || (this.vEmbalajePage03.FlagLotePT == 0 && this.vEmbalajePage03.FlagSeriePT == 0)) {
        var nroBulto = parseInt(this.vBultoSelect.NroBulto); 
        this.navCtrl.push(EmbalajePage_04Page, {       
          page: 9,
          nroBulto: nroBulto,
          dataPage02: this.vEmbalajePage02,
          // lstTransac: this.vEmbalajePage03,
          // lstProductSelect: this.vListaProductoSelect,
          lstTransac: this.vLisTransacEmbalaje,
          nroItemVisual: this.vBultoSelect.NroItem,    
        });
      }
      else{
        if ((this.vEmbalajePage03.FlagSeriePT == 1 && this.vEmbalajePage03.FlagLotePT == 0) || (this.vEmbalajePage03.FlagLotePT == 1 && this.vEmbalajePage03.FlagSeriePT == 1)) {                        
          var nroBulto = parseInt(this.vBultoSelect.NroBulto);      
          this.navCtrl.push(EmbalajePage_10Page, {
            page: 9,
            nroBulto: nroBulto,        
            dataPage02: this.vEmbalajePage02,
            descProducto: this.vProducto,
            nroItemVisual: this.vBultoSelect.NroItem,           
            item: this.vBultoSelect.Item,
            //listTransacDetEmbalaje: this.vlistTransacDetEmbalaje,   
            dataPageFiltro: this.vEmbalajePage03,     
            vSaldo: this.vSaldo    
          });
        }
      }
    }
    else {
     alert("Debe seleccionar un bulto")
    }
  }

  goToEmbalajePage12(objDetBultosEmbalaje) {    
    this.vNroBultoCerosItems = objDetBultosEmbalaje.NroBulto;
    this.llenarNumeros(objDetBultosEmbalaje.NroBulto);
    this.navCtrl.push(EmbalajePage_12Page, {
      dataPageFiltro: this.vEmbalajePage03,
      dataTotalPage03: this.vEmbalajeTotalPage03,
      dataNroBulto2: this.vNroBulto,
      dataNroBulto: objDetBultosEmbalaje.NroBulto,
      dataNroBultoCeros: this.vNroBultoCerosItems,
      dataPage02: this.vEmbalajePage02,
    });
  }

  mostrarConfirmacion(message, titulo) {
    let alertConfirmacion = this.alertCtrl.create({
      title: titulo,
      message: message,
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });
    alertConfirmacion.present();
  }


  mostrarAlerta(objDetBultoXBulto) {      
    if(this.lstDetalleBultoXBulto[this.lstDetalleBultoXBulto.length-1].NroBulto != objDetBultoXBulto.NroBulto){
      this.mostrarConfirmacion("No se puede eliminar porque hay bultos superiores", "Eliminar Bulto");
      this.vNroItem = 0;
    }
    else {

      var message = "";
      message = "¿Desea eliminar bulto?";

      let alert = this.alertCtrl.create({
        title: 'Eliminar Bulto',
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.vNroItem = 0;
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              console.log('Buy clicked');

              var objEmbalaje = {
                'Id_Tx': objDetBultoXBulto.Id_Tx,
                'NroBulto': objDetBultoXBulto.NroBulto,
                'Id_Producto': objDetBultoXBulto.Id_Producto,
                'Id_UM': objDetBultoXBulto.Id_UM,
                'Cantidad': objDetBultoXBulto.Cantidad,
                'Anulado': 1,
                'Id_RF': this.sGlobal.Id_TerminalRF,
                'Item': objDetBultoXBulto.Item,
                'Id_Almacen': 2,
                'UsuarioRegistro': this.sGlobal.userName,
                'Id_UMP': 0,
                'Lote': objDetBultoXBulto.LoteLab
              };

              this.sEmbalaje.RegistrarProductoBulto(objEmbalaje).then((result) => {
                debugger;
                console.log(result);
                var respuesta: any = result;

                this.mostrarConfirmacion(respuesta.message, "Confirmación");
                this.getDataDetBultosEmbalaje();
                this.getDataDetalleBultoXBulto();
                this.vNroItem = 0;                
              });

            }
          }
        ]
      });
      alert.present();
    }
  }

  eliminarBulto(objDetBultoXBulto) {
    this.mostrarAlerta(objDetBultoXBulto);
  }

  ionViewWillEnter() {
    this.getDataDetBultosEmbalaje();
    this.getDataDetalleBultoXBulto();    
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  selectItem(obj): void {
    this.vBultoSelect = obj;
    this.presentToast("El bulto " + obj.NroBulto + " fue seleccionado.")
  }


  EliminarPacking(objDetBultosEmbalaje) {        
    objDetBultosEmbalaje.Lote = objDetBultosEmbalaje.LoteLab;
    this.mostrarAlertaEliminarPacking(objDetBultosEmbalaje);
  }

  mostrarAlertaEliminarPacking(objDetBultosEmbalaje) {
    var message = "";
    message = "¿Desea eliminar el bulto " +objDetBultosEmbalaje.NroBulto +  "?";

    let alert = this.alertCtrl.create({
      title: 'Eliminar Bulto',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar clicked');
            console.log(objDetBultosEmbalaje);            
            this.sEmbalaje.EliminarPacking(objDetBultosEmbalaje).then((result) => {              
              console.log(result);
              var respuesta: any = result;
              this.mostrarConfirmacion(respuesta.message,"Confirmación");
              this.getDataDetBultosEmbalaje();
              this.getDataDetalleBultoXBulto();
            });

          }
        }
      ]
    });
    alert.present();

  }


}
