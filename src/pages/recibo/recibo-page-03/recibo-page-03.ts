import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, IonicFormInput, Button, PopoverController, ModalController } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { isNullOrUndefined } from '../../../../node_modules/@swimlane/ngx-datatable/release/utils';
import { ReciboPage_04Page } from '../recibo-page-04/recibo-page-04';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { PopoverReciboComponent } from '../../../components/popover-recibo/popover-recibo';
import { EtiquetadoPage_01Page } from '../../etiquetado/etiquetado-page-01/etiquetado-page-01';

/**
 * Generated class for the ReciboPage_03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo-page-03',
  templateUrl: 'recibo-page-03.html',
})
export class ReciboPage_03Page {

  vReciboPage02:any;
  codeBar:any = { 'Text' : '', 'Tag' : '' };
  cantidadRec:number = 0;
  cantidadAve:number = 0;
  cantidadBulto:number = 0;

  cantidad:number = 0;
  isDisabledSave:boolean = true;
  bolUaValida: boolean = false;

  isBgRed:boolean = false;
  isBgYellow:boolean = false;
  isBgGreen:boolean = false;

  @ViewChild('iBtnSave') iBtnSave : Button;
  @ViewChild('iCodeBar', { read: ElementRef }) private iCodeBar:ElementRef;
  @ViewChild('iCantidadRecibida', { read: ElementRef }) private iCantidadRecibida:ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController , public sRecibo: ReciboServiceProvider,
    public popoverCtrl: PopoverController, public modalCtrl: ModalController, public sGlobal: GlobalServiceProvider) {
    this.vReciboPage02 = navParams.get('dataPage02');
  }

  ionViewWillEnter(){
    this.selectAll(this.iCodeBar, 500);
  }

  selectAll(el: ElementRef, time){
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(()=>{
      nativeEl.select();
    }, time);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.present();
  }

  validarCodeBar(){

    if (this.codeBar.Text.trim().length >= 12){

      if(this.vReciboPage02.FlagSeriePT == true){
        
        if(this.vReciboPage02.Id_TipoMovimiento === 0){
          this.presentToast("Esta transacción no tiene tipo de movimiento");
          return;
        }
        
        if(this.vReciboPage02.Id_TipoMovimiento === 11 || 
          this.vReciboPage02.Id_TipoMovimiento === 13 || 
          this.vReciboPage02.Id_TipoMovimiento === 14){
            this.sRecibo.validarReciboTransferenciaSerie(this.vReciboPage02.NumOrden, this.codeBar.Text, 
              this.vReciboPage02.Item).then((result)=>{
              debugger;
              let rpta :any = result;
              if(rpta.errNumber != 0){
                this.isBgRed = true;
                this.isBgYellow = false;
                this.isDisabledSave = false; 
                this.bolUaValida = true;
                this.cantidadRec = 0;
                this.codeBar.Text = "";
                this.selectAll(this.iCodeBar, 500);
                this.presentToast(rpta.message);
              }else{
                this.bolUaValida = false;
              }
            }, (err)=>{
              console.log('E-validarReciboTransferenciaSerie', err);
            });
        }else{
          this.sRecibo.validarReciboSerie(this.codeBar.Text, this.vReciboPage02.Id_Tx, this.vReciboPage02.Id_Producto).then(result=>{
              let res: any = result;
              if(res.errNumber != 0){
                this.codeBar.Text = "";
                this.cantidadRec = 0;
                this.bolUaValida = true;
                this.selectAll(this.iCodeBar, 500);
                this.presentToast(res.message);
              }else{
                this.bolUaValida = false;
              }
          });
        }

        this.codeBar.Tag = this.codeBar.Text;
        this.codeBar.Text = this.codeBar.Tag;
        this.isBgRed = false;
        this.isBgYellow = true;
        this.cantidad = 1;
        this.cantidadRec = this.cantidad;
        this.selectAll(this.iCantidadRecibida, 500);

        if(this.vReciboPage02.bolAutomatic === true){
          this.saveTransaction();
        }
      }else{

        if(this.vReciboPage02.Id_TipoMovimiento === 0){
          this.presentToast('Esta transacción no tiene tipo de movimiento');
          return;
        }

        var ua: any;

        if(this.vReciboPage02.Id_TipoMovimiento == 11 || 
          this.vReciboPage02.Id_TipoMovimiento == 13 || 
          this.vReciboPage02.Id_TipoMovimiento == 14){
            ua = {
              'Id_Tx': this.vReciboPage02.Id_Tx,
              'UA_CodBarra': this.codeBar.Text,
              'Id_Producto': this.vReciboPage02.Id_Producto,
              'Item': this.vReciboPage02.Item,
              'Id_Almacen': this.sGlobal.Id_Almacen
            };
            
            this.sRecibo.validarUAReciboTransferencia(ua).then((result)=>{
              debugger;
              this.cantidad = 0;
              let rpta:any = result;
              if(rpta.errNumber === 0){                

                if(this.cantidad === 0){
                  this.cantidad = rpta.valor1;
                }

                  this.cantidadRec = rpta.valor1;
                  this.codeBar.Tag = this.codeBar.Text;
                  this.selectAll(this.iCantidadRecibida, 500);
                  this.isBgYellow = true;
                  this.isBgRed = false;
                  if(this.vReciboPage02.bolAutomatic === true){
                    this.saveTransaction();
                  }

              }else if(rpta.errNumber === 1){
                  this.isBgRed = true;
                  this.isBgYellow = false;
                  this.selectAll(this.iCodeBar, 500);
                  this.presentToast(rpta.message);
              }else if(rpta.errNumber === -1){
                  this.isBgRed = true;
                  this.isBgYellow = false;
                  this.presentToast(rpta.message);
                  this.selectAll(this.iCodeBar, 500);
              }else{
                this.isBgRed = true;
                this.isBgYellow = false;
                  this.presentToast(rpta.message);
                  this.selectAll(this.iCodeBar, 500);
              }
            });

          }else{

            ua = {
              'UA_CodBarra': this.codeBar.Text,
              'Id_Producto': this.vReciboPage02.Id_Producto,
              'Item': this.vReciboPage02.Item
            }
            this.sRecibo.validarUARecibo(ua).then((result)=>{
              debugger;
              this.cantidad = 0;
              this.selectAll(this.iCodeBar, 500);
              let rpta:any = result;

              if(rpta.errNumber === 0){

                if(this.cantidad === 0){
                  this.cantidad = rpta.valor1;
                }

                this.isBgRed = false;
                this.isBgYellow = true;
                this.bolUaValida = true;
                this.cantidadRec = rpta.valor1;
                this.codeBar.Tag = this.codeBar.Text;
                this.selectAll(this.iCantidadRecibida, 500);

                if(this.vReciboPage02.bolAutomatic == true){
                  this.saveTransaction();
                }

              }else if(rpta.errNumber === 1){
                this.isBgRed = true;
                this.isBgYellow = false;
                this.codeBar.Tag = '';
                this.presentToast(rpta.message);
                this.bolUaValida = false;
                this.selectAll(this.iCodeBar, 500);
              }else if(rpta.errNumber === -1){
                this.codeBar.Tag = '';
                this.isBgRed = true;
                this.isBgYellow = false;
                this.presentToast(rpta.message);
                this.bolUaValida = false;
                this.selectAll(this.iCodeBar, 500);
              }else{
                this.isBgRed = true;
                this.isBgYellow = false;
                this.presentToast(rpta.message);
                this.bolUaValida = false;
                this.selectAll(this.iCodeBar, 500);
              }
            });
          }
      }
    }else{
      this.presentToast("Ingrese codigo de barras correcto");
      this.isBgRed = true;
      this.isBgYellow = false;
      this.bolUaValida = false;
      this.selectAll(this.iCodeBar, 500);
    }
  }

  validarCamposIngreso(){
    var result:boolean = true;
    if(this.isDisabledSave === false){
        result = false;
        return result;
    }

    if(isNullOrUndefined(this.codeBar.Text) || this.codeBar.Text.trim() == ""){
      this.presentToast('Ingrese el código de barras');
      this.selectAll(this.iCodeBar, 500);
      result = false;
      return result;
    }

    if(isNullOrUndefined(this.cantidadRec) || this.cantidadRec === 0){
      this.presentToast("Ingrese el cantidad");
      this.selectAll(this.iCantidadRecibida, 500);
      result = false;
      return result;
    }

    if(!this.vReciboPage02.FlagSeriePT){
      if(!(this.codeBar.Text.trim() == this.codeBar.Tag.trim())){
        this.presentToast('La UA no es correcta');
        this.selectAll(this.iCantidadRecibida, 500);
        result = false;
        return result;
      }
      // if (!edtCodBar.getText().toString().trim().equals(edtCodBar.getTag().toString().trim())){
      //   Toast.makeText(this, "La UA no es correcta.", Toast.LENGTH_SHORT).show();
      //   edtCantRecibida.requestFocus();
      //   edtCantRecibida.selectAll();
      //   result = false;
      //   return result;
      // }
    }

    if(this.vReciboPage02.Id_TipoMovimiento != 3){
        if(this.codeBar.Text.trim() == ""){
          this.presentToast('Ingrese código de barras UA.');
          this.selectAll(this.iCodeBar, 500);
          result = false;
          return result;
        }
    }

    if(isNullOrUndefined(this.cantidadAve)){
      this.cantidadAve = 0;
    }
    return result;
  }

  saveTransaction(){
    if(!this.validarCamposIngreso()){
      console.log('hay campos pendientes de llenar');
      return;
    }
    
      var objTxUbi = {
        'TipoUbicacion': 1,
        'Id_Producto': this.vReciboPage02.Id_Producto,
        'Id_Ubicacion_Origen': 0,
        'Id_Almacen': this.sGlobal.Id_Almacen,
        'Id_Tx': this.vReciboPage02.Id_Tx,
        'Prioridad': 10,
        'Observacion': ' from ionic ',
        'UsuarioModificacion': this.sGlobal.userName
      };

      this.vReciboPage02.TipoAlmacenaje = (this.vReciboPage02.TipoAlmacenaje == undefined) ? 0 : this.vReciboPage02.TipoAlmacenaje;
      debugger;
      this.sRecibo.registrarUATransito(objTxUbi).then((result)=>{
        let rpta : any = result;
        debugger;
        var sumCantidad = this.cantidadRec +  this.vReciboPage02.CantidadOperacion;

        if(this.cantidad != 0){
          if(this.cantidad != this.cantidadRec){
            this.presentToast('Esta cantidad no corresponde');
            this.selectAll(this.iCantidadRecibida, 500);
            return;
          }
        }

        let objUA = {
          'UA_CodBarra' : this.codeBar.Text,
          'Id_Tx' : this.vReciboPage02.Id_Tx,
          'Id_Producto' : this.vReciboPage02.Id_Producto,
          'LoteLab' : this.vReciboPage02.LoteLab,
          'Serie' : (this.vReciboPage02.FlagSeriePT === true) ? this.codeBar.Text : null,
          'FechaEmision' : this.vReciboPage02.FechaEmision,
          'FechaVencimiento' : this.vReciboPage02.FechaVencimiento,
          'Cantidad' : this.cantidadRec,
          'Saldo' : this.cantidadRec,
          'CantidadAveriada' : this.cantidadAve,
          'Id_TerminalRF' : 1,
          'Item' : this.vReciboPage02.Item,
          'Id_Ubicacion' : 0,
          'Id_Tx_Ubi' : (result === "") ? null: result,
          'Observacion' : '',
          'UsuarioRegistro' : this.sGlobal.userName,
          'Id_Almacen' : this.sGlobal.Id_Almacen,
          'Id_UM': this.vReciboPage02.Id_UM,
          'FlagAnulado': false
        };

        if(this.vReciboPage02.Id_TipoMovimiento == 0){
          this.presentToast('Esta transacción no tiene tipo de movimiento');
          return;
        }

        if(this.vReciboPage02.Id_TipoMovimiento === 11 ||
           this.vReciboPage02.Id_TipoMovimiento === 13 ||
           this.vReciboPage02.Id_TipoMovimiento === 14){
            this.sRecibo.registrarUATransferencia(objUA).then(result=>{
              this.evaluarResultado(result);
            });
        }else{
          debugger;
            this.sRecibo.registrarUA(objUA).then(result=>{
              this.evaluarResultado(result);
            });
        }
      });
  }

  evaluarResultado(message){
    debugger;
    if(message.errNumber === 0){
      let valor1 = parseFloat(message.valor1);
      let saldo = this.vReciboPage02.Saldo;
      let bultos = this.cantidadBulto + 1;
      this.vReciboPage02.Saldo = this.vReciboPage02.Saldo - valor1;
      this.vReciboPage02.CantidadOperacion = bultos * valor1;
      this.isBgRed = false;
      this.isBgYellow = false;
      this.isBgGreen = true;
      this.selectAll(this.iCodeBar, 500);
      this.cantidadAve = 0;
      this.cantidadRec = 0;
      
      if(saldo == 0){
        this.presentToast('Item completo');
        this.selectAll(this.iCodeBar, 500);
      }
    }else if(message.errNumber == 1){
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.presentToast(message.message);
      this.selectAll(this.iCodeBar, 500);
    }else if(message.errNumber == -1){
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.presentToast(message.message);
      this.selectAll(this.iCodeBar, 500);
    }else{
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.presentToast('Operación fallida, intente otra vez');
      this.selectAll(this.iCodeBar, 500);
    }
  }

  goToReciboPage04(){

    let obj = {
      "Id_Tx" : this.vReciboPage02.Id_Tx,
      "NumOrden" : this.vReciboPage02.NumOrden,
      "Codigo" : this.vReciboPage02.Codigo,
      "Articulo" : this.vReciboPage02.Descripcion,
      "Id_Articulo" : this.vReciboPage02.Id_Producto,
      "UM" : this.vReciboPage02.UM,
      "Id_UM" : this.vReciboPage02.Id_UM,
      "Fecha_Emi" : this.vReciboPage02.Fecha_Emi,
      "Fecha_Venci" : this.vReciboPage02.Fecha_Venci,
      "Lote" : this.vReciboPage02.Lote,
      "CantPedida" : this.vReciboPage02.CantPedida,
      "CantRecib" : this.vReciboPage02.CantidadOperacion,
      "Saldo" : this.vReciboPage02.Saldo,
      "Item" : this.vReciboPage02.Item,
      "Factor" : this.vReciboPage02.Factor,
      "FlagSeriePT" : this.vReciboPage02.FlagSeriePT,
      "Id_TipoMovimiento" : this.vReciboPage02.Id_TipoMovimiento,
      "bolAutomatic" : this.vReciboPage02.bolAutomatic,
      "currentSaldo" : this.vReciboPage02.Saldo,
      "Cuenta" : this.vReciboPage02.Cuenta
    };

    this.navCtrl.push(ReciboPage_04Page, {
      dataPage03: obj
    });
  }

  presentReciboPopover(myEvent){
    debugger;
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 13});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      debugger;
      if(popoverData == 1){
        //this.showModalIncidencia(this.vReciboPage01);
        console.log('data para imprimir', this.vReciboPage02);
        this.navigateToEtqCajaLpn(this.vReciboPage02);
      }
    });
  }

  navigateToEtqCajaLpn(data){
    let objEtq = {
    "LoteLab": data.Lote,
    "Id_Producto": data.Id_Producto,
    "Id_UM": data.UM,
    "CantidadPedida": data.CantidadPedida,
    "Codigo": data.Codigo,
    "Articulo": data.Articulo, //Articulo
    "UM": data.UM,
    "Cliente": data.Cliente,
    "UM_Base": data.UM_Base,
    "TipoAlmacenaje": data.TipoAlmacenaje,
    "Item": data.Item,
    "Acceso": 0,
    "NroDoc": data.NroDoc,
    "FecEmi": data.FecEmi,
    "FecVen": data.FecVen,
    "FlagSerie": data.FlagSerie,
    "FlagLote": data.FlagLote,
    "CondicionAlmac": data.CondicionAlmac,
    "Condicion": data.Condicion,
    "Id_Condicion": data.Id_Condicion,
    "Id_Cliente": data.Id_Cliente,
    "idTipoMovimiento": data.idTipoMovimiento,
    "IdCuentaLPN": data.IdCuentaLPN,
    "Id_SubAlmacen": data.Id_SubAlmacen
  }

    let etqModal = this.modalCtrl.create(EtiquetadoPage_01Page, { vEtq: objEtq });
    etqModal.onDidDismiss(data => {
      console.log("Data retornada del modal", data);
    });
    etqModal.present();
  }
}