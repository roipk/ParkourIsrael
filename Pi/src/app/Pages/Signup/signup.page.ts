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
    // console.log(database)

   
    // console.log(database)
    // var ref = database.ref('users')
    // ref.on('value',this.gotData,this.ErrorData)
    
    
    
    //  this.db.collection('users').valueChanges().subscribe(
    //   result => 
    //   {
    //     this.users = result
    //     if(this.users.length >=0 )
    //       alert(this.users[0]['email'] )
    //     else{
    //       alert('user empty')
    //     }
    //   })
    



   
    // this.db.collection('users')



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
      alert('no mach password')
    }
    else
    {
     this.enter()
    }
  
  }


  gotData(data)
    {
      console.log(data)
      alert('in2') 
      this.users = data.value
      // alert(this.users.length)
      var key = Object.keys(this.users)
      // alert(key.length)
    }

ErrorData(err)
{
  console.log(err)
  alert('in error')
}

  // for (let index = 0; index < this.users.length; index++) 
  // {
   
  //   if(this.users[index]['email'] == email)
  //   {
  //     alert('email exsist in index ' + index +' '+this.users[index]['email']  )
  //     this.login = false
  //     break
  //   }
  //   else if(this.users[index]['userName'] == userName)
  //   {
  //     alert('username exsist in index' + index +' '+this.users[index]['email']  )
  //     this.login = false
  //     break
  //   } 
  // }


enter()
{

  const email = this.emailField.value
    const password = this.passField.value
    const firstName = this.firstNameField.value
    const lastName = this.lastNameField.value
    const fullName = firstName + ' ' + lastName
    const userName = this.userNameField.value
    const manager = false

  this.presentLoading()
          this.userAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((result) => 
          {
            this.db.collection('users').doc(result.user.uid).set({ fullName: fullName, email: email, userName: userName,manager:manager })
            .then(() => 
            {
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


  onKeyUp(data) {
    const ENTER_KET_CODE = 13
    if (data.keyCode === ENTER_KET_CODE) {
      this.createNewUser()
    }
  }

}
