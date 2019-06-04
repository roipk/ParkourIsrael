import * as tslib_1 from "tslib";
// ============================= imports ===================================//
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from '../app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import { IsManagerGuard } from './is-manager-guard/is-manager.guard';
// ==========================================================================//
var AppComponent = /** @class */ (function () {
    // =============================================//
    // ================== constructor ========================//
    function AppComponent(platform, splashScreen, statusBar, user, uAuth, userAuth, db, 
    // private guard: IsManagerGuard,
    // private ngZone: NgZone,
    router, menu) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.user = user;
        this.uAuth = uAuth;
        this.userAuth = userAuth;
        this.db = db;
        this.router = router;
        this.menu = menu;
        // @ViewChild('titlePage') titlePage
        // ============================================================================================//
        // ========= variables ===========//
        this.showFiller = true;
        this.mobile = false;
        this.manager = false;
        this.fullName = '';
        this.title = 'user-servic';
        // ===============================//
        // ========= all pages ===========//
        this.appPages = [
            {
                title: 'Home',
                url: '/home',
                icon: 'home'
            },
            {
                title: 'News',
                url: '/news',
            },
        ];
        // ================================//
        // ============ example for item ===============//
        this.items = [
            { url: '1', name: 'test' },
            { url: '1', name: 'test2' },
            { url: '1', name: 'test3' },
            { url: '1', name: 'test4' },
            { url: '1', name: 'test5' },
            { url: '1', name: 'test6' }
        ];
        this.initializeApp();
    }
    // ========================================================//
    // ======== page initialization =============//
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userMode();
        this.userAuth.user.subscribe(function () {
            _this.userMode();
            // this.guard.ucleaser = true
        });
        this.isMobile();
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    // ==========================================//
    //====================================================== functions ==========================================//
    AppComponent.prototype.isMobile = function () {
        var w = document.documentElement.clientWidth;
        var breakpoint = 700;
        if (w < breakpoint) {
            this.mobile = true;
            return true;
        }
        else {
            this.mobile = false;
            return false;
        }
    };
    AppComponent.prototype.userMode = function () {
        var _this = this;
        if (this.userAuth.auth.currentUser != null) {
            this.db.collection('users').doc(this.userAuth.auth.currentUser.uid)
                .get().subscribe(function (result) {
                _this.manager = result.data().manager;
                if (!_this.isMobile()) {
                    _this.userLogin.nativeElement.innerHTML = 'LogOut';
                    _this.loginNickName.nativeElement.innerHTML = _this.loginNickName.nativeElement.innerHTML + " " + result.data().userName + " ";
                }
            });
        }
        else {
            if (this.userLogin && this.loginNickName) {
                this.userLogin.nativeElement.innerHTML = 'Login';
                this.loginNickName.nativeElement.innerHTML = 'Welcome';
            }
        }
    };
    AppComponent.prototype.isUser = function () {
        if (this.userAuth.auth.currentUser != null)
            return true;
        else
            return false;
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        if (this.userLogin.nativeElement.innerHTML == 'Login') {
            this.router.navigateByUrl('/login');
        }
        else {
            this.manager = false;
            this.userAuth.auth.signOut().then(function (result) {
                _this.userLogin.nativeElement.innerHTML = 'Login';
                _this.router.navigateByUrl('/home');
            });
        }
    };
    AppComponent.prototype.getManager = function () {
        this.isMobile();
        return this.manager;
    };
    tslib_1.__decorate([
        ViewChild('user'),
        tslib_1.__metadata("design:type", Object)
    ], AppComponent.prototype, "userLogin", void 0);
    tslib_1.__decorate([
        ViewChild('loginNickName'),
        tslib_1.__metadata("design:type", Object)
    ], AppComponent.prototype, "loginNickName", void 0);
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            UserService,
            AngularFireAuth,
            AngularFireAuth,
            AngularFirestore,
            Router,
            MenuController])
    ], AppComponent);
    return AppComponent;
}()); //end  class
export { AppComponent };
//# sourceMappingURL=app.component.js.map