import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ReciboPage } from '../pages/recibo/recibo';
import { AlmacenajePage } from '../pages/almacenaje/almacenaje';
import { ReciboPage_03Page } from '../pages/recibo/recibo-page-03/recibo-page-03';
import { ReciboPage_04Page } from '../pages/recibo/recibo-page-04/recibo-page-04';
import { ImpresoraPage } from '../pages/impresora/impresora';
import { IncidenciaPage } from '../pages/incidencia/incidencia';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IncidenciaPage;//ReciboPage;
  userProfile={"Almacen":"","ApeNom":"","Cliente":"","Correo":"","FlagActivo":false,"FlagPermiso":false,"FlagRestablecer":false,"Foto":null,"Id_Almacen":"","Id_Cliente":null,"Id_Perfil":"","Perfil":"","Usuario":""};
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
