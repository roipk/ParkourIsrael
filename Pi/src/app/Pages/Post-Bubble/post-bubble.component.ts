import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-bubble',
  templateUrl: './post-bubble.component.html',
  styleUrls: ['./post-bubble.component.scss'],
})
export class PostBubbleComponent implements OnInit {

  @Input() data
  @Input() fullName

  constructor() { }

  ngOnInit() {
  }


  getContentColor(m) {
    if(this.fullName != null && m != null && this.fullName === m.from) {
      return 'red'
    }
  }

}
