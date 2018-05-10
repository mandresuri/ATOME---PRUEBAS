import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { BluetoothArduinoService } from '../services/bluetoothArduino/bluetoothArduino.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { FIREBASE_CONFIG } from './firebase.credentials';
import { EstacionesListService } from '../services/estaciones-list/estaciones-list.service';
import { LoginPage } from '../pages/login/login';
import { BitacorasListService } from '../services/bitacora/bitacora.service';
import { MedidasListService } from '../services/medidas/medidas.service';




@NgModule({
  declarations: [
    MyApp,
    LoginPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothArduinoService,
    BluetoothSerial,
    EstacionesListService,
    BitacorasListService,
    MedidasListService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
  ]
})
export class AppModule {}
