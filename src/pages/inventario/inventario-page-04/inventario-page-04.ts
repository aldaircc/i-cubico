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
    debugger;
    if(this.strTipoInventario == 'GENERAL'){

      this.validarUbicacionInventario(this.strUbicacion, this.sGlobal.Id_Almacen, this.vParameter.Id_Sector, this.vParameter.Fila, 1);
    }else{

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

  buscarArticuloEnLista(): void{
    debugger;
    if(this.vParameter.TipoInventario == 'GENERAL'){
      this.validarUAInventario(this.vParameter.Id_Inventario, this.sGlobal.Id_Almacen, 0, this.strCodeBarUA);
    }else{

    }

    // string idInventario = txtTransaccion.Text;
    // string strUA = txtCodBarra.Text;
    // validaUA = new ProxySGAAMovil.SOAPInventario.SGAA_SP_S_validarUAInventario_Result();
    // GestionInventario method = new GestionInventario();
    // //DATOS DEL ARTICULO LEIDO
    // if (rbtPerchas.Checked)
    // {

    //     validaUA = method.ValidarUAInventario(idInventario, control.Global.IdAlmacen, 0, strUA);
    //     //DTARTICULO = null;// objConsultas.CargarListaInventarioDetallePercha(txtCodBarra.Text.Trim, txtTransaccion.Text.Trim);
    // }
    // else
    // {
    //     int producto = string.IsNullOrEmpty(lblInfo1.Tag.ToString()) ? -1 : Convert.ToInt32(lblInfo1.Tag);
    //     validaUA = method.ValidarUAInventario(idInventario, control.Global.IdAlmacen, producto, strUA);
    //     txtCantidad.Tag = validaUA.Saldo.ToString();
    //     //DTARTICULO = null;//objConsultas.CargarListaInventarioDetalleArticulo(ListInventarioArticulo.FocusedItem.SubItems(9).Text, txtTransaccion.Text.Trim, txtCodBarra.Text.Trim);
    // }
  }

  validarUAInventario(strIdInventario, intIdAlmacen, intIdProducto, strUA): void{
    this.sInve.validarUAInventario(strIdInventario, intIdAlmacen, intIdProducto, strUA).then(result=>{
      debugger;
      let res: any = result;

    });
  }
}
