import { Component, ChangeDetectorRef } from '@angular/core';
import { LanguageComponent } from '../language/language.component';


@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
})
export class InfoPage {
  lan=true;


  constructor(private cdRef: ChangeDetectorRef,) { }
  ngOnInit(): void {}

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