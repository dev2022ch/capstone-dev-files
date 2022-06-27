import { Component } from '@angular/core';
import { JourneyLegService } from '../services/journey-leg.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentUser:number;
  createJourneyAndLeg:boolean;
  addLegFlag:boolean;
  addLegText:string;
  journeysAndLegs!:any;
  currentIndex: number;

  constructor(private journeyLegService: JourneyLegService, private userService: UserService) {
    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;
    this.createJourneyAndLeg = false ;
    this.addLegFlag = false;

    this.addLegText = "Add a stop" ;

    journeyLegService.getJourneysAndLegs(this.currentUser).subscribe((results)=> {
      this.journeysAndLegs = results;
      console.log(this.journeysAndLegs);

    }, (err) => {
        console.log(err);
    });
  
  }

  onCreate(){
    this.createJourneyAndLeg = true;
  }

  closeCreateDetails(){
    this.createJourneyAndLeg = false;
  }

  addLegClicked(index: number){
    this.currentIndex = index;
    this.addLegFlag = true;
  }

  closeDetails(){
    this.addLegFlag = false;
  }

  addLeg(thisLeg: any, theseLegs: any){
    console.log("addLeg(thisLeg: any, theseLegs: any)");
    console.log(theseLegs);
    console.log(thisLeg);
    theseLegs.push(thisLeg);
    console.log("push(thisLeg");
    console.log(theseLegs);
  
  }
  addJourneyWithLeg(data: any){

    console.log(" addJourneyWithLeg(data: any");
    console.log(data);
   // this.journeysAndLegs.push(data);

    this.journeysAndLegs = [...this.journeysAndLegs, ...data];
    console.log("this.journeysAndLegs.push(data);");
    console.log(this.journeysAndLegs);
  }

  

  ionViewWillEnter(){
    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;

    this.journeyLegService.getJourneysAndLegs(this.currentUser).subscribe((results)=> {
      this.journeysAndLegs = results;
      console.log(this.journeysAndLegs);

    }, (err) => {
        console.log(err);
    });

  }
}
