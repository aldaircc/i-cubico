import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, ViewController, ModalController, AlertController, PopoverController, App, Select } from 'ionic-angular';
import { ImpresoraPage } from '../../impresora/impresora';
import { EtiquetadoServiceProvider } from '../../../providers/etiquetado-service/etiquetado-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';
import moment from 'moment';
import { EtiquetadoPage_02Page } from '../etiquetado-page-02/etiquetado-page-02';
import { PopoverReciboComponent } from '../../../components/popover-recibo/popover-recibo';
import { HomePage } from '../../home/home';
import { EtiquetadoPage_03Page } from '../etiquetado-page-03/etiquetado-page-03';
import { MainMenuPage } from '../../main-menu/main-menu';

/**
 * Generated class for the EtiquetadoPage_01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etiquetado-page-01',
  templateUrl: 'etiquetado-page-01.html',
})
export class EtiquetadoPage_01Page {

  formatLabels: any = [
    { 'Id_Format': 1, 'Label': 'ETQ_UA.txt' },
    { 'Id_Format': 2, 'Label': 'ETQ_UAGrande.txt' }
  ];

  public event = {
    month: '1995-06-26',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  vEtq: any = {
    'Acceso': 0,
    'Articulo': "",
    'CantidadPedida': 0,
    'Cliente': "",
    'Codigo': null,
    'Condicion': "",
    'CondicionAlmac': null,
    'FecEmi': null,
    'FecVen': null,
    'FlagLote': null,
    'FlagSerie': null,
    'IdCuentaLPN': 0,
    'Id_Cliente': 0,
    'Id_Condicion': 0,
    'Id_Producto': 0,
    'Id_SubAlmacen': 0,
    'Id_UM': "",
    'Item': 0,
    'LoteLab': "",
    'NroDoc': "",
    'TipoAlmacenaje': null,
    'UM': "",
    'UM_Base': "",
    'idTipoMovimiento': 0,
    'Saldo': 0,
    'page': false
  };

  fecEmi: any = new Date().toISOString();
  fecVen: any = new Date().toISOString();

  listUM: any = [];
  id_UAlt: number = 0;

  listSubAlm: any = [];
  //id_SubAlm : number = 0;
  id_SubAlm: any;

  id_FormatLabel: any;

  lote: string = "";
  serie: string = "";
  isVisibleSearchButton: boolean = false;
  findArticulo: boolean = false;
  isEnabledSerie: boolean = true;
  isEnabledLote: boolean = true;
  fecEmiChecked: boolean = true;
  fecVenChecked: boolean = true;
  cantDisabled: boolean = true;
  etqDisabled: boolean = true;
  saldoDisabled: boolean = true;
  UMAlterDisabled: boolean = true;

  cantXBulto: number = 0;
  residuo: number = 0;

  //Campos de ingreso
  cantxEtq: number;
  numEtq: number;
  numCopia: number = 1;
  cantEtqSaldo: number;
  totalSuma: any;

  resultCantidad: boolean = true;
  resultNumEtq: boolean = true;
  resultEtqSaldo: boolean = true;

  obj2: any;

  titutlos1isDisplay: boolean = false;
  titutlos2isDisplay: boolean = true;

  // userProfile={"Almacen":"","ApeNom":"","page":"1"};

  @ViewChild('selectUA_Alt') selectUA_Alt: Select;
  @ViewChild('selectFormat') selectFormat: Select;
  @ViewChild('selectSubAlmacen') selectSubAlmacen: Select;

  @ViewChild('iLote', { read: ElementRef }) private inputUbi: ElementRef;

  @ViewChild('iCantidad', { read: ElementRef }) private iCantidad: ElementRef;
  @ViewChild('iLote', { read: ElementRef }) private iLote: ElementRef;
  @ViewChild('iSerie', { read: ElementRef }) private iSerie: ElementRef;
  @ViewChild('iNumEtq', { read: ElementRef }) private iNumEtq: ElementRef;
  @ViewChild('iSaldoEtq', { read: ElementRef }) private iSaldoEtq: ElementRef;
  @ViewChild('iNumCopia', { read: ElementRef }) private iNumCopia: ElementRef;
  @ViewChild(Navbar) navBar: Navbar;


  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public sEtq: EtiquetadoServiceProvider,
    public modalCtrl: ModalController, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider, public popoverCtrl: PopoverController) {

    this.isVisibleSearchButton = (navParams.get('codePage') != null) ? true : false;
    this.titutlos1isDisplay = (navParams.get('codePage') != null) ? false : true;
    this.titutlos2isDisplay = (navParams.get('codePage') != null) ? true : false;

    this.vEtq = (navParams.get('vEtq') != null) ? navParams.get('vEtq') : this.vEtq;
    this.listarUMxProducto(this.vEtq.Id_Producto);
    //this.initPage();
  }

  initPage(): void {
    debugger;
    this.resultCantidad = true;
    this.resultNumEtq = true;
    this.resultEtqSaldo = true;
    if (this.vEtq.Codigo != null) {

      this.lote = this.vEtq.LoteLab;
      this.serie = "";
      this.fecEmi = (this.vEtq.FecEmi != null) ? moment(this.vEtq.FecEmi).toISOString() : this.fecEmi; // .format('YYYY-MM-DD');
      this.fecVen = (this.vEtq.FecVen != null) ? moment(this.vEtq.FecVen).toISOString() : this.fecVen;//format('YYYY-MM-DD');


      // if(this.findArticulo == false){
      //   /**
      //     presenter = new EtqPresenterImpl(this);
      //     presenter.listUMxProducto(intR_IdProducto);
      //     prepareFormatLabel();

      //     if (strR_TipoAlmacenaje == "1"){
      //         strEtq = "ETQ_UA.txt";
      //     }else if (strR_TipoAlmacenaje == "2"){
      //         strEtq = "ETQ_Pallet.txt";
      //     }else if (strR_TipoAlmacenaje == "3"){
      //         strEtq = "ETQ_UA.txt";
      //     }else{
      //         strEtq = "";
      //     }
      //     spnSubAlmacen.setEnabled(false); 
      //   **/
      //  this.listarUMxProducto(this.vEtq.Id_Producto);
      // }

      //this.listarUMxProducto(this.vEtq.Id_Producto);


      this.listarSubAlmacenesXCuenta(this.vEtq.IdCuentaLPN, this.sGlobal.Id_Almacen);

      this.id_SubAlm = this.vEtq.Id_SubAlmacen;
      this.id_UAlt = this.vEtq.Id_UM;

      debugger;
      if (this.vEtq.FlagSerie) {
        this.isEnabledSerie = true;
        this.isEnabledLote = false;
        this.fecEmiChecked = false;
        this.fecVenChecked = false;
        this.UMAlterDisabled = false;
        this.cantDisabled = false;
        this.cantxEtq = 1;
        this.etqDisabled = false;
        this.numEtq = 1;
        this.saldoDisabled = false;
        this.cantEtqSaldo = 0;
        if (!this.vEtq.page) {
          this.selectAll(this.iSerie, 500);
        }
      }
      if (this.vEtq.FlagLote) {
        this.isEnabledSerie = false;
        this.isEnabledLote = true;
        //this.fecEmi = true;
        this.fecEmiChecked = true;
        //this.fecVen = true;
        this.fecVenChecked = true;
        this.UMAlterDisabled = true;
        this.cantDisabled = true;
        this.etqDisabled = true;
        this.saldoDisabled = true;


        if (!this.vEtq.page) {
          this.selectAll(this.iLote, 500);
        }

        let obj = this.listUM.filter(x => x.Id_UM == this.id_UAlt)[0];

        if (this.findArticulo == true) {
          this.cantxEtq = obj.Factor;
          debugger;
          this.numEtq = parseInt("0");
          this.cantEtqSaldo = 0;
        } else {
          this.cantxEtq = obj.Factor;
          debugger;
          this.numEtq = this.vEtq.Saldo / this.cantxEtq;
          this.cantEtqSaldo = this.vEtq.Saldo % this.cantxEtq;

        }
      }
      if (this.vEtq.FlagSerie && this.vEtq.FlagLote) {
        this.isEnabledSerie = true;
        this.isEnabledLote = true;
        //this.fecEmi = true;
        this.fecEmiChecked = true;
        //this.fecVen = true;
        this.fecVenChecked = true;
        this.UMAlterDisabled = false;
        this.cantDisabled = false;
        this.cantxEtq = 1;
        this.etqDisabled = false;
        this.numEtq = 1;
        this.saldoDisabled = false;
        this.cantEtqSaldo = 0;
        if (!this.vEtq.page) {
          this.selectAll(this.iSerie, 500);
        }
      }

      this.calcularTotalSuma();

      // this.isEnabledSerie = this.vEtq.FlagSerie;
      // this.isEnabledLote = this.vEtq.FlagLote;
      // this.fecEmiChecked = this.vEtq.FlagLote;
      // this.fecVenChecked = this.vEtq.FlagLote;      


      this.lote = (this.vEtq.FlagLote == true) ? this.vEtq.LoteLab : "";

    }
  }

  onChange() {
    debugger;
    let obj = this.listUM.filter(x => x.Id_UM == this.id_UAlt)[0];
    //cantidad por bulto 
    this.cantXBulto = parseInt(obj.CantXBulto);
    if (this.findArticulo == false) {
      let factor: number = parseInt(obj.Factor); //Serie true 1 :  parseInt(obj.Factor); 
      let numEtqPrint: number = parseInt(this.vEtq.CantidadPedida) / factor; //Serie true 1 :  parseInt(obj.Factor); 
      let saldoEtq: number = parseInt(this.vEtq.CantidadPedida) - (numEtqPrint * factor); //Serie true 0 :  parseInt(obj.Factor); 

      this.cantxEtq = factor;
      debugger;
      this.numEtq = numEtqPrint;
      this.cantEtqSaldo = saldoEtq;
    } else {
      this.cantxEtq = parseInt(obj.CantXBulto);
      debugger;
      this.numEtq = 0;
      this.cantEtqSaldo = 0;
    }

    this.calcularTotalSuma();
    /**
    if (list.size() > 0){
                    UMxProducto obj = (UMxProducto) spnUAlter.getSelectedItem();
                    dbl_CantXBulto = obj.getCantXBulto();

                    if (!findArticulo){
                        fac = obj.getFactor();
                        Integer numEtqPrint = (int) (dblR_CantPedida / fac);
                        Double saldoEtq = dblR_CantPedida - (numEtqPrint * fac);
                        edtCantxEtq.setText(fac.toString());
                        edtNumEtq.setText(numEtqPrint.toString());
                        edtCantEtqSaldo.setText(saldoEtq.toString());
                    }else{
                        dbl_CantXBulto = obj.getCantXBulto();
                        edtCantxEtq.setText(dbl_CantXBulto.toString());
                        edtNumEtq.setText("0");
                        edtCantEtqSaldo.setText("0");
                    }

                } 
    **/
  }

  listarUMxProducto(intIdProducto) {
    debugger;
    this.sEtq.listarUMxProducto(intIdProducto).then(result => {
      debugger;
      this.listUM = result;
      this.initPage();
    });
  }



  listarSubAlmacenesXCuenta(intIdCuenta, intIdAlmacen) {
    this.sEtq.listarSubAlmacenesXCuenta(intIdCuenta, intIdAlmacen).then(result => {
      console.log('result listarSubAlmacenesXCuenta', result);
      this.listSubAlm = result;
    });
  }


  validarCampos() {
    debugger;
    var message = "";

    if (this.vEtq.Codigo == null || this.vEtq.Articulo == null) {
      message = "Debe buscar producto";

      return message;
    }

    if (this.vEtq.Codigo == "" || this.vEtq.Articulo == "") {
      message = "Debe buscar producto";

      return message;
    }

    if (this.serie == "" && this.vEtq.FlagSerie) {
      message = "Indique la serie";
      this.selectAll(this.iSerie, 500);
      return message;
    }

    if (this.lote == "" && this.vEtq.FlagLote) {
      message = "Indique el lote";
      this.selectAll(this.iLote, 500);
      return message;
    }

    if (this.fecEmiChecked == true && this.fecVenChecked == true) {
      if ((Date.parse(this.fecEmi) > Date.parse(this.fecVen))) {
        message = "La fecha de emisión debe ser menor a la fecha de vencimiento";
        return message;
      }
    }

    if (this.id_UAlt == 0 || this.id_UAlt == undefined) {
      message = "Seleccione una presentación";
      setTimeout(() => {
        this.selectUA_Alt.open();
      }, 500);
      return message;
    }

    if (this.cantxEtq == 0 || this.cantxEtq == undefined || isNaN(this.cantxEtq)) {
      message = "Indique cantidad";
      this.selectAll(this.iCantidad, 500);
      return message;
    }

    if (this.cantxEtq <= 0 || this.cantxEtq == undefined || isNaN(this.cantxEtq)) {
      message = "El número de cantidad no es valido";
      this.selectAll(this.iCantidad, 500);
      return message;
    }

    if (this.numEtq == 0 || this.numEtq == undefined || isNaN(this.numEtq)) {
      message = "Indique el número de etiquetas";
      this.selectAll(this.iNumEtq, 500);
      return message;
    }

    if (this.numEtq <= 0 || this.numEtq == undefined || isNaN(this.numEtq)) {
      message = "El número de etiquetas no es valido";
      this.selectAll(this.iNumEtq, 500);
      return message;
    }

    if (this.cantEtqSaldo < 0 || this.cantEtqSaldo == undefined) {
      message = "El número de saldo no es valido";
      this.selectAll(this.iSaldoEtq, 500);
      return message;
    }

    if (this.id_FormatLabel == 0 || this.id_FormatLabel == undefined) {
      message = "Seleccione formato de etiqueta";
      setTimeout(() => {
        this.selectFormat.open();
      }, 500);
      return message;
    }

    if (this.id_SubAlm == 0 || this.id_SubAlm == undefined) {
      message = "Seleccione Sub Almacén"
      setTimeout(() => {
        this.selectSubAlmacen.open();
      }, 500);
      return message;
    }

    if (this.numCopia <= 0 || this.numCopia == undefined) {
      message = "El número de copias no valido";
      this.selectAll(this.iNumCopia, 500);
      return message;
    }

    if (this.cantxEtq >= 0) {
      let valorCant = this.cantxEtq.toString();
      let punto = 0;
      let cantDecimales = 0;
      for (var i = 0; i < valorCant.length; i++) {
        if (punto == 1) {
          cantDecimales = cantDecimales + 1;
        }
        if (valorCant.charAt(i) == ".") {
          punto = punto + 1;
        }
      }

      if (punto == 1) {
        if (cantDecimales == 0) {
          this.cantxEtq = 0;
          this.selectAll(this.iCantidad, 500);
          message = "El número cantidad no tiene formato correcto, vuelva a ingresar.";
          return message;
        }
      }
    }

    if (this.cantEtqSaldo >= 0) {
      debugger;
      let valorCantSaldo = this.cantEtqSaldo.toString();
      let puntoSaldo = 0;
      let cantDecimalesSaldo = 0;
      for (var i = 0; i < valorCantSaldo.length; i++) {
        if (puntoSaldo == 1) {
          cantDecimalesSaldo = cantDecimalesSaldo + 1;
        }
        if (valorCantSaldo.charAt(i) == ".") {
          puntoSaldo = puntoSaldo + 1;
        }
      }

      if (puntoSaldo == 1) {
        if (cantDecimalesSaldo == 0) {
          this.cantEtqSaldo = 0;
          this.selectAll(this.iSaldoEtq, 500);
          message = "El número saldo no tiene formato correcto, vuelva a ingresar.";
          return message;
        }
      }

    }
    return message;
  }

  imprimirEtiqueta() {
    let message = this.validarCampos();

    if (message.length > 0) {
      alert(message);
      return;
    }

    if (this.sGlobal.Id_Impresora == 0) {
      this.showModalImpresora();
    } else {
      const confirm = this.alertCtrl.create({
        //title: 'Use this lightsaber?',
        message: '¿Está seguro de imprimir ' + this.numEtq + ' etiqueta(s)?',
        buttons: [
          {
            text: 'Si',
            handler: () => {

              //Imprimir etiquetas
              if (this.cantEtqSaldo < 0 || this.cantEtqSaldo == undefined) {
                this.cantEtqSaldo = 0;
              }

              debugger;
              let numEtq, cantEtqSaldo, cantxEtq;
              numEtq = this.numEtq;
              cantEtqSaldo = this.cantEtqSaldo;
              cantxEtq = this.cantxEtq;

              var objImp =
              {
                'CantidadEtiqueta': parseInt(numEtq) + ((cantEtqSaldo) > 0 ? 1 : 0),
                'Cantidad': cantxEtq,
                'Id_Producto': this.vEtq.Id_Producto,
                'LoteLab': (this.vEtq.FlagLote == true) ? this.lote.toUpperCase() : null,
                'FechaEmision': (this.fecEmiChecked == true) ? "/Date(" + Date.parse(this.fecEmi) + ")/" : null,
                'FechaVencimiento': (this.fecVenChecked == true) ? "/Date(" + Date.parse(this.fecVen) + ")/" : null,
                'Item': this.vEtq.Item,
                'UsuarioRegistro': this.sGlobal.userName,
                'Id_Estado': this.vEtq.Id_Condicion,
                'SaldoEtiqueta': (cantEtqSaldo == 0) ? 0 : cantEtqSaldo,
                'Id_Causal': null,
                'Id_SubAlmacen': this.id_SubAlm
              };
              debugger;

              this.registrarUAMasivo(objImp);
              /**
                Inicio
                        presenter.registerUAMasivo(objImp, 1);//Global.idCentro);
                Fin 
              **/
            }
          },
          {
            text: 'No',
            handler: () => {

            }
          }
        ]
      });
      confirm.present();
    }
  }

  registrarUAMasivo(objImp) {
    debugger;
    this.sEtq.registrarUAMasivo(objImp, 1).then(result => {
      debugger;
      var res: any = result;
      if (res.length <= 0) {
        debugger;
        return;
      }
      debugger;
      var listContainer = [];
      var listEtq = [];
      let currentDate = moment(new Date());
      let obj = this.listUM.filter(x => x.Id_UM == this.id_UAlt)[0];

      if (this.findArticulo == true) {
        debugger;
        for (let i = 0; i < res.length; i++) {
          listEtq = [];
          listEtq.push({ "campo": "|MES|", "valor": currentDate.format("MM") });
          listEtq.push({ "campo": "|ANIO|", "valor": currentDate.format("YYYY") });
          listEtq.push({ "campo": "|LOTE|", "valor": this.lote });
          listEtq.push({ "campo": "|ESTADO|", "valor": this.vEtq.Condicion });
          listEtq.push({ "campo": "|CODIGO|", "valor": this.vEtq.Codigo });
          //listEtq.push({ "campo": "|VENCIMIENTO|", "valor" :  moment(this.fecVen).format('dd/MM/yyyy') });
          listEtq.push({ "campo": "|VENCIMIENTO|", "valor": moment(this.fecVen).format('MMM-YYYY') });
          listEtq.push({ "campo": "|CANTBULTO|", "valor": this.cantxEtq });
          listEtq.push({ "campo": "|CANTXBULTO|", "valor": this.cantXBulto });
          listEtq.push({ "campo": "|SALDO|", "valor": "0" });
          listEtq.push({ "campo": "|FECHA_INGRESO|", "valor": (this.findArticulo == true) ? "" : currentDate.format('dd/MM/yyyy') });
          listEtq.push({ "campo": "|ORDEN|", "valor": (this.findArticulo == true) ? "" : this.vEtq.NroDoc });
          listEtq.push({ "campo": "|USUARIO|", "valor": this.sGlobal.userName });
          listEtq.push({ "campo": "|COMPOSICION|", "valor": this.vEtq.CondicionAlmac });
          listEtq.push({ "campo": "|UMED|", "valor": this.vEtq.UM });
          listEtq.push({ "campo": "|TXTSALDO|", "valor": (i == 0 && this.cantEtqSaldo > 0) ? "SALDO" : "" });
          listEtq.push({ "campo": "|COPIAS|", "valor": this.numCopia });
          listEtq.push({ "campo": "|CODBARRA|", "valor": res[i].UA_CodBarra });
          listEtq.push({ "campo": "|CUENTA|", "valor": this.sGlobal.nombreEmpresa });
          listEtq.push({ "campo": "|PRODUCTO|", "valor": this.vEtq.Articulo });
          listEtq.push({ "campo": "|EAN14|", "valor": obj.EAN14 });
          listEtq.push({ "campo": "|EAN|", "valor": (obj.Nombre.toUpperCase() == this.vEtq.UM.toString().trim()) ? "13" : "14" });
          listEtq.push({ "campo": "|CANTIDAD|", "valor": (i == 0 && this.cantEtqSaldo > 0) ? this.cantEtqSaldo : this.cantxEtq });
          listEtq.push({ "campo": "|SALDOTEXT|", "valor": "0" });
          listContainer.push({ 'etiqueta': listEtq });
        }
      } else {
        for (let i = 0; i < res.length; i++) {
          listEtq = [];
          listEtq.push({ "campo": "|MES|", "valor": currentDate.format('MMMM') });
          listEtq.push({ "campo": "|ANIO|", "valor": currentDate.format('YYYY') });
          listEtq.push({ "campo": "|LOTE|", "valor": this.lote });
          listEtq.push({ "campo": "|ESTADO|", "valor": this.vEtq.Id_Condicion });
          listEtq.push({ "campo": "|CODIGO|", "valor": this.vEtq.Codigo });
          listEtq.push({ "campo": "|VENCIMIENTO|", "valor": moment(this.fecVen).format('MMM-YYYY') });
          listEtq.push({ "campo": "|CANTBULTO|", "valor": (i == 0 && this.cantEtqSaldo > 0) ? this.residuo / this.cantXBulto : this.cantxEtq });
          listEtq.push({ "campo": "|CANTXBULTO|", "valor": this.cantXBulto });
          listEtq.push({ "campo": "|SALDO|", "valor": (i == 0 && this.cantEtqSaldo > 0) ? this.residuo % this.cantXBulto : 0 });
          listEtq.push({ "campo": "|FECHA_INGRESO|", "valor": (this.findArticulo != false) ? "" : currentDate.format('dd/MM/yyyy') });
          listEtq.push({ "campo": "|ORDEN|", "valor": (this.findArticulo != false) ? "" : this.vEtq.NroDoc });
          listEtq.push({ "campo": "|USUARIO|", "valor": this.sGlobal.userName });
          listEtq.push({ "campo": "|COMPOSICION|", "valor": this.vEtq.CondicionAlmac });
          listEtq.push({ "campo": "|UMED|", "valor": this.vEtq.UM });
          listEtq.push({ "campo": "|TXTSALDO|", "valor": (i == 0 && this.cantEtqSaldo > 0) ? "SALDO" : "" });
          listEtq.push({ "campo": "|COPIAS|", "valor": this.numCopia });
          listEtq.push({ "campo": "|CODBARRA|", "valor": res[i].UA_CodBarra });
          listEtq.push({ "campo": "|CUENTA|", "valor": this.sGlobal.nombreEmpresa });
          listEtq.push({ "campo": "|PRODUCTO|", "valor": this.vEtq.Articulo });
          listEtq.push({ "campo": "|EAN14|", "valor": obj.EAN14 });
          listEtq.push({ "campo": "|EAN|", "valor": (obj.Nombre.toUpperCase() == this.vEtq.UM) ? "13" : "14" });
          listEtq.push({ "campo": "|CANTIDAD|", "valor": (i == 0 && this.cantEtqSaldo > 0) ? this.cantEtqSaldo : this.cantxEtq });
          listContainer.push({ 'etiqueta': listEtq });
        }
      }
      let format = this.formatLabels.filter(x => x.Id_Format == this.id_FormatLabel)[0];
      this.sEtq.imprimirListaEtiquetas(listContainer, format.Label, this.sGlobal.nombreImpresora, true).then(result => {
        var message: any = result;
        if (message.errNumber == -1) {
          alert(message.mensaje);
        }
      });
    });
  }

  showModalImpresora() {
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.onDidDismiss(data => {
      console.log('Id_Impresora - actualizada', this.sGlobal.Id_Impresora);
    });
    modalIncidencia.present();
  }

  calcularTotalSuma() {
    var cantXCaja, numEtqTem, etqSaldoCant, totalTemporal;
    debugger;
    cantXCaja = (this.cantxEtq <= 0 || this.cantxEtq == undefined) ? 0 : this.cantxEtq;
    numEtqTem = (this.numEtq <= 0 || this.numEtq == undefined) ? 0 : this.numEtq;
    etqSaldoCant = (this.cantEtqSaldo <= 0 || this.cantEtqSaldo == undefined) ? 0 : this.cantEtqSaldo;
    totalTemporal = (parseFloat(cantXCaja) * parseInt(numEtqTem)) + parseFloat(etqSaldoCant);
    if (totalTemporal > 0) {
      let cant = 0; //Cantidad de puntos en la cadena
      for (var i = 0; i < totalTemporal.toString().length; i++) {
        if (totalTemporal.toString().charAt(i) == ".") {
          cant = cant + 1;
        }
      }
      if(cant>0){
        this.totalSuma = ((parseFloat(cantXCaja) * parseInt(numEtqTem)) + parseFloat(etqSaldoCant)).toFixed(3);
      }else{
        this.totalSuma = (parseFloat(cantXCaja) * parseInt(numEtqTem)) + parseFloat(etqSaldoCant);
      }
    } else {
      this.totalSuma = (parseFloat(cantXCaja) * parseInt(numEtqTem)) + parseFloat(etqSaldoCant);
    }
  }


  numEtqTextChange(ev: any) {
    let val = ev.target.value;
    let name = ev.target.name;

    let cant = 0; //Cantidad de puntos en la cadena
    for (var i = 0; i < val.length; i++) {
      if (val.charAt(i) == ".") {
        cant = cant + 1;
      }
    }

    if (cant == 0) { //Significa que es un número entero
      if (name == "txtNumEtq") {
        if (val.length > 3) {
          this.numEtq = 0;
          this.selectAll(this.iNumEtq, 500);
          alert("La cantidad ingresada debe ser menor. Máximo 3 números enteros.")
        }
      } else {
        if (val.length > 5) {
          if (name == "txtCant") {
            this.cantxEtq = 0;
            this.selectAll(this.iCantidad, 500);
          }
          if (name == "txtEtqSaldo") {
            this.cantEtqSaldo = 0;
            this.selectAll(this.iSaldoEtq, 500);
          }
          alert("La cantidad ingresada debe ser menor. Máximo 5 números enteros y 3 decimales.")
        }
      }
    } else if (cant == 1) {
      //Metodo para saber cuantos digitos hay despues del .
      var punto = 0;
      var cantDecimales = 0;
      for (var i = 0; i < val.length; i++) {
        if (punto == 1) {
          cantDecimales = cantDecimales + 1;
        }
        if (val.charAt(i) == ".") {
          punto = punto + 1;
        }
      }
      //Validar que solo tenga 3 decimales
      if (cantDecimales > 3) {
        if (name == "txtCant") {
          this.cantxEtq = 0;
          this.selectAll(this.iCantidad, 500);
        }
        if (name == "txtEtqSaldo") {
          this.cantEtqSaldo = 0;
          this.selectAll(this.iSaldoEtq, 500);
        }
        alert("La cantidad ingresada debe ser menor. Máximo 5 números enteros y 3 decimales.")
      }
    } else if (cant > 1) { //Valida que solo tenga un punto decimal
      if (name == "txtCant") {
        this.cantxEtq = 0;
        this.selectAll(this.iCantidad, 500);
      }
      if (name == "txtEtqSaldo") {
        this.cantEtqSaldo = 0;
        this.selectAll(this.iSaldoEtq, 500);
      }
      alert("El número ingresado no tiene formato correcto, vuelva a ingresar.")
    }

    // var regExp = /^[0-9]\d*(\.\d+)?$/.test(val);
    // if (regExp == false) {
    //   if (name == "txtCant") {
    //     this.cantxEtq = 0;
    //     this.selectAll(this.iCantidad, 500);
    //     this.resultCantidad = false;
    //   }
    //   if (name == "txtNumEtq") {
    //     this.numEtq = 0;
    //     this.selectAll(this.iNumEtq, 500);
    //     this.resultNumEtq = false;
    //   }
    //   if (name == "txtEtqSaldo") {
    //     this.cantEtqSaldo = 0;
    //     this.selectAll(this.iSaldoEtq, 500);
    //     this.resultEtqSaldo = false;
    //   }
    //   alert("El número ingresado no tiene formato correcto, vuelva a ingresar.");
    // }
    // else {
    //   if (name == "txtNumEtq") {
    //     if (val > 999) {
    //       this.numEtq = 0;
    //       this.selectAll(this.iNumEtq, 500);
    //       this.resultNumEtq = false;
    //       alert("La cantidad ingresada debe ser menor.");
    //     } else {
    //       this.resultNumEtq = true;
    //     }
    //   } else {
    //     debugger;
    //     // var cant = 0;
    //     // for(var i = 0; i < val.length; i++){
    //     //   if(val.charAt(i)=="."){
    //     //     cant = cant + 1;
    //     //     alert(cant)
    //     //   }
    //     // }

    //     if (val > 99999.999) {
    //       if (name == "txtCant") {
    //         this.cantxEtq = 0;
    //         this.selectAll(this.iCantidad, 500);
    //         this.resultCantidad = false;
    //       }
    //       if (name == "txtEtqSaldo") {
    //         this.cantEtqSaldo = 0;
    //         this.selectAll(this.iSaldoEtq, 500);
    //         this.resultEtqSaldo = false;
    //       }
    //       alert("La cantidad ingresada debe ser menor. Maximo 5 número enteros y 3 decimales.");
    //     } else {
    //       var Decimal = /^[1-9]\d*(\.\d{1,3})?$/.test(val);
    //       if (!Decimal) {
    //         if (name == "txtCant") {
    //           this.resultCantidad = false;
    //         }
    //         if (name == "txtEtqSaldo") {
    //           this.resultEtqSaldo = false;
    //         }
    //         alert("El número solo debe tener 3 decimales.");
    //       } else {
    //         if (name == "txtCant") {
    //           this.resultCantidad = true;
    //         }
    //         if (name == "txtEtqSaldo") {
    //           this.resultEtqSaldo = true;
    //         }
    //       }
    //     }
    //   }
    // }

    if (val != "") {
      this.calcularTotalSuma();
    } else {
      this.totalSuma = 0;
    }
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToEtqPage02() {
    debugger;
    this.findArticulo = true;
    this.navCtrl.push(EtiquetadoPage_02Page, {
      producto: this.productSelectedcallback
    });
  }

  dataFromEtqPage02: any;
  productSelectedcallback = data => {
    this.dataFromEtqPage02 = data;
    console.log('data received from other page', this.dataFromEtqPage02);
    debugger;
    this.vEtq.Codigo = this.dataFromEtqPage02.Codigo;
    this.vEtq.Condicion = this.dataFromEtqPage02.Condicion;
    this.vEtq.CondicionAlmac = this.dataFromEtqPage02.CondicionAlmacenamiento;
    this.vEtq.Articulo = this.dataFromEtqPage02.Descripcion;
    this.vEtq.FlagLote = this.dataFromEtqPage02.FlagLotePT;
    this.vEtq.FlagSerie = this.dataFromEtqPage02.FlagSeriePT;
    this.vEtq.Id_Condicion = this.dataFromEtqPage02.Id_Condicion;
    this.vEtq.Id_Producto = this.dataFromEtqPage02.Id_Producto;
    this.vEtq.Id_UM = this.dataFromEtqPage02.Id_UM;
    this.vEtq.TipoAlmacenaje = this.dataFromEtqPage02.TipoAlmacenaje;
    this.vEtq.UM = this.dataFromEtqPage02.UM;
    this.vEtq.CondicionAlmac = this.dataFromEtqPage02.Composicion; //Composicion
    this.vEtq.IdCuentaLPN = this.dataFromEtqPage02.IdCuentaLPN;
    //this.isEnabledLote = this.vEtq.FlagLote;
    //this.isEnabledSerie = this.vEtq.FlagSerie; //Arturo Add
    this.listarUMxProducto(this.vEtq.Id_Producto);
    //this.initPage();
  };

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverReciboComponent, { 'page': 21 });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      if (popoverData == 3) {
        this.showModalImpresora();
      } else if (popoverData == 4) {
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }

  goToEtqPage03(): void {
    this.navCtrl.push(EtiquetadoPage_03Page);
  }

  selectAll(el: ElementRef, time) {
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(() => {
      nativeEl.select();
    }, time);
  }



  ionViewDidLoad() {
    // this.navBar.backButtonClick = (e: UIEvent) => {
    //   // todo something
    //   debugger;
    //   this.userProfile.Almacen = this.sGlobal.nombreAlmacen;
    //   this.userProfile.ApeNom = this.sGlobal.apeNom;      
    //   this.navCtrl.push(MainMenuPage, this.userProfile);
    //   //this.navCtrl.push(MainMenuPage);
    // }
    console.log('ionViewDidLoad EtiquetadoPage01');
  }
}