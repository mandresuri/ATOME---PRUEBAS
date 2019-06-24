import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenduloPage } from './pendulo';

@NgModule({
  declarations: [
    PenduloPage,
  ],
  imports: [
    IonicPageModule.forChild(PenduloPage),
  ],
})
export class PenduloPageModule {}
