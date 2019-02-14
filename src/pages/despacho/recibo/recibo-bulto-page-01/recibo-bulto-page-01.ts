import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { PickingServiceProvider } from '../../../../providers/picking-service/picking-service';

/**
 * Generated class for the ReciboBultoPage_01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo-bulto-page-01',
  templateUrl: 'recibo-bulto-page-01.html',
})
export class ReciboBultoPage_01Page {

  strCodigoBarra: string = "";
  strDescripcionMuelle: string = "";
  intCodigoMuelle: number = 0;
  @ViewChild('inputCodigoMuelle', { read: ElementRef }) private inputCodigoMuelle: ElementRef;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider,
    public sPicking: PickingServiceProvider) {
  }

  validarMuelle(){
    
    if(this.strCodigoBarra.trim() != ""){
      debugger;

      this.sPicking.getMuelleXAlmacen(this.sGlobal.Id_Almacen, this.strCodigoBarra).then(result =>{
        debugger;
        let res: any = result;

        if(res.length > 0){
          this.strDescripcionMuelle = res[0].Muelle;
          this.intCodigoMuelle = res[0].Id_Muelle;

        }else{
          alert('Muelle no encontrado');
          this.selectAll(this.inputCodigoMuelle, 600);
        }

      });

    }else{
      alert('Ingrese código de muelle');
    }

    // if (!string.IsNullOrEmpty(strCodBarMuelle))
    // {
    //     Cursor.Current = Cursors.WaitCursor;
    //     var infoMuelle = new GestionPickingMovil().ListarNombreMuelle(control.Global.IdAlmacen, strCodBarMuelle.Trim());
    //     if (infoMuelle.Count > 0)
    //     {

    //         lblMuelleSel.Text = infoMuelle[0].Muelle;
    //         codigoMuelle = infoMuelle[0].Id_Muelle;
    //         //ListarRecepcion(control.Global.Usuario, control.Global.IdAlmacen, codigoMuelle);
    //         btn01a02.Focus();
    //         Cursor.Current = Cursors.Default;

    //     }
    //     else
    //     {
    //         Cursor.Current = Cursors.Default;

    //         MessageBox.Show("Muelle no encontrado", "Aviso",
    //                     MessageBoxButtons.OK, MessageBoxIcon.Asterisk, MessageBoxDefaultButton.Button1);
    //         txtValidaMuelle.Focus();
    //         txtValidaMuelle.SelectAll();
    //         return;
    //     }
    // }
  }

  selectAll(el: ElementRef, time){
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(()=>{
      nativeEl.select();
    }, time);
  }
}
