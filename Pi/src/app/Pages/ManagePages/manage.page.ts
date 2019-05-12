import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
})
export class ManagePage {
  manager = false;

  constructor(
    private userAuth: AngularFireAuth,
    private uAuth:AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router) { }

  ngOnInit(): void {
    this.uAuth.user.subscribe(() => {
      this.adminMode()  
     
    })
    

  }





  adminMode()
  {
    if(this.uAuth.auth.currentUser != null)
    {

    
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
    .get().subscribe(result => {
     
      this.manager = result.data().manager
      // this.fullName = result.data().nickName
    
    //alert(this.fullName +' is manager? ')
    if(this.manager != undefined && this.manager )
    {
      document.getElementById('manager').style.visibility = 'visible'
      document.getElementById('btnLogin').innerHTML='LogOut'
    }
    else
    {
      document.getElementById('manager').style.visibility = 'hidden'
      document.getElementById('btnLogin').innerHTML='LogOut'
    }
    })
  }
  else
  {
    document.getElementById('manager').style.visibility = 'hidden'
    document.getElementById('btnLogin').innerHTML='Login'
  }
}


login()
  {
    
    if(document.getElementById('btnLogin').innerHTML=='Login')
    { 
      this.router.navigateByUrl('/login')
    }
    else
    {
      this.userAuth.auth.signOut().then((result)=> {
        document.getElementById('btnLogin').innerHTML = 'Login'
        this.router.navigateByUrl('/home').then(()=>{})
      })
    }
  }

}
