import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepartidorServicio } from '../../servicios/repartidor.service';
import { LoginService } from 'src/app/servicios/login.service';
import { Repartidor } from '../../modelos/repartidor.model';

@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.component.html',
  styleUrls: ['./repartidores.component.css']
})
export class RepartidoresComponent implements OnInit {

  userID: string;
  nombre: string;
  mensaje: string = '';
  constructor(private route: ActivatedRoute,
    private repaServicio: RepartidorServicio,
    private ls: LoginService
  ) {
  }


  repartidores: Repartidor[];
  repartidor: Repartidor;
  s: string[];

  licencia: string;
  ngOnInit(): void {
    this.licencia = this.route.snapshot.params['id'];
    console.log(this.licencia);
    this.s = this.licencia.split(':');
    this.licencia = (this.s[1]);
    console.log(this.licencia);
    this.repaServicio.getClienteLicencia(this.licencia).subscribe(
      rep => {
        this.repartidor = rep;
        console.log(rep);
      }
    );
  }

  enviarMensaje() {
    console.log(this.mensaje);

  }

}
