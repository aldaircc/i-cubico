import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { AuthService } from '../../providers/auth-service/auth-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';


/**
 * Generated class for the WarehouseSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-warehouse-select',
  templateUrl: 'warehouse-select.html',
})
export class WarehouseSelectPage {
  listCedis=[];
  listWarehouse=[];
  responseData : any;
  userDetails:any;
  userProfile={"Almacen":"","ApeNom":"","Cliente":"","Correo":"","FlagActivo":false,"FlagPermiso":false,"FlagRestablecer":false,"Foto":null,"Id_Almacen":"","Id_Cliente":null,"Id_Perfil":"","Perfil":"","Usuario":""};
  userInfo={"strUsuario":""};
  cedisInfo={"Centro":"","Id_Centro":""};
  wareHouseInfo={"Almacen":"","Cliente":null,"CorreoSupervisor":"","Id_Almacen":"","Id_Cliente":"","NombreSupervisor":""};
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthService,
    public sGlobal: GlobalServiceProvider) {
    debugger;
    //const data = JSON.parse(localStorage.getItem('vUserData'));
    this.userDetails = this.sGlobal.vUserData;
   // console.log(this.userDetails);
    this.userProfile.ApeNom=this.userDetails[0].ApeNom;
    this.userProfile.Correo=this.userDetails[0].Correo;
    this.userProfile.FlagActivo=this.userDetails[0].FlagActivo;
    this.userProfile.FlagPermiso=this.userDetails[0].FlagPermiso;
    this.userProfile.FlagRestablecer=this.userDetails[0].FlagRestablecer;
    this.userProfile.Id_Almacen=this.userDetails[0].Id_Almacen;
    this.userProfile.Usuario=this.userDetails[0].Usuario;
    this.userInfo.strUsuario=this.userProfile.Usuario;
    this.getCedis();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WarehouseSelectPage');
  }

  getCedis(){
    
    this.auth.getCedis(this.userInfo ).then((result) => {
      this.responseData = result;
     
      if(this.responseData.length>0){
          /* localStorage.setItem('vUserData', JSON.stringify(this.responseData));
          this.navCtrl.push(WarehouseSelectPage); */
          this.listCedis=this.responseData;
     }
     else{
         
         }
    }, (err) => {
        console.log(err);
      // Error log
    });
   
  }

  getWarehouse(){
    let wareInfo={"strUsuario": this.userProfile.Usuario,"intIdCentro":this.cedisInfo.Id_Centro};
    this.auth.getWarehouse(wareInfo).then((result) => {
      this.responseData = result;
     
      if(this.responseData.length>0){
          /* localStorage.setItem('vUserData', JSON.stringify(this.responseData));
          this.navCtrl.push(WarehouseSelectPage); */
          this.listWarehouse=this.responseData;
          
     }
     else{
         
         }
    }, (err) => {
        console.log(err);
    });
  }

  selectWareHouse(data){
    let wareBodega:any =data;
    this.userProfile.Id_Almacen=wareBodega.Id_Almacen;
    this.userProfile.Almacen=wareBodega.Almacen;
  }

  goBack():void{
    this.navCtrl.pop();
  }

  goNext():void{
    this.navCtrl.push(MainMenuPage, this.userProfile);
  }

  
 logout(){
      localStorage.clear();
      setTimeout(() => this.goBack(), 1000);
 }
}
