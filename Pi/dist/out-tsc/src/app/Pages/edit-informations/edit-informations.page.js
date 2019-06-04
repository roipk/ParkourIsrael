import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
var EditInformationsPage = /** @class */ (function () {
    function EditInformationsPage(userAuth, db, loadingController, router, uAuth) {
        this.userAuth = userAuth;
        this.db = db;
        this.loadingController = loadingController;
        this.router = router;
        this.uAuth = uAuth;
        this.info = {
            userName: "",
            fullName: "",
            email: "",
            firstName: "",
            lastName: "",
            userID: ""
        };
        this.userEmpty = false;
    }
    EditInformationsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.uAuth.user.subscribe(function () {
            _this.afterUserInside();
        });
    };
    EditInformationsPage.prototype.afterUserInside = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            _this.db.collection('users').doc(user.uid)
                .get().subscribe(function (result) {
                _this.info.userName = result.data().userName;
                _this.userNameField.value = _this.info.userName;
                _this.info.fullName = result.data().fullName;
                _this.info.email = result.data().email;
                _this.emailField.value = _this.info.email;
                _this.info.firstName = result.data().firstName;
                _this.firstNameField.value = _this.info.firstName;
                _this.info.lastName = result.data().lastName;
                _this.lastNameField.value = _this.info.lastName;
                _this.info.userID = user.uid;
            });
        });
    };
    EditInformationsPage.prototype.update = function () {
        var _this = this;
        if (this.checkChanges()) {
            var updates_1 = {
                email: this.info.email,
                firstName: this.info.firstName,
                fullName: this.info.fullName,
                lastName: this.info.lastName,
                userName: this.info.userName
            };
            firebase.auth().onAuthStateChanged(function (user) {
                _this.db.collection('users').doc(user.uid).update(updates_1);
            });
        }
    };
    EditInformationsPage.prototype.checkChanges = function () {
        if (this.info.email != this.emailField.value)
            this.info.email = this.emailField.value;
        if (this.info.firstName != this.firstNameField.value)
            this.info.firstName = this.firstNameField.value;
        if (this.info.lastName != this.lastNameField.value)
            this.info.lastName = this.lastNameField.value;
        var fullName = this.info.firstName + " " + this.info.lastName;
        if (this.info.fullName != fullName)
            this.info.fullName = fullName;
        if (this.info.userName != this.userNameField.value) {
            console.log("OK ");
            var answer = this.CheckUsername;
            console.log(answer);
            if (!this.CheckUsername)
                return false;
            this.info.userName = this.userNameField.value;
            return true;
        }
    };
    EditInformationsPage.prototype.CheckUsername = function () {
        var _this = this;
        console.log(this.userNameField.value + " " + this.info.userName);
        this.db.collection('users', function (ref) { return ref.where('userName', '==', _this.userNameField.value); }).get().subscribe(function (result) {
            if (result.empty) {
                _this.userEmpty = true;
            }
            else
                _this.userEmpty = false;
        });
        if (this.userEmpty == false) {
            if (this.userNameField.value == this.info.userName) {
                console.log(this.userNameField.value + " " + this.info.userName);
                return true;
            }
            else
                alert('Username is busy. Try another one');
            return false;
        }
        return true;
    };
    tslib_1.__decorate([
        ViewChild('firstName'),
        tslib_1.__metadata("design:type", Object)
    ], EditInformationsPage.prototype, "firstNameField", void 0);
    tslib_1.__decorate([
        ViewChild('lastName'),
        tslib_1.__metadata("design:type", Object)
    ], EditInformationsPage.prototype, "lastNameField", void 0);
    tslib_1.__decorate([
        ViewChild('userName'),
        tslib_1.__metadata("design:type", Object)
    ], EditInformationsPage.prototype, "userNameField", void 0);
    tslib_1.__decorate([
        ViewChild('email'),
        tslib_1.__metadata("design:type", Object)
    ], EditInformationsPage.prototype, "emailField", void 0);
    tslib_1.__decorate([
        ViewChild('password'),
        tslib_1.__metadata("design:type", Object)
    ], EditInformationsPage.prototype, "passField", void 0);
    tslib_1.__decorate([
        ViewChild('confirm'),
        tslib_1.__metadata("design:type", Object)
    ], EditInformationsPage.prototype, "confirmField", void 0);
    EditInformationsPage = tslib_1.__decorate([
        Component({
            selector: 'app-edit-informations',
            templateUrl: './edit-informations.page.html',
            styleUrls: ['./edit-informations.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            AngularFirestore,
            LoadingController,
            Router,
            AngularFireAuth])
    ], EditInformationsPage);
    return EditInformationsPage;
}());
export { EditInformationsPage };
//# sourceMappingURL=edit-informations.page.js.map