import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  plantoesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.plantoesRef = this.db.list('plantoes/');
   }

  insert(plantao: any) {
    // return this.plantoesRef.push(plantao);
    return this.save(plantao, null);
  }

  update(plantao: any, key: string) {
    // return this.plantoesRef.update(key, plantao);
    return this.save(plantao, key);
  }

  private save(plantao: any, key: string) {
    return new Promise( (resolve, reject) => {
      const plantaoRef = {
        nome: plantao.nome,
        descricao: plantao.descricao,
        preco: plantao.preco,
        materiaKey: plantao.materiaKey,
        materiaNome: plantao.materiaNome,
        usuarioKey: plantao.usuarioKey,
        usuarioNome: plantao.usuarioNome,
      }

      if (key) {
        this.plantoesRef.update(key, plantaoRef)
          .then( () => resolve(key) )
          .catch( () => reject() );
      } else {
        this.plantoesRef.push(plantaoRef)
          .then( (result: any) => resolve(result.key));
      }

    });
  }

  getAll() {
    return this.plantoesRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  getByKey(key: string) {
    const path = 'plantoes/'+key;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );

  }


  remove(key: string, filePath: string) {
    this.plantoesRef.remove(key);
    if (filePath) {
      this.removeImg(filePath, key, false);
    }
  }

  uploadImg(key: string, file: File) {
    const filePath = 'plantoes/'+key;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(
      finalize( () => {
        ref.getDownloadURL().subscribe(url => {
          this.plantoesRef.update(key, {img: url, filePath: filePath })
        })
      })
    ).subscribe();
  }

  removeImg(filePath: string, key:string, atualizarProduto: boolean = true){
    const ref = this.storage.ref(filePath);
    ref.delete();
    if (atualizarProduto) {
      this.plantoesRef.update(key, {img: '', filePath: ''});
    }
  }
}
