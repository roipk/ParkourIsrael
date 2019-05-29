import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
import { AppComponent} from '../../app.component'
import { defineBase } from '@angular/core/src/render3';




@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],
})



export class PostEditorPage implements OnInit {


  @ViewChild('messageTitleField') MessageTitleField
  @ViewChild('messageContentField') messageField
  @ViewChild('fileButton') fileButton
  @ViewChild('uploader') uploader
  @ViewChild('img') img


  loadingRef = null

  manager = false

  nameFile = ''
  userName = ''
  fullName = ''
  nameToShow = ''

  file = File
  messages = []



  constructor(
    private uAuth: AngularFireAuth,
    private ngZone: NgZone,
    private route: Router,
    private loadingController: LoadingController,
    private db: AngularFirestore,
    private admin : AppComponent) { }



  ngOnInit() {
    this.uAuth.user.subscribe(() => {
      this.afterUserInside()
    })
  }

  afterUserInside() {
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
      .get().subscribe(result => {
        this.userName = result.data().userName
        this.fullName = result.data().fullName
      })
  }


  sendMessage() {
    if (this.isMessageInvalid()) {
      return
    }
    
    if (this.nameToShow == "צוות פארקור ישראל"){
      this.db.collection('messages').add({
        title: this.MessageTitleField.value,
        from: this.nameToShow,
        from_manager: this.userName,
        content: this.messageField.value,
        timestamp: new Date().getTime(),
        file_name: this.nameFile,
        date : this.postDate()
      }).then( result => {
        result.update({docId: result.id});
      }).catch(e => {
        alert('Failed to update the firebase')
      })
    }

    else{
    this.db.collection('messages').add({
      title: this.MessageTitleField.value,
      from: this.userName,
      content: this.messageField.value,
      timestamp: new Date().getTime(),
      file_name: this.nameFile,
      date : this.postDate()
    }).then( result => {
      result.update({docId: result.id});
    }).catch(e => {
      alert('Failed to update the firebase')
    })
  }
    if (this.nameFile != '')
      this.uploadFile()
    else {
      this.messageField.value = ''
      this.MessageTitleField.value = ''
      this.route.navigateByUrl('/news')
    }
  }

  isMessageInvalid(): boolean {
    if (this.messageField == null || this.messageField.value == null || this.messageField.value.length <= 0) {
      return true
    }
    if (this.MessageTitleField == null || this.MessageTitleField.value == null || this.MessageTitleField.value.length <= 0) {
      return true
    }
    return false
  }


  fileChangeEvent(e) {
    this.img.src = URL.createObjectURL(e.target.files[0])
    this.file = e.target.files[0]
    this.nameFile = "pi_" + Date.now() + "_" + this.file.name
  }

  radioButtonEvent(e) {
    if (e.target.value == 'userName') {
      this.nameToShow = this.userName
    }
    else if(e.target.value == 'manager') {
      this.nameToShow = 'צוות פארקור ישראל'
    }
  }

  uploadFile() {

    this.presentLoading()
    var storageRef = firebase.storage().ref()
    storageRef.child('images/' + this.nameFile).put(this.file).then(res => {
      this.messageField.value = ''
      this.MessageTitleField.value = ''
      this.loadingRef.dismiss()
      this.route.navigateByUrl('/news')
    }).catch(() => {
      this.loadingRef.dismiss()
      alert('file error')
    })
  }

  removeViewFile() {
    this.img.src = ""
  }




  async presentLoading() {
    this.loadingRef = await this.loadingController.create({ message: 'create your new post', })
    await this.loadingRef.present()
  }

  dismissLoading() {
    this.loadingRef.dismiss()
  }

  getManager(){
return this.admin.getManager()
  }

  postDate(){
    var d = new Date();
    
    var months = new Array(12);
    months[0] = "January"
    months[1] = "February"
    months[2] = "March"
    months[3] = "April"
    months[4] = "May"
    months[5] = "June"
    months[6] = "July"
    months[7] = "August"
    months[8] = "September"
    months[9] = "October"
    months[10] = "November"
    months[11] = "December"

    
    if (d.getMinutes()<10)
    var min = "0"+d.getMinutes()
    else 
    var min = d.getMinutes().toString()
    
    var date = months[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear()+" at "+d.getHours()+":"+min
    return date
  }
}
