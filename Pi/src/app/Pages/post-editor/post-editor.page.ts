import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],
})
export class PostEditorPage implements OnInit {

  @ViewChild('messageField') messageField
  @ViewChild('mainContent') mainContent
  messages = []
  fullName = ''
  manager = false;

  constructor(
    private uAuth: AngularFireAuth,
    private ngZone: NgZone,
    private route: Router,
    private db: AngularFirestore) 
    { }
  
  ngOnInit() {
    this.uAuth.user.subscribe(() => {
      this.afterUserInside()
    })

  }

afterUserInside() {
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
      .get().subscribe(result => {
        this.fullName = result.data().userName
      })

  }
  getContentColor(m) {
    if(this.fullName != null && m != null && this.fullName === m.from) {
      return 'red'
    }
  }




  sendMessage() {
    if (this.isMessageInvalid()) {
      return
    }
    this.db.collection('messages').add({
      from: this.fullName,
      content: this.messageField.value,
      timestamp: new Date().getTime()
    })
    this.messageField.value = ''
    ///this.scrollToBottom()
  }



  isMessageInvalid(): boolean {
    return this.messageField == null || this.messageField.value == null || this.messageField.value.length <= 0
  }


  scrollToBottom() {
    setTimeout(() => { this.mainContent.scrollToBottom(700) }, 120)
  }

  onKeyUp(data) {
    const ENTER_KET_CODE = 13
    if (data.keyCode === ENTER_KET_CODE) {
      this.sendMessage()
    }
  }


}
