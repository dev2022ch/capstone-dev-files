import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEvent } from 'src/app/interfaces/event';
import { EventAndRegService } from 'src/app/services/event-and-reg.service';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-details-org',
  templateUrl: './event-details-org.component.html',
  styleUrls: ['./event-details-org.component.scss'],
})
export class EventDetailsOrgComponent implements OnInit {

  @Input() thisEvent!:IEvent;
  @Output() updateEventEvent = new EventEmitter;
  @Output() addEventEvent= new EventEmitter;
  currentUser;
  thisImage;

  aprovalTypes;
  formEventForOrg;

  constructor(private eventAndRegService:EventAndRegService, private toastController:ToastController, private userService: UserService) { 
    
    this.formEventForOrg = new FormGroup({
      eventName: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      dateFrom: new FormControl('', [Validators.required]), 
      dateTo: new FormControl('', [Validators.required]),
      addrStreet: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      provState: new FormControl(''),
      country: new FormControl(''),
      summary: new FormControl(''),
      details: new FormControl(''),
      fees: new FormControl(''),
      capPers: new FormControl(''),
      capTodUp: new FormControl(''),
      capTodEnf: new FormControl(''),
      image: new FormControl('')
     
    });

  }

  onFileChange(event:any) {  
    const file = event.target.files[0];

    this.formEventForOrg.patchValue({

      image: file
    });    

    console.log("file.name");
    console.log(file.name);
    
  }
  
  onSave(){

    if (this.thisEvent) {
/*      let existingEvent = <IEvent> {};
      Object.assign(existingEvent, this.formEventForOrg.value);
      existingEvent.eventID = this.thisEvent.eventID;
      existingEvent.orgID = this.thisEvent.orgID;
*/   
      //console.log(thisTask.completion_date);

      let formData = this.formEventForOrg.value;
      let f = new FormData();

      //Transfer of all formgroup data into the FormData object;
      for(let k in formData)
      {
        f.append(k, formData[k]);
      }

      f.append("eventID", this.thisEvent.eventID.toString());
      f.append("orgID", this.thisEvent.orgID.toString());
   
      this.eventAndRegService.putEvent(this.thisEvent.eventID, f).subscribe((result)=>{
        console.log("result after putEvent");
        console.log(result);
        this.updateEventEvent.emit(result);

        this.showToast();
      });
  
      } else {
/*      let newEvent = <IEvent> {};
      Object.assign(newEvent, this.formEventForOrg.value);
      newEvent.orgID = this.currentUser;
    
      //console.log(thisTask.completion_date);
   
 */  
      let formData = this.formEventForOrg.value;
      let f = new FormData();

      //Transfer of all formgroup data into the FormData object;
      for(let k in formData)
      {
        f.append(k, formData[k]);
      }

      let currentUserData = this.userService.get_current_user();
      this.currentUser = currentUserData.userID;
      f.append("orgID", this.currentUser);

      console.log("formData");
      console.log(formData);
   
      this.eventAndRegService.createEvent(f).subscribe((result)=>{
        console.log("result after createEvent");
        console.log(result);

        this.addEventEvent.emit(result);

        this.showToast();
      });
    }
  
  }

  onClear(){
    this.formEventForOrg.reset();
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Event saved successfully.',
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
    console.log(" event Detail org ngOnInit() this.thisEvent");
    console.log(this.thisEvent);
    if (this.thisEvent) {
      this.thisImage = `http://localhost:3000/images/${this.thisEvent.image}`
      this.formEventForOrg.patchValue({
        eventName: this.thisEvent.eventName,
        category: this.thisEvent.category,
        dateFrom:  new Date(this.thisEvent.dateFrom).toISOString().substring(0,10),
        dateTo: new Date(this.thisEvent.dateTo).toISOString().substring(0,10),
        addrStreet: this.thisEvent.addrStreet,
        city: this.thisEvent.city,
        provState: this.thisEvent.provState,
        country: this.thisEvent.country,
        summary: this.thisEvent.summary,
        details: this.thisEvent.details,
        fees: this.thisEvent.fees,
        capPers: this.thisEvent.capPers,
        capTodUp: this.thisEvent.capTodUp,
        capTodEnf: this.thisEvent.capTodEnf,
        image: this.thisEvent.image
      });
    }  
  }

}
