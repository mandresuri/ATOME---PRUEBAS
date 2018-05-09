import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { LoginPage } from './login';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import {} from 'jasmine';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from '../../app/firebase.credentials';
import { Usuarios } from '../../app/models/usuario';


let comp: LoginPage;
let fixture: ComponentFixture<LoginPage>;
let de: DebugElement;
let el: HTMLElement;

 
describe('Page: Login Page', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp, LoginPage],
 
            providers: [
                NavController,AuthProvider,MenuController,AngularFireAuth,AngularFireDatabase,AlertController,
            ],
 
            imports: [
                IonicModule.forRoot(MyApp),
                AngularFireModule.initializeApp(FIREBASE_CONFIG)
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
 
        fixture = TestBed.createComponent(LoginPage);
        comp    = fixture.componentInstance;
 
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
    it('is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
    });
 
    it('el usuario que se registra existe en la base de datos', () => {
 
        let productsService = fixture.debugElement.injector.get(AuthProvider);
        let firstProduct = productsService.loginUser("y@y.co","123456");
 
        firstProduct.then(user=>{
            expect(user.email).toEqual("y@y.co");
        })
        
 
    });

    it('el usuario que se registra no existe en la base de datos', () => {
        
               let productsService = fixture.debugElement.injector.get(AuthProvider);
               let firstProduct = productsService.loginUser("faber@uniquindio.co","123456");
        
               firstProduct.then(err=>{
                   expect(err).toEqual("ERROR_USER_NOT_FOUND");
               })
               
        
           });

           it('el usuario tipo 1 entra a pagina de admin', () => {
            
                    let usuario : Usuarios
                    usuario.tipo = "1";
                    let prueba = this.login(usuario)

                   let productsService = fixture.debugElement.injector.get(AuthProvider);
                   let firstProduct = productsService.loginUser(usuario.nombre,usuario.tipo);
            
                   firstProduct.then(user=>{
                       expect (user.tipo).toEqual("1")
                   })
                   
            
               });
 
 
});