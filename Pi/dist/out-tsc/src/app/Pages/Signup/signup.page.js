import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
var SignupPage = /** @class */ (function () {
    function SignupPage(userAuth, db, loadingController, router, uAuth) {
        this.userAuth = userAuth;
        this.db = db;
        this.loadingController = loadingController;
        this.router = router;
        this.uAuth = uAuth;
        this.loadingRef = null;
        this.users = [];
        this.userEmpty = true;
        this.emailEmpty = true;
    }
    SignupPage.prototype.ngOnInit = function () {
        this.uAuth.user.subscribe(function (result) {
        });
    };
    SignupPage.prototype.createNewUser = function () {
        var _this = this;
        var email = this.emailField.value;
        var password = this.passField.value;
        var firstName = this.firstNameField.value;
        var lastName = this.lastNameField.value;
        var fullName = firstName + ' ' + lastName;
        var userName = this.userNameField.value;
        var confirm = this.confirmField.value;
        if (fullName == '' || userName == '') {
            alert('one or more values empty');
        }
        else if (password.length < 8) {
            alert('the password need to be 8 characters:\n' +
                '*One or more big letter (A-Z)\n' +
                '*One or more small letter (a-z)\n' +
                '*One or more sign (@!%)\n' +
                '*One or more number (0-9)\n');
        }
        else if (confirm != password) {
            alert('no match password');
        }
        else {
            if (this.emailEmpty && this.userEmpty) {
                this.presentLoading();
                this.userAuth.auth.createUserWithEmailAndPassword(email, password)
                    .then(function (result) {
                    _this.db.collection('users').doc(result.user.uid).set({ fullName: fullName, email: email, userName: userName })
                        .then(function () {
                        _this.dismissLoading();
                        _this.router.navigateByUrl('/news');
                    });
                });
            }
            else {
                alert('A username or email is already in the system');
                window.location.reload();
            }
        }
    };
    SignupPage.prototype.presentLoading = function () {
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
    SignupPage.prototype.dismissLoading = function () {
        this.loadingRef.dismiss();
    };
    SignupPage.prototype.onKeyUp = function (data) {
        var ENTER_KET_CODE = 13;
        if (data.keyCode === ENTER_KET_CODE) {
            this.createNewUser();
        }
    };
    SignupPage.prototype.CheckUsername = function () {
        var _this = this;
        this.db.collection('users', function (ref) { return ref.where('userName', '==', _this.userNameField.value); }).get().subscribe(function (result) {
            if (result.empty) {
                _this.userEmpty = true;
            }
            else {
                _this.userEmpty = false;
                alert('Username is busy Try another username');
            }
        });
    };
    SignupPage.prototype.CheckEmail = function () {
        var _this = this;
        this.db.collection('users', function (ref) { return ref.where('email', '==', _this.emailField.value); }).get().subscribe(function (result) {
            if (result.empty) {
                _this.emailEmpty = true;
            }
            else {
                _this.emailEmpty = false;
                alert(" This email is associated with an existing account  ");
            }
        });
    };
    tslib_1.__decorate([
        ViewChild('firstName'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "firstNameField", void 0);
    tslib_1.__decorate([
        ViewChild('lastName'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "lastNameField", void 0);
    tslib_1.__decorate([
        ViewChild('userName'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "userNameField", void 0);
    tslib_1.__decorate([
        ViewChild('email'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "emailField", void 0);
    tslib_1.__decorate([
        ViewChild('password'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "passField", void 0);
    tslib_1.__decorate([
        ViewChild('confirm'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "confirmField", void 0);
    SignupPage = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            AngularFirestore,
            LoadingController,
            Router,
            AngularFireAuth])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map