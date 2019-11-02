import { UsuarioService } from './../../../usuarios/shared/usuario.service';
import { MateriasService } from './../../../materias/shared/materias.service';
import { PlantoesService } from './../../shared/plantoes.service';

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-form-plantoes',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.css']
})
export class FormVisitasComponent implements OnInit {
  formVisitas: FormGroup;
  key: string;
  usuarios: Observable<any[]>;
  materias: Observable<any[]>;
  result: void;
  title: string;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private plantoesService: PlantoesService,
                private materiasService: MateriasService,
                private usuarioService: UsuarioService,
                private toastr: ToastrService,
                private router: Router
      ) { }

    ngOnInit() {
      this.usuarios = this.usuarioService.getAll();
      this.materias = this.materiasService.getAll();
      this.criarFormulario();

      this.key = this.route.snapshot.paramMap.get('key');
      if (this.key) {
        const subscribe = this.plantoesService.getByKey(this.key)
          .subscribe((plantoes: any) => {

            subscribe.unsubscribe();
            this.formVisitas.setValue({
              nome_aluno: plantoes.nome_aluno,
              dia: plantoes.dia,
              sala: plantoes.sala,
              materiaKey: plantoes.materiaKey,
              materiaNome: plantoes.materiaNome,
              hora_entrada: plantoes.hora_entrada,
              hora_saida: plantoes.hora_saida,
              professorKey: plantoes.professorKey,
              professorNome: plantoes.professorNome,

            });

          });
      }

      // this.title= "Nova matéria";
      // this.key = this.route.snapshot.paramMap.get('key');
      // if (this.key) {
      //   this.title= "Editar matéria";
      //   const materiasSubscribe = this.materiasService.getByKey(this.key)
      //     .subscribe((materias:any) => {

      //       materiasSubscribe.unsubscribe();
      //       this.FormPlantoes.setValue({nome:materias.nome});
      //     });
      // }
    }

    get nome_aluno() {return this.formVisitas.get('nome_aluno');}
    get dia() { return this.formVisitas.get('dia'); }
    get sala() { return this.formVisitas.get('sala'); }
    get materiaKey() { return this.formVisitas.get('materiaKey'); }
    get materiaNome() { return this.formVisitas.get('materiaNome'); }
    get hora_entrada() { return this.formVisitas.get('hora_entrada'); }
    get hora_saida() { return this.formVisitas.get('hora_saida'); }
    get professorKey() { return this.formVisitas.get('professorKey'); }
    get professorNome() { return this.formVisitas.get('professorNome'); }


    criarFormulario() {
      this.key = null;
      this.formVisitas = this.formBuilder.group({
        nome_aluno: ['', Validators.required],
        dia: ['', Validators.required],
        sala: [''],
        materiaKey: ['', Validators.required],
        materiaNome: [''],
        hora_entrada: ['', Validators.required],
        hora_saida: ['', Validators.required],
        professorKey: ['', Validators.required],
        professorNome: [''],

      });
    }


    setMateriaNome(materias: any) {
      if (materias && this.formVisitas.value.materiaKey) {
        const materiaNome = materias[0].text;
        this.materiaNome.setValue(materiaNome);
      } else {
        this.materiaNome.setValue('');
      }
    }

    setProfessorNome(professores: any) {
      if (professores && this.formVisitas.value.materiaKey) {
        const professorNome = professores[0].text;
        this.professorNome.setValue(professorNome);
      } else {
        this.professorNome.setValue('');
      }
    }

    onSubmit() {
      if (this.formVisitas.valid) {
        let result: Promise<{}>;

        if (this.key) {
          result = this.plantoesService.update(this.formVisitas.value, this.key);
        } else {
          result = this.plantoesService.insert(this.formVisitas.value);
        }
        this.criarFormulario();

        this.router.navigate(['plantoes']);
        this.toastr.success('Plantão salvo com sucesso!!!');
      }
    }

}
