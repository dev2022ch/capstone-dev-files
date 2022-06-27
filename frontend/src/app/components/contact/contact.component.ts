import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContact } from 'src/app/interfaces/contact';
import { RequestDirection, ContactStatus, ActionOnContact } from 'src/app/constants/appConstant';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  @Input() contact!: IContact;
  @Output() reloadEvent = new EventEmitter;
  thisDirection;
  thisStatus;


  constructor(private thisUserService: UserService) { 
    this.thisDirection = RequestDirection;
    this.thisStatus = ContactStatus;
    console.log("this.thisDirection");
    console.log(this.thisDirection);
    console.log("ContactStatus");
    console.log(ContactStatus);

  }

  confirmRequest(){

    let updateInstructions = {
      actionID: ActionOnContact.CONFIRM,
      userID: this.contact.userID,
      contactUserID: this.contact.contactUserID,
     
    }

    this.thisUserService.manageContacts(updateInstructions).subscribe((result)=> {
        console.log(result);

        this.reloadEvent.emit(null);
    }, (err) => {
        console.log(err);
    });
   }

  declineRequest(){

    let updateInstructions = {
      actionID: ActionOnContact.DECLINE,
      userID: this.contact.userID,
      contactUserID: this.contact.contactUserID,
    }

    this.thisUserService.manageContacts(updateInstructions).subscribe((result)=> {

      this.reloadEvent.emit(null);
      console.log(result);
    }, (err) => {
        console.log(err);
    });
  }

  deleteContact(){
    this.thisUserService.deleteContact(this.contact.relationID).subscribe((result)=> {
      this.reloadEvent.emit(null);
      console.log(result);
    }, (err) => {
        console.log(err);
    });
 }

  ngOnInit() {
    
    console.log(" <div *ngIf = contact.status === thisDirection.PENDING>");
    console.log( this.contact.status );
    console.log( this.thisDirection.PENDING);

  }

}
