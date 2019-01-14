import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalServiceProvider } from '../global-service/global-service';

/*
  Generated class for the AlmacenajeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlmacenajeServiceProvider {

  headers = new Headers();

  constructor(public http: Http, public sGlobal: GlobalServiceProvider) {
    console.log('Hello AlmacenajeServiceProvider Provider');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  Reabastecer(intIdProducto, intIdUbicacionDestino, strObservacion, intIdRF, strUsuario, IdAlmacen){
    let parameter = { 'intIdProducto' : intIdProducto, 'intIdUbicacionDestino': intIdUbicacionDestino, 'strObservacion':strObservacion, 
  'intIdRF': intIdRF, 'strUsuario': strUsuario, 'IdAlmacen': IdAlmacen };
    return new Promise((resolve, reject)=>{
      this.http.post(this.sGlobal.almacenajeService + 'GenerarUbicacionXReabastecer/intIdProducto/intIdUbicacionDestino/strObservacion/intIdRF/strUsuario/IdAlmacen', JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error Reabastecer', err);
      })
    });
  }

  //Loque#369Dev
  listarUbicacionXCodigoBarra(strUbi, intIdAlmacen){
    let parameter = {
      'strUbi': strUbi,
      'intIdAlmacen': intIdAlmacen,
    };
    debugger;
    return new Promise(result=>{
      this.http.get(this.sGlobal.almacenajeService + 'ListarUbicacionXCodigoBarra', { params : parameter })
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('E-listarUbicacionXCodigoBarra', err);
      })
    });
  }
}
