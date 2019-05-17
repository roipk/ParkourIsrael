(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Pages-ManagePages-manage-module"],{

/***/ "./src/app/Pages/ManagePages/manage.module.ts":
/*!****************************************************!*\
  !*** ./src/app/Pages/ManagePages/manage.module.ts ***!
  \****************************************************/
/*! exports provided: ManagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagePageModule", function() { return ManagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _manage_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./manage.page */ "./src/app/Pages/ManagePages/manage.page.ts");







var routes = [
    {
        path: '',
        component: _manage_page__WEBPACK_IMPORTED_MODULE_6__["ManagePage"]
    }
];
var ManagePageModule = /** @class */ (function () {
    function ManagePageModule() {
    }
    ManagePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_manage_page__WEBPACK_IMPORTED_MODULE_6__["ManagePage"]]
        })
    ], ManagePageModule);
    return ManagePageModule;
}());



/***/ }),

/***/ "./src/app/Pages/ManagePages/manage.page.html":
/*!****************************************************!*\
  !*** ./src/app/Pages/ManagePages/manage.page.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\r\n    <p>test website manager</p>\r\n</ion-content>\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/Pages/ManagePages/manage.page.scss":
/*!****************************************************!*\
  !*** ./src/app/Pages/ManagePages/manage.page.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-grid {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvUGFnZXMvTWFuYWdlUGFnZXMvQzpcXFVzZXJzXFxyb2lwa1xcRGVza3RvcFxcUGFya291ciBpc3JhZWxcXFBhcmtvdXJJc3JhZWxcXFBpL3NyY1xcYXBwXFxQYWdlc1xcTWFuYWdlUGFnZXNcXG1hbmFnZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL1BhZ2VzL01hbmFnZVBhZ2VzL21hbmFnZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW9uLWdyaWQge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/Pages/ManagePages/manage.page.ts":
/*!**************************************************!*\
  !*** ./src/app/Pages/ManagePages/manage.page.ts ***!
  \**************************************************/
/*! exports provided: ManagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagePage", function() { return ManagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var ManagePage = /** @class */ (function () {
    function ManagePage(uAuth, router, db) {
        this.uAuth = uAuth;
        this.router = router;
        this.db = db;
        this.manager = false;
    }
    ManagePage.prototype.ngOnInit = function () {
        var _this = this;
        this.uAuth.user.subscribe(function () {
            if (_this.uAuth.auth.currentUser != null) {
                _this.db.collection('users').doc(_this.uAuth.auth.currentUser.uid)
                    .get().subscribe(function (result) {
                    _this.manager = result.data().manager;
                    if (!_this.manager) {
                        _this.router.navigateByUrl('/home');
                    }
                });
            }
            else {
                _this.router.navigateByUrl('/home');
            }
        });
    };
    ManagePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-manage',
            template: __webpack_require__(/*! ./manage.page.html */ "./src/app/Pages/ManagePages/manage.page.html"),
            styles: [__webpack_require__(/*! ./manage.page.scss */ "./src/app/Pages/ManagePages/manage.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]])
    ], ManagePage);
    return ManagePage;
}());



/***/ })

}]);
//# sourceMappingURL=Pages-ManagePages-manage-module.js.map