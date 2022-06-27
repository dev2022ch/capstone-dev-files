import { Component, Input, OnInit } from '@angular/core';
import { IRegistration } from 'src/app/interfaces/registration';
import { RegistrationService } from 'src/app/services/registration.service';
import { ActionsByOrg, ActionSelOptionsForOrg, ContactStatus, RegStatus } from 'src/app/constants/appConstant';
import { IContact } from 'src/app/interfaces/contact';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from 'src/app/interfaces/event';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrations-for-org',
  templateUrl: './registrations-for-org.component.html',
  styleUrls: ['./registrations-for-org.component.scss'],
})
export class RegistrationsForOrgComponent implements OnInit {

  currentUser;
  @Input() thisRegsForOrg!:IRegistration[];
  @Input() thisEvent!: IEvent;
  contacts: IContact[];
  contactsNonInvitable: IContact[];
  contactsInvitable: IContact[];
  
  currentDate;
  actionsByOrg: any;
  actionSelOptionsForOrg: any;
  thisRegStatus: any;
  goExecute: boolean;
  actionSelected: number;
  contactsWithRegInfos: [];
  regIDsSelected: [];
  invitedRegInitInfo:[];
  noteByOrg: string;
 

  constructor(private registrationService:RegistrationService, private toastController:ToastController, private userService: UserService) { 
    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;
    this.actionsByOrg = ActionsByOrg;
    this.actionSelOptionsForOrg = ActionSelOptionsForOrg;
    this.thisRegStatus = RegStatus;
    this.noteByOrg = "";
    this.goExecute = false;

    this.contactsNonInvitable = [];
    this.contactsInvitable = [];

    this.currentDate = Date.now();

  }

  selectAction(selectedValue:any){

    console.log("console.log(selectedValue);" + selectedValue.detail.value);
    this.actionSelected = parseInt(selectedValue.detail.value);
 
   }

  selectRegs(selectedValue: any) {
    this.regIDsSelected = selectedValue.detail.value;
    
    console.log("this.regIDsSelected ");
    console.log(this.regIDsSelected);
   
  }

  selectContacts(selectedValue: any){

    this.invitedRegInitInfo = selectedValue.detail.value;
    console.log("this.invitedRegInitInfo ");
    console.log(this.invitedRegInitInfo);
  }

  btnGo(){

    console.log(" btnGo()");
    this.goExecute = true;

    let updateInstructions = {
      actionID: this.actionSelected,
      regIDs: this.regIDsSelected,
      noteByOrg: this.noteByOrg
    }

    switch(this.actionSelected) {
      case ActionsByOrg.UN_INVITE:
      case ActionsByOrg.CONFM_REGIST:
      case ActionsByOrg.CANCEL_REGIST:
      case ActionsByOrg.EDIT_NOTE:
          console.log(" manageRegsByOrg");
          this.registrationService.manageRegsByOrg(updateInstructions).subscribe((results)=> {
              console.log(results);
              this.showToastManage();
          }, (err) => {
              console.log(err);
          });
          break;
    }
  }

  reArrangeContacts(){
    console.log(" for (let c of this.contacts) {");
    console.log( this.contacts);

    for (let c of this.contacts) {
      if (c.status === ContactStatus.CONFIRMED) {
          let contactsHasRegID = false;
          for (let t of this.thisRegsForOrg){

            console.log(" (c.contactUserID == t.userID)");
            console.log( c.contactUserID == t.userID);

              if (c.contactUserID == t.userID)
              {
                  contactsHasRegID = true;
                  this.contactsNonInvitable.push(c);
                  break;
              }
          }
    
          if (contactsHasRegID === false){
            this.contactsInvitable.push(c);
          }
      }
    }
  }

  invite(){

    console.log("this.invitedRegInitInfo ");
    console.log(this.invitedRegInitInfo );


    if (this.invitedRegInitInfo){
      console.log("if (this.invitedRegInitInfo)");
      console.log(true);

        this.registrationService.bulkCreateRegistrations(this.invitedRegInitInfo).subscribe((results)=> {
          console.log("bulkCreateRegistrations results");
          console.log(results);
          this.showToastInvite();
        }, (err) => {
            console.log(err);
        });
    }
 
    this.invitedRegInitInfo = null;    

  }

  async showToastInvite() {
    const toast = await this.toastController.create({
      message: 'Invitations sent successfully.',
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

  async showToastManage() {
    const toast = await this.toastController.create({
      message: 'Action is successful.',
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

    console.log("thisRegsForOrg");
    console.log(this.thisRegsForOrg);

    this.userService.getContacts(this.currentUser).subscribe((results)=> {
      this.contacts = results;
      console.log("this.contacts");
      console.log(this.contacts);

      this.reArrangeContacts();

    }, (err) => {
        console.log(err);
    });


  }

}
