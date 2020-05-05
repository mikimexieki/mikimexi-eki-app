import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteServicio } from '../../servicios/clientes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-clientes',
  templateUrl: './login-clientes.component.html',
  styleUrls: ['./login-clientes.component.css']
})

export class LoginClientesComponent implements OnInit {

  email: string;
  password: string;

  cliente: Cliente = {
    nombre: '',
    email: '',
    password: '',
    telefono : 0
  };

  clientes: Cliente[];

  id: string;

  @ViewChild('clienteForm') clienteForm: NgForm;
  constructor(private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute,
              private clientesService: ClienteServicio ) { }

  ngOnInit(): void {
  }

  registrar({ value, valid }: { value: Cliente, valid: boolean }) {

    console.log(value.email + ', ' + value.password);
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario coretamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
    else {
      // Agregar nuevo cliente
      let em = '';
      this.clientesService.getClienteEmail(value.email).subscribe(
        cliente => {
          if(cliente != null){
            em = cliente.email;
            this.flashMessages.show('El correo: ' + em + ' ya esta asociado con una cuenta', {
              cssClass: 'alert-danger',
              timeout: 4000
            });
          } else {
            this.clientesService.agregarCliente(value);
            this.clienteForm.resetForm();
            this.router.navigate([`clientes/email:${value.email}`]);
          }
        }
      );


     }
  }

  login({ value, valid }: { value: Cliente, valid: boolean }) {
    let em = '';
    this.clientesService.getClienteEmail(value.email).subscribe(
      cliente => {
        if (cliente === null) {
          em = cliente.email;
          this.flashMessages.show('El correo: ' + em + ' no esta asociado con una cuenta', {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        } else {
          this.clientesService.agregarCliente(value);
          this.clienteForm.resetForm();
          this.router.navigate([`clientes/email:${value.email}`]);
        }
      }
    );

  }
  // eliminar() {
  //   if (confirm('¿Seguro de que desea eliminar el cliente?')) {

  //     // this.clientesService.eliminarCliente(this.cliente);
  //     this.router.navigate(['/']);

  //   }
  // }

}
