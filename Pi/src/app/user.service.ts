import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UserService {
b(){
  alert('clicked')
}


// uid = this.afAuth.authState.pipe(map(authState => authState.uid));
// isAdmin = observableOf('true');
//   constructor(private afAuth: AngularFireAuth) { }
//   GoogleLogin(){
//     this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
//   }
//   GoogleLogout(){
//     this.afAuth.auth.signOut();
//   }
}
