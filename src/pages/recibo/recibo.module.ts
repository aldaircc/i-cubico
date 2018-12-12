import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReciboPage } from './recibo';
import { MomentjsPipe } from '../../pipes/momentjs/momentjs';

@NgModule({
  declarations: [
   // ReciboPage,
  ],
  imports: [
    IonicPageModule.forChild(ReciboPage),
    MomentjsPipe
  ],
})
export class ReciboPageModule {}
