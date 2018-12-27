import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

/*
  Generated class for the IncidenciaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IncidenciaServiceProvider {

  apiUrl = 'http://172.16.32.15:8085/SGAA_WCF/';
  headers = new Headers();
  usuario = 'UsuarioService.svc/rest/';
  produccion = 'ProduccionService.svc/rest/';
  tablaEst = 'TablasEstaticasService.svc/rest/';
  recepcion = 'RecepcionService.svc/rest/';

  constructor(public http: Http) {
    console.log('Hello IncidenciaServiceProvider Provider');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    //this.headers.append('dataType', 'json');
  }

  listarCausalesXModulo(intIdCliente, intIdModulo){
    /**
          RecepcionService.svc
    @GET("ListarCausalesXModulo")
    Call<ArrayList<Causal>> listarCausalesXModulo(
            @Query("intIdCliente") Integer intIdCliente,
            @Query("intIdModulo") Integer intIdModulo
    ); 
  **/
    let parameter : any;
    parameter = {'intIdCliente': intIdCliente, 'intIdModulo': intIdModulo};
    debugger;
    return new Promise(resolve=>{
      this.http.get(this.apiUrl + this.recepcion + 'ListarCausalesXModulo', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err =>{
        console.log('Error listarCausalesXModulo', err);
      });
    });
  }

  registrarControlOP(strIdOP, intIdLineaMAQ, intIdCausal, strUsuario, strObservacion, bFlagPausa){
    /** 
        ProduccionService.svc
            @Headers({"Accept:application/json", "Content-Type:application/json"})
        @POST("RegistrarControlOP/strIdOP/intIdLineaMAQ/intIdCausal/strUsuario/strObservacion/bFlagPausa")
        Call<Mensaje> registrarControlOP(
                @Body JsonObject param
                ); 
    **/
   let parameter = {'strIdOP': strIdOP, 'intIdLineaMAQ' : intIdLineaMAQ, 'intIdCausal' : intIdCausal, 'strUsuario' : strUsuario, 'strObservacion' : strObservacion, 'bFlagPausa' : bFlagPausa };

   return new Promise((resolve, reject)=>{
    this.http.post(this.apiUrl+this.produccion+'RegistrarControlOP', JSON.stringify(parameter), { headers: this.headers})
    .map(res=>res.json())
    .subscribe(data=>{
      resolve(data);
    },err=>{
      console.log('E-registrarControlOP',err);
    })
   });
  }

  registrarControl(id_Tx, id_Causal, usuario, id_TerminalRF, observacion, flagPausa){
  /**
      TablasEstaticasService.svc
      @Headers({"Accept: application/json", "Content-Type: application/json"})
      @POST("RegistrarControl")
      Call<Mensaje> registrarControl(
              @Query("Id_Tx") String strId_Tx,
              @Query("Id_Causal") Integer intId_Causal,
              @Query("Usuario") String strUsuario,
              @Query("Id_TerminalRF") Integer intId_TerminalRF,
              @Query("Observacion") String strObservacion,
              @Query("FlagPausa") Boolean bolFlagPausa
      );
  **/

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Id_Tx', id_Tx);
    urlSearchParams.append('Id_Causal', id_Causal);
    urlSearchParams.append('Usuario', usuario);
    urlSearchParams.append('Id_TerminalRF', id_TerminalRF);
    urlSearchParams.append('Observacion', observacion);
    urlSearchParams.append('FlagPausa', flagPausa);

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + this.tablaEst + 'RegistrarControl?'+ urlSearchParams.toString(), null)
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('E-registrarControl', err);
      });
    });
  }

  buscarControlUsuario(strId_OP, strUsuario){
    let parameter = { 'strId_OP' : strId_OP, 'strUsuario' : strUsuario};
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + this.produccion + 'BuscarControlUsuario', { params : parameter})
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },err => {
        console.log('E - buscarControlUsuario', err);
      })
    });
  }

  buscarControlPendiente(StrIdTx, strUsuario){
    let parameter = { 'StrIdTx' : StrIdTx, 'strUsuario' : strUsuario };
    return new Promise((resolve)=>{
      this.http.get(this.apiUrl + this.tablaEst + 'BuscarControlPendiente', { params : parameter })
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, err => {
        console.log('E - buscarControlPendiente', err);
      })
    });
  }
}