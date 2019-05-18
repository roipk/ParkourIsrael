import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
// import * as firebase from 'firebase';
// import { takeLast } from 'rxjs/operators';
// import { QuerySnapshot } from '@google-cloud/firestore';


@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],
})
export class PostEditorPage implements OnInit {
  // this is message
  @ViewChild('messageContentField') messageField
  @ViewChild('messageTitleField') MessageTitleField

  @ViewChild('uploader') uploader
  @ViewChild('fileButton') fileButton
  // @ViewChild('mainContent') mainContent
  messages = []
  fullName = ''
  manager = false
  e = File
  constructor(
    private uAuth: AngularFireAuth,
    private ngZone: NgZone,
    private route: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.uAuth.user.subscribe(() => {
      this.afterUserInside()

      {
      }
    })

  }




  
  fileChangeEvent(e) {
    // alert('in')
    e = e.target.files[0];
    debugger
    // var storageFile = firebase.storage().ref('pictures/'+e.name)
    // storageFile.put(e)

  }

  uploadFile()
  {
    //need upload
    // var storageFile = firebase.storage().ref('pictures/'+this.e.name)
    // storageFile.put(this.e)
  }
  afterUserInside() {
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
      .get().subscribe(result => {
        this.fullName = result.data().userName
      })

  }
  getContentColor(m) {
    if (this.fullName != null && m != null && this.fullName === m.from) {
      return 'red'
    }
  }




  sendMessage() {
    if (this.isMessageInvalid()) {
      return
    }
    this.db.collection('messages').add({
      title: this.MessageTitleField.value,
      from: this.fullName,
      content: this.messageField.value,
      timestamp: new Date().getTime()
    })
    this.messageField.value = ''
    this.MessageTitleField.value = ''
    ///this.scrollToBottom()
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


  // scrollToBottom() {
  //   setTimeout(() => { this.mainContent.scrollToBottom(700) }, 120)
  // }

  // onKeyUp(data) {
  //   const ENTER_KET_CODE = 13
  //   if (data.keyCode === ENTER_KET_CODE) {
  //     this.sendMessage()
  //   }
  // }


}
