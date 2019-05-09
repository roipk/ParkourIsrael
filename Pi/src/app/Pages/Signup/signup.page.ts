import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  @ViewChild('fullName') fullNameField
  @ViewChild('email') emailField
  @ViewChild('password') passField

  loadingRef = null

  constructor(
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingController: LoadingController,
    private router: Router) { }

  createNewUser(): void {
    const fullName = this.fullNameField.value
    const email = this.emailField.value
    const password = this.passField.value
    this.presentLoading()
    this.userAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.db.collection('users').doc(result.user.uid).set({ fullName: fullName })
      .then(() => {
        this.dismissLoading()
        this.router.navigateByUrl('/news')
      })
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
