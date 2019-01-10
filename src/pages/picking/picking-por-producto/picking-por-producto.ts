import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController, AlertController } from 'ionic-angular';
import { DetallePorProductoPage } from '../detalle-por-producto/detalle-por-producto'
import { ReabastecimientoPage } from '../reabastecimiento/reabastecimiento'
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { PopoverRutaPickingPage } from '../../picking/popover/popover-ruta-picking/popover-ruta-picking'
import { DetallePickingPage } from '../detalle-picking/detalle-picking';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { RutaPickingPage } from '../ruta-picking/ruta-picking';
import { CierrePickingPage } from '../cierre-picking/cierre-picking';
/**
 * Generated class for the PickingPorProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picking-por-producto',
  templateUrl: 'picking-por-producto.html',
})
export class PickingPorProductoPage {

  vRutaPickingPage: any = [];
  listaTempPickingProducto: any = [];
  listPickingProducto: any = [];
  pickingProducto: any = [];
  posicion: number = 0;
  contador: number = 1;
  total: number = 1;
  Backisenabled: boolean = false;
  Nextisenabled: boolean = false;
  Txtcantidadisenabled: boolean = false;


  codeBar: string;
  Textcantidad: string = '';
  codUbicacion: string;
  UAPicking: any = [];

  isBgRed: boolean = false;
  isBgYellow: boolean = false;
  isBgGreen: boolean = false;
  isbgWhite: boolean = false;

  vPickingXProducto: any = [];
  resultRegistrar: any = [];
  listProductoConRuta: any = [];
  idRutaPicking: number = 0;

  //valorRegistrar: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, private popoverCtrl: PopoverController,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public sGlobal: GlobalServiceProvider) {
    this.vRutaPickingPage = navParams.get('data');
    this.getPickingProductoLoad();

  }

  getPickingProductoLoad() {
    this.codeBar = "";
    this.Textcantidad = "";
    this.getPickingProducto(this.vRutaPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);
  }

  goDetallePickingPage() {

    debugger;
    this.vPickingXProducto = {
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };

    this.navCtrl.push(DetallePickingPage, {
      data: this.vPickingXProducto
    });
  }

  goDetallePorProductoPage(): void {
    debugger;
    this.vPickingXProducto = {
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'CodigoProducto': this.pickingProducto.CodigoProducto,
      'Producto': this.pickingProducto.Producto,
      'IdProducto': this.pickingProducto.IdProducto,
      'Item': this.pickingProducto.Item
    };

    this.navCtrl.push(DetallePorProductoPage, {
      data: this.vPickingXProducto
    });
    //this.navCtrl.push(DetallePorProductoPage);
  }

  goReabastecimientoPage(): void {
    this.navCtrl.push(ReabastecimientoPage);
  }



  getPickingProducto(strNroDoc, strUsuario, intIdAlmacen) {
    this.sPicking.getPickingProducto(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
      this.listPickingProducto = result;

      this.listaTempPickingProducto = [];

      for (var i = 0; i < this.listPickingProducto.length; i++) {
        var obj = {
          'idRutaPicking': this.idRutaPicking,
          'Caja': result[i].Caja,
          'CantidadPedida': result[i].CantidadPedida,
          'CodBarraUbi': result[i].CodBarraUbi,
          'CodigoProducto': result[i].CodigoProducto,
          'Columna': result[i].Columna,
          'Contenedor': result[i].Contenedor,
          'Fila': result[i].Fila,
          'FlagAscendente': result[i].FlagAscendente,
          'FlagDescendente': result[i].FlagDescendente,
          'FlagTransito': result[i].FlagTransito,
          'IdPasillo': result[i].IdPasillo,
          'IdProducto': result[i].IdProducto,
          'IdSector': result[i].IdSector,
          'IdUMBase': result[i].IdUMBase,
          'IdUbicacion': result[i].IdUbicacion,
          'Item': result[i].Item,
          'LoteProducto': result[i].LoteProducto,
          'LoteRecibo': result[i].LoteRecibo,
          'Nivel': result[i].Nivel,
          'Pasillo': result[i].Pasillo,
          'Posicion': result[i].Posicion,
          'Producto': result[i].Producto,
          'Referencia': result[i].Referencia,
          'Saldo': result[i].Saldo,
          'SaldoCaja': result[i].SaldoCaja,
          'Sector': result[i].Sector,
          'UMBase': result[i].UMBase
        };
        this.listaTempPickingProducto.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }

      for(var i = 0; i< this.listaTempPickingProducto.length; i++){
        //if(result[i].Saldo>0){ 
          if(result[i].FlagTransito == false){
            var id = this.vRutaPickingPage.idRutaPicking;
            this.contador = 1;
            if(id>=0){
              debugger;
              this.contador = id + 1;
              this.posicion = id;
              this.pickingProducto = result[this.posicion];
              if(this.contador==1){
                this.Backisenabled=false;
              }else{this.Backisenabled=true;}
              if(this.contador==this.listaTempPickingProducto.length){
                this.Nextisenabled=true;
              }else{
                this.Nextisenabled=false;
              }
            }
            // else{
            //   this.contador = i + 1;
            //   this.posicion = i;
            //   this.pickingProducto = result[i];
            //   if(this.contador==1){
            //     this.Backisenabled=false;
            //   }else{this.Backisenabled=true;}
            //   if(this.contador==this.listaTempPickingProducto.length){
            //     this.Nextisenabled=true;
            //   }else{
            //     this.Nextisenabled=false;
            //   }
            // }
            
            this.total = this.listaTempPickingProducto.length;      
            if(this.contador==this.listaTempPickingProducto.length){
              this.Nextisenabled=true;
            }
            console.log('detalles', this.pickingProducto);
            if(this.pickingProducto.length == 0){
              console.log('No se encontraron detalles', this.pickingProducto);  
            }

            debugger;
            // if(this.valorRegistrar==1){
            //   debugger;
            //   this.ValidarSiguienteProducto();
            // }
            return;
          }      
        //}
      } 
      
    }, err => {
      console.log('E-getPickingProducto', err);
    });
  }


  getPickingProductoUpdate(strNroDoc, strUsuario, intIdAlmacen) {
    this.sPicking.getPickingProducto(strNroDoc, strUsuario, intIdAlmacen).then((result) => {
      debugger;
      this.idRutaPicking = 0;
      this.listPickingProducto = result;

      this.listaTempPickingProducto = [];

      for (var i = 0; i < this.listPickingProducto.length; i++) {
        var obj = {
          'idRutaPicking': this.idRutaPicking,
          'Caja': result[i].Caja,
          'CantidadPedida': result[i].CantidadPedida,
          'CodBarraUbi': result[i].CodBarraUbi,
          'CodigoProducto': result[i].CodigoProducto,
          'Columna': result[i].Columna,
          'Contenedor': result[i].Contenedor,
          'Fila': result[i].Fila,
          'FlagAscendente': result[i].FlagAscendente,
          'FlagDescendente': result[i].FlagDescendente,
          'FlagTransito': result[i].FlagTransito,
          'IdPasillo': result[i].IdPasillo,
          'IdProducto': result[i].IdProducto,
          'IdSector': result[i].IdSector,
          'IdUMBase': result[i].IdUMBase,
          'IdUbicacion': result[i].IdUbicacion,
          'Item': result[i].Item,
          'LoteProducto': result[i].LoteProducto,
          'LoteRecibo': result[i].LoteRecibo,
          'Nivel': result[i].Nivel,
          'Pasillo': result[i].Pasillo,
          'Posicion': result[i].Posicion,
          'Producto': result[i].Producto,
          'Referencia': result[i].Referencia,
          'Saldo': result[i].Saldo,
          'SaldoCaja': result[i].SaldoCaja,
          'Sector': result[i].Sector,
          'UMBase': result[i].UMBase
        };
        this.listaTempPickingProducto.push(obj);
        this.idRutaPicking = this.idRutaPicking + 1;
      }

      this.pickingProducto = result[this.posicion];

      
      this.ValidarSiguienteProducto();
      
      return;
      
    }, err => {
      console.log('E-getPickingProducto', err);
    });
  }

  validarCodeBar() {
    debugger;
    if (this.codeBar) {
      if (this.codeBar.trim() != "") {
        this.sPicking.getValidarUAPicking(this.vRutaPickingPage.Id_Tx, this.codeBar.trim(), this.pickingProducto.IdProducto, this.pickingProducto.LoteProducto, this.pickingProducto.IdUbicacion).then((result) => {
          debugger;
          this.UAPicking = result;
          if (this.UAPicking.errNumber == 0) {
            this.isbgWhite = false;
            this.isBgRed = false;
            this.isBgYellow = true;
            this.isBgGreen = false;
            //Mostrar cantidad de la UA
            this.Textcantidad = this.UAPicking.valor1;
            if (this.UAPicking.valor2 != 2) {
              //Bloquear campo cantidad
              this.Txtcantidadisenabled = false;
              if (this.UAPicking.valor2 == 1) {
                //Registrar cantidad de la UA automaticamente
              }
            }
          } else {
            this.presentToast(this.UAPicking.message);
            //this.presentToast("UA no pertenece a la ubicación");
            this.isbgWhite = false;
            this.isBgRed = true;
            this.isBgYellow = false;
            this.isBgGreen = false;
            this.codeBar = "";
            this.Textcantidad = "";
          }
        }, (err) => {
          console.log('E-Verficar UA', err);
        });
      } else {
        this.presentToast("Ingresar código de UA");
        this.isbgWhite = false;
        this.isBgRed = true;
        this.isBgYellow = false;
        this.isBgGreen = false;
        this.codeBar = "";
        this.Textcantidad = "";
      }
    } else {
      this.presentToast("Ingresar código de UA");
      this.isBgRed = true;
      this.isBgYellow = false;
      this.isBgGreen = false;
      this.codeBar = "";
      this.Textcantidad = "";
    }
  }

  registarUA() {
    debugger;
    //this.valorRegistrar = 1;
    if (parseInt(this.Textcantidad) > this.pickingProducto.Saldo) { //Cantidad de la UA es mayor al saldo
      //Editar cantidad de la UA
      this.presentToast("Cantidad de UA no puede ser mayor al saldo");
    } else {
      //Registrar cantidad de la UA
      debugger;
      // Registrar UA
      let objUA = {
        'UA_CodBarra': this.codeBar.trim(), //
        'Id_Tx': this.vRutaPickingPage.Id_Tx,// "A20181980018",
        'Id_Producto': this.pickingProducto.IdProducto,// 80 ,
        'Id_UM': this.pickingProducto.IdUMBase,  //
        'Cantidad': this.Textcantidad,  //
        'FlagAnulado': false, //
        'Id_TerminalRF': 1,  //
        'Item': this.pickingProducto.Item,  //
        'Id_Almacen': this.sGlobal.Id_Almacen,  //
        'UsuarioRegistro': this.sGlobal.userName  //
      };
      this.sPicking.RegistarEliminarUA(objUA).then(result => {
        debugger;
        this.resultRegistrar = result;
        if (this.resultRegistrar.errNumber == 0) {
          this.isBgRed = false;
          this.isBgYellow = false;
          this.isBgGreen = true;
          this.codeBar = "";
          this.Textcantidad = "";
        } else {
          this.isBgRed = true;
          this.isBgYellow = false;
          this.isBgGreen = false;
          this.codeBar = "";
          this.Textcantidad = "";
          this.presentToast(this.resultRegistrar.message);
        }
        //Actulizar los campos cant. atendida y saldo
        this.getPickingProductoUpdate(this.vRutaPickingPage.Id_Tx, this.sGlobal.userName, this.sGlobal.Id_Almacen);
        
      });
    }
  }

  ValidarSiguienteProducto() {
    for (var i = 0; i < this.listaTempPickingProducto.length; i++) {
      if (this.listaTempPickingProducto[i].FlagTransito == false) {
        //Hacer nueva lista temp.
        this.listProductoConRuta.push(this.listaTempPickingProducto[i])
      }
    }
    let saldoTotal = this.listProductoConRuta.reduce(function (prev, cur) {
      return prev + cur.Saldo;
    }, 0); //Obtener el saldo total de los productos con ruta
    
    if (saldoTotal == 0)  //Si el saldo total de los productos con ruta se completa 
    {
      debugger;
      //se sugiere cerrar picking
      this.presentAlertConfirm("¿Desea cerrar picking?”.").then((result) => {
        if (result) {
          // Ir a pagina cerrar picking
          this.goCerrarPickingPage();
        }else{
          this.goDetallePickingPage();
        }
      })
    } else {//Si el saldo total de los productos con ruta se No completa
      debugger;
      if (this.pickingProducto.Saldo == 0) {//Si Item completado
        //-Si el siguiente producto tiene la misma ubicacion 
        this.presentAlert("Item completado");
        if (this.pickingProducto.CodBarraUbi = this.listaTempPickingProducto[this.posicion + 1].CodBarraUbi) {
          //avanzar al siguiente producto en la misma pantalla
          this.total = this.listaTempPickingProducto.length;
          this.posicion = this.posicion + 1;
          if (this.posicion < this.listaTempPickingProducto.length) {
            this.contador = this.contador + 1;
            this.pickingProducto = this.listaTempPickingProducto[this.posicion];
            this.Backisenabled = true;
          }
          if (this.contador == this.listaTempPickingProducto.length) {
            this.Nextisenabled = true;
          }
        } else {
          //volver a ruta picking y ubicarse en la posicion siguiente...
          this.goRutaPickingPage();
        }
      }
    }
    //this.valorRegistrar=0;
  }

  goRutaPickingPage() {
    this.vPickingXProducto = {
      'idRutaPicking': this.pickingProducto.idRutaPicking,
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vPickingXProducto
    });
  }

  goRutaPickingPageUpdate() {
    this.vPickingXProducto = {
      'Id_Tx': this.vRutaPickingPage.Id_Tx,
      'NumOrden': this.vRutaPickingPage.NumOrden,
      'Cliente': this.vRutaPickingPage.Cliente,
      'Ciudad': this.vRutaPickingPage.Ciudad,
      'Zona': this.vRutaPickingPage.Zona
    };
    this.navCtrl.push(RutaPickingPage, {
      data: this.vPickingXProducto
    });
  }

  goCerrarPickingPage(){
    let saldoTotalPicking = this.listaTempPickingProducto.reduce(function(prev, cur){
      return prev + cur.Saldo;
    }, 0);
    debugger;  
      this.vRutaPickingPage = {
        'Id_Tx' : this.vRutaPickingPage.Id_Tx,
        'NumOrden' : this.vRutaPickingPage.NumOrden,
        'Ciudad' : this.vRutaPickingPage.Ciudad,
        'Zona' : this.vRutaPickingPage.Zona,
        'Saldo' : saldoTotalPicking        
      };
      this.navCtrl.push(CierrePickingPage, {
        data: this.vRutaPickingPage
      });    
  }

  NextRutaPicking() {
    debugger;
    this.total = this.listaTempPickingProducto.length;
    this.posicion = this.posicion + 1;
    if (this.posicion < this.listaTempPickingProducto.length) {
      this.contador = this.contador + 1;
      this.pickingProducto = this.listaTempPickingProducto[this.posicion];
      this.Backisenabled = true;
    }
    if (this.contador == this.listaTempPickingProducto.length) {
      this.Nextisenabled = true;
    }
  }

  BackRutaPicking() {
    debugger;
    this.total = this.listaTempPickingProducto.length;
    this.posicion = this.posicion - 1;
    if (this.posicion >= 0) {
      this.contador = this.contador - 1;
      this.pickingProducto = this.listaTempPickingProducto[this.posicion];
      this.Nextisenabled = false;
    }
    if (this.contador == 1) {
      this.Backisenabled = false;
    }
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverRutaPickingPage, {
      // contentEle: this.content.nativeElement,
      // textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPorProductoPage');
  }

}
