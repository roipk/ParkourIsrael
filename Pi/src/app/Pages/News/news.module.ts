import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news.page';
import { PostBubbleModule } from '../post-bubble/post-bubble.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostBubbleModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewsPage
      }
    ])
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
