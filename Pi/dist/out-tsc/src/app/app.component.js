import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from '../app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, user, 
    // private uAuth: AngularFireAuth,
    userAuth, db, router) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.user = user;
        this.userAuth = userAuth;
        this.db = db;
        this.router = router;
        this.title = 'user-servic';
        this.fullName = '';
        this.manager = false;
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
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userAuth.user.subscribe(function () {
            _this.adminMode();
        });
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.adminMode = function () {
        var _this = this;
        if (this.userAuth.auth.currentUser != null) {
            this.db.collection('users').doc(this.userAuth.auth.currentUser.uid)
                .get().subscribe(function (result) {
                _this.manager = result.data().manager;
                if (_this.manager != undefined && _this.manager) {
                    document.getElementById('manager').style.visibility = 'visible';
                }
                else {
                    document.getElementById('manager').style.visibility = 'hidden';
                }
                document.getElementById('btnLogin').innerHTML = 'LogOut';
                document.getElementById('loginNickName').innerHTML = 'Welcome ' + result.data().userName;
            });
        }
        else {
            document.getElementById('manager').style.visibility = 'hidden';
            document.getElementById('btnLogin').innerHTML = 'Login';
            document.getElementById('loginNickName').innerHTML = 'Welcome';
        }
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        if (document.getElementById('btnLogin').innerHTML == 'Login') {
            this.router.navigateByUrl('/login');
        }
        else {
            this.userAuth.auth.signOut().then(function (result) {
                document.getElementById('btnLogin').innerHTML = 'Login';
                _this.router.navigateByUrl('/home').then(function () { });
            });
        }
    };
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
            AngularFirestore,
            Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map