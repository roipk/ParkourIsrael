import { Component, OnInit ,ViewChild, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from '../app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IsManagerGuard } from './is-manager-guard/is-manager.guard';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  @ViewChild('user') userLogin
  @ViewChild('loginNickName') loginNickName

  title = 'user-servic';
  fullName = ''
  manager = false;
  isMobile = false;

  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];


  public items = [
    { url: '1', name: 'test' },
    { url: '1', name: 'test2' },
    { url: '1', name: 'test3' },
    { url: '1', name: 'test4' },
    { url: '1', name: 'test5' },
    { url: '1', name: 'test6' }
  ]
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public user: UserService,

    private uAuth: AngularFireAuth,
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    private guard: IsManagerGuard,
    // private ngZone: NgZone,
    private router: Router
  ) 
  {
    this.initializeApp();
  }


  getIsMobile() {
    const w = document.documentElement.clientWidth;
    const breakpoint = 768;
    console.log(w);
    if (w < breakpoint) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }
  }

  ngOnInit(): void {
    this.userMode()
    this.userAuth.user.subscribe(() => {
      this.userMode()   
      this.guard.user = true
    })

    // this.is_admin()
    //this.manage.nativeElement.attributes[2].value = "myVar = false"
    //var x = this.manage.nativeElement.attributes[3].value
    //console.log(x)
    // debugger

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // is_admin() {
  //   if (this.userAuth.auth.currentUser != null) {
  //     this.db.collection('users').doc(this.userAuth.auth.currentUser.uid)
  //       .get().subscribe(result => {
  //         alert('manager is ' + result.data().manager)
  //         this.ngZone.run(() => { this.manager = result.data().manager })
  //         alert(this.manager)
  //       })
  //   }
  //   else {
  //     alert('in3')
  //     this.ngZone.run(() => { this.manager = false })
  //   }


  // }

  getManager() {
    return this.manager
  }
  getMobile() {
    return this.isMobile
  }

  userMode() {
    if (this.userAuth.auth.currentUser != null) {
      this.db.collection('users').doc(this.userAuth.auth.currentUser.uid)
        .get().subscribe(result => {
          this.manager = result.data().manager
          this.userLogin.nativeElement.innerHTML = 'LogOut'
          this.loginNickName.nativeElement.innerHTML = 'Welcome ' + result.data().userName
        })
    }
    else {
      if (this.userLogin && this.loginNickName) {
        this.userLogin.nativeElement.innerHTML = 'Login'
        this.loginNickName.nativeElement.innerHTML = 'Welcome'
      }
    }
  }




  login() {
    if (this.userLogin.nativeElement.innerHTML == 'Login') {
      this.router.navigateByUrl('/login')
    }
    else {
      this.manager = false
      this.userAuth.auth.signOut().then((result) => {
        this.userLogin.nativeElement.innerHTML = 'Login'
        this.router.navigateByUrl('/home')
      })
    }
  }




}
