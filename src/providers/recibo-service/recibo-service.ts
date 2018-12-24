import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
/*
  Generated class for the ReciboServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReciboServiceProvider {

  apiUrl = 'http://172.16.32.15:8085/SGAA_WCF/RecepcionService.svc/rest/';
  headers = new Headers();

  constructor(public http: Http) {
    console.log('Hello ReciboServiceProvider Provider');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getRecepcionesXUsuario(strUsuario, intIdAlmacen, intIdMuelle){
    var parameter : any;
    parameter = {"strUsuario": strUsuario,"intIdAlmacen": intIdAlmacen, "intIdMuelle": intIdMuelle};

    return new Promise(resolve=>{
      this.http.get(this.apiUrl + 'ListarRecepcionesXUsuario_V2', { params: parameter})
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
      this.http.get(this.apiUrl+'TxDetalleXTx_v2', {params: parameter})
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
      //let headers = new Headers();
      //headers.append("Accept", 'application/json');
      //headers.append('Content-Type', 'application/json');
      debugger;
      this.http.post(this.apiUrl+'CerrarRecepcion/idTx/idEstado/usuario', JSON.stringify(parameter), {headers:this.headers})
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
      //let headers = new Headers();
      //headers.append('Accept', 'application/json');
      //headers.append('Content-Type', 'application/json');
      this.http.post(this.apiUrl+'RegistrarUATransito/TxUbi', JSON.stringify(parameter), {headers: this.headers})
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
      this.http.get(this.apiUrl + 'ValidarReciboTransferenciaSerie', {params: parameter})
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
      this.http.get(this.apiUrl+'ValidarReciboSerie', {params:parameter})
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
        this.http.post(this.apiUrl+'ValidarUAReciboTransferencia/ua', JSON.stringify(parameter), {headers:this.headers})
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
        this.http.post(this.apiUrl+'ValidarUARecibo/ua', JSON.stringify(parameter), {headers:this.headers})
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
      this.http.post(this.apiUrl+'RecepcionUATransferencia/ua', JSON.stringify(parameter), {headers: this.headers})
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
      this.http.post(this.apiUrl+'RecepcionUA/ua', JSON.stringify(parameter),{headers:this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Erro registrarUA', err);
      })
    });
  }
}