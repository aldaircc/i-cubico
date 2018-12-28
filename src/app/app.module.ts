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
import { AuthService } from '../providers/auth-service/auth-service';
import { PickingPage } from '../pages/picking/picking';
import { RutaPickingPage } from '../pages/picking/ruta-picking/ruta-picking';
import { DetallePickingPage } from '../pages/picking/detalle-picking/detalle-picking';
import { CierrePickingPage } from '../pages/picking/cierre-picking/cierre-picking';
import { PickingPorProductoPage } from '../pages/picking/picking-por-producto/picking-por-producto';
import { DetallePorProductoPage } from '../pages/picking/detalle-por-producto/detalle-por-producto';
import { ReabastecimientoPage } from '../pages/picking/reabastecimiento/reabastecimiento';
import { PopoverPickingPage } from '../pages/picking/popover/popover-picking/popover-picking'
import { PopoverRutaPickingPage } from '../pages/picking/popover/popover-ruta-picking/popover-ruta-picking'
import { ReciboServiceProvider } from '../providers/recibo-service/recibo-service'; //Loque#369Dev
import { ReciboPage } from '../pages/recibo/recibo'; //Loque#369Dev
import { ReciboPage_02Page } from '../pages/recibo/recibo-page-02/recibo-page-02'; //Loque#369Dev
import { ReciboPage_03Page } from '../pages/recibo/recibo-page-03/recibo-page-03'; //Loque#369Dev
import { ReciboPage_04Page } from '../pages/recibo/recibo-page-04/recibo-page-04'; //Loque#369Dev
import { ReciboPage_05Page } from '../pages/recibo/recibo-page-05/recibo-page-05';  //Loque#369Dev
import { ImpresoraServiceProvider } from '../providers/impresora-service/impresora-service'; //Loque#369Dev
import { ImpresoraPage } from '../pages/impresora/impresora'; //Loque#369Dev
import { AlmacenajePage } from '../pages/almacenaje/almacenaje'; //Loque#369Dev
import { MomentjsPipe } from '../pipes/momentjs/momentjs'; //Loque#369Dev
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; //Loque#369Dev
import { IncidenciaServiceProvider } from '../providers/incidencia-service/incidencia-service'; //Loque#369Dev
import { IncidenciaPage } from '../pages/incidencia/incidencia'; //Loque#369Dev
import { EtiquetaCajaLpnPage } from '../pages/etiqueta-caja-lpn/etiqueta-caja-lpn'; //Loque#369Dev
import { PopoverReciboComponent } from '../components/popover-recibo/popover-recibo'; //Loque#369Dev
import { EtqCajaServiceProvider } from '../providers/etq-caja-service/etq-caja-service'; //Loque#369Dev
import { GlobalServiceProvider } from '../providers/global-service/global-service'; //Loque#369Dev
import { TransferPage_01Page } from '../pages/transferencia/transfer-page-01/transfer-page-01'; //Loque#369Dev
import { TransferPage_02Page } from '../pages/transferencia/transfer-page-02/transfer-page-02'; //Loque#369Dev
import { TransferPage_03Page } from '../pages/transferencia/transfer-page-03/transfer-page-03'; //Loque#369Dev
import { TransferPage_04Page } from '../pages/transferencia/transfer-page-04/transfer-page-04'; //Loque#369Dev
import { TransferPage_05Page } from '../pages/transferencia/transfer-page-05/transfer-page-05'; //Loque#369Dev
import { TransferPage_06Page } from '../pages/transferencia/transfer-page-06/transfer-page-06'; //Loque#369Dev
import { DespachoPage } from '../pages/despacho/despacho';
import { EmbalajePage } from '../pages/embalaje/embalaje';
import { InventarioPage } from '../pages/inventario/inventario';
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
    ReciboPage, //Loque#369Dev
    ReciboPage_02Page, //Loque#369Dev
    ReciboPage_03Page, //Loque#369Dev
    ReciboPage_04Page, //Loque#369Dev
    ReciboPage_05Page, //Loque#369Dev
	  TransferPage_01Page, //Loque#369Dev
    TransferPage_02Page, //Loque#369Dev
    TransferPage_03Page, //Loque#369Dev
    TransferPage_04Page, //Loque#369Dev
    TransferPage_05Page, //Loque#369Dev
    TransferPage_06Page, //Loque#369Dev
    AlmacenajePage, //Loque#369Dev
    ImpresoraPage, //Loque#369Dev
    IncidenciaPage, //Loque#369Dev
    EtiquetaCajaLpnPage, //Loque#369Dev
    PopoverReciboComponent, //Loque#369Dev
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
    MomentjsPipe //Loque#369Dev
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['ENE','FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC']
    }),  //Loque#369Dev
    WarehouseSelectPageModule,
    MainMenuPageModule,
    NgxDatatableModule //Loque#369Dev
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
    ReciboPage, //Loque#369Dev
    ReciboPage_02Page, //Loque#369Dev
    ReciboPage_03Page, //Loque#369Dev
    ReciboPage_04Page, //Loque#369Dev
    ReciboPage_05Page, //Loque#369Dev
    TransferPage_01Page, //Loque#369Dev
    TransferPage_02Page, //Loque#369Dev
    TransferPage_03Page, //Loque#369Dev
    TransferPage_04Page, //Loque#369Dev
    TransferPage_05Page, //Loque#369Dev
    TransferPage_06Page, //Loque#369Dev
    AlmacenajePage, //Loque#369Dev
    ImpresoraPage, //Loque#369Dev
    IncidenciaPage, //Loque#369Dev
    EtiquetaCajaLpnPage, //Loque#369Dev
    PopoverReciboComponent, //Loque#369Dev
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
    AuthService, //Loque#369Dev
    ReciboServiceProvider, //Loque#369Dev
    ImpresoraServiceProvider, //Loque#369Dev
    IncidenciaServiceProvider, //Loque#369Dev
    EtqCajaServiceProvider, //Loque#369Dev
    GlobalServiceProvider, //Loque#369Dev
    PickingServiceProvider
  ]
})
export class AppModule {}
