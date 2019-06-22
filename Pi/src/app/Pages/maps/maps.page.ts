import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {


  static mapSpot = true;
  static mapTrain = false;
  static mapClass = false;
  map1 = MapsPage.mapSpot;
  map2 = MapsPage.mapTrain;
  map3 = MapsPage.mapClass;
  constructor(private cdRef: ChangeDetectorRef, ) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.map1 != MapsPage.mapSpot) {
      this.map1 = MapsPage.mapSpot
      this.cdRef.detectChanges();
    }
    if (this.map2 != MapsPage.mapTrain) {
      this.map2 = MapsPage.mapTrain
      this.cdRef.detectChanges();
    }
    if (this.map3 != MapsPage.mapClass) {
    this.map3 = MapsPage.mapClass
    this.cdRef.detectChanges();
    }
  }

}
