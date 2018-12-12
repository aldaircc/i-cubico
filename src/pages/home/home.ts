import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WarehouseSelectPage } from '../warehouse-select/warehouse-select';
//import {AuthService} from '../../services/loginservice/auth.service';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  responseData : any;
  userData = {"Usuario": "admin","Clave": "cipsa2018", "idterminal": "1"};
  
  constructor(public navCtrl: NavController,public auth:AuthService) {
  }

iniciarSesion(){
  this.auth.getUsers(this.userData).then((result) => {
    this.responseData = result;
    //console.log (this.responseData);
    //console.log (this.responseData.length);

    if(this.responseData.length>0){
        localStorage.setItem('vUserData', JSON.stringify(this.responseData));
        this.navCtrl.push(WarehouseSelectPage);
   }
   else{
        alert("Usuario o contraseña incorrecta"); 
        //console.log("ser already exists");
       }
  }, (err) => {
      console.log(err);
    // Error log
  });
 
}

  goWarehouseSelect():void{
    this.navCtrl.push(WarehouseSelectPage);

  }
}
