import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar, IonicPage, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TransitoPage } from '../almacenaje/transito/transito'
import { ReubicacionPage } from '../almacenaje/reubicacion/reubicacion'
import { ReabastecimientoAlmacenajePage } from '../almacenaje/reabastecimiento-almacenaje/reabastecimiento-almacenaje'
import { ConsultarUbicacionPage } from '../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MenuConsultarPage } from '../almacenaje/menu-consultar/menu-consultar'
import { MainMenuPage } from '../main-menu/main-menu'
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@IonicPage()
@Component({
    selector: 'page-almacenaje',
    templateUrl: 'almacenaje.html',
})

export class AlmacenajePage {
    @ViewChild(Navbar) navBar: Navbar;

    //userProfile={"Almacen":"","ApeNom":"","page":"1"};

    constructor(public navCtrl: NavController, public auth: AuthService, public toastCtrl: ToastController,
        public sGlobal: GlobalServiceProvider) {
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
        // this.navBar.backButtonClick = (e: UIEvent) => {
        //     this.userProfile.Almacen = this.sGlobal.nombreAlmacen;
        //     this.userProfile.ApeNom = this.sGlobal.apeNom;
        //     this.navCtrl.push(MainMenuPage, this.userProfile);
        //     //this.navCtrl.push(MainMenuPage);
        // }
        console.log('ionViewDidLoad PickingPage');
    }
}