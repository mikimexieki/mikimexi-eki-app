import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteServicio } from 'src/app/servicios/clientes.service';
import { Cliente } from 'src/app/modelos/cliente';
import { VendedorService } from '../../servicios/vendedor.services';
import { Tienda } from '../../modelos/tienda';
import { LoginService } from '../../servicios/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from '../../servicios/chat.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  userID: string;
  nombre: string;
  mensaje: string = '';
  constructor(private route: ActivatedRoute,
              private clientesServicio: ClienteServicio,
              private vendedorService: VendedorService,
              private ls: LoginService
              ) {
                            }


  clientes: Cliente[];
  cliente : Cliente;
  s : string[];

  tiendas: Tienda[];

  email: string;
  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];
    this.s = this.email.split(':');
    this.email = (this.s[1]);
    this.clientesServicio.getClienteEmail(this.email).subscribe(
      cliente => {
        this.cliente = cliente;
      }
    );
    this.vendedorService.getTiendas().subscribe(
      tienda => {
        this.tiendas = tienda;
        console.log(tienda);
      }
    );
  }

  enviarMensaje(){
    console.log(this.mensaje);

  }


}
