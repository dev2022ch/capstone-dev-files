import { Component } from '@angular/core';
import { IEvent } from '../interfaces/event';
import { EventAndRegService } from '../services/event-and-reg.service';
import { UserTypes } from 'src/app/constants/appConstant';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  currentUser:number;
  userTypes;
  regsAndEventsForGoer!:IEvent[];

  constructor(private eventAndRegService: EventAndRegService, private userService: UserService) {
  
    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;

    console.log("Tab1 currentUserData");
    console.log(currentUserData);
    this.userTypes = UserTypes;
    eventAndRegService.getEventsByGoer(this.currentUser).subscribe((results)=> {
        this.regsAndEventsForGoer = results;
        console.log(results);
      }, (err) => {
          console.log(err);
      });
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter()");

    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;

    this.eventAndRegService.getEventsByGoer(this.currentUser).subscribe((results)=> {
      this.regsAndEventsForGoer = results;
      console.log(results);
    }, (err) => {
        console.log(err);
    });
  }
}
