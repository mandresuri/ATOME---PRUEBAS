import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

import { Medida } from "../../app/models/medida";


@Injectable()
export class MedidasListService {
    private MedidasList = this.db.list<Medida>("medida");
    
    constructor(private db: AngularFireDatabase) { }

    getMedidaList() {
        return this.MedidasList;
    }

    addMedida(medida:Medida) {
        return this.MedidasList.push(medida);
    }

    editMedida(medida:Medida) {
        return this.MedidasList.update(medida.key, medida);
    }

    removeMedida(medida:Medida) {
        return this.MedidasList.remove(medida.key);
    }

    getMedida(){
        return this.db.list('/medida/');
    }
    getMedidaByBitacora(bitacoraID:string) {
        return this.db.list('/medida/', ref=> ref.orderByChild('bitacora').equalTo(bitacoraID));
    }
}



