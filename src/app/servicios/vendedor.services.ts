import { Vendedor } from '../modelos/vendedor';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Tienda } from '../modelos/tienda';

@Injectable()
export class VendedorService {


  vendedorColeccion: AngularFirestoreCollection<Vendedor>;
  tiendaColeccion: AngularFirestoreCollection<Tienda>;
  vendedorDoc: AngularFirestoreDocument<Vendedor>;
  vendedores: Observable<Vendedor[]>;
  tiendas: Observable<Tienda[]>;
  vendedor: Observable<Vendedor>;
  subColl: AngularFirestore;
  sub: AngularFirestore;

  id: string;

  constructor(private db: AngularFirestore) {
    this.vendedorColeccion = db.collection('vendedores', ref => ref.orderBy('nombre'));
    this.tiendaColeccion = db.collection('tiendas', ref => ref.orderBy('nombre'));
  }

  agregarVendedor(vendedor: Vendedor) {
    //  this.clientesColeccion.add(cliente);
    this.vendedorColeccion.doc(vendedor.rfc).set(vendedor);

  }

  agregarTienda(rfc: string, value: Tienda) {
    this.tiendaColeccion.doc(rfc).set(value);
  }

  getVendedores(): Observable<Vendedor[]> {
    this.vendedores = this.vendedorColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Vendedor;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
    return this.vendedores;
  }

  getTiendas(): Observable<Vendedor[]> {
    this.tiendas = this.tiendaColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Tienda;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
    return this.tiendas;
  }

  getID() {
    return this.id;
  }

  getVendedorWithRFC(rfc: string) {
    this.vendedorDoc = this.db.doc<Vendedor>(`vendedores/${rfc}`);
    this.vendedor = this.vendedorDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return {
            id: '',
            rfc: '',
            email: '',
            nombre: '',
            password: '',
            telefono: 0
          };
        } else {
          const datos = accion.payload.data() as Vendedor;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.vendedor;
  }

}
