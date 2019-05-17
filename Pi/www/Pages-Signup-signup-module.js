(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Pages-Signup-signup-module"],{

/***/ "./src/app/Pages/Signup/signup.module.ts":
/*!***********************************************!*\
  !*** ./src/app/Pages/Signup/signup.module.ts ***!
  \***********************************************/
/*! exports provided: SignupPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _signup_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./signup.page */ "./src/app/Pages/Signup/signup.page.ts");







var routes = [
    {
        path: '',
        component: _signup_page__WEBPACK_IMPORTED_MODULE_6__["SignupPage"]
    }
];
var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_signup_page__WEBPACK_IMPORTED_MODULE_6__["SignupPage"]]
        })
    ], SignupPageModule);
    return SignupPageModule;
}());



/***/ }),

/***/ "./src/app/Pages/Signup/signup.page.html":
/*!***********************************************!*\
  !*** ./src/app/Pages/Signup/signup.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<ion-content>\r\n  <ion-grid>\r\n    <ion-row>\r\n      <ion-col size='1.5' offset='4'>\r\n        <ion-item>\r\n          <ion-label id= \"firstName\" position=\"floating\">First name</ion-label>\r\n          <ion-input #firstName></ion-input>\r\n        </ion-item>\r\n      </ion-col>\r\n\r\n      <ion-col size='1.5' offset='1'>\r\n        <ion-item>\r\n          <ion-label id= \"lastName\" position=\"floating\">Last Name</ion-label>\r\n          <ion-input #lastName></ion-input>\r\n        </ion-item>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row>\r\n      <ion-col size='4' offset='4'>\r\n        <ion-item>\r\n          <ion-label id= \"userName\" position=\"floating\">Username *</ion-label>\r\n          <ion-input #userName (ionBlur)=\"CheckUsername()\"></ion-input>\r\n        </ion-item>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row>\r\n      <ion-col size='4' offset='4'>\r\n        <ion-item>\r\n          <ion-label id= \"email\" position=\"floating\" >Username or Email *</ion-label>\r\n          <ion-input  #email (ionBlur)=\"CheckEmail()\"></ion-input>\r\n        </ion-item>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class='center-row'>\r\n      <ion-col size='12' size-md='2'>\r\n        <ion-item>\r\n          <ion-label id= \"password\" position=\"floating\">Password *</ion-label>\r\n          <ion-input type='password' #password></ion-input>\r\n        </ion-item>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row>\r\n      <ion-col size='4' offset='4'>\r\n        <ion-item>\r\n          <ion-label id= \"confirm\" position=\"floating\">Confirm</ion-label>\r\n          <ion-input type='password' #confirm></ion-input>\r\n        </ion-item>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row>\r\n      <ion-col text-center>\r\n        <ion-button (click)='createNewUser()'>Sign Up</ion-button>\r\n        <h6>* Required </h6>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n  </ion-grid>\r\n\r\n  <hr class=\"hr-text\" data-content=\"OR\">\r\n\r\n  <ion-grid>\r\n\r\n    <ion-row>\r\n      <ion-col size='2' offset='5'>\r\n        <ion-button expand='block' color=\"facebook\">Sign up with Facebook </ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row>\r\n        <ion-col size='2' offset='5'> \r\n            <!-- <ion-button expand=\"block\" (click)=\"b()\">test</ion-button> -->\r\n         <ion-button expand='block' class=\"google-btn\" color=\"google\">Sign up with Google </ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n  </ion-grid>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/Pages/Signup/signup.page.scss":
/*!***********************************************!*\
  !*** ./src/app/Pages/Signup/signup.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-grid {\n  display: flex;\n  flex-direction: column; }\n\nh6 {\n  font-size: 70%; }\n\n.hr-text {\n  margin-top: 2%;\n  margin-bottom: 2%;\n  line-height: 1em;\n  max-width: 50%;\n  position: relative;\n  outline: 0;\n  border: 0;\n  color: black;\n  text-align: center;\n  height: 1.5em;\n  opacity: .5; }\n\n.hr-text:before {\n    content: '';\n    background: linear-gradient(to right, transparent, #818078, transparent);\n    position: absolute;\n    left: 0;\n    width: 100%;\n    height: 1px; }\n\n.hr-text:after {\n    content: attr(data-content);\n    position: relative;\n    display: inline-block;\n    color: black;\n    line-height: 1.5em;\n    color: #818078;\n    background-color: #fcfcfa; }\n\n.google-btn {\n  color: white; }\n\n.center-row {\n  display: flex;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvUGFnZXMvU2lnbnVwL0M6XFxVc2Vyc1xccm9pcGtcXERlc2t0b3BcXFBhcmtvdXIgaXNyYWVsXFxQYXJrb3VySXNyYWVsXFxQaS9zcmNcXGFwcFxcUGFnZXNcXFNpZ251cFxcc2lnbnVwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVJLGFBQWE7RUFDYixzQkFBc0IsRUFBQTs7QUFJMUI7RUFDRSxjQUFjLEVBQUE7O0FBRWQ7RUFFRSxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixTQUFTO0VBQ1QsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsV0FBVyxFQUFBOztBQVpiO0lBZUksV0FBVztJQUNYLHdFQUF3RTtJQUN4RSxrQkFBa0I7SUFDbEIsT0FBTztJQUVQLFdBQVc7SUFDWCxXQUFXLEVBQUE7O0FBckJmO0lBeUJJLDJCQUEyQjtJQUMzQixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLFlBQVk7SUFHWixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLHlCQUF5QixFQUFBOztBQUk3QjtFQUVFLFlBQVksRUFBQTs7QUFHaEI7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9QYWdlcy9TaWdudXAvc2lnbnVwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcclxuICAgLy8gaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAvLyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuaDYge1xyXG4gIGZvbnQtc2l6ZTogNzAlO1xyXG59XHJcbiAgLmhyLXRleHQgXHJcbntcclxuICAgIG1hcmdpbi10b3A6IDIlO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMiU7XHJcbiAgICBsaW5lLWhlaWdodDogMWVtO1xyXG4gICAgbWF4LXdpZHRoOiA1MCU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiAxLjVlbTtcclxuICAgIG9wYWNpdHk6IC41O1xyXG4gICAgJjpiZWZvcmUgXHJcbiAgICB7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHRyYW5zcGFyZW50LCAjODE4MDc4LCB0cmFuc3BhcmVudCk7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgLy8gdG9wOiA1MCU7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBoZWlnaHQ6IDFweDtcclxuICAgIH1cclxuICAgICY6YWZ0ZXIgXHJcbiAgICB7XHJcbiAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1jb250ZW50KTtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIGNvbG9yOiBibGFjaztcclxuICBcclxuICAgICAgLy8gcGFkZGluZzogMCAuNWVtO1xyXG4gICAgICBsaW5lLWhlaWdodDogMS41ZW07XHJcbiAgICAgIGNvbG9yOiAjODE4MDc4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmY2ZhO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmdvb2dsZS1idG5cclxuICB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgfVxyXG5cclxuLmNlbnRlci1yb3cge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuICJdfQ== */"

/***/ }),

/***/ "./src/app/Pages/Signup/signup.page.ts":
/*!*********************************************!*\
  !*** ./src/app/Pages/Signup/signup.page.ts ***!
  \*********************************************/
/*! exports provided: SignupPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPage", function() { return SignupPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






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
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('firstName'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SignupPage.prototype, "firstNameField", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('lastName'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SignupPage.prototype, "lastNameField", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('userName'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SignupPage.prototype, "userNameField", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('email'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SignupPage.prototype, "emailField", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('password'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SignupPage.prototype, "passField", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('confirm'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SignupPage.prototype, "confirmField", void 0);
    SignupPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.page.html */ "./src/app/Pages/Signup/signup.page.html"),
            styles: [__webpack_require__(/*! ./signup.page.scss */ "./src/app/Pages/Signup/signup.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"]])
    ], SignupPage);
    return SignupPage;
}());



/***/ })

}]);
//# sourceMappingURL=Pages-Signup-signup-module.js.map