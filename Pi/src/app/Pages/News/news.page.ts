import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {

  @ViewChild('messageField') messageField
  @ViewChild('mainContent') mainContent
  messages = []
  fullName = ''
  manager = false;
  constructor(
    private userAuth: AngularFireAuth,
    private router: Router,
    private uAuth: AngularFireAuth,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.uAuth.user.subscribe(() => {
      this.adminMode()
      this.afterUserInside()
     
    })
   

    
    this.db.collection('messages').valueChanges().subscribe(
     result => {
       result.sort((m1, m2) => {
          if(m1['timestamp'] < m2['timestamp']) return 1
          else return -1
       })
       if(this.messages.length <= 0) {
         this.messages = result
        // this.scrollToBottom()
       } else {
        this.messages.push(result[result.length - 1])
       }
     })
  }

  adminMode()
  {
    if(this.uAuth.auth.currentUser != null)
    {

    
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
    .get().subscribe(result => {
     
      this.manager = result.data().manager
      // this.fullName = result.data().nickName
    
    //alert(this.fullName +' is manager? ')
    if(this.manager != undefined && this.manager )
    {
      document.getElementById('manager').style.visibility = 'visible'
      document.getElementById('btnLogin').innerHTML = 'LogOut'
    }
    else
    {
      document.getElementById('manager').style.visibility = 'hidden'
      document.getElementById('btnLogin').innerHTML = 'LogOut'
    }
    })
  }
  else
  {
    document.getElementById('manager').style.visibility = 'hidden'
    document.getElementById('btnLogin').innerHTML='Login'
  }
}


  afterUserInside() {
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
    .get().subscribe(result => {
      this.fullName = result.data().fullName
    })
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


  login()
  {
    
    if(document.getElementById('btnLogin').innerHTML=='Login')
    { 
      this.router.navigateByUrl('/login')
    }
    else
    {
      this.userAuth.auth.signOut().then((result)=> {
        document.getElementById('btnLogin').innerHTML = 'Login'
        this.router.navigateByUrl('/home').then(()=>{})
      })
    }
  }


  

  scrollToBottom() {
    setTimeout(() => {  this.mainContent.scrollToBottom(700) }, 120)
  }

  onKeyUp(data) {
    const ENTER_KET_CODE = 13
    if (data.keyCode === ENTER_KET_CODE) {
      this.sendMessage()
    }
  }

}
