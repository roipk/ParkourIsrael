import * as tslib_1 from "tslib";
import { Component, ViewChild, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
var LoginPage = /** @class */ (function () {
    function LoginPage(afAuth, userAuth, loadingController, router, ngZone, db, uAuth, alertController) {
        this.afAuth = afAuth;
        this.userAuth = userAuth;
        this.loadingController = loadingController;
        this.router = router;
        this.ngZone = ngZone;
        this.db = db;
        this.uAuth = uAuth;
        this.alertController = alertController;
        this.loadingRef = null;
        this.userExsist = false;
        this.emailExsist = false;
        this.emailSent = false;
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
        var password = this.passField.value;
        if (this.email && password && this.SignIn) {
            this.presentLoading();
            this.userAuth.auth.signInWithEmailAndPassword(this.email, password)
                .then(function (result) {
                _this.dismissLoading();
                // don't need this line
                //this.ngZone.run(() => {  this.router.navigateByUrl('/news') })
                _this.router.navigateByUrl('/news');
            }).catch(function () {
                _this.dismissLoading();
                //alert('Email or password not are correct')
                _this.simpleAlert('Email or password are not correct');
            });
        }
        /*
        else {
          //alert('Email or password are not correct')
          this.simpleAlert('Email or password are not correct')
        }
        */
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
    LoginPage.prototype.CheckUser = function (user) {
        var _this = this;
        this.db.collection('users', function (ref) { return ref.where('email', '==', user); }).get().subscribe(function (result) {
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
        this.db.collection('users', function (ref) { return ref.where('userName', '==', user); }).get().subscribe(function (result) {
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
    LoginPage.prototype.isResetMailInEmpty = function (strMail) {
        return strMail.length <= 0;
    };
    LoginPage.prototype.simpleAlert = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [
                                {
                                    text: 'OK'
                                }
                            ]
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
    LoginPage.prototype.alertPassword = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Reset your password',
                            inputs: [
                                {
                                    name: 'email',
                                    placeholder: 'Please enter your email'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Send',
                                    handler: function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var msg, alert2;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    msg = '';
                                                    if (!this.isResetMailInEmpty(data.email)) return [3 /*break*/, 1];
                                                    msg = 'Email field is empty';
                                                    return [3 /*break*/, 3];
                                                case 1: return [4 /*yield*/, this.passwordReset(data.email)];
                                                case 2:
                                                    _a.sent();
                                                    if (this.emailSent) {
                                                        msg = 'Email sent successfully';
                                                    }
                                                    else {
                                                        msg = 'Email is not valid';
                                                    }
                                                    _a.label = 3;
                                                case 3: return [4 /*yield*/, this.alertController.create({
                                                        message: msg,
                                                        buttons: [
                                                            {
                                                                text: 'OK',
                                                            }
                                                        ]
                                                    })];
                                                case 4:
                                                    alert2 = _a.sent();
                                                    return [4 /*yield*/, alert2.present()];
                                                case 5:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present().then(function () {
                                var firstInput = document.querySelector('ion-alert input');
                                firstInput.focus();
                                KeyboardEvent;
                                return;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.passwordReset = function (email) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userAuth.auth.sendPasswordResetEmail(email).then(function () {
                            _this.emailSent = true;
                        }).catch(function () {
                            _this.emailSent = false;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.onKeyUp = function (data) {
        data.keyCode;
        var ENTER_KEY_CODE = 13;
        if (data.keyCode === ENTER_KEY_CODE) {
            this.signInUser();
        }
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
            NgZone,
            AngularFirestore,
            AngularFireAuth,
            AlertController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map