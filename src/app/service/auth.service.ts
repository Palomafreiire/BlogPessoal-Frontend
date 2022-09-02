import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userLogin } from '../model/userLogin';
import { usuario } from '../model/usuario';

// esse service vai funcionar como se fosse o postman para o backend

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

    entrar(userLogin: userLogin): Observable<userLogin>{  //tem que chamar esse observable para não dar erro quando for chamar o post 'garante que o endpoint localhost:8080 vai receber um objeto do tipo user logar'
      return this.http.post<userLogin>('http://localhost:8080/usuario/logar', userLogin) // parametros que puxamos lá no controller usuario em post logar
    }



    cadastrar(usuario: usuario): Observable<usuario>{
      return this.http.post<usuario>('http://localhost:8080/usuario/cadastrar', usuario) // mesmos endpoints que estão no eclipse em controller usuario
    }
}
