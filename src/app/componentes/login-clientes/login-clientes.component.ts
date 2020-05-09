import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteServicio } from '../../servicios/clientes.service';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { config } from 'rxjs';
@Component({
  selector: 'app-login-clientes',
  templateUrl: './login-clientes.component.html',
  styleUrls: ['./login-clientes.component.css']
})

export class LoginClientesComponent implements OnInit {

  email: string;
  password: string;
  user : any;

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
              private clientesService: ClienteServicio,
              private loginService: LoginService ) { }

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
      this.loginService.registrarse(value.email, value.password)
        .then(res => {
          this.clientesService.agregarCliente(value);
          this.router.navigate([`clientes/email:${value.email}`]);
        })
        .catch(error => {
          this.flashMessages.show(error.message, {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        });
     }
  }

  login({ value, valid }: { value: Cliente, valid: boolean }) {
    let em = '';
    this.clientesService.getClienteEmail(value.email).subscribe(
      cliente => {
        em = cliente.email;
        if(em === ''){
          this.flashMessages.show('El correo: ' + value.email + ' no está asociado con una cuenta', {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        }else{
          this.loginService.login(value.email, value.password)
            .then(res => {
              this.router.navigate([`clientes/email:${value.email}`]);
            })
            .catch(error => {
              this.flashMessages.show(error.message, {
                cssClass: 'alert-danger',
                timeout: 4000
              });
            });
        }
      },
      error => {
        confirm(error);
      }
    );

  }

}
