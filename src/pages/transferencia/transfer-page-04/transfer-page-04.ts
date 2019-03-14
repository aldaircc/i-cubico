import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { TransferPage_05Page } from '../transfer-page-05/transfer-page-05';
import { MainMenuPage } from '../../main-menu/main-menu';
import { AdministrarUaPage } from '../../almacenaje/menu-consultar/administrar-ua/administrar-ua';

/**
 * Generated class for the TransferPage_04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-page-04',
  templateUrl: 'transfer-page-04.html',
})
export class TransferPage_04Page {

  vParameter: any;
  lstUATransf: any;
  codeBar:any = { 'Text' : '', 'Tag' : '' };
  cantUA:number = 0;
  tCantidadUA : number = 0;
  isEnablebtnPicking:boolean = false;
  isError:boolean = false;
  isNormal:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
  }

  validarUATransfSubAlmacen(strIdTx, strUA, strLote, intIdSubAlmacen, intIdUbicacion, intItem){
    this.sPicking.validarUATransfSubAlmacen(strIdTx, strUA, strLote, intIdSubAlmacen, intIdUbicacion, intItem).then(result=>{
      let res:any = result;
      this.lstUATransf = res;
      if(res.length != 0){
        if(res[0].ERROR == 0){
          this.isEnablebtnPicking = true;
          this.cantUA = res[0].Cantidad;
          this.isError = false;
          this.isNormal = false;
        }else{
          this.codeBar.Text = "";
          this.cantUA = 0;
          alert(res[0].MENSAGE);
          this.isError = true;
        }
      }
    });
  }

  validarUA(){
    if(this.codeBar.Text.trim() != ""){
      this.validarUATransfSubAlmacen(this.vParameter.Id_Tx, this.codeBar.Text, this.vParameter.Lote, this.vParameter.Id_SubAlmacenDestino, this.vParameter.Id_Ubicacion, this.vParameter.Item);
      this.isEnablebtnPicking = true;
      this.isError = false;
    }else{
      alert('Ingrese un código de barra');
      this.codeBar.Text = "";
      this.cantUA = 0;
      this.isEnablebtnPicking = false;
    }
  }

  pickingUA(): void{
    //this.navCtrl.remove(3, 2);
    if (!this.isError)
    {
      if(this.cantUA > 0){        
        let cantCurrentUA: number = this.cantUA;
        let saldo: number = parseFloat(this.vParameter.Saldo);

        if(cantCurrentUA <= saldo){
          
          let message = this.pickingUASubAlmacen(saldo, cantCurrentUA, this.codeBar.Text, this.vParameter.Id_Tx, this.vParameter.Id_Producto, this.vParameter.Lote, this.cantUA, false, this.sGlobal.Id_TerminalRF, this.vParameter.Item, this.sGlobal.Id_Almacen, this.vParameter.Id_SubAlmacen, this.sGlobal.userName);

        } else if(saldo == 0){
          alert('El saldo es 0, el producto se encuentra verificado.');
          this.codeBar.Text = "";
          this.cantUA = 0;
          this.isError = false;
          this.isNormal = true;
          return;
        } else {
          alert('Cantidad invalida, la cantidad ingresada es superior al saldo.');
          this.isError = false;
          this.isNormal = true;
          return;
        }   
      }else{
        this.codeBar.Text = "";
        this.cantUA = 0;
        alert("Ingresar código de barra.");
        this.isError = false;
        this.isNormal = true;
        return;
      }
    }else{
      this.codeBar.Text = "";
      this.cantUA = 0;
      alert("Debe verificar una UA disponible para poder continuar.");
      this.isError = false;
      this.isNormal = true;
      return;
    }
  }

  pickingUASubAlmacen(saldo, cantCurrentUA, strUA, strIdTx, intIdProducto, strLote, decCantidad, bolAnular, intIdRF, intItem, intIdAlmacen, intIdSubAlmacen, strUser): void{
    let message;
    this.sPicking.pickingUASubAlmacen(strUA, strIdTx, intIdProducto, strLote, decCantidad, bolAnular, intIdRF, intItem, intIdAlmacen, intIdSubAlmacen, strUser).then(result=>{
      debugger;
      message = result;

      if(message.errNumber == 0){
        debugger;
        this.vParameter.Saldo -= cantCurrentUA;
        this.tCantidadUA += cantCurrentUA;
        this.vParameter.CantidadOperacion = this.tCantidadUA;
        this.codeBar.Text = "";
        this.cantUA = 0;
        this.isError = false;
        this.isNormal = true;
        alert(message.message);

        if(this.vParameter.Saldo == 0){
          alert('Cantidad Completa');
          this.navCtrl.remove(3, 2);
        }

      }else{
        this.codeBar.Text = "";
        this.cantUA = 0;
        alert(message.message);
      }
    });
  }

  listarUAs(): void{
    console.log('data from page 04', this.vParameter);
    let parameter = {
      'Cantidad' : this.vParameter.Cantidad,​
      'CantidadOperacion' : this.vParameter.CantidadOperacion,​
      'CantidadPedida' : this.vParameter.CantidadPedida,​
      'Cod_Producto' : this.vParameter.Cod_Producto,​
      'Columna' : this.vParameter.Columna,​
      'Fila' : this.vParameter.Fila,​
      'Id_Producto' : this.vParameter.Id_Producto,​
      'Id_SubAlmacen' : this.vParameter.Id_SubAlmacenOrigen,​
      'Id_SubAlmacenDestino' : this.vParameter.Id_SubAlmacenDestino,​
      'Id_Tx' : this.vParameter.Id_Tx,
      'Id_UM' : this.vParameter.Id_UM,
      'Id_Ubicacion' : this.vParameter.Id_Ubicacion,
      'Item' : this.vParameter.Item,
      'Lote' : this.vParameter.Lote,
      'Nivel' : this.vParameter.Nivel,
      'Posicion' : this.vParameter.Posicion,
      'Producto' : this.vParameter.Producto,
      'Saldo' : this.vParameter.Saldo,
      'Sector' : this.vParameter.Sector,
      'UM' : this.vParameter.UM,
      'Ubicacion' : this.vParameter.Ubicacion,
      'Ubicacion_2' : this.vParameter.Ubicacion_2
    };
    
    this.navCtrl.push(TransferPage_05Page, { 'vParameter' : parameter });
  }

  goToParticionarUA(): void{
    let obj = { page: '1' };
    this.navCtrl.push(AdministrarUaPage, { 'data': obj });
  }
}
