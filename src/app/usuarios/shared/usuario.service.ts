import { FirebasePath } from './../../core/shared/firebase-path';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuariosRef: AngularFireList<any>;
  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
               this.usuariosRef = this.db.list('usuarios/');
               }
 private PATH = 'usuarios/';

  //Tela CADASTRAR - EDITAR USUARIOS
  criarConta(usuario: any) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((userCredential: firebase.auth.UserCredential) => {
          userCredential.user.updateProfile({ displayName: usuario.nome, photoURL: '' });
         userCredential.user.sendEmailVerification();
          const path = `${this.PATH}${this.afAuth.auth.currentUser.uid}`;

          if (usuario.tipo=="aluno"){
            this.db.object(path).update({ nome: usuario.nome, email: usuario.email, tipo:usuario.tipo, atributoKey:usuario.turma, atributoNome: usuario.turmaNome})
          } else if (usuario.tipo=="professor"){
            this.db.object(path).update({ nome: usuario.nome, email: usuario.email, tipo: usuario.tipo, atributoKey: usuario.materia, atributoNome: usuario.materiaNome})
          } else {
            this.db.object(path).update({ nome: usuario.nome, email: usuario.email, tipo:usuario.tipo})
          }
        // this.logout();
          resolve();
        })
        .catch((error: any) => {
          reject(this.handlerError(error));
        });
    });
  }

  login(email: string, senha: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, senha)
        .then((userCredential: firebase.auth.UserCredential) => {
          if (userCredential.user.emailVerified) {
            resolve();
          } else {
            this.logout();
            reject('Seu e-mail ainda não foi verificado. Por favor verifique seu e-mail.')
          }
        })
        .catch((error: any) => {
          reject(this.handlerError(error));
        });
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  enviarEmailResetarSenha(email: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email)
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject(this.handlerError(error));
        });
    });
  }

  handlerError(error: any) {
    let mensagem = '';
    if (error.code == 'auth/email-already-in-use') {
      mensagem = 'O e-mail informado já está sendo usado.';
    } else if (error.code == 'auth/invalid-email') {
      mensagem = 'O e-mail informado é inválido.';
    } else if (error.code == 'auth/operation-not-allowed') {
      mensagem = 'A autenticação por email e senha não está habilitada';
    } else if (error.code == 'auth/weak-password') {
      mensagem = 'A senha utilizada é muito fraca. Por favor escolha outra senha.';
    } else if (error.code == 'auth/user-disabled') {
      mensagem = 'O usuário está desabilitado, por favor contact o administrador.';
    } else if (error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password') {
      mensagem = 'O usuario/senha inválido(s)';
    }

    return mensagem;
  }

  getDadosUsuario() {
    const path = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}`
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, nome: this.afAuth.auth.currentUser.displayName, ...change.payload.val() });
      })
    );
  }

  getTipoDadosUsuario(email: string) {
    return this.db.list(FirebasePath.USUARIOS, q => {
         return q.orderByChild('email').equalTo(email);
        }) .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
      })
    )
  }

  updateProfile(usuario: any, key: string) {
      return new Promise((resolve, reject) => {

            const path = `${this.PATH}${key}`;

            if (usuario.tipo=="aluno"){
              this.db.object(path).update({ nome: usuario.nome, email: usuario.email, tipo:usuario.tipo, atributoKey:usuario.turma, atributoNome: usuario.turmaNome})
            } else if (usuario.tipo=="professor"){
              this.db.object(path).update({ nome: usuario.nome, email: usuario.email, tipo: usuario.tipo, atributoKey: usuario.materia, atributoNome: usuario.materiaNome})
            } else {
              this.db.object(path).update({ nome: usuario.nome, email: usuario.email, tipo:usuario.tipo})
            }
            resolve();
          // .catch((error: any) => {
          //   reject(this.handlerError(error));
          // });
      });
  }

  uploadImg(file: File) {
    return new Promise((resolve) => {
      const path = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}`;
      const filePath = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}/${file.name}`;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url => {
            this.db.object(path).update({ img: url, filePath: filePath });
            this.afAuth.auth.currentUser.updateProfile({ displayName: this.afAuth.auth.currentUser.displayName, photoURL: url });
            resolve();
          }));
        })
      ).subscribe();
    })
  }

  removeImg(filePath: string) {
    const path = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}`;
    const ref = this.storage.ref(filePath);
    ref.delete();
    this.db.object(path).update({ img: '', filePath: '' });
    this.afAuth.auth.currentUser.updateProfile({ displayName: this.afAuth.auth.currentUser.displayName, photoURL: null });
  }


  //Tela LISTAR - USUARIOS
  getAll() {
    return this.usuariosRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }))
      })
    )
  }
  remove(key: string){
    return new Promise((resolve, reject) => {
     // this.db.list('produtos/', q => q.orderByChild('categoriaKey').equalTo(key))
              return this.usuariosRef.remove(key);
            })
          }
  getByKey(key: string) {
    const path = 'usuarios/'+key;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );

  }
}
