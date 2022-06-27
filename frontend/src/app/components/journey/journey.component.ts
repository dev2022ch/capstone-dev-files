import { Component, Input, OnInit } from '@angular/core';
import { IJourneyInfo } from 'src/app/interfaces/journey-info';
import { IJourneyLeg } from 'src/app/interfaces/journeyLeg';
import { JourneyLegService } from 'src/app/services/journey-leg.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent implements OnInit {

  @Input() journeyAndLegs!:IJourneyLeg;
  journeyInfo: IJourneyInfo;
  detailMode:boolean;

  toggleText:string;


 

  constructor(private journeyLegService:JourneyLegService) {
    this.detailMode = false;

    this.toggleText = "Show Details";
  }

  btnToggle(){
    this.detailMode = !(this.detailMode);
    if (this.detailMode === true) {
      this.toggleText = `Hide <br>Details`;
    } else{
      this.toggleText =`Show <br>Details`;
    }
  } 

  ngOnInit() {
    console.log("ngOnInit this.journeyAndLegs");

    console.log(this.journeyAndLegs); 

    this.journeyInfo = this.journeyLegService.getJourneyInfo(this.journeyAndLegs);

    console.log("this.journeyInfo");

    console.log(this.journeyInfo); 
  }

}
