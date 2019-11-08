import { ToastrService } from 'ngx-toastr';
import { PlantoesService } from './../shared/plantoes.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-plantoes',
  templateUrl: './lista-plantoes.component.html',
  styleUrls: ['./lista-plantoes.component.css']
})
export class ListaPlantoesComponent implements OnInit {
  plantoes: Observable<any>;
    constructor(private plantoesService:PlantoesService,
      private toastr: ToastrService) { }

  ngOnInit() {
    this.plantoes = this.plantoesService.getAll();
  }

  remover(key: string) {
    this.plantoesService.remove(key)
      .then( (mensagem) => {
        this.toastr.success('Categoria excluida com sucesso!');
      })
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
      });
  }
}
