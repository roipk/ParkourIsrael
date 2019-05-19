import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.b = function () {
        alert('clicked');
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map