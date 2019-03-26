import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IncidenciaServiceProvider } from '../../providers/incidencia-service/incidencia-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

/**
 * Generated class for the IncidenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incidencia',
  templateUrl: 'incidencia.html',
})
export class IncidenciaPage {

  vParameters : any;
  listCausal : any;
  id_Causal : any;
  tipo : number = 0;
  fechaInicio : any;
  flagPausa : boolean = false;
  observacion : string;
  textButton : string = "Continuar";
  id_LineaMAQ : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
    public sIncidencia: IncidenciaServiceProvider, public sGlobal: GlobalServiceProvider) {
    this.vParameters = navParams.get('pIncidencia');
    this.listarCausalesXModulo(0, 1);
    
    if(this.tipo == 1){
      this.buscarControlUsuario(this.vParameters.Id_Tx, this.sGlobal.userName);
    }else{
      this.buscarControlPendiente( (this.vParameters == undefined) ? '': this.vParameters.Id_Tx, this.sGlobal.userName);
    }
  }

  buscarControlUsuario(strId_OP, strUsuario){
    this.sIncidencia.buscarControlUsuario(strId_OP, strUsuario).then(result=>{
      debugger;
      console.log('resultado control usuario', result);
      let res : any = result;
      if(res.length != 0){
        this.observacion = result[0].Observacion;
        this.flagPausa = result[0].FlagPausa;
        this.fechaInicio = result[0].FechaHoraInicio;
        this.id_Causal = result[0].Id_Causal;
      }
    });
  }

  buscarControlPendiente(strIdTx, strUsuario){
    this.sIncidencia.buscarControlPendiente(strIdTx, strUsuario).then(result=>{
      debugger;
      let res : any = result;
      if(res.length != 0){
        this.observacion = result[0].Observacion;
        this.flagPausa = result[0].FlagPausa;
        this.fechaInicio = result[0].FechaHoraInicio;
        this.id_Causal = result[0].Id_Causal;
      }
      /**
      if (list.size() != 0){
            ControlPendiente obj = list.get(0);
            edtObser.setText(obj.getObservacion());
            bolR_FlagPausa = obj.getFlagPausa();
            dtFechaIni = obj.getFechaHoraInicio();
            spnCausal.setSelection(getPositionOfCausal(obj.getId_Causal()));
            btnParar.setText("Continuar");
        } 
      **/
    });
  }

  dismiss(data = { 'response' : 400 }){
    this.viewCtrl.dismiss(data);
  }

  listarCausalesXModulo(id_Cliente, id_Modulo){
    this.sIncidencia.listarCausalesXModulo(id_Cliente, id_Modulo).then(result=>{      
      this.listCausal = result;
    });
  }

  btnProcesar(){

    if(this.id_Causal <= 0 || this.id_Causal == undefined){
      alert('Seleccione causal');
      return;
    }

    if(this.tipo == 1){
      this.registrarControlOP(this.vParameters.Id_Tx, this.id_LineaMAQ, this.id_Causal, this.sGlobal.userName, this.observacion, this.flagPausa);
    }else{
      this.registrarControl(this.vParameters.Id_Tx, this.id_Causal, this.sGlobal.userName, 1, this.observacion, this.flagPausa);
    }
  }

  registrarControlOP(strIdOP, intIdLineaMaq, intId_Causal, strUsuario, strObservacion, bolFlagPausa){
    this.sIncidencia.registrarControlOP(strIdOP, intIdLineaMaq, intId_Causal, strUsuario, strObservacion, bolFlagPausa).then(result=>{
      let res : any = result;
      if(res.errNumber == 0){
        let content = (this.flagPausa == true) ? "Continuar transacción":"Transacción detenida";
        //toast -> content
        alert(content);
      }else{
        //toast -> message.message
        alert(res.message);
      }
    });
  }

  registrarControl(id_Tx, id_Causal, usuario, id_TerminalRF, observacion, flagPausa){
    this.sIncidencia.registrarControl(id_Tx, id_Causal, usuario, id_TerminalRF, observacion, flagPausa).then(result=>{
    let res : any = result;
    if(res.errNumber == 0){
      let content = (this.flagPausa == true) ? "Continuar transacción":"Transacción detenida";
      alert(content);
      //toast -> content
      //cerrar ventana de incidencia -> this.dismiss();
      let data = { 'response': 200 };
      this.dismiss(data);

    }else{
      //toast -> message.message
      alert(res.message);
    }
    });
  }
}
