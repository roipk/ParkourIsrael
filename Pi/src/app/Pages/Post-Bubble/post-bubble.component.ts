import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post-bubble',
  templateUrl: './post-bubble.component.html',
  styleUrls: ['./post-bubble.component.scss'],
})
export class PostBubbleComponent implements OnInit {

  @Input() data: any
  @ViewChild('img') img

  
  
  constructor() { }

  ngOnInit() {
if(this.data.file_name!='')
{
    var storageRef = firebase.storage().ref()
    storageRef.child('images/' + this.data.file_name).getDownloadURL().then(res => {
      this.img.src=res
     
    })
  }
  }
}
