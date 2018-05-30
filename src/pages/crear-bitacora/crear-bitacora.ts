import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, AlertController } from 'ionic-angular';
import {  AngularFireObject , AngularFireList  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BluetoothArduinoService } from '../../services/bluetoothArduino/bluetoothArduino.service';
import { log } from 'util';
import { Bitacora } from "../../app/models/bitacora";
import { BitacorasListService } from "../../services/bitacora/bitacora.service";
import { Medida } from "../../app/models/medida";
import { MedidasListService } from "../../services/medidas/medidas.service";
import { MyApp } from "../../app/app.component";



/**
 * Generated class for the CrearBitacoraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-bitacora',
  templateUrl: 'crear-bitacora.html',
})
export class CrearBitacoraPage {
  lista: string = "";
  tiempo: any;
  altura: any;
  recibido: string = "";
  mensaje: string = "";
  device: any;
  items: Observable<any[]>;
  estadoConexion:string;
  isenabled: boolean;
  isenabled2: boolean;
  terminar : boolean;
  newbitacora : Bitacora;
  newmedida : Medida;
  estacionId : string;
  fecha : string;
  name : string;
  descripcion : string;

  llave : string;
  public selectedvalue;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase,
    public menu: MenuController,
    private bluetooth: BluetoothArduinoService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private bitacora : BitacorasListService,
    private medida : MedidasListService,
     public global : MyApp,
  ) {
    this.device = this.navParams.get('deviceConectado');
    console.log('carga estaciones');   
    this.items = database.list('estacion').valueChanges();
    console.log('selecciona');
    console.log(this.selectedvalue);
  }

  
  ionViewDidLoad() {
// esto es temporal
    // this.name = "Caida Libre";
    // this.descripcion = "se debe ajustar la altura, verificar que la practica este lista, presionar obtener altura e iniar la practica";

  }

  ionViewDidEnter() {
    this.device = this.navParams.get('deviceConectado');
    // ojo se deben descomentar esto
    this.name = this.device.name;
     this.descripcion = this.device.descripcion;
    console.log('carga');
    console.log(this.device);
    
    
    this.estadoConexion = "No Conectado";
    this.isenabled =false;
  }
  menu1Active() {
    this.menu.enable(true, 'menu1');
  }
  onChange(){
  console.log('selecciona');
  console.log(this.selectedvalue);
}

conectar(seleccion){
this.fecha  = new Date().toLocaleDateString();
this.estacionId = 'est1'; // por ahora, esto se debe traer del device

this.newbitacora ={
    nombre: 'Caida libre', //this.device.name,
    usuario: this.global.uid,
    fecha: this.fecha,
    estacion: this.estacionId
}  ;

this.bitacora.addBitacora(this.newbitacora).then(ref=>{
  this.llave=ref.key
});

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
                  
                  this.bluetooth.presentToast(success);
                }, fail => {
                  this.bluetooth.presentToast(fail);
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
                  this.bluetooth.presentToast(success);
                  this.estadoConexion = "conectada";
                  this.isenabled = true;
                  this.mensaje = "2";
                  this.enviarMensajes();

                }, fail => {
                  this.bluetooth.presentToast(fail);
                });
              }
            }
          ]
        });
        alert.present();
    });

   // this.isenabled = true;
  }

  enviarMensajes() {

   this.terminar = true;


    this.bluetooth.conexionMensajes = this.bluetooth.dataInOut(this.mensaje).subscribe(data => {
      let entrada = data.substr(0, data.length - 1);
      if (entrada != ">") {
        if (entrada != "") {
          this.recibido = entrada;
          if(entrada.substr(0,2)==="a:"){
            this.isenabled2 = true;
            this.lista = "PRACTICA LISTA"
            this.altura = entrada.substr(2,entrada.length - 1);
            this.altura = entrada.length;
          }else if(entrada.substr(0,2)==="t:"){
            this.isenabled2 = true;
            this.lista = "PRACTICA LISTA"
            this.tiempo = entrada.substr(2,entrada.length - 1);
            this.terminar = false;
            this.guardarVariables(this.altura, this.tiempo);
          }else if(entrada==="PRACTICA NO LISTA"){
            this.lista = entrada;
            this.isenabled2 = false;
          }
          
          console.log(`Entrada: ${entrada}`);
          this.bluetooth.presentToast(entrada);
        }
      } else {
        this.bluetooth.conexionMensajes.unsubscribe();
      }
      this.mensaje = "";
      //this.recibido = "";
    });
  }

  desconectar(){
    this.bluetooth.desconectar();
    this.isenabled = false;
  }

iniciarPractica(){
  console.log('inicia la practica');
  this.mensaje = "1";
   this.terminar = false;
///temporal
  // this.tiempo = 0.2;
   this.guardarVariables(this.altura,this.tiempo);

//  this.enviarMensajes();
}
pedirAltura(){
  this.mensaje = "2"
  this.terminar = false;
// temporal
//  this.altura= 7;
  this.isenabled2 = true;

 // this.enviarMensajes();
}


 guardarVariables(altura, tiempo){
  // console.log('guardar variables');

 this.newmedida = {
  altura: altura,
  tiempo: tiempo,
  bitacora: this.llave
 }
 this.medida.addMedida(this.newmedida);
   this.terminar = true;
 }



  openPageDetalle(page, bitacora) {
    this.navCtrl.push(page, {llave:bitacora});
  }

}