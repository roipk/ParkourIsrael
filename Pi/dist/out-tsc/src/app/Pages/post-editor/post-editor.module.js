import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PostEditorPage } from './post-editor.page';
var routes = [
    {
        path: '',
        component: PostEditorPage
    }
];
var PostEditorPageModule = /** @class */ (function () {
    function PostEditorPageModule() {
    }
    PostEditorPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PostEditorPage]
        })
    ], PostEditorPageModule);
    return PostEditorPageModule;
}());
export { PostEditorPageModule };
//# sourceMappingURL=post-editor.module.js.map