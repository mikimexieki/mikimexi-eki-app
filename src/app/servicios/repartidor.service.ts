import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente';
import { map } from 'rxjs/operators';
import { Repartidor } from '../modelos/repartidor.model';

@Injectable()
export class RepartidorServicio {

  repColeccion: AngularFirestoreCollection<Repartidor>;
  repDoc: AngularFirestoreDocument<Repartidor>;
  repartidores: Observable<Repartidor[]>;
  repartidor: Observable<Repartidor>;

  id: string;

  constructor(private db: AngularFirestore) {
    this.repColeccion = db.collection('repartidores', ref => ref.orderBy('nombre'));
  }

  agregarRepartidor(rep: Repartidor) {
        console.log(rep);
        this.repColeccion.doc(rep.licencia).set(rep);
  }

  getRepartidor(): Observable<Repartidor[]> {
    this.repartidores = this.repColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Repartidor;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
    return this.repartidores;
  }

  getID() {
    return this.id;
  }


  getClienteLicencia(licencia: string) {
    this.repDoc = this.db.doc<Cliente>(`repartidores/${licencia}`);
    this.repartidor = this.repDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return {
            id: '',
            email: '',
            nombre: '',
            password: '',
            licencia: '',
            telefono: 0
          };
        } else {
          const datos = accion.payload.data() as Repartidor;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.repartidor;
  }
}
