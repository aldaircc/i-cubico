import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuConsultarPage } from './menu-consultar';

@NgModule({
  declarations: [
    MenuConsultarPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuConsultarPage),
  ],
})
export class MenuConsultarPageModule {}
