import { Component, ViewChild, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AppComponent } from '../../app.component'
import { NavbarComponent } from '../navbar/navbar.component';


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
  @ViewChild('avatar') avatar


  info = {
    userName: "",
    fullName: "",
    email: "",
    firstName: "",
    lastName: "",
    userID: ""
  }

  old_userName = ""
  oldNameFile = ""
  userEmpty = false
  emailEmpty = false
  showPassword = false
  newPassword = ""
  userNameChange = false
  nameFile = ''

  loadingRef = null

  defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/images%2Favatar.jpg?alt=media&token=ec1dfd38-fa0d-4f73-a953-51e2c7756f5f"
  file = File



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

    this.avatar.src = this.defaultAvatar;
  }

  afterUserInside() {
    firebase.auth().onAuthStateChanged((user) => {
      this.db.collection('users').doc(user.uid)
        .get().subscribe(result => {
          // debugger
          var s = ''
          var fullname = result.data().fullName.split(' ');
          for (let i = 1; i < fullname.length; i++) {
            s += fullname[i] + ' '
          }
          this.info.userName = result.data().userName
          this.old_userName = this.info.userName
          this.userNameField.value = this.info.userName
          this.info.fullName = result.data().fullName
          this.info.email = result.data().email
          this.info.firstName = result.data().firstName

          this.firstNameField.value = fullname[0];
          this.info.lastName = result.data().lastName
          this.lastNameField.value = s
          this.info.userID = user.uid
          this.nameFile = result.data().imageProfile
          this.oldNameFile = this.nameFile
          // debugger
          if (this.nameFile != this.defaultAvatar) {
            var storageRef = firebase.storage().ref()
            storageRef.child('ImageProfile/' + this.nameFile).getDownloadURL().then(res => {
              this.avatar.src = res
            })
          }

        })
    });

  }


  fileChangeEvent(e) {

    if (e == undefined) {
      this.file = null
      this.nameFile = this.defaultAvatar
      this.avatar.src = this.defaultAvatar
      return
    }
    this.avatar.src = URL.createObjectURL(e.target.files[0])
    this.file = e.target.files[0]
    this.nameFile = "profile_" + Date.now() + "_" + this.file.name
  }

  removeAvatar() {
    this.avatar.src = this.defaultAvatar
    this.nameFile = this.defaultAvatar
  }

  update() {

    if (this.checkChanges()) {

      let updates = {
        firstName: this.info.firstName,
        fullName: this.info.fullName,
        lastName: this.info.lastName,
        userName: this.info.userName,
        imageProfile: this.nameFile
      }
      this.presentLoading()
      if (this.old_userName != this.info.userName) {
        this.db.collection('messages', ref => ref.where('email', '==', this.info.email)).get().subscribe(
          result => {
            result.forEach(element => {
              let from = element.data().from
              if (from == "צוות פארקור ישראל")
                this.db.collection('messages').doc(element.id).update({ from_manager: this.info.userName })
              else
                this.db.collection('messages').doc(element.id).update({ from: this.info.userName })
            });
          }
        )
      }


      firebase.auth().onAuthStateChanged((user) => {
        this.db.collection('users').doc(user.uid).update(updates)
        var storageRef = firebase.storage().ref()
        if (this.nameFile != this.oldNameFile) {
          if (this.oldNameFile != this.defaultAvatar)
            storageRef.child('ImageProfile/' + this.oldNameFile).delete().then(() => {
              if (this.nameFile == this.defaultAvatar) {
                NavbarComponent.reload = true
                this.dismissLoading();
                this.ngOnInit()
              }

            })
          if (this.nameFile != this.defaultAvatar) {
            
            storageRef.child('ImageProfile/' + this.nameFile).put(this.file).then(res => {
              NavbarComponent.reload = true
              this.dismissLoading();
              this.ngOnInit()

            }).catch(() => {
              
              this.dismissLoading();
              alert('file error')
            }).then(() => {
            NavbarComponent.reload = true
              
              this.dismissLoading();
              this.ngOnInit()
            })
          }
        }
        else {
          
          NavbarComponent.reload = true
          this.dismissLoading();
          this.ngOnInit()
        }

      })


    }
    else {
      this.dismissLoading();
    }

  }


  checkChanges() {
    if (this.userNameField.value == '') {
      alert('username empty')
      return false
    }
    if (this.info.firstName != this.firstNameField.value)
      this.info.firstName = this.firstNameField.value

    if (this.info.lastName != this.lastNameField.value)
      this.info.lastName = this.lastNameField.value

    let fullName = this.info.firstName + " " + this.info.lastName

    if (this.info.fullName != fullName)
      this.info.fullName = fullName

    if (this.info.userName != this.userNameField.value) {
      this.info.userName = this.userNameField.value
      this.userNameChange = true

    }

    if (this.showPassword && this.passField.value != "") {
      if (!this.CheckPassword()) {
        return false
      }
      else {
        firebase.auth().onAuthStateChanged((user) => {
          user.updatePassword(this.newPassword)
        })
      }
    }

    if (this.userNameChange && !this.appComponent.userMode()) {
      return false
    }

    return true

  }



  CheckUsername() {
    this.db.collection('users', ref => ref.where('userName', '==', this.userNameField.value)).get().subscribe(result => {
      if (result.empty) {
        this.userEmpty = true
        return
      }
      else {
        if (this.userNameField.value == this.info.userName) {
          this.userEmpty = true
          return
        }

        alert('Username is busy. Try another one')
        this.userEmpty = false
        return
      }

    })
  }



  changeShowPassword() {
    this.showPassword = !this.showPassword

    if (!this.showPassword)
      this.changeButton.el.innerHTML = 'Change Password'
    else
      this.changeButton.el.innerHTML = 'Cancel Changes'
  }

  CheckPassword() {
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











  async presentLoading() {
    this.loadingRef = await this.loadingController.create({ message: 'update your profile', })
    await this.loadingRef.present()
  }

  dismissLoading() {
    if (this.loadingRef != null)
      this.loadingRef.dismiss()
  }




}
