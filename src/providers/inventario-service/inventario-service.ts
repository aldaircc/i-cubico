import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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

  iniTerInvXPercha(strIdInventario, intIdSector, strFila, strUsuarioInventariador, strUsuario, intIdRF, intTipo){
    let parameter = {
      'strIdInventario' : strIdInventario, 
      'intIdSector' : intIdSector, 
      'strFila' : strFila, 
      'strUsuarioInventariador' : strUsuarioInventariador, 
      'strUsuario' : strUsuario, 
      'intIdRF' : intIdRF, 
      'intTipo' : intTipo
    };

    return new Promise((result,reject)=>{
      this.http.post(this.sGlobal.inventarioService + 'IniTerInvXPercha/strIdInventario/intIdSector/strFila/strUsuarioInventariador/strUsuario/intIdRF/intTipo', JSON.stringify(parameter), {headers:this.headers })
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('E-initTerInvXPercha', err);
      })
    });
  }

  iniTerInvXProducto(strIdInventario, intIdProducto, strLote, strUsuarioInventariador, strUsuario, intIdRF, intTipo){
    let parameter = {
      'strIdInventario' : strIdInventario, 
      'intIdProducto' : intIdProducto, 
      'strLote' : strLote, 
      'strUsuarioInventariador' : strUsuarioInventariador, 
      'strUsuario' : strUsuario, 
      'intIdRF' : intIdRF, 
      'intTipo': intTipo
    };

    return new Promise((result, reject)=>{
      this.http.post(this.sGlobal.inventarioService + 'IniTerInvXProducto?strIdInventario/intIdProducto/strLote/strUsuarioInventariador/strUsuario/intIdRF/intTipo', JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('E-iniTerInvXProducto', err);
      })
    });
  }

  listarUbicacionesSugeridasXProducto(intIdProducto, strLote, intIdAlmacen){
    let parameter = {
      'intIdProducto': intIdProducto,
      'strLote': strLote,
      'intIdAlmacen': intIdAlmacen
    };

    return new Promise(result=>{
      this.http.get(this.sGlobal.inventarioService + 'ListarUbicacionesSugeridasXProducto', {params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('E-listarUbicacionesSugeridasXProducto', err);
      })
    });
  }

  validarUbicacionInventario(CodBarraUbi, intIdAlmacen, intIdSector, strFila, intTipo){
    let parameter = {
      'CodBarraUbi': CodBarraUbi, 
      'intIdAlmacen': intIdAlmacen,
      'intIdSector': intIdSector, 
      'strFila': strFila, 
      'intTipo': intTipo
    };

    return new Promise((result, reject)=>{
      this.http.post(this.sGlobal.inventarioService + 'CodBarraUbi/intIdAlmacen/intIdSector/strFila/intTipo', JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err=>{
        console.log('E-validarUbicacionInventario', err);
      })
    });
  }
}
