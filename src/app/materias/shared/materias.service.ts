import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
materiasRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.materiasRef = this.db.list('categorias/');
   }

  insert(categoria: any) {
    return this.materiasRef.push(categoria);
  }

  // update(categoria: any, key: string) {
  //   this.categoriasRef.update(key,categoria);
  // }

  update(materias: any, key: string) {
    let updateObj = {}
    const path = 'materias/'+key;
    const pathp = 'usuarios-materias/';
    updateObj[path] = materias;

    const subscribe = this.getProdutosByMateria(key).subscribe(produtos => {
      subscribe.unsubscribe();

      produtos.forEach(produto => {
        updateObj[`${pathp}${produto.key}/materiaNome`] = materias.nome;
      });

      this.db.object('/').update(updateObj);
    });
  }

  getAll() {
    return this.materiasRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  getByKey(key: string) {
    const path = 'materias/'+key;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );

  }

  getProdutosByMateria(key: string) {
    return this.db.list('produtos/', q => q.orderByChild('materiasKey').equalTo(key))
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key }))
      })
    )
  }

  remove(key: string){
    return new Promise((resolve, reject) => {
          const subscribe = this.getProdutosByMateria(key).subscribe((produtos: any) => {
            subscribe.unsubscribe();

            if (produtos.length == 0) {
              return this.materiasRef.remove(key);
            } else {
              reject('Não é possível excluir a materia pois ela tem professores associados.')
            }
          });
    });
  }


}
