import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.page.html',
  styleUrls: ['./doc.page.scss'],
})
export class DocPage implements OnInit {
 lan=true;
  constructor(private cdRef: ChangeDetectorRef,) { }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    let show = this.isShowExpand();
    if (show != this.lan) { // check if it change, tell CD update view
      this.lan = show;
      this.cdRef.detectChanges();
    }

  }

  isShowExpand() {
    return LanguageComponent.lan
  }
  lang() {
    return this.lan
  }
}
