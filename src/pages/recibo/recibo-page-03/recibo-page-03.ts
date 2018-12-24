import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, IonicFormInput, Button } from 'ionic-angular';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { isNullOrUndefined } from '../../../../node_modules/@swimlane/ngx-datatable/release/utils';

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
    console.log('ionViewDidLoad ReciboPage_03Page');
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

      if(this.vReciboPage02.FlagSeriePT === true){
        
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

        if(this.vReciboPage02.Id_TipoMovimiento === 11 || 
          this.vReciboPage02.Id_TipoMovimiento === 13 || 
          this.vReciboPage02.Id_TipoMovimiento === 14){
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
                  //lySection03.setBackgroundResource(R.color.redColor);
                  this.isBgRed = true;
                this.isBgYellow = false;
                  this.iCodeBar.setFocus();
                  this.presentToast(rpta.message);
              }else if(rpta.errNumber === -1){
                  //lySection03.setBackgroundResource(R.color.redColor);
                  this.isBgRed = true;
                this.isBgYellow = false;
                  this.presentToast(rpta.message);
                  this.iCodeBar.setFocus();
              }else{
                //lySection03.setBackgroundResource(R.color.redColor);
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
                //lySection03.setBackgroundResource(R.color.redColor);
                this.isBgRed = true;
                this.isBgYellow = false;
                this.iCodeBar.setTag("");
                this.presentToast(rpta.message);
                this.iCodeBar.setFocus();
                this.iCodeBar.selectAll();
              }else if(rpta.errNumber === -1){
                //lySection03.setBackgroundResource(R.color.redColor);
                //this.iCodeBar.setTag("");
                this.isBgRed = true;
                this.isBgYellow = false;
                this.presentToast(rpta.message);
                this.iCodeBar.setFocus();
              }else{
                //lySection03.setBackgroundResource(R.color.redColor);
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
        //vReciboPage02.CantPedida

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
            //presenter.registerUATransferencia(objUA);
            this.sRecibo.registrarUATransferencia(objUA).then(result=>{
              this.evaluarResultado(result);
            });
        }else{
            //presenter.registerUA(objUA);
            this.sRecibo.registrarUA(objUA).then(result=>{
              this.evaluarResultado(result);
            });
        }
        /**
        Double cantRetorno = Double.parseDouble(edtCantRecibida.getText().toString());
        Double cantRecibidaUA = Double.parseDouble(tvCantTotalRecibida.getText().toString());
        Double sumCantidad = cantRetorno + cantRecibidaUA;
        Double cantPedida = Double.parseDouble(tvCantPedida.getText().toString());

        if(_cantidad != 0){
            if (!String.format("%.2f", _cantidad).equals(String.format("%.2f", cantRetorno))){
                Toast.makeText(getApplicationContext(), "Esta cantidad no corresponde", Toast.LENGTH_SHORT).show();
                return;
            }
        }
        **/
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

    /**
    void evaluateResultSave(Mensaje message){

        if (message.errNumber == 0){
            Double dSaldo, dValor1, dBultos;
            dSaldo = Double.parseDouble(tvSaldo.getText().toString());
            dValor1 = Double.parseDouble(message.valor1.toString());
            dBultos = Double.parseDouble(tvBultos.getText().toString()) + 1;
            tvSaldo.setText(decFormatt.format(dSaldo-dValor1));//String.format("%.3f", dSaldo - dValor1));
            dSaldo = (dSaldo - dValor1);
            tvBultos.setText(decFormatt.format(dBultos));
            tvCantTotalRecibida.setText(decFormatt.format(dBultos * dValor1));//String.format("%.3f", (dBultos * dValor1)));
            //TabPage1.BackColor = Color.GreenYellow;
            lySection03.setBackgroundResource(R.color.greenBottomBar);

            edtCodBar.requestFocus();
            edtCodBar.selectAll();
            edtAveriado.setText(decFormatt.format(0));//"0");
            edtCantRecibida.setText("");
            edtCodBar.setTag("");

            if (dSaldo == 0){
                Toast.makeText(this, "Item completo", Toast.LENGTH_SHORT).show();
                //CargarListaDetalleTransaccion
                //manejoPaneles(2); - In this case I will go to the next activity.
            }
        }else if (message.errNumber == 1){
        }else if (message.errNumber == -1){
        }else{
            
        } 
    **/
  }

}