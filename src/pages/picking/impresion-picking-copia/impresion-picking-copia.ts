import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Checkbox } from 'ionic-angular';
import moment from 'moment';
import { ImpresoraServiceProvider } from '../../../providers/impresora-service/impresora-service';
import { EmbalajeServiceProvider } from '../../../providers/embalaje-service/embalaje-service';
import { EtiquetadoServiceProvider } from '../../../providers/etiquetado-service/etiquetado-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the ImpresionPickingCopiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-impresion-picking-copia',
  templateUrl: 'impresion-picking-copia.html',
})
export class ImpresionPickingCopiaPage {

  listImpresora: any;
  listDetBultosEmbalaje: any;
  vEmbalajeTotalPage02: any;
  id_Impresora: any;
  vNombreImpresora: any;
  vUltimoBulto: any;
  bolEtiquetaGrande: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sImpresora: ImpresoraServiceProvider, public sEmbalaje: EmbalajeServiceProvider, public sEtq: EtiquetadoServiceProvider,
    public alertCtrl: AlertController, public sGlobal: GlobalServiceProvider) {
      this.vEmbalajeTotalPage02 = navParams.get('dataPage02');      
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

  obtenerNombreImpresora() {
    this.id_Impresora
    this.vNombreImpresora = this.listImpresora.filter((item) => {
      return (item.Id_Impresora == this.id_Impresora);
    });
    this.vNombreImpresora = this.vNombreImpresora[0].Nombre;
    console.log(this.vNombreImpresora);
    debugger;
  }


  goPickingPage() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(3));
  }

  imprimir() {
    debugger;
    var listContainer = [];
    var listEtq = [];
    listEtq = [];
    listEtq.push({ "campo": "|NROPICKING|", "valor": this.vEmbalajeTotalPage02.NumOrden});
    listEtq.push({ "campo": "|CLIENTE|", "valor": this.vEmbalajeTotalPage02.Cliente});
    listEtq.push({ "campo": "|COPIAS|", "valor": this.vUltimoBulto });
    listEtq.push({ "campo": "|ALMACEN|", "valor": this.sGlobal.nombreAlmacen });
    listEtq.push({ "campo": "|USUARIO|", "valor": this.sGlobal.apeNom });
    listContainer.push({ 'etiqueta': listEtq });

    this.sEtq.imprimirListaEtiquetas(listContainer, 'ETQ_Pickingv2.txt', this.vNombreImpresora, true).then(result => {
      debugger;
      var message: any = result;
      if (message.errNumber == -1) {
        alert(message.mensaje);
      }
      else {
        alert("Impresión exitosa.");
        this.goPickingPage();
        // this.navCtrl.getViews().forEach(item => {
        //   if (item.name == 'EmbalajePage_04Page') {                
        //     this.navCtrl.popTo(item);
        //   }
        // });
      }
    });
  }

  checkboxClicked(chkEliminar: Checkbox) {
    this.bolEtiquetaGrande = chkEliminar.checked;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImpresionPickingCopiaPage');
  }

}
