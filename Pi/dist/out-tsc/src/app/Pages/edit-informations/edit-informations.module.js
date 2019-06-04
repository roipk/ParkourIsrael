import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditInformationsPage } from './edit-informations.page';
var routes = [
    {
        path: '',
        component: EditInformationsPage
    }
];
var EditInformationsPageModule = /** @class */ (function () {
    function EditInformationsPageModule() {
    }
    EditInformationsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditInformationsPage]
        })
    ], EditInformationsPageModule);
    return EditInformationsPageModule;
}());
export { EditInformationsPageModule };
//# sourceMappingURL=edit-informations.module.js.map