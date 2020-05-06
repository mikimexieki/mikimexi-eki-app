import { Component, OnInit, ViewChild } from '@angular/core';
import { Vendedor } from '../../modelos/vendedor';
import { FlashMessagesService } from 'angular2-flash-messages';
import { VendedorService } from '../../servicios/vendedor.services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

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
              private route: ActivatedRoute,) { }

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
            this.router.navigate([`vendedor/rfc:${value.rfc}`]);
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

    console.log(value.email + ', ' + value.rfc);
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario coretamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
    else {
      // Agregar nuevo vendedor
      let em = '';
      console.log(value);
      this.vendedorService.getVendedorWithRFC(value.rfc).subscribe(
        vendedor => {
          em = vendedor.rfc;
          if (em === value.rfc) {
            em = vendedor.rfc;
            this.flashMessages.show('El RFC: ' + em + ' ya está asociado con una cuenta', {
              cssClass: 'alert-danger',
              timeout: 4000
            });
          } else {
            this.vendedorService.agregarVendedor(value);
            this.vendedorForm.resetForm();
            this.router.navigate([`vendedor/rfc:${value.rfc}`]);
          }
        }
      );
    }

  }

}
