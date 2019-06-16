import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostBubbleComponent } from './post-bubble.component'
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PostBubbleComponent ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports:[
    PostBubbleComponent
  ]
})
export class PostBubbleModule { }
