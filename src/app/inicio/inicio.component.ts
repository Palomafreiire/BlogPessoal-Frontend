import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
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
    tituloPost: string

    tema: tema = new tema()
    listaTemas: tema[]
    idTema: number
    nomeTema: string

    usuario: usuario = new usuario()
    idUser = environment.id

    key = 'data'  //ordenaçaõ de postagem, ordenar por data de preenchimento
    reverse = true // normalmente ele é falso, fica da primeira postagem para o útlimo mas colocando true vai reverter essa ordem. Vai chamar essa variavel nos ngFor no inicio/html

  constructor( 
    private router: Router,  //tem que sempre chamar uma variavel local de router se for usar na aplicação;
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
      
    window.scroll(0,0)
    

    if(environment.token == '') {
      // alert ('Sua sessão expirou, faça o login novamente!') tirei por enquanto enquanto termino o programa
      this.router.navigate(['/entrar'])
    }

    this.gelAllTemas()
    this.getAllPostagem()
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

  getAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: usuario) => {
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
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new postagem()
      this.getAllPostagem()
    })
  }

  findByTituloPostagem(){

    if(this.tituloPost == ' '){
      this.getAllPostagem()
    }else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: postagem[]) =>{
        this.listaPostagens = resp
      })
    }  
  }

  findByNomeTema(){

    if(this.nomeTema == ' '){
      this.gelAllTemas()
    }else{
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: tema[]) =>{
        this.listaTemas = resp
      })
    }
  }



}
