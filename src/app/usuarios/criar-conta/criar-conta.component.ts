import { MateriasService } from './../../materias/shared/materias.service';
import { TurmasService } from './../../turmas/shared/turmas.service';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../shared/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {
  [x: string]: any;
  materias: Observable<any[]>;
  turmas: Observable<any[]>;
  formCriarConta: FormGroup;
  public aluno: boolean = false;
  public professor: boolean = false;
  public administrator: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toast: ToastrService,
    private turmasService: TurmasService,
    private materiasService: MateriasService ){ }

  ngOnInit() {
    this.criarFormulario();
    this.materias = this.materiasService.getAll();
    this.turmas = this.turmasService.getAll();
  }

  get nome() { return this.formCriarConta.get('nome'); }
  get email() { return this.formCriarConta.get('email'); }
  get senha() { return this.formCriarConta.get('senha'); }
  get tipo() { return this.formCriarConta.get('tipo'); }
  get atributo() { return this.formCriarConta.get('atributo'); }
  get turma() { return this.formCriarConta.get('truma'); }

  criarFormulario() {
    this.formCriarConta = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      tipo: [''],
      materia: [''],
      turma: [''],
    });
  }

  setTipo(tipo: any){
    console.log(tipo)
    if (tipo[0].text == "Aluno") {
      this.aluno=true;
      this.professor=false;
  } else if (tipo[0].text == "Professor") {
      this.professor=true;
      this.aluno=false;
    }
    // if (tipo[0].text == "Administrator") {
    //   this.professor=false;
    //   this.aluno=false;
    // }
    else {
     this.professor=false;
     this.aluno=false;
    }
  }

  setTurmaNome(turmas: any) {
    if (turmas && this.CriarConta.value.turmaKey) {
      const turmaNome = turmas[0].text;
      this.turmaNome.setValue(turmaNome);
    } else {
      this.turmaNome.setValue('');
    }
  }
  setMateriaNome(materias: any) {
    if (this.materias && this.CriarConta.value.materiaKey) {
      const materiaNome = materias[0].text;
      this.materiaNome.setValue(materiaNome);
    } else {
      this.materiaNome.setValue('');
    }
  }


  onSubmit() {
    if (this.formCriarConta.valid) {
      this.usuarioService.criarConta(this.formCriarConta.value)
        .then(() => {
          this.toast.success('Sua conta foi criada com sucesso.');
          // this.router.navigate(['/login']);
        })
        .catch((mensagem: string) => {
          this.toast.error(mensagem);
        });
    }
  }
}
