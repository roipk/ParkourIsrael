import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MapsPage } from './maps.page';
var routes = [
    {
        path: '',
        component: MapsPage
    }
];
var MapsPageModule = /** @class */ (function () {
    function MapsPageModule() {
    }
    MapsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MapsPage]
        })
    ], MapsPageModule);
    return MapsPageModule;
}());
export { MapsPageModule };
//# sourceMappingURL=maps.module.js.map