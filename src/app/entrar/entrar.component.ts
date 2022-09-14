import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { userLogin } from '../model/userLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: userLogin = new userLogin()



  constructor(
    private auth: AuthService,
    private router: Router,   // para chamar as rotas para essa pagina
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)   // padrão
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: userLogin) =>{
      this.userLogin = resp

      environment.token = this.userLogin.token  //depois dele logar antes de ir pro inicio ele faz toda essas alterações
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id

      console.log(environment.token)  // na hora que ele logar, gera todos esses consoles p ver se pegou o que tava no userlogin e jogou para essas variaveis de enviroment
      console.log(environment.nome) // não precisa deixar isso no seu component, pode apagar.
      console.log(environment.foto)
      console.log(environment.id)

      this.router.navigate(['/inicio'])
     }, erro =>{
      if (erro.status == 401 || erro.status == 500){
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos')
      }
    })
  

  }
}
