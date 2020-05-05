import { Vendedor } from '../modelos/vendedor';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Tienda } from '../modelos/tienda';

@Injectable()
export class VendedorService {


  vendedorColeccion: AngularFirestoreCollection<Vendedor>;
  vendedorDoc: AngularFirestoreDocument<Vendedor>;
  vendedores: Observable<Vendedor[]>;
  vendedor: Observable<Vendedor>;
  subColl: AngularFirestore;
  sub: AngularFirestore;

  id: string;

  constructor(private db: AngularFirestore) {
    this.vendedorColeccion = db.collection('vendedores', ref => ref.orderBy('nombre'));
  }

  agregarVendedor(vendedor: Vendedor) {
    //  this.clientesColeccion.add(cliente);
    this.vendedorColeccion.doc(vendedor.rfc).set(vendedor);
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

  getID() {
    return this.id;
  }

  agregarTienda(rfc: string, value: Tienda) {
    this.vendedorColeccion.doc(rfc).collection('tiendas').doc(rfc).set(value);
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
