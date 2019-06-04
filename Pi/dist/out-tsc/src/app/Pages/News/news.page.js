import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IsManagerGuard } from 'src/app/is-manager-guard/is-manager.guard';
var NewsPage = /** @class */ (function () {
    function NewsPage(uAuth, 
    // private ngZone: NgZone,
    route, db, guard) {
        this.uAuth = uAuth;
        this.route = route;
        this.db = db;
        this.guard = guard;
        this.fullName = '';
        this.email = '';
        this.messages = [];
    }
    NewsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.uAuth.user.subscribe(function () {
            _this.getPostsFromDb('allPosts');
            if (_this.uAuth.auth.currentUser != null) {
                _this.afterUserInside();
            }
        });
    };
    NewsPage.prototype.afterUserInside = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
                            .get().subscribe(function (result) {
                            _this.email = result.data().email;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    ngOnInit(): void {
      this.uAuth.user.subscribe(() => {
      })
      this.db.collection('messages').valueChanges().subscribe(
        result => {
          result.sort((m1, m2) => {
            if (m1['timestamp'] < m2['timestamp']) return 1
            else return -1
          })
          this.messages = [...result]
          return
        })
    }
    */
    NewsPage.prototype.getPostsFromDb = function (param) {
        var _this = this;
        if (param == 'allPosts') {
            this.db.collection('messages').valueChanges().subscribe(function (result) {
                result.sort(function (m1, m2) {
                    if (m1['timestamp'] < m2['timestamp'])
                        return 1;
                    else
                        return -1;
                });
                _this.messages = result.slice();
            });
        }
        else if (param == 'myPosts') {
            this.db.collection('messages', function (ref) { return ref.where('email', '==', _this.email); }).valueChanges().subscribe(function (result) {
                result.sort(function (m1, m2) {
                    if (m1['timestamp'] < m2['timestamp'])
                        return 1;
                    else
                        return -1;
                });
                _this.messages = result.slice();
            });
        }
    };
    NewsPage.prototype.createExit = function () {
        var cross = this.exit.createElement('div');
        cross.textContent = 'x';
    };
    NewsPage.prototype.write = function () {
        this.route.navigateByUrl('/writePost');
    };
    NewsPage.prototype.getContentColor = function (m) {
        if (this.fullName != null && m != null && this.fullName === m.from) {
            return 'red';
        }
    };
    NewsPage.prototype.radioButtonEvent = function (e) {
        if (e.target.value == 'allPosts') {
            this.getPostsFromDb('allPosts');
        }
        else if (e.target.value == 'myPosts') {
            this.getPostsFromDb('myPosts');
        }
    };
    NewsPage = tslib_1.__decorate([
        Component({
            selector: 'app-news',
            templateUrl: './news.page.html',
            styleUrls: ['./news.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            Router,
            AngularFirestore,
            IsManagerGuard])
    ], NewsPage);
    return NewsPage;
}());
export { NewsPage };
//# sourceMappingURL=news.page.js.map