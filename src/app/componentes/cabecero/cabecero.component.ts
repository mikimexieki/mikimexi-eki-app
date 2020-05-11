import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else { this.isLoggedIn = false; }
    });
  }

  logout() {
    if(confirm('¿Desea salir de su cuenta?')){
      this.loginService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    }
  }
}
