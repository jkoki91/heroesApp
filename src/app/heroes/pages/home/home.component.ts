import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [`
    .container{
      margin: 10px;
    }
  `]
})
export class HomeComponent {

  get auth(){
    return this.authService.auth
  }

  constructor( private authService: AuthService,
               private router: Router){}

  logout(){

    this.router.navigate(['./auth']);

  }
}
