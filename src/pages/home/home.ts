import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slides') slides: any;

  // Doughnut
  public doughnutChartLabels:string[] = ['A', 'B', 'C', 'D'];
  public doughnutChartData:number[] = [5, 5, 5, 5];
  public doughnutChartType:string = 'doughnut';

  hasAnswered: boolean = false;
  score: number = 0;
  optionScore  = [0, 0, 0, 0];
  moreOption: string;
  numberQuestions: number;

  slideOptions: any;
  questions: any;

  options = ['a', 'b', 'c', 'd'];

  constructor(public navCtrl: NavController, public dataService: Data) {

  }

  ionViewDidLoad() {

      this.slides.lockSwipes(true);

      this.dataService.load().subscribe((data) => {
        this.questions = data['questions'];
        this.numberQuestions = this.questions.length;
      });

  }

  nextSlide(){
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question, option){
      switch(option) {
          case "a":
            this.optionScore[0]++
              break;
          case "b":
            this.optionScore[1]++
              break;
          case "c":
            this.optionScore[2]++
              break;
          default:
            this.optionScore[3]++
      }
      console.log(this.optionScore);
      this.hasAnswered = true;
      answer.selected = true;
      question.flashCardFlipped = true;

      if(answer.correct){
          this.score++;
      }

      var maior = 0;
      for (var i = 0; i < this.optionScore.length; i++) {
         if ( this.optionScore[i] > maior ) {
            maior = this.optionScore[i];
            this.moreOption = this.options[i];
         }
      }
      setTimeout(() => {
          this.hasAnswered = false;
          this.nextSlide();
          answer.selected = false;
          question.flashCardFlipped = false;
      }, 500);
  }

  randomizeAnswers(rawAnswers: any[]): any[] {

      for (let i = rawAnswers.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = rawAnswers[i];
          rawAnswers[i] = rawAnswers[j];
          rawAnswers[j] = temp;
      }

      return rawAnswers;

  }

  restartQuiz() {
      this.score = 0;
      this.moreOption = undefined;
      this.optionScore = [0, 0, 0, 0];
      this.slides.lockSwipes(false);
      this.slides.slideTo(1, 1000);
      this.slides.lockSwipes(true);
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
