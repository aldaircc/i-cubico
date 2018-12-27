import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import moment from 'moment';
import { EtqCajaServiceProvider } from '../../providers/etq-caja-service/etq-caja-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ImpresoraPage } from '../impresora/impresora';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the EtiquetaCajaLpnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etiqueta-caja-lpn',
  templateUrl: 'etiqueta-caja-lpn.html',
})
export class EtiquetaCajaLpnPage {

  formatLabels : any = [
    { 'Id_Format' : 1 , 'Label' : 'ETQ_UA.txt' },
    { 'Id_Format' : 2 , 'Label' : 'ETQ_Pallet.txt' }
  ];
  
  public event = {
    month: '1995-06-26',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  selectOptions : any;
  vEtq : any;
  fecEmi : any;
  fecVen : any;
  
  listUM : any = [];
  id_UAlt : number = 0;

  listSubAlm : any = [];
  id_SubAlm : number = 0;

  id_FormatLabel : any;

  lote : string = "";
  findArticulo : boolean = false;
  isEnabled : boolean = true;
  fecEmiChecked : boolean = true;
  fecVenChecked : boolean = true;
  cantXBulto : number = 0;
  residuo : number = 0;

  //Campos de ingreso
  cantxEtq : number;
  numEtq : number;
  numCopia : number;
  cantEtqSaldo : number;
  totalSuma : number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public sEtq: EtqCajaServiceProvider, 
    public modalCtrl: ModalController, public alertCtrl: AlertController,
    public sGlobal: GlobalServiceProvider) {

    this.selectOptions = {
      title: 'Pizza Toppings',
      subTitle: 'Select your toppings',
      mode: 'md'
    };

    debugger;
    this.vEtq = navParams.get('vEtq');
    this.lote = this.vEtq.LoteLab;
    this.fecEmi = moment(this.vEtq.FecEmi).toISOString(); // .format('YYYY-MM-DD');
    this.fecVen = moment(this.vEtq.FecVen).toISOString();//format('YYYY-MM-DD');

    if(this.findArticulo == false){
      /**
        presenter = new EtqPresenterImpl(this);
        presenter.listUMxProducto(intR_IdProducto);
        prepareFormatLabel();

        if (strR_TipoAlmacenaje == "1"){
            strEtq = "ETQ_UA.txt";
        }else if (strR_TipoAlmacenaje == "2"){
            strEtq = "ETQ_Pallet.txt";
        }else if (strR_TipoAlmacenaje == "3"){
            strEtq = "ETQ_UA.txt";
        }else{
            strEtq = "";
        }
        spnSubAlmacen.setEnabled(false); 
      **/
     this.listarUMxProducto(this.vEtq.Id_Producto);
    }

    this.listarSubAlmacenesXCuenta(this.vEtq.Id_CuentaLPN, 2 /** Almacen global **/);

    this.isEnabled = this.vEtq.FlagLote;
    this.fecEmiChecked = this.vEtq.FlagLote;
    this.fecVenChecked = this.vEtq.FlagLote;
    this.lote = (this.vEtq.FlagLote == true) ? this.vEtq.LoteLab : "";
  }

  ionViewDidLoad() {

  }

  listarUMxProducto(intIdProducto){
    this.sEtq.listarUMxProducto(intIdProducto).then(result=>{
      this.listUM = result;
    });
  }

  listarSubAlmacenesXCuenta(intIdCuenta, intIdAlmacen){
    this.sEtq.listarSubAlmacenesXCuenta(intIdCuenta, intIdAlmacen).then(result=>{
      console.log('result listarSubAlmacenesXCuenta', result);
      this.listSubAlm = result;
    });
  }

  validarCampos(){
    var message = "";
    if(this.id_SubAlm < 0 || this.id_SubAlm == undefined){
      message = "Seleccione Sub Almacén"  
      return message;
    }

    if(this.lote == "" && this.vEtq.FlagLote){
      message = "Indique el lote";
      return message;
    }

    if(this.id_UAlt == 0 || this.id_UAlt == undefined){
      message = "Seleccione una presentación";
      return message;
    }

    if(this.cantxEtq == 0 || this.cantxEtq == undefined){
      message = "Indique cantidad";
      return message;
    }

    if(this.numEtq == 0 || this.numEtq == undefined){
      message = "Indique el número de etiquetas";
      return message;
    }

    if(this.numCopia <= 0 || this.numCopia == undefined){
      message = "El número de copias no valido";
      return message;
    }

    if(this.fecEmiChecked == true && this.fecVenChecked == true){
      if((Date.parse(this.fecEmi) > Date.parse(this.fecVen))){
        message = "La fecha de emisión debe ser menor a la fecha de vencimiento";
        return message;
      }
    }

   return message;
  }

