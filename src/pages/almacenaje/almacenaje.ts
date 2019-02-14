import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar, IonicPage, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TransitoPage } from '../almacenaje/transito/transito'
import { ReubicacionPage } from '../almacenaje/reubicacion/reubicacion'
import { ReabastecimientoAlmacenajePage } from '../almacenaje/reabastecimiento-almacenaje/reabastecimiento-almacenaje'
import { ConsultarUbicacionPage } from '../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MenuConsultarPage } from '../almacenaje/menu-consultar/menu-consultar'
import {MainMenuPage} from '../main-menu/main-menu'

@IonicPage()
@Component({
    selector: 'page-almacenaje',
    templateUrl: 'almacenaje.html',
})

export class AlmacenajePage {

    @ViewChild(Navbar) navBar: Navbar; 

    constructor(public navCtrl: NavController, public auth: AuthService, public toastCtrl: ToastController) {
        debugger;
    }

    goTransitoPage() {
        this.navCtrl.push(TransitoPage);
    }

    goReubicacionPage() {
        this.navCtrl.push(ReubicacionPage);
    }

    goReabastecimientoPage() {
        this.navCtrl.push(ReabastecimientoAlmacenajePage);
    }

    goConsultarUbicacionPage() {
        this.navCtrl.push(ConsultarUbicacionPage);
    }

    goMenuConsultarPage() {
        this.navCtrl.push(MenuConsultarPage);
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = (e:UIEvent)=>{
          this.navCtrl.push(MainMenuPage);       
         }
        console.log('ionViewDidLoad PickingPage');
      }
}