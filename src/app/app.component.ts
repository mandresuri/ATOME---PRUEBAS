import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loginEstado: any;
  uid: string;
  nombre: String;
  login: LoginPage;
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage'  //HomePage; //esto cambia  para poner el login

  //rootPage  = LoginPage;

  pages: Array<{ title: string, component: any }>;
  pagesAdmin: Array<{ title: string, component: any, icono: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private storage: Storage,
    private afAuth: AngularFireAuth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: 'MisestacionesPage' },
      // { title: 'List', component: ListPage }
    ]

    this.pagesAdmin = [
      { title: 'Crear Estación de Trabajo', component: 'MisestacionesPage', icono: 'checkbox-outline' }
    ];
  }

  initializeApp() {
    this.storage.get('login').then((val) => {
      this.loginEstado = val;
      console.log(this.loginEstado);
      if (this.loginEstado) {
        console.log('yh');

        this.rootPage = 'MisestacionesPage';
      }
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  salir() {

    this.afAuth.auth.signOut();
    this.platform.exitApp();
    this.nav.setRoot('LoginPage');
  }
}