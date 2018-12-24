import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  apiUrl = '';
  constructor(public http : Http) {
    //Loque#369Dev
  }

  getUsers(credenciales){
    return new Promise(resolve=>{
       this.http.get(this.apiUrl + 'ValidarUsuario',{ params: credenciales})
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
    
      this.http.get(this.apiUrl + 'ListarCentrosXUsuario',{ params: userInfo})
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
    
      this.http.get(this.apiUrl + 'ListarAlmacenesXUsuario',{ params: parametros})
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
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.apiUrl+ 'ValidarUsuarioAndroid', JSON.stringify(data), {headers:headers})
        .map(res=>res.json())
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
  });
  }
}