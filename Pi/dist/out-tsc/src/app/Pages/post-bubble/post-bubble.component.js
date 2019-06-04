import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import * as firebase from 'firebase';
var PostBubbleComponent = /** @class */ (function () {
    function PostBubbleComponent() {
        this._isimage = true;
    }
    PostBubbleComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data.file_name != '')
            firebase.storage().ref().child('/images/' + this.data.file_name).getDownloadURL().then(function (result) {
                _this.image.src = result;
            });
        else {
            this._isimage = false;
        }
    };
    PostBubbleComponent.prototype.isImage = function () {
        return this._isimage;
    };
    PostBubbleComponent.prototype.getContentColor = function (m) {
        if (this.fullName != null && m != null && this.fullName === m.from) {
            return 'red';
        }
    };
    tslib_1.__decorate([
        ViewChild('image'),
        tslib_1.__metadata("design:type", Object)
    ], PostBubbleComponent.prototype, "image", void 0);
    tslib_1.__decorate([
        ViewChild('post'),
        tslib_1.__metadata("design:type", Object)
    ], PostBubbleComponent.prototype, "post", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PostBubbleComponent.prototype, "fullName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PostBubbleComponent.prototype, "data", void 0);
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