import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
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

    atualizar(usuario: usuario): Observable<usuario>{
      return this.http.put<usuario>('http://localhost:8080/usuario/atualizar', usuario) // mesmos endpoints que estão no eclipse em controller usuario
    }

    getByIdUser(id: number): Observable<usuario>{
      return this.http.get<usuario>(`http://localhost:8080/usuario/${id}`)
    }

    logado(){  // ele vai verificar se existe um token no meu enviroment se está preenchido, e ele só vai ser preenchido no entrar; e eu esse metodo vai retornar um true ou false
      let ok: boolean = false

        if (environment.token != ''){
          ok= true
        }

      return ok

    }

    adm(){  // ele vai verificar se existe um token no meu enviroment se está preenchido, e ele só vai ser preenchido no entrar; e eu esse metodo vai retornar um true ou false
      let ok: boolean = false

        if (environment.tipo == 'adm'){
          ok= true
        }

      return ok

    }



}
