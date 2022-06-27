import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IEvent } from 'src/app/interfaces/event';
import { IRegistration } from 'src/app/interfaces/registration';
import { RegStatus } from 'src/app/constants/appConstant';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-event-and-reg-details-goer',
  templateUrl: './event-and-reg-details-goer.component.html',
  styleUrls: ['./event-and-reg-details-goer.component.scss'],
})
export class EventAndRegDetailsGoerComponent implements OnInit {


  @Input() thisEvent!: IEvent;
  @Input() thisRegForGoer!: IRegistration;
  @Output() submitRegEvent = new EventEmitter;

  formRegist;
  thisImage;
  textStatus;

  constructor(private registrationService:RegistrationService, private toastController: ToastController) { 
    this.formRegist = new FormGroup({
      numPers: new FormControl('', [Validators.required]),
      numAdults: new FormControl('', [Validators.required]),
      numTodUp: new FormControl('', [Validators.required]),
      numTodEnf: new FormControl('', [Validators.required]),
      msgByGoer: new FormControl('', [Validators.required]),
    });

  }
  
  onRegister(){
    let thisReg = <IRegistration> {};
  
         //Put
      thisReg.regID = this.thisRegForGoer.regID;
      thisReg.userID = this.thisRegForGoer.userID;
      thisReg.eventID = this.thisRegForGoer.eventID;
      thisReg.dateAction = this.thisRegForGoer.dateAction;

      console.log("this.formRegist.numPers");
      console.log(this.formRegist.numPers);
    
      console.log("this.formformRegist.value.numPers");
      console.log(this.formRegist.value.numPers);  

      thisReg.numPers = this.formRegist.value.numPers;
      thisReg.numAdults = this.formRegist.value.numAdults;
      thisReg.numTodUp = this.formRegist.value.numTodUp;
      thisReg.numTodEnf = this.formRegist.value.numTodEnf;
      thisReg.msgByGoer = this.formRegist.value.msgByGoer;
      thisReg.status = RegStatus.REG_PENDING_CONF;
  //    thisReg.noteByOrg = this.formRegist.noteByOrg;
   
         
      //console.log(thisTask.completion_date);
      console.log(thisReg);
      this.registrationService.putRegistration(thisReg.regID, thisReg).subscribe((result)=>{
        console.log("result after putRegistration");
        console.log(result);

        this.submitRegEvent.emit(thisReg);

        this.showToast();
      });
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'registered successfully.',
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
    console.log(this.thisRegForGoer);
    this.thisImage = `http://localhost:3000/images/${this.thisEvent.image}`
    
    if (this.thisRegForGoer) {
      this.formRegist.patchValue({
        numPers: this.thisRegForGoer.numPers,
        numAdults: this.thisRegForGoer.numAdults,
        numTodUp: this.thisRegForGoer.numTodUp,
        numTodEnf: this.thisRegForGoer.numTodEnf,
        msgByGoer: this.thisRegForGoer.msgByGoer,
        status: this.thisRegForGoer.status,
      });

      switch(this.thisRegForGoer.status) {
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
