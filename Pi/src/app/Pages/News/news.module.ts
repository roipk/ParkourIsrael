import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news.page';
import { PostBubbleComponent } from '../post-bubble/post-bubble.component';
import { load } from '@angular/core/src/render3';


@NgModule({
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
export class NewsPageModule {}
