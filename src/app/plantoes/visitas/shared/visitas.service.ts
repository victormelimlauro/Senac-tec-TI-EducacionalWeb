import { FirebasePath } from './../../../core/shared/firebase-path';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase} from '@angular/fire/database';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  constructor(private db: AngularFireDatabase) { }


  getByAluno(aluno: string)  {
    // return this.db.list(FirebasePath.CLIENTES, q => q.orderByChild('name').equalTo(aluno))
    return this.db.list(FirebasePath.USUARIOS, q => q.orderByChild('nome').startAt(aluno).endAt(aluno+'\uf8ff'))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        })
      )
  }




}
