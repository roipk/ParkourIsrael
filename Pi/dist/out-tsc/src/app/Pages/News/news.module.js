import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewsPage } from './news.page';
import { PostBubbleComponent } from '../post-bubble/post-bubble.component';
var NewsPageModule = /** @class */ (function () {
    function NewsPageModule() {
    }
    NewsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild([
                    {
                        path: '',
                        component: NewsPage
                    }
                ])
            ],
            declarations: [NewsPage, PostBubbleComponent]
        })
    ], NewsPageModule);
    return NewsPageModule;
}());
export { NewsPageModule };
//# sourceMappingURL=news.module.js.map