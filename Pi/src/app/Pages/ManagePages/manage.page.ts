import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { post } from 'selenium-webdriver/http';



@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
})
export class ManagePage {

  @ViewChild('title') titleField
  @ViewChild('date') dateField


  manager = false;
  showPages = false;
  showPosts = false;
  showUsers = false;

  public pages = []
  public posts = []
  public users = []

  


  //{ url: '1', name: 'test' }
  constructor(
    private uAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) { }


  ngOnInit(): void {
    this.db.collection('users').valueChanges().subscribe(
      result => {
        result.sort((m1, m2) => {
          if (m1['userName'] > m2['userName']) return 1
          else return -1
        })
        this.users = [...result]
      })

    this.db.collection('messages').valueChanges().subscribe(
      result => {
        result.sort((m1, m2) => {
          if (m1['userName'] < m2['userName']) return 1
          else return -1
        })
        this.posts = [...result]
      })
  }




  serch(list, find) {
    if (list == this.posts) {
      if(find=='')
      {
        this.db.collection('messages').valueChanges().subscribe(
          result => {
            result.sort((m1, m2) => {
              if (m1['timestamp'] < m2['timestamp']) return 1
              else return -1
            })
            this.posts = [...result]
          })
          return
      }
      this.posts = [...list.filter(obj => {
        return obj.title === find
      })]
    }

    if(list == this.users)
    {

      if(find=='')
      {
        this.db.collection('users').valueChanges().subscribe(
          result => {
            result.sort((m1, m2) => {
              if (m1['userName'] > m2['userName']) return 1
              else return -1
            })
            this.users = [...result]
          })
          return
      }
      this.users = [...list.filter(obj => {
        return obj.userName === find
      })]
    }
  }


  
  openPagesList() {
    this.showPages = !this.showPages;
  }

  openPostsList() {
    this.showPosts = !this.showPosts;
  }

  openUsersList() {
    this.showUsers = !this.showUsers;
  }
}


