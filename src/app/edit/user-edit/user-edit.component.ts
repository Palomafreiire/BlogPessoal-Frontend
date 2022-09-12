import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    usuario: usuario = new usuario()
    idUser: number
    confirmarSenha: string
    tipoUsuario: string


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == '') {
      // alert ('Sua sessão expirou, faça o login novamente!') tirei por enquanto enquanto termino o programa
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
}

tipoUser(event: any){
  this.tipoUsuario= event.target.value  
}

  atualizar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
        alert('Senha incorreta!!')
    }else{
      this.authService.atualizar(this.usuario).subscribe((resp: usuario) => {
        this.usuario = resp
        this.router.navigate(["/inicio"])
        alert('Usuário atualizado com sucesso! Faça o login novamente')
        environment.token=''
        environment.nome=''
        environment.foto=''
        environment.id=0

        this.router.navigate(['/entrar'])

      })
      } // pq eu quero que ele pegue o usuario que cadastrei que esta sendo preenchido, sendo mandado pro meu servidor; 
  
    }
    

  findByIdUser(id:number){
    this.authService.getByIdUser(id).subscribe((resp: usuario)=>{
      this.usuario = resp
    })
  }

}
