import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteServicio {

  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  id: string;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre'));
  }

  agregarCliente(cliente: Cliente) {
    //  this.clientesColeccion.add(cliente);

    this.clientesColeccion.doc(cliente.email).set(cliente);


  }

  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
    return this.clientes;
  }

  getID() {
    return this.id;
  }


  getClienteEmail(email: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${email}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return {
            id: '',
            email: '',
            nombre: '',
            password: '',
            direccion: '',
            telefono: 0
          };
        } else {
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

}


