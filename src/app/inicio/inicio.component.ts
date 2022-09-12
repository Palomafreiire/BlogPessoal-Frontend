import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    postagem: postagem = new postagem()
    listaPostagens: postagem[]

    tema: tema = new tema()
    listaTemas: tema[]
    idTema: number

    usuario: usuario = new usuario()
    idUser = environment.id

  constructor( 
    private router: Router,  //tem que sempre chamar uma variavel local de router se for usar na aplicação;
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      // alert ('Sua sessão expirou, faça o login novamente!') tirei por enquanto enquanto termino o programa
      this.router.navigate(['/entrar'])
    }

    this.gelAllTemas()
    this.getAllPostagens()
  }
  gelAllTemas(){
    this.temaService.getAllTema().subscribe((resp: tema[]) =>{
      this.listaTemas = resp
    })

  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp:tema)=>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: usuario)=>{
      this.usuario = resp
    })
  }

  publicar(){  //fazendo o relacionamento das tabelas
    this.tema.id=this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: postagem) =>{
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new postagem()
      this.getAllPostagens()
    })
  }


}
