import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';


// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { BluetoothArduinoService } from '../services/bluetoothArduino/bluetoothArduino.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { FIREBASE_CONFIG } from './firebase.credentials';
import { EstacionesListService } from '../services/estaciones-list/estaciones-list.service';
import { LoginPage } from '../pages/login/login';
import { BitacorasListService } from '../services/bitacora/bitacora.service';
import { MedidasListService } from '../services/medidas/medidas.service';

import { IonicStorageModule } from '@ionic/storage';

import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CrearBitacoraPageModule } from '../pages/crear-bitacora/crear-bitacora.module';
import { EstacionesPageModule } from '../pages/estaciones/estaciones.module';
import { GraficaPageModule } from '../pages/grafica/grafica.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MisestacionesPageModule } from '../pages/misestaciones/misestaciones.module';
import { PenduloDoblePageModule } from '../pages/pendulo-doble/pendulo-doble.module';
import { BitacoraDetallePageModule } from '../pages/bitacora-detalle/bitacora-detalle.module';
import { PenduloPageModule } from '../pages/pendulo/pendulo.module';






@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BitacoraDetallePageModule,
    CrearBitacoraPageModule,
    EstacionesPageModule,
    GraficaPageModule,
    LoginPageModule,
    MisestacionesPageModule,
    PenduloPageModule,
    PenduloDoblePageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothArduinoService,
    BluetoothSerial,
    EstacionesListService,
    BitacorasListService,
    MedidasListService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    File,
    FileOpener
  ]
})
export class AppModule { }
