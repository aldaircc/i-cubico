import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WarehouseSelectPage } from '../pages/warehouse-select/warehouse-select';
import { WarehouseSelectPageModule } from '../pages/warehouse-select/warehouse-select.module';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { MainMenuPageModule } from '../pages/main-menu/main-menu.module';
//import { AuthService } from '../services/loginservice/auth.service';
import { AuthService } from '../providers/auth-service/auth-service';
import { ReciboPage } from '../pages/recibo/recibo';
import { ReciboPage_02Page } from '../pages/recibo/recibo-page-02/recibo-page-02';
import { ReciboPage_03Page } from '../pages/recibo/recibo-page-03/recibo-page-03';
import { ReciboPage_04Page } from '../pages/recibo/recibo-page-04/recibo-page-04';
import { ImpresoraPage } from '../pages/impresora/impresora';
import { AlmacenajePage } from '../pages/almacenaje/almacenaje';
import { ReciboServiceProvider } from '../providers/recibo-service/recibo-service';
import { MomentjsPipe } from '../pipes/momentjs/momentjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ImpresoraServiceProvider } from '../providers/impresora-service/impresora-service';
import { IncidenciaPage } from '../pages/incidencia/incidencia';
import { IncidenciaServiceProvider } from '../providers/incidencia-service/incidencia-service';
import { PickingPage } from '../pages/picking/picking';
import { RutaPickingPage } from '../pages/picking/ruta-picking/ruta-picking';
import { DetallePickingPage } from '../pages/picking/detalle-picking/detalle-picking';
import { CierrePickingPage } from '../pages/picking/cierre-picking/cierre-picking';
import { PickingPorProductoPage } from '../pages/picking/picking-por-producto/picking-por-producto';
import { DetallePorProductoPage } from '../pages/picking/detalle-por-producto/detalle-por-producto';
import { ReabastecimientoPage } from '../pages/picking/reabastecimiento/reabastecimiento';
import { PopoverPickingPage } from '../pages/picking/popover/popover-picking/popover-picking'
import { PopoverRutaPickingPage } from '../pages/picking/popover/popover-ruta-picking/popover-ruta-picking'





import { DespachoPage} from '../pages/despacho/despacho';
import { EmbalajePage} from '../pages/embalaje/embalaje';
import { InventarioPage} from '../pages/inventario/inventario'
import { PickingServiceProvider } from '../providers/picking-service/picking-service';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WarehouseSelectPage,
    MainMenuPage,
    ReciboPage,
    ReciboPage_02Page,
    ReciboPage_03Page,
    ReciboPage_04Page,
    AlmacenajePage,
    ImpresoraPage,
    IncidenciaPage,
    PickingPage,
    RutaPickingPage,
    DetallePickingPage,
    CierrePickingPage,
    PickingPorProductoPage,
    DetallePorProductoPage,
    ReabastecimientoPage,
    PopoverPickingPage,
    PopoverRutaPickingPage,
    DespachoPage,
    EmbalajePage,
    InventarioPage,
    MomentjsPipe //Pipe to give format to dates.
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp),
    WarehouseSelectPageModule,
    MainMenuPageModule,
    NgxDatatableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WarehouseSelectPage,
    MainMenuPage,
    ReciboPage,
    ReciboPage_02Page,
    ReciboPage_03Page,
    ReciboPage_04Page,
    AlmacenajePage,
    ImpresoraPage,
    IncidenciaPage,
    PickingPage,
    RutaPickingPage,
    DetallePickingPage,
    CierrePickingPage,
    PickingPorProductoPage,
    DetallePorProductoPage,
    ReabastecimientoPage,
    PopoverPickingPage,
    PopoverRutaPickingPage,
    DespachoPage,
    EmbalajePage,
    InventarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ReciboServiceProvider,
    ImpresoraServiceProvider,
    IncidenciaServiceProvider,
    PickingServiceProvider
  ]
})
export class AppModule {}
