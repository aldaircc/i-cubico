import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';
/*
  Generated class for the ReciboServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReciboServiceProvider {
  headers = new Headers();

  constructor(public http: Http, public sGlobal: GlobalServiceProvider) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getRecepcionesXUsuario(strUsuario, intIdAlmacen, intIdMuelle){
    var parameter : any;
    parameter = {"strUsuario": strUsuario,"intIdAlmacen": intIdAlmacen, "intIdMuelle": intIdMuelle};

    return new Promise(resolve=>{
      this.http.get(this.sGlobal.recepcion + 'ListarRecepcionesXUsuario_V2', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error getRecepcionesXUsuario', err);
      })
    });
  }

  getDetalleXTx(strIdTx){
    var parameter = {'strIdTx' : strIdTx};
    return new Promise(resolve=>{
      this.http.get(this.sGlobal.recepcion + 'TxDetalleXTx_v2', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error getDetalleXTx', err);
      })
    });
  }

  cerrarRecepcion(idTx, idEstado, usuario){
   var parameter = {'idTx': idTx, 'idEstado': idEstado, 'usuario': usuario};
    return new Promise((resolve, reject)=>{
      this.http.post(this.sGlobal.recepcion + 'CerrarRecepcion/idTx/idEstado/usuario', JSON.stringify(parameter), {headers:this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        console.log("it's work", data);
      },err=>{
        console.log('Error cerrarRecepcion', err);
      })
    });
  }

  registrarUATransito(txUbi){
    var parameter = {'TxUbi': txUbi};
    return new Promise((resolve, reject)=>{
      this.http.post(this.sGlobal.recepcion + 'RegistrarUATransito/TxUbi', JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        console.log('registrarUATransito', data);
      },err=>{
        console.log('Error registrarUATransito', err);
      })
    });
  }

  validarReciboTransferenciaSerie(strNumOrden, strSerie, intItem){
    var parameter = {'strNumOrden': strNumOrden, 'strSerie': strSerie,'intItem': intItem};
    return new Promise(resolve=>{
      this.http.get(this.sGlobal.recepcion + 'ValidarReciboTransferenciaSerie', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
          resolve(data);
      },err=> {
        console.log('Error validarReciboTransferenciaSerie', err);
      })
    });
  }

  validarReciboSerie(strSerie, strIdTx, intIdProducto){
    var parameter = {'strSerie': strSerie, 'strIdTx': strIdTx, 'intIdProducto':intIdProducto};
    return new Promise(resolve=>{
      this.http.get(this.sGlobal.recepcion + 'ValidarReciboSerie', {params:parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error validarReciboSerie');
      })
    });
  }

  validarUAReciboTransferencia(ua){
    var parameter = {'ua': ua};

    return new Promise((resolve, reject)=>{
        this.http.post(this.sGlobal.recepcion + 'ValidarUAReciboTransferencia/ua', JSON.stringify(parameter), {headers:this.headers})
          .map(res=>res.json())
          .subscribe(data=>{
            resolve(data);
            console.log('validarUAReciboTransferencia', data);
          },err=>{
            console.log('Error validarUAReciboTransferencia', err);
          })
    });
  }

  validarUARecibo(ua){
    var parameter = {'ua':ua};

    return new Promise((resolve, reject)=>{
        this.http.post(this.sGlobal.recepcion + 'ValidarUARecibo/ua', JSON.stringify(parameter), {headers:this.headers})
          .map(res=>res.json())
          .subscribe(data=>{
            console.log('validarUARecibo', data);
            resolve(data);
          },err=>{
            console.log('Error validarUARecibo', err);
          })
    });
  }

  registrarUATransferencia(ua){
    let parameter = { 'ua' : ua };
    return new Promise((resolve, reject)=>{
      this.http.post(this.sGlobal.recepcion + 'RecepcionUATransferencia/ua', JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error registrarUATransferencia', err);
      })
    });
  }

  registrarUA(ua){
    let parameter = { 'ua': ua };
    return new Promise((resolve, reject)=>{
      this.http.post(this.sGlobal.recepcion + 'RecepcionUA/ua', JSON.stringify(parameter),{headers:this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Erro registrarUA', err);
      })
    });
  }

  listarUAXProductoTx(strIdTx, intIdProducto, intItem){
    debugger;
    let parameter = { 'strIdTx' : strIdTx, 'intIdProducto' : intIdProducto, 'intItem' : intItem };
    return new Promise(result=>{
      this.http.get(this.sGlobal.recepcion + 'ListarUAXProductoTx', {params : parameter})
      .map(res=> res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('Error - listarUAXProductoTx', err);
      })
    });
  }
  /**
    @GET("ListarUAXProductoTx")
    Call<List<UAXProductoTxA>> getUAXProductoTx(
        @Query("strIdTx") String strIdTx,
        @Query("intIdProducto") Integer intIdProducto,
        @Query("intItem") Integer intItem
    ); 
  **/
}