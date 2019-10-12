import { TurmasService } from './../shared/turmas.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-turmas',
  templateUrl: './lista-turmas.component.html',
  styleUrls: ['./lista-turmas.component.css']
})
export class ListaTurmasComponent implements OnInit {
turmas: Observable<any[]>;

  constructor(private turmasService: TurmasService,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
    this.turmas = this.turmasService.getAll();
  }

  remover(key: string) {
    this.turmasService.remove(key)
      .then( (mensagem) => {
        this.toastr.success('Turma excluida com sucesso!');
      })
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
      });
  }

}

