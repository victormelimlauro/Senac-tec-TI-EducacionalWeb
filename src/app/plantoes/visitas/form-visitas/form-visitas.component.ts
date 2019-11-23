import { VisitasService } from './../shared/visitas.service';
import { UsuarioService } from './../../../usuarios/shared/usuario.service';
import { MateriasService } from './../../../materias/shared/materias.service';
import { PlantoesService } from './../../shared/plantoes.service';

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.css']
})
export class FormVisitasComponent implements OnInit {
  [x: string]: any;
  formVisitas: FormGroup;
  key: string;
  usuarios: Observable<any[]>;
  professores: Observable<any[]>;
  materias: Observable<any[]>;
  visitas: Observable<any[]>;
  result: void;
  title: string;
  nome_aluno_busca: string;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private plantoesService: PlantoesService,
                private visitasService: VisitasService,
                private materiasService: MateriasService,
                private usuarioService: UsuarioService,
                private toastr: ToastrService,
                private router: Router
      ) { }

    ngOnInit() {
      this.title= "Nova matéria";
      this.professores = this.usuarioService.getAll();
      this.materias = this.materiasService.getAll();
      this.criarFormulario();

      this.key = this.route.snapshot.paramMap.get('key');
      if (this.key) {
        this.title= "Editar matéria";
        // const subscribe = this.visitasService.getByKey(this.key)
        //   .subscribe((visitas: any) => {

        //     subscribe.unsubscribe();
        //     this.formVisitas.setValue({
        //       nome_aluno: visitas.nome_aluno,
        //       dia: visitas.dia,
        //       sala: visitas.sala,
        //       materiaKey: visitas.materiaKey,
        //       materiaNome: visitas.materiaNome,
        //       hora_entrada: visitas.hora_entrada,
        //       hora_saida: visitas.hora_saida,
        //       professorKey: visitas.professorKey,
        //       professorNome: visitas.professorNome,

        //     });

        //   });
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
        nome_aluno: [''],
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

    getAluno(){
      this.visitas = this.visitasService.getByAluno(this.nome_aluno_busca);
    }

    onSubmit() {
      if (this.formVisitas.valid) {
      //  let result: Promise<{}>;

        if (this.key) {
          this.plantoesService.update(this.formVisitas.value, this.key);
        } else {
          this.plantoesService.insert(this.formVisitas.value);
        }
        this.criarFormulario();

        this.router.navigate(['visitas']);
        this.toastr.success('Plantão salvo com sucesso!!!');
      }
    }

}
