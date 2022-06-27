import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJourneyLeg } from 'src/app/interfaces/journeyLeg';

@Component({
  selector: 'app-journey-leg',
  templateUrl: './journey-leg.component.html',
  styleUrls: ['./journey-leg.component.scss'],
})
export class JourneyLegComponent implements OnInit {

  @Input() journeyLeg!:IJourneyLeg;
  @Output() thisUpdateLegEvent = new EventEmitter;
  detailMode:boolean;

  constructor() {
    this.detailMode = false;
  }

  showDetails(){
    this.detailMode = true;
  } 

  closeDetails(){
    this.detailMode = false;
  }

  updateLeg(thisLeg: any){
    this.journeyLeg = thisLeg;
    this.thisUpdateLegEvent.emit(thisLeg);
  }

  ngOnInit() {
     
  }

}
