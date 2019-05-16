import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from '../app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title = 'user-servic';
  fullName = ''
  manager = false;

  items = [
    {url: '1', name:'test'},
    {url: '1', name:'test2'},
    {url: '1', name:'test3'},
    {url: '1', name:'test4'},
    {url: '1', name:'test5'},
    {url: '1', name:'test6'}
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public user: UserService,
    
    // private uAuth: AngularFireAuth,
    private userAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.userAuth.user.subscribe(() => {
     this.adminMode()
    })
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



 
  adminMode()
  {
    
    if(this.userAuth.auth.currentUser != null)
    {
      this.db.collection('users').doc(this.userAuth.auth.currentUser.uid)
      .get().subscribe(result => {
      this.manager = result.data().manager
      if(this.manager != undefined && this.manager )
      {
        document.getElementById('manager').style.visibility = 'visible'
      }
      else
      { 
        document.getElementById('manager').style.visibility = 'hidden'
      }
      document.getElementById('btnLogin').innerHTML='LogOut'
      document.getElementById('loginNickName').innerHTML = 'welcome '+ result.data().userName
      })
    }
  else
  {
    document.getElementById('manager').style.visibility = 'hidden'
    document.getElementById('btnLogin').innerHTML='Login'
    document.getElementById('loginNickName').innerHTML ='welcome'
  }
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




}
