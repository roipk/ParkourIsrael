import { Component, OnInit, ViewChild, NgZone,Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { auth } from 'firebase'
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
  emailSent = false
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
  

  constructor(
    private afAuth: AngularFireAuth,
    private userAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private router: Router,
    private ngZone: NgZone,
    private db: AngularFirestore,
    private uAuth: AngularFireAuth,
    private alertController: AlertController,
) { }

  ngOnInit(): void {
    this.uAuth.user.subscribe(() => {
    })
  }

  signInUser() {
    
    const password = this.passField.value
    if (this.email && password && this.SignIn) {
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


  CheckUser(user) {
    
    this.db.collection('users', ref => ref.where('email', '==', user)).get().subscribe(result => {
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



    this.db.collection('users', ref => ref.where('userName', '==', user)).get().subscribe(result => {
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


async alertPassword() {
  const alert = await this.alertController.create({
    header: 'Reset your password',
    inputs: [
      {
        name: 'email',
        placeholder: 'Please enter your email'
      }],
    buttons: [
      {
        text: 'Send',
        handler: async data => {
          await this.passwordReset(data.email);
          let msg = ''
          if (this.emailSent) {
            msg = 'Email sent successfully'
          }
          else {
            msg = 'Email is not valid'
          }
          const alert2 = await this.alertController.create({
            message: msg,
            buttons: [
              {
                text: 'OK'
              }] 
          });
          await alert2.present();
        }
      }
    ]
  });
  await alert.present();
}

async passwordReset(email: string) {
  await this.userAuth.auth.sendPasswordResetEmail(email).then( ()=>{
    this.emailSent = true
  }).catch(() => {
    this.emailSent = false
  });   
  }

onKeyUp(data) {
  data.keyCode
  const ENTER_KET_CODE = 13
  if (data.keyCode === ENTER_KET_CODE) {
    this.signInUser()
  }
}

}
