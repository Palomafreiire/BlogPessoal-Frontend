import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { tema } from '../model/tema';


@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient) { }


    token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }

    getAllTema(): Observable<tema[]>{  //tem que botar [] porque vao ser todos os temas, ai bota o array []
        return this.http.get<tema[]>('http://localhost:8080/tema', this.token)
    }

    getByIdTema(id:number): Observable<tema>{  //mesma coisa que o delete, não precisa de objeto pq vai ser por id (igual ta no back)
        return this.http.get<tema>(`http://localhost:8080/tema/${id}`, this.token)
    }

    postTema(tema: tema): Observable<tema>{ // não~bota o array[] pq vai ser um tema por vez
      return this.http.post<tema>('http://localhost:8080/tema', tema, this.token)
    }

    putTema(tema: tema): Observable<tema>{
      return this.http.put<tema>('http://localhost:8080/tema', tema, this.token)
    }

    deleteTema (id:number){  // em delete não precisa de um observable pq não precisa de um objeto, no back faz todo o trbalho;
      return this.http.delete(`http://localhost:8080/tema/${id}`, this.token)    //tem que abrir uma crase ` para o delete
    }


}
