import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
var ManagePage = /** @class */ (function () {
    //{ url: '1', name: 'test' }
    function ManagePage(uAuth, router, db) {
        this.uAuth = uAuth;
        this.router = router;
        this.db = db;
        this.file_name = '';
        this.manager = false;
        this.showPages = false;
        this.showPosts = false;
        this.showUsers = false;
        this.pages = [];
        this.posts = [];
        this.users = [];
    }
    ManagePage.prototype.ngOnInit = function () {
        var _this = this;
        this.db.collection('users').valueChanges().subscribe(function (result) {
            result.sort(function (m1, m2) {
                if (m1['userName'] > m2['userName'])
                    return 1;
                else
                    return -1;
            });
            _this.users = result.slice();
        });
        this.db.collection('messages').valueChanges().subscribe(function (result) {
            result.sort(function (m1, m2) {
                if (m1['userName'] < m2['userName'])
                    return 1;
                else
                    return -1;
            });
            _this.posts = result.slice();
        });
    };
    ManagePage.prototype.search = function (list, find) {
        var _this = this;
        if (list == this.posts) {
            if (find == '') {
                this.db.collection('messages').valueChanges().subscribe(function (result) {
                    result.sort(function (m1, m2) {
                        if (m1['timestamp'] < m2['timestamp'])
                            return 1;
                        else
                            return -1;
                    });
                    _this.posts = result.slice();
                });
                return;
            }
            this.posts = list.filter(function (obj) {
                return obj.title === find;
            }).slice();
        }
        if (list == this.users) {
            if (find == '') {
                this.db.collection('users').valueChanges().subscribe(function (result) {
                    result.sort(function (m1, m2) {
                        if (m1['userName'] > m2['userName'])
                            return 1;
                        else
                            return -1;
                    });
                    _this.users = result.slice();
                });
                return;
            }
            this.users = list.filter(function (obj) {
                return obj.userName === find;
            }).slice();
        }
    };
    ManagePage.prototype.deletePost = function (docId, file_name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.file_name = file_name;
                        if (this.file_name != '') {
                            this.removeFile();
                        }
                        return [4 /*yield*/, this.db.collection("messages").doc(docId).delete().catch(function () {
                                alert('error while removing message');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagePage.prototype.removeFile = function () {
        var storageRef = firebase.storage().ref();
        storageRef.child('images/' + this.file_name).delete().then(function () {
        }).catch(function () {
            alert('error while removing file');
        });
    };
    ManagePage.prototype.openPagesList = function () {
        this.showPages = !this.showPages;
    };
    ManagePage.prototype.openPostsList = function () {
        this.showPosts = !this.showPosts;
    };
    ManagePage.prototype.openUsersList = function () {
        this.showUsers = !this.showUsers;
    };
    tslib_1.__decorate([
        ViewChild('title'),
        tslib_1.__metadata("design:type", Object)
    ], ManagePage.prototype, "titleField", void 0);
    tslib_1.__decorate([
        ViewChild('date'),
        tslib_1.__metadata("design:type", Object)
    ], ManagePage.prototype, "dateField", void 0);
    ManagePage = tslib_1.__decorate([
        Component({
            selector: 'app-manage',
            templateUrl: 'manage.page.html',
            styleUrls: ['manage.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            Router,
            AngularFirestore])
    ], ManagePage);
    return ManagePage;
}());
export { ManagePage };
//# sourceMappingURL=manage.page.js.map