import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';
import 'rxjs/add/operator/map';

//Arturo
@Injectable()
export class AuthService {
  headers = new Headers();

  constructor(public http : Http, public sGlobal: GlobalServiceProvider) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getUsers(credenciales){
    return new Promise(resolve=>{
       this.http.get(this.sGlobal.usuario + 'ValidarUsuario',{ params: credenciales})
       .map(res=>res.json())
       .subscribe(data=>{
         resolve(data);
        },err=>{
         console.log(err);
       });
    });

  }

  getCedis(userInfo){

    return new Promise(resolve=>{
    
      this.http.get(this.sGlobal.usuario + 'ListarCentrosXUsuario',{ params: userInfo})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
       },err=>{
        console.log(err);
      });
   });
  }

  getWarehouse(parametros){
    return new Promise(resolve=>{
    
      this.http.get(this.sGlobal.usuario + 'ListarAlmacenesXUsuario',{ params: parametros})
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
       },err=>{
        console.log(err);
      });
   });

  }

  postData(data) {
    return new Promise((resolve, reject) => {
      // let headers = new Headers();
      // headers.append('Content-Type', 'application/json');

      this.http.post(this.sGlobal.usuario + 'ValidarUsuarioAndroid', JSON.stringify(data), {headers:this.headers})
        .map(res=>res.json())
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
  });
  }
}