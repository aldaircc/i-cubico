import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Checkbox } from 'ionic-angular';
import moment from 'moment';
import { ImpresoraServiceProvider } from '../../../providers/impresora-service/impresora-service';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EtiquetadoServiceProvider } from '../../../providers/etiquetado-service/etiquetado-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { EmbalajePage_04Page } from '../embalaje-page-04/embalaje-page-04';
import { EmbalajePage_10Page } from '../embalaje-page-10/embalaje-page-10';
import { EmbalajePage_03Page } from '../embalaje-page-03/embalaje-page-03';


/**
 * Generated class for the EmbalajePage_08Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embalaje-page-08',
  templateUrl: 'embalaje-page-08.html',
})
export class EmbalajePage_08Page {

  listImpresora: any;
  listDetBultosEmbalaje: any;
  vEmbalajeTotalPage02: any;
  formatLabels: any = 'ETQ_Bultov2.txt';
  formatLabelsGrande: any = 'ETQ_Bulto_BIGv2.txt';
  id_Impresora: any;
  vNombreImpresora: any;
  vNroBulto: any;
  bolEtiquetaGrande: boolean = false;  
  data:any;
  vListaProductoSelect: any
  vSaldo: any;
  vLisTransacEmbalaje: any;
  vPage:any;
  vListaProductoSelectActual: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sImpresora: ImpresoraServiceProvider, public sEmbalaje: EmbalajeServiceProvider, public sEtq: EtiquetadoServiceProvider,
    public alertCtrl: AlertController, public sGlobal: GlobalServiceProvider) {
    debugger;
    this.vEmbalajeTotalPage02 = navParams.get('dataPage02');
    this.vNroBulto = navParams.get('nroBulto');   
    this.data = this.navParams.get('data');         
    this.vListaProductoSelect = navParams.get('dataPageFiltro'); 
    this.vSaldo = navParams.get('vSaldo');
    this.vPage = navParams.get('page');
    this.vLisTransacEmbalaje = navParams.get('lstTransac');
    this.getDataDetBultosEmbalaje();
  }

  getDataAccesosImpresoraXUsuario() {
    this.ListarAccesosImpresoraXUsuario(this.sGlobal.userName);
  }

  filterImpresora(ev: any) {
    this.listImpresora = this.listImpresora.filter((item) => {
      return (item.Acceso == ev);
    });
    return this.listImpresora;
  }

  ListarAccesosImpresoraXUsuario(strUsuario) {
    this.sImpresora.listarAccesosImpresoraXUsuario(strUsuario).then((result) => {
      this.listImpresora = result;
      this.filterImpresora(1);
      if (this.listImpresora.length > 0) {
      } else {
        alert('No se encontrarón datos.');
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  ionViewWillEnter() {
    this.getDataAccesosImpresoraXUsuario();
  }

  getDataDetBultosEmbalaje() {
    this.ListarBultosDespacho(this.vEmbalajeTotalPage02.Id_Tx);
  }

  ListarBultosDespacho(strId_Tx) {
    this.sEmbalaje.ListarBultosDespacho(strId_Tx).then((result) => {
      this.listDetBultosEmbalaje = result;
      debugger;
      for (let index = 0; index < this.listDetBultosEmbalaje.length; index++) {
        if(this.vPage == 3){
          this.vNroBulto =this.listDetBultosEmbalaje[this.listDetBultosEmbalaje.length - 1].NroBulto          
        }
        else{
          if (this.listDetBultosEmbalaje[index].NroBulto == this.vNroBulto)
          this.vNroBulto = this.listDetBultosEmbalaje[index].NroBulto;
        }        
      }
    }, (err) => {
      console.log('E-Embalaje listar', err);
    });
  }

  obtenerNombreImpresora() {
    this.id_Impresora
    this.vNombreImpresora = this.listImpresora.filter((item) => {
      return (item.Id_Impresora == this.id_Impresora);
    });
    this.vNombreImpresora = this.vNombreImpresora[0].Nombre;
    console.log(this.vNombreImpresora);
    debugger;
  }

  ImprimirBultos() {
    debugger;
    var listContainer = [];
    var listEtq = [];
    let currentDate = moment(new Date());

    if(this.vPage == 3){
      for (let i = 0; i < this.listDetBultosEmbalaje.length; i++) {      
          listEtq = [];
          listEtq.push({ "campo": "|FACTURA|", "valor": "" });
          listEtq.push({ "campo": "|CODZONA|", "valor": this.vEmbalajeTotalPage02.CodigoZona });
          listEtq.push({ "campo": "|CLIENTE|", "valor": this.vEmbalajeTotalPage02.Cliente });
          listEtq.push({ "campo": "|ALMACEN|", "valor": this.sGlobal.nombreAlmacen });
          listEtq.push({ "campo": "|ZONA|", "valor": this.vEmbalajeTotalPage02.Zona });
          listEtq.push({ "campo": "|DIRECCION|", "valor": this.vEmbalajeTotalPage02.Direccion });
          listEtq.push({ "campo": "|PICKING|", "valor": this.vEmbalajeTotalPage02.NumOrden });
          listEtq.push({ "campo": "|BULTO|", "valor": this.listDetBultosEmbalaje[i].NroBulto });
          listEtq.push({ "campo": "|CODBARRA|", "valor": this.listDetBultosEmbalaje[i].CodigoBarra });
          listEtq.push({ "campo": "|PESO|", "valor": this.listDetBultosEmbalaje[i].Peso });
          listEtq.push({ "campo": "|CIUDAD|", "valor": this.vEmbalajeTotalPage02.Ciudad });
          listEtq.push({ "campo": "|PEDIDO|", "valor": this.vEmbalajeTotalPage02.NumOrden });
          listEtq.push({ "campo": "|FECHA|", "valor": currentDate.format("DD/MM/YYYY") });
          listEtq.push({ "campo": "|OBSERVACION|", "valor": this.listDetBultosEmbalaje[i].Observacion });
          listEtq.push({ "campo": "|CANTIDAD|", "valor": this.listDetBultosEmbalaje[i].Cantidad });
          listEtq.push({ "campo": "|GUIA|", "valor": "" });
          listContainer.push({ 'etiqueta': listEtq });        
      }  
      var formatoEtiqueta;
      if(this.bolEtiquetaGrande)
        formatoEtiqueta = this.formatLabelsGrande;
      else
        formatoEtiqueta = this.formatLabels;
            
      this.sEtq.imprimirListaEtiquetas(listContainer, formatoEtiqueta, this.vNombreImpresora, true).then(result => {       
        var message: any = result;
        if (message.errNumber == -1) {
          alert(message.mensaje);
        } else {
          this.sEmbalaje.RegistrarBultoImpreso(this.vEmbalajeTotalPage02.Id_Tx,this.vNroBulto);
          alert("Impresión exitosa.");
          this.navCtrl.push(EmbalajePage_03Page, {
            dataPage02: this.vEmbalajeTotalPage02,      
            data: this.data
          });
        }
      });      
    }
    else{
      for (let i = 0; i < this.listDetBultosEmbalaje.length; i++) {
        if (this.listDetBultosEmbalaje[i].NroBulto == this.vNroBulto){
          listEtq = [];
          listEtq.push({ "campo": "|FACTURA|", "valor": "" });
          listEtq.push({ "campo": "|CODZONA|", "valor": this.vEmbalajeTotalPage02.CodigoZona });
          listEtq.push({ "campo": "|CLIENTE|", "valor": this.vEmbalajeTotalPage02.Cliente });
          listEtq.push({ "campo": "|ALMACEN|", "valor": this.sGlobal.nombreAlmacen });
          listEtq.push({ "campo": "|ZONA|", "valor": this.vEmbalajeTotalPage02.Zona });
          listEtq.push({ "campo": "|DIRECCION|", "valor": this.vEmbalajeTotalPage02.Direccion });
          listEtq.push({ "campo": "|PICKING|", "valor": this.vEmbalajeTotalPage02.NumOrden });
          listEtq.push({ "campo": "|BULTO|", "valor": this.listDetBultosEmbalaje[i].NroBulto });
          listEtq.push({ "campo": "|CODBARRA|", "valor": this.listDetBultosEmbalaje[i].CodigoBarra });
          listEtq.push({ "campo": "|PESO|", "valor": this.listDetBultosEmbalaje[i].Peso });
          listEtq.push({ "campo": "|CIUDAD|", "valor": this.vEmbalajeTotalPage02.Ciudad });
          listEtq.push({ "campo": "|PEDIDO|", "valor": this.vEmbalajeTotalPage02.NumOrden });
          listEtq.push({ "campo": "|FECHA|", "valor": currentDate.format("DD/MM/YYYY") });
          listEtq.push({ "campo": "|OBSERVACION|", "valor": this.listDetBultosEmbalaje[i].Observacion });
          listEtq.push({ "campo": "|CANTIDAD|", "valor": this.listDetBultosEmbalaje[i].Cantidad });
          listEtq.push({ "campo": "|GUIA|", "valor": "" });
          listContainer.push({ 'etiqueta': listEtq });
        }
      }
  
      var formatoEtiqueta;
      if(this.bolEtiquetaGrande)
        formatoEtiqueta = this.formatLabelsGrande;
      else
        formatoEtiqueta = this.formatLabels;
            
      this.sEtq.imprimirListaEtiquetas(listContainer, formatoEtiqueta, this.vNombreImpresora, true).then(result => {
       
        var message: any = result;
        if (message.errNumber == -1) {
          alert(message.mensaje);
        } else {
          this.sEmbalaje.RegistrarBultoImpreso(this.vEmbalajeTotalPage02.Id_Tx,this.vNroBulto);
          alert("Impresión exitosa.");
          // this.navCtrl.getViews().forEach(item => {
          //   if (item.name == 'EmbalajePage_04Page') {                
          //     this.navCtrl.popTo(item);
          //   }
          // });
          debugger;

          
        this.sEmbalaje.ListarDespachoDetalle(this.vListaProductoSelect.Id_Tx).then((result) => {
          debugger;
          this.vListaProductoSelectActual = result;      
          var lista;          
          lista =  this.vListaProductoSelectActual.filter((item) => {      
            return (item.Item == this.vListaProductoSelect.Item);
          });
          this.vListaProductoSelectActual = lista[0];                

          if(this.vListaProductoSelectActual.Saldo == 0){
            this.navCtrl.push(EmbalajePage_03Page, {
              dataPage02: this.vEmbalajeTotalPage02,      
              data: this.data
            });
          }
          else{
            if ((this.vListaProductoSelectActual.FlagLotePT == 1 && this.vListaProductoSelectActual.FlagSeriePT == 0) || (this.vListaProductoSelectActual.FlagLotePT == 0 && this.vListaProductoSelectActual.FlagSeriePT == 0)) {            
              this.navCtrl.push(EmbalajePage_04Page, {
                page: 3,             
                nroBulto: this.vNroBulto,
                dataPage02: this.vEmbalajeTotalPage02,
                lstTransac: this.vLisTransacEmbalaje,
                lstProductSelect: this.vListaProductoSelect,                            
              });
            }
            else{
              if ((this.vListaProductoSelectActual.FlagSeriePT == 1 && this.vListaProductoSelectActual.FlagLotePT == 0) || (this.vListaProductoSelectActual.FlagLotePT == 1 && this.vListaProductoSelectActual.FlagSeriePT == 1)) {                             
                debugger;
                this.navCtrl.push(EmbalajePage_10Page, {                                
                  nroBulto: this.vNroBulto,                
                  dataPage02: this.vEmbalajeTotalPage02,                           
                  dataPageFiltro : this.vListaProductoSelect,
                  data: this.data,
                  vSaldo: this.vSaldo,
                  page: 8,
                });
              }
            }
          }
       
        }, (err) => {
          console.log('E-Embalaje listar', err);
        });



         




        }
      });      
    }
  }
  
  checkboxClicked(chkEliminar: Checkbox) {
    this.bolEtiquetaGrande = chkEliminar.checked;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmbalajePage_08Page');
  }
}
