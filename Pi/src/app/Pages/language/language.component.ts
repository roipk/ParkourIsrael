import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  lan = 'English'
  l = false

  
  public languages = [
    { name: 'English' },
    { name: 'עברית' },
  ]


  constructor() { }

  ngOnInit() {}


  
  lang() {

    if (this.lan == this.languages[0].name) {
      return true;
    }
    else
      return false;
  }
  
  language(language) {
    // debugger
    this.lan = language.name
    //  alert("laguage is " + this.lan)

  }

}
