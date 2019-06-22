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
    src: 'https://static.wixstatic.com/media/3f6e79_edffb7457e594159ad8860143c48f0cd~mv2.jpg/v1/fill/w_1500,h_628,al_c,q_90/3f6e79_edffb7457e594159ad8860143c48f0cd~mv2.webp'
  },
  {
    src: 'https://static.wixstatic.com/media/3f6e79_83ed46c3d0d943198a7ae7a04f657683~mv2.jpg/v1/fill/w_1500,h_628,al_c,q_90/3f6e79_83ed46c3d0d943198a7ae7a04f657683~mv2.webp'
  },
 
  {
    src: 'https://static.wixstatic.com/media/3f6e79_da6b905e89ef4c9e8cc1253d623ed970~mv2.jpg/v1/fill/w_1500,h_628,al_c,q_90/3f6e79_da6b905e89ef4c9e8cc1253d623ed970~mv2.webp'
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
        for (let i = 0; i < 3; i++) {
          this.message[i] = result[i]

        }
        // this.message = [...result]
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
