import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { PostEditorPage } from './post-editor.page';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';




const routes: Routes = [
  {
    path: '',
    component: PostEditorPage
  }
];

@NgModule({
  imports: [
    CKEditorModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostEditorPage]
})
export class PostEditorPageModule {}

