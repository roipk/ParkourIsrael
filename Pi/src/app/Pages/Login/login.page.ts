import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators'
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  @ViewChild('email') emailField
  @ViewChild('password') passField
  loadingRef = null
  uid = this.afAuth.authState.pipe(
    map(authState =>{if(!authState)
      {
        return null;
      }
      else{
        return authState.uid;
      }
       authState.uid})
    );
//  isAdmin = observableOf('true');

  constructor(
    private afAuth: AngularFireAuth,
    private userAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private router: Router) { }

  signInUser() {
    const email = this.emailField.value
    const password = this.passField.value
    this.presentLoading()
    if(email && password)
    {
        this.userAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result)=> {
        this.dismissLoading()
        this.router.navigateByUrl('/news')
        }).catch(() => {
        this.dismissLoading()
        })
    }
  }

  googlelogin(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((result)=> {
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

}
