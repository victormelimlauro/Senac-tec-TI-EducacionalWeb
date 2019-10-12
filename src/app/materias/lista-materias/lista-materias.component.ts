import { MateriasService } from './../shared/materias.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.css']
})
export class ListaMateriasComponent implements OnInit {
materias: Observable<any[]>;

  constructor(private materiasService: MateriasService,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
    this.materias = this.materiasService.getAll();
  }

  remover(key: string) {
    this.materiasService.remove(key)
      .then( (mensagem) => {
        this.toastr.success('Materia excluida com sucesso!');
      })
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
      });
  }

}
