import { Component, OnInit, ViewChild, NgZone,Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators'
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  @ViewChild('email') emailField
  @ViewChild('password') passField
  loadingRef = null
  userExsist = false
  emailExsist = false
  email = ''
  SignIn = true
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      }
      else {
        return authState.uid;
      }
      authState.uid
    })
  );
  //  isAdmin = observableOf('true');

  constructor(
    private afAuth: AngularFireAuth,
    private userAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private router: Router,
    private ngZone: NgZone,
    private db: AngularFirestore,
    private uAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.uAuth.user.subscribe(() => {
    })
  }

  signInUser() {
    // alert('in')
    // alert(this.userAuth.auth.currentUser.uid.match)
    const email = this.emailField.value
    const password = this.passField.value

    if (email && password && this.SignIn) {
      this.presentLoading()
      this.userAuth.auth.signInWithEmailAndPassword(this.email, password)
        .then((result) => {
          this.dismissLoading()
          this.ngZone.run(() => {  this.router.navigateByUrl('/news') })
        
        }).catch(() => {
          this.dismissLoading()
          alert('email or password not correct')
        })
    }
    else {
      alert('email or password not correct')
    }
  }


  googlelogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((result) => {
      this.router.navigateByUrl('/news')
    }).catch(() => {
      this.dismissLoading()
    })
  }


  async presentLoading() {
    this.loadingRef = await this.loadingController.create({ message: 'Please wait...', })
    await this.loadingRef.present()
  }

  dismissLoading() {
    this.loadingRef.dismiss()
  }

  // login() {

  //   if (document.getElementById('btnLogin').innerHTML == 'Login') {
  //     this.router.navigateByUrl('/login')
  //   }
  //   else {
  //     this.userAuth.auth.signOut().then((result) => {
  //       document.getElementById('btnLogin').innerHTML = 'Login'
  //       this.router.navigateByUrl('/home').then(() => { })
  //     })
  //   }
  // }



  CheckEmail() {
    this.db.collection('users', ref => ref.where('email', '==', this.emailField.value)).get().subscribe(result => {
      if (result.empty) {
        this.emailExsist = false
      }
      else {
        this.emailExsist = true
        this.email = this.emailField.value
        this.SignIn = true
        return
      }
    })



    this.db.collection('users', ref => ref.where('userName', '==', this.emailField.value)).get().subscribe(result => {
      if (result.empty) {
        this.userExsist = false
      }
      else {
        this.userExsist = true
        let id = result.docs[0].id
        this.db.collection('users').doc(id).get().subscribe(result => {
          this.email = result.data().email
          this.SignIn = true
          return
        })
      }
    })
    this.SignIn = false
  }

passwordType: string = 'password';
 passwordIcon: string = 'eye-off';

 hideShowPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
 }

isPasswordInEmpty(): boolean {
  return this.passField == null || this.passField.value == null || this.passField.value.length <= 0
}



onKeyUp(data) {
  data.keyCode
  const ENTER_KET_CODE = 13
  if (data.keyCode === ENTER_KET_CODE) {
    this.signInUser()
  }
}


}
