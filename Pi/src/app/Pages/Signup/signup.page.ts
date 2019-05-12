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
  manager = false;

  constructor(
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingController: LoadingController,
    private router: Router,
    private uAuth:AngularFireAuth) { }

    ngOnInit(): void {
      this.uAuth.user.subscribe(() => {
        this.adminMode()  
      })
      

    }

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



  adminMode()
  {
    if(this.uAuth.auth.currentUser != null)
    {

    
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
    .get().subscribe(result => {
     
      // this.manager = result.data().manager
      // this.fullName = result.data().nickName
    
    //alert(this.fullName +' is manager? ')
    if(this.manager != undefined && this.manager )
    {
      document.getElementById('manager').style.visibility = 'visible'
    }
    else
    {
      document.getElementById('manager').style.visibility = 'hidden'
    }
    })
  }
  else
  {
    document.getElementById('manager').style.visibility = 'hidden'
  }
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

}
