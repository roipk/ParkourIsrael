import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var IsManagerGuard = /** @class */ (function () {
    function IsManagerGuard() {
        this.user = true;
    }
    IsManagerGuard.prototype.canActivate = function (next, state) {
        // alert( this.user.getManager())
        return this.user;
    };
    IsManagerGuard.prototype.canActivateChild = function (next, state) {
        return true;
    };
    IsManagerGuard.prototype.canLoad = function (route, segments) {
        return true;
    };
    IsManagerGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], IsManagerGuard);
    return IsManagerGuard;
}());
export { IsManagerGuard };
//# sourceMappingURL=is-manager.guard.js.map