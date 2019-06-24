import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { Bitacora } from "../../app/models/bitacora";
import { BitacorasListService } from "../../services/bitacora/bitacora.service";
import { Medida } from "../../app/models/medida";
import { MedidasListService } from "../../services/medidas/medidas.service";
import { Observable } from '@firebase/util';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';


import chartJs from 'chart.js';
import { GraficaPage } from '../grafica/grafica';



@IonicPage()
@Component({
  selector: 'page-bitacora-detalle',
  templateUrl: 'bitacora-detalle.html',
})
export class BitacoraDetallePage {
  bitacoraID: string;
  medidas: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private bitacora: BitacorasListService,
    private medida: MedidasListService,
    private db: AngularFireDatabase,
    private actionsheetCtrl: ActionSheetController,
    private platform: Platform,
    public modalCtrl: ModalController
  ) {
    this.medidas = [];
    this.bitacoraID = this.navParams.get('llave');

    console.log('abre pagna antes del servicio');
    this.medida.getMedidaByBitacora(this.bitacoraID).valueChanges()
      .subscribe(dato => {
        this.medidas = dato;
      });

  }

  ionViewDidLoad() {
    console.log('abre pagna');


  }

  openPage(page) {
    this.navCtrl.push(page, { datos: this.medidas });

  }

  openModal() {

    let modal = this.modalCtrl.create('GraficaPage', { 'medidas': this.medidas });
    modal.present();
  }



}
