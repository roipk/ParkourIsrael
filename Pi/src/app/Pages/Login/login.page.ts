import { Component, OnInit, ViewChild } from '@angular/core';
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
    private router: Router,
    private db: AngularFirestore,
    private uAuth:AngularFireAuth) { }

    ngOnInit(): void {
      this.uAuth.user.subscribe(() => {  
      })
     
    }



  signInUser() {
    // alert('in')
    // alert(this.userAuth.auth.currentUser.uid.match)
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
        alert('email or password not correct')
        })
    }
    else
    {
      alert('email or password not correct')
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

  login()
  {
    
    if(document.getElementById('btnLogin').innerHTML=='Login')
    { 
      this.router.navigateByUrl('/login')
    }
    else
    {
      this.userAuth.auth.signOut().then((result)=> {
        document.getElementById('btnLogin').innerHTML = 'Login'
        this.router.navigateByUrl('/home').then(()=>{})
      })
    }
  }




  CheckUsername()
  {
    this.db.collection('users', ref => ref.where('userName', '==', this.emailField.value)).get().subscribe(result => {
     if(result.empty)
     {
     this.userExsist = true
     }
     else{
      this.userExsist = false
     }
     })
  }
  
  
CheckEmail()
{
  this.db.collection('users', ref => ref.where('email', '==', this.emailField.value)).get().subscribe(result => {
   if(result.empty)
   {
    this.emailExsist = true
   }
   else{
    this.emailExsist = false
   }
   })
}


}
