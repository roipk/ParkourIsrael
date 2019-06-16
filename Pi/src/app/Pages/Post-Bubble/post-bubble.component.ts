import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-bubble',
  templateUrl: './post-bubble.component.html',
  styleUrls: ['./post-bubble.component.scss'],
})
export class PostBubbleComponent implements OnInit {

  @Input() data: any

  constructor() { }

  ngOnInit() {}

}
