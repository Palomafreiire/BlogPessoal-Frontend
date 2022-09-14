import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

    @Input()  message: string  //importar uma variavel que está em outro componente utiliza o @input
    @Input() type: string = 'success'  // : usa pro tipo da variavel e = é para receber o valor da variavel


  constructor(
    public modal: BsModalRef
  ) { }

  ngOnInit(){
  }

  onClose(){
    this.modal.hide()
  }

}
