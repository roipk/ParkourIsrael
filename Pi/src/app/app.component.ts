// ============================= imports ===================================//
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from '../app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IsManagerGuard } from './is-manager-guard/is-manager.guard';
// ==========================================================================//


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})




export class AppComponent {

  // ============================= all id from object in html ===================================//
  @ViewChild('user') userLogin
  @ViewChild('loginNickName') loginNickName
  // ============================================================================================//




  // ========= variables ===========//
  showFiller = true;
  mobile = false;
  manager = false;
  fullName = ''
  title = 'user-servic';
  // ===============================//




  // ========= all pages ===========//
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'News',
      url: '/news',
      // icon: 'news'
    },
  ];
  // ================================//








  // ============ example for item ===============//
  public items = [
    { url: '1', name: 'test' },
    { url: '1', name: 'test2' },
    { url: '1', name: 'test3' },
    { url: '1', name: 'test4' },
    { url: '1', name: 'test5' },
    { url: '1', name: 'test6' }
  ]
  // =============================================//






  // ================== constructor ========================//
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
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }
  // ========================================================//





  // ======== page initialization =============//
  ngOnInit(): void {
    this.userMode()
    this.userAuth.user.subscribe(() => {
      this.userMode()
      this.guard.user = true
    })
    this.isMobile()
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // ==========================================//



  
  //====================================================== functions ==========================================//
  
  isMobile() {
    const w = document.documentElement.clientWidth;
    const breakpoint = 700;
    if (w < breakpoint) {
      this.mobile = true
      return true
    } else {
      this.mobile = false
      return false
    }
  }


  
  userMode() {
    if (this.userAuth.auth.currentUser != null) {
      this.db.collection('users').doc(this.userAuth.auth.currentUser.uid)
        .get().subscribe(result => {
          this.manager = result.data().manager
          if (!this.isMobile()) {
            this.userLogin.nativeElement.innerHTML = 'LogOut'
            this.loginNickName.nativeElement.innerHTML = 'Welcome ' + result.data().userName
          }
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


  getManager() {
    this.isMobile()
    return this.manager
  }

//===========================================================================================================//

}//end  class

