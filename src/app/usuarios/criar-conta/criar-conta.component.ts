import { MateriasService } from './../../materias/shared/materias.service';
import { TurmasService } from './../../turmas/shared/turmas.service';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../shared/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  public novo_usr: boolean = true;
  key: string;
  title: string;
  botao_submit: string;
  tipo_usr: string;



  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private turmasService: TurmasService,
    private materiasService: MateriasService ){ }

  ngOnInit() {

    this.materias = this.materiasService.getAll();
    this.turmas = this.turmasService.getAll();

    this.title= "Criar conta";
    this.botao_submit="Criar conta";

    this.key = this.route.snapshot.paramMap.get('key'); // Pega key da rota
    if (this.key) {
           this.novo_usr = false;
           this.title= "Editar conta";
           this.botao_submit="Editar conta"
           this.criarFormulario2();

       //Se não passar esta criando novo se passar edita registro
      //Consulta com parametro - key
      const usuarioSubscribe = this.usuarioService.getByKey(this.key)
      //Suscribe escuta na tabela e verificcategoriasServicea se encontrou o valor
        .subscribe((usuarios:any) => {
          usuarioSubscribe.unsubscribe();
          this.formCriarConta.setValue({nome:usuarios.nome,
            email:usuarios.email,
            tipo:usuarios.tipo,
             senha:"",
            materia:"",
            materiaNome:"",
            turma: "",
            turmaNome: "",
            atributo: "",
            atributoNome: "",
            });

            if(usuarios.tipo == 'aluno') {
              this.formCriarConta.setValue({
                nome:usuarios.nome,
                email:usuarios.email,
                tipo:usuarios.tipo,
                senha:"",
                materia:"",
                materiaNome:"",
                turma:usuarios.atributoKey,
                turmaNome:usuarios.atributoNome,
                atributo: "",
                atributoNome: "",
                });
                this.tipo_usr = usuarios.tipo;
                this.setTipo(this.tipo_usr);

              } else if(usuarios.tipo == 'professor') {
                this.formCriarConta.setValue({
                  nome:usuarios.nome,
                  email:usuarios.email,
                  tipo:usuarios.tipo,
                  senha:"",
                  materia:usuarios.atributoKey,
                  materiaNome:usuarios.atributoNome,
                  turma: "",
                  turmaNome: "",
                  atributo: "",
                  atributoNome: "",
                  });
                  this.tipo_usr = usuarios.tipo;
                  this.setTipo(this.tipo_usr);
                }
        });

    }
    else {
      this.criarFormulario();
    }

    //  this.setTipo(this.tipo_usr);
     }

  get nome() { return this.formCriarConta.get('nome'); }
  get email() { return this.formCriarConta.get('email'); }
  get senha() { return this.formCriarConta.get('senha'); }
  get tipo() { return this.formCriarConta.get('tipo'); }
  get atributo() { return this.formCriarConta.get('atributo'); }
  get atributoNome() { return this.formCriarConta.get('atributoNome'); }
  get turma() { return this.formCriarConta.get('turma'); }
  get turmaNome() { return this.formCriarConta.get('turmaNome'); }
  get materia() { return this.formCriarConta.get('materia'); }
  get materiaNome() { return this.formCriarConta.get('materiaNome'); }


  criarFormulario() {
    this.formCriarConta = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      tipo: [''],
      materia: [''],
      materiaNome: [''],
      turma: [''],
      turmaNome:[''],
      atributo:[''],
      atributoNome:[''],
    });
  }
  criarFormulario2() {
    this.formCriarConta = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [''],
      tipo: [''],
      materia: [''],
      materiaNome: [''],
      turma: [''],
      turmaNome:[''],
      atributo:[''],
      atributoNome:[''],
    });
  }

  setTipo(tipo: any){
    console.log(tipo[0].text);
    if (tipo[0].text == "Aluno" ||  tipo == "aluno" ) {
      this.aluno=true;
      this.professor=false;
  } else if (tipo[0].text == "Professor" ||  tipo == "professor" ) {
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
  //   if (tipo == "Aluno" || tipo[0].text == "aluno") {
  //     this.aluno=true;
  //     this.professor=false;
  // } else if (tipo == "Professor") {
  //     this.professor=true;
  //     this.aluno=false;
  //   }
  }

  setTurmaNome(turmas: any) {
    if (turmas) {
      const turmaNome = turmas[0].text;
      this.turmaNome.setValue(turmaNome);
    } else {
      this.turmaNome.setValue('');
    }
  }

  setMateriaNome(materias: any) {
    if (materias) {
      const materiaNome = materias[0].text;
      this.materiaNome.setValue(materiaNome);
    } else {
      this.materiaNome.setValue('');
    }
  }


  onSubmit() {
    if (this.formCriarConta.valid) {

      if (this.key) {
        this.usuarioService.updateProfile(this.formCriarConta.value, this.key)
        .then(() => {
          this.toast.success('Sua conta foi alterada com sucesso.');
          // this.router.navigate(['/login']);
        })
        .catch((mensagem: string) => {
          this.toast.error(mensagem);
        });
      } else {
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
}
