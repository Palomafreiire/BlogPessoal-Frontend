import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { postagem } from 'src/app/model/postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: postagem = new postagem()
  idPost: number

 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService
  
  ) { }

  ngOnInit() {

    window.scroll(0,0)
    
    if(environment.token == '') {
      // alert ('Sua sessão expirou, faça o login novamente!') tirei por enquanto enquanto termino o programa
      this.router.navigate(['/entrar'])
    }

    this.idPost= this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
   
  }

  findByIdPostagem(id:number){
    this.postagemService.GetByIdPostagem(id).subscribe((resp: postagem) =>{
      this.postagem= resp
    })
  }


  apagar(){
    this.postagemService.deletePostegem(this.idPost).subscribe(()=>{
      alert('Postagem Apagada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
