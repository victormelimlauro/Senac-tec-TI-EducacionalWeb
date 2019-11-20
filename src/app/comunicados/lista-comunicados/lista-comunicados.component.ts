import { ComunicadosService } from './../shared/comunicados.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-comunicados',
  templateUrl: './lista-comunicados.component.html',
  styleUrls: ['./lista-comunicados.component.css']
})
export class ListaComunicadosComponent implements OnInit {
comunicados: Observable<any[]>;

  constructor(private comunicadosService: ComunicadosService,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
    this.comunicados = this.comunicadosService.getAll();
  }

  remover(key: string) {
    this.comunicadosService.remove(key)
      .then( (mensagem) => {
        this.toastr.success('Comunicado excluido com sucesso!');
      })
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
      });
  }

}

