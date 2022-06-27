import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserTypes, AccomTypes, OneRndOptions, TransModeOptions } from 'src/app/constants/appConstant';
import { IEvent } from 'src/app/interfaces/event';
import { IJourney, IJourneyAndLegs } from 'src/app/interfaces/journey';
import { IJourneyLeg } from 'src/app/interfaces/journeyLeg';
import { IRegistration } from 'src/app/interfaces/registration';
import { EventAndRegService } from 'src/app/services/event-and-reg.service';
import { JourneyLegService } from 'src/app/services/journey-leg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-journey-leg-details',
  templateUrl: './journey-leg-details.component.html',
  styleUrls: ['./journey-leg-details.component.scss'],
})
export class JourneyLegDetailsComponent implements OnInit {

  @Input() journeyLegDetails!:IJourneyLeg;
  @Input() thisJourneyID!: number;
  @Output() updateLegEvent = new EventEmitter;
  @Output() addJourneyWithLegEvent = new EventEmitter;
  @Output() addLegEvent = new EventEmitter;


  currentUser;
  displayEvent: boolean;

  eventsByGoer!:IEvent[];
  regEventSelected;
  eventImage;
  formJourneyLeg;

  userTypes;
  oneRndOptions;
  transModeOptions;
  accomTypes;

  constructor(private EventAndRegService: EventAndRegService, private JourneyLegService: JourneyLegService, private toastController:ToastController, private userService: UserService ) {

    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;
    this.displayEvent = false;
    this.oneRndOptions = OneRndOptions;
    this.transModeOptions = TransModeOptions;
    this.accomTypes = AccomTypes;
    this.userTypes = UserTypes;
 
   
    this.formJourneyLeg = new FormGroup({
      regID: new FormControl(''),
      tripFrom: new FormControl('', [Validators.required]),
      dateFrom: new FormControl(''),
      tripTo: new FormControl('', [Validators.required]),
      dateTo: new FormControl(''),
      transMode: new FormControl(''),
      costTrans: new FormControl(''),
      OWRndTrip: new FormControl(''),
      addrAccomd: new FormControl(''),
      dateStayStart: new FormControl(''),
      dateStayEnd: new FormControl(''),
      accomType: new FormControl(''),
      costAccomd: new FormControl(''),
     
    });

    EventAndRegService.getEventsByGoer(this.currentUser).subscribe((results)=> {
      this.eventsByGoer = results;
      console.log(results);
    }, (err) => {
        console.log(err);
    });
   }


  selectEvent(selectedValue:any){

    console.log("console.log(selectedValue);");
    console.log(selectedValue.detail.value);
 
    let regID = selectedValue.detail.value;
    this.regEventSelected = this.EventAndRegService.findEventByRegID(this.eventsByGoer, regID);

    console.log("this.regEventSelected");
    console.log(this.regEventSelected);
    this.eventImage =  `http://localhost:3000/images/${this.regEventSelected.Event.image}`;
     
    console.log("this.eventImage");
    console.log(this.eventImage);
   }

  onSave(){
    let thisLeg = <IJourneyLeg> {};
    let newJourneyID;

    if (this.journeyLegDetails){
        thisLeg.legID = this.journeyLegDetails.legID;
        thisLeg.journeyID = this.journeyLegDetails.journeyID;
        
        Object.assign(thisLeg, this.formJourneyLeg.value);
    
        console.log("thisLeg");
        console.log(thisLeg);

        this.JourneyLegService.putJourneyLegDetails(thisLeg.legID, thisLeg).subscribe((result)=>{
          console.log("result after putJourneyLegDetails");
          console.log(result);

          this.updateLegEvent.emit(thisLeg);

          this.showToast();
        });
    } else{
        
        if (this.thisJourneyID) {
          thisLeg.journeyID = this.thisJourneyID;

          console.log("if (this.thisJourneyID)");
          console.log(this.thisJourneyID);

          Object.assign(thisLeg, this.formJourneyLeg.value);
          this.JourneyLegService.postJourneyLeg(thisLeg).subscribe((result)=>{
            console.log("result after postJourneyLeg");
            console.log(result);
         
            Object.assign(thisLeg, result);
            this.addLegEvent.emit(thisLeg);
            console.log("this.addLegEvent.emit(thisLeg);");
            console.log(thisLeg);

            this.showToast();
          });
        } else {
          let newJourney = <IJourney> {};
          newJourney.userID = this.currentUser;

          this.JourneyLegService.postJourney(newJourney).subscribe((result)=>{

            Object.assign(newJourney, result);
            newJourneyID = newJourney.journeyID;

            console.log("newJourneyID;");
            console.log(newJourneyID);
            thisLeg.journeyID = newJourneyID;

            Object.assign(thisLeg, this.formJourneyLeg.value);
            this.JourneyLegService.postJourneyLeg(thisLeg).subscribe((result)=>{
              console.log("result after postJourneyLeg");
              console.log(result);
            
              console.log("this.currentUser");
              console.log(this.currentUser);

              console.log("newJourneyID");
              console.log(newJourneyID);
              this.JourneyLegService.getJourneyAndLegs(this.currentUser, newJourneyID).subscribe((result)=>{
                console.log("result");
                console.log(result);
                  this.addJourneyWithLegEvent.emit(result);

                  this.showToast();

              });

            });
          });
        }
    
     
    }
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Trip saved successfully.',
      duration: 3000,
      position: "top",
      buttons: [
        {
          text: "OK",
          handler: () =>{
            console.log("OK Clicked");
          }
        }
      ]
    });
    toast.present();
  }
  
  ngOnInit() {
    console.log(this.journeyLegDetails);
    console.log("thisJourneyID");
    console.log(this.thisJourneyID);
  
    if (this.journeyLegDetails) {
      this.formJourneyLeg.patchValue({
        regID: this.journeyLegDetails.regID,
        tripFrom: this.journeyLegDetails.tripFrom,
        dateFrom: new Date(this.journeyLegDetails.dateFrom).toISOString().substring(0,10),
        tripTo: this.journeyLegDetails.tripTo,
        dateTo: new Date(this.journeyLegDetails.dateTo).toISOString().substring(0,10),
        transMode: this.journeyLegDetails.transMode,
        costTrans: this.journeyLegDetails.costTrans,
        OWRndTrip: this.journeyLegDetails.OWRndTrip,
        addrAccomd: this.journeyLegDetails.addrAccomd,
        dateStayStart: new Date(this.journeyLegDetails.dateStayStart).toISOString().substring(0,10),
        dateStayEnd: new Date(this.journeyLegDetails.dateStayEnd).toISOString().substring(0,10),
        accomType: this.journeyLegDetails.accomType,
        costAccomd: this.journeyLegDetails.costAccomd,
      });
    }  
  }

}

/*  <div *ngIf = "eventRegSelected != 'undefined'" >
<app-event-list-item [eventListItem]="eventRegSelected"></app-event-list-item>
</div>
*/