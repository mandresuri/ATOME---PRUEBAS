import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bitacora } from "../../app/models/bitacora";
import { BitacorasListService } from "../../services/bitacora/bitacora.service";
import { Medida } from "../../app/models/medida";
import { MedidasListService } from "../../services/medidas/medidas.service";
import { Observable } from '@firebase/util';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the BitacoraDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bitacora-detalle',
  templateUrl: 'bitacora-detalle.html',
})
export class BitacoraDetallePage {
bitacoraID: string;

medidas : any=[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private bitacora : BitacorasListService,
    private medida : MedidasListService,
    private db: AngularFireDatabase
  ) {
    this.medidas = [];
   this.bitacoraID = this.navParams.get('llave');
  
     
    this.medida.getMedidaByBitacora(this.bitacoraID).valueChanges()
        .subscribe(dato=>{
          this.medidas = dato;
        });
   console.log( this.medidas);     
    
  }

  ionViewDidLoad() {
  

  }

}
