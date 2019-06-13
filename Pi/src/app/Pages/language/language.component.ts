import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit , OnChanges {
 
  static lan =true

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
 
  debugger
 }
}
