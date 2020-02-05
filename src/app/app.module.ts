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
import { PopoverPickingPage } from '../pages/picking/popover/popover-picking/popover-picking';
import { PopoverRutaPickingPage } from '../pages/picking/popover/popover-ruta-picking/popover-ruta-picking';
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
import { EtiquetadoPage_01Page } from '../pages/etiquetado/etiquetado-page-01/etiquetado-page-01'; //Loque#369Dev
import { EtiquetadoPage_02Page } from '../pages/etiquetado/etiquetado-page-02/etiquetado-page-02'; //Loque#369Dev
import { EtiquetadoPage_03Page } from '../pages/etiquetado/etiquetado-page-03/etiquetado-page-03'; //Loque#369Dev
import { EtiquetadoPage_04Page } from '../pages/etiquetado/etiquetado-page-04/etiquetado-page-04'; //Loque#369Dev
import { PopoverReciboComponent } from '../components/popover-recibo/popover-recibo'; //Loque#369Dev
import { EtiquetadoServiceProvider } from '../providers/etiquetado-service/etiquetado-service'; //Loque#369Dev
import { GlobalServiceProvider } from '../providers/global-service/global-service'; //Loque#369Dev
import { TransferPage_01Page } from '../pages/transferencia/transfer-page-01/transfer-page-01'; //Loque#369Dev
import { TransferPage_02Page } from '../pages/transferencia/transfer-page-02/transfer-page-02'; //Loque#369Dev
import { TransferPage_03Page } from '../pages/transferencia/transfer-page-03/transfer-page-03'; //Loque#369Dev
import { TransferPage_04Page } from '../pages/transferencia/transfer-page-04/transfer-page-04'; //Loque#369Dev
import { TransferPage_05Page } from '../pages/transferencia/transfer-page-05/transfer-page-05'; //Loque#369Dev
import { TransferPage_06Page } from '../pages/transferencia/transfer-page-06/transfer-page-06'; //Loque#369Dev
import { InventarioPage_01Page } from '../pages/inventario/inventario-page-01/inventario-page-01'; //Loque#369Dev
import { InventarioPage_02Page } from '../pages/inventario/inventario-page-02/inventario-page-02'; //Loque#369Dev
import { InventarioPage_03Page } from '../pages/inventario/inventario-page-03/inventario-page-03'; //Loque#369Dev
import { InventarioPage_04Page } from '../pages/inventario/inventario-page-04/inventario-page-04'; //Loque#369Dev
import { InventarioPage_05Page } from '../pages/inventario/inventario-page-05/inventario-page-05'; //Loque#369Dev
import { InventarioPage_06Page } from '../pages/inventario/inventario-page-06/inventario-page-06'; //Loque#369Dev
import { DespachoPage } from '../pages/despacho/despacho';
import { EmbalajePage } from '../pages/embalaje/embalaje';
import { PickingServiceProvider } from '../providers/picking-service/picking-service';
import { TransitoPage } from '../pages/almacenaje/transito/transito' //aromero
import { PalletsTransitoPage } from '../pages/almacenaje/pallets-transito/pallets-transito' //aromero
import { DetallePalletUaPage } from '../pages/almacenaje/detalle-pallet-ua/detalle-pallet-ua' //aromero
import { OtraUbicacionPage } from '../pages/almacenaje/otra-ubicacion/otra-ubicacion' //aromero
import { AlmacenajePalletUaPage } from '../pages/almacenaje/almacenaje-pallet-ua/almacenaje-pallet-ua' //aromero
import { ReubicacionPage } from '../pages/almacenaje/reubicacion/reubicacion' //aromero
import { ReubicacionDestinoPage } from '../pages/almacenaje/reubicacion-destino/reubicacion-destino' //aromero
import { ReabastecimientoAlmacenajePage } from '../pages/almacenaje/reabastecimiento-almacenaje/reabastecimiento-almacenaje' //aromero
import { ReabastecimientoPickingPage } from '../pages/almacenaje/reabastecimiento-picking/reabastecimiento-picking' //aromero
import { ListaPalletUaPage } from '../pages/almacenaje/lista-pallet-ua/lista-pallet-ua' //aromero
import { UbicacionDestinoPage } from '../pages/almacenaje/ubicacion-destino/ubicacion-destino' //aromero
import { ConsultarUbicacionPage } from '../pages/almacenaje/consultar-ubicacion/consultar-ubicacion' //aromero
import { DetalleProductoPage } from '../pages/almacenaje/detalle-producto/detalle-producto' //aromero
import { MenuConsultarPage } from '../pages/almacenaje/menu-consultar/menu-consultar' //aromero
import { AdministrarUaPage } from '../pages/almacenaje/menu-consultar/administrar-ua/administrar-ua' //aromero
import { ReasignarUaPage } from '../pages/almacenaje/menu-consultar/reasignar-ua/reasignar-ua' //aromero
import { ReubicarUaPage } from '../pages/almacenaje/menu-consultar/reubicar-ua/reubicar-ua' //aromero
import { ParticionarUaPage } from '../pages/almacenaje/menu-consultar/particionar-ua/particionar-ua' //aromero
import { ConsultarPalletPage } from '../pages/almacenaje/menu-consultar/consultar-pallet/consultar-pallet' //aromero
import { ConsultarEanPage } from '../pages/almacenaje/menu-consultar/consultar-ean/consultar-ean' //aromero
import { UbicacionOrigenPage } from '../pages/almacenaje/ubicacion-origen/ubicacion-origen' //aromero

