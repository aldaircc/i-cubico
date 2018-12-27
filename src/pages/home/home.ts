import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WarehouseSelectPage } from '../warehouse-select/warehouse-select';
//import {AuthService} from '../../services/loginservice/auth.service';
import { AuthService } from '../../providers/auth-service/auth-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  responseData : any;
  userData = {"Usuario": "acosetito","Clave": "123456", "idterminal": "1"};
  
  constructor(public navCtrl: NavController,public auth:AuthService, public sGlobal: GlobalServiceProvider) {
    
  }

iniciarSesion(){
  this.auth.getUsers(this.userData).then((result) => {
    this.responseData = result;
    if(this.responseData.length>0){
        //localStorage.setItem('vUserData', JSON.stringify(this.responseData));
        this.sGlobal.vUserData = result;
        this.navCtrl.push(WarehouseSelectPage);
   }
   else{
        alert("Usuario o contraseña incorrecta"); 
       }
  }, (err) => {
      console.log(err);
  });
 
}

  goWarehouseSelect():void{
    this.navCtrl.push(WarehouseSelectPage);
  }
}
