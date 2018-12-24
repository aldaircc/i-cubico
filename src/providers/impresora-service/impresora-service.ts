import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ImpresoraServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImpresoraServiceProvider {

  apiUrl = 'http://172.16.32.15:8085/SGAA_WCF/UsuarioService.svc/rest/';
  
  constructor(public http: Http) {
    console.log('Hello ImpresoraServiceProvider Provider');
  }

  listarAccesosImpresoraXUsuario(usuario){
    var parameter = {'strUsuario' : usuario };
    return new Promise((resolve)=>{
      this.http.get(this.apiUrl+'ListarAccesosImpresoraXUsuario', {params: parameter})
      .map(res => res.json())
      .subscribe(data=>{
        resolve(data);
      },err =>{
        console.log('Error - listarAccesosImpresoraXUsuario', err);
      });
    });
  }
}
