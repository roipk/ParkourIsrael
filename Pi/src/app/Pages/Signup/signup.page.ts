import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LanguageComponent } from '../language/language.component';





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
  userEmpty = true
  emailEmpty = true
  lan = true;


  users = []



  constructor(
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingController: LoadingController,
    private router: Router,
    private uAuth: AngularFireAuth,
    private cdRef: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    this.uAuth.user.subscribe(result => {
      this.firstNameField.autofocus
    })
  }

//=============================== create new user===========================================//
//==========================================================================================//
  createNewUser(): void {
    const email = this.emailField.value
    const password = this.passField.value
    const firstName = this.firstNameField.value
    const lastName = this.lastNameField.value
    const fullName = firstName + ' ' + lastName
    const userName = this.userNameField.value
    const confirm = this.confirmField.value
    const imageProfile = "https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/images%2Favatar.jpg?alt=media&token=ec1dfd38-fa0d-4f73-a953-51e2c7756f5f"


    if (fullName == '' || userName == '') {
      alert('one or more values empty')
    }
    else if (password.length < 8) {
      alert('the password need to be 8 characters:\n' +
        '*One or more big letter (A-Z)\n' +
        '*One or more small letter (a-z)\n' +
        '*One or more sign (@!%)\n' +
        '*One or more number (0-9)\n')
    }
    else if (confirm != password) {
      alert('no match password')
    }
    else {

      if (this.emailEmpty && this.userEmpty) {
        this.presentLoading()
        this.userAuth.auth.createUserWithEmailAndPassword(email, password)

          .then((result) => {
            this.db.collection('users').doc(result.user.uid).set({ fullName: fullName, email: email, userName: userName,imageProfile: imageProfile ,firstName : firstName,  lastName : lastName})
              .then(() => {
                this.dismissLoading()
                this.router.navigateByUrl('/login')
              })
          })
      }
      else {
        alert('A username or email is already in the system')
        window.location.reload()
      }
    }
  }
//==========================================================================================//

  
  
  CheckUsername() {
    this.db.collection('users', ref => ref.where('userName', '==', this.userNameField.value)).get().subscribe(result => {
      if (result.empty) {
        this.userEmpty = true
      }
      else {
        this.userEmpty = false
        alert('Username is busy Try another username')
      }
    })
  }
  
  CheckEmail() {
    
    this.db.collection('users', ref => ref.where('email', '==', this.emailField.value)).get().subscribe(result => {
      if (result.empty) {
        this.emailEmpty = true
      }
      else {
        this.emailEmpty = false
        alert(" This email is associated with an existing account  ")
      }
    })
  }
  
  
    onKeyUp(data) {
      const ENTER_KET_CODE = 13
      if (data.keyCode === ENTER_KET_CODE) {
        this.createNewUser()
      }
    }
  
    async presentLoading() {
      this.loadingRef = await this.loadingController.create({ message: 'Please wait...', })
      await this.loadingRef.present()
    }
  
    dismissLoading() {
      this.loadingRef.dismiss()
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
