import { UsuarioService } from './../../usuarios/shared/usuario.service';
import { TurmasService } from './../../turmas/shared/turmas.service';
import { MateriasService } from './../../materias/shared/materias.service';
import { PlantoesService } from './../shared/plantoes.service';

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-plantoes',
  templateUrl: './form-plantoes.component.html',
  styleUrls: ['./form-plantoes.component.css']
})
export class FormPlantoesComponent implements OnInit {
  formProduto: FormGroup;
  key: string;
  turmas: Observable<any[]>;
  materias: Observable<any[]>;
  private file: File = null;
  imgUrl = '';
  filePath = '';
  result: void;
  title: string;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private plantoesService: PlantoesService,
                private turmasService: TurmasService,
                private materiasService: MateriasService,
                private toastr: ToastrService,
                private router: Router
      ) { }

    ngOnInit() {
      this.criarFormulario();
      this.turmas = this.turmasService.getAll();
      this.materias = this.materiasService.getAll();

      this.key = this.route.snapshot.paramMap.get('key');
      if (this.key) {
        const subscribe = this.plantoesService.getByKey(this.key)
          .subscribe((plantoes: any) => {

            subscribe.unsubscribe();
            this.formProduto.setValue({
              dia: plantoes.dia,
              materiaKey: plantoes.materiaKey,
              materiaNome: plantoes.materiaNome,
              hora_inicio: plantoes.hora_inicio,
              hora_fim: plantoes.hora_fim,
              professorKey: plantoes.professorKey,
              professorNome: plantoes.professorNome,
              sala: plantoes.sala,
            });

          });
      }

      this.title= "Nova matéria";
      this.key = this.route.snapshot.paramMap.get('key');
      if (this.key) {
        this.title= "Editar matéria";
        const materiasSubscribe = this.materiasService.getByKey(this.key)
          .subscribe((materias:any) => {

            materiasSubscribe.unsubscribe();
            // this.FormPlantoes.setValue({nome:materias.nome});
          });
      }
    }

    get nome() { return this.formProduto.get('nome'); }
    get descricao() { return this.formProduto.get('descricao'); }
    get preco() { return this.formProduto.get('preco'); }
    get materiaKey() { return this.formProduto.get('materiaKey'); }
    get materiaNome() { return this.formProduto.get('materiaNome'); }
    get professorKey() { return this.formProduto.get('professorKey'); }
    get professorNome() { return this.formProduto.get('professorNome'); }

    criarFormulario() {
      this.key = null;
      this.formProduto = this.formBuilder.group({
        materiaKey: ['', Validators.required],
        materiaNome: [''],
        hora_inicio: ['', Validators.required],
        hora_fim: ['', Validators.required],
        professorKey: ['', Validators.required],
        professorNome: [''],
        sala: [''],
      });
    }


    setMateriaNome(materias: any) {
      if (materias && this.formProduto.value.materiaKey) {
        const materiaNome = materias[0].text;
        this.materiaNome.setValue(materiaNome);
      } else {
        this.materiaNome.setValue('');
      }
    }

    setProfessorNome(professores: any) {
      if (professores && this.formProduto.value.materiaKey) {
        const professorNome = professores[0].text;
        this.professorNome.setValue(professorNome);
      } else {
        this.professorNome.setValue('');
      }
    }

    onSubmit() {
      if (this.formProduto.valid) {
        let result: Promise<{}>;

        if (this.key) {
          result = this.plantoesService.update(this.formProduto.value, this.key);
        } else {
          result = this.plantoesService.insert(this.formProduto.value);
        }
        this.criarFormulario();

        this.router.navigate(['plantoes']);
        this.toastr.success('Plantão salvo com sucesso!!!');
      }
    }

}
