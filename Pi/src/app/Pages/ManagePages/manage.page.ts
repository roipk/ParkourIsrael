import { Component, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { post } from 'selenium-webdriver/http';
import * as firebase from 'firebase';
import { PostEditorPage } from '../post-editor/post-editor.page';



@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
})
export class ManagePage {

  @ViewChild('title') titleField
  @ViewChild('date') dateField


  file_name = ''
  loadingRef = null
  manager = false;
  showPages = false;
  showPosts = false;
  showUsers = false;

  public posts = []
  public users = []
  public pages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Contact',
      url: '/contact',
     // icon: 'home'
    },
    {
      title: 'News',
      url: '/news',
      // icon: 'home'
    },
    {
      title: 'Signup',
      url: '/signup',
      // icon: 'home'
    },
  ]
  





  //{ url: '1', name: 'test' }
  constructor(
    private uAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private route: Router,
    private loadingController: LoadingController,
  ) { }


  ngOnInit(): void {
    
  this.LoadUsers()
  this.LoadMessage()
  }

  LoadMessage() {
    this.db.collection('messages').valueChanges().subscribe(
      result => {
        result.sort((m1, m2) => {
          if (m1['userName'] < m2['userName']) return 1
          else return -1
        })
        this.posts = [...result]
        if(this.loadingRef != null)
          this.dismissLoading()
      })
  }

  LoadUsers()
  {
    this.db.collection('users').valueChanges().subscribe(
      result => {
        result.sort((m1, m2) => {
          if (m1['userName'] > m2['userName']) return 1
          else return -1
        })
        this.users = [...result]
        if(this.loadingRef != null)
          this.dismissLoading()
      })
  }

  search(list, find) {
    if (list == this.posts) {
      if (find == '') {
        this.db.collection('messages').valueChanges().subscribe(
          result => {
            result.sort((m1, m2) => {
              if (m1['timestamp'] < m2['timestamp']) return 1
              else return -1
            })
            this.posts = [...result]
          })
        return
      }
      this.posts = [...list.filter(obj => {
        return obj.title === find
      })]
    }

    if (list == this.users) {

      if (find == '') {
        this.db.collection('users').valueChanges().subscribe(
          result => {
            result.sort((m1, m2) => {
              if (m1['userName'] > m2['userName']) return 1
              else return -1
            })
            this.users = [...result]
          })
        return
      }
      this.users = [...list.filter(obj => {
        return obj.userName === find
      })]
    }
  }


async EditPost(docId: string)
{
  this.db.collection('messages', ref => ref.where('timestamp', '==', docId)).get().subscribe(result => {
    PostEditorPage.docId = result.docs[0].id
    this.route.navigateByUrl('/writePost')
  })
}

  async deletePost(docId: string, file_name: string) {
    this.presentLoading();
    this.file_name = file_name
    if (this.file_name != '') {
      this.removeFile()
    }
    this.db.collection('messages', ref => ref.where('timestamp', '==', docId)).get().subscribe(result => {
      this.db.collection("messages").doc(result.docs[0].id).delete().catch(() => {
        if(this.loadingRef != null)
          this.dismissLoading()
       alert('error while removing message')
}).then(()=>{
  this.LoadMessage()
});
      
    })
  }

  removeFile() {
    var storageRef = firebase.storage().ref()
    storageRef.child('images/' + this.file_name).delete().then(() => {
    }).catch(() => {
      alert('error while removing file')
    })
  }

  openPagesList() {
    this.showPages = !this.showPages;
  }

  openPostsList() {
    this.showPosts = !this.showPosts;
  }

  openUsersList() {
    this.showUsers = !this.showUsers;
  }


  async presentLoading() {
    this.loadingRef = await this.loadingController.create({ message: 'Please wait...', })
    await this.loadingRef.present()
  }

  
  dismissLoading() {
    this.loadingRef.dismiss()
    this.loadingRef = null
  }

}


