import { UsuarioService } from './../shared/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Observable<any[]>;

  constructor(private usuariosService: UsuarioService,
              private toastr: ToastrService) {
   }

  ngOnInit() {
    this.usuarios = this.usuariosService.getAll();
  }

  remover(key: string) {
    this.usuariosService.remove(key)
      .then( (mensagem) => {
        this.toastr.success('Usuários excluido com sucesso!');
      })
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
      });
  }

}
