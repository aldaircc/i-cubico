import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';

/*
  Generated class for the InventarioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventarioServiceProvider {

  headers = new Headers();

  constructor(public http: Http, public sGlobal: GlobalServiceProvider) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  listarInventarioXUsuario(strUsuario, intIdAlmacen){
    let parameter = {
      'strUsuario' : strUsuario,
      'intIdAlmacen' : intIdAlmacen
    };

    return new Promise(result=>{
      this.http.get(this.sGlobal.inventarioService + 'ListarInventarioXUsuario', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('E-listarInventarioXUsuario', err);
      })
    });
  }

  listarProductosXUsuarioInventario(strIdInventario, intIdAlmacen, strUsuario, intIdEstado){
    let parameter = {
      'strIdInventario': strIdInventario, 
      'intIdAlmacen': intIdAlmacen, 
      'strUsuario': strUsuario, 
      'intIdEstado': intIdEstado
    };

    return new Promise(result=>{
      this.http.get(this.sGlobal.inventarioService + 'ListarProductosXUsuarioInventario', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
       result(data);
      },err=>{
        console.log('E-listarProductosXUsuarioInventario', err);
      })
    });
  }

  listarPerchasXUsuarioInventario(strIdInventario, intIdAlmacen, strUsuario, intIdEstado){
    let parameter = {
      'strIdInventario': strIdInventario, 
      'intIdAlmacen': intIdAlmacen, 
      'strUsuario': strUsuario, 
      'intIdEstado': intIdEstado
    };

    return new Promise(result=>{
      this.http.get(this.sGlobal.inventarioService + 'ListarPerchasXUsuarioInventario', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('E-listarPerchasXUsuarioInventario', err);
      })
    });
  }
}
