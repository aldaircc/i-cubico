import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministrarUaPage } from './administrar-ua';

@NgModule({
  declarations: [
    AdministrarUaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministrarUaPage),
  ],
})
export class AdministrarUaPageModule {}
