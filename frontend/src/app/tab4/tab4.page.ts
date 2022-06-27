import { Component } from '@angular/core';
import { IContact } from '../interfaces/contact';
import { UserService } from '../services/user.service';
import { RequestDirection, ContactStatus } from 'src/app/constants/appConstant';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  currentUser: number;
  currentUserName: string;
  contacts!:IContact[];
  userNameInput: string;
  userNameSearched:string;
  ifSearchUserName: boolean;
  contactUserID: number;
  existingUser: boolean;
  existingContact: boolean;
  msgRequest: string;

  requestDirection;
  contactStatus;
  
  constructor(private userService: UserService, private toastController:ToastController) {
    let currentUserData = this.userService.get_current_user();
    this.currentUser = currentUserData.userID;
    this.currentUserName = currentUserData.userName;
    this.userNameSearched = '' ;

    this.requestDirection = RequestDirection;
    this.contactStatus = ContactStatus;

    this.ifSearchUserName = false;
    
    userService.getContacts(this.currentUser).subscribe((results)=> {
      this.contacts = results;
      console.log("this.contacts");
      console.log(this.contacts);

    }, (err) => {
        console.log(err);
    });
  }

  search(){

    this.userNameSearched = this.userNameInput;

    if (this.userNameSearched) {
      this.existingUser = true;
      this.existingContact = false;
      console.log("this.userNameSearched");
      console.log(this.userNameSearched);

       this.ifSearchUserName = true;

       this.userService.findUserByName(this.userNameSearched).subscribe((result)=> {
          console.log("findUserByName result");
          console.log(result);
          
          if(result){

              this.contactUserID = result.userID;

              console.log("result.userID");
              console.log(result.userID);
              console.log("this.contactUserID");
              console.log(this.contactUserID);

              this.userService.findInExistingContacts(this.currentUser, this.contactUserID).subscribe((result)=> {
                if(result){
                    console.log("findInExistingContacts result");
                    console.log(result);
                    this.existingContact = true; 
                }
              }, (err) => {
                console.log(err);
              });
          } else{
            this.existingUser = false;
          }
        }, (err) => {
            console.log(err);
        });
     }

  }

  inputChanged(){
    this.ifSearchUserName = false;

    console.log("this.ifSearchUserName");
    console.log(this.ifSearchUserName);
  }

  sendRequest(){
      console.log("this.msgRequest");
      console.log(this.msgRequest);
        let contact = {
          userID: this.currentUser,
          contactUserID: this.contactUserID,
          contactUserName: this.userNameSearched,
          reqDirection: RequestDirection.TO_CONTACT,
          msgRequest: this.msgRequest,
          status: ContactStatus.PENDING
        }

        this.userService.createContact(contact).subscribe((result)=> {
          console.log("this.userService.createContact(contact).subscribe((result)=");
          console.log(result);
//          let newContact = <IContact>result;
//          this.contacts.push(newContact);

          this.userService.getContacts(this.currentUser).subscribe((results)=> {
              this.contacts = results;
              console.log("this.contacts");
              console.log(this.contacts);
        
          }, (err) => {
              console.log(err);
          });

        }, (err) => {
            console.log(err);
        });

        contact = {
          userID: this.contactUserID,
          contactUserID: this.currentUser,
          contactUserName: this.currentUserName,
          reqDirection: RequestDirection.FROM_CONTACT,
          msgRequest: this.msgRequest,
          status: ContactStatus.PENDING
        }

        this.userService.createContact(contact).subscribe((result)=> {
          console.log(result);
          this.showToast();
        }, (err) => {
            console.log(err);
        });

        this.ifSearchUserName = false;
    }

    reloadContacts(){
      this.userService.getContacts(this.currentUser).subscribe((results)=> {
        this.contacts = results;
        console.log("this.contacts");
        console.log(this.contacts);
  
      }, (err) => {
          console.log(err);
      });
    }

    async showToast() {
      const toast = await this.toastController.create({
        message: 'Request sent successfully.',
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

    ionViewWillEnter(){
      let currentUserData = this.userService.get_current_user();
      this.currentUser = currentUserData.userID;
      this.currentUserName = currentUserData.userName;

      this.userService.getContacts(this.currentUser).subscribe((results)=> {
        this.contacts = results;
        console.log("this.contacts");
        console.log(this.contacts);
  
      }, (err) => {
          console.log(err);
      });
    }
}


