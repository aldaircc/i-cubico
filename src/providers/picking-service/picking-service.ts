import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';

/*
  Generated class for the PickingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PickingServiceProvider {

  apiUrl = 'http://172.16.32.15:8085/SGAA_WCF/PickingService.svc/rest/';
  headers = new Headers();

  constructor(public http: Http, public sGlobal: GlobalServiceProvider) {
    console.log('Hello PickingServiceProvider Provider');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getOrdenesXUsuario(strUsuario, intIdAlmacen){
    var parameter : any;
    parameter = {"strUsuario": strUsuario,"intIdAlmacen": intIdAlmacen};

    return new Promise(resolve=>{
      this.http.get(this.sGlobal.pickingService + 'ListarPickingXUsuarioV2', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error getOrdenesXUsuario', err);
      })
    });
  }

  getDataRutaPicking(strNroDoc, strUsuario, intIdAlmacen){
    var parameter : any;
    parameter = {"strNroDoc": strNroDoc, "strUsuario": strUsuario, "intIdAlmacen": intIdAlmacen};

    return new Promise(resolve=>{
      this.http.get(this.sGlobal.pickingService + 'RutaPickingXTxXModelo', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error getDataRutaPicking', err);
      })
    });
  }


  getDetallePicking(strNroDoc, strUsuario, intIdAlmacen){
    var parameter : any;
    parameter = {"strNroDoc": strNroDoc, "strUsuario": strUsuario,"intIdAlmacen": intIdAlmacen};

    return new Promise(resolve=>{
      this.http.get(this.sGlobal.pickingService + 'RutaPickingXTxXModelo', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error getOrdenesXUsuario', err);
      })
    });
  }

  getPickingProducto(strNroDoc, strUsuario, intIdAlmacen){
    var parameter : any;
    parameter = {"strNroDoc": strNroDoc, "strUsuario": strUsuario, "intIdAlmacen": intIdAlmacen};

    return new Promise(resolve=>{
      this.http.get(this.sGlobal.pickingService + 'RutaPickingXTxXModelo', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error getPickingProducto', err);
      })
    });
  }

  getMuelleXAlmacen(intIdAlmacen, strCodigoBarra){
    var parameter : any;
    parameter = {"intIdAlmacen": intIdAlmacen, "strCodigoBarra": strCodigoBarra};

    return new Promise(resolve=>{
      this.http.get(this.sGlobal.pickingService + 'ListarNombreMuelleXAlmacen', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error getMuelleXAlmacen', err);
      })
    });
  }

  CerrarPicking(idTx, idEstado, usuario, idMuelle, IdAlmacen){
    var parameter = {
      "idTx": idTx, "idEstado": idEstado, "usuario": usuario, "idMuelle": idMuelle, "IdAlmacen": IdAlmacen
    };
    return new Promise((result, reject)=>{
      this.http.post(this.sGlobal.pickingService + 'CerrarPicking/idTx/idEstado/usuario/idMuelle/IdAlmacen', JSON.stringify(parameter), { headers : this.headers })
      .map(res => res.json())
      .subscribe(data=>{
        result(data);
      },err =>{
        console.log('Error CerrarPicking', err);
      })
    });
  }

  getValidarUAPicking(strIdTx, UA, IdProducto, Item, lote, IdUbicacion){
    var parameter : any;
    parameter = {"strIdTx": strIdTx, "UA": UA, "IdProducto": IdProducto, "Item": Item, "lote": lote, "IdUbicacion": IdUbicacion};
    return new Promise(resolve=>{
      this.http.get(this.sGlobal.pickingService + 'ValidarUAPicking', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error getValidarUAPicking', err);
      })
    });
  }

  

  

}
