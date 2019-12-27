import { Component, ViewChild, ElementRef } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { InventarioPage_06Page } from '../inventario-page-06/inventario-page-06';
import { InventarioPage_04Page } from '../inventario-page-04/inventario-page-04';
import moment from 'moment';

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
  vParametrosDetalleProgramacion: any;
  vParameter: any;
  isInit: boolean = false;
  btnIniciar: any = { 'Text': '' };
  txtInventareador: any = { 'Text': '', 'ReadOnly': false };
  dtpFecha: any = { 'Text': new Date().toISOString(), 'Enabled': true };
  lblInfo01: any = { 'Text': '', 'Value': '' };
  lblInfo02: any = { 'Text': '', 'Value': '' };
  strTipoInventario: string = "";
  @ViewChild('inputInventariador', { read: ElementRef }) private inputInventariador: ElementRef;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
    this.strTipoInventario = this.vParameter.TipoInventario;
    if (this.vParameter.Id_Estado == 10) {
      this.btnIniciar.Text = 'Iniciar';
      this.txtInventareador.ReadOnly = false;
      this.dtpFecha.Enabled = false;
      this.isInit = false;

    } else {
      this.btnIniciar.Text = 'Continuar';
      this.dtpFecha.Enabled = false;
      this.isInit = true;
      this.txtInventareador.Text = "";
    }
    this.dtpFecha.Text = moment(this.vParameter.FechaProgramacion).toISOString();
    this.lblInfo01.Text = (this.strTipoInventario == 'GENERAL') ? 'Sector' : 'Código';
    this.lblInfo01.Value = (this.strTipoInventario == 'GENERAL') ? this.vParameter.Id_Sector : this.vParameter.Codigo /**Id_Producto**/;
    this.lblInfo02.Text = (this.strTipoInventario == 'GENERAL') ? 'Fila/Rack' : 'Artículo';
    this.lblInfo02.Value = (this.strTipoInventario == 'GENERAL') ? this.vParameter.Fila : this.vParameter.Producto;
    this.txtInventareador.Text = this.vParameter.UsuarioInventariador;
  }

  continuarInventario(): void {
    if (this.btnIniciar.Text == 'Iniciar') {
      if (this.txtInventareador.Text.trim() == "") {
        alert('Ingrese Inventariador');
        this.selectAll(this.inputInventariador, 500);
        return;
      } else {
        const confirm = this.alertCtrl.create({
          title: 'Inventario',
          message: '¿Está seguro de iniciar el inventario?',
          buttons: [
            {
              text: 'Si',
              handler: () => {
                this.btnIniciar.Text = 'Continuar';
                this.dtpFecha.Enabled = false;
                this.initInventario(this.vParameter.Id_Inventario, 1);

                if (this.strTipoInventario == 'GENERAL') {
                  this.goToInventPage04();
                } else if (this.strTipoInventario == 'CICLICO') {
                  this.goToInventPage06();
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

    } else {
      if (this.strTipoInventario == 'CICLICO') {
        this.goToInventPage06();
      } else {
        this.goToInventPage04();
      }
    }
  }

  cerrarInventario(): void {
    if (this.vParameter.Id_Estado == 3) {
      if (this.strTipoInventario == 'GENERAL') {
        const confirm = this.alertCtrl.create({
          title: 'Confirmar cierre',
          message: '¿Está seguro de cerrar el inventario del Sector ' + this.vParameter.Sector + ', ' + this.lblInfo02.Text + ' ' + this.lblInfo02.Value + '?',
          buttons: [
            {
              text: 'Si',
              handler: () => {
                this.initInventario(this.vParameter.Id_Inventario, 2);              

                this.navCtrl.pop().then(() => {
                  this.vParametrosDetalleProgramacion = {
                    'Id_Inventario': this.vParameter.Id_Inventario,
                    'Id_Estado': this.vParameter.Id_Estado,
                    'TipoInventario': this.vParameter.TipoInventario,
                    'FechaProgramacion' :this.vParameter.FechaProgramacion,
                  };
                  debugger;
                  this.navParams.get('DetalleProgramacion')(this.vParametrosDetalleProgramacion);
                });

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
      else{
        const confirm = this.alertCtrl.create({
          title: 'Confirmar cierre',
          message: '¿Está seguro de cerrar el inventario del ' + this.lblInfo02.Text + ' ' + this.lblInfo02.Value + '?',
          buttons: [
            {
              text: 'Si',
              handler: () => {
                this.initInventario(this.vParameter.Id_Inventario, 2);     
                
                this.navCtrl.pop().then(() => {
                  this.vParametrosDetalleProgramacion = {
                    'Id_Inventario': this.vParameter.Id_Inventario,
                    'Id_Estado': this.vParameter.Id_Estado,
                    'TipoInventario': this.vParameter.TipoInventario,
                    'FechaProgramacion' :this.vParameter.FechaProgramacion,
                  };                  
                  this.navParams.get('DetalleProgramacion')(this.vParametrosDetalleProgramacion);
                });
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
    } else {
      alert('No puede cerrar un inventario que no se ha iniciado');
      this.selectAll(this.inputInventariador, 500);
      return;
    }
  }

  initInventario(Id_Tx, intTipo): void {
    console.log(Id_Tx, this.lblInfo01.Value, this.vParameter.Lote, this.txtInventareador.Text, this.sGlobal.userName, this.sGlobal.Id_TerminalRF, intTipo);
    if (this.strTipoInventario == 'GENERAL') {
      this.iniTerInvXPercha(Id_Tx, this.lblInfo01.Value, this.lblInfo02.Value, this.txtInventareador.Text, this.sGlobal.userName, this.sGlobal.Id_TerminalRF, intTipo);
    } else {
      this.iniTerInvXProducto(Id_Tx, this.vParameter.Id_Producto, this.vParameter.Lote, this.txtInventareador.Text, this.sGlobal.userName, this.sGlobal.Id_TerminalRF, intTipo);
    }
  }

  iniTerInvXProducto(strIdInventario, intIdProducto, strLote, strUsuarioInventariador, strUsuario, intIdRF, intTipo): void {
    this.sInve.iniTerInvXProducto(strIdInventario, intIdProducto, strLote, strUsuarioInventariador, strUsuario, intIdRF, intTipo).then(result => {
      let res: any = result;
      console.log(res.errNumber,"rpta");
      if(intTipo != 1){
        if (res.errNumber != 0) {
          alert("No se pudo cerrar el inventario");
        } else {
          alert("Cierre de inventario exitoso");
        }
      }
    });
  }

  iniTerInvXPercha(strIdInventario, intIdSector, strFila, strUsuarioInventariador, strUsuario, intIdRF, intTipo): void {
    this.sInve.iniTerInvXPercha(strIdInventario, intIdSector, strFila, strUsuarioInventariador, strUsuario, intIdRF, intTipo).then(result => {
      let res: any = result;
      if(intTipo != 1){
        if (res.errNumber != 0) {
          alert("No se pudo cerrar el inventario");
        } else {
          alert("Cierre de inventario exitoso");
        }
      }
    });
  }

  goToInventPage04(): void {
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
        'Id_Inventario': this.vParameter.Id_Inventario,
        'Id_Estado': this.vParameter.Id_Estado,
        'UsuarioInventariador': this.vParameter.UsuarioInventariador,
        'UsuarioAsignado': this.vParameter.UsuarioAsignado,
        'Id_Producto': this.vParameter.Id_Producto,
        'Codigo': this.vParameter.Codigo,
        'Producto': this.vParameter.Producto,
        'Lote': this.vParameter.Lote,
        'TipoInventario': this.vParameter.TipoInventario
      }
      ;

    this.navCtrl.push(InventarioPage_04Page, { 'vParameter': parameter });
  }

  goToInventPage06(): void {
    let parameter = {
      'Codigo': this.vParameter.Codigo,
      'Id_Estado': this.vParameter.Id_Estado,
      'Id_Inventario': this.vParameter.Id_Inventario,
      'Id_Producto': this.vParameter.Id_Producto,
      'Lote': this.vParameter.Lote,
      'Producto': this.vParameter.Producto,
      'TipoInventario': this.vParameter.TipoInventario,
      'UsuarioAsignado': this.vParameter.UsuarioAsignado,
      'UsuarioInventariador': this.vParameter.UsuarioInventariador
    };

    this.navCtrl.push(InventarioPage_06Page, { 'vParameter': parameter });
  }
  
  fixScroll() {
    setTimeout(() => {
      let element = document.getElementById("absence-textarea");
      let box = element.getBoundingClientRect();
      let top = Math.round(box.top * 10);
      this.content.scrollTo(0, top, 100);
    }, 350);
  }

  selectAll(el: ElementRef, time) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(() => {
      nativeEl.select();
    }, time);
  }

  ionViewWillEnter() {
    this.selectAll(this.inputInventariador, 500);
  }
}
