import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
import { AppComponent } from '../../app.component'
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
  static docId = ''
  nameFile = ''
  oldNameFile=''
  userName = ''
  fullName = ''
  nameToShow = ''
  email = ''

  file = File
  messages = []



  constructor(
    private uAuth: AngularFireAuth,
    private ngZone: NgZone,
    private route: Router,
    private loadingController: LoadingController,
    private db: AngularFirestore,
    private admin: AppComponent) { }



  ngOnInit() {
    this.uAuth.user.subscribe(() => {
      this.afterUserInside()
    })
    if (PostEditorPage.docId != '') {
      this.GetPost()
    }
  }

  afterUserInside() {
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
      .get().subscribe(result => {
        this.userName = result.data().userName
        this.fullName = result.data().fullName
        this.email = result.data().email
      })

  }


  sendMessage() {
    if (this.isMessageInvalid()) {
      return
    }

    if (this.nameToShow == '')
      this.nameToShow = this.userName
    if (PostEditorPage.docId != '') {
      this.db.collection('messages').doc(PostEditorPage.docId).update({

        title: this.MessageTitleField.value,
        email: this.email,
        from: this.nameToShow,
        content: this.messageField.value,
        timestamp: new Date().getTime(),
        file_name: this.nameFile,
        date: this.postDate()[1],
        show_date: this.postDate()[0]
      }).then(() => {
        if (this.nameToShow == "צוות פארקור ישראל") {
          this.db.collection('messages').doc(PostEditorPage.docId).update({
            from_manager: this.userName
          })
        }
      }).catch(e => {
        alert('Failed to update the firebase')
      })


    }
    else {
      this.db.collection('messages').add({
        title: this.MessageTitleField.value,
        email: this.email,
        from: this.nameToShow,
        content: this.messageField.value,
        timestamp: new Date().getTime(),
        file_name: this.nameFile,
        date: this.postDate()[1],
        show_date: this.postDate()[0]
      }).then(res => {
        if (this.nameToShow == "צוות פארקור ישראל") {
          res.update({
            from_manager: this.userName
          })
        }
      }).catch(e => {
        alert('Failed to update the firebase')
      })
    }
    if (this.nameFile != '')
      this.uploadFile()
    else {
      this.messageField.value = ''
      this.MessageTitleField.value = ''
      PostEditorPage.docId = ''
      this.route.navigateByUrl('/news')
    }
  }

  isMessageInvalid(): boolean {
    if (this.messageField == null || this.messageField.value == null || this.messageField.value.length <= 0 || this.messageField.value == '&nbsp') {
      return true
    }
    if (this.MessageTitleField == null || this.MessageTitleField.value == null || this.MessageTitleField.value.length <= 0 || this.MessageTitleField.value == '&nbsp') {
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
    else if (e.target.value == 'manager') {
      this.nameToShow = 'צוות פארקור ישראל'
    }
  }

  uploadFile() {

    this.presentLoading()
    var storageRef = firebase.storage().ref()
    if (PostEditorPage.docId != '') {
      this.db.collection('messages').doc(PostEditorPage.docId).get().subscribe(result=>{
        if(this.oldNameFile!='' && this.oldNameFile!= result.data().nameFile)
          {
            storageRef.child('images/' + this.oldNameFile).delete()
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
      })
    }
    else {
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

  getManager() {
    return this.admin.getManager()
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
      var dmonth = "0" + (d.getMonth()+1)
    else
      var dmonth = (d.getMonth()+1).toString()

      if (d.getHours() < 10)
      var dhours = "0" + d.getHours()
    else
      var dhours = d.getHours().toString()

    var showDate = +d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " at " + d.getHours() + ":" + min

    var dbDate = d.getFullYear() + "/" + dmonth + "/" + ddate + " at " + dhours + ":" + min

    var date = [showDate, dbDate]
    return date
  }



  GetPost() {
    this.db.collection("messages").doc(PostEditorPage.docId).get().subscribe(result => {
      this.messageField.value = result.data().content
      this.MessageTitleField.value = result.data().title
      this.oldNameFile=result.data().file_name
      if (result.data().file_name != '') {
        var storageRef = firebase.storage().ref()
        storageRef.child('images/' + result.data().file_name).getDownloadURL().then(res => {
          this.img.src = res
        })
      }

    })
  }

}
