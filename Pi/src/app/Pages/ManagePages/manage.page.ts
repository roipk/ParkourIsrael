import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
})
export class ManagePage {
  manager = false;

  constructor(
    private uAuth:AngularFireAuth) { }

  ngOnInit(): void {
    this.uAuth.user.subscribe(() => {     
    })
  }
}
