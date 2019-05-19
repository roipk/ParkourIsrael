import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
var SignupPage = /** @class */ (function () {
    function SignupPage(bambi, db, loadingController, router) {
        this.bambi = bambi;
        this.db = db;
        this.loadingController = loadingController;
        this.router = router;
        this.loadingRef = null;
    }
    SignupPage.prototype.createNewUser = function () {
        var _this = this;
        var fullName = this.fullNameField.value;
        var email = this.emailField.value;
        var password = this.passField.value;
        this.presentLoading();
        this.bambi.auth.createUserWithEmailAndPassword(email, password)
            .then(function (result) {
            _this.db.collection('users').doc(result.user.uid).set({ fullName: fullName })
                .then(function () {
                _this.dismissLoading();
                _this.router.navigateByUrl('/chat');
            });
        });
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
    tslib_1.__decorate([
        ViewChild('fullName'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "fullNameField", void 0);
    tslib_1.__decorate([
        ViewChild('email'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "emailField", void 0);
    tslib_1.__decorate([
        ViewChild('password'),
        tslib_1.__metadata("design:type", Object)
    ], SignupPage.prototype, "passField", void 0);
    SignupPage = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            AngularFirestore,
            LoadingController,
            Router])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map