import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ManagePage } from './manage.page';
var routes = [
    {
        path: '',
        component: ManagePage
    }
];
var ManagePageModule = /** @class */ (function () {
    function ManagePageModule() {
    }
    ManagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ManagePage]
        })
    ], ManagePageModule);
    return ManagePageModule;
}());
export { ManagePageModule };
//# sourceMappingURL=manage.module.js.map