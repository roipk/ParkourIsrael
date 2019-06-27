import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController,
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
    const emailVerified = false
    const timestamp = new Date().getTime()
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
            this.db.collection('users').doc(result.user.uid).set({ fullName: fullName, email: email, userName: userName, imageProfile: imageProfile, firstName: firstName, lastName: lastName, emailVerified: emailVerified, timestamp: timestamp, date: this.postDate()[1] })
              .then(() => {
                this.userAuth.auth.signOut()
                this.dismissLoading()
                this.SendVerificationMail()
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

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return await this.userAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        //this.router.navigate(['<!-- enter your route name here -->']);
        //alert("A verification mail have been sent to your mail box.\nPlease click on the link to confirm your registration.");
        this.simpleAlert("A verification mail have been sent to your mail box.\nPlease click on the link to confirm your registration.");
      }).catch(() => {
        //alert("An error occured sending confirmation mail");
        this.simpleAlert("An error occured sending confirmation mail")
      })
  }
  //==========================================================================================//


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

  postDate() {
    var d = new Date();

    if (d.getMinutes() < 10)
      var min = "0" + d.getMinutes()
    else
      var min = d.getMinutes().toString()

    if (d.getDate() < 10)
      var ddate = "0" + d.getDate()
    else
      var ddate = d.getDate().toString()

    if (d.getMonth() < 9)
      var dmonth = "0" + (d.getMonth() + 1)
    else
      var dmonth = (d.getMonth() + 1).toString()

    if (d.getHours() < 10)
      var dhours = "0" + d.getHours()
    else
      var dhours = d.getHours().toString()

    var showDate = +d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " at " + d.getHours() + ":" + min

    var dbDate = d.getFullYear() + "/" + dmonth + "/" + ddate + " at " + dhours + ":" + min

    var date = [showDate, dbDate]
    return date
  }


}
