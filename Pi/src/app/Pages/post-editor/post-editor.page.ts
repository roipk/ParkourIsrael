import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
import { AppComponent } from '../../app.component'
import { defineBase } from '@angular/core/src/render3';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';




@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],

})



export class PostEditorPage implements OnInit {


  // @ViewChild('messageTitleField') MessageTitleField
  // @ViewChild('messageContentField') messageField
  @ViewChild('fileButton') fileButton
  @ViewChild('uploader') uploader
  @ViewChild('img') img


  public config = {
    placeholder: 'Type the content here!'
  }
  public Editor = ClassicEditor;
  loadingRef = null
  title = ''
  show_message=''
  find_title = []
  manager = false
  static docId = ''
  nameFile = ""
  oldNameFile = ''
  userName = ''
  fullName = ''
  nameToShow = ''
  email = ''
  userProfile=''
  file = File
  messages = ""



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
        this.userProfile=result.data().imageProfile
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

        title: this.title,
        email: this.email,
        from: this.nameToShow,
        content: this.messages,
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
      this.createMessage()
      
      this.db.collection('messages').add({
        show_message: this.show_message,
        userProfile: this.userProfile,
        title: this.title,
        email: this.email,
        from: this.nameToShow,
        content: this.messages,
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
    this.messages=''
    this.title=''
    PostEditorPage.docId = ''
    this.route.navigateByUrl('/news')
    }
  }


  createMessage() {
    this.find_title = this.messages.split('</h2>')
    this.find_title = this.find_title[0].split('<h2>')
    if (this.find_title[1]) {
      this.title = this.find_title[1]

    }
    else
    {
      this.title=''
    }
    if(this.messages.length>400)
    {
      for (let i = 0; i <400; i++) {
        this.show_message+= this.messages[i];
      }

      for (let i = 0; i <10; i++) {
        this.show_message += '.';
      }
    }
    else
    {
      this.show_message=this.messages
      for (let i = 0; i <10; i++) {
        this.show_message += '.';
      }
    }
  }

  isMessageInvalid(): boolean {
    if (this.messages == '&nbsp' || this.messages.length <= 0) {
      return true
    }

    return false
  }


  fileChangeEvent(e) {
    if (e == undefined) {
      this.file = null
      this.nameFile = ""
      this.img.src = ""
      return
    }
    // debugger
    this.file = e.target.files[0]
    if (this.file != undefined) {
      this.nameFile = "pi_" + Date.now() + "_" + this.file.name
      setTimeout(() => {
        this.img.src = URL.createObjectURL(e.target.files[0])
      },
        100);
    }
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
      this.db.collection('messages').doc(PostEditorPage.docId).get().subscribe(result => {
        if (this.oldNameFile != '' && this.oldNameFile != result.data().nameFile) {
          storageRef.child('images/' + this.oldNameFile).delete()
          storageRef.child('images/' + this.nameFile).put(this.file).then(res => {
            this.messages=''
            this.title=''
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
        this.messages=''
            this.title=''
        this.loadingRef.dismiss()
        this.route.navigateByUrl('/news')
      }).catch(() => {
        this.loadingRef.dismiss()
        alert('file error')
      })
    }
  }

  removeViewFile() {
    if (this.img != undefined) {
      this.img.src = ""
      this.nameFile = ""
      this.fileButton.value = ""
    }
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



  GetPost() {
    this.db.collection("messages").doc(PostEditorPage.docId).get().subscribe(result => {
      // this.messageField.value = result.data().content
      // this.MessageTitleField.value = result.data().title
      this.oldNameFile = result.data().file_name
      if (result.data().file_name != '') {
        var storageRef = firebase.storage().ref()
        storageRef.child('images/' + result.data().file_name).getDownloadURL().then(res => {
          this.img.src = res
        })
      }

    })
  }







  public onChange({ editor }: ChangeEvent) {
    this.messages = editor.getData();

  }

}
