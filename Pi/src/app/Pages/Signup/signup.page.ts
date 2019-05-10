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
  @ViewChild('firstName') firstNameField
  @ViewChild('lastName') lastNameField
  @ViewChild('nickName') nickNameField
  @ViewChild('email') emailField
  @ViewChild('password') passField
  @ViewChild('confirm') confirmField

  loadingRef = null

  constructor(
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingController: LoadingController,
    private router: Router) { }

  createNewUser(): void {
    const email = this.emailField.value
    const password = this.passField.value
    const firstName = this.firstNameField.value
    const lastName = this.lastNameField.value
    const fullName = firstName + ' ' + lastName
    const nickName = this.nickNameField.value
    const confirm = this.confirmField.value 
    



    if(fullName =='' || nickName =='' )
    {
      alert('one or more values empty' )
    }
    else if(password.length < 8 ){
      alert('the password need to be 8 characters:\n'+
      '*One or more big letter (A-Z)\n'+
      '*One or more small letter (a-z)\n'+
      '*One or more sign (@!%)\n'+
      '*One or more number (0-9)\n')
    }
    else if(confirm != password)
    {
      alert('no mach password')
    }
    else{
      this.presentLoading()
      this.userAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.db.collection('users').doc(result.user.uid).set({ fullName: fullName, email: email, nickName: nickName })
        .then(() => {
          this.dismissLoading()
          this.router.navigateByUrl('/news')
        })
      })
    }
  }

  async presentLoading() {
    this.loadingRef = await this.loadingController.create({ message: 'Please wait...', })
    await this.loadingRef.present()
  }

  dismissLoading() {
    this.loadingRef.dismiss()
  }

}
