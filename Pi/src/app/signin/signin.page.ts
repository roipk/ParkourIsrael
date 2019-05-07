import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {

  @ViewChild('email') emailField
  @ViewChild('password') passField
  loadingRef = null

  constructor(
    private userAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private router: Router) { }

  signInUser() {
    const email = this.emailField.value
    const password = this.passField.value
    this.presentLoading()
    this.userAuth.auth.signInWithEmailAndPassword(email, password)
    .then(result => {
      this.dismissLoading()
      this.router.navigateByUrl('/chat')
    })
    .catch(() => {
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
