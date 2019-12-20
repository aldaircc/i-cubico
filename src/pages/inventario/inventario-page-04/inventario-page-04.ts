import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar } from 'ionic-angular';
import { InventarioServiceProvider } from '../../../providers/inventario-service/inventario-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { InventarioPage_05Page } from '../inventario-page-05/inventario-page-05';
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
  dblSaldoUA: number = 0;
  uaValidada: any;
  txtCantidad: any = { 'Text': '0', 'Tag': '', 'Enabled': true };
  txtAveriados: any = { 'Text': '' };
  isBgYellow: boolean = false;
  isBgGreen: boolean = false;
  isBgRed: boolean = false;
  listUAsxUbi: any;
  intCountUAs: number = 0;
  lblInfo01: any = { 'Text': '', 'Value': '' };
  lblInfo02: any = { 'Text': '', 'Value': '' };

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('inputAveriado') inputAveriado;
  @ViewChild('inputUbicacion', { read: ElementRef }) private inputUbicacion: ElementRef;
  @ViewChild('inputCantidad', { read: ElementRef }) private inputCantidad: ElementRef;
  @ViewChild('inputCodeBarUA', { read: ElementRef }) private inputCodeBarUA: ElementRef;

  @ViewChild('inputCodeBarUA') inputCodeBarUA2;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public sInve: InventarioServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
    this.strTipoInventario = this.vParameter.TipoInventario;
    console.log('vParameter page 04', this.vParameter);

    this.lblInfo01.Text = (this.strTipoInventario == 'GENERAL') ? 'Sector:' : 'Código:';
    this.lblInfo01.Value = (this.strTipoInventario == 'GENERAL') ? this.vParameter.Id_Sector : this.vParameter.Codigo /**Id_Producto**/;
    this.lblInfo02.Text = (this.strTipoInventario == 'GENERAL') ? 'Fila/Rack:' : 'Artículo:';
    this.lblInfo02.Value = (this.strTipoInventario == 'GENERAL') ? this.vParameter.Fila : this.vParameter.Producto;
  }

  presentAlert(message): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [{
          text: 'Si',
          handler: () => {
            resolve(true);
          }
        }, {
          text: 'No',
          role: 'cancel',
          handler: () => {
            resolve(false);
          }
        },]
      });
      confirm.present();
    })
  }

  cambiarUbicacion(intId_Inventario, strId_Ubicacion): void {
    this.listarUAsXUbicacionInventario(intId_Inventario, strId_Ubicacion);
  }

  listarUAsXUbicacionInventario(strIdInventario, strCodBarraUbi): void {
    
    this.sInve.listarUAsXUbicacionInventario(strIdInventario, strCodBarraUbi).then(result => {
      this.listUAsxUbi = result;
      this.intCountUAs = this.listUAsxUbi.length;
      if (this.intCountUAs != this.vParameter.cantidadxUbicacion) {
        console.log(this.intCountUAs,"total count uas");
        console.log(this.vParameter.cantidadxUbicacion,"total cant ubicación");
        this.presentAlert("No se ha inventariado todas UAs de esta ubicación,\r ¿Está seguro de continuar?").then((resultAlert) => {
          if (resultAlert) {
            if (this.vParameter.TipoInventario == 'CICLICO') {
              this.navCtrl.remove(this.navCtrl.getViews().length - 2, 2);
            } else {
              this.navCtrl.pop();
            }
          } else {
            this.selectAll((this.intId_Ubicacion != 0 && this.intId_Ubicacion != undefined) ? this.inputCodeBarUA : this.inputUbicacion, 500);
          }
        });
      }
    });
  }

  validarUbicacion(): void {    
    if (this.strUbicacion.trim() == "") {
      alert("Ingrese código de ubicación");
    }
    else if (this.strUbicacion.length != 14) {
      alert("El código de ubicación debe tener 14 dígitos.");
    }
    else{
      if (this.strTipoInventario == 'GENERAL') {
        this.validarUbicacionInventario(this.strUbicacion, this.sGlobal.Id_Almacen, this.vParameter.Id_Sector, this.vParameter.Fila, 1);
      } else {
        if (this.strUbicacion.trim() == this.vParameter.CodigoBarra.trim()) {
          this.validarUbicacionInventario(this.strUbicacion, this.sGlobal.Id_Almacen, 0, "", 2);
        } else {
          let message = this.alertCtrl.create({
            title: 'Inventario',
            message: 'Ubicación no corresponde, ¿Desea inventariar?',
            buttons: [
              {
                text: 'No',
                role: 'cancel',
                handler: () => {
                  return;
                }
              },
              {
                text: 'Si',
                handler: () => {
                  this.validarUbicacionInventario(this.strUbicacion, this.sGlobal.Id_Almacen, 0, "", 2);
                  return true;
                }
              }
            ]
          });
          message.present();

        }
      }
   }
  }

  validarUbicacionInventario(CodBarraUbi, intIdAlmacen, intIdSector, strFila, intTipo): void {
    this.sInve.validarUbicacionInventario(CodBarraUbi, intIdAlmacen, intIdSector, strFila, intTipo).then(result => {
      let res: any = result;
      if (res.errNumber == 1) {
        this.intId_Ubicacion = parseInt(res.valor1);
        this.isEnabledCodeBar = true;
        this.isEnabledUbicacion = false;
        this.selectAll(this.inputCodeBarUA, 700);
      } else {
        alert(res.message);
        this.selectAll(this.inputUbicacion, 500);
      }
    });
  }

  buscarArticuloEnLista(): void {
    if (this.strCodeBarUA.length != 12) {
      alert("El código de ubicación debe tener 12 caracteres.");
    }
    else{
      if (this.vParameter.TipoInventario == 'GENERAL') {
        this.validarUAInventario(this.vParameter.Id_Inventario, this.sGlobal.Id_Almacen, 0, this.strCodeBarUA);      
      } else {
        this.validarUAInventario(this.vParameter.Id_Inventario, this.sGlobal.Id_Almacen, this.vParameter.Id_Producto, this.strCodeBarUA);      
      }
    }
  }

  validarUAInventario(strIdInventario, intIdAlmacen, intIdProducto, strUA): void {
    this.sInve.validarUAInventario(strIdInventario, intIdAlmacen, intIdProducto, strUA).then(result => {
      this.uaValidada = null;
      let res: any = result;
      if (res != null && res.length > 0) {

        this.uaValidada = res[0];

        if (res[0].FlagInventario.toUpperCase() == "INVENTARIADO") {
          alert('Este artículo ya fue inventariado');
          this.txtAveriados.Text = res[0].CantidadAveriado;
          this.txtCantidad.Text = res[0].CantidadInventario;
        }

        this.dblSaldoUA = res[0].Saldo;
        this.isBgYellow = true;
        this.isBgGreen = false;
        this.isBgRed = false;
        this.txtCantidad.Enabled = false;
        this.isVisibleData = true;
        this.strArticulo = res[0].Producto;
        this.strUM = res[0].UM;

        if(strUA.substring(0,1)=="P"){
          this.isVisibleData = false;
          this.isBgYellow = false;
          this.strCodeBarUA = "";
          setTimeout(() => {
            this.inputCodeBarUA2.setFocus();
          }, 600);
        }

        if (res[0].BULTO.toUpperCase() == "BULTO_CERRADO") {

          let alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: '¿Es un bulto cerrado?',
            buttons: [
              {
                text: 'No',
                role: 'cancel',
                handler: () => {
                  if(strUA.substring(0,1)=="P"){
                    this.isVisibleData = false;
                    this.isBgYellow = false;
                    this.strCodeBarUA = "";
                    setTimeout(() => {
                      this.inputCodeBarUA2.setFocus();
                    }, 600);
                  }
                  else{
                    this.isVisibleData = true;
                    setTimeout(() => {
                      this.inputAveriado.setFocus();
                    }, 600);
                  }
                }
              },
              {
                text: 'Si',
                handler: () => {
                  this.txtAveriados.Text = res[0].CantidadAveriado;
                  this.txtCantidad.Text = res[0].Saldo;                  
                  if (!this.validarDatoInv()) {
                    this.isVisibleData = false;
                    this.grabarDatosInvent(this.uaValidada);                    
                  }                  
                  setTimeout(() => {
                    this.inputCodeBarUA2.setFocus();
                  }, 600); 
                }
              }
            ]
          });                    
          alert.present();                      
        }        
      } else {
        this.isBgRed = true;
        this.isBgGreen = false;
        this.isBgYellow = false;
        this.isVisibleData = false;
        alert('Código de artículo no encontrado');
        this.strCodeBarUA = "";
        this.selectAll(this.inputCodeBarUA, 500);
      }
    });
  }


  validarDatoInv(): boolean {
    if (this.strUbicacion.trim().length == 0) {
      alert('Ingrese código de ubicación');
      return true;
    }

    if (this.strCodeBarUA.trim().length == 0) {
      alert('Ingrese código de artículo');
      return true;
    }

    if (this.txtCantidad.Text.length == 0) {
      alert('Ingrese la cantidad');
      return true;
    }
    if (parseFloat(this.txtCantidad.Text) <= 0) {
      alert('Cantidad Incorrecta');
      return true;
    }
    return false;
  }

  grabarDatosInvent(checkedUA): void {
    var flagActualizado = (checkedUA.CantidadInventario == 0) ? false : true;
    if (this.vParameter.TipoInventario == 'CICLICO') {
      this.insertarUAInventario(this.vParameter.Id_Inventario,
        0,
        "",
        this.vParameter.Id_Producto,
        checkedUA.LoteLab,
        this.strCodeBarUA,
        checkedUA.Cantidad,
        this.txtCantidad.Text,
        parseFloat((this.txtAveriados.Text.length <= 0) ? 0 : this.txtAveriados.Text),
        checkedUA.IdUbicacion,
        this.intId_Ubicacion,
        flagActualizado,
        this.sGlobal.userName);
    } else if (this.vParameter.TipoInventario == 'GENERAL') {

      this.insertarUAInventario(this.vParameter.Id_Inventario,
        this.vParameter.Id_Sector,
        this.vParameter.Fila,
        checkedUA.Id_Producto,
        checkedUA.LoteLab,
        this.strCodeBarUA,
        checkedUA.Cantidad,
        this.txtCantidad.Text,
        parseFloat((this.txtAveriados.Text.length <= 0) ? 0 : this.txtAveriados.Text),
        checkedUA.IdUbicacion,
        this.intId_Ubicacion,
        flagActualizado,
        this.sGlobal.userName);
    }
  }

  insertarUAInventario(strIdInventario, intIdSector, strFila, intIdProducto, strLote, strUA, decCantidadUA, decCantidadINV, decCantidadAVE, intIdUbicacionUA, intIdUbicacionINV, bolFlagActualiza, strUser) {
    this.sInve.insertarUAInventario(strIdInventario, intIdSector, strFila, intIdProducto, strLote, strUA, decCantidadUA, decCantidadINV, decCantidadAVE, intIdUbicacionUA, intIdUbicacionINV, bolFlagActualiza, strUser)
      .then(result => {
        let res: any = result;
        if (res.errNumber == 1) {
          this.limpiarCampos();
          this.isVisibleData = false;
          this.isBgYellow = false;
          this.isBgRed = false;
          this.isBgGreen = true;          
        } else {
          this.isBgYellow = false;
          this.isBgRed = true;
          this.isBgGreen = false;
          alert('Reintente otra vez...');
        }
      });
  }

  registrar(): void {
    if (!this.validarDatoInv()) {
      if (parseFloat(this.txtCantidad.Text) == 0) {
        let message = this.alertCtrl.create({
          title: 'Confirmar eliminación',
          message: '¿La cantidad ingresada es 0.00 ¿Está seguro de registrarla?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                return;
              }
            },
            {
              text: 'Si',
              handler: () => {
                this.continueGrabar();  
                setTimeout(() => {
                  this.inputCodeBarUA2.setFocus();
                }, 600);                                
              }
            }
          ]
        });
        message.present();
      } else {
        this.continueGrabar();
        setTimeout(() => {
          this.inputCodeBarUA2.setFocus();
        }, 600);  
      }
    }
  }

  continueGrabar(): void {
    let saldoActualUA = this.dblSaldoUA;
    let conteoUA = parseFloat(this.txtCantidad.Text);
    let isCorrect: boolean = false;

    if (saldoActualUA == conteoUA) {
      isCorrect = true;
    }

    if (isCorrect == false) {

      let message = this.alertCtrl.create({
        title: 'Aviso',
        message: 'Existe diferencias en el conteo, se recomienda que revise otra vez. ¿Desea registar este conteo?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.selectAll(this.inputCantidad, 1000);
              return;
            }
          },
          {
            text: 'Si',
            handler: () => {
              isCorrect = true;
              this.grabarDatosInvent(this.uaValidada);
            }
          }
        ]
      });
      message.present();
    } else {
      this.grabarDatosInvent(this.uaValidada);
    }
  }

  cambiarArticulo(): void {
    this.strCodeBarUA = "";
    this.isVisibleData = false;
    this.txtCantidad.Text = "0";
    this.txtAveriados.Text = "0";
    this.uaValidada = null;
    this.selectAll(this.inputCodeBarUA, 500);
  }

  limpiarCampos(): void {
    this.strArticulo = '';
    this.strUM = '';
    this.txtCantidad.Text = '';
    this.txtAveriados.Text = '';
    this.strCodeBarUA = '';
  }

  selectAll(el: ElementRef, time) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(() => {
      nativeEl.select();
    }, time);
  }

  goToDetail(): void {
    if (this.vParameter.TipoInventario == 'CICLICO') {
      this.goToInventPage05();
    } else {
      if (this.intId_Ubicacion != 0 && this.intId_Ubicacion != undefined) {
        this.goToInventPage05();
      } else {
        alert('Ingrese y verifique un código de ubicación');
        this.selectAll(this.inputUbicacion, 500);
      }
    }
  }

  goToInventPage05(): void {
    let parameter = {
      'Fila': this.vParameter.Fila,
      'Id_Estado': this.vParameter.Id_Estado,
      'Id_Inventario': this.vParameter.Id_Inventario,
      'Id_Sector': this.vParameter.Id_Sector,
      'Sector': this.vParameter.Sector,
      'TipoInventario': this.vParameter.TipoInventario,
      'UsuarioAsignado': this.vParameter.UsuarioAsignado,
      'UsuarioInventariador': this.vParameter.UsuarioInventariador,

      'Cod_Ubicacion': this.strUbicacion,
      'Id_Producto': (this.vParameter.Id_Producto != undefined) ? this.vParameter.Id_Producto : -1,
      'Codigo': this.vParameter.Codigo,
      'Producto': this.vParameter.Producto
    };

    this.navCtrl.push(InventarioPage_05Page, { 'vParameter': parameter });
  }

  pressEnterAveriado(): void {
    this.txtAveriados.Text = '0';
    this.selectAll(this.inputCantidad, 600);
  }

  ionViewWillEnter() {
    this.limpiarCampos();
    this.selectAll((this.intId_Ubicacion != 0 && this.intId_Ubicacion != undefined) ? this.inputCodeBarUA : this.inputUbicacion, 600);
    this.isVisibleData = false;
    this.isBgGreen = false;
    this.isBgYellow = false;
    this.isBgRed = false;
  }

  //Validar si cuenta con uas pendientes !!!
  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.cambiarUbicacion(this.vParameter.Id_Inventario, ((this.vParameter.TipoInventario == 'GENERAL') ? this.strUbicacion : this.vParameter.CodigoBarra));
    }
  }

  presentAlertConfirm(message): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: 'Mensaje',
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      confirm.present();
    })
  }
}
