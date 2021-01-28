import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';

/*
  Generated class for the PickingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PickingServiceProvider {

  headers = new Headers();

  constructor(public http: Http, public sGlobal: GlobalServiceProvider) {
    console.log('Hello PickingServiceProvider Provider');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getOrdenesXUsuario(strUsuario, intIdAlmacen) {
    var parameter: any;
    parameter = { "strUsuario": strUsuario, "intIdAlmacen": intIdAlmacen };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.pickingService + 'ListarPickingXUsuarioV2', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getOrdenesXUsuario', err);
        })
    });
  }

  getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen) {
    var parameter: any;
    parameter = { "strNroDoc": strNroDoc, "strUsuario": strUsuario, "intIdAlmacen": intIdAlmacen };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.pickingService + 'RutaPickingXTxXModelo', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getDataRutaPicking', err);
        })
    });
  }


  getDetallePicking(strNroDoc, strUsuario, intIdAlmacen) {
    var parameter: any;
    parameter = { "strNroDoc": strNroDoc, "strUsuario": strUsuario, "intIdAlmacen": intIdAlmacen };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.pickingService + 'RutaPickingXTxXModelo', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getOrdenesXUsuario', err);
        })
    });
  }

  getPickingProducto(strNroDoc, strUsuario, intIdAlmacen) {
    var parameter: any;
    parameter = { "strNroDoc": strNroDoc, "strUsuario": strUsuario, "intIdAlmacen": intIdAlmacen };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.pickingService + 'RutaPickingXTxXModelo', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getPickingProducto', err);
        })
    });
  }

  getMuelleXAlmacen(intIdAlmacen, strCodigoBarra) {
    var parameter: any;
    parameter = { "intIdAlmacen": intIdAlmacen, "strCodigoBarra": strCodigoBarra };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.pickingService + 'ListarNombreMuelleXAlmacen', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getMuelleXAlmacen', err);
        })
    });
  }

  CerrarPicking(idTx, idEstado, usuario, idMuelle, IdAlmacen) {
    var parameter =
    {
      "idTx": idTx, "idEstado": idEstado, "usuario": usuario, "idMuelle": idMuelle, "IdAlmacen": IdAlmacen
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.pickingService + 'CerrarPicking/idTx/idEstado/usuario/idMuelle/IdAlmacen', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('Error CerrarPicking', err);
        })
    });
  }

  getValidarUAPicking(strIdTx, UA, IdProducto, lote, IdUbicacion) {
    var parameter: any;
    parameter = { "strIdTx": strIdTx, "UA": UA, "IdProducto": IdProducto, "lote": lote, "IdUbicacion": IdUbicacion };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.pickingService + 'ValidarUAPicking', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getValidarUAPicking', err);
        })
    });
  }

  getDetalleXProducto(strIdTx, intIdProducto, intItem) {
    var parameter: any;
    parameter = { "strIdTx": strIdTx, "intIdProducto": intIdProducto, "intItem": intItem };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.pickingService + 'ListarUAsXPicking', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error getDetalleXProducto', err);
        })
    });
  }

  RegistarEliminarUA(ua) {
    let parameter = { 'ua': ua };
    return new Promise((resolve, reject) => {
      this.http.post(this.sGlobal.pickingService + 'PickingUA/ua', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          debugger;
          resolve(data);
        }, err => {
          console.log('Error RegistarEliminarUA', err);
        })
    });
  }

  //Loque#369Dev

  listarTransferenciaSubAlmacenXUsuario(strUsuario, intIdAlmacen) {
    debugger;
    let parameter = { 'strUsuario': strUsuario, 'intIdAlmacen': intIdAlmacen };
    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.pickingService + 'ListarTransferenciaSubAlmacenXUsuario/strUsuario/intIdAlmacen', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-listarTransferenciaSubAlmacenXUsuario', err);
        })
    });
  }

  listarDetalleTransfXTx(strIdTx) {
    var parameter = { 'strIdTx': strIdTx };
    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.pickingService + 'ListarDetalleTransfXTx/strIdTx', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('Error - listarDetalleTransfXTx', err);
        })
    });
  }

  listarStockProductoXUbicaciones(intIdAlmacen, intIdSubAlmacen, intIdProducto, strLote) {
    var parameter = {
      'intIdAlmacen': intIdAlmacen,
      'intIdSubAlmacen': intIdSubAlmacen,
      'intIdProducto': intIdProducto,
      'strLote': strLote
    };

    return new Promise((result) => {
      this.http.get(this.sGlobal.pickingService + 'ListarStockProductoXUbicaciones', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-listarStockProductoXUbicaciones', err);
        })
    });
  }

  validarUATransfSubAlmacen(strIdTx, strUA, strLote, intIdSubAlmacen, intIdUbicacion, intItem) {
    let parameter = {
      'strIdTx': strIdTx,
      'strUA': strUA,
      'strLote': strLote,
      'intIdSubAlmacen': intIdSubAlmacen,
      'intIdUbicacion': intIdUbicacion,
      'intItem': intItem
    };

    return new Promise((result) => {
      this.http.get(this.sGlobal.pickingService + 'ValidarUATransfSubAlmacen', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-ValidarUATransfSubAlmacen', err);
        })
    });
  }

  pickingUASubAlmacen(strUA, strIdTx, intIdProducto, strLote, decCantidad, bolAnular, intIdRF, intItem, intIdAlmacen, intIdSubAlmacen, strUser) {
    let parameter = {
      'strUA': strUA,
      'strIdTx': strIdTx,
      'intIdProducto': intIdProducto,
      'strLote': strLote,
      'decCantidad': decCantidad,
      'bolAnular': bolAnular,
      'intIdRF': intIdRF,
      'intItem': intItem,
      'intIdAlmacen': intIdAlmacen,
      'intIdSubAlmacen': intIdSubAlmacen,
      'strUser': strUser
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.pickingService + 'PickingUASubAlmacen/strUA/strIdTx/intIdProducto/strLote/decCantidad/bolAnular/intIdRF/intItem/intIdAlmacen/intIdSubAlmacen/strUser', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-PickingUASubAlmacen', err);
        })
    });
  }

  listarUAsTransferidasXSubAlmacen(strIdTx, intId_Producto, strLote, intId_Ubicacion) {
    let parameter = {
      'strIdTx': strIdTx,
      'intId_Producto': intId_Producto,
      'strLote': strLote,
      'intId_Ubicacion': intId_Ubicacion
    };

    return new Promise((result) => {
      this.http.get(this.sGlobal.pickingService + 'ListarUAsTransferidasXSubAlmacen', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-listarUAsTransferidasXSubAlmacen', err);
        })
    });
  }

  reubicarUAsXSubAlmacen(strIdTx, intIdProducto, strLote, intIdUbicacionOrigen, intIdUbicacionDestino, intIdAlmacen, intIdSubAlmacen, strUser) {
    let parameter = {
      'strIdTx': strIdTx,
      'intIdProducto': intIdProducto,
      'strLote': strLote,
      'intIdUbicacionOrigen': intIdUbicacionOrigen,
      'intIdUbicacionDestino': intIdUbicacionDestino,
      'intIdAlmacen': intIdAlmacen,
      'intIdSubAlmacen': intIdSubAlmacen,
      'strUser': strUser
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.pickingService + 'ReubicarUAsXSubAlmacen/strIdTx/intIdProducto/strLote/intIdUbicacionOrigen/intIdUbicacionDestino/intIdAlmacen/intIdSubAlmacen/strUser', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-reubicarUAsXSubAlmacen', err);
        })
    });
  }

  cerrarTransferenciaXSubAlmacen(strIdTx, strUser) {

    let parameter = {
      'strIdTx': strIdTx,
      'strUser': strUser
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.pickingService + 'CerrarTransferenciaXSubAlmacen/strIdTx/strUser)', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E - cerrarTransferenciaXSubAlmacen', err);
        })
    });
  }

  RegistrarSolicitudPicking(strIdTx, intItem, intIdProducto, intIdSubAlmacen, decCantidad, intIdAlmacen, strUsuario) {
    console.log("entra 2");
    let parameter = {
      'strIdTx': strIdTx,
      'intItem': intItem,
      'intIdProducto': intIdProducto,
      'intIdSubAlmacen': intIdSubAlmacen,
      'decCantidad': decCantidad,
      'intIdAlmacen': intIdAlmacen,
      'strUsuario': strUsuario      
    };

    console.log("parametros " + JSON.stringify(parameter));

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.pickingService + 'RegistrarSolicitudPicking/strIdTx/intItem/intIdProducto/intIdSubAlmacen/decCantidad/intIdAlmacen/strUsuario', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-RegistrarSolicitudPicking', err);
        })
    });
  }

  ValidarSerie(Id_Producto) {
    var parameter: any;
    parameter = { "id_producto": Id_Producto };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.pickingService + 'ValidarSerie', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ValidarSerie', err);
        })
    });
  }


}
