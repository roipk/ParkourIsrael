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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public user: UserService,
    
    private uAuth: AngularFireAuth,
    private userAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router
  ) {
    this.initializeApp();
    
  }

  ngOnInit(): void {
    this.uAuth.user.subscribe(() => {
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
    
    if(this.uAuth.auth.currentUser != null)
    {
      // alert('in')
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
    .get().subscribe(result => {
      // alert('in2')
    this.manager = result.data().manager
    // alert('in2.1')
    if(this.manager != undefined && this.manager )
    {
      // alert('in3')
      document.getElementById('manager').style.visibility = 'visible'
      document.getElementById('btnLogin').innerHTML='LogOut'
    }
    else
    { 
      //alert('in4')
      
      document.getElementById('manager').style.visibility = 'hidden'
      document.getElementById('btnLogin').innerHTML='LogOut'
    }
    })
  }
  else
  {
    // alert('in5')
    document.getElementById('manager').style.visibility = 'hidden'
    document.getElementById('btnLogin').innerHTML='Login'
  }
  // alert('in6')
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
