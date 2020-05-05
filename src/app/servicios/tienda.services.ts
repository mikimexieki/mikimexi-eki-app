import { Tienda } from '../modelos/tienda';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TiendaService {

  tiendaColeccion: AngularFirestoreCollection<Tienda>;
  tiendaDoc: AngularFirestoreDocument<Tienda>;
  tiendas: Observable<Tienda[]>;
  tienda: Observable<Tienda>;
  sub: AngularFirestore;

  agregarTienda(rfc: string, value: Tienda){
    this.sub.collection('tiendas').doc(rfc).set(value);
    this.tiendaColeccion.doc( rfc ).set( value );
    this.tiendaColeccion.add(value);
  }
}
