import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { equalSegments } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-post-bubble',
  templateUrl: './post-bubble.component.html',
  styleUrls: ['./post-bubble.component.scss'],
})
export class PostBubbleComponent implements OnInit {

  @Input() data: any
  // @Input() user: any
  @ViewChild('img') img
  @ViewChild('test') test
  @ViewChild('src') profile
show=true
  defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/images%2Favatar.jpg?alt=media&token=ec1dfd38-fa0d-4f73-a953-51e2c7756f5f"

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (this.data!=undefined &&this.data.file_name != '') {
      this.show=true
      var storageRef = firebase.storage().ref()
      storageRef.child('images/' + this.data.file_name).getDownloadURL().then(res => {
        this.img.src = res

      })
      // {{data.content}}
      
      if(this.test!=undefined)
       { this.test.el.innerHTML = this.data.show_message
      if (this.data.nameToShow == "צוות פארקור ישראל")
      this.profile.src = this.defaultAvatar
      else {
        
        var storageRef = firebase.storage().ref()
        storageRef.child('ImageProfile/' + this.data.userProfile).getDownloadURL().then(res => {
          this.profile.src = res
        })
        
      }
    }
    }
    else
    this.show=false
  }
  
getShow()
{
  return this.show
}
  postPage() {
    this.router.navigateByUrl('/post-page')
  }
}
