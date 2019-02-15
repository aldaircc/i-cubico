import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
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

  ListarDespachoXUsuario(strUsuario, intIdAlmacen){
    var parameter : any;
    parameter = {"strUsuario": strUsuario,"intIdAlmacen": intIdAlmacen};

    return new Promise(resolve=>{ 
      this.http.get(this.sGlobal.despacho + 'ListarDespachoXUsuario', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error ListarDespachoXUsuario', err);
      })
    });
  }

  ListarDespachoDetalle(strId_Tx){
    var parameter : any;
    parameter = {"strIdTx": strId_Tx};

    return new Promise(resolve=>{ 
      this.http.get(this.sGlobal.despacho + 'ListarDespachoDetalle', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error ListarDespachoDetalle', err);
      })
    });
  }

  ListarBultosDespacho(strId_Tx){
    var parameter : any;
    parameter = {"strIdTx": strId_Tx};
    return new Promise(resolve=>{ 
      this.http.get(this.sGlobal.despacho + 'ListarBultosDespacho', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error ListarBultosDespacho', err);
      })
    });
  }

  ListarDetalleBultoXBulto(strId_Tx, intNroBulto){
    var parameter : any;
    parameter = {"strIdTx": strId_Tx,"intNroBulto": intNroBulto };
    return new Promise(resolve=>{ 
      this.http.get(this.sGlobal.despacho + 'ListarDetalleBultoXBulto', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error ListarDetalleBultoXBulto', err);
      })
    });
  }

  ListarBultosDespachoDetalle(strId_Tx){
    var parameter : any;
    parameter = {"strIdTx": strId_Tx};
    return new Promise(resolve=>{ 
      this.http.get(this.sGlobal.despacho + 'ListarBultosDespachoDetalle', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error ListarBultosDespachoDetalle', err);
      })
    });
  }
  
  RegistrarProductoBulto(entidadEmbalaje){    
    var parameter : any;
    parameter = {"entidad": entidadEmbalaje};   
    return new Promise((resolve, reject)=>{
      this.http.post(this.sGlobal.despacho + 'RegistrarProductoBulto/entidad', JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
        console.log('RegistrarProductoBulto', data);
      },err=>{
        console.log('Error RegistrarProductoBulto', err);
      })
    });
  }

  RegistrarPesoBulto(entidadEmbalaje){
    var parameter : any;
    parameter = {"entidad": entidadEmbalaje};   
    return new Promise((resolve, reject)=>{
      this.http.post(this.sGlobal.despacho + 'RegistrarPesoBulto/entidad', JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        console.log('RegistrarPesoBulto', data);
      },err=>{
        console.log('Error RegistrarPesoBulto', err);
      })
    });
  }

  ListarBalanzasXAlmacen(intId_almacen){
    var parameter : any;
    parameter = {"intId_almacen": intId_almacen};
    return new Promise(resolve=>{ 
      this.http.get(this.sGlobal.picking + 'ListarBalanzasXAlmacen', { params: parameter})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },err=>{
        console.log('Error ListarBultosDespachoDetalle', err);
      })
    });
  }

  CerrarDespacho(idTx, idEstado, usuario, IdAlmacen){
    var parameter : any;
    parameter = {"idTx": idTx,"idEstado":idEstado,"usuario":usuario,"IdAlmacen":IdAlmacen};   
    return new Promise((resolve, reject)=>{
      this.http.post(this.sGlobal.despacho + 'CerrarDespacho/idTx/idEstado/usuario/IdAlmacen', JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        console.log('Cerrar despacho', data);
      },err=>{
        console.log('Error Cerrar despacho', err);
      })
    });
  }

}