import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
// import { NavbarComponent } from '../navbar/navbar.component';


import { LanguageComponent } from '../language/language.component'



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('generalTitle') generalTitle

  lan = true;


  constructor(
    private cdRef : ChangeDetectorRef
    
  ) { }


  ngOnInit(): void {
   
  }



  ngAfterViewChecked() {
    let show = this.isShowExpand();
    if (show != this.lan) { // check if it change, tell CD update view
      this.lan = show;
      this.cdRef.detectChanges();
    }

  }

  isShowExpand()
  {
    return LanguageComponent.lan
  }
  lang() {
    return this.lan
    
  }


}
