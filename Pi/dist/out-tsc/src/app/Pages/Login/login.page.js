import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
var LoginPage = /** @class */ (function () {
    //  isAdmin = observableOf('true');
    function LoginPage(afAuth, userAuth, loadingController, router, db, uAuth, alertController) {
        this.afAuth = afAuth;
        this.userAuth = userAuth;
        this.loadingController = loadingController;
        this.router = router;
        this.db = db;
        this.uAuth = uAuth;
        this.alertController = alertController;
        this.loadingRef = null;
        this.userExsist = false;
        this.emailExsist = false;
        this.email = '';
        this.SignIn = true;
        this.uid = this.afAuth.authState.pipe(map(function (authState) {
            if (!authState) {
                return null;
            }
            else {
                return authState.uid;
            }
            authState.uid;
        }));
        this.passwordType = 'password';
        this.passwordIcon = 'eye-off';
    }
    LoginPage.prototype.ngOnInit = function () {
        this.uAuth.user.subscribe(function () {
        });
    };
    LoginPage.prototype.signInUser = function () {
        var _this = this;
        // alert('in')
        // alert(this.userAuth.auth.currentUser.uid.match)
        var email = this.emailField.value;
        var password = this.passField.value;
        if (email && password && this.SignIn) {
            this.presentLoading();
            this.userAuth.auth.signInWithEmailAndPassword(this.email, password)
                .then(function (result) {
                _this.dismissLoading();
                _this.router.navigateByUrl('/news');
            }).catch(function () {
                _this.dismissLoading();
                alert('email or password not correct');
            });
        }
        else {
            alert('email or password not correct');
        }
    };
    LoginPage.prototype.googlelogin = function () {
        var _this = this;
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function (result) {
            _this.router.navigateByUrl('/news');
        }).catch(function () {
            _this.dismissLoading();
        });
    };
    LoginPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({ message: 'Please wait...', })];
                    case 1:
                        _a.loadingRef = _b.sent();
                        return [4 /*yield*/, this.loadingRef.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.dismissLoading = function () {
        this.loadingRef.dismiss();
    };
    LoginPage.prototype.login = function () {
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
    LoginPage.prototype.CheckEmail = function () {
        var _this = this;
        this.db.collection('users', function (ref) { return ref.where('email', '==', _this.emailField.value); }).get().subscribe(function (result) {
            if (result.empty) {
                _this.emailExsist = false;
            }
            else {
                _this.emailExsist = true;
                _this.email = _this.emailField.value;
                _this.SignIn = true;
                return;
            }
        });
        this.db.collection('users', function (ref) { return ref.where('userName', '==', _this.emailField.value); }).get().subscribe(function (result) {
            if (result.empty) {
                _this.userExsist = false;
            }
            else {
                _this.userExsist = true;
                var id = result.docs[0].id;
                _this.db.collection('users').doc(id).get().subscribe(function (result) {
                    _this.email = result.data().email;
                    _this.SignIn = true;
                    return;
                });
            }
        });
        this.SignIn = false;
    };
    LoginPage.prototype.hideShowPassword = function () {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    };
    LoginPage.prototype.isPasswordInEmpty = function () {
        return this.passField == null || this.passField.value == null || this.passField.value.length <= 0;
    };
    LoginPage.prototype.resetPassword = function () {
        /*
        this.userAuth.auth.sendPasswordResetEmail(this.emailField.value)
        .then((result) => {
          this.dismissLoading()
          this.router.navigateByUrl('/Login')
        }).catch(() => {
          this.dismissLoading()
          alert('email or password not correct')
        })
        */
        alert('Test');
        this.presentAlert();
        try {
            //alert('Test');
            //alert please enter your mail
            this.presentAlert();
            //this.userAuth.auth.sendPasswordResetEmail(this.emailField.value);
            //alert the password send to your mail
        }
        catch (e) {
            alert('Email is not valid');
        }
    };
    LoginPage.prototype.presentAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Alert',
                            subHeader: 'Subtitle',
                            message: 'This is an alert message.',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('email'),
        tslib_1.__metadata("design:type", Object)
    ], LoginPage.prototype, "emailField", void 0);
    tslib_1.__decorate([
        ViewChild('password'),
        tslib_1.__metadata("design:type", Object)
    ], LoginPage.prototype, "passField", void 0);
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            AngularFireAuth,
            LoadingController,
            Router,
            AngularFirestore,
            AngularFireAuth,
            AlertController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map