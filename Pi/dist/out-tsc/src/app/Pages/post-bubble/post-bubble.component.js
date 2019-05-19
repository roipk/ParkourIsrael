import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var PostBubbleComponent = /** @class */ (function () {
    function PostBubbleComponent() {
    }
    PostBubbleComponent.prototype.ngOnInit = function () {
    };
    PostBubbleComponent.prototype.getContentColor = function (m) {
        if (this.fullName != null && m != null && this.fullName === m.from) {
            return 'red';
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PostBubbleComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PostBubbleComponent.prototype, "fullName", void 0);
    PostBubbleComponent = tslib_1.__decorate([
        Component({
            selector: 'app-post-bubble',
            templateUrl: './post-bubble.component.html',
            styleUrls: ['./post-bubble.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PostBubbleComponent);
    return PostBubbleComponent;
}());
export { PostBubbleComponent };
//# sourceMappingURL=post-bubble.component.js.map