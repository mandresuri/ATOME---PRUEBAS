import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform, AlertController, Refresher, LoadingController } from "ionic-angular";
import { BluetoothArduinoService } from "../../services/bluetoothArduino/bluetoothArduino.service";
import { Observable } from "rxjs";
import { Estacion } from "../../app/models/estacion";
import { Storage } from '@ionic/storage';
import { EstacionesListService } from "../../services/estaciones-list/estaciones-list.service";
import 'rxjs/add/operator/map';




/**
 * Generated class for the EstacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-estaciones",
  templateUrl: "estaciones.html",
})
export class EstacionesPage {

  li_devices: Array<any> = [];
  devices: Array<any> = [];
  atomeList$: Observable<Estacion[]>;
  mostrarSpiner = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private storage: Storage,
    private alertCtrl: AlertController,
    private atome: EstacionesListService,
    private bluetooth: BluetoothArduinoService, public loadingCtrl: LoadingController) {
    this.devices = [];
  }

  ionViewDidEnter() {
    this.devices = [];
    this.platform.ready().then(() => {
      this.li_devices = [];
      this.presentLoading();
      this.atomeList$ = this.atome.getEstacionesList().snapshotChanges().map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
      this.storage.set('device', this.atomeList$);

      this.storage.get('device').then((val) => {
        console.log(val);
      });



      this.bluetooth.buscar_bluetooth().then((success: Array<Object>) => {
        this.li_devices = success;

        this.devices = [];
        this.atomeList$.subscribe(data => {
          data.forEach(atom => {
            this.li_devices.forEach(dev => {
              if (atom.id === dev.id) {
                dev.nombre = atom.nombre,
                  dev.descripcion = atom.descripcion;
                dev.estacion = atom.key;
                dev.pantalla = atom.pantalla;
                this.devices.push(dev);
              }
            });

          });
        })
        this.mostrarSpiner = false;
      }, fail => {
        this.bluetooth.presentToast(fail);
        this.mostrarSpiner = false;
      });

    });

  }

  ionViewDidLoad() {
  }
  openPage(page) {
    this.navCtrl.setRoot(page);
  }
  openPageHija(page, device) {
    // this.navCtrl.push(page);
    this.navCtrl.push(device.pantalla, { deviceConectado: device }, );
  }

  public ngOnDestroy() {
    this.bluetooth.desconectar();
  }

  refresh_bluetooth(refresher: Refresher) {
    this.devices = [];
    this.presentLoading();
    if (refresher) {
      this.bluetooth.buscar_bluetooth().then((successMessage: Array<Object>) => {
        this.li_devices = [];
        this.li_devices = successMessage;
        refresher.complete();
      }, fail => {
        this.bluetooth.presentToast(fail);
        refresher.complete();
      });
    }
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Buscando Estaciones de Trabajo...",
      duration: 23000
    });
    loader.present();
  }

}
