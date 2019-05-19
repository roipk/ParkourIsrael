import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        console.log("ngOninit run");
    };
    ItemsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-items',
            templateUrl: './items.component.html',
            styleUrls: ['./items.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ItemService])
    ], ItemsComponent);
    return ItemsComponent;
}());
export { ItemsComponent };
//# sourceMappingURL=items.component.js.map