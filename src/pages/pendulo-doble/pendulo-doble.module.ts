import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenduloDoblePage } from './pendulo-doble';

@NgModule({
  declarations: [
    PenduloDoblePage,
  ],
  imports: [
    IonicPageModule.forChild(PenduloDoblePage),
  ],
})
export class PenduloDoblePageModule {}
