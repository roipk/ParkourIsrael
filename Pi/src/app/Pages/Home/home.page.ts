import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fullName = ''
  manager = false;
  

  constructor(
    private uAuth: AngularFireAuth,
    private userAuth: AngularFireAuth, 
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
      // alert('in')
    this.db.collection('users').doc(this.uAuth.auth.currentUser.uid)
    .get().subscribe(result => {
      // alert('in2')
    this.manager = result.data().manager
    // alert('in2.1')
    if(this.manager != undefined && this.manager )
    {
      // alert('in3')
      document.getElementById('manager').style.visibility = 'visible'
      document.getElementById('btnLogin').innerHTML='LogOut'
    }
    else
    { 
      //alert('in4')
      
      document.getElementById('manager').style.visibility = 'hidden'
      document.getElementById('btnLogin').innerHTML='LogOut'
    }
    })
  }
  else
  {
    // alert('in5')
    document.getElementById('manager').style.visibility = 'hidden'
    document.getElementById('btnLogin').innerHTML='Login'
  }
  // alert('in6')
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
