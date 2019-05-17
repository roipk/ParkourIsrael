(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Pages-News-news-module"],{

/***/ "./src/app/Pages/News/news.module.ts":
/*!*******************************************!*\
  !*** ./src/app/Pages/News/news.module.ts ***!
  \*******************************************/
/*! exports provided: NewsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsPageModule", function() { return NewsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _news_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./news.page */ "./src/app/Pages/News/news.page.ts");
/* harmony import */ var _post_bubble_post_bubble_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../post-bubble/post-bubble.component */ "./src/app/Pages/post-bubble/post-bubble.component.ts");








var NewsPageModule = /** @class */ (function () {
    function NewsPageModule() {
    }
    NewsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _news_page__WEBPACK_IMPORTED_MODULE_6__["NewsPage"]
                    }
                ])
            ],
            declarations: [_news_page__WEBPACK_IMPORTED_MODULE_6__["NewsPage"], _post_bubble_post_bubble_component__WEBPACK_IMPORTED_MODULE_7__["PostBubbleComponent"]]
        })
    ], NewsPageModule);
    return NewsPageModule;
}());



/***/ }),

/***/ "./src/app/Pages/News/news.page.html":
/*!*******************************************!*\
  !*** ./src/app/Pages/News/news.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<ion-content #mainContent>\r\n\r\n  <ion-grid>\r\n    <ion-row *ngFor='let m of messages'>\r\n      <ion-col>\r\n        <app-post-bubble [fullName]='fullName' [data]='m'></app-post-bubble>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-content>\r\n\r\n<div *ngIf='uAuth.auth.currentUser != null' class=\"footer\" type='manager' id = \"footerMassage\" >\r\n    <ion-toolbar>\r\n      <ion-input  (keyup)='onKeyUp($event)' #messageField placeholder=\"Message\"></ion-input> \r\n      <ion-button  [disabled]='isMessageInvalid()' slot='end' (click)='sendMessage()' >Send</ion-button> \r\n     </ion-toolbar>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/Pages/News/news.page.scss":
/*!*******************************************!*\
  !*** ./src/app/Pages/News/news.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h6 {\n  padding: 0px;\n  margin: 0px; }\n\nion-grid {\n  flex-direction: column;\n  justify-content: flex-end; }\n\n.footer {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  text-align: left;\n  border-top-width: thin;\n  border-top-style: solid; }\n\nion-input {\n  border: 2px solid;\n  border-radius: 25px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvUGFnZXMvTmV3cy9DOlxcVXNlcnNcXHJvaXBrXFxEZXNrdG9wXFxQYXJrb3VyIGlzcmFlbFxcUGFya291cklzcmFlbFxcUGkvc3JjXFxhcHBcXFBhZ2VzXFxOZXdzXFxuZXdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQVk7RUFDWixXQUFXLEVBQUE7O0FBR2Y7RUFDSSxzQkFBc0I7RUFDdEIseUJBQXlCLEVBQUE7O0FBRzdCO0VBQ0ksZUFBZTtFQUNmLE9BQU87RUFDUCxTQUFTO0VBQ1QsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsdUJBQXVCLEVBQUE7O0FBRzNCO0VBQ0ksaUJBQWlCO0VBQ2pCLG1CQUFtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvUGFnZXMvTmV3cy9uZXdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImg2IHtcclxuICAgIHBhZGRpbmc6IDBweDtcclxuICAgIG1hcmdpbjogMHB4O1xyXG59XHJcblxyXG5pb24tZ3JpZCB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxufVxyXG5cclxuLmZvb3RlciB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgYm9yZGVyLXRvcC13aWR0aDogdGhpbjtcclxuICAgIGJvcmRlci10b3Atc3R5bGU6IHNvbGlkO1xyXG4gfVxyXG5cclxuaW9uLWlucHV0e1xyXG4gICAgYm9yZGVyOiAycHggc29saWQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG59XHJcblxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/Pages/News/news.page.ts":
/*!*****************************************!*\
  !*** ./src/app/Pages/News/news.page.ts ***!
  \*****************************************/
