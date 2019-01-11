import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { TransferPage_05Page } from '../transfer-page-05/transfer-page-05';
import { MainMenuPage } from '../../main-menu/main-menu';

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
  isEnablebtnPicking:boolean = false;
  isError:boolean = false;
  isNormal:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sPicking: PickingServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
    console.log('data from page 03', this.vParameter);
  }

  ionViewDidLoad() {

  }

  validarUATransfSubAlmacen(strIdTx, strUA, strLote, intIdSubAlmacen, intIdUbicacion, intItem){
    this.sPicking.validarUATransfSubAlmacen(strIdTx, strUA, strLote, intIdSubAlmacen, intIdUbicacion, intItem).then(result=>{
      debugger;
      let res:any = result;
      this.lstUATransf = res;

      if(res.length != 0){
        if(res[0].ERROR == 0){
          this.isEnablebtnPicking = true;
          this.cantUA = res[0].Cantidad;
          //         changeColorPanelVerify(false);

          //         btnPickingUA.Enabled = true;
          //         txtCountUA.Text = lstUATransf.FirstOrDefault().Cantidad.ToString();
          //         changeColorPanelVerify(false);
        }else{
          //         changeColorPanelVerify(true);
          this.codeBar.Text = "";
          this.cantUA = 0;
          alert(res[0].MENSAGE);
          this.isError = true;
          //         changeColorPanelVerify(true);
          //         txtBarCode.Text = string.Empty;
          //         txtCountUA.Text = string.Empty;
          //         Resco.Controls.MessageBox.MessageBoxEx.Show(lstUATransf.FirstOrDefault().MENSAGE, "Validación");
        }
      }
    });
  }

  validarUA(){
    debugger;
    if(this.codeBar.Text.trim() != ""){
      this.validarUATransfSubAlmacen(this.vParameter.Id_Tx, this.codeBar.Text, this.vParameter.Lote, this.vParameter.Id_SubAlmacen, this.vParameter.Id_Ubicacion, this.vParameter.Item);
      this.isEnablebtnPicking = true;
      this.isError = false;
    }else{
      alert('Ingrese un código de barra');
      this.codeBar.Text = "";
      this.cantUA = 0;
      this.isEnablebtnPicking = false;
    }
  }

  // void changeColorPanelVerify(bool isError)
  // {
  //     try
  //     {
  //         pnlChecUA.BackColor = (isError == false) ? Color.Yellow : Color.Red;
  //         lblBarCode04.BackColor = (isError == false) ? Color.Yellow : Color.Red;
  //         lblLote04.BackColor = (isError == false) ? Color.Yellow : Color.Red;
  //         lblCantUA04.BackColor = (isError == false) ? Color.Yellow : Color.Red;
  //         lblBarCode04.ForeColor = Color.Black;
  //         lblLote04.ForeColor = Color.Black;
  //         lblCantUA04.ForeColor = Color.Black;
  //     }
  //     catch (Exception ex)
  //     {
  //         Resco.Controls.MessageBox.MessageBoxEx.Show(ex.Message, "Error");
  //     }
  // }
  tCantidadUA : number = 0;

  pickingUA(): void{
    debugger;
    //let allViews:any = this.navCtrl.getViews();
    //this.navCtrl.remove(3, 2); // para remover pantallas especificando sus indice asignados en el stackview

    if (!this.isError)
    {
      if(this.cantUA > 0){        
        let cantCurrentUA: number = this.cantUA;
        let saldo: number = parseFloat(this.vParameter.Saldo);

        if(cantCurrentUA <= saldo){
          
          let message = this.pickingUASubAlmacen(saldo, cantCurrentUA, this.codeBar.Text, this.vParameter.Id_Tx, this.vParameter.Id_Producto, this.vParameter.Lote, this.cantUA, false, this.sGlobal.Id_TerminalRF, this.vParameter.Item, this.sGlobal.Id_Almacen, this.vParameter.Id_SubAlmacen, this.sGlobal.userName);

          // if(message.errNumber == 0){
          //   debugger;
          //   this.vParameter.Saldo -= cantCurrentUA;
          //   this.tCantidadUA += cantCurrentUA;
          //   this.vParameter.CantidadOperacion = this.tCantidadUA;
          //   this.codeBar.Text = "";
          //   this.cantUA = 0;
          //   this.isError = false;
          //   this.isNormal = true;
          //   alert(message.message);

          //   if(this.vParameter.Saldo == 0){
          //     alert('Cantidad Completa');
          //     this.navCtrl.remove(3, 2);
          //   }

          // }else{
          //   this.codeBar.Text = "";
          //   this.cantUA = 0;
          //   alert(message.message);
          // }

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
    debugger;
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

  // void setColorBasePanelVerify()
  // {
  //     try
  //     {
  //         pnlChecUA.BackColor = Color.FromArgb(56, 120, 190);
  //         lblCantUA04.BackColor = Color.FromArgb(56, 120, 190);
  //         lblBarCode04.BackColor = Color.FromArgb(56, 120, 190);
  //         lblLote04.BackColor = Color.FromArgb(56, 120, 190);
  //         lblCantUA04.ForeColor = Color.Yellow;
  //         lblLote04.ForeColor = Color.Yellow;
  //         lblBarCode04.ForeColor = Color.Yellow;
  //     }
  //     catch (Exception ex)
  //     {
  //         Resco.Controls.MessageBox.MessageBoxEx.Show(ex.Message, "Error");
  //     }
  // }

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
      'Id_SubAlmacen' : this.vParameter.Id_SubAlmacen,​
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
    
    this.navCtrl.push(TransferPage_05Page, { 'vParameter' : parameter }); //push();
    // setColorBasePanelVerify();
    // txtBarCode.Text = string.Empty;
    // txtCountUA.Text = string.Empty;
    // manejoPaneles(5);
    // lblNroTx.Text = strIdTx;
    // lblCodProduct05.Text = strCodProduct;
    // lblLoteProduct05.Text = strLote;
    // lbProductName05.Text = producto;
    // initUAsTranferidasXSubAlmacen(strIdTx, intIdProducto, strLote, intIdUbicacion);
    // chkWithOutUbication.Checked = false;
  }

}
