import { Component, Input, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
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
  @ViewChild('test') test
  fullName = '1';
  lan = true;
  public dots = [{
    src: 'https://static.wixstatic.com/media/3f6e79_3e7ef9b2a01643afbb6b76d253a1120c~mv2.jpg/v1/fill/w_1500,h_628,al_c,q_90/3f6e79_3e7ef9b2a01643afbb6b76d253a1120c~mv2.webp'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/ImagesHome%2F14372106_1091934970897532_7430857650098497195_o.jpg?alt=media&token=86bbc47d-597f-4cef-9e11-a6ab20251c3e'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/ImagesHome%2F14435214_1100360520054977_9221040805172502489_o.jpg?alt=media&token=370942e5-6dc6-4366-bb62-43b14d721bcc'
  },
 
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/ImagesHome%2F14500332_1100360583388304_1170007292514886847_o.jpg?alt=media&token=ea0ff8fb-3f60-49bc-a0b1-1edd98604192'
  },

  {
    src: 'https://firebasestorage.googleapis.com/v0/b/parkour-israel.appspot.com/o/ImagesHome%2F15732162_1194606803963681_828908767134338318_o.jpg?alt=media&token=7546abff-c1dc-4c02-8245-cda63df80bfd'
  },
 
  ]
  message = []
  slideIndex = 0;

  timeLeft: number = 5;
  interval;

  constructor(
    private cdRef: ChangeDetectorRef,
    private db: AngularFirestore,
    private renderer: Renderer2,

  ) { }


  ngOnInit(): void {
    // this.showSlides(this.slideIndex);
    this.db.collection('messages').valueChanges().subscribe(
      result => {
        result.sort((m1, m2) => {
          if (m1['timestamp'] < m2['timestamp']) return 1
          else return -1
        })
        if(result.length>3)
        {
        for (let i = 0; i < 3; i++) {
          this.message[i] = result[i]
        }
      }
      else 
        this.message = [...result]
      })
    this.test.src=this.dots[0].src
    this.startTimer()
   
  }



  ngAfterViewChecked() {
    let show = this.isShowExpand();
    if (show != this.lan) { // check if it change, tell CD update view
      this.lan = show;
      this.cdRef.detectChanges();
    }

  }

  isShowExpand() {
    return LanguageComponent.lan
  }
  lang() {
    return this.lan

  }





 

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 5;
        this.plusSlides(1)
        
      }
    },1000)
  }




  plusSlides(n) {
    this.timeLeft = 5;
  this.slideIndex +=n
  if(this.slideIndex>=this.dots.length)
    this.slideIndex=0;
  else if(this.slideIndex < 0)
    this.slideIndex=this.dots.length-1;
    this.showSlides(this.slideIndex);
  }

  showSlides(n) {
    this.test.src=this.dots[n].src
  }

  imageSlides(n)
  {
    this.timeLeft = 5;
    this.test.src=n.src
  }

}
