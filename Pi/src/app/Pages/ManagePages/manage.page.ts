import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { post } from 'selenium-webdriver/http';
import * as firebase from 'firebase';
import { AppComponent } from '../../app.component'
import { PostEditorPage } from '../post-editor/post-editor.page';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { LanguageComponent } from '../language/language.component';
import { Ptor } from 'protractor';
//import * as admin from 'firebase-admin';



@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
  host: { "spellcheck":"showAvatar()" }
})
export class ManagePage {

  @ViewChild('title') titleField
  @ViewChild('date') dateField
  @ViewChild('src') profile

  file_name = ''
  loadingRef = null
  manager = false;
  showPages = false;
  showPosts = false;
  showUsers = false;
  lan=true;
  defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/images%2Favatar.jpg?alt=media&token=ec1dfd38-fa0d-4f73-a953-51e2c7756f5f"
  avatar=this.defaultAvatar
  
  
  profiles=[]
  public posts = []
  public users = []
  public pages = [
    {
      titleEn: 'Home',
      titleHeb: 'ראשי',
      url: '/home',
      icon: 'home'
    },
    {
      titleEn: 'Contact',
      titleHeb: 'יצירת קשר',
      url: '/contact',
     // icon: 'home'
    },
    {
      titleEn: 'News',
      titleHeb: 'חדשות ועדכונים',
      url: '/news',
      // icon: 'home'
    },
    {
      titleEn: 'Signup',
      titleHeb: 'הרשמה',
      url: '/signup',
      // icon: 'home'
    },
    {
      titleEn: 'Maps',
      titleHeb: 'מפות',
      url: '/mpss',
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
    private cdRef: ChangeDetectorRef,
    
    
  ) { }


  ngOnInit(): void {
   
    // this.pt[1].name="m"
    // this.pt[1].url="mmm"
  this.LoadUsers()
  this.LoadMessage()
  // this.profile.src = this.defaultAvatar
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
        var j=0
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].imageProfile != '' && this.users[i].imageProfile!=this.defaultAvatar) {
           
            var storageRef = firebase.storage().ref()
            storageRef.child('ImageProfile/' + this.users[i].imageProfile).getDownloadURL().then(res => {
              this.profiles[j++]=this.users[i].userName
              this.profiles[j++]=res
              // debugger
            })
          } 
        }
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

  upgradeUser(){

  }

  isManager(user){
    return user.manager
  }

  changeStatus(user){
    if (user.manager){
      this.db.collection('users', ref => ref.where('userName', '==', user.userName)).get().subscribe(
        result => {
          result.forEach(element => {
            this.db.collection('users').doc(element.id).update({ manager : false })
          });
        }
      )
    }
    
    else{
      this.db.collection('users', ref => ref.where('userName', '==', user.userName)).get().subscribe(
        result => {
          result.forEach(element => {
            this.db.collection('users').doc(element.id).update({ manager : true })
          });
        }
      )
    } 
  }

  deleteUser(user){
      this.db.collection('users', ref => ref.where('userName', '==', user.userName)).get().subscribe(
        result => {
          result.forEach(element => {
            this.db.collection('users').doc(element.id).delete()
            //admin.auth().deleteUser(element.id)
          });
        }
      )
    
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



 showAvatar(user)
 {
  //  debugger
   for (let i = 0; i < this.profiles.length; i++) {
    if(user.userName == this.profiles[i])
    {
      this.defaultAvatar=this.profiles[i+1]
      return true
    }
 
    
  }
  this.defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/images%2Favatar.jpg?alt=media&token=ec1dfd38-fa0d-4f73-a953-51e2c7756f5f"
  return true
 }


}


