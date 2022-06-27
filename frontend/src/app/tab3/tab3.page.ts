import { Component } from '@angular/core';
import { UserTypes } from 'src/app/constants/appConstant';
import { IRegistration } from '../interfaces/registration';
import { EventAndRegService } from '../services/event-and-reg.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  currentUser:number;
  createEvent:boolean;
  userTypes;
  
  eventsRegsForOrg!:any;
  eventRegsForOrg!:any;

  constructor(private eventAndRegService: EventAndRegService, private userService: UserService) {
    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;
    this.createEvent = false ;

    this.userTypes = UserTypes;
  

    eventAndRegService.getEventsRegsByOrg(this.currentUser).subscribe((results)=> {
      this.eventsRegsForOrg = results;
      console.log("this.eventsRegsForOrg");
      console.log(this.eventsRegsForOrg);

    }, (err) => {
        console.log(err);
    });
  
  }

  onCreate(){
    this.createEvent = true;
  }

  closeCreateDetails(){
    this.createEvent = false;
  }

  addEvent(data: any){
 

    this.eventsRegsForOrg.push(data);
    console.log("this.eventsRegsForOrg.push(data);");
    console.log(this.eventsRegsForOrg);
  }

  ionViewWillEnter(){
    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;

    this.eventAndRegService.getEventsRegsByOrg(this.currentUser).subscribe((results)=> {
      this.eventsRegsForOrg = results;
      console.log("this.eventsRegsForOrg");
      console.log(this.eventsRegsForOrg);

    }, (err) => {
        console.log(err);
    });


  }

}



