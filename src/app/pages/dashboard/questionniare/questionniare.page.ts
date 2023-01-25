/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-questionniare',
  templateUrl: './questionniare.page.html',
  styleUrls: ['./questionniare.page.scss'],
})
export class QuestionniarePage implements OnInit {

  q1: string = null;
   q2: string = null;
   q3: string = null;
   q4: string = null;
   q5: string = null;
   q6: string = null;
   q7: string = null;
   q8: string = null;

   history = 0;
   english = 0;
   computing = 0;
   music = 0;
   biology = 0;

   timer: any;

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/quotes
    var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

function hourglass() {
  var a;
  a = document.getElementById("div1");
  a.innerHTML = "&#xf251;";
  setTimeout(function() {
      a.innerHTML = "&#xf252;";
    }, 1000);
  setTimeout(function() {
      a.innerHTML = "&#xf253;";
    }, 2000);
}
hourglass();
setInterval(hourglass, 3000);
  }

  calculatescore(){
    if((this.q1!=null) && (this.q2!=null) && (this.q3!=null) && (this.q4!=null) && (this.q5!=null)&& (this.q6!=null)
    && (this.q7!=null)&& (this.q8!=null))
    {
        //For question 1
         if(this.q1 === '1'){
          this.history += 1;
         }else if(this.q1 ==='2'){
          this.english += 1;
         } else if(this.q1 ==='3'){
          this.computing += 1;
         } else if(this.q1 ==='4'){
          this.music += 1;
         } else if(this.q1 ==='5'){
          this.biology += 1;
         }
         //For question 2
          if(this.q2 === '1'){
          this.history += 1;
         }else if(this.q2 ==='2'){
          this.english += 1;
         } else if(this.q2 ==='3'){
          this.computing += 1;
         } else if(this.q2 ==='4'){
          this.music += 1;
         } else if(this.q2 ==='5'){
          this.biology += 1;
         }
         //For question 3
          if(this.q3 === '1'){
          this.history += 1;
         }else if(this.q3 ==='2'){
          this.english += 1;
         } else if(this.q3 ==='3'){
          this.computing += 1;
         } else if(this.q3 ==='4'){
          this.music += 1;
         } else if(this.q3 ==='5'){
          this.biology += 1;
         }
         //For question 4
          if(this.q4 === '1'){
          this.history += 1;
         }else if(this.q4 ==='2'){
          this.english += 1;
         } else if(this.q4 ==='3'){
          this.computing += 1;
         } else if(this.q4 ==='4'){
          this.music += 1;
         } else if(this.q4 ==='5'){
          this.biology += 1;
         }
         //For question 5
          if(this.q5 === '1'){
          this.history += 1;
         }else if(this.q5 ==='2'){
          this.english += 1;
         } else if(this.q5 ==='3'){
          this.computing += 1;
         } else if(this.q5 ==='4'){
          this.music += 1;
         } else if(this.q5 ==='5'){
          this.biology += 1;
         }
          //For question 6
          if(this.q6 === '1'){
            this.history += 1;
           }else if(this.q6 ==='2'){
            this.english += 1;
           } else if(this.q6 ==='3'){
            this.computing += 1;
           } else if(this.q6 ==='4'){
            this.music += 1;
           } else if(this.q6 ==='5'){
            this.biology += 1;
           }
            //For question 7
          if(this.q7 === '1'){
            this.history += 1;
           }else if(this.q7 ==='2'){
            this.english += 1;
           } else if(this.q7 ==='3'){
            this.computing += 1;
           } else if(this.q7 ==='4'){
            this.music += 1;
           } else if(this.q7 ==='5'){
            this.biology += 1;
           }
            //For question 8
          if(this.q8 === '1'){
            this.history += 1;
           }else if(this.q8 ==='2'){
            this.english += 1;
           } else if(this.q8 ==='3'){
            this.computing += 1;
           } else if(this.q8 ==='4'){
            this.music += 1;
           } else if(this.q8 ==='5'){
            this.biology += 1;
           }

         //check the Highest score to determine which course the learner should take
         const scoreArray = [this.history, this.english, this.computing, this.music, this.biology];
         let largestNum = scoreArray[0];
         let indexNum = 0;

         for(let i = 0; i < scoreArray.length; i++) {
          	if(scoreArray[i] > largestNum) {
               largestNum = scoreArray[i];
               indexNum = i;
            }
          };
          if(indexNum===0){
            window.alert("You can go for History");
           } if(indexNum===1){
            window.alert("You can go for English");
           } if(indexNum===2){
            window.alert("You can go for Computer Science");
           } if(indexNum===3){
            window.alert("You can go for Music ");
           } if(indexNum===4){
            window.alert("You can go for Biology ");
           }
           indexNum = 0;
      }else{
      console.log("please check if you answered all the questions ");
      }
      this.history=0; this.english=0; this.computing=0; this.music=0; this.biology=0;
    }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }

}
