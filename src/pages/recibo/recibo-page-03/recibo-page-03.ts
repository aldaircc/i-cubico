import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, IonicFormInput, Button } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { isNullOrUndefined } from '../../../../node_modules/@swimlane/ngx-datatable/release/utils';
import { ReciboPage_04Page } from '../recibo-page-04/recibo-page-04';

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
  codeBar:string;
  cantidadRec:number = 0;
  cantidadAve:number = 0;
  cantidadBulto:number = 0;

  cantidad:number = 0;
  isDisabledSave:boolean = true;

  //For changing background of section
  isBgRed:boolean = false;
  isBgYellow:boolean = false;
  isBgGreen:boolean = false;

  @ViewChild('iCodeBar') iCodeBar;
  @ViewChild('iCantidadRecibida') iCantidadRecibida;
  @ViewChild('iBtnSave') iBtnSave:Button;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController , public sRecibo: ReciboServiceProvider) {
    this.vReciboPage02 = navParams.get('dataPage02');
    console.log('data received', this.vReciboPage02);
  }

  ionViewDidLoad() {

  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
  
    /**toast.onDidDismiss(() => {
      debugger;
      console.log('Dismissed toast');
      this.iCodeBar.setFocus();
    });**/
  
    toast.present();
  }

  validarCodeBar(){
    debugger;
    if (this.codeBar.trim().length >= 12){

      if(this.vReciboPage02.FlagSeriePT == true){
        
        if(this.vReciboPage02.Id_TipoMovimiento === 0){
          this.presentToast("Esta transacción no tiene tipo de movimiento");
          return;
        }
        
        if(this.vReciboPage02.Id_TipoMovimiento === 11 || 
          this.vReciboPage02.Id_TipoMovimiento === 13 || 
          this.vReciboPage02.Id_TipoMovimiento === 14){
            this.sRecibo.validarReciboTransferenciaSerie(this.vReciboPage02.NumOrden, this.codeBar, 
              this.vReciboPage02.Item).then((result)=>{
              debugger;
              let rpta :any = result;
              if(rpta.errNumber != 0){
                this.isBgRed = true;
                this.isBgYellow = false;
                this.isDisabledSave = false; //Deshabilitar el boton de guardar
                this.cantidadRec = 0;//edtCantRecibida.setText("");
                this.codeBar = ""; //edtCodBar.setText("");
                this.iCodeBar.setFocus(); //edtCodBar.requestFocus();
                this.presentToast(rpta.message);
              }
            }, (err)=>{
              console.log('E-validarReciboTransferenciaSerie', err);
            });
        }else{
          this.sRecibo.validarReciboTransferenciaSerie(this.vReciboPage02.NumOrden, this.codeBar, 
            this.vReciboPage02.Item).then((result)=>{
              let rpta : any = result;
              if(rpta.errNumber != 0){
                this.isBgRed = true;
                this.isBgYellow = false;
                this.codeBar = "";
                this.cantidadRec = 0;
                this.iCodeBar.setFocus();
                this.presentToast(rpta.message);
              }
          });
        }

        // edtCodBar.setTag(edtCodBar.getText());
        // edtCodBar.setText(edtCodBar.getTag().toString());
        this.isBgRed = false;
        this.isBgYellow = true;
        this.cantidad = 1;
        this.cantidadRec = this.cantidad;
        this.iCantidadRecibida.setFocus();

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
              'UA_CodBarra': this.codeBar,
              'Id_Producto': this.vReciboPage02.Id_Producto,
              'Item': this.vReciboPage02.Item,
              'Id_Almacen': 1
            };
            
            this.sRecibo.validarUAReciboTransferencia(ua).then((result)=>{
              debugger;
              console.log('validarUAReciboTransferencia', result);
              this.cantidad = 0;
              let rpta:any = result;
              if(rpta.errNumber === 0){                

                if(this.cantidad === 0){
                  this.cantidad = rpta.valor1;
                }

                  this.cantidadRec = rpta.valor1;
                  //edtCodBar.setTag(edtCodBar.getText());
                  this.iCantidadRecibida.setFocus();
                  this.isBgYellow = true;
                  this.isBgRed = false;
                  if(this.vReciboPage02.bolAutomatic === true){
                    this.saveTransaction();
                  }

              }else if(rpta.errNumber === 1){
                  this.isBgRed = true;
                this.isBgYellow = false;
                  this.iCodeBar.setFocus();
                  this.presentToast(rpta.message);
              }else if(rpta.errNumber === -1){
                  this.isBgRed = true;
                this.isBgYellow = false;
                  this.presentToast(rpta.message);
                  this.iCodeBar.setFocus();
              }else{
                this.isBgRed = true;
                this.isBgYellow = false;
                  this.presentToast(rpta.message);
                  this.iCodeBar.setFocus();
              }
            });

          }else{

            ua = {
              'UA_CodBarra': this.codeBar,
              'Id_Producto': this.vReciboPage02.Id_Producto,
              'Item': this.vReciboPage02.Item
            }
            this.sRecibo.validarUARecibo(ua).then((result)=>{
              
              debugger;
              this.iCodeBar.setFocus();
              let rpta:any = result;

              if(rpta.errNumber === 0){

                if(this.cantidad === 0){
                  this.cantidad = rpta.valor1;
                }

                this.cantidadRec = rpta.valor1;
                this.iCodeBar.setTag(this.codeBar);
                this.iCantidadRecibida.setFocus();
                this.iCantidadRecibida.selectAll();
                
              }else if(rpta.errNumber === 1){
                this.isBgRed = true;
                this.isBgYellow = false;
                this.iCodeBar.setTag("");
                this.presentToast(rpta.message);
                this.iCodeBar.setFocus();
                this.iCodeBar.selectAll();
              }else if(rpta.errNumber === -1){
                //this.iCodeBar.setTag("");
                this.isBgRed = true;
                this.isBgYellow = false;
                this.presentToast(rpta.message);
                this.iCodeBar.setFocus();
              }else{
                this.isBgRed = true;
                this.isBgYellow = false;
                this.presentToast(rpta.message);
                this.iCodeBar.setFocus();
              }
            });
          }
      }
    }else{
      this.presentToast("Ingrese codigo de barras correcto");
    }
  }

  validarCamposIngreso(){
    var result:boolean = true;
    debugger;
    if(this.isDisabledSave === false){
        result = false;
        return result;
    }

    if(this.codeBar.trim() === ""){
      this.presentToast('Ingrese el código de barras');
      this.iCodeBar.setFocus();
      result = false;
      return result;
    }

    if(this.cantidadRec === 0 || isNullOrUndefined(this.cantidadRec)){
      this.presentToast("Ingrese el cantidad");
      this.iCantidadRecibida.setFocus();
      result = false;
      return result;
    }

    if(this.vReciboPage02.FlagSeriePT === false){
      this.presentToast('La UA no es correcta');
      this.iCantidadRecibida.setFocus();
      result = false;
      return result;
      // if (!edtCodBar.getText().toString().trim().equals(edtCodBar.getTag().toString().trim())){
      //   Toast.makeText(this, "La UA no es correcta.", Toast.LENGTH_SHORT).show();
      //   edtCantRecibida.requestFocus();
      //   edtCantRecibida.selectAll();
      //   result = false;
      //   return result;
      // }
    }

    if(this.vReciboPage02.Id_TipoMovimiento != 3){
        if(this.codeBar.trim()===""){
          this.iCodeBar.setFocus();
          result = false;
          return result;
        }
    }
    /**
        if (edtAveriado.getText().toString().trim().isEmpty()){
            edtAveriado.setText(decFormatt.format(0));
        }
    **/
  }

  saveTransaction(){
    debugger;
    if(!this.validarCamposIngreso()){
      console.log('hay campos pendientes de llenar');
    }
    /**
    TxUbicacion objTxUbi = new TxUbicacion();
        String result = "";
        objReceived.setTipoAlmacenaje((objReceived.getTipoAlmacenaje() == null) ? "0" : objReceived.getTipoAlmacenaje() );
        if (Integer.parseInt(objReceived.getTipoAlmacenaje()) != 3){
            presenter.registerUATransito(objTxUbi);
        } 
    **/
      var objTxUbi = {
        'TipoUbicacion': 1,
        'Id_Producto': this.vReciboPage02.Id_Producto,
        'Id_Ubicacion_Origen': 0,
        'Id_Almacen': 1,//(Global.IdWarehouse);
        'Id_Tx': this.vReciboPage02.Id_Tx,
        'Prioridad': 10,
        'Observacion': ' from ionic ',
        'UsuarioModificacion': 'ADMIN' //(Global.userName);
      };

      this.sRecibo.registrarUATransito(objTxUbi).then((result)=>{
        let rpta : any = result;
        
        var sumCantidad = this.cantidadRec +  this.vReciboPage02.CantidadOperacion;

        if(this.cantidad != 0){
          if(this.cantidad != this.cantidadRec){
            this.presentToast('Esta cantidad no corresponde');
            return;
          }
        }

        let objUA = {
          'UA_CodBarra' : this.codeBar, //objUA.setUA_CodBarra(edtCodBar.getText().toString());
          'Id_Tx' : this.vReciboPage02.Id_Tx,  //objUA.setId_Tx(objReceived.getId_Tx());
          'Id_Producto' : this.vReciboPage02.Id_Producto,  //objUA.setId_Producto(objReceived.getId_Producto());
          'LoteLab' : this.vReciboPage02.LoteLab,  //objUA.setLoteLab(objReceived.getLote());
          'Serie' : (this.vReciboPage02.FlagSeriePT === true) ? this.codeBar : null,  //objUA.setSerie( (objReceived.getFlagSeriePT()) ? edtCodBar.getText().toString(): null);
          'FechaEmision' : this.vReciboPage02.FechaEmision, //objUA.setFechaEmision(fEmision);
          'FechaVencimiento' : this.vReciboPage02.FechaVencimiento,  //objUA.setFechaVencimiento(fVencimiento);
          'Cantidad' : this.cantidadRec,  //objUA.setCantidad(Double.parseDouble(edtCantRecibida.getText().toString()));
          'Saldo' : this.cantidadRec,  //objUA.setSaldo(Double.parseDouble(edtCantRecibida.getText().toString()));
          'CantidadAveriada' : this.cantidadAve,  //objUA.setCantidadAveriada(Double.parseDouble(edtAveriado.getText().toString()));
          'Id_TerminalRF' : 1,  //objUA.setId_TerminalRF(1); //control.ParametrosLogeo.RF_ID
          'Item' : this.vReciboPage02.Item,  //objUA.setItem(objReceived.getItem());
          'Id_Ubicacion' : 0,  //objUA.setId_Ubicacion(0);
          'Id_Tx_Ubi' : (result === "") ? null: result,  //objUA.setId_Tx_Ubi((result == "") ? null: result);
          'Observacion' : '-AiYoNik-',  //objUA.setObservacion(edtObserv.getText().toString());
          'UsuarioRegistro' : 'ADMIN',  //objUA.setUsuarioRegistro("ADMIN"); //Global.userName
          'Id_Almacen' : 1,  //objUA.setId_Almacen(1); //Global.IdWarehouse
          'Id_UM': this.vReciboPage02.Id_UM,  //objUA.setId_UM(objReceived.getId_UMB());
          'FlagAnulado': this.vReciboPage02.FlagAnulado //objUA.setFlagAnulado(false); 
        };

        if(this.vReciboPage02.Id_TipoMovimiento === 0){
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
            this.sRecibo.registrarUA(objUA).then(result=>{
              this.evaluarResultado(result);
            });
        }
      });

  }

  evaluarResultado(message){

    if(message.errNumber === 0){
      let valor1 = parseFloat(message.valor1);
      let saldo = this.vReciboPage02.Saldo;
      let bultos = this.cantidadBulto + 1;
      this.vReciboPage02.Saldo = this.vReciboPage02.Saldo - valor1;
      this.vReciboPage02.CantidadOperacion = bultos * valor1;
      this.isBgRed = false;
      this.isBgYellow = false;
      this.isBgGreen = true;
      this.iCodeBar.setFocus();
      this.cantidadAve = 0;
      this.cantidadRec = 0;
      
      if(saldo == 0){
        this.presentToast('Item completo');

      }else if(message.errNumber == 1){
        this.isBgRed = true;
        this.isBgYellow = false;
        this.isBgGreen = false;
        this.presentToast(message.message);
        this.iCodeBar.setFocus();
      }else if(message.errNumber == -1){
        this.isBgRed = true;
        this.isBgYellow = false;
        this.isBgGreen = false;
        this.presentToast(message.message);
        this.iCodeBar.setFocus();
      }else{
        this.isBgRed = true;
        this.isBgYellow = false;
        this.isBgGreen = false;
        this.presentToast('Operación fallida, intente otra vez');
        this.iCodeBar.setFocus();
      }
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
      "Cuenta" : this.vReciboPage02.Cuenta //Nuevo campo
    };

    this.navCtrl.push(ReciboPage_04Page, {
      dataPage03: obj
    });
  }
}