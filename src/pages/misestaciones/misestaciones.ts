import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, MenuController, Refresher } from "ionic-angular";
import { BitacorasListService } from "../../services/bitacora/bitacora.service";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthProvider } from "../../providers/auth/auth";
import { Observable } from "@firebase/util";
import { Storage } from '@ionic/storage';
import { MyApp } from "../../app/app.component";



/**
 * Generated class for the MisestacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-misestaciones",
  templateUrl: "misestaciones.html",
})
export class MisestacionesPage {
  userID : Observable<string>;
  bitacorasByUser: any=[];
  items$: any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController, public bitacoraService : BitacorasListService,
    private afAuth: AngularFireAuth, public autenticacion : AuthProvider,
    public global : MyApp,

  ) {
    this.bitacorasByUser = [];
    this.items$ = [];
    this.menu1Active();
   

    
      this.items$= this.bitacoraService.getBitacoraByUser(this.global.uid).snapshotChanges()
    .map(dato=>{
      return dato.map(c=>({
        key: c.payload.key, ...c.payload.val()
      }))
      
    });
    this.bitacorasByUser =this.bitacoraService.getBitacoraByUser(this.global.uid).snapshotChanges()
    .map(dato=>{
      return dato.map(c=>({
        key: c.payload.key, ...c.payload.val()
      }))
      
    });


  }
  doRefresh(refresher) {
    this.items$= this.bitacoraService.getBitacoraByUser(this.global.uid).snapshotChanges()
    .map(dato=>{
      return dato.map(c=>({
        key: c.payload.key, ...c.payload.val()
      }))
      
    });
      setTimeout(() => {
        refresher.complete();
      }, 2000);
      this.bitacorasByUser = this.bitacoraService.getBitacoraByUser(this.global.uid).snapshotChanges()
      .map(dato=>{
        return dato.map(c=>({
          key: c.payload.key, ...c.payload.val()
        }))
        
      });
    }
  

  ionViewDidLoad() {
  
  }

  menu1Active() {
    this.menu.enable(true, "menu1");
    this.menu.enable(false, "menu2");
  }

  openPage(page){
    this.navCtrl.setRoot(page);
}

openPageHija(page){
  this.navCtrl.push(page);
}

initializeItems() {
  this.items$=this.bitacorasByUser;
 }
getItems(searchbar) {
  // Reset items back to all of the items
this.initializeItems();

  // set q to the value of the searchbar
  let q = searchbar.target.value;
 if (q && q.trim()!= ''){
  this.items$ = this.items$.filter((item) => {
      return (item.nombre.toLowerCase().indexOf(q.toLowerCase()) > -1);
    
  });
  
}
}

openPageDetalle(page, bitacora) {
  console.log(bitacora)
  this.navCtrl.push(page, {llave:bitacora});
}


}
