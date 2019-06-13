import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
// import { NavbarComponent } from '../navbar/navbar.component';


import { LanguageComponent } from '../language/language.component'
import { NewsPage } from '../News/news.page';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('generalTitle') generalTitle

  fullName = '1';
  lan = true;
  message=[]
  massage1:any
  massage2:any
  massage3:any

  constructor(
    private cdRef : ChangeDetectorRef,
    private db: AngularFirestore,
    
  ) { }


  ngOnInit(): void {
    this.db.collection('messages').valueChanges().subscribe(
      result => {
        result.sort((m1, m2) => {
          if (m1['timestamp'] < m2['timestamp']) return 1
          else return -1
        })
        for (let i = 0; i <3; i++) {
          this.message[i] = result[i]
          
        }
        // this.message = [...result]
      })

  //    this.massage1=this.message[0]
  //    this.massage2 =this.message[0]
  // this.massage3 =this.message[0]
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
