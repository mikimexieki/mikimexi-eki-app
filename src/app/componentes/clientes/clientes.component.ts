import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteServicio } from 'src/app/servicios/clientes.service';
import { Cliente } from 'src/app/modelos/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute,
              private clientesServicio: ClienteServicio) {

  }


  clientes: Cliente[];
  s : string[];
  cliente : Cliente;

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
  }

}
