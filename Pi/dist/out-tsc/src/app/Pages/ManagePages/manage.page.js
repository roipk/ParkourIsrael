import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
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