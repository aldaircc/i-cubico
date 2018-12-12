import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
    selector: 'page-almacenaje',
    templateUrl: 'almacenaje.html',
})

export class AlmacenajePage{

    constructor(public navCtrl: NavController, public auth:AuthService, public toastCtrl: ToastController){
        debugger;
        this.presentToast();
    }

    presentToast(){
      const toast = this.toastCtrl.create({
        message: 'Just do it',
        duration: 2000
      });
      toast.present();
    }

}