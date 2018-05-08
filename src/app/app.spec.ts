import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorHandler } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { BluetoothArduinoService } from '../services/bluetoothArduino/bluetoothArduino.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { EstacionesListService } from '../services/estaciones-list/estaciones-list.service';
import { FIREBASE_CONFIG } from './firebase.credentials';
import {} from 'jasmine';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;
 
describe('Component: Root Component', () => {
 
    
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp],
 
            providers: [
                StatusBar,
                SplashScreen,
                BluetoothArduinoService,
                BluetoothSerial,
                EstacionesListService,
                {provide: ErrorHandler, useClass: IonicErrorHandler},
                AuthProvider,
            ],
 
            imports: [
                IonicModule.forRoot(MyApp),
                AngularFireModule.initializeApp(FIREBASE_CONFIG),
                AngularFireDatabaseModule,
                AngularFireAuthModule
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
 
        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;
 
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
    });
 
    it('is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
    });
 
    it('inicializa la root page como Login Page', () => {
        expect(comp['rootPage']).toBe(LoginPage);
    });
 
});