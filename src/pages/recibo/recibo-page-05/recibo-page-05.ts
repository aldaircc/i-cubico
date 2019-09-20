import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import { ImpresoraPage } from '../../impresora/impresora';
import { ReciboServiceProvider } from '../../../providers/recibo-service/recibo-service';
import { EtiquetadoServiceProvider } from '../../../providers/etiquetado-service/etiquetado-service';

/**
 * Generated class for the ReciboPage_05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibo-page-05',
  templateUrl: 'recibo-page-05.html',
})
export class ReciboPage_05Page {

  listBulto: any;
  etqPallet: string;
  vReciboPage04: any;
  contPrintUA: number = 0;
  @ViewChild('inputEtqPallet') inputEtqPallet;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public sRecibo: ReciboServiceProvider, public alertCtrl: AlertController,
    public sEtq: EtiquetadoServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vReciboPage04 = this.navParams.get('dataPage04');
    console.log('data page 04', this.navParams.get('dataPage04'));
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.inputEtqPallet.setFocus();
    }, (500));
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

  onClickEtqPallet() {
    if (this.sGlobal.Id_Impresora == 0 || this.sGlobal.Id_Impresora == undefined) {
      this.showModalImpresora();
    } else {
      this.presentAlertConfirm("¿Está seguro de generar el pallet?").then((result) => {
        if (result) {
          this.sRecibo.insertarPallet(this.sGlobal.Id_Almacen, this.sGlobal.userName, 1).then(result => {
            let res: any = result;
            var listContainerEtq = [];
            var listEtq = [];

            if (res.length != 0) {
              this.etqPallet = res;
              listEtq.push({ 'campo': '|ALMACEN|', 'valor': this.sGlobal.Id_Almacen });
              listEtq.push({ 'campo': '|CODIGO|', 'valor': this.vReciboPage04.Id_Articulo });
              listEtq.push({ 'campo': '|PRODUCTO|', 'valor': this.vReciboPage04.Articulo });
              listEtq.push({ 'campo': '|CUENTA|', 'valor': "" });
              listEtq.push({ 'campo': '|CODBARRA|', 'valor': this.etqPallet });
              listEtq.push({ 'campo': '|EMPRESA|', 'valor': this.vReciboPage04.Cuenta });
              listContainerEtq.push({ 'etiqueta': listEtq });
              this.sEtq.imprimirListaEtiquetas(listContainerEtq, "ETQ_PALLETS_UA.txt", this.sGlobal.nombreImpresora, true).then(result => {
                let res: any = result;
                if (res.errNumber == -1) {
                  alert(res.mensaje);
                }
              });
            }
          });
        }
      });
    }
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.present();
  }

  onClickRegistrar() {
    this.sRecibo.validarPallet(this.etqPallet, this.sGlobal.Id_Almacen).then(result => {
      var res: any = result;
      if (res.valor1 >= -1) {
        this.listarUAXProductoTx(this.vReciboPage04.Id_Tx, this.vReciboPage04.Id_Articulo, this.vReciboPage04.Item);
      } else {
        alert('El pallet escaneado no existe');
        this.inputEtqPallet.setFocus();
      }
    });
  }

  listarUAXProductoTx(strIdTx, intIdProducto, intItem) {
    this.sRecibo.listarUAXProductoTx(strIdTx, intIdProducto, intItem).then(result => {
      let res: any = result;
      this.listBulto = res;
      let objTxUbi = {
        'TipoUbicacion': 1,
        'Id_Producto': this.vReciboPage04.Id_Articulo,
        'Id_Ubicacion_Origen': 0,
        'Id_Almacen': this.sGlobal.Id_Almacen,
        'Id_Tx': this.vReciboPage04.Id_Tx,
        'Prioridad': 10,
        'Observacion': '',
        'UsuarioModificacion': this.sGlobal.userName
      }
      this.registrarUATransito(objTxUbi);
    });
  }

  registrarUATransito(TxUbi) {
    this.sRecibo.registrarUATransito(TxUbi).then(result => {
      var lstUbi = [];
      this.listBulto.forEach(el => {
        if (el.Contenedor != null) { return; }
        let objUA = {
          'UA_CodBarra': el.UA_CodBarra,
          'PalletCodBarra': this.etqPallet,
          'UsuarioRegistro': this.sGlobal.userName,
          'Id_Tx_Ubi': result,
          'Id_Almacen': this.sGlobal.Id_Almacen,
        };
        lstUbi.push(objUA);
        this.contPrintUA++;
      });

      this.sRecibo.registrarPallet(lstUbi).then(result => {
        let res: any = result;
        if (res.errNumber == 0) {
          alert("UA's registradas: " + this.contPrintUA + " de " + this.listBulto.length);
          this.navCtrl.pop();
        } else {
          alert('Error al momento de registrar las UAs');
        }
        this.etqPallet = "";
        this.inputEtqPallet.setFocus();
      });
    });
  }
}
