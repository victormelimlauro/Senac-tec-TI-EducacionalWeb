import { UsuarioService } from './../../usuarios/shared/usuario.service';
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
  formPlantoes: FormGroup;
  key: string;
  usuarios: Observable<any[]>;
  materias: Observable<any[]>;
  dias: Observable<any[]>;
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
      this.title= "Nova matéria";
      this.key = this.route.snapshot.paramMap.get('key');
      if (this.key) {
        this.title= "Editar matéria";
        const subscribe = this.plantoesService.getByKey(this.key)
          .subscribe((plantoes: any) => {

            subscribe.unsubscribe();
            this.formPlantoes.setValue({
              dia: plantoes.dia,
              numeroDia: null,
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
     // this.setNumeroDia(this.dia);
    }

    get dia() { return this.formPlantoes.get('dia'); }
    get numeroDia() { return this.formPlantoes.get('numeroDia'); }
    get sala() { return this.formPlantoes.get('sala'); }
    get hora_inicio() { return this.formPlantoes.get('hora_inicio'); }
    get hora_fim() { return this.formPlantoes.get('hora_fim'); }
    get materiaKey() { return this.formPlantoes.get('materiaKey'); }
    get materiaNome() { return this.formPlantoes.get('materiaNome'); }
    get professorKey() { return this.formPlantoes.get('professorKey'); }
    get professorNome() { return this.formPlantoes.get('professorNome'); }

    criarFormulario() {
      this.key = null;
      this.formPlantoes = this.formBuilder.group({
        dia: ['', Validators.required],
        numeroDia: [''],
        materiaKey: ['', Validators.required],
        materiaNome: [''],
        hora_inicio: ['', Validators.required],
        hora_fim: ['', Validators.required],
        professorKey: ['', Validators.required],
        professorNome: [''],
        sala: [''],
      });
    }


    setNumeroDia(dia: any) {
      dia= dia.value;
      if(dia == 'domingo'){
        const numeroDia = 1;
        this.numeroDia.setValue(numeroDia);
      }
      else if(dia === 'segunda'){
        const numeroDia = 2;
        this.numeroDia.setValue(numeroDia);
      }
      else if(dia === 'terca'){
        const numeroDia = 3;
        this.numeroDia.setValue(numeroDia);
      }
      else if(dia === 'quarta'){
        const numeroDia = 4;
        this.numeroDia.setValue(numeroDia);
      }
      else if(dia === 'quinta'){
        const numeroDia = 5;
        this.numeroDia.setValue(numeroDia);
      }
      else if(dia === 'sexta'){
        const numeroDia = 6;
        this.numeroDia.setValue(numeroDia);
      }
      else if(dia === 'sabado'){
        const numeroDia = 7;
        this.numeroDia.setValue(numeroDia);
      }
    }

    setMateriaNome(materias: any) {
      if (materias && this.formPlantoes.value.materiaKey) {
        const materiaNome = materias[0].text;
        this.materiaNome.setValue(materiaNome);
      } else {
        this.materiaNome.setValue('');
      }
    }

    setProfessorNome(professores: any) {
      if (professores && this.formPlantoes.value.materiaKey) {
        const professorNome = professores[0].text;
        this.professorNome.setValue(professorNome);
      } else {
        this.professorNome.setValue('');
      }
    }

    onSubmit() {
      this.setNumeroDia(this.dia);
      if (this.formPlantoes.valid) {
        if (this.key) {
          this.plantoesService.update(this.formPlantoes.value, this.key);
        } else {
          this.plantoesService.insert(this.formPlantoes.value);
        }
        this.criarFormulario();

        this.router.navigate(['plantoes']);
        this.toastr.success('Plantão salvo com sucesso!!!');
      }
    }

}
