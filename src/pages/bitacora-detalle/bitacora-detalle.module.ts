import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacoraDetallePage } from './bitacora-detalle';

@NgModule({
  declarations: [
    BitacoraDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(BitacoraDetallePage),
  ],
})
export class BitacoraDetallePageModule {}
