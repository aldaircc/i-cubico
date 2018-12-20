import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverPickingPage } from './popover-picking';

@NgModule({
  declarations: [
    PopoverPickingPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverPickingPage),
  ],
})
export class PopoverPickingPageModule {}
