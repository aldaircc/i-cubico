import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import moment from 'moment';
import { EtqCajaServiceProvider } from '../../providers/etq-caja-service/etq-caja-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ImpresoraPage } from '../impresora/impresora';

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
    month: '1990-02-19',
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

    this.vEtq = navParams.get('vEtq');
    this.lote = this.vEtq.LoteLab;

    console.log('Parametro recibido', this.vEtq);
    console.log('Format de etiquetas', this.formatLabels);
    debugger;
    this.fecEmi = moment(this.vEtq.FecEmi).toISOString(); // .format('YYYY-MM-DD');
    this.fecVen = moment(this.vEtq.FecVen).toISOString(); //format('YYYY-MM-DD');
    console.log('FecEmi', this.fecEmi);
    console.log('FecVen', this.fecVen);

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
    debugger;
    console.log('Global id_Impresora', this.sGlobal.Id_Impresora);
  }

  listarUMxProducto(intIdProducto){
    this.sEtq.listarUMxProducto(intIdProducto).then(result=>{
      debugger;
      console.log('Result UMxProducto', result);
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
    debugger;
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
              
              console.log('Acepto');

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

  showModalImpresora(){
    let modalIncidencia = this.modalCtrl.create(ImpresoraPage);
    modalIncidencia.onDidDismiss(data =>{
      debugger;
      console.log('Id_Impresora - actualizada', this.sGlobal.Id_Impresora);
    });
    modalIncidencia.present();
  }

  onChange(){
    debugger;
    //alert(this.id_UAlt);
    let obj = this.listUM.filter(x=>x.Id_UM == this.id_UAlt)[0];
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

  numEtqTextChange(ev:any){
    debugger;
    let val = ev.target.value;
    if(val != ""){
      var cantXCaja, numEtqTem, etqSaldoCant;
      cantXCaja = (this.cantxEtq <= 0) ? 0 : this.cantxEtq;
      numEtqTem = (this.numEtq <= 0) ? 0 : this.numEtq;
      etqSaldoCant = (this.cantEtqSaldo <= 0) ? 0 : this.cantEtqSaldo;
      this.totalSuma = (cantXCaja * numEtqTem) +  etqSaldoCant;
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