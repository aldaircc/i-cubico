import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WarehouseSelectPage } from '../warehouse-select/warehouse-select';
//import {AuthService} from '../../services/loginservice/auth.service';
import { AuthService } from '../../providers/auth-service/auth-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ConfigurarPage } from '../configurar/configurar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  responseData : any;
  userData = {"Usuario": "admin","Clave": "cipsa2018", "idterminal": "1"};
  
  constructor(public navCtrl: NavController,public auth:AuthService, public sGlobal: GlobalServiceProvider) { }

  iniciarSesion(){
    this.auth.getUsers(this.userData).then((result) => {
      this.responseData = result;
      if(this.responseData.length>0){
          this.sGlobal.vUserData = result;
          this.sGlobal.userName = result[0].Usuario;
          this.sGlobal.apeNom = result[0].ApeNom;
          this.navCtrl.push(WarehouseSelectPage);
    }
    else{
          alert("Usuario o contraseña incorrecta"); 
        }
    }, (err) => {
        console.log(err);
    });
  
  }

  configurar(){
    this.navCtrl.push(ConfigurarPage);
  }

  goWarehouseSelect():void{
    this.navCtrl.push(WarehouseSelectPage);
  }
}
