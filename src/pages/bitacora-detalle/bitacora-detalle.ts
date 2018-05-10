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
bitacoraID: string
medidasList$: AngularFireList<Medida[]>;

// Observable<Medida[]>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private bitacora : BitacorasListService,
    private medida : MedidasListService,
    private db: AngularFireDatabase
  ) {
    this.bitacoraID = this.navParams.get('llave');
  }

  ionViewDidLoad() {
   // this.medidasList$ = this.db.list('/medida', ref => ref.orderByChild('bitacora').equalTo(this.bitacoraID));
  
  
    //this.medida.getMedidaByBitacora(this.bitacoraID);

  }

}
