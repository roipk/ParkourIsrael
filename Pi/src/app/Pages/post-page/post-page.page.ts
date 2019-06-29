import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PostBubbleComponent } from '../post-bubble/post-bubble.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.page.html',
  styleUrls: ['./post-page.page.scss'],
})
export class PostPagePage implements OnInit {
  
    @ViewChild('img') img
    @ViewChild('content') content

  public static data
  pic =false
  constructor(
  ) { }

  ngOnInit() {
    if(PostBubbleComponent.getData.content!=undefined)
    {
    var x =PostBubbleComponent.getData.content
    this.content.el.innerHTML=x

    if (PostBubbleComponent.getData.file_name != '') {
      this.pic=true
      var storageRef = firebase.storage().ref()
      storageRef.child('images/' + PostBubbleComponent.getData.file_name).getDownloadURL().then(res => {
        this.img.src = res
      })
    }
  }
  }
}
