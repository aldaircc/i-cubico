import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';

/*
  Generated class for the EmbalajeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmbalajeServiceProvider {
  headers = new Headers();

  constructor(public http: Http, public sGlobal: GlobalServiceProvider) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  ListarDespachoXUsuario(strUsuario, intIdAlmacen) {
    var parameter: any;
    parameter = { "strUsuario": strUsuario, "intIdAlmacen": intIdAlmacen };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ListarDespachoXUsuario', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ListarDespachoXUsuario', err);
        })
    });
  }

  ListarTransaccionDetEmbalaje(strId_Tx, intItem) {
    var parameter: any;
    parameter = { "strId_Tx": strId_Tx, "intItem": intItem };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ListarTransaccionDetEmbalaje', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ListarTransaccionDetEmbalaje', err);
        })
    });
  }

  ListarDespachoDetalle(strId_Tx) {
    var parameter: any;
    parameter = { "strIdTx": strId_Tx };

    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ListarDespachoDetalle_V3', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error SGAA_SP_S_ListarDespachoDetalle_V3', err);
        })
    });
  }

  ListarBultosDespacho(strId_Tx) {
    var parameter: any;
    parameter = { "strIdTx": strId_Tx };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ListarBultosDespacho', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ListarBultosDespacho', err);
        })
    });
  }

  ListarDetalleBultoXBulto(strId_Tx, intNroBulto) {
    var parameter: any;
    parameter = { "strIdTx": strId_Tx, "intNroBulto": intNroBulto };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ListarDetalleBultoXBulto', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ListarDetalleBultoXBulto', err);
        })
    });
  }

  ListarBultosDespachoDetalle(strId_Tx) {
    var parameter: any;
    parameter = { "strIdTx": strId_Tx };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ListarBultosDespachoDetalle', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ListarBultosDespachoDetalle', err);
        })
    });
  }

  ListarDetalleXBulto(strIdTx, intNroBulto){

    var parameter: any;
    parameter = { "strIdTx": strIdTx, 'intNroBulto': intNroBulto};
    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ListarDetalleXBulto', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ListarDetalleXBulto', err);
        })
    });

  }  

  RegistrarProductoBulto(entidadEmbalaje) {
    var parameter: any;
    parameter = { "entidad": entidadEmbalaje };
    return new Promise((resolve, reject) => {
      this.http.post(this.sGlobal.despacho + 'RegistrarProductoBulto/entidad', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          console.log('RegistrarProductoBulto', data);
        }, err => {
          console.log('Error RegistrarProductoBulto', err);
        })
    });
  }

  RegistrarPesoBulto(entidadEmbalaje) {
    var parameter: any;
    parameter = { "entidad": entidadEmbalaje };
    return new Promise((resolve, reject) => {
      this.http.post(this.sGlobal.despacho + 'RegistrarPesoBulto_V2/entidad', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          console.log('RegistrarPesoBulto', data);
        }, err => {
          console.log('Error RegistrarPesoBulto', err);
        })
    });
  }

  ListarBalanzasXAlmacen(intId_almacen) {
    var parameter: any;
    parameter = { "intId_almacen": intId_almacen };
    return new Promise(resolve => {
      this.http.get(this.sGlobal.picking + 'ListarBalanzasXAlmacen', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ListarBultosDespachoDetalle', err);
        })
    });
  }

  CerrarDespacho(idTx, idEstado, usuario, IdAlmacen) {
    var parameter: any;
    parameter = { "idTx": idTx, "idEstado": idEstado, "usuario": usuario, "IdAlmacen": IdAlmacen };
    return new Promise((resolve, reject) => {
      this.http.post(this.sGlobal.despacho + 'CerrarDespacho/idTx/idEstado/usuario/IdAlmacen', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          console.log('Cerrar despacho', data);
        }, err => {
          console.log('Error Cerrar despacho', err);
        })
    });
  }

  ConsultarBulto(strCodigoBarraBulto) {
    var parameter: any;
    parameter = { "strCodigoBarraBulto": strCodigoBarraBulto};

    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ConsultarBulto', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ConsultarBarraBulto', err);
        })
    });
  }

  ListarDespachoXUsuarioOrden(strNumOrden, strUsuario,intIdAlmacen) {
    var parameter: any;
    parameter = { "strNumOrden": strNumOrden, "strUsuario": strUsuario ,"intIdAlmacen": intIdAlmacen};

    return new Promise(resolve => {
      this.http.get(this.sGlobal.despacho + 'ListarDespachoXUsuarioOrden', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ConsultarBarraBulto', err);
        })
    });
  }

  ListaCajaEmbalaje() {    
    return new Promise(resolve => {
      this.http.get(this.sGlobal.cajaEmbalajeService + 'ListaCajaEmbalaje')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log('Error ConsultarBarraBulto', err);
        })
    });
  }


}
