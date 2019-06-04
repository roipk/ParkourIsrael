import { Component, ViewChild, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AppComponent} from '../../app.component'


@Component({
  selector: 'app-edit-informations',
  templateUrl: './edit-informations.page.html',
  styleUrls: ['./edit-informations.page.scss'],
})
export class EditInformationsPage {

  @ViewChild('firstName') firstNameField
  @ViewChild('lastName') lastNameField
  @ViewChild('userName') userNameField
  @ViewChild('email') emailField
  @ViewChild('password') passField
  @ViewChild('confirm') confirmField
  @ViewChild('changeButton') changeButton


  info = {
    userName: "",
    fullName: "",
    email: "",
    firstName: "",
    lastName: "",
    userID: ""
  }

  old_email = ""

  userEmpty = false
  emailEmpty = false
  showPassword = false
  newPassword = ""
  userNameChange = false
  




  constructor(
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingController: LoadingController,
    private router: Router,
    private uAuth: AngularFireAuth,
    private appComponent: AppComponent 
  ) { }






  ngOnInit() {
    this.uAuth.user.subscribe(() => {
      this.afterUserInside()
    })
  }

  afterUserInside() {
    firebase.auth().onAuthStateChanged((user) => {
      this.db.collection('users').doc(user.uid)
        .get().subscribe(result => {
          this.info.userName = result.data().userName
          this.userNameField.value = this.info.userName
          this.info.fullName = result.data().fullName
          this.info.email = result.data().email
          this.old_email = this.info.email
          this.emailField.value = this.info.email
          this.info.firstName = result.data().firstName
          this.firstNameField.value = this.info.firstName
          this.info.lastName = result.data().lastName
          this.lastNameField.value = this.info.lastName
          this.info.userID = user.uid

        })
    });

  }

  update() {
    if (this.checkChanges()) {

      let updates = {
        email: this.info.email,
        firstName: this.info.firstName,
        fullName: this.info.fullName,
        lastName: this.info.lastName,
        userName: this.info.userName

      }

      this.db.collection('messages', ref => ref.where('email', '==', this.old_email)).get().subscribe(
        result => {
          this.db.collection('messages').doc(result.docs[0].id).get().subscribe(result => {
            result.data().update({from: this.info.userName})
            
          })
        
         }
          )

          /*this.db.collection('messages', ref => ref.where('email', '==', this.old_email)).update({email: this.info.email, from : this.info.userName})*/
          
          
        
      
      firebase.auth().onAuthStateChanged((user) => {
        this.db.collection('users').doc(user.uid).update(updates)
        if (this.userNameChange)
        this.appComponent.userMode()
        this.router.navigateByUrl('/news')

      })
    }
  }

  checkChanges() {
    if (this.userNameField.value == '') {
      alert('username empty')
      return false
    }
    if (this.info.email != this.emailField.value){
      if (!this.CheckEmail())
       return false
     this.info.email = this.emailField.value
     return true
   }

    if (this.info.firstName != this.firstNameField.value)
      this.info.firstName = this.firstNameField.value

    if (this.info.lastName != this.lastNameField.value)
      this.info.lastName = this.lastNameField.value

    let fullName = this.info.firstName + " " + this.info.lastName

    if (this.info.fullName != fullName)
      this.info.fullName = fullName

    if (this.info.userName != this.userNameField.value) {
       if (!this.CheckUsername())
        return false
      this.info.userName = this.userNameField.value
      this.userNameChange = true
      return true
    }

    if(this.showPassword && this.passField.value != "")
    if (!this.CheckPassword())
    return false
    firebase.auth().onAuthStateChanged((user) => {
      user.updatePassword(this.newPassword)
    })
    return true

  }



  CheckUsername() {
    this.db.collection('users', ref => ref.where('userName', '==', this.userNameField.value)).get().subscribe(result => {
      if (result.empty) {
        this.userEmpty = true
      }
      else
      this.userEmpty = false
    })
    if (this.userEmpty == false)
     {
      if (this.userNameField.value == this.info.userName) {
        return true
      }
      else
        alert('Username is busy. Try another one')
      return false
    }
    return true
  }

  CheckEmail(){
    this.db.collection('users', ref => ref.where('email', '==', this.emailField.value)).get().subscribe(result => {
      if (result.empty) {
        this.emailEmpty = true
      }
      else {
        this.emailEmpty = false
        alert(" This email is associated with an existing account  ")
      }
    })
    if (this.emailEmpty == false)
    {
     if (this.emailField.value == this.info.email) {
       return true
     }
     else
     alert(" This email is associated with an existing account  ")
     return false
   }
   return true
 }

 changeShowPassword(){
   this.showPassword = !this.showPassword
 }

 CheckPassword(){
  const password = this.passField.value
  const confirm = this.confirmField.value
  if (password.length < 8) {
    alert('the password need to be 8 characters:\n' +
      '*One or more big letter (A-Z)\n' +
      '*One or more small letter (a-z)\n' +
      '*One or more sign (@!%)\n' +
      '*One or more number (0-9)\n')
      return false
  }
  else if (confirm != password) {
    alert('no match password')
    return false
 }
 this.newPassword = this.passField.value
 return true
}












}
