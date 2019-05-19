import * as tslib_1 from "tslib";
import { Component, ViewChild, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
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
    tslib_1.__decorate([
        ViewChild('messageField'),
        tslib_1.__metadata("design:type", Object)
    ], NewsPage.prototype, "messageField", void 0);
    tslib_1.__decorate([
        ViewChild('mainContent'),
        tslib_1.__metadata("design:type", Object)
    ], NewsPage.prototype, "mainContent", void 0);
    NewsPage = tslib_1.__decorate([
        Component({
            selector: 'app-news',
            templateUrl: './news.page.html',
            styleUrls: ['./news.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            NgZone,
            AngularFirestore])
    ], NewsPage);
    return NewsPage;
}());
export { NewsPage };
//# sourceMappingURL=news.page.js.map