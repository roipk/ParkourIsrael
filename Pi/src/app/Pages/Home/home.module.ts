import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PostBubbleComponent } from '../post-bubble/post-bubble.component';
// import { NavbarComponent } from '../navbar/navbar.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // NavbarComponent,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,PostBubbleComponent ]
})
export class HomePageModule {
  
}
