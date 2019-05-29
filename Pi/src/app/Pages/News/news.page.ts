import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IsManagerGuard } from 'src/app/is-manager-guard/is-manager.guard';
import * as firebase from 'firebase';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})



export class NewsPage {

  [x: string]: any;
  fullName = ''
  messages = []



  constructor(
    private uAuth: AngularFireAuth,
    // private ngZone: NgZone,
    private route: Router,
    private db: AngularFirestore,
    private guard: IsManagerGuard
  ) { }



  ngOnInit(): void {
    this.uAuth.user.subscribe(() => {
    })
    this.db.collection('messages').valueChanges().subscribe(
      result => {
        result.sort((m1, m2) => {
          if (m1['timestamp'] < m2['timestamp']) return 1
          else return -1
        })
        this.messages = [...result]
        return
      })
  }

  createExit() {
    let cross = this.exit.createElement('div')
    cross.textContent = 'x'
  }

  write() {
    this.route.navigateByUrl('/writePost')
  }


  getContentColor(m) {
    if (this.fullName != null && m != null && this.fullName === m.from) {
      return 'red'
    }
  }


}
