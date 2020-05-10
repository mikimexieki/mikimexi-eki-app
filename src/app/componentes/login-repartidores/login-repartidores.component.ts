import { Component, OnInit, ViewChild } from '@angular/core';
import { Repartidor } from '../../modelos/repartidor.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { RepartidorServicio } from '../../servicios/repartidor.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-repartidores',
  templateUrl: './login-repartidores.component.html',
  styleUrls: ['./login-repartidores.component.css']
})
export class LoginRepartidoresComponent implements OnInit {

  repartidor: Repartidor = {
    nombre: '',
    email: '',
    password: '',
    telefono: 0,
    licencia: ''
  };


  @ViewChild('repartidorFormReg') repartidorFormReg: NgForm;
  @ViewChild('repartidorForm') repartidorForm: NgForm;
  constructor(private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute,
              private repartidorServicio: RepartidorServicio,
              private loginService: LoginService) { }

  ngOnInit(): void {
  }


  login({ value, valid }: { value: Repartidor, valid: boolean }) {

    if(!valid){
      this.flashMessages.show('Por favor llena el formulario coretamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }else{
      let em = '';
      this.repartidorServicio.getClienteLicencia(value.licencia).subscribe(
        rep => {
          em = rep.licencia;
          if (em === '') {
            this.flashMessages.show('La licencia: ' + value.licencia + ' no está asociado con una cuenta', {
              cssClass: 'alert-danger',
              timeout: 4000
            });
          } else {
            this.loginService.login(rep.email, value.password)
              .then(res => {
                this.router.navigate([`repartidores/id:${value.licencia}`]);
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


  registrarse({ value, valid }: { value: Repartidor, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario coretamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
    else{
      console.log('llega');
      this.loginService.registrarse(value.email, value.password)
        .then(res => {
          this.repartidorServicio.agregarRepartidor(value);
          this.router.navigate([`repartidores/id:${value.licencia}`]);
        })
        .catch(error => {
          this.flashMessages.show(error.message, {
            cssClass: 'alert-danger',
            timeout: 4000
          });
          if(error.status == 400){
            confirm('confirm')
          }

        });
    }
  }
}
