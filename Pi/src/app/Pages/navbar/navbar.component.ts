import { Component, OnInit, ViewChild, NgZone, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { UserService } from '../app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IsManagerGuard } from '../../is-manager-guard/is-manager.guard'
import * as firebase from 'firebase';


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
  @ViewChild('avatar') avatar
  // @ViewChild('titlePage') titlePage
  // ============================================================================================//


  

  // ========= variables ===========//
  showFiller = true;
  mobile = false;
  manager = false;
  user='';
  fullName = '';
  title = 'user-servic';
  lan = 'English'
  map = 'Spots'
  static reload = false
  defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/images%2Favatar.jpg?alt=media&token=ec1dfd38-fa0d-4f73-a953-51e2c7756f5f"
  oldLan = ''

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
      titleEn: 'Training Classes',
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
    { url: '/parkour', nameEn: 'Parkour', nameHeb: 'פארקור' },
    { url: '/us', nameEn: 'Who we are', nameHeb: 'מי אנחנו' },
    { url: '/doc', nameEn: 'Documents', nameHeb: 'מסמכים' },

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
    private cdRef: ChangeDetectorRef,
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

    NavbarComponent.reload = false
    this.userMode()
    this.userAuth.user.subscribe(() => {
      this.userMode()
      // this.guard.ucleaser = true
    })
    this.isMobile()
    // this.testMap="https://www.google.com/maps/d/embed?mid=1zIAU9gEwIa6zZTQv7l8W_Ohbwds"
    // this.language(this.languages[0])
    // this.avatar.src = this.defaultAvatar;

  }



  ngAfterViewChecked() {
    if (NavbarComponent.reload) { // check if it change, tell CD update view
      //  debugger
      this.ngOnInit()
      this.cdRef.detectChanges();
    }
    
    if(this.user!='')
    {
      if (this.lan == this.languages[0].name) {
        this.userLogin.nativeElement.innerHTML = 'LogOut'
        this.loginNickName.nativeElement.innerHTML = 'Welcome  <ion-icon name="arrow-dropdown"></ion-icon>'
        this.loginNickName.nativeElement.innerHTML = "Welcome " + this.user + ' <ion-icon name="arrow-dropdown"></ion-icon>'
      }
      else {
        this.userLogin.nativeElement.innerHTML = 'התנתק'
        this.loginNickName.nativeElement.innerHTML = ' <ion-icon name="arrow-dropdown"></ion-icon> ברוך הבא'
        this.loginNickName.nativeElement.innerHTML = ' <ion-icon name="arrow-dropdown"></ion-icon>' + this.user + ' ברוך הבא '
      }
      this.user=''
    }

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
          this.oldLan = result.data().language
          if (this.oldLan != '') {
          this.lan = this.oldLan
          }
          if (result.data().imageProfile != '' && result.data().imageProfile != this.defaultAvatar) {
            var storageRef = firebase.storage().ref()
            storageRef.child('ImageProfile/' + result.data().imageProfile).getDownloadURL().then(res => {
              this.avatar.src = res
            })
          }
          else {
            this.avatar.src = this.defaultAvatar
          }

          this.manager = result.data().manager
          if (!this.isMobile() && this.userAuth.auth.currentUser != null) {
           this.user=result.data().userName
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
        this.loginNickName.nativeElement.innerHTML = '<ion-icon name="arrow-dropdown"></ion-icon>' + this.user + ' ברוך הבא '
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
    if (this.userAuth.auth.currentUser != null && this.lan != this.oldLan) {
      this.db.collection('users').doc(this.userAuth.auth.currentUser.uid).update({ language: this.lan })

    }



    //  alert("laguage is " + this.lan)

  }

  maps(map) {

    this.userMode();
    if (map.titleEn == 'Spots') {
      MapsPage.mapSpot = true;
      MapsPage.mapTrain = false;
      MapsPage.mapClass = false;
    }
    else if (map.titleEn == 'Training Classes') {
      MapsPage.mapSpot = false;
      MapsPage.mapTrain = true;
      MapsPage.mapClass = false;
    }
    else if (map.titleEn == 'Training People') {
      MapsPage.mapSpot = false;
      MapsPage.mapTrain = false;
      MapsPage.mapClass = true;
    }
    this.router.navigateByUrl('/maps')

    // debugger;
  }




  //===========================================================================================================//

}
