import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventarioPage_01Page } from './inventario-page-01';
import { MomentjsPipe } from '../../../pipes/momentjs/momentjs';

@NgModule({
  declarations: [
    InventarioPage_01Page,
  ],
  imports: [
    IonicPageModule.forChild(InventarioPage_01Page),
    MomentjsPipe
  ],
})
export class InventarioPage_01PageModule {}
