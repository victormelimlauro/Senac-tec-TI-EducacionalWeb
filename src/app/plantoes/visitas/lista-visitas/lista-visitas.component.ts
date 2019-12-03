import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { VisitasService } from './../shared/visitas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-visitas',
  templateUrl: './lista-visitas.component.html',
  styleUrls: ['./lista-visitas.component.css']
})
export class ListaVisitasComponent implements OnInit {
  visitas: Observable<any>;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private visitasService: VisitasService,
              private toastr: ToastrService,
              private router: Router) {  }

  ngOnInit() {
    this.visitas = this.visitasService.getAll();
  }

  remover(key: string) {
    this.visitasService.remove(key)
      .then( (mensagem) => {
        this.toastr.success('Categoria excluida com sucesso!');
      })
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
      });
  }
}
