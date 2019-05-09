import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './Pages/Home/home.module#HomePageModule' },
  { path: 'signup', loadChildren: './Pages/Signup/signup.module#SignupPageModule' },
  { path: 'news', loadChildren: './Pages/News/news.module#NewsPageModule' },
  { path: 'login', loadChildren: './Pages/Login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
