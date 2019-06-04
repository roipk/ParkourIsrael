import * as tslib_1 from "tslib";
import { Component, ViewChild, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
var PostEditorPage = /** @class */ (function () {
    function PostEditorPage(uAuth, ngZone, route, loadingController, db, admin) {
        this.uAuth = uAuth;
        this.ngZone = ngZone;
        this.route = route;
        this.loadingController = loadingController;
        this.db = db;
        this.admin = admin;
        this.loadingRef = null;
        this.manager = false;
        this.nameFile = '';
        this.userName = '';
        this.fullName = '';
        this.nameToShow = '';
        this.email = '';
        this.file = File;
        this.messages = [];
    }
    PostEditorPage.prototype.ngOnInit = function () {
        var _this = this;
        this.uAuth.user.subscribe(function () {
            _this.afterUserInside();
        });
    };
    PostEditorPage.prototype.afterUserInside = function () {
        var _this = this;
        this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
            .get().subscribe(function (result) {
            _this.userName = result.data().userName;
            _this.fullName = result.data().fullName;
            _this.email = result.data().email;
        });
    };
    PostEditorPage.prototype.sendMessage = function () {
        if (this.isMessageInvalid()) {
            return;
        }
        if (this.nameToShow == "צוות פארקור ישראל") {
            this.db.collection('messages').add({
                title: this.MessageTitleField.value,
                email: this.email,
                from: this.nameToShow,
                from_manager: this.userName,
                content: this.messageField.value,
                timestamp: new Date().getTime(),
                file_name: this.nameFile,
                date: this.postDate()[1],
                show_date: this.postDate()[0]
            }).then(function (result) {
                result.update({ docId: result.id });
            }).catch(function (e) {
                alert('Failed to update the firebase');
            });
        }
        else {
            this.db.collection('messages').add({
                title: this.MessageTitleField.value,
                email: this.email,
                from: this.userName,
                content: this.messageField.value,
                timestamp: new Date().getTime(),
                file_name: this.nameFile,
                date: this.postDate()[1],
                show_date: this.postDate()[0]
            }).then(function (result) {
                result.update({ docId: result.id });
            }).catch(function (e) {
                alert('Failed to update the firebase');
            });
        }
        if (this.nameFile != '')
            this.uploadFile();
        else {
            this.messageField.value = '';
            this.MessageTitleField.value = '';
            this.route.navigateByUrl('/news');
        }
    };
    PostEditorPage.prototype.isMessageInvalid = function () {
        if (this.messageField == null || this.messageField.value == null || this.messageField.value.length <= 0) {
            return true;
        }
        if (this.MessageTitleField == null || this.MessageTitleField.value == null || this.MessageTitleField.value.length <= 0) {
            return true;
        }
        return false;
    };
    PostEditorPage.prototype.fileChangeEvent = function (e) {
        this.img.src = URL.createObjectURL(e.target.files[0]);
        this.file = e.target.files[0];
        this.nameFile = "pi_" + Date.now() + "_" + this.file.name;
    };
    PostEditorPage.prototype.radioButtonEvent = function (e) {
        if (e.target.value == 'userName') {
            this.nameToShow = this.userName;
        }
        else if (e.target.value == 'manager') {
            this.nameToShow = 'צוות פארקור ישראל';
        }
    };
    PostEditorPage.prototype.uploadFile = function () {
        var _this = this;
        this.presentLoading();
        var storageRef = firebase.storage().ref();
        storageRef.child('images/' + this.nameFile).put(this.file).then(function (res) {
            _this.messageField.value = '';
            _this.MessageTitleField.value = '';
            _this.loadingRef.dismiss();
            _this.route.navigateByUrl('/news');
        }).catch(function () {
            _this.loadingRef.dismiss();
            alert('file error');
        });
    };
    PostEditorPage.prototype.removeViewFile = function () {
        this.img.src = "";
    };
    PostEditorPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({ message: 'create your new post', })];
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
    PostEditorPage.prototype.dismissLoading = function () {
        this.loadingRef.dismiss();
    };
    PostEditorPage.prototype.getManager = function () {
        return this.admin.getManager();
    };
    PostEditorPage.prototype.postDate = function () {
        var d = new Date();
        if (d.getMinutes() < 10)
            var min = "0" + d.getMinutes();
        else
            var min = d.getMinutes().toString();
        var showDate = +d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " at " + d.getHours() + ":" + min;
        var dbDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " at " + d.getHours() + ":" + min;
        var date = [showDate, dbDate];
        return date;
    };
    tslib_1.__decorate([
        ViewChild('messageTitleField'),
        tslib_1.__metadata("design:type", Object)
    ], PostEditorPage.prototype, "MessageTitleField", void 0);
    tslib_1.__decorate([
        ViewChild('messageContentField'),
        tslib_1.__metadata("design:type", Object)
    ], PostEditorPage.prototype, "messageField", void 0);
    tslib_1.__decorate([
        ViewChild('fileButton'),
        tslib_1.__metadata("design:type", Object)
    ], PostEditorPage.prototype, "fileButton", void 0);
    tslib_1.__decorate([
        ViewChild('uploader'),
        tslib_1.__metadata("design:type", Object)
    ], PostEditorPage.prototype, "uploader", void 0);
    tslib_1.__decorate([
        ViewChild('img'),
        tslib_1.__metadata("design:type", Object)
    ], PostEditorPage.prototype, "img", void 0);
    PostEditorPage = tslib_1.__decorate([
        Component({
            selector: 'app-post-editor',
            templateUrl: './post-editor.page.html',
            styleUrls: ['./post-editor.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            NgZone,
            Router,
            LoadingController,
            AngularFirestore,
            AppComponent])
    ], PostEditorPage);
    return PostEditorPage;
}());
export { PostEditorPage };
//# sourceMappingURL=post-editor.page.js.map