import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

import chartJs from 'chart.js';

// pdf
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { LoadingController } from 'ionic-angular';



/**
 * Generated class for the GraficaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grafica',
  templateUrl: 'grafica.html',
})
export class GraficaPage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  medidas : any= [];
  tiempo : any=[];
	altura : any=[];
	pdfObjet: any;
	nomEst : String;
	medida1 : String;
	medida2 : String;
	datos : any=[];
	item : any=[];
	


  constructor(public navCtrl: NavController, public navParams: NavParams,
	public viewCtrl : ViewController,
	public platform: Platform,
	public file: File,
	public fileOpener: FileOpener,
	public loadingCtrl: LoadingController) {
    this.medidas = this.navParams.get('medidas');
    console.log(this.medidas.length);
	this.nomEst = 'Caida Libre';
	
	if(this.nomEst == 'Caida Libre'){
		this.medida1 = 'Altura';
		this.medida2 = 'Tiempo';
		for (let i = 0; i < this.medidas.length; i++) {
            this.tiempo[i]= this.medidas[i].tiempo + "s ";
			this.altura[i]=this.medidas[i].altura ;
		

  
      
         }
	}
    
  }

  ngAfterViewInit() {
		setTimeout(() => {
			this.lineChart = this.getLineChart();
		}, 150);
	}

  getChart(context, chartType, data, options?) {
		return new chartJs(context, {
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
		});
  }
  
  getLineChart() {
  
		const data = {
			labels: this.tiempo, // eje x
			datasets: [
				{
					label: this.nomEst,
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'transparent',
					borderWidth: 3,
					borderColor: 'rgb(0,0,0)',
				    borderCapStyle: 'square', //but , round, square -- termina la linea
					borderJoinStyle: 'miter', // "bevel" || "round" || "miter"; -- curvas
					pointRadius:2,
					pointHitRadius: 20,
					data: this.altura, // eje y
					scanGaps: true
				}
			]
		};

		return this.getChart(this.lineCanvas.nativeElement, 'line', data);
	}
  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
	}
	
	generatePDF() {
	   var info = new Array();
	   var titulo = [
		{ text: this.medida1, style: 'tableHeader' },
		{ text: this.medida2, style: 'tableHeader' }
	];

	info.push(titulo);
	for (let i = 0; i < this.medidas.length; i++) {
		info.push([this.medidas[i]['altura'], this.medidas[i]['tiempo'] ]);
	}
		
		let pdfDefinition = {
			footer: {
				stack: [
					{	text: 'Bitácora generada por ATOME - Universidad del Quindío',
					alignment: 'center',
					bold: false}
				]
			},
			content: [
				{
					text: 'Bitácora de Laboratorio',
					style: 'header',
					alignment: 'center'
				},
				{
					text: this.nomEst+'\n\n',
					style: 'subheader',
					alignment: 'center'
				},

				{
					text: [
						'This paragraph uses header style and overrides bold value setting it back to false.',
						'Header style in this example sets alignment to justify, so this paragraph should be rendered. \n\n\n'
					],
					style: 'subheader',
					bold: false
				},
				{
					text: 'Medidas:\n',
					style: 'subheader'
				},
				{
					style: 'tableExample',
					table: {
						body: info

					  }
				},
				// grafica
				{
					text: 'Gráfica:\n\n\n\n\n\n\n\n',
					style: 'subheader'
				},

				// integrantes del grupo
				{
					text: 'Integrantes del Grupo:\n',
					style: 'subheader'
				},
				{
					text: 'Yenifer Hernandez - Mauricio Uribe\n\n\n\n\n\n\n\n\n\n',
					style: 'subheader',
					bold: false
				},

				
			],
			styles: {
				header: {
					fontSize: 20,
					bold: true
				},
				subheader: {
					fontSize: 18,
					bold: true,
					alignment: 'justify'
				},
				tableExample: {
					margin: [ 200, 5 ],
					alignment: 'center'
				},
				tableHeader: {
					bold: true,
					fontSize: 15,
					color: 'black'
				}
			}
		};
		// cosntruccion del pdf y descarga
		this.pdfObjet = pdfMake.createPdf(pdfDefinition);
		this.openFile();
	}

	openFile() {
		this.presentLoading();
		if (this.platform.is('cordova')) {
			
			this.platform.ready().then(() => {
				this.pdfObjet.getBuffer((buffer) => {
					var blob = new Blob([ buffer ], { type: 'application/pdf' });
					this.file
						.writeFile(this.file.dataDirectory, 'Bitacora.pdf', blob, { replace: true })
						.then((fileEntry) => {
							this.fileOpener.open(
								this.file.dataDirectory + 'Bitacora.pdf',
								'application/pdf'
							);
						});
				});
				return true;
			});
		}

		this.pdfObjet.download();
	}

	presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 3000
    });
    loader.present();
  }
}
