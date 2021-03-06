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
import { PickingPage } from '../pages/picking/picking';
import { RutaPickingPage } from '../pages/picking/ruta-picking/ruta-picking';
import { DetallePickingPage } from '../pages/picking/detalle-picking/detalle-picking';
import { CierrePickingPage } from '../pages/picking/cierre-picking/cierre-picking';
import { PickingPorProductoPage } from '../pages/picking/picking-por-producto/picking-por-producto';
import { DetallePorProductoPage } from '../pages/picking/detalle-por-producto/detalle-por-producto';
import { ReabastecimientoPage } from '../pages/picking/reabastecimiento/reabastecimiento';
import { DespachoPage} from '../pages/despacho/despacho';
import { EmbalajePage} from '../pages/embalaje/embalaje';
import { ReciboPage_05Page } from '../pages/recibo/recibo-page-05/recibo-page-05';
import { TransferPage_06Page } from '../pages/transferencia/transfer-page-06/transfer-page-06';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { TransferPage_01Page } from '../pages/transferencia/transfer-page-01/transfer-page-01';
import { EtiquetadoPage_01Page } from '../pages/etiquetado/etiquetado-page-01/etiquetado-page-01';
import { EtiquetadoPage_02Page } from '../pages/etiquetado/etiquetado-page-02/etiquetado-page-02';
import { EtiquetadoPage_03Page } from '../pages/etiquetado/etiquetado-page-03/etiquetado-page-03';
import { InventarioPage_01Page } from '../pages/inventario/inventario-page-01/inventario-page-01'; //Loque#369Dev
import { InventarioPage_02Page } from '../pages/inventario/inventario-page-02/inventario-page-02'; //Loque#369Dev
import { InventarioPage_03Page } from '../pages/inventario/inventario-page-03/inventario-page-03'; //Loque#369Dev
import { InventarioPage_04Page } from '../pages/inventario/inventario-page-04/inventario-page-04'; //Loque#369Dev
import { InventarioPage_05Page } from '../pages/inventario/inventario-page-05/inventario-page-05'; //Loque#369Dev
import { InventarioPage_06Page } from '../pages/inventario/inventario-page-06/inventario-page-06'; //Loque#369Dev

import { EmbarquePage_01Page } from '../pages/despacho/embarque/embarque-page-01/embarque-page-01'; //Loque#369Dev
import { EmbarquePage_02Page } from '../pages/despacho/embarque/embarque-page-02/embarque-page-02'; //Loque#369Dev
import { EmbarquePage_03Page } from '../pages/despacho/embarque/embarque-page-03/embarque-page-03'; //Loque#369Dev
import { EmbarquePage_04Page } from '../pages/despacho/embarque/embarque-page-04/embarque-page-04'; //Loque#369Dev
import { EmbarquePage_05Page } from '../pages/despacho/embarque/embarque-page-05/embarque-page-05'; //Loque#369Dev
import { ReciboBultoPage_01Page } from '../pages/despacho/recibo/recibo-bulto-page-01/recibo-bulto-page-01'; //Loque#369Dev
import { File } from '@ionic-native/file';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
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
