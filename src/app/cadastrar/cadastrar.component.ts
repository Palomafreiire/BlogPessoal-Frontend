import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userLogin } from '../model/userLogin';
import { usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

    usuario: usuario = new usuario // instanciando um novo objeto como é em java, sempre bota em cima do construtor
    confirmarSenha: string
    tipoUsuario: string

  constructor( 
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) {
    
  }

  ngOnInit() {
    window.scroll(0,0)

  }

  confirmSenha(event: any) {
      this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario= event.target.value  
  }

  cadastrar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
        this.alertas.showAlertDanger('Senha incorreta!!')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((resp: usuario) => {
        this.usuario = resp
        this.router.navigate(["/entrar"])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      })
      } // pq eu quero que ele pegue o usuario que cadastrei que esta sendo preenchido, sendo mandado pro meu servidor; 
  
    }
  }



