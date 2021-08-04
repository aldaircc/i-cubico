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

  Reabastecer(intIdProducto, intIdUbicacionDestino, strObservacion, intIdRF, strUsuario, IdAlmacen) {
    let parameter = {
      'intIdProducto': intIdProducto, 'intIdUbicacionDestino': intIdUbicacionDestino, 'strObservacion': strObservacion,
      'intIdRF': intIdRF, 'strUsuario': strUsuario, 'IdAlmacen': IdAlmacen
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.sGlobal.almacenajeService + 'GenerarUbicacionXReabastecer/intIdProducto/intIdUbicacionDestino/strObservacion/intIdRF/strUsuario/IdAlmacen', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error Reabastecer', err);
        })
    });
  }

  //Loque#369Dev
  listarUbicacionXCodigoBarra(strUbi, intIdAlmacen) {
    let parameter = {
      'strUbi': strUbi,
      'intIdAlmacen': intIdAlmacen,
    };
    return new Promise(result => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarUbicacionXCodigoBarra', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-listarUbicacionXCodigoBarra', err);
        })
    });
  }

  validarExisteUA(strUA) {
    let parameter = {
      'strUA': strUA
    };
    return new Promise(result => {
      this.http.get(this.sGlobal.almacenajeService + 'ValidarExisteUA', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-validarExisteUA', err);
        })
    });
  }

  validarExisteSerie(strSerie, intId_Producto) {
    let parameter = {
      'strSerie': strSerie,
      'intId_Producto': intId_Producto
    };
    return new Promise(result => {
      this.http.get(this.sGlobal.almacenajeService + 'ValidarExisteSerie', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-validarExisteSerie', err);
        })
    });
  }

  registrarUAsUbicacion(listStrUA, intIdUbicacion, strUsuario) {
    debugger;
    let parameter = {
      'strUA': listStrUA,
      'intIdUbicacion': intIdUbicacion,
      'strUsuario': strUsuario
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.almacenajeService + 'RegistrarUAsUbicacion/strUA/intIdUbicacion/strUsuario', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);          
        }, err => {
          console.log('E-registrarUAsUbicacion', err);
        })
    });
  }

  registrarSeriesUbicacion(listStrUA, intIdUbicacion,intIdProducto,intIdCondicion, strUsuario, intIdSubAlmacen) {    
    let parameter = {
      'strUA': listStrUA,
      'intIdUbicacion': intIdUbicacion,
      'intIdProducto': intIdProducto,
      'intIdCondicion': intIdCondicion,
      'intIdCentro': this.sGlobal.Id_Centro,
      'intIdAlmacen': this.sGlobal.Id_Almacen,      
      'strUsuario': strUsuario,
      'intIdSubAlmacen': intIdSubAlmacen
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.almacenajeService + 'RegistrarSeriesUbicacion_V2/strUA/intIdUbicacion/intIdProducto/intIdCondicion/intIdCentro/intIdAlmacen/strUsuario/intIdSubAlmacen', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);          
        }, err => {
          console.log('E-RegistrarSeriesUbicacion', err);
        })
    });
  }


  //aromero
  getUbicacionTransito(intIdAlmacen) {
    var parameter: any;
    parameter = { "IDALMACEN": intIdAlmacen };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'Total_Items_UbicacionTransito', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getUbicacionTransito', err);
        })
    });
  }

  //aromero
  getValidarUATransito(strUA, intIdUbicacion) {
    var parameter: any;
    parameter = { 'strUA': strUA, 'intIdUbicacion': intIdUbicacion };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ValidarUATransito', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getValidarUATransito', err);
        })
    });
  }

  //aromero
  getListarUbicacionLibreXMarcaSugerida(intIdMarca, intIdAlmacen, intIdCondicion, CodBarraUA) {
    var parameter: any;
    parameter = { 'INTIDMARCA': intIdMarca, 'INTIDALMACEN': intIdAlmacen, 'INTIDCONDICION': intIdCondicion, 'CODBARRAUA': CodBarraUA };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarUbicacionLibreXMarcaSugerida', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUbicacionLibreXMarcaSugerida', err);
        })
    });
  }

  //aromero
  getListarSectoresXAlmacen(intIdAlmacen) {
    var parameter: any;
    parameter = { 'INTIDALMACEN': intIdAlmacen };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarSectoresXAlmacen', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarSectoresXAlmacen', err);
        })
    });
  }

  //aromero  
  getListarUbicacionesDisponibles(intIdAlmacen, intIdMarca, intCondicion, intIdSector) {
    var parameter: any;
    parameter = { 'INTIDALMACEN': intIdAlmacen, 'INTIDMARCA': intIdMarca, 'INTIDCONDICION': intCondicion, 'INTIDSECTOR': intIdSector };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarMasUbicacionesDisponibles', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUbicacionesDisponibles', err);
        })
    });
  }

  //aromero  
  postRegistrarUAUbicacion(strUA, intIdUbicacion, strUsuario) {
    let parameter = {
      'strUA': strUA,
      'intIdUbicacion': intIdUbicacion,
      'strUsuario': strUsuario
    };
    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.almacenajeService + 'RegistrarUAUbicacion/strUA/intIdUbicacion/strUsuario', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-postRegistrarUAUbicacion', err);
        })
    });
  }

  //aromero
  getListarUbicacionXCodigoBarra(strUbi, intIdAlmacen) {
    var parameter: any;
    parameter = { 'STRUBI': strUbi, 'INTIDALMACEN': intIdAlmacen };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarUbicacionXCodigoBarra', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUbicacionXCodigoBarra', err);
        })
    });
  }

  //aromero
  getListarUAsXUbicacion(strUbi, intIdAlmacen) {
    var parameter: any;
    parameter = { 'STRBARRAUBICACION': strUbi, 'INTIDALMACEN': intIdAlmacen };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarUAsXUbicacion_V2', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUAsXUbicacion', err);
        })
    });
  }

  //aromero
  getValidarExisteUAUbicada(strUA, strLote, intIdUbicacion) {
    var parameter: any;
    parameter = { 'STRUA': strUA, 'STRLOTE': strLote, 'INTIDUBICACION': intIdUbicacion };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ValidarExisteUAUbicada', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getValidarExisteUAUbicada', err);
        })
    });
  }

  getValidarExisteUAUbicada_V2(strUA, strLote, intIdUbicacion, tipo) {
    var parameter: any;
    parameter = { 'STRUA': strUA, 'STRLOTE': strLote, 'INTIDUBICACION': intIdUbicacion, 'tipo': tipo};
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ValidarExisteUAUbicada_V2', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getValidarExisteUAUbicada', err);
        })
    });
  }

  //aromero
  postReubicacionMasiva(IdCentro, IdProducto, IdAlmacen, Cantidad, IdUbicacionDestino, strUsuario, strUA) {
    debugger;
    let parameter = {
      'IdCentro': IdCentro,
      'IdProducto': IdProducto,
      'IdAlmacen': IdAlmacen,
      'Cantidad': Cantidad,
      'IdUbicacionDestino': IdUbicacionDestino,
      'strUsuario': strUsuario,
      'strUA': strUA
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.almacenajeService + 'ReubicacionMasiva/IdCentro/IdProducto/IdAlmacen/Cantidad/IdUbicacionDestino/strUsuario/strUA', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-postReubicacionMasiva', err);
        })
    });
  }

  //aromero
  postRegistrarUAStandBy(ua, Accion, IdAlmacen) {
    debugger;
    let parameter = {
      'ua': ua,
      'Accion': Accion,
      'IdAlmacen': IdAlmacen
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.almacenajeService + 'RegistrarUAStandBy/ua/Accion/IdAlmacen', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-postRegistrarUAStandBy', err);
        })
    });
  }

  //aromero
  getListarUAUbicada(strUA, intIdAlmacen) {
    var parameter: any;
    parameter = { 'STRUA': strUA, 'INTIDALMACEN': intIdAlmacen };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarUAUbicada', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUAUbicada', err);
        })
    });
  }

  getListarSerieUbicada(serie, intIdAlmacen) {
    var parameter: any;
    parameter = { 'serie': serie, 'INTIDALMACEN': intIdAlmacen };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarSerieUbicada', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUAUbicada', err);
        })
    });
  }

  //aromero  
  postReAsignarUA(strUA, strUADestino, intIdUbicacionDestino, Cantidad, strUsuario) {
    let parameter = {
      'strUA': strUA,
      'strUADestino': strUADestino,
      'intIdUbicacionDestino': intIdUbicacionDestino,
      'Cantidad': Cantidad,
      'strUsuario': strUsuario
    };
    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.almacenajeService + 'ReasignarUA/strUA/strUADestino/intIdUbicacionDestino/Cantidad/strUsuario', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-postReAsignarUA', err);
        })
    });
  }

  //aromero
  postReUbicarUA(strUA, intIdUbicacion, strUsuario) {
    debugger;
    let parameter = {
      'strUA': strUA,
      'intIdUbicacion': intIdUbicacion,
      'strUsuario': strUsuario
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.almacenajeService + 'ReUbicarUA/strUA/intIdUbicacion/strUsuario', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-postReUbicarUA', err);
        })
    });
  }

  //aromero
  getListarUbicacionesXEAN(strBuscar, intIdAlmacen) {
    var parameter: any;
    parameter = { 'STRBUSCAR': strBuscar, 'INTIDALMACEN': intIdAlmacen };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarUbicacionesXEAN', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUbicacionesXEAN', err);
        })
    });
  }

  //aromero
  getListarUAConNuevaCantidad(strUA, decCantidad) {
    var parameter: any;
    parameter = { 'STRUA': strUA, 'DECCANTIDAD': decCantidad };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarUAConNuevaCantidad', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUAConNuevaCantidad', err);
        })
    });
  }

  //aromero
  getListarReabastecimientoXUsuario(intIdAlmacen, strUsuario) {
    var parameter: any;
    parameter = { 'INTIDALMACEN': intIdAlmacen, 'STRUSUARIO': strUsuario };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarReabastecimientoXUsuario', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarReabastecimientoXUsuario', err);
        })
    });
  }


  //aromero
  getRutaReabastecimientoXTx(strIdTx, intIdProducto, intIdAlmacen) {
    var parameter: any;
    parameter = { 'STRIDTX': strIdTx, 'INTIDPRODUCTO': intIdProducto, 'INTIDALMACEN': intIdAlmacen };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'RutaReabastecimientoXTx', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getRutaReabastecimientoXTx', err);
        })
    });
  }


  //aromero
  getListarUbicacionUASugeridaXReabastecer(intIdAlmacen, intIdProducto, intIdUbiDestino, strMovimiento) {
    var parameter: any;
    parameter = { 'INTIDALMACEN': intIdAlmacen, 'INTIDPRODUCTO': intIdProducto, 'INTIDUBIDESTINO': intIdUbiDestino, 'STRMOVIMIENTO': strMovimiento };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ListarUbicacionUASugeridaXReabastecer', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getListarUbicacionUASugeridaXReabastecer', err);
        })
    });
  }

  //aromero
  getValidarUAUbicacion(strUA, intIdUbicacion) {
    var parameter: any;
    parameter = { 'STRUA': strUA, 'INTIDUBICACION': intIdUbicacion };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.almacenajeService + 'ValidarUAUbicacion', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getValidarUAUbicacion', err);
        })
    });
  }


}
