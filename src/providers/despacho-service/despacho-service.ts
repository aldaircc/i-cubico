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

  listarPlanificacionXUsuario(strUsuario, intIdAlmacen) {
    var parameter = {
      'strUsuario': strUsuario,
      'intIdAlmacen': intIdAlmacen
    };

    return new Promise(result => {
      this.http.get(this.sGlobal.despachoService + 'ListarPlanificacionXUsuario', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-ListarPlanificacionXUsuario', err);
        })
    });
  }

  listarSubBultosLeidos(strTransaccion, tipo) {
    var parameter = {
      'strTransaccion': strTransaccion,
      'tipo': tipo
    };

    return new Promise(result => {
      this.http.get(this.sGlobal.despachoService + 'ListarSubBultosLeidos', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-ListarSubBultosLeidos', err);
        })
    });
  }

  listarDetalleXTransporte(strIdTransporte) {
    var parameter = {
      'strIdTransporte': strIdTransporte
    };

    return new Promise(result => {
      this.http.get(this.sGlobal.despachoService + 'ListarDetalleXTransporte', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-listarDetalleXTransporte', err);
        })
    });
  }

  cargaBultoTransporte(strBulto, strIdTran, intIdAlmacen, strUser) {
    var parameter = {
      'strBulto': strBulto,
      'strIdTran': strIdTran,
      'intIdAlmacen': intIdAlmacen,
      'strUser': strUser
    };

    return new Promise(result => {
      this.http.get(this.sGlobal.despachoService + 'CargaBultoTransporte', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-CargaBultoTransporte', err);
        })
    });
  }

  eliminarBultoEmbarque(strBulto, strIdTran, intIdAlmacen, strUser) {
    let parameter = {
      'strBulto': strBulto,
      'strIdTran': strIdTran,
      'intIdAlmacen': intIdAlmacen,
      'strUser': strUser
    };

    return new Promise((result, reject) => {
      this.http.post(this.sGlobal.despachoService + 'EliminarBultoEmbarque/strBulto/strIdTran/intIdAlmacen/strUser', JSON.stringify(parameter), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-eliminarBultoEmbarque', err);
        });
    });
  }

  cerrarEmbarque(strIdTran, intIdEstado, strUser) {
    let parameter = {
      'strIdTran': strIdTran,
      'intIdEstado': intIdEstado,
      'strUser': strUser
    };

    return new Promise(result => {
      this.http.get(this.sGlobal.despachoService + 'CerrarEmbarque', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-cerrarEmbarque', err);
        })
    });
  }

  listarBultosXCargarTransporte(strIdTransporte) {
    let parameter = {
      'strIdTransporte': strIdTransporte
    };

    return new Promise(result => {
      this.http.get(this.sGlobal.despachoService + 'ListarBultosXCargarTransporte', { params: parameter })
        .map(res => res.json())
        .subscribe(data => {
          result(data);
        }, err => {
          console.log('E-listarBultosXCargarTransporte', err);
        })
    });
  }
}
