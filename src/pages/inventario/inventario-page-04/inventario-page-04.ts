import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
//import { isNumber } from 'ionic-angular'; // /umd/util/util';

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
  isVisibleData: boolean = false;
  strArticulo: string = "";
  strUM: string = "";
  txtCantidad: any = { 'Text': '', 'Enabled': true };
  txtAveriados: any = { 'Text': '' };
  isBgYellow: boolean = false;
  isBgGreen: boolean = false;
  isBgRed: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
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
      this.validarUAInventario(this.vParameter.Id_Inventario, this.sGlobal.Id_Almacen, this.vParameter.Id_Articulo, this.strCodeBarUA);
      //     txtCantidad.Tag = validaUA.Saldo.ToString();
    }
  }

  validarUAInventario(strIdInventario, intIdAlmacen, intIdProducto, strUA): void{
    this.sInve.validarUAInventario(strIdInventario, intIdAlmacen, intIdProducto, strUA).then(result=>{
      debugger;
      let res: any = result;

      if(res != null) {
        if(res.FlagInventario.toUpperCase() == "INVENTARIADO"){
          alert('Este artículo ya fue inventariado');
          //txtAveriados.Text = validaUA.CantidadAveriado.ToString();
          //txtCantidad.Text = validaUA.CantidadInventario.ToString();
        }

          //intIdProducto = validaUA.Id_Producto;
          //strLote = validaUA.LoteLab;

        this.isBgYellow = true;
        this.isBgGreen = false;
        this.txtCantidad.Enabled = false;
        //this.isVisibleData = true;
        this.strArticulo = res.Producto;
        this.strUM = res.UM;
      //               txtCodBarra.ReadOnly = true;
      //               txtAveriados.SelectAll();
      //               txtAveriados.Focus();

        if(res.BULTO.toUpperCase() == "BULTO_CERRADO"){
          
          let alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: '¿Es un bulto cerrado?',
            buttons: [
              {
                text: 'No',
                role: 'cancel',
                handler: () => {
                  debugger;
                  this.isVisibleData = true;
                }
              },
              {
                text: 'Si',
                handler: () => {
                  this.txtAveriados.Text = res.CantidadAveriado;
                  this.txtCantidad.Text = res.Saldo;
                  if(this.validarDatoInv()){
                    debugger;

                    this.isVisibleData = false;
                  }
                  
                        //txtAveriados.Text = validaUA.CantidadAveriado.ToString();
                        //txtCantidad.Text = validaUA.Saldo.ToString();
                        //if (validarDatosINV())
                        //{
                        //  grabarDatosInv();
                        //}
                }
              }
            ]
          });
          alert.present();

        }
      
      //               if (validaUA.BULTO.ToUpper() == "BULTO_CERRADO")
      //               {
      //                   if (MessageBox.Show("¿Es un bulto cerrado?", "Aviso", MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2) == System.Windows.Forms.DialogResult.Yes)
      //                   {
      //                       txtAveriados.Text = validaUA.CantidadAveriado.ToString();
      //                       txtCantidad.Text = validaUA.Saldo.ToString();
      //                       if (validarDatosINV())
      //                       {
      //                           grabarDatosInv();
      //                       }
      //                   }
      //               }

      }else{
        this.isBgRed = true;
        alert('Código de artículo no encontrado');
        // txtCodBarra.SelectAll();
        // txtCodBarra.Focus();
      }

      // if (validaUA != null)
      //           {
      //               if (validaUA.FlagInventario.ToUpper() == "INVENTARIADO")
      //               {
      //                   MessageBox.Show("Este artículo ya fue inventariado", "Inventario", MessageBoxButtons.OK, MessageBoxIcon.Exclamation, MessageBoxDefaultButton.Button1);

      //               }

      //               intIdProducto = validaUA.Id_Producto;
      //               strLote = validaUA.LoteLab;


      //               StringBuilder sb = new StringBuilder();
      //               string fecha = DateTime.Now.Date.ToShortDateString();
      //               string fechaHora = Convert.ToString(DateTime.Now);
      //               sb.Append("L|");
      //               sb.Append(fechaHora);
      //               sb.Append("|");
      //               sb.Append(validaUA.UA_CodBarra.ToString());
      //               sb.Append("|");
      //               sb.Append(txtCodUbicacion.Text);
      //               sb.Append("|");
      //               sb.Append(idInventario);
      //               sb.Append("|");
      //               sb.Append(control.Global.Usuario);


      //               string rutaTxt = "\\Flash File Store\\Log" + fecha.Replace("/","") + "_" + idInventario + ".txt";

      //               using (StreamWriter outfile = new StreamWriter(rutaTxt, true))
      //               {
      //                   outfile.WriteLine(sb.ToString());
      //               }


      //               pnl03.BackColor = Color.Yellow;
      //               pnlDatos.BackColor = Color.Yellow;
      //               txtCantidad.ReadOnly = false;
      //               pnlDatos.Visible = true;
      //               lblArticulo.Text = validaUA.Producto.ToString();
      //               txtUM.Text = validaUA.UM.ToString();
      //               txtCodBarra.ReadOnly = true;
      //               txtAveriados.SelectAll();
      //               txtAveriados.Focus();


      //               if (validaUA.BULTO.ToUpper() == "BULTO_CERRADO")
      //               {
      //                   if (MessageBox.Show("¿Es un bulto cerrado?", "Aviso", MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2) == System.Windows.Forms.DialogResult.Yes)
      //                   {
      //                       txtAveriados.Text = validaUA.CantidadAveriado.ToString();
      //                       txtCantidad.Text = validaUA.Saldo.ToString();
      //                       if (validarDatosINV())
      //                       {
      //                           grabarDatosInv();
      //                       }
      //                   }
      //               }
      //           }
      //           else
      //           {
      //               pnl03.BackColor = Color.Red;
      //               pnlDatos.BackColor = Color.Red;
      //               MessageBox.Show("Código de artículo no encontrado", "Inventario",
      //                   MessageBoxButtons.OK, MessageBoxIcon.Hand, MessageBoxDefaultButton.Button1);
      //               txtCodBarra.SelectAll();
      //               txtCodBarra.Focus();
      //           }

    });
  }

  validarDatoInv(): boolean {
    if(this.strUbicacion.trim().length == 0 ){
      alert('Ingrese código de ubicación');
      return false;
    }

    if(this.strCodeBarUA.trim().length == 0){
      alert('Ingrese código de artículo');
      return false;
    }

    if(this.txtCantidad.Text.length == 0){
      alert('Ingrese la cantidad');
      return false;
    }

    // if(!isNumber(this.txtCantidad.text)){
    //   alert('Cantidad incorrecta');
    //   return false;
    // }

    if(parseFloat(this.txtCantidad.Text) == 0){
      let message = this.alertCtrl.create({
        title: 'Confirmar eliminación',
        message: '¿La cantidad ingresada es 0.00 ¿Está seguro de registrarla?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              debugger;
              return false;
            }
          },
          {
            text: 'Si',
            handler: () => {
              debugger;
              return true;
            }
          }
        ]
      });
      message.present();
    }

    return true;
  }

  insertarUAInventario(strIdInventario, intIdSector, strFila, intIdProducto, strLote, strUA, decCantidadUA, decCantidadINV, decCantidadAVE, intIdUbicacionUA, intIdUbicacionINV, bolFlagActualiza, strUser){
    this.sInve.insertarUAInventario(strIdInventario, intIdSector, strFila, intIdProducto, strLote, strUA, decCantidadUA, decCantidadINV, decCantidadAVE, intIdUbicacionUA, intIdUbicacionINV, bolFlagActualiza, strUser)
    .then(result=>{
      
    });
  }
}
