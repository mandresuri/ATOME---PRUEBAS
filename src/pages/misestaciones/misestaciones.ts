import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, MenuController, Refresher } from "ionic-angular";
import { BitacorasListService } from "../../services/bitacora/bitacora.service";
import { AuthProvider } from "../../providers/auth/auth";
import { MyApp } from "../../app/app.component";
import { Storage } from '@ionic/storage';
import { Bitacora } from "../../app/models/bitacora";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
// import { Observable } from "rxjs";
// import { of } from 'rxjs';

interface const_bitacora {
  key: string,
  nombre: string,
  fecha: string,
  estacion: string,
  usuario: string
}
@IonicPage()
@Component({
  selector: "page-misestaciones",
  templateUrl: "misestaciones.html",
})


export class MisestacionesPage {

  bita: any;
  bitacoref: AngularFireList<{}>;
  uid: any;
  bitacorasByUser: any;
  items$: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController, public bitacoraService: BitacorasListService,
    private afAuth: AngularFireAuth, public autenticacion: AuthProvider,
    public global: MyApp, private storage: Storage, private database: AngularFireDatabase,

  ) {
    this.bitacorasByUser = [];
    this.items$ = [];
    this.menu1Active();
  }

  ionViewDidLoad() {
    this.cargarBitacoras();
  }
  obtenerInfo() {

    this.database.list('bitacora', ref => ref.orderByChild('usuario').equalTo(this.uid)).snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          this.items$.push({
            key: action.payload.key,
            data: action.payload.val()
          });
        });

      });
  }
  cargarBitacoras() {
    this.bitacorasByUser = [];
    this.items$ = [];
    // se consultan las bitacoras de cada usuario
    this.storage.get('id').then((val) => {
      this.uid = val;
    });
    setTimeout(() => {

      this.obtenerInfo();
      this.bitacorasByUser = this.items$;
    }, 400);
  }
  doRefresh(refresher) {
    this.obtenerInfo();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }



  menu1Active() {
    this.menu.enable(true, "menu1");
    this.menu.enable(false, "menu2");
  }

  openPage(page) {
    this.navCtrl.setRoot(page);
  }

  openPageHija(page) {
    this.navCtrl.push(page);
  }

  initializeItems() {
    this.items$ = this.bitacorasByUser;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    let q = searchbar.target.value;
    if (q && q.trim() != '') {
      this.items$ = this.items$.filter((item) => {
        // busca por dos parametros, nombre o fecha
        return ((item.nombre.toLowerCase().indexOf(q.toLowerCase()) > -1) || (item.fecha.toLowerCase().indexOf(q.toLowerCase()) > -1));

      });

    }
  }

  openPageDetalle(page, bitacora, estacion) {

    this.navCtrl.push(page, { llave: bitacora, est: estacion });
  }


}
