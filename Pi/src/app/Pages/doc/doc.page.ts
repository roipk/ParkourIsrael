import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.page.html',
  styleUrls: ['./doc.page.scss'],
})
export class DocPage implements OnInit {
 lan=true;
  constructor() { }

  ngOnInit() {
  }

  lang() {
    return this.lan
  }
}
