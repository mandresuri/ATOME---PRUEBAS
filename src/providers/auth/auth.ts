
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  authenticated: any;
  authState: any = null;
  constructor(private afAuth :  AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

    // Login de usuario
 loginUser(email:string, password:string){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err))
}

 // Returns current user UID
 get currentUserId(): string {
  return this.authenticated ? this.authState.uid : '';
}

 // Devuelve la session
 get Session(){
  return this.afAuth.authState;
 }

}
