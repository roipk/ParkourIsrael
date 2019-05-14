import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database'
import { database } from 'firebase';









@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  @ViewChild('firstName') firstNameField
  @ViewChild('lastName') lastNameField
  @ViewChild('userName') userNameField
  @ViewChild('email') emailField
  @ViewChild('password') passField
  @ViewChild('confirm') confirmField


  loadingRef = null
  login = true
  once = true
  users = []
  
  constructor(
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingController: LoadingController,
    private router: Router,
    private uAuth:AngularFireAuth,
    ) { 

    }


    ngOnInit(): void {
      this.uAuth.user.subscribe(result => {
        
      })
    }

    
    
  createNewUser(): void {
    const email = this.emailField.value
    const password = this.passField.value
    const firstName = this.firstNameField.value
    const lastName = this.lastNameField.value
    const fullName = firstName + ' ' + lastName
    const userName = this.userNameField.value
    const confirm = this.confirmField.value 
   




    if(fullName =='' || userName =='' )
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
      alert('no match password')
    }
    else
    {

      this.db.collection('users').valueChanges().subscribe(
        result => {
          this.users = result
          for (let index = 0; index < this.users.length; index++) {
            if(this.users[index]['email'] === email){
              this.login = false
            break
            }
            else if(this.users[index]['userName'] === userName){
            this.login = false
            break
            } 
          }
          if(this.login)
         {
           this.once = false
          this.presentLoading()
          this.userAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((result) => 
          {
            this.db.collection('users').doc(result.user.uid).set({ fullName: fullName, email: email, userName: userName,manager:false })
            .then(() => 
            {
              this.dismissLoading()
              this.router.navigateByUrl('/news')
            })
          }) 
         }
         else if(!this.login && this.once)
        {
          alert('A username or email is already in the systemr')
          window.location.reload();
        }
   
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


  onKeyUp(data) {
    const ENTER_KET_CODE = 13
    if (data.keyCode === ENTER_KET_CODE) {
      this.createNewUser()
    }
  }

}