  imprimirEtiqueta(){
    let message = this.validarCampos();

    if(message.length > 0){
      alert(message);
      return;
    }

    if(this.sGlobal.Id_Impresora == 0){
      this.showModalImpresora();
    }else{
      const confirm = this.alertCtrl.create({
        //title: 'Use this lightsaber?',
        message: '¿Está seguro de imprimir '+ this.numEtq + ' etiqueta(s)?',
        buttons: [
          {
            text: 'Si',
            handler: () => {
              
              //Imprimir etiquetas
              debugger;
              if(this.cantEtqSaldo < 0 || this.cantEtqSaldo == undefined){
                this.cantEtqSaldo = 0;
              }

              let numEtq, cantEtqSaldo, cantxEtq;
              numEtq = this.numEtq;
              cantEtqSaldo = this.cantEtqSaldo;
              cantxEtq = this.cantxEtq;

              var objImp = 
              {
                'CantidadEtiqueta' : ((numEtq + cantEtqSaldo) > 0 ? 1 : 0),
                'Cantidad' : cantxEtq,
                'Id_Producto' : this.vEtq.Id_Producto,
                'LoteLab' : (this.vEtq.FlagLote == true) ? this.lote.toUpperCase() : null,
                'FechaEmision' : (this.fecEmiChecked == true) ? "/Date("+ Date.parse(this.fecEmi) +")/" : null,
                'FechaVencimiento' : (this.fecVenChecked == true) ? "/Date("+ Date.parse(this.fecVen) +")/" : null,
                'Item' : this.vEtq.Item,
                'UsuarioRegistro' : this.sGlobal.userName,
                'Id_Estado' : this.vEtq.Id_Condicion,
                'SaldoEtiqueta' : (cantEtqSaldo == 0) ? 0 : cantEtqSaldo,
                'Id_Causal' : null,
                'Id_SubAlmacen' : this.id_SubAlm
              };

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

  registrarUAMasivo(objImp){
    debugger;
    this.sEtq.registrarUAMasivo(objImp, 1).then(result=>{
      debugger;
      alert('registrarUAMasivo');

      var res : any = result;

      if(res.length <= 0){
        return;
      }

      /**
      ArrayList<ListaEtiqueta> lstListEtq = new ArrayList<>();
        UMxProducto selUAlter= (UMxProducto) spnUAlter.getSelectedItem();
        ListaEtiqueta objLE = new ListaEtiqueta();
        ArrayList<Etiqueta> lstEtq = new ArrayList<>(); 
      **/
      var listContainer = [];
      var listEtq = [];
      let currentDate = moment(new Date());
      let obj = this.listUM.filter(x=>x.Id_UM == this.id_UAlt)[0];

      if(this.findArticulo == true){

        for(let i = 0; i < res.length; i++){
          listEtq.push({ "|MES|" :  currentDate.format("MM") });
          listEtq.push({ "|ANIO|" :  currentDate.format("yyyy") });
          listEtq.push({ "|LOTE|" :  this.lote });
          listEtq.push({ "|ESTADO|" : this.vEtq.Condicion });
          listEtq.push({ "|CODIGO|" :  this.vEtq.Codigo });
          listEtq.push({ "|VENCIMIENTO|" :  moment(this.fecVen).format('dd/MM/yyyy') });
          listEtq.push({ "|CANTBULTO|" : this.cantxEtq });
          listEtq.push({ "|CANTXBULTO|" :  this.cantXBulto });
          listEtq.push({ "|SALDO|" :  "0" });
          listEtq.push({ "|FECHA_INGRESO|" :  (this.findArticulo == true) ? "" : currentDate.format('dd/MM/yyyy') });
          listEtq.push({ "|ORDEN|" :  (this.findArticulo == true) ? "": this.vEtq.NroDoc });
          listEtq.push({ "|USUARIO|" :  this.sGlobal.userName });
          listEtq.push({ "|COMPOSICION|" :  this.vEtq.CondicionAlmac });
          listEtq.push({ "|UM|" : this.vEtq.UM });
          listEtq.push({ "|TXTSALDO|" : (i == 0 && this.cantEtqSaldo > 0) ? "SALDO" : "" });
          listEtq.push({ "|COPIAS|" : this.numCopia });
          listEtq.push({ "|CODBARRA|" : res[i].UA_CodBarra });
          listEtq.push({ "|CUENTA|" : this.sGlobal.nombreEmpresa });
          listEtq.push({ "|PRODUCTO|" : this.vEtq.Articulo });
          listEtq.push({ "|EAN14|" :  obj.EAN14 });
          listEtq.push({ "|EAN|" : (obj.Nombre.toUpperCase() == this.vEtq.UM.toString().trim()) ? "13" : "14" });
          listEtq.push({ "|CANTIDAD|" : (i == 0 && this.cantEtqSaldo > 0) ? this.cantEtqSaldo : this.cantxEtq});
          listEtq.push({ "|SALDOTEXT|" :  "0" });
          listContainer.push({ 'Etiqueta' : listEtq });
        }

      }else{

        for(let i = 0; i < res.length; i++){  
          listEtq.push({ "|MES|" : currentDate.format('MMMM') });
          listEtq.push({ "|ANIO|" : currentDate.format('yyyy') });
          listEtq.push({ "LOTE" : this.lote });
          listEtq.push({ "ESTADO" : this.vEtq.Id_Condicion });
          listEtq.push({ "|CODIGO|" : this.vEtq.Codigo });
          listEtq.push({ "|VENCIMIENTO|" : moment(this.fecVen).format('MMM-yyyy')});
          listEtq.push({ "|CANTBULTO|" : (i == 0 && this.cantEtqSaldo > 0) ? this.residuo/this.cantXBulto: this.cantxEtq });
          listEtq.push({ "|CANTXBULTO|" : this.cantXBulto});
          listEtq.push({ "|SALDO|" : (i == 0 && this.cantEtqSaldo > 0) ? this.residuo % this.cantXBulto: 0 });
          listEtq.push({ "|FECHA_INGRESO|" : (this.findArticulo != false) ? "" : currentDate.format('dd/MM/yyyy') });
          listEtq.push({ "|ORDEN|" : (this.findArticulo != false)? "" : this.vEtq.NroDoc });
          listEtq.push({ "|USUARIO|" : this.sGlobal.userName });
          listEtq.push({ "|COMPOSICION|" : this.vEtq.CondicionAlmac });
          listEtq.push({ "|UM|" : this.vEtq.UM });
          listEtq.push({ "|TXTSALDO|" : (i == 0 && this.cantEtqSaldo > 0) ? "SALDO" : "" });
          listEtq.push({ "|COPIAS|" : this.numCopia });
          listEtq.push({ "|CODBARRA|" : res[i].UA_CodBarra });
          listEtq.push({ "|PRODUCTO|" : this.vEtq.Articulo });
          listEtq.push({ "|EAN14|" : obj.EAN14 });
          listEtq.push({ "|EAN|" : (obj.Nombre.toUpperCase() == this.vEtq.UM) ? "13": "14" });
          listEtq.push({ "|CANTIDAD|" : (i == 0 && this.cantEtqSaldo > 0) ? this.cantEtqSaldo : this.cantxEtq });
          listContainer.push({ 'Etiqueta' : listEtq });
        }
      }

      debugger;
      let format = this.formatLabels.filter(x=>x.Id_Format == this.id_FormatLabel)[0];
      this.sEtq.imprimirListaEtiquetas(listContainer, format.Label, this.sGlobal.nombreImpresora, true).then(result=>{
        var message : any = result;
        if (message.errNumber == -1){
          //Toast.makeText(this, "Print"+ message.message, Toast.LENGTH_SHORT).show();
          alert(message.message);
        }
      });

    });
  }

  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.onDidDismiss(data =>{
      console.log('Id_Impresora - actualizada', this.sGlobal.Id_Impresora);
    });
    modalIncidencia.present();
  }

  onChange(){
    //alert(this.id_UAlt);
    let obj = this.listUM.filter(x=>x.Id_UM == this.id_UAlt)[0];
    //cantidad por bulto 
    this.cantXBulto = obj.CantXBulto;
    if(this.findArticulo == false){
      let factor = obj.Factor;
      let numEtqPrint = this.vEtq.CantidadPedida/factor;
      let saldoEtq = this.vEtq.CantidadPedida - (numEtqPrint * factor);
      
      this.cantxEtq = factor;
      this.numEtq = numEtqPrint;
      this.cantEtqSaldo = saldoEtq;
    }else{
      this.cantxEtq = obj.CantXBulto;
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

  calcularTotalSuma(){
    var cantXCaja, numEtqTem, etqSaldoCant;
    cantXCaja = (this.cantxEtq <= 0) ? 0 : this.cantxEtq;
    numEtqTem = (this.numEtq <= 0) ? 0 : this.numEtq;
    etqSaldoCant = (this.cantEtqSaldo <= 0) ? 0 : this.cantEtqSaldo;
    this.totalSuma = (cantXCaja * numEtqTem) +  etqSaldoCant;
  }

  numEtqTextChange(ev:any){
    let val = ev.target.value;
    if(val != ""){
      this.calcularTotalSuma();
    }else{
      this.totalSuma = 0;
    }
    /**
    if(!charSequence.toString().equals("") ) {
                //do your work here
                Double cantXCaja, numEtqTem, etqSaldoCant;
                cantXCaja = Double.parseDouble((edtCantxEtq.getText().toString().equals("")) ? "0": edtCantxEtq.getText().toString());
                numEtqTem = Double.parseDouble((edtNumEtq.getText().toString().equals("")) ? "0": edtNumEtq.getText().toString());
                etqSaldoCant = Double.parseDouble(edtCantEtqSaldo.getText().toString().equals("") ? "0": edtCantEtqSaldo.getText().toString());
                tvTotalSuma.setText( String.format("%.2f", ((cantXCaja * numEtqTem) + etqSaldoCant)));
            } 
    **/
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}