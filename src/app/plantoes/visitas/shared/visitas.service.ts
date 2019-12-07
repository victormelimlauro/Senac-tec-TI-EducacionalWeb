import { AngularFireAuth } from '@angular/fire/auth';
import { FirebasePath } from './../../../core/shared/firebase-path';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase} from '@angular/fire/database';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {
  visitasRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.visitasRef = this.db.list('plantoes_visitas/');
  }

  insert(plantao: any) {
    return this.visitasRef.push(plantao);
   // return this.save(plantao, null);
  }

  update(plantao: any, key: string) {
    return this.visitasRef.update(key, plantao);
   // return this.save(plantao, key);
  }

  getAll() {
    return this.visitasRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }))
      })
    )

  }
  getByKey(key: string) {
    const path = 'plantoes_visitas/'+key;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );

  }

  getDadosUsuarioAtual(uid: string){
    const path = `${FirebasePath.USUARIOS}${uid}`;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );
}

  getByAluno(aluno: string)  {
    // return this.db.list(FirebasePath.CLIENTES, q => q.orderByChild('name').equalTo(aluno))
    return this.db.list(FirebasePath.USUARIOS, q => q.orderByChild('nome').startAt(aluno).endAt(aluno+'\uf88f'))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        })
      )
  }

  private save(visita: any, key: string) {
    return new Promise( (resolve, reject) => {
      const visitaRef = {
        nome_aluno: visita.nome_aluno,
        atributoNome: visita.atributoNome,
        _aluno: visita._aluno,
        dia: visita.dia,
        materiaKey: visita.materiaKey,
        materiaNome: visita.materiaNome,
        usuarioKey: visita.usuarioKey,
        usuarioNome: visita.usuarioNome,
        hora_entrada: visita.hora_entrada,
        hora_saida: visita.hora_saida,
        professorKey: visita.professorKey,
        professorNome: visita.professorNome,
      }

      if (key) {
        this.visitasRef.update(key, visitaRef)
          .then( () => resolve(key) )
          .catch( () => reject() );
      } else {
        this.visitasRef.push(visitaRef)
          .then( (result: any) => resolve(result.key));
      }

    });
  }

  remove(key: string) {
    return this.visitasRef.remove(key);
  }




}