/*! exports provided: NewsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsPage", function() { return NewsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");




var NewsPage = /** @class */ (function () {
    function NewsPage(uAuth, ngZone, db) {
        this.uAuth = uAuth;
        this.ngZone = ngZone;
        this.db = db;
        this.messages = [];
        this.fullName = '';
        this.manager = false;
    }
    NewsPage.prototype.ngOnInit = function () {
        var _this = this;
        // this.adminMode()
        this.uAuth.user.subscribe(function () {
            _this.afterUserInside();
            // this.adminMode()
        });
        this.db.collection('messages').valueChanges().subscribe(function (result) {
            result.sort(function (m1, m2) {
                if (m1['timestamp'] < m2['timestamp'])
                    return 1;
                else
                    return -1;
            });
            _this.messages = result.slice();
            return;
            if (_this.messages.length <= 0) {
                _this.messages = result;
                // this.scrollToBottom()
            }
            else {
                _this.ngZone.run(function () { _this.messages.push(result[result.length - 1]); });
                window.location.reload();
            }
        });
    };
    NewsPage.prototype.afterUserInside = function () {
        var _this = this;
        this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
            .get().subscribe(function (result) {
            _this.fullName = result.data().userName;
        });
    };
    NewsPage.prototype.sendMessage = function () {
        if (this.isMessageInvalid()) {
            return;
        }
        this.db.collection('messages').add({
            from: this.fullName,
            content: this.messageField.value,
            timestamp: new Date().getTime()
        });
        this.messageField.value = '';
        ///this.scrollToBottom()
    };
    NewsPage.prototype.isMessageInvalid = function () {
        return this.messageField == null || this.messageField.value == null || this.messageField.value.length <= 0;
    };
    NewsPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () { _this.mainContent.scrollToBottom(700); }, 120);
    };
    NewsPage.prototype.onKeyUp = function (data) {
        var ENTER_KET_CODE = 13;
        if (data.keyCode === ENTER_KET_CODE) {
            this.sendMessage();
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('messageField'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], NewsPage.prototype, "messageField", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('mainContent'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], NewsPage.prototype, "mainContent", void 0);
    NewsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-news',
            template: __webpack_require__(/*! ./news.page.html */ "./src/app/Pages/News/news.page.html"),
            styles: [__webpack_require__(/*! ./news.page.scss */ "./src/app/Pages/News/news.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
    ], NewsPage);
    return NewsPage;
}());



/***/ }),

/***/ "./src/app/Pages/post-bubble/post-bubble.component.html":
/*!**************************************************************!*\
  !*** ./src/app/Pages/post-bubble/post-bubble.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-card>\n  <ion-card-header>\n    <ion-card-title>{{data.content}}</ion-card-title>\n  </ion-card-header>\n  <ion-card-content [ngStyle]='{\"color\": getContentColor(from)}'>\n    From: {{data.from}}\n  </ion-card-content>\n</ion-card>"

/***/ }),

/***/ "./src/app/Pages/post-bubble/post-bubble.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/Pages/post-bubble/post-bubble.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL1BhZ2VzL3Bvc3QtYnViYmxlL3Bvc3QtYnViYmxlLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/Pages/post-bubble/post-bubble.component.ts":
/*!************************************************************!*\
  !*** ./src/app/Pages/post-bubble/post-bubble.component.ts ***!
  \************************************************************/
/*! exports provided: PostBubbleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostBubbleComponent", function() { return PostBubbleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PostBubbleComponent = /** @class */ (function () {
    function PostBubbleComponent() {
    }
    PostBubbleComponent.prototype.ngOnInit = function () {
    };
    PostBubbleComponent.prototype.getContentColor = function (m) {
        if (this.fullName != null && m != null && this.fullName === m.from) {
            return 'red';
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PostBubbleComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PostBubbleComponent.prototype, "fullName", void 0);
    PostBubbleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-post-bubble',
            template: __webpack_require__(/*! ./post-bubble.component.html */ "./src/app/Pages/post-bubble/post-bubble.component.html"),
            styles: [__webpack_require__(/*! ./post-bubble.component.scss */ "./src/app/Pages/post-bubble/post-bubble.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PostBubbleComponent);
    return PostBubbleComponent;
}());



/***/ })

}]);
//# sourceMappingURL=Pages-News-news-module.js.map