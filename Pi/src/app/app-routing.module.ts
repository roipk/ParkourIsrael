import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsManagerGuard } from './is-manager-guard/is-manager.guard';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './Pages/Home/home.module#HomePageModule' },
  { path: 'signup', loadChildren: './Pages/Signup/signup.module#SignupPageModule' },
  { path: 'news', loadChildren: './Pages/News/news.module#NewsPageModule' },
  { path: 'login', loadChildren: './Pages/Login/login.module#LoginPageModule' },
  { path: 'info', loadChildren: './Pages/Info/info.module#InfoPageModule' },
  { path: 'manager', loadChildren: './Pages/ManagePages/manage.module#ManagePageModule', canActivate: [ IsManagerGuard ] },
  { path: 'writPost', loadChildren: './Pages/post-editor/post-editor.module#PostEditorPageModule',  canActivate: [ IsManagerGuard ] },
 
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
