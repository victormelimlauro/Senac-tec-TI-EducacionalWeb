import { TurmasService } from './../../turmas/shared/turmas.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ComunicadosService } from './../shared/comunicados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-form-comunicados',
  templateUrl: './form-comunicados.component.html',
  styleUrls: ['./form-comunicados.component.css']
})
export class FormComunicadosComponent implements OnInit {
  formComunicados: FormGroup;
  key: string;
  title: string;
  turmas: Observable<any[]>;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private comunicadosService: ComunicadosService,
                private toastr: ToastrService,
                private router: Router,
                private turmasService: TurmasService,
      ) { }

    ngOnInit() {
      this.turmas = this.turmasService.getAll();
      this.criarFormulario();
      this.title= "Nova turma";
      this.key = this.route.snapshot.paramMap.get('key');
      if (this.key) {
        this.title= "Editar turma";
        const turmasSubscribe = this.comunicadosService.getByKey(this.key)
          .subscribe((comunicados:any) => {

            turmasSubscribe.unsubscribe();
            this.formComunicados.setValue({nome:comunicados.nome});
          });
      }

    }

    get nome() { return this.formComunicados.get('nome'); }
    get dia() { return this.formComunicados.get('dia'); }
    get turmaKey() {return this.formComunicados.get('turmaKey'); }
    get turmaNome() { return this.formComunicados.get('turNome'); }
    // get descricao() { return this.formTurmas.get('descricao'); }

    criarFormulario() {
      this.key = null;
      this.formComunicados = this.formBuilder.group({
        nome: [''],
        dia: [''],
        turmaKey:[''],
        turmaNome: [''],
        // descricao: [''],
      });
    }

    setTurmaNome(turmas: any) {
      if (turmas) {
        const turmaNome = turmas[0].text;
        this.turmaNome.setValue(turmaNome);
      } else {
        this.turmaNome.setValue('');
      }
    }

    onSubmit() {
      if (this.formComunicados.valid) {
        if (this.key) {
          this.comunicadosService.update(this.formComunicados.value, this.key);
        } else {
          this.comunicadosService.insert(this.formComunicados.value);
        }
        this.router.navigate(['comunicados']);
        this.toastr.success('Turma salva com sucesso!!!');
      }
    }

  }
