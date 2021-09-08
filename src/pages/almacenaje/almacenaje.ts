import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar,NavParams, IonicPage, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TransitoPage } from '../almacenaje/transito/transito'
import { ReubicacionPage } from '../almacenaje/reubicacion/reubicacion'
import { ReabastecimientoAlmacenajePage } from '../almacenaje/reabastecimiento-almacenaje/reabastecimiento-almacenaje'
import { ConsultarUbicacionPage } from '../almacenaje/consultar-ubicacion/consultar-ubicacion'
import { MenuConsultarPage } from '../almacenaje/menu-consultar/menu-consultar'
import { SolicitudReabastecimientoPage } from '../almacenaje/solicitud-reabastecimiento/solicitud-reabastecimiento'
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { MainMenuPage } from '../main-menu/main-menu';

@IonicPage()
@Component({
    selector: 'page-almacenaje',
    templateUrl: 'almacenaje.html',
})

export class AlmacenajePage {
    @ViewChild(Navbar) navBar: Navbar;
    userProfile: any;

    constructor(public navCtrl: NavController,  public navParams: NavParams, public auth: AuthService, public toastCtrl: ToastController,
        public sGlobal: GlobalServiceProvider) {
            this.userProfile = this.navParams.data;
    }

    goTransitoPage() {
        this.navCtrl.push(TransitoPage,this.userProfile);
    }

    goReubicacionPage() {
        this.navCtrl.push(ReubicacionPage);
    }

    goReabastecimientoPage() {
        this.navCtrl.push(ReabastecimientoAlmacenajePage,this.userProfile);
    }

    goConsultarUbicacionPage() {
        this.navCtrl.push(ConsultarUbicacionPage);
    }

    goMenuConsultarPage() {
        this.navCtrl.push(MenuConsultarPage);
    }

    // goSolicitudReabastecimientoPage() {
    //     this.navCtrl.push(SolicitudReabastecimientoPage);
    // }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PickingPage');
    }

    confirmacionBack(): void {
        this.navCtrl.push(MainMenuPage,this.userProfile);    
    }
}