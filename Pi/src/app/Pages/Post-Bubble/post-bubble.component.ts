import { Component, OnInit, ViewChild,Input } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post-bubble',
  templateUrl: './post-bubble.component.html',
  styleUrls: ['./post-bubble.component.scss'],
})
export class PostBubbleComponent implements OnInit {

  @Input() data
  @Input() fullName

  @ViewChild('image') image
  @ViewChild('post') post

  _isimage = true
  constructor() { }

  ngOnInit() { 
    if(this.data.file_name !='')
      firebase.storage().ref().child('/images/'+this.data.file_name).getDownloadURL().then(result=>{
        this.image.src = result  
        
      })
      else{
        this._isimage = false
      }
    
  }


  isImage()
  {
    return this._isimage
  }

  openMenu()
  {
    alert('in')
    // this.post.display = 'none';
  }
  getContentColor(m) {
    if(this.fullName != null && m != null && this.fullName === m.from) {
      return 'red'
    }
  }

}
