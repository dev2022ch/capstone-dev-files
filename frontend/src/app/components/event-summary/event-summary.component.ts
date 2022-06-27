import { Component, Input, OnInit } from '@angular/core';
import { UserTypes, RegStatus } from 'src/app/constants/appConstant';
import { IEvent } from 'src/app/interfaces/event';
import { IRegistration } from 'src/app/interfaces/registration';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss'],
})
export class EventSummaryComponent implements OnInit {

  @Input() userType: number;
  @Input() event!: IEvent;
  @Input() regForGoer!: IRegistration;
  @Input() regsForOrg: any;
  @Input() thisImage;

  userTypes;
  displayDetails: boolean;
  displayRegsForOrg: boolean;

  regsStatForOrg: any;
  textStatus;

  constructor() { 
    this.userTypes = UserTypes;
    this.displayDetails = false;
    this.displayRegsForOrg = false;

   
  }

  btnDetailsClick(){
    this.displayDetails = true;
 
  }

  btnCloseDetailsClick(){
    this.displayDetails = false;
  }

  btnRegsForOrgClick(){
    this.displayRegsForOrg = true;
  }

  btnCloseRegsClick(){
    this.displayRegsForOrg = false;
  }

  submitRegistration(thisReg: any){
    this.regForGoer = thisReg;
  }

  updateEvent(data: any){
    this.event = data;
  }

  ngOnInit() {
    console.log(" EventSummaryComponent ngOnInit event");
    console.log(this.event);

    this.thisImage = `http://localhost:3000/images/${this.event.image}`;

    if (this.regForGoer) {
        switch(this.regForGoer.status) {
          case RegStatus.INVITED:
            this.textStatus = "Invited";
            break;
          case RegStatus.REGISTERED:
            this.textStatus = "Registered";
            break;
          case RegStatus.REG_CXLD:
            this.textStatus = "Registration Cancelled";
            break;
          case RegStatus.REG_PENDING_CONF:
            this.textStatus = "Registration Pending";
            break;
          default:
            // code block
        }
    }
  }
}
