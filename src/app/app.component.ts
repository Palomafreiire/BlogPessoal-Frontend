import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public auth: AuthService  ) //está aqui para conseguir acessar o metodo logado (criado em auth.service.ts) no html e tem que ser public para reconhecer no html
 {}
}
