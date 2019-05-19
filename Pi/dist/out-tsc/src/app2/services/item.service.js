import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
var ItemService = /** @class */ (function () {
    function ItemService(afs) {
        this.afs = afs;
        this.items = afs.collection('items').valueChanges();
    }
    ItemService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], ItemService);
    return ItemService;
}());
export { ItemService };
//# sourceMappingURL=item.service.js.map