import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferPage_02Page } from './transfer-page-02';
import { MomentjsPipe } from '../../../pipes/momentjs/momentjs';

@NgModule({
  declarations: [
    TransferPage_02Page,
    MomentjsPipe
  ],
  imports: [
    IonicPageModule.forChild(TransferPage_02Page),
  ],
})
export class TransferPage_02PageModule {}
