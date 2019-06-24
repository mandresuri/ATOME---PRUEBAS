import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, AlertController } from 'ionic-angular';

import { BluetoothArduinoService } from '../../services/bluetoothArduino/bluetoothArduino.service';
import { log } from 'util';
import { Storage } from '@ionic/storage';
import chartJs from 'chart.js';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

import { Bitacora } from "../../app/models/bitacora";
import { BitacorasListService } from "../../services/bitacora/bitacora.service";
import { Medida } from "../../app/models/medida";
import { MedidasListService } from "../../services/medidas/medidas.service";
import { MyApp } from "../../app/app.component";
import { Observable } from 'rxjs';

/**
 * Generated class for the PenduloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/**
 * Generated class for the PenduloDoblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pendulo-doble',
  templateUrl: 'pendulo-doble.html',
})
export class PenduloDoblePage {
  angulo: any;
  data: { labels: number[]; datasets: { label: string; fill: boolean; lineTension: number; backgroundColor: string; borderWidth: number; borderColor: string; borderCapStyle: string; borderJoinStyle: string; pointRadius: number; pointHitRadius: number; data: number[]; scanGaps: boolean; }[]; };
  config: { data: any; options: { legend: { display: boolean; }; }; type: any; };
  aleatorio: any;
  medida2: any;
  medida1: number;
  isenabled1: boolean = true;
  lineChart: any;
  estadoSalir: boolean = false;
  @ViewChild('lineCanvasPendulo') lineCanvasPendulo;
  conteoMedidas: any = 0;
  practicaLista: boolean = false;
  uid: any;
  lista: string = "";
  tiempo: any; // = "5678";//QUITAR VALOR AL SALIR A PROD
  altura: any; // = "1234";//QUITAR VALOR AL SALIR A PROD
  recibido: string = "";
  mensaje: string = "";
  device: any;
  items: Observable<any[]>;
  estadoConexion: string;
  isenabled: boolean;
  isenabled2: boolean;
  terminar: boolean;
  newbitacora: Bitacora;
  newmedida: Medida;
  estacionId: 'est1'; string;
  fecha: string;
  name: string; // = "CAIDA LIBRE"; //QUITAR VALOR AL SALIR A PROD
  descripcion: string; //= "La caída libre es un ejemplo de movimiento rectilíneo uniformemente acelerado, cuya aceleración es producida por la atracción gravitacional entre la tierra y el cuerpo. Las ecuaciones que describen el movimiento de un cuerpo en caída libre están dada por  y(t) = y + v t + at v t = v + at 0 ( ) donde es la altura inicial, es la velocidad inicial y es la aceleración producida por la gravedad.";
  conectado: boolean = false;

  llave: string;
  public selectedvalue;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    public menu: MenuController,
    private bluetooth: BluetoothArduinoService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private bitacora: BitacorasListService,
    private medida: MedidasListService,
    public global: MyApp,
    private storage: Storage
  ) {
    this.device = this.navParams.get('deviceConectado');
    this.items = database.list('estacion').valueChanges();


  }


  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.storage.get('id').then((val) => {
      this.uid = val;
    });
    this.device = this.navParams.get('deviceConectado');
    this.name = this.device.nombre;
    this.descripcion = this.device.descripcion;
    this.estacionId = this.device.estacion;
    this.estadoConexion = "No Conectado";
    this.conectado = false;
    this.isenabled = false;

  }
  menu1Active() {
    this.menu.enable(true, 'menu1');
  }
  getChart(context, chartType, data, options?) {
    this.config = {
      data,
      options: {
        // title: {
        // 	display: true,
        // 	text: 'Titulo'
        // }
        legend: {
          display: false
        }
      },
      type: chartType
    }
    return new chartJs(context, this.config);
  }
  getLineChart() {
    this.data = {
      labels: [0], // eje x
      datasets: [
        {
          label: 'x', // this.nomEst,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderColor: 'rgb(0,0,0)',
          borderCapStyle: 'square', //but , round, square -- termina la linea
          borderJoinStyle: 'miter', // "bevel" || "round" || "miter"; -- curvas
          pointRadius: 2,
          pointHitRadius: 20,
          data: [0], // eje y
          scanGaps: true
        },
        {
          label: 'x', // this.nomEst,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderColor: 'rgb(0,0,0)',
          borderCapStyle: 'square', //but , round, square -- termina la linea
          borderJoinStyle: 'miter', // "bevel" || "round" || "miter"; -- curvas
          pointRadius: 2,
          pointHitRadius: 20,
          data: [0], // eje y
          scanGaps: true
        }
      ]
    };

    return this.getChart(this.lineCanvasPendulo.nativeElement, 'line', this.data);
  }

  conectar(seleccion) {
    this.fecha = new Date().toLocaleDateString();
    // se crea el objeto de la nueva bitacora
    this.newbitacora = {
      nombre: this.name,
      usuario: this.uid,
      fecha: this.fecha,
      estacion: this.estacionId
    };
    // conectar un bluetooth
    this.bluetooth.bluetoothSerial.isConnected().then(
      isConnected => {
        let alert = this.alertCtrl.create({
          title: 'Reconectar',
          message: '¿Desea reconectar a este dispositivo?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
                this.bluetooth.desconectar();
                this.bluetooth.conectar(seleccion.id).then(success => {
                  // conecta el siguiente bluetooth
                  console.log('   this.estadoConexion ');
                  this.bluetooth.conectar('00:18:E5:04:24:16').then(success => {

                    this.estadoConexion = "conectada";
                    this.bitacora.addBitacora(this.newbitacora).then(ref => {
                      this.llave = ref.key
                    });
                    this.practicaLista = true;
                    this.isenabled = true;
                    this.conectado = true;
                    this.lineChart = this.getLineChart();
                  }, fail => {

                    this.practicaLista = false;
                    this.isenabled = false;
                    this.conectado = false;
                  });


                }, fail => {


                });
              }
            }
          ]
        });
        alert.present();
      }, notConnected => {
        let alert = this.alertCtrl.create({
          title: 'Conectar',
          message: '¿Desea conectar el dispositivo?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
                this.bluetooth.conectar(seleccion.id).then(success => {
                  this.bluetooth.conectar('00:18:E5:04:24:16').then(success => {
                    this.estadoConexion = "conectada";
                    console.log('   this.estadoConexion ');
                    this.bitacora.addBitacora(this.newbitacora).then(ref => {
                      this.llave = ref.key
                    });
                    this.practicaLista = true;
                    this.isenabled = true;
                    this.conectado = true;
                    this.lineChart = this.getLineChart();


                  }, fail => {
                    this.practicaLista = false;
                    this.isenabled = false;
                    this.conectado = false;
                  });
                });

              }
            }
          ]
        });
        alert.present();
      });

  }

  enviarMensajes() {

    // se inicia la grafica


    this.bluetooth.conexionMensajes = this.bluetooth.dataInOut(this.mensaje).subscribe(data => {
      let entrada = data.substr(0, data.length - 1);
      console.log(entrada);
      // bluetooth conectado
      if (entrada != ">") {
        // si la entrada es diferente de vacia
        if (entrada != "") {
          this.recibido = entrada;
          // entrada de angulo
          if (entrada.substr(0, 2) === "a:") {

            this.angulo = entrada.substr(2, entrada.length - 1);
            this.actualizarGrafica(this.tiempo, this.angulo);

            // entrada de tiempo
          } else if (entrada.substr(0, 2) === "t:") {

            this.tiempo = entrada.substr(2, entrada.length - 1);
            this.actualizarGrafica(this.tiempo, this.angulo);
            this.guardarVariables(this.angulo, this.tiempo);

          }

        }
      } else {
        this.bluetooth.conexionMensajes.unsubscribe();
      }
      this.mensaje = "";
    });
  }

  desconectar() {
    this.lineChart.destroy();
    this.conteoMedidas = 0;
    this.bluetooth.desconectar();

    this.isenabled = false;
    this.conectado = false;
  }
  // iniciar prectica
  iniciarPractica() {
    this.mensaje = "1";
    this.enviarMensajes();

  }
  // detener prectica
  detenerPractica() {
    // variable de comunicacion con arduino
    this.mensaje = "2";
    this.enviarMensajes();
    // this.guardarVariables(this.altura, this.tiempo);
    // clearInterval(this.aleatorio);

  }


  // guarda cada medida en la base de datos
  guardarVariables(angulo, tiempo) {

    this.newmedida = {
      altura: angulo,
      angulo: angulo,
      tiempo: tiempo,
      bitacora: this.llave
    }
    this.medida.addMedida(this.newmedida);
    this.conteoMedidas++;
    if (this.conteoMedidas > 0) {
      this.estadoSalir = true;
    }
  }



  openPageDetalle(page, bitacora) {
    this.desconectar();
    this.llave = '';
    this.navCtrl.push(page, { llave: bitacora, est: this.estacionId });

  }


  actualizarGrafica(tiempo, angulo) {

    this.data.labels.push(tiempo);
    this.data.datasets.forEach((data) => {
      data.data.push(angulo);
    });
    this.lineChart.update();
    /*para prueba aleatorio*/
    // this.aleatorio = setInterval(() => {
    //   this.data.labels.push(Math.random());
    //   this.data.datasets.forEach((data) => {
    //     data.data.push(Math.random());
    //   });
    // }, 100);
  }

}

