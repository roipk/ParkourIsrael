import { Component, OnInit, ViewChild, NgZone,Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { auth } from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';
import { disableBindings } from '@angular/core/src/render3';
import { DISABLED } from '@angular/forms/src/model';
import { LanguageComponent } from '../language/language.component';





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
  lan = true
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
    private cdRef: ChangeDetectorRef,
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
          // don't need this line
          //this.ngZone.run(() => {  this.router.navigateByUrl('/news') })
          this.router.navigateByUrl('/home')
        
        }).catch(() => {
          this.dismissLoading()
          //alert('Email or password not are correct')
          this.simpleAlert('Email or password are not correct')
        })
    }
    /*
    else {
      //alert('Email or password are not correct')
      this.simpleAlert('Email or password are not correct')
    }
    */
  }


  googlelogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((result) => {
      this.router.navigateByUrl('/home')
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

isResetMailInEmpty(strMail: string): boolean {
  return strMail.length <= 0
}

async simpleAlert(msg: string) {
  const alert = await this.alertController.create({
    message: msg,
    buttons: [
      {
        text: 'OK'
      }]
    });
    await alert.present();
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
          let msg = ''
          if(this.isResetMailInEmpty(data.email)) {
            msg = 'Email field is empty'
          }
          else {
            await this.passwordReset(data.email);
            if (this.emailSent) {
              msg = 'Email sent successfully'
            }
            else {
              msg = 'Email is not valid'
            }
          }
          const alert2 = await this.alertController.create({
            message: msg,
            buttons: [
              {
                text: 'OK',
              }]
          });
          await alert2.present();
        }
      }
    ]
  });
  await alert.present().then(() => {
    const firstInput: any = document.querySelector('ion-alert input');
    firstInput.focus();
    KeyboardEvent
    return;
  });
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
  const ENTER_KEY_CODE = 13
  if (data.keyCode === ENTER_KEY_CODE) {
    this.signInUser()
  }
}




    
ngAfterViewChecked() {
  let show = this.isShowExpand();
  if (show != this.lan) { // check if it change, tell CD update view
    this.lan = show;
    this.cdRef.detectChanges();
  }

}

isShowExpand() {
  return LanguageComponent.lan
}
lang() {
  return this.lan

}


}
