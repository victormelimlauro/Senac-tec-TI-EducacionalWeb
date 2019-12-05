import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
materiasRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.materiasRef = this.db.list('materias/');
   }

  insert(materia: any) {
    return this.materiasRef.push(materia);
  }

  // update(materia: any, key: string) {
  //   this.materiasRef.update(key,materia);
  // }

  update(materias: any, key: string) {
    let updateObj = {}
    const path = 'materias/'+key;
    const pathp = 'usuarios/';
    updateObj[path] = materias;

    const subscribe = this.getUsuariosByMateria(key).subscribe(usuarios => {
      subscribe.unsubscribe();

      usuarios.forEach(atributo => {
        updateObj[`${pathp}${atributo.key}/atributoNome`] = materias.nome;
      });

      this.db.object('/').update(updateObj);
    });

    const pathp1 = 'plantoes/';
    const subscribe1 = this.getPlantoesByMateria(key).subscribe(plantoes => {
      subscribe1.unsubscribe();

      plantoes.forEach(materia => {
        updateObj[`${pathp1}${materia.key}/materiaNome`] = materias.nome;
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

  gettipoProfessor(tipo: string = 'Professor') {
    // return this.db.list(FirebasePath.USARIOS, q => {
    //     return q.orderByChild('Professor').equalTo(Professor);
    // }).snapshotChanges().pipe(
    //   map(changes => {
    //     return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
    //   })
    // )
  }


  getByKey(key: string) {
    const path = 'materias/'+key;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );

  }

  getUsuariosByMateria(key: string) {
    return this.db.list('usuarios/', q => q.orderByChild('atributoKey').equalTo(key))
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key }))
      })
    )
  }

  getPlantoesByMateria(key: string) {
    return this.db.list('plantoes/', q => q.orderByChild('materiaKey').equalTo(key))
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key }))
      })
    )
  }
  remove(key: string){
    return new Promise((resolve, reject) => {
          const subscribe = this.getUsuariosByMateria(key).subscribe((produtos: any) => {
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
