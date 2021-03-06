import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsManagerGuard } from './is-manager-guard/is-manager.guard';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './Pages/Home/home.module#HomePageModule' },
  { path: 'maps', loadChildren: './Pages/maps/maps.module#MapsPageModule' },
  { path: 'signup', loadChildren: './Pages/Signup/signup.module#SignupPageModule'},
  { path: 'news', loadChildren: './Pages/News/news.module#NewsPageModule' },
  { path: 'login', loadChildren: './Pages/Login/login.module#LoginPageModule'},
  { path: 'info', loadChildren: './Pages/Info/info.module#InfoPageModule' },
  { path: 'parkour', loadChildren: './Pages/parkour/parkour.module#ParkourPageModule' },
  { path: 'us', loadChildren: './Pages/us/us.module#UsPageModule' },
  { path: 'doc', loadChildren: './Pages/doc/doc.module#DocPageModule' },
  { path: 'edit-informations', loadChildren: './Pages/edit-informations/edit-informations.module#EditInformationsPageModule' },
  { path: 'contact', loadChildren: './Pages/contact/contact.module#ContactPageModule' },
  { path: 'writePost', loadChildren: './Pages/post-editor/post-editor.module#PostEditorPageModule'/*,  canActivate: [ IsManagerGuard ] */},
  { path: 'manager', loadChildren: './Pages/ManagePages/manage.module#ManagePageModule', canActivate: [ IsManagerGuard ] },
  { path: 'post-page', loadChildren: './Pages/post-page/post-page.module#PostPagePageModule' },
  { path: '**', loadChildren: './Pages/not-found/not-found.module#NotFoundPageModule' },  
 
  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
