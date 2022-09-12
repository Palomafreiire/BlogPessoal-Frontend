import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) {}
    

    token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }

    getAllPostagem(): Observable<postagem[]>{
      return this.http.get<postagem[]>('http://localhost:8080/Postagem', this.token)  //igual o endpoint lá no back
    }

    GetByIdPostagem(id:number): Observable<postagem>{
      return this.http.get<postagem>(`http://localhost:8080/Postagem/${id}`, this.token)
    }

    postPostagem(postagem: postagem): Observable<postagem>{
      return this.http.post<postagem>('http://localhost:8080/Postagem',postagem,  this.token)
    }
  
    putPostagem(postagem: postagem): Observable<postagem>{
      return this.http.put<postagem>('http://localhost:8080/Postagem',postagem, this.token)
    }

    deletePostegem(id:number){
      return this.http.delete(`http://localhost:8080/Postagem/${id}`, this.token)
    }
}
