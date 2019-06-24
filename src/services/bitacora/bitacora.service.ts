import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Bitacora } from "../../app/models/bitacora";


@Injectable()
export class BitacorasListService {
    private BitacoraList = this.db.list<Bitacora>("bitacora");

    constructor(private db: AngularFireDatabase) { }

    getBitacoraList() {
        return this.BitacoraList;
    }

    addBitacora(bitacora: Bitacora) {
        return this.BitacoraList.push(bitacora);
    }

    editBitacora(bitacora: Bitacora) {
        return this.BitacoraList.update(bitacora.key, bitacora);
    }

    removeBitacora(bitacora: Bitacora) {
        return this.BitacoraList.remove(bitacora.key);
    }

    getBitacoraByUser(uid: string) {
        // return this.db.list('/bitacora/', ref=> ref.orderByChild('usuario').equalTo(uid));

        return this.db.list('/bitacora/');

    }

}