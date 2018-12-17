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
import { EtiquetaCajaLpnPage } from '../pages/etiqueta-caja-lpn/etiqueta-caja-lpn';
import { PopoverReciboComponent } from '../components/popover-recibo/popover-recibo';

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
    EtiquetaCajaLpnPage,
    PopoverReciboComponent,
    MomentjsPipe //Pipe to give format to dates.
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['ENE','FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC']
    }),
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
    EtiquetaCajaLpnPage,
    PopoverReciboComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ReciboServiceProvider,
    ImpresoraServiceProvider,
    IncidenciaServiceProvider
  ]
})
export class AppModule {}
