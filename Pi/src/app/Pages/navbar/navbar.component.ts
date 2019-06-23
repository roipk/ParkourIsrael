import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { UserService } from '../app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IsManagerGuard } from '../../is-manager-guard/is-manager.guard'

import { from } from 'rxjs';

import { LanguageComponent } from '../language/language.component'
import { MapsPage } from '../maps/maps.page';

// import {HomePage} from '../Home/home.page'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  [x: string]: any;

  // ============================= all id from object in html ===================================//
  @ViewChild('loginNickName') loginNickName
  @ViewChild('user') userLogin
  @ViewChild('testMap') testMap
  // @ViewChild('titlePage') titlePage
  // ============================================================================================//




  // ========= variables ===========//
  showFiller = true;
  mobile = false;
  manager = false;
  fullName = '';
  title = 'user-servic';
  lan = 'English'
  map = 'Spots'
 

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

  public allMaps = [
    {
      titleEn: 'Spots',
      titleHeb: 'ספוטים',
      url: '/maps',
    },
    {
      titleEn: 'Training Class',
      titleHeb: 'חוגים',
      url: '/maps',
      // icon: 'news'
    },
    {
      titleEn: 'Training People',
      titleHeb: 'מאמנים',
      url: '/maps',
      // icon: 'news'
    },
  ];
  // ================================//







  // ============ example for item ===============//
  public items = [
    { url: '/parkour', nameEn: 'parkour', nameHeb: 'פארקור' },
    { url: '/us', nameEn: 'how we are', nameHeb: 'מי אנחנו' },
    { url: '/doc', nameEn: 'document', nameHeb: 'מסמכים' },

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
    // public user: UserService,

    private uAuth: AngularFireAuth,
    private userAuth: AngularFireAuth,
    private db: AngularFirestore,
    // private guard: IsManagerGuard,
    // private ngZone: NgZone,
    private router: Router,
    private guard: IsManagerGuard,
    // private home: HomePage,
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
    // this.testMap="https://www.google.com/maps/d/embed?mid=1zIAU9gEwIa6zZTQv7l8W_Ohbwds"
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
      LanguageComponent.lan = true
      // HomePage.lan=true
      return true;
    }
    else {
      LanguageComponent.lan = false
      // HomePage.lan=false
      return false;
    }
  }


  // maps()
  // {
  //   if (this.map == this.allMaps[0].titleEn || this.map == this.allMaps[0].titleHeb ) {
  //     LanguageComponent.lan=true
  //     // HomePage.lan=true
  //     return true;
  //   }
  //   else
  //     {
  //       LanguageComponent.lan=false
  //       // HomePage.lan=false
  //       return false;
  //     }
  // }

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
          if (!this.isMobile() && this.userAuth.auth.currentUser != null) {
            if (this.lan == this.languages[0].name) {
              this.userLogin.nativeElement.innerHTML = 'LogOut'
              this.loginNickName.nativeElement.innerHTML = 'Welcome  <ion-icon name="arrow-dropdown"></ion-icon>'
              this.loginNickName.nativeElement.innerHTML = "Welcome " + result.data().userName + ' <ion-icon name="arrow-dropdown"></ion-icon>'
            }
            else {
              this.userLogin.nativeElement.innerHTML = 'התנתק'
              this.loginNickName.nativeElement.innerHTML = ' <ion-icon name="arrow-dropdown"></ion-icon> ברוך הבא'
              this.loginNickName.nativeElement.innerHTML = ' <ion-icon name="arrow-dropdown"></ion-icon>ברוך הבא ' + result.data().userName
            }
          }
        })
    }
    else {
      if (this.userLogin && this.loginNickName && this.lan == this.languages[0].name) {
        this.userLogin.nativeElement.innerHTML = 'Login'
        this.loginNickName.nativeElement.innerHTML = 'Welcome  <ion-icon name="arrow-dropdown"></ion-icon>'
      }
      else if (this.userLogin && this.loginNickName) {
        this.userLogin.nativeElement.innerHTML = 'כניסה'
        this.loginNickName.nativeElement.innerHTML = '<ion-icon name="arrow-dropdown"></ion-icon> ברוך הבא'
      }
    }
  }


  isUser() {
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
    this.guard.setUser(this.manager)
    return this.manager
  }

  // setPage(page)
  // {
  //   page.titlePage.nativeElement.innerHTML  = page
  // }


  language(language) {

    this.userMode();
    // this.home.setLan(language) 
    this.lan = language.name
    //  alert("laguage is " + this.lan)

  }

  maps(map) {
    
    this.userMode();
    if (map.titleEn == 'Spots')
     {
       MapsPage.mapSpot=true;
       MapsPage.mapTrain=false;
       MapsPage.mapClass=false;
     }
    else if (map.titleEn == 'Training Class')
     {
      MapsPage.mapSpot=false;
      MapsPage.mapTrain=true;
      MapsPage.mapClass=false;
     }
     else if (map.titleEn == 'Training People')
     {
      MapsPage.mapSpot=false;
      MapsPage.mapTrain=false;
      MapsPage.mapClass=true;
     }
     this.router.navigateByUrl('/maps')
     
    // debugger;
  }




  //===========================================================================================================//

}
