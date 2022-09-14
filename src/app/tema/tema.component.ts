import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { tema } from '../model/tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

    tema: tema = new tema()  // precisa instanciar para ser pego pelos ngs models
    listaTemas: tema[]


  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.alertas.showAlertDanger('Sua sessão expirou, faça o login novamente!') //tirei por enquanto enquanto termino o programa
      this.router.navigate(['/entrar'])
    }

    /*if(environment.tipo != 'adm'){
    this.alertas.showAlertInfo('Você precisa ser Adm para acessar essa rota')
    this.router.navigate(['/inicio'])
    }*/

    this.findAllTemas() // para que apareça os temas, ele vai listar todos os temas automaticamente
  }

    findAllTemas(){
      this.temaService.getAllTema().subscribe((resp: tema[])=>{
        this.listaTemas = resp
        
      })
    }

    cadastrar(){
      this.temaService.postTema(this.tema).subscribe((resp: tema)=>{
        this.tema = resp
        this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
        this.findAllTemas() // para mostrar tudo que tem 
        this.tema = new tema()
      })
    }
}
