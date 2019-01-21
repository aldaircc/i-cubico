import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the InventarioPage_04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario-page-04',
  templateUrl: 'inventario-page-04.html',
})
export class InventarioPage_04Page {

  vParameter: any;
  strUbicacion: string = "";
  strCodeBarUA: string = "";
  strTipoInventario: string = "";
  intId_Ubicacion: number;
  isEnabledUbicacion: boolean = true;
  isEnabledCodeBar: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
    this.strTipoInventario = this.vParameter.TipoInventario;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventarioPage_04Page');
  }

  cambiarUbicacion(): void{

  }

  validarUbicacion(): void{
    if(this.strCodeBarUA == 'GENERAL'){

      this.validarUbicacionInventario(this.strUbicacion, this.sGlobal.Id_Almacen, this.vParameter.Id_Sector, this.vParameter.Fila, 1);

    //                 string fila = lblInfo2.Text.ToUpper().Trim();
    //                 int idSector = Convert.ToInt16(ListInventarioPercha.FocusedItem.SubItems[1].Text);
    //                 var msj = method.ValidarUbicacionInventario(codbarraUbi, control.Global.IdAlmacen, idSector, fila, 1);
    //                 if (msj.errNumber == 1)
    //                 {
    //                     idUbicacion = Convert.ToInt32(msj.valor1);
    //                     valor = true;
    //                 }
    //                 else
    //                 {
    //                     MessageBox.Show(msj.message, "Inventario",
    //                      MessageBoxButtons.OK, MessageBoxIcon.Hand, MessageBoxDefaultButton.Button1);
    //                 }
    }else{

      if(){

      }else{
        
      }

    }
    // ID_UBICACION_INV = 0;
    //         try
    //         {
    //             Cursor.Current = Cursors.WaitCursor;
    //             GestionInventario method = new GestionInventario();
    //             bool valor = false;
    //             string codbarraUbi = txtCodUbicacion.Text;
    //             if (rbtPerchas.Checked)
    //             {


    //             }
    //             else
    //             {
    //                 if (txtCodUbicacion.Text.Trim() == listUbicaciones.FocusedItem.SubItems[8].Text.Trim())
    //                 {
    //                     var msj = method.ValidarUbicacionInventario(codbarraUbi, control.Global.IdAlmacen, 0, "", 2);
    //                     if (msj.errNumber == 1)
    //                     {
    //                         idUbicacion = Convert.ToInt32(msj.valor1);
    //                         valor = true;
    //                     }
    //                     else
    //                     {
    //                         MessageBox.Show(msj.message, "Inventario",
    //                          MessageBoxButtons.OK, MessageBoxIcon.Hand, MessageBoxDefaultButton.Button1);
    //                     }

    //                 }
    //                 else
    //                 {
    //                     var msj = method.ValidarUbicacionInventario(codbarraUbi, control.Global.IdAlmacen, 0, "", 2);
    //                     if (msj.errNumber == 1)
    //                     {
    //                         if (MessageBox.Show("Ubicación no corresponde, ¿Desea inventariar?", "Inventario",
    //                        MessageBoxButtons.YesNo, MessageBoxIcon.Exclamation, MessageBoxDefaultButton.Button2) == System.Windows.Forms.DialogResult.Yes)
    //                         {
    //                             idUbicacion = Convert.ToInt32(msj.valor1);
    //                             valor = true;
    //                         }
    //                     }
    //                     else
    //                     {
    //                         MessageBox.Show(msj.message, "Inventario",
    //                        MessageBoxButtons.OK, MessageBoxIcon.Hand, MessageBoxDefaultButton.Button1);

    //                     }
    //                 }
    //             }
  }

  validarUbicacionInventario(CodBarraUbi, intIdAlmacen, intIdSector, strFila, intTipo): void{
    this.sInve.validarUbicacionInventario(CodBarraUbi, intIdAlmacen, intIdSector, strFila, intTipo).then(result=>{
      let res: any = result;
      debugger;
      if(res.errNumber == 1){
        this.intId_Ubicacion = parseInt(res.valor1);
        this.isEnabledCodeBar = true;
        this.isEnabledUbicacion = false;
      }else{
        alert(res.message);
      }
    });
  }
}
