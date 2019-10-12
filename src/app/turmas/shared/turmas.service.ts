import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {
turmasRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.turmasRef = this.db.list('turmas/');
   }

  insert(turma: any) {
    return this.turmasRef.push(turma);
  }

  // update(turma: any, key: string) {
  //   this.turmasRef.update(key,turma);
  // }

  update(turmas: any, key: string) {
    let updateObj = {}
    const path = 'turmas/'+key;
    const pathp = 'usuarios-turmas/';
    updateObj[path] = turmas;

    const subscribe = this.getProdutosByTurma(key).subscribe(produtos => {
      subscribe.unsubscribe();

      produtos.forEach(produto => {
        updateObj[`${pathp}${produto.key}/turmaNome`] = turmas.nome;
      });

      this.db.object('/').update(updateObj);
    });
  }

  getAll() {
    return this.turmasRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  getByKey(key: string) {
    const path = 'turmas/'+key;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );

  }

  getProdutosByTurma(key: string) {
    return this.db.list('produtos/', q => q.orderByChild('turmasKey').equalTo(key))
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key }))
      })
    )
  }

  remove(key: string){
    return new Promise((resolve, reject) => {
          const subscribe = this.getProdutosByTurma(key).subscribe((produtos: any) => {
            subscribe.unsubscribe();

            if (produtos.length == 0) {
              return this.turmasRef.remove(key);
            } else {
              reject('Não é possível excluir a turma pois ela tem professores associados.')
            }
          });
    });
  }


}
