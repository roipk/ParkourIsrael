// ============================= imports ===================================//
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from '../app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import { IsManagerGuard } from './is-manager-guard/is-manager.guard';
// ==========================================================================//


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})




export class AppComponent {
  [x: string]: any;

  // ============================= all id from object in html ===================================//
  @ViewChild('user') userLogin
  @ViewChild('loginNickName') loginNickName

  // @ViewChild('titlePage') titlePage
  // ============================================================================================//




  // ========= variables ===========//
  showFiller = true;
  mobile = false;
  manager = false;
  fullName = '';
  title = 'user-servic';
  lan = 'English'

  // ===============================//




  // ========= all pages ===========//
  public appPages = [
    {
      titleEn: 'Home',
      titleHeb: 'ראשי',
      url: '/home',
      icon: 'home'
    },
    {
      titleEn: 'News',
      titleHeb: 'ראשי',
      url: '/news',
      // icon: 'news'
    },
  ];
  // ================================//








  // ============ example for item ===============//
  public items = [
    { url: '1', nameEn: 'test', nameHeb: 'בדיקה' },
    { url: '1', nameEn: 'test2', nameHeb: 'בדיקה' },
    { url: '1', nameEn: 'test3', nameHeb: 'בדיקה' },
    { url: '1', nameEn: 'test4', nameHeb: 'בדיקה' },
    { url: '1', nameEn: 'test5', nameHeb: 'בדיקה' },
    { url: '1', nameEn: 'test6', nameHeb: 'בדיקה' }
  ]
  // =============================================//



  public languages = [
    { name: 'English' },
    { name: 'עברית' },
  ]



  // ================== constructor ========================//
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public user: UserService,

    private uAuth: AngularFireAuth,
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    // private guard: IsManagerGuard,
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
      // this.guard.ucleaser = true
    })
    this.isMobile()

    // this.language(this.languages[0])
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // ==========================================//




  //====================================================== functions ==========================================//

  lang() {

    if (this.lan == this.languages[0].name) {
      return true;
    }
    else
      return false;
  }

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
            if (this.lan == this.languages[0].name) {
              this.userLogin.nativeElement.innerHTML = 'LogOut'
              this.loginNickName.nativeElement.innerHTML ="Welcome " + result.data().userName + " &darr;"
            }
            else {
              this.userLogin.nativeElement.innerHTML = 'התנתק'
              this.loginNickName.nativeElement.innerHTML =" &darr; ברוך הבא " + result.data().userName
            }
          }
        })
    }
    else {
      if (this.userLogin && this.loginNickName && this.lan == this.languages[0].name) {
        this.userLogin.nativeElement.innerHTML = 'Login'
        this.loginNickName.nativeElement.innerHTML = 'Welcome  &darr;'
      }
      else if (this.userLogin && this.loginNickName) {
        this.userLogin.nativeElement.innerHTML = 'כניסה'
        this.loginNickName.nativeElement.innerHTML = '&darr; ברוך הבא'
      }
    }
  }


  isUser(){
    if (this.userAuth.auth.currentUser != null)
    return true
    else
    return false
  }


  login() {
    if (this.userLogin.nativeElement.innerHTML == 'Login' || this.userLogin.nativeElement.innerHTML == 'התחבר') {
      this.router.navigateByUrl('/login')
    }
    else {
      this.manager = false
      this.userAuth.auth.signOut().then((result) => {
        if (this.lan == this.languages[0].name)
          this.userLogin.nativeElement.innerHTML = 'Login'
        else
          this.userLogin.nativeElement.innerHTML = 'התחבר'
        this.router.navigateByUrl('/home')
      })
    }
  }


  getManager() {
    this.isMobile()
    return this.manager
  }

  // setPage(page)
  // {
  //   page.titlePage.nativeElement.innerHTML  = page
  // }


  language(language) {
    // debugger
    this.lan = language.name
    //  alert("laguage is " + this.lan)

  }





  //===========================================================================================================//

}//end  class

