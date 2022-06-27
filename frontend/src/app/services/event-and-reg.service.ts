import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventAndRegService {  constructor(private httpClient:HttpClient) { }

    getEventsByGoer(goerId:number){
      console.log("goerId:number: " + goerId);
      console.log(`http://localhost:3000/eventsByGoer/:${goerId}`);
      //   return this.httpClient.get<IEventByGoer[]>(`http://localhost:3000/eventsByGoer/:${goerId}`);
      return this.httpClient.get<IEvent[]>(`http://localhost:3000/eventsByGoer/${goerId}`);

    }

    findEventByRegID(eventsByGoer:any, regID:number){
      let search = (key, inputArray) => {
        for (let i=0; i < inputArray.length; i++) {
            if (parseInt(inputArray[i].regID) === parseInt(key)) {
              return inputArray[i];
            }
        }
      }
      let resultObject = search(regID, eventsByGoer);
      return resultObject;
    }


    getEventsRegsByOrg(orgId:number){
      console.log("orgId:number: " + orgId);
      return this.httpClient.get<IEvent[]>(`http://localhost:3000/eventsAndRegs/${orgId}`);

    } 

    createEvent(Data: any){
      return this.httpClient.post("http://localhost:3000/events", Data);
    }

    putEvent(eventID:number, Data: any){
      return this.httpClient.put(`http://localhost:3000/events/${eventID}`, Data);
    }

}