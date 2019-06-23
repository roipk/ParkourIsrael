import { Component, ChangeDetectorRef } from '@angular/core';
import { LanguageComponent } from '../language/language.component';
import { NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
})
export class InfoPage {
  lan=true;
  vid = "https://www.youtube.com/embed/TeV10LwQ1tk";

  constructor(private cdRef: ChangeDetectorRef, public navCtrl: NavController, private dom: DomSanitizer)
  { }
  
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

  sanitize(vid){
    return this.dom.bypassSecurityTrustResourceUrl(this.vid);
  }

}