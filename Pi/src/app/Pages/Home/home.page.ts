import { Component } from '@angular/core';

// import {LanguageComponent} from '../language/language.component'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lan = true
  constructor(
    // private langu:LanguageComponent
  ) { }
 

  ngOnInit(): void {
 

  }

  setLan(l:boolean)
  {
   
    this.lan = l
  }

  lang()
  { 

  }
}
