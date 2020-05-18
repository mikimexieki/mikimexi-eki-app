import { Component, OnInit, ViewChild } from '@angular/core';
import { Vendedor } from '../../modelos/vendedor';
import { VendedorService } from '../../servicios/vendedor.services';
import { ActivatedRoute } from '@angular/router';
import { Tienda } from '../../modelos/tienda';
import { TiendaService } from '../../servicios/tienda.services';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
    styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {

  vendedor: Vendedor;
  s: string[];
  rfc: string;

  tienda: Tienda = {
    id: '',
    nombre: '',
    horario: '',
    direccion: '',
    telefono: 0
  }

  @ViewChild('tiendaAdd') tiendaAdd: NgForm;
  constructor(private vendedorService: VendedorService,
              private route: ActivatedRoute,
              private tiendaService: TiendaService,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.rfc = this.route.snapshot.params['rfc'];
    this.s = this.rfc.split(':');
    this.rfc = (this.s[1]);
    this.vendedorService.getVendedorWithRFC(this.rfc).subscribe(
      vendedor => {
        this.vendedor = vendedor;
      }
    );
  }


  agregar({ value, valid }: { value: Tienda, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario coretamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
    else {
      value.id = this.rfc;
      this.flashMessages.show('La tienda ha sido agregada',  { cssClass: 'alert-success', timeout: 4000});
      this.vendedorService.agregarTienda(this.rfc, value);
      this.tiendaAdd.resetForm();
    }
  }

}
