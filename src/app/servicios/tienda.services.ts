import { Tienda } from '../modelos/tienda';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Vendedor } from '../modelos/vendedor';

@Injectable()
export class TiendaService {

  tiendaColeccion: AngularFirestoreCollection<Tienda>;
  col : AngularFirestoreCollection<Vendedor>
  tiendaDoc: AngularFirestoreDocument<Tienda>;
  tiendas: Observable<Tienda[]>;
  tienda: Observable<Tienda>;
  sub: AngularFirestore;
  vendedor : Vendedor;

  agregarTienda(rfc: string, value: Tienda){
    this.vendedor = {
      rfc: 'id',
      nombre: 'Dany',
      email: 'a@c.com',
      password: '123456',
      telefono: 3112312
    };
    confirm(rfc);
    this.col.doc(rfc).set(this.vendedor);
    this.col.add(this.vendedor).then(res => console.log(res)).catch(error => console.log(error));
  }

  agregarVendedor(vendedor: Vendedor) {
    confirm(vendedor.nombre);
    console.log(vendedor);
    //  this.clientesColeccion.add(cliente);
    this.col.doc(vendedor.rfc).set(vendedor);
  }
}
