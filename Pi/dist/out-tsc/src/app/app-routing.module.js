import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { IsManagerGuard } from './is-manager-guard/is-manager.guard';
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './Pages/Home/home.module#HomePageModule' },
    { path: 'signup', loadChildren: './Pages/Signup/signup.module#SignupPageModule' },
    { path: 'news', loadChildren: './Pages/News/news.module#NewsPageModule' },
    { path: 'login', loadChildren: './Pages/Login/login.module#LoginPageModule' },
    { path: 'info', loadChildren: './Pages/Info/info.module#InfoPageModule' },
    { path: 'manager', loadChildren: './Pages/ManagePages/manage.module#ManagePageModule', canActivate: [IsManagerGuard] },
    { path: 'writePost', loadChildren: './Pages/post-editor/post-editor.module#PostEditorPageModule', canActivate: [IsManagerGuard] },
    { path: 'contact', loadChildren: './Pages/contact/contact.module#ContactPageModule' },
    { path: 'edit-informations', loadChildren: './Pages/edit-informations/edit-informations.module#EditInformationsPageModule' },
    { path: '**', loadChildren: './Pages/not-found/not-found.module#NotFoundPageModule' }, { path: 'edit-informations', loadChildren: './Pages/edit-informations/edit-informations.module#EditInformationsPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map