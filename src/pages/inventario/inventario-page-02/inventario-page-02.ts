import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the InventarioPage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario-page-02',
  templateUrl: 'inventario-page-02.html',
})
export class InventarioPage_02Page {

  listProduct: any;
  listPercha: any;
  vParameter: any;
  isCiclico: boolean = false;
  isGeneral: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
      this.vParameter = this.navParams.get('vParameter');
      debugger;
      if(this.vParameter.TipoInventario == 'CICLICO'){
        this.isCiclico = true;
        this.listarProductosXUsuarioInventario(this.vParameter.Id_Inventario, this.sGlobal.Id_Almacen, 'ADMIN', this.vParameter.Id_Estado);

        // GestionInventario method = new GestionInventario();
        // ltInventarioProducto = new List<ProxySGAAMovil.SOAPInventario.SGAA_SP_S_ListarProductosXUsuarioInventario_Result>();

        // Cursor.Current = Cursors.WaitCursor;
        // //ListInventarioArticulo.Items.Clear();
        // string IdInventario = listCabecera.FocusedItem.SubItems[0].Text;
        // int IdEstado = 0;//Convert.ToInt16(listCabecera.FocusedItem.SubItems[2].Text);
        // ltInventarioProducto = method.ListarProductosXUsuarioInventario(IdInventario, control.Global.IdAlmacen, control.Global.Usuario, IdEstado);

        // if (ltInventarioProducto.Count > 0)
        // {
        //     ManejoPaneles(1);
        // }
        // else
        // {
        //     ManejoPaneles(0);
        // }



        // if (!rtbArticulo.Checked)
        // {
        //     rtbArticulo.Checked = true;
        //     rbtPerchas.Checked = false;
        // }
        // else
        // {
        //     rtbArticulo_CheckedChanged(sender, e);
        // }
      }else if(this.vParameter.TipoInventario == 'GENERAL'){
        this.isGeneral = true;
        this.listarPerchasXUsuarioInventario(this.vParameter.Id_Inventario, this.sGlobal.Id_Almacen, 'ADMIN', this.vParameter.Id_Estado);

        // GestionInventario method = new GestionInventario();
        // ltInventarioPercha = new List<ProxySGAAMovil.SOAPInventario.SGAA_SP_S_ListarPerchasXUsuarioInventario_Result>();


        // Cursor.Current = Cursors.WaitCursor;
        // //ListInventarioPercha.Items.Clear();
        // string IdInventario = listCabecera.FocusedItem.SubItems[0].Text;
        // int IdEstado = 0; // Convert.ToInt16(listCabecera.FocusedItem.SubItems[2].Text);
        // ltInventarioPercha = method.ListarPerchasXUsuarioInventario(IdInventario, control.Global.IdAlmacen, control.Global.Usuario, IdEstado);

        // if (ltInventarioPercha.Count > 0)
        // {
        //     ManejoPaneles(1);
        // }
        // else
        // {
        //     ManejoPaneles(0);
        // }

        // if (!rbtPerchas.Checked)
        // {
        //     rbtPerchas.Checked = true;
        //     rtbArticulo.Checked = false;
        // }
        // else
        // {
        //     rbtPerchas_CheckedChanged(sender, e);
        // }
      }

      // let parameter = {
      //   'Id_Inventario': data.Id_Inventario,
      //   'FechaProgramacion': data.FechaProgramacion,
      //   'FechaCierre': data.FechaCierre,
      //   'Id_Estado': data.Id_Estado,
      //   'TipoInventario': data.TipoInventario
      // }

  }

  ionViewDidLoad() {
  }

  listarProductosXUsuarioInventario(strIdInventario, intIdAlmacen, strUsuario, intIdEstado){
    this.sInve.listarProductosXUsuarioInventario(strIdInventario, intIdAlmacen, strUsuario, intIdEstado).then(result=>{
      this.listProduct = result;
    });
  }

  listarPerchasXUsuarioInventario(strIdIventario, intIdAlmacen, strUsuario, intIdEstado){
    this.sInve.listarPerchasXUsuarioInventario(strIdIventario, intIdAlmacen, strUsuario, intIdEstado).then(result=>{
      this.listPercha = result;
    });
  }

  goToInventPage03(data): void{
    console.log('Id_Estado', data.Id_Estado);

    if(data.Id_Estado == 10){ //Estado: Pendiente
      
    }else{
      
    }

    //estado es pendiente
    // if (Convert.ToInt16(ListInventarioPercha.FocusedItem.SubItems[6].Text) == 10)
    // {

    //     dtpFecha.Text = DateTime.Now.ToShortDateString();
    //     btnIniciar.Text = "Iniciar";
    //     txtInventareador.ReadOnly = false;
    //     dtpFecha.Enabled = false;
    //     ManejoPaneles(2);
    //     //estado en proceso
    // }
    // else
    // {

    //     btnIniciar.Text = "Continuar";
    //     dtpFecha.Enabled = false;
    //     if (rbtPerchas.Checked)
    //     {
    //         txtInventareador.Text = "";
    //     }
    //     ManejoPaneles(2);
    // }
    // lbl01.Text = "Sector: ";
    // lbl02.Text = "Fila/Percha: ";
    // lblInfo1.Text = ListInventarioPercha.FocusedItem.SubItems[2].Text.ToUpper();
    // lblInfo2.Text = ListInventarioPercha.FocusedItem.SubItems[3].Text.ToUpper();
    // lblInfo1_1.Text = " Sec: " + ListInventarioPercha.FocusedItem.SubItems[2].Text.ToUpper();
    // lblInfo2_1.Text = " F/P: " + ListInventarioPercha.FocusedItem.SubItems[3].Text.ToUpper();
    // lblTipoInv.Text = rbtPerchas.Text.ToUpper();
    // txtInventareador.Text = ListInventarioPercha.FocusedItem.SubItems[4].Text.ToUpper();
  }
}
