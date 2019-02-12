import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';


/*
  Generated class for the DespachoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DespachoServiceProvider {

  headers = new Headers();

  constructor(public http: Http, public sGlobal: GlobalServiceProvider) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  listarPlanificacionXUsuario(strUsuario, intIdAlmacen){
    var parameter = {
      'strUsuario': strUsuario,
      'intIdAlmacen': intIdAlmacen
    };

    return new Promise(result=>{
      this.http.get(this.sGlobal.despachoService + 'ListarPlanificacionXUsuario', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      }, err=>{
        console.log('E-ListarPlanificacionXUsuario', err);
      })
    });
  }

  listarSubBultosLeidos(strTransaccion, tipo){
    var parameter = {
      'strTransaccion': strTransaccion, 
      'tipo': tipo
    };

    return new Promise(result=>{
      this.http.get(this.sGlobal.despachoService + 'ListarSubBultosLeidos', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('E-ListarSubBultosLeidos', err);
      })
    });
  }
}