import { SolicitudReabastecimientoPage } from '../pages/almacenaje/solicitud-reabastecimiento/solicitud-reabastecimiento' //aromero
import { AbastecimientoSolicitudPage } from '../pages/almacenaje/abastecimiento-solicitud/abastecimiento-solicitud' //aromero
import { ReubicarSolicitudPage } from '../pages/almacenaje/reubicar-solicitud/reubicar-solicitud' //aromero



import { EmbarquePage_01Page } from '../pages/despacho/embarque/embarque-page-01/embarque-page-01'; //Loque#369Dev
import { EmbarquePage_02Page } from '../pages/despacho/embarque/embarque-page-02/embarque-page-02'; //Loque#369Dev
import { EmbarquePage_03Page } from '../pages/despacho/embarque/embarque-page-03/embarque-page-03'; //Loque#369Dev
import { EmbarquePage_04Page } from '../pages/despacho/embarque/embarque-page-04/embarque-page-04'; //Loque#369Dev
import { EmbarquePage_05Page } from '../pages/despacho/embarque/embarque-page-05/embarque-page-05'; //Loque#369Dev
import { ReciboBultoPage_01Page } from '../pages/despacho/recibo/recibo-bulto-page-01/recibo-bulto-page-01'; //Loque#369Dev
import { EmbalajePage_02Page } from '../pages/embalaje/embalaje-page-02/embalaje-page-02';
import { EmbalajeServiceProvider } from '../providers/embalaje-service/embalaje-service';//Yus
import { PopoverEmbalajeComponent } from '../components/popover-embalaje/popover-embalaje';//Yus
import { EmbalajePage_03Page } from '../pages/embalaje/embalaje-page-03/embalaje-page-03';//YUS
import { EmbalajePage_04Page } from '../pages/embalaje/embalaje-page-04/embalaje-page-04';//YUS
import { EmbalajePage_05Page } from '../pages/embalaje/embalaje-page-05/embalaje-page-05';//YUS
import { EmbalajePage_06Page } from '../pages/embalaje/embalaje-page-06/embalaje-page-06';//YUS
import { EmbalajePage_07Page } from '../pages/embalaje/embalaje-page-07/embalaje-page-07';//YUS
import { EmbalajePage_08Page } from '../pages/embalaje/embalaje-page-08/embalaje-page-08';//YUS
import { EmbalajePage_09Page } from '../pages/embalaje/embalaje-page-09/embalaje-page-09';//YUS
import { EmbalajePage_10Page } from '../pages/embalaje/embalaje-page-10/embalaje-page-10';//aromero
import { BultoMasivoPage } from '../pages/embalaje/bulto-masivo/bulto-masivo';//aromero
import { SelectAllDirective } from '../directives/select-all/select-all';
import { AlmacenajeServiceProvider } from '../providers/almacenaje-service/almacenaje-service';
import { InventarioServiceProvider } from '../providers/inventario-service/inventario-service';
import { DespachoServiceProvider } from '../providers/despacho-service/despacho-service';
import { from } from 'rxjs/observable/from';
import { ConfigurarPage } from '../pages/configurar/configurar';//YUS
import { ParametrosPage } from '../pages/configurar/parametros/parametros';//YUS
import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ImpresionPickingCopiaPage } from '../pages/picking/impresion-picking-copia/impresion-picking-copia';
import { ConsultarBultoPage } from '../pages/embalaje/consultar-bulto/consultar-bulto';



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
    EtiquetadoPage_01Page, //Loque#369Dev
    EtiquetadoPage_02Page, //Loque#369Dev
    EtiquetadoPage_03Page, //Loque#369Dev
    EtiquetadoPage_04Page, //Loque#369Dev
    InventarioPage_01Page, //Loque#369Dev
    InventarioPage_02Page, //Loque#369Dev
    InventarioPage_03Page, //Loque#369Dev
    InventarioPage_04Page, //Loque#369Dev
    InventarioPage_05Page, //Loque#369Dev
    InventarioPage_06Page, //Loque#369Dev
    PopoverReciboComponent, //Loque#369Dev
    EmbarquePage_01Page, //Loque#369Dev
    EmbarquePage_02Page, //Loque#369Dev
    EmbarquePage_03Page, //Loque#369Dev
    EmbarquePage_04Page, //Loque#369Dev
    EmbarquePage_05Page, //Loque#369Dev
    ReciboBultoPage_01Page,//Loque#369Dev
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
    InventarioPage_01Page,
    EmbalajePage_02Page,//YUS
    MomentjsPipe, //Loque#369Dev
    PopoverEmbalajeComponent, //Yus
    EmbalajePage_03Page, //YUS
    EmbalajePage_04Page, //YUS
    EmbalajePage_05Page, //YUS
    EmbalajePage_06Page, //YUS
    EmbalajePage_07Page, //YUS
    EmbalajePage_08Page, //YUS
    EmbalajePage_09Page, //YUS
    EmbalajePage_10Page, //aromero
    BultoMasivoPage, //YUS
    SelectAllDirective, //Loque#369Dev
    TransitoPage, //aromero
    PalletsTransitoPage, //aromero
    DetallePalletUaPage, //aromero
    OtraUbicacionPage, //aromero
    AlmacenajePalletUaPage, //aromero
    ReubicacionPage, //aromero
    ReubicacionDestinoPage, //aromero
    ReabastecimientoAlmacenajePage, //aromero
    ReabastecimientoPickingPage, //aromero
    ListaPalletUaPage, //aromero
    UbicacionDestinoPage, //aromero
    ConsultarUbicacionPage, //aromero
    DetalleProductoPage, //aromero
    MenuConsultarPage, //aromero
    AdministrarUaPage, //aromero
    ReasignarUaPage, //aromero
    ReubicarUaPage, //aromero
    ParticionarUaPage, //aromero
    ConsultarPalletPage, //aromero
    ConsultarEanPage, //aromero
    UbicacionOrigenPage, //aromero
    SolicitudReabastecimientoPage, //aromero
    AbastecimientoSolicitudPage, //aromero
    ReubicarSolicitudPage, //aromero
    ConfigurarPage, //YUS    
    ParametrosPage, //YUS      
    ImpresionPickingCopiaPage, //YUS  
    ConsultarBultoPage //YUS    
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC']
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
    EtiquetadoPage_01Page, //Loque#369Dev
    EtiquetadoPage_02Page, //Loque#369Dev
    EtiquetadoPage_03Page, //Loque#369Dev
    EtiquetadoPage_04Page, //Loque#369Dev
    InventarioPage_01Page, //Loque#369Dev
    InventarioPage_02Page, //Loque#369Dev
    InventarioPage_03Page, //Loque#369Dev
    InventarioPage_04Page, //Loque#369Dev
    InventarioPage_05Page, //Loque#369Dev
    InventarioPage_06Page, //Loque#369Dev
    PopoverReciboComponent, //Loque#369Dev
    EmbarquePage_01Page, //Loque#369Dev
    EmbarquePage_02Page, //Loque#369Dev
    EmbarquePage_03Page, //Loque#369Dev
    EmbarquePage_04Page, //Loque#369Dev
    EmbarquePage_05Page, //Loque#369Dev
    BultoMasivoPage, //aromero
    ReciboBultoPage_01Page,//Loque#369Dev
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
    InventarioPage_01Page,
    EmbalajePage_02Page,//YUS
    PopoverEmbalajeComponent, //Yus
    EmbalajePage_03Page,//yus    
    EmbalajePage_04Page, //YUS
    EmbalajePage_05Page, //YUS
    EmbalajePage_06Page, //YUS
    EmbalajePage_07Page, //YUS
    EmbalajePage_08Page, //YUS
    EmbalajePage_09Page, //YUS
    EmbalajePage_10Page, //aromero
    TransitoPage, //aromero
    PalletsTransitoPage, //aromero
    DetallePalletUaPage, //aromero
    OtraUbicacionPage, //aromero
    AlmacenajePalletUaPage, //aromero
    ReubicacionPage, //aromero
    ReubicacionDestinoPage, //aromero
    ReabastecimientoAlmacenajePage, //aromero
    ReabastecimientoPickingPage, //aromero
    ListaPalletUaPage, //aromero
    UbicacionDestinoPage, //aromero
    ConsultarUbicacionPage, //aromero
    DetalleProductoPage, //aromero
    MenuConsultarPage, //aromero
    AdministrarUaPage, //aromero
    ReasignarUaPage, //aromero
    ReubicarUaPage, //aromero
    ParticionarUaPage, //aromero
    ConsultarPalletPage, //aromero
    ConsultarEanPage, //aromero
    SolicitudReabastecimientoPage, //aromero
    AbastecimientoSolicitudPage, //aromero
    ReubicarSolicitudPage, //aromero
    UbicacionOrigenPage, //aromero
    ConfigurarPage, //YUS    
    ParametrosPage,//YUS   
    ImpresionPickingCopiaPage, //YUS      
    ConsultarBultoPage //YUS      
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    File,
    AndroidPermissions,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService, //Loque#369Dev
    ReciboServiceProvider, //Loque#369Dev
    ImpresoraServiceProvider, //Loque#369Dev
    IncidenciaServiceProvider, //Loque#369Dev
    EtiquetadoServiceProvider, //Loque#369Dev
    GlobalServiceProvider, //Loque#369Dev
    PickingServiceProvider,
    EmbalajeServiceProvider,
    AlmacenajeServiceProvider,
    InventarioServiceProvider,
    DespachoServiceProvider //Loque#369Dev
    
  ]
})
export class AppModule { }
