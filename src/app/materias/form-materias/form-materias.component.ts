import { MateriasService } from './../shared/materias.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-materias',
  templateUrl: './form-materias.component.html',
  styleUrls: ['./form-materias.component.css']
})
export class FormMateriasComponent implements OnInit {
formMaterias: FormGroup;
key: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private materiasService: MateriasService,
              private toastr: ToastrService,
              private router: Router
    ) { }

  ngOnInit() {
    this.criarFormulario();
    this.key = this.route.snapshot.paramMap.get('key');
    if (this.key) {
      const materiasSubscribe = this.materiasService.getByKey(this.key)
        .subscribe((materias:any) => {

          materiasSubscribe.unsubscribe();
          this.formMaterias.setValue({nome:materias.nome});
        });
    }

  }

  get nome() { return this.formMaterias.get('nome'); }
  get descricao() { return this.formMaterias.get('descricao'); }

  criarFormulario() {
    this.key = null;
    this.formMaterias = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
    });
  }

  onSubmit() {
    if (this.formMaterias.valid) {
      if (this.key) {
        this.materiasService.update(this.formMaterias.value, this.key);
      } else {
        this.materiasService.insert(this.formMaterias.value);
      }
      this.router.navigate(['categorias']);
      this.toastr.success('Categoria salva com sucesso!!!');
    }
  }

}
