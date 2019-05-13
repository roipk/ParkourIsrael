import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
})
export class ManagePage {
  manager = false;

  constructor(
    private uAuth:AngularFireAuth,
    private db: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.uAuth.user.subscribe(() => { 
      if(this.uAuth.auth.currentUser != null)
      {
          this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
          .get().subscribe(result => {
          this.manager = result.data().manager  
          if(!this.manager)
          {
            window.location.href = "#";
          } 
          })
      }
      else{
        window.location.href = "#";
      } 
    
    })
  }
}
  

