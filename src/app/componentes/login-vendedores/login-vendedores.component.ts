import { Component, OnInit, ViewChild } from '@angular/core';
import { Vendedor } from '../../modelos/vendedor';
import { FlashMessagesService } from 'angular2-flash-messages';
import { VendedorService } from '../../servicios/vendedor.services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login-vendedores',
  templateUrl: './login-vendedores.component.html',
  styleUrls: ['./login-vendedores.component.css']
})
export class LoginVendedoresComponent implements OnInit {

  email: string;
  password: string;

  vendedor: Vendedor = {
    rfc: '',
    nombre: '',
    email: '',
    password: '',
    telefono: 0
  };

  vendedores: Vendedor[];


  @ViewChild('vendedorForm') vendedorForm: NgForm;
  constructor(private flashMessages: FlashMessagesService,
              private vendedorService: VendedorService,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService) { }

  ngOnInit(): void {
  }


  login({ value, valid }: { value: Vendedor, valid: boolean }) {
    let em = '';
    this.vendedorService.getVendedorWithRFC(value.rfc).subscribe(
      vendedor => {
        em = vendedor.rfc;
        if (em === '') {
          this.flashMessages.show('El rfc: ' + value.rfc + ' no está asociado con una cuenta', {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        } else {
          if (vendedor.password === value.password) {
             this.loginService.login(vendedor.email, value.password).then(res =>{
               this.router.navigate([`vendedor/rfc:${value.rfc}`]);}
             ).catch(error => console.log(error));
          } else {
            this.flashMessages.show('Contraseña incorrecta', {
              cssClass: 'alert-danger',
              timeout: 4000
            });
          }
        }
      },
      error => {
        confirm(error);
      }
    );
  }

  registrar({ value, valid }: { value: Vendedor, valid: boolean }) {

    // console.log(value.email + ', ' + value.rfc);
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario coretamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
    else{
      this.vendedorService.agregarVendedor(value);
      this.loginService.registrarse(value.email, value.password)
        .then(res => {
          this.router.navigate([`vendedor/rfc:${value.rfc}`]);
        })
        .catch(error => {
          this.flashMessages.show(error.message, {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        });
    }


  }

}
