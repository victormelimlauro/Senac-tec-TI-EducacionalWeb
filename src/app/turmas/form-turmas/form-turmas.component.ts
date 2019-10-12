import { TurmasService } from './../shared/turmas.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-turmas',
  templateUrl: './form-turmas.component.html',
  styleUrls: ['./form-turmas.component.css']
})
export class FormTurmasComponent implements OnInit {
formTurmas: FormGroup;
key: string;
title: string;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private turmasService: TurmasService,
              private toastr: ToastrService,
              private router: Router
    ) { }

  ngOnInit() {
    this.criarFormulario();
    this.title= "Nova turma";
    this.key = this.route.snapshot.paramMap.get('key');
    if (this.key) {
      this.title= "Editar turma";
      const turmasSubscribe = this.turmasService.getByKey(this.key)
        .subscribe((turmas:any) => {

          turmasSubscribe.unsubscribe();
          this.formTurmas.setValue({nome:turmas.nome});
        });
    }

  }

  get nome() { return this.formTurmas.get('nome'); }
  // get descricao() { return this.formTurmas.get('descricao'); }

  criarFormulario() {
    this.key = null;
    this.formTurmas = this.formBuilder.group({
      nome: ['', Validators.required],
      // descricao: [''],
    });
  }

  onSubmit() {
    if (this.formTurmas.valid) {
      if (this.key) {
        this.turmasService.update(this.formTurmas.value, this.key);
      } else {
        this.turmasService.insert(this.formTurmas.value);
      }
      this.router.navigate(['turmas']);
      this.toastr.success('Turma salva com sucesso!!!');
    }
  }

}
