import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-clientes',
  templateUrl: './login-clientes.component.html',
  styleUrls: ['./login-clientes.component.css']
})
export class LoginClientesComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    email: '',
    password: '',
    telefono : 0
  }

  email: string;
  passwors: string;

  id: string;

  constructor(private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // this.clientesService.getCliente(this.id).subscribe(cliente => {
    //   this.cliente = cliente;
    // });
  }

  guardar({ value, valid }: { value: Cliente, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario coretamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
    else {
      value.id = this.id;
      //modificar el cliente
      // this.clientesService.modificarCliente(value);
      this.router.navigate(['/clientes']);
    }
  }

  login(){
    this.router.navigate(['/clientes']);
  }

  // eliminar() {
  //   if (confirm('¿Seguro de que desea eliminar el cliente?')) {

  //     // this.clientesService.eliminarCliente(this.cliente);
  //     this.router.navigate(['/']);

  //   }
  // }

}
