import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { InventarioPage_06Page } from '../inventario-page-06/inventario-page-06';
import { InventarioPage_04Page } from '../inventario-page-04/inventario-page-04';

/**
 * Generated class for the InventarioPage_03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario-page-03',
  templateUrl: 'inventario-page-03.html',
})
export class InventarioPage_03Page {

  vParameter: any;
  btnIniciar: any = { 'Text': ''};
  txtInventareador: any = { 'Text': '', 'ReadOnly': false };
  dtpFecha: any = { 'Text': new Date().toISOString(), 'Enabled': true};
  lblInfo01: any = { 'Text': '', 'Value': '' };
  lblInfo02: any = { 'Text': '', 'Value': '' };
  strTipoInventario: string = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
    debugger;
    this.vParameter = this.navParams.get('vParameter');
    this.strTipoInventario = this.vParameter.TipoInventario;

    if(this.vParameter.Id_Estado == 10){
      this.btnIniciar.Text = 'Iniciar';
      this.txtInventareador.ReadOnly = false;
      this.dtpFecha.Enabled = false;
    //     dtpFecha.Text = DateTime.Now.ToShortDateString();
    //     btnIniciar.Text = "Iniciar";
    //     txtInventareador.ReadOnly = false;
    //     dtpFecha.Enabled = false;
    //     ManejoPaneles(2);
    //     //estado en proceso

    }else{
      this.btnIniciar.Text = 'Continuar';
      this.dtpFecha.Enabled = false;
      this.txtInventareador.Text = "";

    //     dtpFecha.Enabled = false;
    //     if (rbtPerchas.Checked)
    //     {
    //         txtInventareador.Text = "";
    //     }
    //     ManejoPaneles(2);
    }
    
    this.lblInfo01.Text = (this.strTipoInventario == 'GENERAL') ? 'Sector' : 'Código';
    this.lblInfo01.Value = (this.strTipoInventario == 'GENERAL') ? this.vParameter.Sector : this.vParameter.Codigo;
    this.lblInfo02.Text = (this.strTipoInventario == 'GENERAL') ? 'Fila/Percha' : 'Artículo';
    this.lblInfo02.Value = (this.strTipoInventario == 'GENERAL') ? this.vParameter.Fila : this.vParameter.Producto;
    this.txtInventareador.Text = this.vParameter.UsuarioInventariador;
  }

  ionViewDidLoad() {
    
  }

  continuarInventario(): void{
    debugger;
    if(this.btnIniciar.Text == 'Iniciar'){

      if(this.txtInventareador.Text.trim() == ""){
        alert('Ingrese Inventareador');
        return;
      }else{
        const confirm = this.alertCtrl.create({
          title: 'Inventario',
          message: '¿Está seguro de iniciar el inventario?',
          buttons: [
            {
              text: 'Si',
              handler: () => {
                debugger;
                this.btnIniciar.Text = 'Continuar';
                this.dtpFecha.Enabled = false;
                this.initInventario(this.vParameter.Id_Inventario, 1);

                if(this.strTipoInventario == 'GENERAL'){
                  this.goToInventPage04();
//                     ManejoPaneles(3);
                }else if(this.strTipoInventario == 'CICLICO'){
                  this.goToInventPage06();
                  //                     CargarListaInventarioUbicacionesSugeridas();
                  //                     ManejoPaneles(5);
                }
              }
            },
            {
              text: 'No',
              handler: () => {
                return;
              }
            }
          ]
        });
        confirm.present();
      }

    }else{
      if(this.strTipoInventario == 'CICLICO'){
        this.goToInventPage06();
    //                 ManejoPaneles(5);
    //                 CargarListaInventarioUbicacionesSugeridas();
      }else{
        this.goToInventPage04();
    //                 ManejoPaneles(3);
      }
    }
  }

  cerrarInventario(): void{
    debugger;
    if(this.vParameter.Id_Estado == 3){

      const confirm = this.alertCtrl.create({
        title: 'Confirmar cierre',
        message: '¿Está seguro de cerrar el inventario del sector ' + this.lblInfo01.Value + ', fila ' + this.lblInfo02.Value + '?',
        buttons: [
          {
            text: 'Si',
            handler: () => {
              debugger;
              this.initInventario(this.vParameter.Id_Inventario, 2);
            }
          },
          {
            text: 'No',
            handler: () => {
              return;   
            }
          }
        ]
      });
      confirm.present();
    }else{
      alert('No puede cerrar un inventario que no se ha iniciado');
      return;
    }
  }

  initInventario(Id_Tx, intTipo): void{
    if(this.strTipoInventario == 'GENERAL'){
      this.iniTerInvXPercha(Id_Tx, this.lblInfo01.Value, this.lblInfo02.Value, this.txtInventareador.Text, this.sGlobal.userName, this.sGlobal.Id_TerminalRF, intTipo);
    }else{
      this.iniTerInvXProducto(Id_Tx, this.lblInfo01.Value, this.vParameter.Lote, this.txtInventareador.Text, this.sGlobal.userName, this.sGlobal.Id_TerminalRF, intTipo);
    }
  }

  iniTerInvXProducto(strIdInventario, intIdProducto, strLote, strUsuarioInventariador, strUsuario, intIdRF, intTipo): void{
    this.sInve.iniTerInvXProducto(strIdInventario, intIdProducto, strLote, strUsuarioInventariador, strUsuario, intIdRF, intTipo).then(result=>{
      debugger;
      let res: any = result;
      if (res.errNumber != 0)
      {
        alert("No se pudo cerrar el inventario");
      }else{
        alert("Cierre de inventario exitoso");
      }
    });
  }
  
  iniTerInvXPercha(strIdInventario, intIdSector, strFila, strUsuarioInventariador, strUsuario, intIdRF, intTipo): void{
    this.sInve.iniTerInvXPercha(strIdInventario, intIdSector, strFila, strUsuarioInventariador, strUsuario, intIdRF, intTipo).then(result=>{
      debugger;
      let res: any = result;
      if (res.errNumber != 0)
      {
        alert("No se pudo inicializar el inventario");
      }else{
        alert("Cierre de inventario exitoso");
      }
    });
  }

  goToInventPage04(): void{
    debugger;
    var parameter: any;

    parameter = (this.vParameter.TipoInventario == 'GENERAL') ? 
      {
        'Fila': this.vParameter.Fila,
        'Id_Estado': this.vParameter.Id_Estado,
        'Id_Inventario': this.vParameter.Id_Inventario,
        'Id_Sector': this.vParameter.Id_Sector,
        'Sector': this.vParameter.Sector,
        'UsuarioAsignado': this.vParameter.UsuarioAsignado,
        'UsuarioInventariador': this.vParameter.UsuarioInventariador,
        'TipoInventario': this.vParameter.TipoInventario
      }
    :
      {
        'Id_Inventario' : this.vParameter.Id_Inventario,
        'Id_Estado' : this.vParameter.Id_Estado,
        'UsuarioInventariador' : this.vParameter.UsuarioInventariador,
        'UsuarioAsignado' : this.vParameter.UsuarioAsignado,
        'Id_Producto' : this.vParameter.Id_Producto,
        'Codigo' : this.vParameter.Codigo,
        'Producto' : this.vParameter.Producto,
        'Lote' : this.vParameter.Lote,
        'TipoInventario': this.vParameter.TipoInventario
      }
     ;

    this.navCtrl.push(InventarioPage_04Page, {'vParameter': parameter});
  }

  goToInventPage06(): void{
    this.navCtrl.push(InventarioPage_06Page);
  }

  @ViewChild(Content) content: Content;

  fixScroll(){
    //if(this.device.platform == "Android"){
      setTimeout(() => {
      debugger;
        let element = document.getElementById("absence-textarea");
        let box = element.getBoundingClientRect();
        let top = Math.round(box.top*10);
        this.content.scrollTo(0, top, 100);
      }, 350);
    //}
  }

}
