import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PickingServiceProvider } from '../../../providers/picking-service/picking-service';

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
    public sPicking: PickingServiceProvider) {
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

  pickingUA(): void{
    debugger;
    if (!this.isError)
    {
      if(this.cantUA > 0){
        //decimal cantCurrentUA = Convert.ToDecimal(txtCountUA.Text), saldo = Convert.ToDecimal(txtSaldo.Text);
        let cantCurrentUA = this.cantUA;
        let saldo = parseFloat(this.vParameter.Saldo);
        
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

}
